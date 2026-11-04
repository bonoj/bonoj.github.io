import assert from 'node:assert/strict';
import {generateFilm} from '../src/story/film.js';
import {validateScreenplay} from '../src/render/fountain.js';
const outputs=[];for(let n=0;n<1000;n++){const f=generateFilm('thriller',n);assert.equal(f.scenes.length,15);assert.equal(f.scenes.at(-1).functionId,'closing-image');assert.equal(validateScreenplay(f),true);assert.deepEqual(f,generateFilm('thriller',n));outputs.push(f);}
assert.throws(()=>generateFilm('unlisted',0),/not implemented/);
const unique=new Set(outputs.map(f=>f.fountain)).size;
assert(unique>100);
console.log(JSON.stringify({tested:outputs.length,architectures:new Set(outputs.map(f=>f.architecture)).size,distinctTitles:new Set(outputs.map(f=>f.title)).size,distinctCasts:new Set(outputs.map(f=>f.cast.protagonist+'|'+f.cast.ally+'|'+f.cast.opponent)).size,uniqueFullScripts:unique,semanticDiversity:'three authored architectures; not 1000 distinct films'}));
