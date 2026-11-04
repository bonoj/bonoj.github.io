import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {replay} from '../src/story/state.js';
for(const genre of GENRES.filter(g=>g!=='thriller')){
const films=Array.from({length:100},(_,n)=>generateFilm(genre,n));
assert.equal(new Set(films.map(f=>f.architecture)).size,2,genre+' needs two causal families');
assert.equal(new Set(films.map(f=>f.premise)).size,2,genre+' needs different premises');
for(const f of films){assert.deepEqual(replay(f.causality.initial,f.causality.events),f.causality.final);assert.equal(f.scenes[1].functionId,'disruption');assert.equal(f.scenes[13].functionId,'consequence');}
}
console.log('11 genres, two scenario families each, 1100 deterministic replay checks');
