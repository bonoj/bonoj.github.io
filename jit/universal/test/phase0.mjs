import assert from 'node:assert/strict';
import {hash32,stream,integer} from '../src/core/prng.js';
import {plan,validatePlan} from '../src/story/planner.js';
import {FUNCTIONS} from '../src/story/functions.js';
import {initialState,applyEvent,replay} from '../src/story/state.js';
assert.equal(hash32(''),2166136261);assert.equal(hash32('a'),3826002220);
const seq=()=>Array.from({length:8},stream('u1-horror-7','cast'));assert.deepEqual(seq(),seq());
for(const genre of ['horror','western','romantic-comedy'])for(let n=0;n<100;n++){const p=plan(genre,n);assert.equal(p.beats.length,15);assert.equal(validatePlan(p),true);assert.deepEqual(p,plan(genre,n));assert.deepEqual(p.beats.map(b=>b.functionId),FUNCTIONS.map(f=>f.id));}
const s=initialState({characters:[{id:'a',knowledge:['secret']},{id:'b'}],facts:[{id:'secret',value:true}],objects:[{id:'key',owner:'a'}],locations:[{id:'station'}]});
const events=[{type:'revealsFact',actor:'a',subject:'secret',target:'b'},{type:'transfersObject',actor:'a',subject:'key',target:'b'},{type:'entersLocation',actor:'b',subject:'station'}];
const result=replay(s,events);assert.deepEqual(result.characters.b.knowledge,['secret']);assert.equal(result.objects.key.owner,'b');assert.equal(result.characters.b.location,'station');assert.equal(s.objects.key.owner,'a');
assert.throws(()=>applyEvent(s,{type:'transfersObject',actor:'b',subject:'key',target:'a'}));
assert.throws(()=>applyEvent(s,{type:'revealsFact',actor:'b',subject:'secret',target:'a'}));
assert.equal(integer(()=>0.5,7),2);
console.log('Phase 0: deterministic streams, 300 plans, obligation ledger, and event provenance passed');
