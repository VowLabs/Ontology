import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { loadCatalogue } from '../catalogue.mjs';

const SERVICE_CODE = 'S:T:SV';
const own = (object, key) => Object.hasOwn(object, key);
class ApiError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
const bad = message => { throw new ApiError(400, '.ontology.invalid-request', message); };
const missing = () => { throw new ApiError(404, '.ontology.not-found', 'The requested ontology resource does not exist.'); };

export function createOntologyServer({ catalogue = loadCatalogue() } = {}) {
  // A consistent snapshot for the lifetime of the process; no client databases.
  catalogue = structuredClone(catalogue);
  catalogue.nodes[SERVICE_CODE].Records = catalogue.nodes[SERVICE_CODE].Records.map(record => ({ ...record, iconUrl: `/v1/services/${encodeURIComponent(record.id)}/icon.svg` }));
  const revision = createHash('sha256').update(JSON.stringify(catalogue)).digest('hex');
  const meta = { authority: 'VL Ontology', ontologyVersion: catalogue.version, revision };
  const reference = (code, id) => `urn:vl:ontology:${catalogue.version}:${code || 'root'}${id === undefined ? '' : ':record:' + encodeURIComponent(id)}`;
  const definition = code => {
    if (!own(catalogue.nodes, code)) return missing();
    return { ...catalogue.nodes[code], reference: reference(code), href: code ? `/v1/definitions/${encodeURIComponent(code)}` : '/v1/ontology' };
  };
  const records = code => {
    const node = definition(code);
    if (!Array.isArray(node.Records)) return missing();
    return node.Records.map(record => ({ ...record,
      ...(code === SERVICE_CODE ? { iconUrl: `/v1/services/${encodeURIComponent(record.id)}/icon.svg` } : {}),
      reference: reference(code, record.id),
      definitionCode: code,
    }));
  };
  const icons = new Map(records(SERVICE_CODE).map(record => [record.id,
    readFileSync(new URL(`../service-icons/${record.id}.svg`, import.meta.url))]));
  const collection = id => {
    if (!own(catalogue.collections, id)) return missing();
    return { id, ...catalogue.collections[id], definitions: catalogue.collections[id].Fields.map(definition) };
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
  function route(parts, params) {
    if (!parts.length) return { data: { name: 'VL Ontology API', endpoints: ['/v1/ontology', '/v1/definitions', '/v1/services', '/v1/collections', '/v1/catalogue', '/v1/migrations', '/openapi.json'] }, meta };
    const [resource, code, subresource, id] = parts;
    if (resource === 'ontology' && parts.length === 1) return { data: definition(''), meta };
    if (resource === 'catalogue' && parts.length === 1) return { data: catalogue, meta };
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
        return list(codes.map(definition), params);
      }
      const node = definition(code);
      if (parts.length === 2) return { data: node, meta };
      if (subresource === 'children' && parts.length === 3) return list(Object.values(node.Children || {}).map(definition), params);
      if (subresource === 'choices' && parts.length === 3) {
        if (!Array.isArray(node.Choices)) return missing();
        return list(node.Choices, params);
      }
      if (subresource === 'records') {
        const rows = records(code);
        if (parts.length === 3) return list(rows, params);
        if (parts.length === 4) return { data: rows.find(row => row.id === id) || missing(), meta };
      }
    }
    if (resource === 'services') {
      const rows = records(SERVICE_CODE);
      if (parts.length === 1) return list(rows, params);
      const row = rows.find(row => row.id === code) || missing();
      if (parts.length === 2) return { data: row, meta };
      if (parts.length === 3 && subresource === 'icon.svg') return { body: icons.get(code), type: 'image/svg+xml' };
    }
    if (resource === 'collections') {
      if (parts.length === 1) return list(Object.keys(catalogue.collections).sort().map(collection), params);
      if (parts.length === 2) return { data: collection(code), meta };
    }
    return missing();
  }
  return createServer({ maxHeaderSize: 16384, requestTimeout: 15000, headersTimeout: 10000 }, (req, res) => {
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
        if (!['q', 'limit', 'offset', 'parent', 'codes'].includes(key) || params.getAll(key).length !== 1) bad(`Unsupported or repeated parameter: ${key}`);
      }
      let parts;
      try { parts = url.pathname.split('/').slice(1).map(decodeURIComponent); } catch { bad('Invalid URL encoding.'); }
      if (url.pathname === '/health') return send(200, { data: { status: 'ok' }, meta });
      if (url.pathname === '/openapi.json') return send(200, openapi);
      if (parts[0] !== 'v1') return missing();
      if (parts.at(-1) === '') parts.pop();
      const result = route(parts.slice(1), params);
      send(200, result.body ?? result, result.type);
    } catch (error) {
      if (!(error instanceof ApiError)) console.error('Ontology request failed:', error);
      send(error.status || 500, { error: { code: error.code || '.ontology.internal-error', message: error instanceof ApiError ? error.message : 'An internal error occurred.' }, meta });
    }
  });
}

const openapi = JSON.parse(readFileSync(new URL('./openapi.json', import.meta.url), 'utf8'));
