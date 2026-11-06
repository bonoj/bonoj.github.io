#!/usr/bin/env node
// Run: node validate-photography.mjs [photography.json]
import { readFileSync } from 'node:fs';
const path = process.argv[2] ?? new URL('./photography.json', import.meta.url);
const data = JSON.parse(readFileSync(path, 'utf8'));
const errors = [];
const assert = (ok, msg) => { if (!ok) errors.push(msg); };
assert(data.schema === 'resolva-photography/v1', 'unsupported schema');
assert(data.policy.style === 'photorealistic' && data.policy.inpaint === false && data.policy.bakedText === false, 'photographic invariants violated');
assert(data.scenes.length === 18, 'expected 18 planned scenes');
const ids = new Set();
for (const s of data.scenes) {
  assert(!ids.has(s.id), s.id + ': duplicate id'); ids.add(s.id);
  assert(['planned','generated','review','approved','rejected'].includes(s.status), s.id + ': invalid status');
  assert(['mobile','tablet','desktop'].every(k => s.crop[k] && Array.isArray(s.crop[k].focal) && s.crop[k].focal.length === 2 && s.crop[k].focal.every(n => typeof n === 'number' && n >= 0 && n <= 1)), s.id + ': crop focal points invalid');
  if (s.canonicalWoman) assert(s.referenceIds.includes(data.character.id), s.id + ': canonical identity missing');
  if (s.status === 'approved') {
    assert(!!s.assets.master && !!s.provenance.sha256 && !!s.provenance.license, s.id + ': approved image lacks master/hash/license');
    assert(Object.entries(s.review).filter(([k]) => k !== 'approvedBy').every(([,v]) => v === true) && !!s.review.approvedBy, s.id + ': approval gates incomplete');
    assert(!!s.generation.model && !!s.generation.version && !!s.generation.prompt, s.id + ': provenance of generation missing');
  }
}
const hero = data.scenes.find(s => s.id === '01');
assert(hero && hero.canonicalWoman, 'hero must use canonical woman');
if (hero?.status === 'approved') assert(!!hero.assets.backgroundPlate && !!hero.assets.alpha, 'hero needs registered plate and subject alpha');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('RESOLVA photographic manifest valid: ' + data.scenes.length + ' scenes; ' + data.scenes.filter(s=>s.status==='approved').length + ' approved.');
