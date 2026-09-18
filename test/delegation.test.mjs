import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {loadCatalogue} from '../catalogue.mjs';
import {createOntologyServer} from '../server/api.mjs';
import {foreignFixture} from './delegation-fixture.mjs';
import {hydrateCatalogue} from '../delegation.mjs';

const start = async server => { server.listen(0, '127.0.0.1'); await once(server, 'listening'); return `http://127.0.0.1:${server.address().port}`; };
const stop = server => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); });

test('proxy handles delegated children, mixed batches, snapshots, HEAD and cache validation', async () => {
 const foreign=foreignFixture(), url=await start(foreign);
 const server=createOntologyServer({delegationUrls:{geo:url+'/v1/'}}), base=await start(server);
 try {
  const get=async path=>{const response=await fetch(base+path);assert.equal(response.status,200,path);return response.json();};
  const a=await get('/v1/definitions/S:G/children?limit=1&offset=1');
  const b=await get('/v1/definitions?parent=S:G&limit=1&offset=1');
  assert.deepEqual(a,b); assert.equal(a.data.length,1);assert.equal(a.meta.total,3);
  assert.deepEqual((await get('/v1/definitions?codes=I:P,S:G:CO')).data.map(n=>n.Code),['I:P','S:G:CO']);
  const snapshot=await get('/v1/catalogue?expand=delegations');
  assert.equal(snapshot.meta.complete,true); assert.ok(snapshot.data.nodes['S:G:AD:US']);assert.equal(snapshot.data.datasets.countries.records.length,2);
  const boundary=await get('/v1/definitions/S:G');
  assert.equal(boundary.data.Delegation.url,'https://geo-ekkis.vercel.app/v1/');
  assert.equal(boundary.data.Children,undefined);
  assert.deepEqual(snapshot.data.nodes['S:G'].Delegation,boundary.data.Delegation);
  for(const node of [boundary.data,snapshot.data.nodes['S:G'],snapshot.data.nodes['S:G:AD:US']]){
    assert.equal(node.delegation,'geo');
    assert.equal(node.authoritativeUrl,'https://geo-ekkis.vercel.app/v1/');
  }
  const local=await get('/v1/catalogue');assert.equal(local.meta.complete,false);assert.equal(local.data.nodes['S:G'].Children,undefined);assert.equal(local.data.nodes['S:G'].authoritativeUrl,'https://geo-ekkis.vercel.app/v1/');
  const first=await fetch(base+'/v1/definitions/S:G:CO');
  const head=await fetch(base+'/v1/definitions/S:G:CO',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.equal(head.headers.get('etag'),first.headers.get('etag'));
  const cached=await fetch(base+'/v1/definitions/S:G:CO',{headers:{'if-none-match':first.headers.get('etag')}});assert.equal(cached.status,304);
  assert.equal((await fetch(base+'/v1/definitions/S:GG')).status,404);
  assert.equal((await fetch(base+'/v1/definitions/S:G:NOPE')).status,404);
 } finally {await stop(server);await stop(foreign);}
});

test('upstream errors, incompatible envelopes, redirects and timeouts do not become empty branches', async () => {
 let mode='503', captured;
 const foreign=createServer((req,res)=>{
  captured=req.headers;
  if(mode==='timeout') return;
  if(mode==='redirect'){res.writeHead(302,{location:'/v1/definitions/S:G'});res.end();return;}
  res.setHeader('content-type','application/json');
  res.writeHead(mode==='503'?503:200);
  res.end(JSON.stringify(mode==='bad'?{data:{},meta:{ontologyVersion:'7.0.0'}}:{error:{message:'secret internal error'}}));
 });
 const url=await start(foreign), server=createOntologyServer({delegationUrls:{geo:url+'/v1/'},upstreamTimeout:50}),base=await start(server);
 try {
  for(const [next,status] of [['503',503],['bad',502],['redirect',502],['timeout',504]]){
   mode=next;
   const r=await fetch(base+'/v1/definitions/S:G:CO',{headers:{authorization:'Bearer private',cookie:'secret=true'}});
   assert.equal(r.status,status,next);assert.equal((await r.json()).error.code,'.ontology.upstream-unavailable');
   assert.equal(captured.authorization,undefined);assert.equal(captured.cookie,undefined);
  }
  const boundary=await fetch(base+'/v1/definitions/S:G');assert.equal(boundary.status,200);
  assert.equal((await boundary.json()).data.Delegation.url,'https://geo-ekkis.vercel.app/v1/');
  assert.equal((await fetch(base+'/v1/definitions/I:P')).status,200);
 } finally {await stop(server);await stop(foreign);}
});

test('foreign offline snapshots cannot overwrite local definitions',async()=>{
 const catalogue=loadCatalogue();
 const fetchImpl=async()=>new Response(JSON.stringify({data:{version:catalogue.version,nodes:{'S:G':{Code:'S:G',Name:'Geography',Collection:false,Composite:false},'I:P':{Code:'I:P',Name:'Hijacked',Collection:false,Composite:false}},datasets:{}},meta:{ontologyVersion:catalogue.version}}));
 await assert.rejects(hydrateCatalogue(catalogue,{fetchImpl}),/namespace/);
});
