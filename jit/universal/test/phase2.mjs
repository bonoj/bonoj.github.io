import assert from 'node:assert/strict';
import {generateFilm} from '../src/story/film.js';
import {replay} from '../src/story/state.js';
const corpus=Array.from({length:300},(_,n)=>generateFilm('thriller',n));
assert.equal(new Set(corpus.map(x=>x.architecture)).size,3);
for(const f of corpus){
assert.equal(f.scenes.length,15);
assert(f.causality.events.length>9);
assert.equal(f.causality.events.filter(x=>x.type!=='entersLocation').length,9);
assert.deepEqual(replay(f.causality.initial,f.causality.events),f.causality.final);
assert.deepEqual(f,generateFilm('thriller',f.identity.ordinal));
for(const scene of f.scenes){assert(scene.heading.includes(scene.location));for(const block of scene.blocks)if(block.type==='character')assert(scene.participants.includes(block.text));}
}
const groups={};for(const f of corpus)(groups[f.architecture]??=[]).push(f);
for(const [id,films] of Object.entries(groups)){assert(films.length>50,id+' underrepresented');assert(new Set(films[0].scenes.map(s=>s.location)).size>=4,'insufficient scene locations');}
console.log(JSON.stringify({tested:corpus.length,architectures:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length])),minimumEvents:Math.min(...corpus.map(f=>f.causality.events.length)),locationValidation:true}));
