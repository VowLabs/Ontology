import {foreignFixture} from './delegation-fixture.mjs';
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createOntologyServer } from '../server/api.mjs';
import { loadCatalogue } from '../catalogue.mjs';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
let server, base, foreign;
before(async () => {
  foreign = foreignFixture();
  await new Promise(resolve => foreign.listen(0, '127.0.0.1', resolve));
  server = createOntologyServer({delegationUrls: {geo: `http://127.0.0.1:${foreign.address().port}/v1/`}});
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise(resolve => server.close(resolve)); await new Promise(resolve => foreign.close(resolve)); });
const get = async path => { const response = await fetch(base + path); assert.equal(response.status, 200, path); return response.json(); };
test('lookup preserves canonical types, question and VL reference', async () => {
  const {data, meta} = await get('/v1/definitions/I:C:SM:S');
  assert.equal(data.Reference, 'S:T:SV');
  assert.equal(data.Type, 'S:I:D:T:S');
  assert.equal(data.reference, `urn:vl:ontology:${meta.ontologyVersion}:I:C:SM:S`);
  assert.equal(meta.authority, 'VL Ontology');
});
test('services alias matches registry and every icon resolves', async () => {
  const services = await get('/v1/services');
  assert.deepEqual(services, await get('/v1/definitions/S:T:SV/records'));
  assert.equal(services.data.length, 15);
  for (const service of services.data) {
    const single = await get(`/v1/services/${service.id}`);
    assert.deepEqual(single.data, service);
    const icon = await fetch(base + service.iconUrl);
    assert.equal(icon.status, 200);
    assert.match(icon.headers.get('content-type'), /image\/svg\+xml/);
    assert.match(await icon.text(), /<svg/);
  }
});
test('search, pagination, children and explicit batch codes', async () => {
  const page = await get('/v1/services?limit=2&offset=2');
  assert.equal(page.data.length, 2); assert.equal(page.meta.total, 15); assert.equal(page.meta.nextOffset, 4);
  assert.equal((await get('/v1/services?q=github')).data[0].id, 'github');
  assert.equal((await get('/v1/services?offset=100')).meta.nextOffset, null);
  const parent = await get('/v1/definitions?parent=I:C');
  const children = await get('/v1/definitions/I:C/children');
  assert.deepEqual(parent.data.map(n=>n.Code).sort(),children.data.map(n=>n.Code).sort());
  assert.deepEqual((await get('/v1/definitions?codes=I:P,I:O')).data.map(n=>n.Code), ['I:P','I:O']);
});
test('choices, collection resolution and offline catalogue', async () => {
  const catalogue = (await get('/v1/catalogue')).data;
  const field = Object.values(catalogue.nodes).find(n => Array.isArray(n.Choices));
  assert.deepEqual((await get(`/v1/definitions/${field.Code}/choices?limit=200`)).data, field.Choices.slice(0,200));
  const collection = (await get('/v1/collections/checkout')).data;
  assert.deepEqual(collection.definitions.map(n=>n.Code), collection.Fields);
  assert.deepEqual((await get('/v1/migrations')).data, catalogue.migrations);
  assert.deepEqual(Object.keys(catalogue.nodes).sort(), Object.keys(loadCatalogue().nodes).sort());
  assert.equal(catalogue.version, loadCatalogue().version);
});
test('branch choices expose canonical role and country leaves with pagination', async () => {
  const definition = await get('/v1/definitions/S:G:AD:US:R');
  assert.equal(definition.data.Choices, 'S:G:AD:RO');
  const roles = await get('/v1/definitions/S:G:AD:US:R/choices');
  assert.equal(roles.data.length, 8);
  assert(roles.data.includes('S:G:AD:RO:SH'));
  assert(!roles.data.includes('Shipping'));
  assert(!roles.data.includes('S:G:AD:RO'));
  const first = await get('/v1/definitions/S:G:AD:US:CO/choices?limit=200');
  const second = await get('/v1/definitions/S:G:AD:US:CO/choices?limit=200&offset=200');
  assert.equal(first.meta.total, 2);
  assert.equal(first.data.length + second.data.length, 2);
  assert([...first.data, ...second.data].includes('G:CO:US'));
  assert.equal((await get('/v1/countries/G:CO:US')).data.Source.Provider, 'geo');
});
test('errors, prototype keys, malformed codes and user-data routes', async () => {
  for (const path of ['/v1/services/nobody','/v1/definitions/__proto__','/v1/collections/constructor','/v1/definitions/I:P/records','/v1/users','/api/lexicon']) {
    const r = await fetch(base+path); assert.equal(r.status,404,path); assert.equal((await r.json()).error.code,'.ontology.not-found');
  }
  for (const query of ['limit=0','limit=201','offset=-1','limit=1.5','codes=','wat=1','q=a&q=b']) assert.equal((await fetch(base+'/v1/definitions?'+query)).status,400,query);
  assert.equal((await fetch(base+'/v1/definitions/%XX')).status,400);
  const post = await fetch(base+'/v1/services',{method:'POST',body:'{"user":"private"}'});
  assert.equal(post.status,405); assert.equal(post.headers.get('allow'),'GET, HEAD, OPTIONS');
});
test('cache revalidation, HEAD and CORS', async () => {
  const first = await fetch(base+'/v1/services'); const etag = first.headers.get('etag');
  assert.ok(etag); assert.equal(first.headers.get('access-control-allow-origin'),'*');
  const cached = await fetch(base+'/v1/services',{headers:{'If-None-Match':`W/${etag}`}});
  assert.equal(cached.status,304); assert.equal(await cached.text(),'');
  const head = await fetch(base+'/v1/services',{method:'HEAD'});
  assert.equal(head.headers.get('etag'),etag); assert.equal(await head.text(),'');
  assert.equal((await fetch(base+'/v1/services',{method:'OPTIONS'})).status,204);
});
test('OpenAPI documents available resources',async()=> {
  const spec = await get('/openapi.json'); assert.equal(spec.openapi,'3.1.0');
  for (const path of Object.keys(spec.paths).filter(path=>!path.includes('{'))) await get(path);
});
test('loader and server module work in an isolated checkout without NokNok', () => {
  const directory = mkdtempSync(join(tmpdir(),'vl-ontology-'));
  try {
    cpSync(new URL('../../',import.meta.url),directory,{recursive:true,filter:source=>!source.split('/').some(p=>['.git','node_modules'].includes(p))});
    assert.deepEqual(loadCatalogue(directory), loadCatalogue());
    execFileSync(process.execPath,['--input-type=module','-e',"import { createOntologyServer } from './_support/server/api.mjs'; createOntologyServer();"],{cwd:directory});
  } finally { rmSync(directory,{recursive:true,force:true}); }
});

