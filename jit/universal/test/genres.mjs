import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {replay} from '../src/story/state.js';
assert.equal(GENRES.length,12);
for(const genre of GENRES){for(let ordinal=0;ordinal<25;ordinal++){const f=generateFilm(genre,ordinal);assert.equal(f.genre,genre);assert.equal(f.scenes.length,15);assert.deepEqual(f,generateFilm(genre,ordinal));assert.deepEqual(replay(f.causality.initial,f.causality.events),f.causality.final);assert(f.fountain.includes('Title:'));}}
console.log('All '+GENRES.length+' genres generated and causally replayed for 25 seeds each');
