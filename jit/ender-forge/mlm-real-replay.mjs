/* Captured Ender T+129 field observation, supplied by the human.
   This is a single genuine snapshot, not a dataset or proof of competence.
   Run: node mlm-real-replay.mjs */
import {MicroPolicy,MicroTarget,decideIntent,validateIntent} from "./mlm-policy.js";
const observation={
 t:129,self:{x:709,y:457,steps:2456},radius:125,
 visible:[
  {kind:"moth-worker",dx:1,dy:13,distance:13,carrying:false},
  {kind:"moth-worker",dx:6,dy:-15,distance:16,carrying:false},
  {kind:"moth-worker",dx:-5,dy:-7,distance:9,carrying:false},
  {kind:"moth-depot",dx:10,dy:0,distance:10}
 ],
 landmarks:[
  {kind:"moth-depot",x:719,y:457,last:128,n:4},
  {kind:"crab-depot",x:478,y:445,last:122,n:12},
  {kind:"tower",x:545,y:194,last:107,n:10}
 ],
 events:[
  {t:104,type:"cargo-count-change",label:"scarab-worker carrying 2→1"},
  {t:107,type:"cargo-count-change",label:"worm-worker carrying 4→1"},
  {t:113,type:"cargo-count-change",label:"worm-worker carrying 1→0"}
 ],
 goal:{label:"revisit swamp tower",x:388,y:245}
};
const policy=new MicroPolicy(),target=new MicroTarget();
const actionTraining=[
 {observation:{visible:[]},action:"ROAM"},
 {observation:{visible:[{kind:"bee-worker",carrying:true,distance:30}]},action:"FOLLOW"},
 {observation:{visible:[{kind:"moth-depot",distance:60}]},action:"APPROACH"},
 {observation:{visible:[{kind:"tower",distance:12}]},action:"LOOK"}
];
const targetTraining=[
 {action:"FOLLOW",observation:{visible:[{kind:"bee-worker",carrying:false,distance:70},{kind:"bee-worker",carrying:true,distance:25}]},target:1},
 {action:"APPROACH",observation:{visible:[{kind:"moth-depot",distance:100},{kind:"moth-depot",distance:18}]},target:1}
];
policy.train(actionTraining,{epochs:800});target.train(targetTraining,{epochs:400});
const prediction=policy.decide(observation);
const result=decideIntent(policy,target,observation);
const report={
 schema:"ender-mlm-real-replay/v1",source:"human-supplied Ender T+129 local snapshot",
 prediction,result:{ok:result.ok,action:result.action,target:result.target?.kind||null},
 valid:result.ok,
 caveat:"One real snapshot, trained on synthetic examples; no outcome labels, target execution, browser inference or real-world success measured"
};
console.log(JSON.stringify(report,null,2));
if(!report.valid)process.exitCode=1;
