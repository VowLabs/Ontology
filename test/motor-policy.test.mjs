import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalogue} from '../src/catalogue.mjs';
test('motor policy terms are distinct from issued policies and preserve exact monetary values',()=>{
 const {nodes,migrations}=loadCatalogue();
 assert.equal(nodes['B:MP'].Composite,true);assert.equal(nodes['B:MP'].Collection,true);
 assert.equal(nodes['B:IN'].Children.N,'B:IN:N');assert.equal(nodes['F:P:IS:MO'].Name,'Motor insurance');
 for(const key of ['CV','DD','PM']){
  const n=nodes[`B:MP:${key}`];assert.equal(n.Type,'S:I:D:T:S');
  const pattern=new RegExp(n.Pattern);assert.ok(pattern.test('10000.000001'));assert.ok(pattern.test('0'));
  for(const value of ['-1','1e3','01','NaN']) assert.equal(pattern.test(value),false);
 }
 const h=new RegExp(nodes['B:MP:VH'].Pattern);assert.ok(h.test('0x'+'ab'.repeat(32)));assert.equal(h.test('plain VIN'),false);
 assert.equal(nodes['B:MP:TM'].Maximum,31536000);assert.equal(nodes['B:MP:RW'].Minimum,1);
 assert.equal(migrations['10.4.0'].To,'10.5.0');assert.deepEqual(migrations['10.4.0'].Prefixes,{});
});
