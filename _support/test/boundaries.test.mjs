import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {loadCatalogue,ontologyRoot} from '../catalogue.mjs';

test('active definitions exclude reference rows and application schemas',()=>{
 const c=loadCatalogue();
 for(const code of ['I:CN','I:PR:NN','I:PR:SUB','F:AC','S:I:D:LEX','G:CO:US','B:PRO:LAW'])assert.equal(c.nodes[code],undefined,code);
 for(const n of Object.values(c.nodes))for(const key of ['Records','ManagedBy','Preference','RegistryVersion','Storage'])assert.equal(n[key],undefined,n.Code);
 assert.equal(c.datasets.services.records.length,15);
 assert.equal(c.datasets.professions.records.length,36);
 assert.equal(c.datasets.countries.records.length,250);
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
 const c=loadCatalogue();assert.equal(c.nodes['I:P'].Name,'Personal');assert.equal(c.nodes['I:O'].Name,'Organization');assert.equal(c.nodes['I:P:DN'].Name,'Display Name');
 assert.equal(c.nodes['I:P'].Children.DN,'I:P:DN');
});
