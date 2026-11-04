import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {replayWorld} from '../src/story/ontology.js';
for(const genre of GENRES)for(let ordinal=0;ordinal<50;ordinal++){
const f=generateFilm(genre,ordinal),c=f.concreteCausality;
assert.equal(c.sceneCount,5);
assert.deepEqual(replayWorld(c.initial,c.events),c.final);
assert.equal(c.events.filter(e=>e.type==='drop').length,5);
for(const s of f.scenes.filter(s=>s.concreteEvents))assert(s.blocks.some(b=>b.type==='action'&&b.text.includes('drops it')));
}
console.log('600 film fixtures: concrete scene event provenance and replay');
