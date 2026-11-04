import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {recombination,ACTIONS,DEVICES,MOVES} from '../src/story/recombination.js';
assert(ACTIONS.length>=12&&DEVICES.length>=12&&MOVES.length>=12);
for(const genre of GENRES){const signatures=new Set();for(let n=0;n<100;n++){const film=generateFilm(genre,n);assert.deepEqual(recombination(film.identity.id),recombination(film.identity.id));assert.equal(film.scenes.filter(s=>s.recombination).length,15);signatures.add(film.recombination.deviceIds.join(','));}assert(signatures.size>=10,genre+' device breadth');}
console.log('12 genres × 100 seeds: cross-genre device recombination and deterministic scene realization');
