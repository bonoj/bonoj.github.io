import assert from 'node:assert/strict';
import {GENRES,generateFilm} from '../src/story/film.js';
import {PRIMITIVES} from '../src/story/primitives.js';
import {CONTRACTS,validateContracts} from '../src/story/contracts.js';
import {composeCausality,replayCausality} from '../src/story/composition.js';
assert.equal(validateContracts(),PRIMITIVES.length);
assert.equal(Object.keys(CONTRACTS).length,PRIMITIVES.length);
for(const genre of GENRES){let accepted=0;let rejected=0;for(let i=0;i<1000;i++){const id='u1-'+genre+'-'+i;const c=composeCausality(id);assert.deepEqual(c,composeCausality(id));assert.deepEqual(replayCausality(c),c.final);assert.equal(c.accepted+c.rejected.length,75);accepted+=c.accepted;rejected+=c.rejected.length;}assert(accepted>0);const f=generateFilm(genre,0);assert.deepEqual(replayCausality(f.abstractCausality),f.abstractCausality.final);console.log(genre+': '+accepted+' accepted abstract effects, '+rejected+' rejected');}
console.log('All '+PRIMITIVES.length+' primitives have abstract contracts; 12,000 compositions replayed');