test('datasets are discoverable and never returned as active definitions',async()=>{
 assert.deepEqual((await get('/v1/datasets')).data.map(d=>d.id),['countries','professions','services','states']);
 const law=(await get('/v1/datasets/professions/records/LAW')).data;
 assert.equal(law.name,'Lawyer');assert.match(law.reference,/^urn:vl:data:professions:1:/);
 assert.deepEqual((await get('/v1/professions/LAW')).data,law);
 assert.equal((await get('/v1/datasets/countries')).data.count,2);
 assert.equal((await get('/v1/professions?q=lawyer')).data[0].id,'LAW');
 assert.equal((await get('/v1/definitions/S:T:SV')).data.Records,undefined);
 for(const code of ['I:CN','I:PR:NN','F:AC','S:I:D:LEX','B:PRO:LAW','G:CO:US'])assert.equal((await fetch(base+'/v1/definitions/'+code)).status,404,code);
 for(const path of ['/v1/datasets/__proto__','/v1/datasets/services/records/constructor','/v1/datasets/services/extra'])assert.equal((await fetch(base+path)).status,404,path);
});

test('California is discoverable as state reference data, not an ontology definition',async()=>{
 const result=await get('/v1/states?q=California');assert.equal(result.meta.total,1);
 assert.equal(result.data[0].id,'US-CA');assert.equal(result.data[0].name,'California');
 assert.equal(result.data[0].country,'G:CO:US');assert.equal(result.data[0].definitionCode,'S:G:SD');
 assert.match(result.data[0].reference,/^urn:vl:data:states:2:/);
 assert.deepEqual((await get('/v1/datasets/states/records/US-CA')).data,result.data[0]);
 assert.deepEqual((await get('/v1/states/US-CA')).data,result.data[0]);
 assert.equal((await get('/v1/datasets/states')).data.count,1);
 assert.equal((await fetch(base+'/v1/definitions/US-CA')).status,404);
});
