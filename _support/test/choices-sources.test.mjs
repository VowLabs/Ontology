import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {loadCatalogue,ontologyRoot} from '../catalogue.mjs';
import {resolveChoices} from '../choices.mjs';
test('branch choices resolve recursively and reject missing, empty and cyclic targets',()=>{
 const nodes={field:{Choices:'B'},B:{Children:{one:'B:G',two:'B:T'}},'B:G':{Children:{leaf:'B:G:L'}},'B:G:L':{Children:{}},'B:T':{Children:{}}};
 assert.deepEqual(resolveChoices(nodes,'field'),['B:G:L','B:T']);
 for(const choice of ['missing','','B:T',42]) assert.throws(()=>resolveChoices({...nodes,field:{Choices:choice}},'field'));
 assert.throws(()=>resolveChoices({...nodes,'B:T':{Children:{cycle:'B'}}},'field'),/Invalid Choices/);
 assert.deepEqual(resolveChoices({field:{Choices:['a','b']}},'field'),['a','b']);
});
test('source integrity and materialized definitions are validated offline',()=>{
 const directory=mkdtempSync(join(tmpdir(),'ontology-sources-'));
 try{
  cpSync(ontologyRoot,directory,{recursive:true,filter:source=>!source.split('/').some(p=>['.git','node_modules'].includes(p))});
  const baseline=loadCatalogue(directory);assert.equal(baseline.nodes['G:CO:US'].ISO3,'USA');
  const source=join(directory,'_support/sources/geo/data/country/US.json'),bytes=readFileSync(source);
  writeFileSync(source,Buffer.concat([bytes,Buffer.from(' ')]));assert.throws(()=>loadCatalogue(directory),/checksum mismatch/);
  writeFileSync(source,bytes);
  const definition=join(directory,'Geography/Country/US/index.json'),data=JSON.parse(readFileSync(definition));
  data.Name='Changed local name';writeFileSync(definition,JSON.stringify(data));assert.throws(()=>loadCatalogue(directory),/differs from source/);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
test('catalogue rejects invalid choice references and branch custom text escapes',()=>{
 const directory=mkdtempSync(join(tmpdir(),'ontology-choices-'));
 try{
  cpSync(ontologyRoot,directory,{recursive:true,filter:source=>!source.split('/').some(p=>['.git','node_modules'].includes(p))});
  const file=join(directory,'Geography/Address/US/Role.json'),original=JSON.parse(readFileSync(file));
  for(const change of [{Choices:'G:UNKNOWN'},{Choices:'G:AD:RO:SH'},{AllowCustom:true,CustomChoice:'Other'},{ChoiceAliases:{Shipping:'G:AD:RO:SH'}}]){
   writeFileSync(file,JSON.stringify({...original,...change}));assert.throws(()=>loadCatalogue(directory),/Choices|choices/);
  }
 }finally{rmSync(directory,{recursive:true,force:true});}
});
