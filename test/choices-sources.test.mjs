import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {loadCatalogue,ontologyRoot} from '../src/catalogue.mjs';
import {resolveChoices} from '../src/choices.mjs';
test('branch choices resolve recursively and reject missing, empty and cyclic targets',()=>{
 const nodes={field:{Choices:'B'},B:{Children:{one:'B:G',two:'B:T'}},'B:G':{Children:{leaf:'B:G:L'}},'B:G:L':{Children:{}},'B:T':{Children:{}}};
 assert.deepEqual(resolveChoices(nodes,'field'),['B:G:L','B:T']);
 for(const choice of ['missing','','B:T',42]) assert.throws(()=>resolveChoices({...nodes,field:{Choices:choice}},'field'));
 assert.throws(()=>resolveChoices({...nodes,'B:T':{Children:{cycle:'B'}}},'field'),/Invalid Choices/);
 assert.deepEqual(resolveChoices({field:{Choices:['a','b']}},'field'),['a','b']);
});
test('active catalogue contains only the Geography delegation boundary',()=>{
 const c=loadCatalogue();
 assert.equal(Object.keys(c.nodes).filter(code=>code.startsWith('S:G:')).length,0);
 assert.equal(c.datasets.states,undefined);
 assert.equal(c.sources.geo,undefined);
});
test('catalogue rejects invalid choice references and branch custom text escapes',()=>{
 const directory=mkdtempSync(join(tmpdir(),'ontology-choices-'));
 try{
  cpSync(ontologyRoot,directory,{recursive:true,filter:source=>!source.split('/').some(p=>['.git','node_modules'].includes(p))});
  const file=join(directory,'Identity/Person/DisplayName.json'),original=JSON.parse(readFileSync(file));
  for(const change of [{Choices:'G:UNKNOWN'},{Choices:'I:P:DN'},{Choices:'I:P',AllowCustom:true,CustomChoice:'Other'},{Choices:'I:P',ChoiceAliases:{Shipping:'S:G:AD:RO:SH'}}]){
   writeFileSync(file,JSON.stringify({...original,...change}));assert.throws(()=>loadCatalogue(directory),/Choices|choices/);
  }
 }finally{rmSync(directory,{recursive:true,force:true});}
});
