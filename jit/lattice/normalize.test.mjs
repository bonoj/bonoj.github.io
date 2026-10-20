import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalize,validateManifest} from './normalize.mjs';
const m=JSON.parse(readFileSync(new URL('./channels.json',import.meta.url),'utf8'));
assert.equal(validateManifest(m),true);
const mapped=m.channels.filter(x=>x.status==='CODED');assert.equal(mapped.length,25);
for(const c of mapped){const root=c.adapter==='iss'?{[c.field]:c.id==='52'?'1 TEST':4.5,line2:'2 TEST',timestamp:1792524364}:{current:{[c.field]:4.5,time:'2026-10-20T19:00'}};const o=normalize(c,root,{url:'https://example.org'});assert.equal(o.channelId,c.id);assert.equal(o.quality,'unverified');assert.equal(o.value,c.id==='52'?'1 TEST':4.5);assert.throws(()=>normalize(c,{}));}
assert.throws(()=>validateManifest({channels:[]}));
console.log('PASS: 53 IDs; '+mapped.length+' deterministic extraction fixtures; missing-data rejection');
