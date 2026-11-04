import assert from 'node:assert/strict';
import {generateFilm} from '../src/story/film.js';
import {replay} from '../src/story/state.js';
const corpus=Array.from({length:300},(_,n)=>generateFilm('thriller',n));
assert.equal(new Set(corpus.map(x=>x.architecture)).size,3);
for(const f of corpus){assert.equal(f.scenes.length,15);assert.equal(f.causality.events.length,9);assert.deepEqual(replay(f.causality.initial,f.causality.events),f.causality.final);assert.deepEqual(f,generateFilm('thriller',f.identity.ordinal));}
const groups=Object.groupBy(corpus,x=>x.architecture);
for(const [id,films] of Object.entries(groups)){assert(films.length>50,id+' underrepresented');assert(films.every(x=>x.scenes[1].blocks[0].text!==undefined));}
console.log(JSON.stringify({tested:corpus.length,architectures:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length])),eventsPerFilm:9}));
