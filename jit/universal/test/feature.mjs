import assert from 'node:assert/strict';
import {generateFeature} from '../src/story/feature.js';
import {GENRES} from '../src/genre/catalog.js';
const fingerprints=new Set(),types=new Set();
for(const genre of GENRES){
 const local=new Set();
 for(let ordinal=0;ordinal<100;ordinal++){
  const film=generateFeature(genre,ordinal);
  assert(film.scenes.length>=65&&film.scenes.length<=90);
  assert.equal(film.causality.events.length,film.scenes.length);
  assert(film.causality.agency.centralCharacterDecisions>=10);
  assert.equal(film.causality.graph.nodes.length,film.scenes.length);
  assert(film.causality.graph.connected>film.scenes.length/2);
  assert(film.causality.graph.edges.every(edge=>edge.from<edge.to));
  assert(film.scenes.every(scene=>scene.event.motive?.goal));
  assert(film.scenes.every(scene=>scene.event.before!==scene.event.after));
  assert(film.fountain.length>10000);
  assert(film.scenes.every(s=>s.blocks.filter(b=>b.type==='dialogue').length>=6));
  assert.equal(film.fountain,generateFeature(genre,ordinal).fountain);
  const fp=film.causality.fingerprint;local.add(fp);fingerprints.add(fp);
  for(const e of film.causality.events)types.add(e.type);
 }
 assert(local.size>=95,'insufficient structural variety: '+genre);
}
assert(types.size>=15,'insufficient operator variety');
console.log('1200 deterministic feature-scale drafts; fingerprints='+fingerprints.size+'; operators='+types.size);
