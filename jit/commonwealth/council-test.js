'use strict';
const assert=require('node:assert/strict'),{deliberate}=require('./council');
const s={name:'synthetic',sharedCapacity:50,regions:[{id:'A',need:100,capacity:20},{id:'B',need:60,capacity:40},{id:'C',need:50,capacity:50}]};
const r=deliberate(s);
assert.equal(r.totalGap,100);assert.equal(r.available,50);assert.equal(r.audit.conserved,true);assert.equal(r.audit.nonnegative,true);assert.equal(r.audit.shortageRemaining,true);assert.equal(r.audit.constitutional.approved,true);assert.deepEqual(r.audit.disagreements,['A','B']);assert.equal(r.stewardA.allocation[0].transfer,40);assert.equal(r.stewardB.allocation[1].transfer,20);assert.match(r.decision,/human review/);
assert.throws(()=>deliberate({...s,sharedCapacity:-1}));
const noGap=deliberate({regions:[{id:'X',need:1,capacity:2}],sharedCapacity:50});assert.equal(noGap.available,0);assert.equal(noGap.audit.conserved,true);
console.log('12/12 council assertions passed');
