import assert from 'node:assert/strict';
import {world,transition,runWorld,replayWorld} from '../src/story/ontology.js';
import {mugDemonstration} from '../src/story/mug.js';
import {GENRES} from '../src/story/film.js';
const w=world({places:[{id:'a',neighbors:['b']},{id:'b',neighbors:['a']}],agents:[{id:'A',at:'a'},{id:'B',at:'a'}],objects:[{id:'mug',heldBy:'A',fragile:true}],facts:[{id:'broken'}]});
assert.throws(()=>transition(w,{type:'give',actor:'B',object:'mug',to:'A'}));
const events=[{type:'drop',actor:'A',object:'mug',impact:'hard'},{type:'take',actor:'B',object:'mug'},{type:'observe',actor:'B',fact:'broken',at:'a'},{type:'tell',actor:'B',fact:'broken',to:'A'},{type:'move',actor:'A',from:'a',to:'b'}];
const run=runWorld(w,events);assert.deepEqual(replayWorld(w,events),run.final);assert.equal(run.final.objects.mug.heldBy,'B');assert.equal(run.final.objects.mug.condition,'broken');assert(run.final.agents.A.knows.includes('broken'));assert.equal(w.objects.mug.heldBy,'A');
for(const genre of GENRES){const m=mugDemonstration(genre);assert.equal(m.events[0].type,'drop');assert.equal(m.final.objects.mug.at,'room');assert(m.final.agents.WITNESS.knows.includes('noise-heard'));assert(m.final.agents.WITNESS.believes.includes('meaning'));}
console.log('Concrete world transitions, custody, location, perception and 12 genre interpretations verified');
