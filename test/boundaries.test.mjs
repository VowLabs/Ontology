import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,rmSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {loadCatalogue,ontologyRoot} from '../catalogue.mjs';

test('Humanities moves into Society with a versioned migration and historical definitions',()=>{
 const c=loadCatalogue();
 assert.equal(c.version,'10.2.0');
 assert.equal(c.migrations['10.1.2'].To,c.version);
 assert.equal(c.migrations['10.1.1'].To,'10.1.2');
 assert.equal(c.migrations['10.1.0'].To,'10.1.1');
 assert.equal(c.nodes.U,undefined);
 assert.equal(c.nodes['R'].Children.U,'R:U');
 assert.equal(c.nodes['R:U'].Name,'Humanities');
 assert.deepEqual(c.nodes['R:U'].Children,{});
 assert.equal(c.migrations['7.0.0'].To,'8.0.0');
 assert.equal(c.migrations['8.0.0'].To,'8.1.0');
 assert.equal(c.migrations['8.1.0'].To,'8.2.0');
 assert.equal(c.migrations['8.2.0'].To,'9.0.0');
 assert.equal(c.migrations['9.0.0'].To,'10.0.0');
 assert.equal(c.migrations['10.0.0'].To,'10.1.0');
 assert.deepEqual(c.migrations['7.0.0'].Prefixes,{U:'R:U'});
 assert.equal(c.legacy[c.migrations['7.0.0'].Legacy].Nodes.U.Name,'Humanities');
 for(const [code,node] of Object.entries(c.legacy['7.0.0'].Nodes)) {
  if(!['','B','R','U','S:G','I:C'].includes(code) && !code.startsWith('S:G:') && !code.startsWith('I:')) {
   const {Collection,Composite,...current}=c.nodes[code];
   assert.deepEqual(current,node,code);
  }
 }
});

test('active definitions exclude reference rows and application schemas',()=>{
 const c=loadCatalogue();
 for(const code of ['I:CN','I:PR:NN','I:PR:SUB','F:AC','S:I:D:LEX','G:CO:US','B:PRO:LAW'])assert.equal(c.nodes[code],undefined,code);
 for(const n of Object.values(c.nodes))for(const key of ['Records','ManagedBy','Preference','RegistryVersion','Storage'])assert.equal(n[key],undefined,n.Code);
 assert.equal(c.datasets.services.records.length,15);
 assert.equal(c.datasets.professions.records.length,36);
 assert.equal(c.datasets.countries.records,undefined);
 assert.equal(c.datasets.countries.delegation,'geo');
 assert.equal(c.nodes['S:G'].Children,undefined);
 assert.equal(c.datasets.professions.records.find(r=>r.id==='LAW').legacyCode,'B:PRO:LAW');
 assert.ok(c.legacy['4.2.0'].Nodes['I:CN']);
 assert.equal(c.application,undefined);
});
test('loader rejects embedded data, app ownership and duplicate dataset IDs',()=>{
 const directory=mkdtempSync(join(tmpdir(),'ontology-boundaries-'));
 try{
  cpSync(ontologyRoot,directory,{recursive:true,filter:s=>!s.split('/').some(p=>['.git','node_modules'].includes(p))});
  const file=join(directory,'Science/Technology/Service/index.json'),original=readFileSync(file,'utf8');
  for(const extra of [{Records:[]},{ManagedBy:'Wallet'},{Preference:'debugMode'},{Storage:'shared'}]){
   writeFileSync(file,JSON.stringify({...JSON.parse(original),...extra}));assert.throws(()=>loadCatalogue(directory),/Data or application state/);
  }
  writeFileSync(file,original);
  const dataFile=join(directory,'data/services/index.json'),data=JSON.parse(readFileSync(dataFile));
  data.records.push(data.records[0]);writeFileSync(dataFile,JSON.stringify(data));assert.throws(()=>loadCatalogue(directory),/Invalid dataset record/);
 }finally{rmSync(directory,{recursive:true,force:true});}
});

test('identity labels are concise and display-name codes remain stable',()=>{
 const c=loadCatalogue();assert.equal(c.nodes['I:P'].Name,'Individual');assert.equal(c.nodes['I:O'].Name,'Organization');assert.equal(c.nodes['I:P:DN'].Name,'Display Name');
 assert.equal(c.nodes['I:P'].Children.DN,'I:P:DN');
});

test('collection means repeatable while composite means one grouped value',()=>{
 const c=loadCatalogue();
 for(const node of Object.values(c.nodes)){
  if(node.Code==='I:C:AD'){assert.equal(node.Type,'S:G:AD');assert.equal(node.Collection,undefined);assert.equal(node.Composite,undefined);continue;}
  assert.equal(typeof node.Collection,'boolean',node.Code);
  assert.equal(typeof node.Composite,'boolean',node.Code);
  if(typeof node.Scalar==='boolean')assert.equal(node.Collection,!node.Scalar,node.Code);
 }
 assert.equal(c.nodes['I:C:EM'].Collection,true);
 assert.equal(c.nodes['I:C:EM'].Composite,false);
 assert.equal(c.nodes['I:C'].Composite,false);
 assert.equal(c.nodes['I:C:SM'].Composite,true);
 assert.equal(c.nodes['I:P:DN'].Collection,false);
 assert.equal(c.nodes.I.Collection,false);
 assert.equal(c.nodes['I:C:P'],undefined);
 assert.equal(c.nodes['I:C:N'],undefined);
 assert.equal(c.nodes['I:C'].Children.EM,'I:C:EM');
 assert.equal(c.collections.checkout.Fields.includes('I:C:EM'),true);
});

 test('organization fields and contact methods use canonical definitions',()=>{
 const c=loadCatalogue();
 assert.equal(c.nodes['I:C:EC'],undefined);
 assert.equal(c.nodes['I:C:EM'].Name,'Electronic mail');
 assert.equal(c.nodes['I:C:SM'].Name,'Social media');
 assert.equal(c.nodes['I:O:T'].Choices,'I:O:K');
 assert.equal(c.nodes['I:O:K:FD'].Name,'Foundation');
 assert.equal(c.nodes['I:O:HQ'].RecordReference,'S:G:AD');
 assert.deepEqual(c.migrations['9.0.0'].RetiredPrefixes,['I:C:EC']);
 });

test('delegation routing is derived from the public boundary definition',()=>{
 const source=JSON.parse(readFileSync(join(ontologyRoot,'Science/Geography/index.json'))),catalogue=loadCatalogue();
 assert.equal(source.Delegation.url,'https://geo-ekkis.vercel.app/v1/');
 assert.equal(existsSync(join(ontologyRoot,'_support/delegations.json')),false);
 assert.deepEqual(catalogue.delegations.geo,{...source.Delegation,prefix:'S:G',ontologyVersion:catalogue.version});
});
