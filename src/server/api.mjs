import { configuredDelegations, delegationFor, queryDelegation, hydrateCatalogue, DelegationError } from '../delegation.mjs';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { loadCatalogue } from '../catalogue.mjs';
import { resolveChoices } from '../choices.mjs';

const SERVICE_CODE = 'S:T:SV';
const own = (object, key) => Object.hasOwn(object, key);
class ApiError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
const bad = message => { throw new ApiError(400, '.ontology.invalid-request', message); };
const missing = () => { throw new ApiError(404, '.ontology.not-found', 'The requested ontology resource does not exist.'); };

export function createOntologyServer({ catalogue = loadCatalogue(), delegationUrls = {}, upstreamTimeout = 5000, fetchImpl = fetch } = {}) {
  // A consistent snapshot for the lifetime of the process; no client databases.
  catalogue = structuredClone(catalogue);
  catalogue.datasets.services.records = catalogue.datasets.services.records.map(record => ({ ...record, iconUrl: `/v1/services/${encodeURIComponent(record.id)}/icon.svg` }));
  const delegations = configuredDelegations(catalogue, delegationUrls);
  const upstreamOptions = {timeout: upstreamTimeout, fetchImpl};
  const delegate = code => delegationFor({delegations}, code);
  const proxy = (owner, parts, params = new URLSearchParams()) => queryDelegation(owner, parts, params, upstreamOptions);
  const revision = createHash('sha256').update(JSON.stringify(catalogue)).digest('hex');
  const meta = { authority: 'VL Ontology', ontologyVersion: catalogue.version, revision, delegatedPrefixes: Object.values(delegations).map(d => d.prefix) };
  const reference = (code, id) => `urn:vl:ontology:${catalogue.version}:${code || 'root'}${id === undefined ? '' : ':record:' + encodeURIComponent(id)}`;
  const definition = code => {
    if (!own(catalogue.nodes, code)) return missing();
    return { ...catalogue.nodes[code], reference: reference(code), href: code ? `/v1/definitions/${encodeURIComponent(code)}` : '/v1/ontology' };
  };
  const dataset = id => {
    if (!own(catalogue.datasets, id)) return missing();
    return catalogue.datasets[id];
  };
  const records = id => {
    const data = dataset(id);
    return data.records.map(record => ({ ...record,
      reference: `urn:vl:data:${id}:${data.version}:${encodeURIComponent(record.id)}`,
      definitionCode: data.definitionCode,
    }));
  };
  const icons = new Map(records('services').map(record => [record.id,
    readFileSync(new URL(`../service-icons/${record.id}.svg`, import.meta.url))]));
  const resolvedDefinition = async code => delegate(code) && !catalogue.nodes[code]?.Delegation ? (await proxy(delegate(code), ["definitions", code])).data : definition(code);
  const collection = async id => {
    if (!own(catalogue.collections, id)) return missing();
    return { id, ...catalogue.collections[id], definitions: await Promise.all(catalogue.collections[id].Fields.map(resolvedDefinition)) };
  };
  const list = (items, params) => {
    const integer = (key, fallback, max) => {
      const raw = params.get(key);
      if (raw === null) return fallback;
      if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) > max || (key === 'limit' && Number(raw) === 0)) bad(`Invalid ${key}.`);
      return Number(raw);
    };
    const limit = integer('limit', 50, 200), offset = integer('offset', 0, Number.MAX_SAFE_INTEGER);
    const q = params.get('q')?.trim().toLowerCase();
    if (q) items = items.filter(item => [item.Code, item.Name, item.Description, item.Question, item.id, item.name, typeof item === 'string' ? item : ''].some(value => typeof value === 'string' && value.toLowerCase().includes(q)));
    const total = items.length;
    return { data: items.slice(offset, offset + limit), meta: { ...meta, total, offset, limit, nextOffset: offset + limit < total ? offset + limit : null } };
  };
  async function route(parts, params) {
    const [kind, identifier] = parts;
    if (kind === 'definitions' && identifier && delegate(identifier) && !(parts.length === 2 && catalogue.nodes[identifier]?.Delegation)) return proxy(delegate(identifier), parts, params);
    if (kind === 'definitions' && parts.length === 1 && params.has('parent') && delegate(params.get('parent'))) {
      const code = params.get('parent');
      if (params.has('codes')) bad('Do not combine parent and codes for delegated listings.');
      const forwarded = new URLSearchParams(params); forwarded.delete('parent');
      return proxy(delegate(code), ['definitions', code, 'children'], forwarded);
    }
    const datasetId = kind === 'datasets' ? identifier : ['countries', 'states'].includes(kind) ? kind : null;
    const owner = datasetId && Object.values(delegations).find(d => Object.hasOwn(d.datasets, datasetId));
    if (owner) return proxy(owner, kind === 'datasets' ? parts : ['datasets', datasetId, 'records', ...parts.slice(1)], params);
    if (!parts.length) return { data: { name: 'VL Ontology API', endpoints: ['/v1/ontology', '/v1/definitions', '/v1/datasets', '/v1/services', '/v1/professions', '/v1/countries', '/v1/states', '/v1/collections', '/v1/catalogue', '/v1/migrations', '/openapi.json'] }, meta };
    const [resource, code, subresource, id] = parts;
    if (resource === 'ontology' && parts.length === 1) return { data: definition(''), meta };
    if (resource === 'catalogue' && parts.length === 1) {
      if (params.has('expand') && params.get('expand') !== 'delegations') bad('Invalid catalogue expansion.');
      const expanded = params.get('expand') === 'delegations';
      return {data: expanded ? await hydrateCatalogue(catalogue, {...upstreamOptions, urls: delegationUrls}) : catalogue, meta: {...meta, complete: expanded}};
    }
    if (resource === 'migrations' && parts.length === 1) return { data: catalogue.migrations, meta };
    if (resource === 'definitions') {
      if (parts.length === 1) {
        let codes = Object.keys(catalogue.nodes).filter(Boolean).sort();
        if (params.has('codes')) {
          codes = params.get('codes').split(',');
          if (codes.length > 100 || codes.some(code => !code)) bad('Supply 1–100 comma-separated codes.');
        }
        if (params.has('parent')) {
          const parent = definition(params.get('parent'));
          codes = codes.filter(code => Object.values(parent.Children || {}).includes(code));
        }
        return {...list(await Promise.all(codes.map(code => params.has("codes") ? resolvedDefinition(code) : definition(code))), params), ...(params.has("codes") || params.has("parent") ? {} : {scope: "local-and-delegation-boundaries"})};
      }
      const node = definition(code);
      if (parts.length === 2) return { data: node, meta };
      if (subresource === 'children' && parts.length === 3) return list(Object.values(node.Children || {}).map(definition), params);
      if (subresource === 'choices' && parts.length === 3) {
        const choices = resolveChoices(catalogue.nodes, code, catalogue.datasets);
        if (!choices) return missing();
        return list(choices, params);
      }
      if (subresource === 'records') {
        // Compatibility alias; rows still have data references, never ontology references.
        if (code !== SERVICE_CODE) return missing();
        const rows = records('services');
        if (parts.length === 3) return list(rows, params);
        if (parts.length === 4) return { data: rows.find(row => row.id === id) || missing(), meta };
      }
    }
    if (resource === 'datasets') {
      const describe = id => { const {records: rows, ...info} = dataset(id); return {...info, ...(rows ? {count: rows.length} : {}), href: `/v1/datasets/${id}/records`}; };
      if (parts.length === 1) return list(Object.keys(catalogue.datasets).sort().map(describe), params);
      if (parts.length === 2) return {data: describe(code), meta};
      if (subresource === 'records') {
        const rows = records(code);
        if (parts.length === 3) return list(rows, params);
        if (parts.length === 4) return {data: rows.find(row => row.id === id) || missing(), meta};
      }
      return missing();
    }
    if (['services', 'professions', 'countries', 'states'].includes(resource)) {
      const rows = records(resource);
      if (parts.length === 1) return list(rows, params);
      const row = rows.find(row => row.id === code) || missing();
      if (parts.length === 2) return { data: row, meta };
      if (resource === 'services' && parts.length === 3 && subresource === 'icon.svg') return { body: icons.get(code), type: 'image/svg+xml' };
    }
    if (resource === 'collections') {
      if (parts.length === 1) return list(await Promise.all(Object.keys(catalogue.collections).sort().map(collection)), params);
      if (parts.length === 2) return { data: await collection(code), meta };
    }
    return missing();
  }
  return createServer({ maxHeaderSize: 16384, requestTimeout: 15000, headersTimeout: 10000 }, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'If-None-Match');
    res.setHeader('Access-Control-Expose-Headers', 'ETag, X-Ontology-Version');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Ontology-Version', catalogue.version);
    const send = (status, payload, type = 'application/json; charset=utf-8') => {
      const body = Buffer.isBuffer(payload) ? payload : Buffer.from(JSON.stringify(payload));
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', status === 200 ? 'public, max-age=0, must-revalidate' : 'no-store');
      if (status === 200) {
        const etag = `"${createHash('sha256').update(body).digest('hex')}"`;
        res.setHeader('ETag', etag);
        const tags = req.headers['if-none-match']?.split(',').map(tag => tag.trim().replace(/^W\//, '')) || [];
        if (tags.includes(etag) || tags.includes('*')) { res.writeHead(304); res.end(); return; }
      }
      res.setHeader('Content-Length', body.length);
      res.writeHead(status);
      res.end(req.method === 'HEAD' ? undefined : body);
    };
    try {
      if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
      if (!['GET', 'HEAD'].includes(req.method)) {
        res.setHeader('Allow', 'GET, HEAD, OPTIONS');
        throw new ApiError(405, '.ontology.method-not-allowed', 'Ontology resources are read-only.');
      }
      if (req.url.length > 8192) bad('Request URL is too long.');
      const url = new URL(req.url, 'http://ontology.local');
      const params = url.searchParams;
      for (const key of params.keys()) {
        if (!['q', 'limit', 'offset', 'parent', 'codes', 'expand'].includes(key) || params.getAll(key).length !== 1) bad(`Unsupported or repeated parameter: ${key}`);
      }
      let parts;
      try { parts = url.pathname.split('/').slice(1).map(decodeURIComponent); } catch { bad('Invalid URL encoding.'); }
      if (url.pathname === '/health') return send(200, { data: { status: 'ok' }, meta });
      if (url.pathname === '/openapi.json') return send(200, openapi);
      if (parts[0] !== 'v1') return missing();
      if (parts.at(-1) === '') parts.pop();
      if (params.has('expand') && url.pathname !== '/v1/catalogue') bad('expand only applies to catalogue requests.');
      const result = await route(parts.slice(1), params);
      send(200, result.body ?? result, result.type);
    } catch (error) {
      if (!(error instanceof ApiError) && !(error instanceof DelegationError)) console.error('Ontology request failed:', error);
      send(error.status || 500, { error: { code: error.code || '.ontology.internal-error', message: error instanceof ApiError || error instanceof DelegationError ? error.message : 'An internal error occurred.' }, meta });
    }
  });
}

const openapi = JSON.parse(readFileSync(new URL('./openapi.json', import.meta.url), 'utf8'));
