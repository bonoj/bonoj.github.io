import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {PRIMITIVES,PRIMITIVE_COUNTS,primitive} from '../src/story/primitives.js';
import {breadthPlan,breadthSignature} from '../src/story/breadth.js';
assert(PRIMITIVES.length>=500);
assert.equal(new Set(PRIMITIVES.map(p=>p.id)).size,PRIMITIVES.length);
for(const genre of GENRES){const seen=new Set();for(let i=0;i<1000;i++){const id='u1-'+genre+'-'+i;const p=breadthPlan(id);assert.deepEqual(p,breadthPlan(id));assert.equal(p.slots.length,15);for(const slot of p.slots)for(const key of Object.values(slot.primitives))assert(primitive(key));seen.add(breadthSignature(p));}assert.equal(seen.size,1000,genre+' breadth signatures');const film=generateFilm(genre,0);assert.equal(film.breadth.slots.length,15);}
console.log('Breadth: '+PRIMITIVES.length+' stable primitives, 12,000 unique seeded 15-slot signatures across 12 genres');
