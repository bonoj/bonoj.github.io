import {MicroShadow} from "./mlm-shadow.js";
import {MicroPolicy,MicroTarget} from "./mlm-policy.js";
const policy=new MicroPolicy();
const training=[
 [{visible:[]},"ROAM"],
 [{visible:[{kind:"worm-worker",carrying:true,distance:20}]},"FOLLOW"],
 [{visible:[{kind:"worm-worker",carrying:false,distance:20}]},"LOOK"],
 [{visible:[{kind:"worm-depot",distance:30}]},"APPROACH"],
 [{visible:[{kind:"tower",distance:40}]},"LOOK"]
].map(([observation,action])=>({observation,action}));
policy.train(training,{epochs:600,rate:.06});
const targets=new MicroTarget();
targets.train([
 {observation:{visible:[{kind:"worm-worker",distance:101,carrying:false},{kind:"worm-depot",distance:103}]},action:"APPROACH",target:1},
 {observation:{visible:[{kind:"moth-worker",distance:15,carrying:false},{kind:"moth-depot",distance:60}]},action:"APPROACH",target:1},
 {observation:{visible:[{kind:"bee-worker",distance:25,carrying:true},{kind:"bee-worker",distance:12,carrying:false}]},action:"FOLLOW",target:0},
 {observation:{visible:[{kind:"worm-depot",distance:95},{kind:"worm-depot",distance:25}]},action:"APPROACH",target:1}
],{epochs:800,rate:.05});
const shadow=new MicroShadow({policy,targets,capacity:2});
const snap=(seconds,entities)=>({schema:"ender-local-observation/v1",seconds,self:{x:90,y:452},entities});
const a=shadow.observe(snap(17,[{kind:"tower",land:"swamp",distance:73}]));
const b=shadow.observe(snap(20,[{kind:"worm-worker",carrying:false,distance:101},{kind:"worm-depot",distance:103}]));
const c=shadow.observe(snap(23,[{kind:"worm-worker",carrying:false,distance:115},{kind:"worm-depot",distance:123}]));
const exportData=shadow.export();
const checks=[a.prediction.ok,b.prediction.ok,c.prediction.ok,exportData.records.length===2,exportData.records[0].id===2,policy.steps===training.length*600,exportData.records.every(x=>x.note.includes("Read-only")),b.prediction.action==="APPROACH"&&b.prediction.target?.kind==="worm-depot",c.prediction.action==="APPROACH"&&c.prediction.target?.kind==="worm-depot"];
const result={schema:"ender-micro-shadow-test/v1",passed:checks.filter(Boolean).length,total:checks.length,predictions:[a,b,c].map(x=>({at:x.at,action:x.prediction.action,target:x.prediction.target??null})),modelSteps:policy.steps};
console.log(JSON.stringify(result,null,2));
if(result.passed!==result.total)process.exitCode=1;
