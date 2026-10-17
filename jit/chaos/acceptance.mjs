// Run: node jit/chaos/acceptance.mjs /absolute/path/to/three.module.mjs
// Three must be the same official 0.180.0 module as index.html. No DOM/WebGL claims.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const T=await import(pathToFileURL(process.argv[2]).href);
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const code=html.slice(html.indexOf('// shell/arcana/hermeticon.js'),html.indexOf('// shell/chaos-entry.js')).replace(/^import .*;$/mg,'');
const api=new Function('T','T2','T3','T4','T5','THREE',code+';return {createEntropy,createChaosLedger,createBeadDebris,createMnemonicLoom,createTerrainEntityContract};')(T,T,T,T,T,T);
const make=()=>api.createEntropy({observer:false});
const system=(w,n)=>w.inspect().systems.find(s=>s.name===n);
const w=make();const stages=[];let prior;
for(let i=0;i<9000;i++){
 w.step();
 const s=w.loomSnapshot();assert(s.ledger.balanced);assert.equal(s.ledger.balances.debris,s.debris.items.length);
 if(s.state.phase!==prior){stages.push({tick:s.state.tick,phase:s.state.phase});prior=s.state.phase;}
}
const final=system(w,'Mnemonic Loom');assert(final.completed>=2);assert(final.repaired>=1);assert.equal(final.ledger.balances.span,100);assert(Object.values(final.invariants).every(Boolean));
const replay=make();for(let i=0;i<9000;i++){if(i%33===0)replay.setViewOffset(Math.sin(i)*6,Math.cos(i)*6);replay.step();}
assert.deepEqual(replay.loomSnapshot(),w.loomSnapshot());
assert(system(replay,'Arcana — Terrain Entity Contract v1').entities.every(e=>e.frameError<1e-10));
const observed=api.createEntropy({observer:true});for(let i=0;i<9000;i++)observed.step();assert.deepEqual(observed.loomSnapshot(),w.loomSnapshot());
const checkpoints=[];
for(const tick of [750,3600,3700,4200]){
 const a=make();for(let i=0;i<tick;i++)a.step();const saved=JSON.parse(JSON.stringify(a.loomSnapshot()));const b=make();b.restoreLoom(saved);
 for(let i=tick;i<6000;i++){a.step();b.step();}assert.deepEqual(a.loomSnapshot(),b.loomSnapshot());checkpoints.push(tick);
}
const broken=w.loomSnapshot();broken.ledger.balances.stock=-1;assert.throws(()=>w.restoreLoom(broken));assert.equal(w.loomSnapshot().ledger.balances.span,100);
for(const kind of ['sensorConnected','transportConnected']){
 w.loomCommand(kind,false);const position=w.loomSnapshot().state.position;
 for(let i=0;i<120;i++)w.step();assert.deepEqual(w.loomSnapshot().state.position,position);assert(system(w,'Mnemonic Loom').blocked);w.loomCommand(kind,true);
}
w.loomCommand('powerConnected',false);for(let i=0;i<9000;i++)w.step();assert.equal(system(w,'Mnemonic Loom').blocked,'power shortage');w.loomCommand('powerConnected',true);for(let i=0;i<120;i++)w.step();assert.notEqual(system(w,'Mnemonic Loom').blocked,'power shortage');
const slow=make(),fast=make();for(let i=0;i<900;i++)slow.update(1/30);for(let i=0;i<3600;i++)fast.update(1/120);assert.deepEqual(slow.loomSnapshot(),fast.loomSnapshot());
const ledger=api.createChaosLedger({a:10,b:0});assert(!ledger.transfer('a','b',11,0,'reject'));assert(!ledger.transfer('a','missing',1,0,'reject'));assert.equal(ledger.count('a'),10);
const capture=api.createBeadDebris(T,{terrain:{sample:()=>-1},offset:()=>({x:0,z:0}),innerRadius:10.07,parent:new T.Group(),abiogenesis:{position:new T.Vector3(0,-6,0),scale:.12,innerRadius:10.07}});
capture.emit([{x:0,y:-6,z:0,r:.05,color:new T.Color('cyan')}],{x:0,y:-6,z:0},0);capture.update(1/60);assert.equal(capture.inspect().abiogenesisCaptures,1);assert.equal(capture.inspect().ownership.abiogenesis,1);
// Inject a changed support into the actual entity/loom factories.
let supportLost=false;const surface=(x,z)=>supportLost&&x>2?null:1+.03*x;
const terrain={group:new T.Group()},view={offset:{x:0,z:0},center:new T.Vector3(),radius:10.07};
const entities=api.createTerrainEntityContract(T,terrain,surface,view);
const fakeDebris={locateBatch:()=>[],snapshotBatch:()=>({emitted:0,items:[]})};
const supportLoom=api.createMnemonicLoom(T,{entities,surface,debris:fakeDebris});supportLost=true;supportLoom.update(1/60);assert.equal(supportLoom.inspect().blocked,'footing loss; span closed');
console.log(JSON.stringify({sourceSHA256:createHash('sha256').update(html).digest('hex'),three:T.REVISION,scope:'Actual monolith factories, Node + Three; no WebGL',ticks:9000,stages,inventory:final.ledger.balances,total:final.ledger.total,checksum:final.ledger.checksum,checkpointTicks:checkpoints,passed:['no-Wanderer boot','default observer equivalence','conservation every tick','construct-damage-salvage-repair','view-independent full-state replay','checkpoint during construction and loose/carrying salvage','malformed checkpoint rejection','sensor and transport disconnect/reconnect','power starvation/recovery','30/120 Hz cadence equivalence','negative and missing-destination transfer rejection','secondary capture fixture','uneven footings and support-loss stop'],unverified:['GPU shader compilation and aperture boundary','mobile performance','complete terrain/world checkpoint','Crown/Seam/Underside civilization']},null,2));
