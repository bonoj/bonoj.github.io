import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {replayWorld} from '../src/story/ontology.js';
const all=new Set();
for(const genre of GENRES)for(let ordinal=0;ordinal<50;ordinal++){
const f=generateFilm(genre,ordinal),c=f.concreteCausality;
assert.equal(c.version,3);
assert.deepEqual(replayWorld(c.initial,c.events),c.final);
assert.equal(c.sceneCount,c.trace.length);
assert(c.sceneCount>0);
for(const entry of c.trace){
all.add(entry.event.type);
const scene=f.scenes[entry.scene-1];
assert(scene.concreteEvents.some(e=>e.type===entry.event.type));
assert(scene.blocks.some(b=>b.type==='action'&&b.text===entry.text));
}
assert.deepEqual(generateFilm(genre,ordinal).concreteCausality.events,c.events);
}
assert(all.size>=3,'expected multiple event operators across corpus');
console.log('600 films: deterministic autonomous concrete event sampling, provenance and replay; operators='+[...all].join(','));
