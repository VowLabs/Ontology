export const ownsCode = (delegation, code) => typeof code === 'string' && (code === delegation.prefix || code.startsWith(delegation.prefix + ':'));
export class DelegationError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
export function delegationFor(catalogue, code) {
  return Object.values(catalogue.delegations || {}).find(delegation => ownsCode(delegation, code));
}
export function configuredDelegations(catalogue, overrides = {}) {
  return Object.fromEntries(Object.entries(catalogue.delegations || {}).map(([id, delegation]) => {
    const url = new URL(overrides[id] || (id === 'geo' ? process.env.GEO_ONTOLOGY_URL : '') || (id === 'geo' && process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:24109/v1/' : delegation.url));
    if (!['https:', 'http:'].includes(url.protocol) || (url.protocol === 'http:' && process.env.NODE_ENV === 'production') || url.username || url.password || url.search || url.hash || !url.pathname.endsWith('/')) throw Error(`Invalid delegation URL: ${id}`);
    return [id, {...delegation, authoritativeUrl:delegation.url, url: url.href}];
  }));
}
export async function queryDelegation(delegation, parts, params = new URLSearchParams(), {timeout = 5000, fetchImpl = fetch} = {}) {
  if (parts.some(part => typeof part !== 'string' || !part || ['.', '..'].includes(part) || /[\/\\\0]/.test(part))) throw new DelegationError(400, '.ontology.invalid-request', 'Invalid delegated resource');
  const url = new URL(parts.map(encodeURIComponent).join('/'), delegation.url);
  url.search = params.toString();
  const signal = AbortSignal.timeout(timeout);
  try {
    const response = await fetchImpl(url, {signal, redirect: 'error', headers: {accept: 'application/json'}});
    const chunks = []; let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > 8 * 1024 * 1024) throw Error('Response too large');
      chunks.push(chunk);
    }
    const result = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!response.ok) {
      const status = [400, 404, 503, 504].includes(response.status) ? response.status : 502;
      throw new DelegationError(status, status === 404 ? '.ontology.not-found' : status === 400 ? '.ontology.invalid-request' : '.ontology.upstream-unavailable', status < 500 ? 'Delegated resource not found or invalid' : 'Delegated service unavailable');
    }
    if (result?.meta?.ontologyVersion !== delegation.ontologyVersion || !Object.hasOwn(result, 'data')) throw Error('Incompatible delegated response');
    // Links stay on the public Ontology API; clients need not follow Geo directly.
    const rewrite = value => {
      if (Array.isArray(value)) return value.map(rewrite);
      if (!value || typeof value !== 'object') return value;
      if (typeof value.Code === 'string' && typeof value.Name === 'string') {
        if (typeof value.Collection !== 'boolean' || typeof value.Composite !== 'boolean') throw Error('Invalid delegated collection flags');
      }
      const rewritten = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, key === 'href' && typeof child === 'string' && child.startsWith(delegation.url) ? '/v1/' + child.slice(delegation.url.length) : rewrite(child)]));
      if (typeof value.Code === 'string' && ownsCode(delegation,value.Code)) {
        rewritten.delegation=delegation.id;
        rewritten.authoritativeUrl=delegation.authoritativeUrl || delegation.url;
      }
      return rewritten;
    };
    return rewrite(result);
  } catch (error) {
    if (error instanceof DelegationError) throw error;
    const timeoutError = signal.aborted || error.name === 'TimeoutError';
    throw new DelegationError(timeoutError ? 504 : 502, '.ontology.upstream-unavailable', timeoutError ? 'Delegated service timed out' : 'Delegated service unavailable or incompatible');
  }
}
export async function hydrateCatalogue(catalogue, options = {}) {
  const result = structuredClone(catalogue);
  const delegations = configuredDelegations(catalogue, options.urls);
  for (const delegation of Object.values(delegations)) {
    const response = await queryDelegation(delegation, ['catalogue'], new URLSearchParams(), options);
    const snapshot = response.data;
    if (snapshot.version !== catalogue.version || !snapshot.nodes?.[delegation.prefix] || !snapshot.datasets) throw Error('Invalid delegated catalogue');
    for (const [code, node] of Object.entries(snapshot.nodes)) {
      if (!ownsCode(delegation, code) || node.Code !== code || !node.Name || Object.values(node.Children || {}).some(child => !ownsCode(delegation, child) || !snapshot.nodes[child])) throw Error('Delegated catalogue escaped its assigned namespace');
    }
    for (const [id, dataset] of Object.entries(snapshot.datasets)) {
      if (!delegation.datasets[id] || dataset.definitionCode !== delegation.datasets[id].definitionCode || !Number.isInteger(dataset.version) || dataset.version < 1 || !Array.isArray(dataset.records) || new Set(dataset.records.map(row => row.id)).size !== dataset.records.length || dataset.records.some(row => !row.id || !row.name)) throw Error('Invalid delegated dataset');
    }
    if (Object.keys(delegation.datasets).some(id => !snapshot.datasets[id])) throw Error('Missing delegated dataset');
    Object.assign(result.nodes, snapshot.nodes);
    result.nodes[delegation.prefix].Delegation=structuredClone(catalogue.nodes[delegation.prefix].Delegation);
    Object.assign(result.datasets, snapshot.datasets);
    result.delegations[delegation.id].snapshot = {revision: response.meta.revision, fetchedAt: new Date().toISOString()};
  }
  return result;
}
