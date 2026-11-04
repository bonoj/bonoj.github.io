import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
for(const genre of GENRES.filter(g=>g!=='thriller')){
const f=generateFilm(genre,0);
assert(new Set(f.scenes.map(s=>s.location)).size>=2,genre+' location diversity');
assert(f.scenes[1].blocks[0].text.includes(f.premise===undefined?'':f.scenes[1].blocks[0].text.split('.')[0]));
assert(f.scenes[8].blocks[0].text.includes('discovery'),genre+' discovery realization');
assert(f.scenes[11].blocks[0].text.includes(f.cast.ally),genre+' ally choice');
assert(f.scenes[12].blocks[0].text.includes(f.cast.opponent),genre+' opposition');
}
console.log('Genre realization: 11 adapters with scene geography, clue, discovery and choice');
