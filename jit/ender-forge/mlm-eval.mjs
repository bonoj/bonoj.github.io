/* Run with: node mlm-eval.mjs
   Holdout tests are disjoint scenes, not independent real-world behavior. */
import {MicroPolicy,MicroTarget,decideIntent,validateIntent} from "./mlm-policy.js";
const scene=(...visible)=>({visible});
const training=[
 {observation:scene(),action:"ROAM"},
 {observation:scene({kind:"bee-worker",carrying:true,distance:30}),action:"FOLLOW"},
 {observation:scene({kind:"moth-depot",distance:60}),action:"APPROACH"},
 {observation:scene({kind:"tower",distance:12}),action:"LOOK"}
];
const holdout=[
 {observation:scene(),action:"ROAM"},
 {observation:scene({kind:"worm-worker",carrying:true,distance:20}),action:"FOLLOW"},
 {observation:scene({kind:"ant-depot",distance:55}),action:"APPROACH"},
 {observation:scene({kind:"tower",distance:20}),action:"LOOK"},
 {observation:scene({kind:"bee-worker",carrying:false,distance:25}),action:"FOLLOW"}
];
const policy=new MicroPolicy();
const untrained=holdout.map(e=>policy.decide(e.observation).action===e.action);
policy.train(training,{epochs:800});
const predicted=holdout.map(e=>policy.decide(e.observation).action);
const target=new MicroTarget();
const targetTrain=[
 {action:"FOLLOW",observation:scene({kind:"bee-worker",carrying:false,distance:70},{kind:"bee-worker",carrying:true,distance:25}),target:1},
 {action:"APPROACH",observation:scene({kind:"moth-depot",distance:100},{kind:"moth-depot",distance:18}),target:1}
];
const targetHoldout=[
 {action:"FOLLOW",observation:scene({kind:"worm-worker",carrying:false,distance:65},{kind:"ant-worker",carrying:true,distance:18}),target:1},
 {action:"APPROACH",observation:scene({kind:"crab-depot",distance:95},{kind:"ant-depot",distance:16}),target:1},
 {action:"FOLLOW",observation:scene({kind:"bee-worker",carrying:true,distance:15},{kind:"worm-worker",carrying:false,distance:85}),target:0}
];
target.train(targetTrain,{epochs:400});
const targetPredicted=targetHoldout.map(e=>target.select(e.observation,e.action)?.target);
const invalid=[
 validateIntent({action:"FOLLOW",target:100},scene({kind:"bee-worker"})).ok,
 validateIntent({action:"FOLLOW",target:0},scene({kind:"tower"})).ok,
 validateIntent({action:"TELEPORT"},scene()).ok
];
const result={
 schema:"ender-mlm-eval/v1",
 note:"Synthetic holdout only; same author-designed feature/label rules, no real Ender observations",
 action:{before:untrained.filter(Boolean).length,total:holdout.length,after:predicted.filter((p,i)=>p===holdout[i].action).length,predicted,expected:holdout.map(x=>x.action)},
 target:{correct:targetPredicted.filter((p,i)=>p===targetHoldout[i].target).length,total:targetHoldout.length,predicted:targetPredicted},
 invalidRejected:invalid.every(x=>x===false),
 noTargetFallback:decideIntent({decide:()=>({action:"FOLLOW"})},target,scene()).action==="LOOK",
 checkpoint:MicroTarget.import(target.export()).steps===target.steps&&MicroPolicy.import(policy.export()).steps===policy.steps
};
console.log(JSON.stringify(result,null,2));
if(!result.invalidRejected||!result.noTargetFallback||!result.checkpoint)process.exitCode=1;
