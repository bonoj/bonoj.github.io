/* Faithful subset of human-supplied T+26 trace: observed coordinates and kinds.
   No invented worker identities or inferred deliveries. */
import {MicroEvidence} from "./mlm-evidence.js";
const snapshots=[
 {seconds:2,self:{x:36,y:35},entities:[{kind:"creep",dx:99,dy:-58}]},
 {seconds:5,self:{x:123,y:142},entities:[]},
 {seconds:8,self:{x:241,y:330},entities:[{kind:"creep",dx:-66,dy:-99}]},
 {seconds:11,self:{x:243,y:386},entities:[]},
 {seconds:14,self:{x:198,y:415},entities:[{kind:"tower",land:"swamp",dx:-79,dy:-49}]},
 {seconds:17,self:{x:144,y:435},entities:[{kind:"tower",land:"swamp",dx:-25,dy:-69}]},
 {seconds:20,self:{x:90,y:452},entities:[{kind:"tower",land:"swamp",dx:29,dy:-86},{kind:"worm-worker",dx:5,dy:-101,carrying:false},{kind:"worm-worker",dx:-34,dy:-79,carrying:false},{kind:"worm-depot",dx:-21,dy:-101}]},
 {seconds:23,self:{x:36,y:469},entities:[{kind:"worm-worker",dx:49,dy:-112,carrying:false},{kind:"worm-worker",dx:43,dy:-107,carrying:false},{kind:"worm-depot",dx:33,dy:-118}]},
 {seconds:26,self:{x:48,y:433},entities:[{kind:"tower",land:"swamp",dx:71,dy:-67},{kind:"worm-worker",dx:29,dy:-72,carrying:false},{kind:"worm-worker",dx:40,dy:-69,carrying:false},{kind:"worm-worker",dx:21,dy:-82,carrying:false},{kind:"worm-depot",dx:21,dy:-82},{kind:"eagle",dx:72,dy:-40}]}
];
const memory=new MicroEvidence();
const observations=snapshots.map(s=>({t:s.seconds,...memory.observe(s)}));
const result={schema:"ender-real-evidence-replay/v1",source:"Human-provided Ender T+26 clipboard; positions transcribed, worker identity not inferred",observations,final:memory.export(),checks:{snapshots:snapshots.length,firstKinds:observations.flatMap(x=>x.discoveries).filter(x=>x.type==="first-kind").map(x=>x.kind),repeatedTowerNotRediscovered:observations.slice(5).every(x=>!x.discoveries.some(d=>d.type==="first-structure-location"&&d.kind==="tower")),repeatedDepotNotRediscovered:observations.slice(7).every(x=>!x.discoveries.some(d=>d.type==="first-structure-location"&&d.kind==="worm-depot"))}};
console.log(JSON.stringify(result,null,2));
if(!result.checks.repeatedTowerNotRediscovered||!result.checks.repeatedDepotNotRediscovered)process.exitCode=1;
