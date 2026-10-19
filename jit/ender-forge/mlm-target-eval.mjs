/* Independent target-selector training and held-out scene checks.
   Labels are authored preferences, not ground-truth environmental reward. */
import {MicroTarget} from "./mlm-policy.js";
const e=(kind,distance,carrying=false)=>({kind,distance,carrying});
const scene=(...visible)=>({visible});
const training=[
 [scene(e("worm-worker",101),e("worm-depot",103)),"APPROACH",1],
 [scene(e("moth-worker",40),e("moth-depot",65)),"APPROACH",1],
 [scene(e("crab-depot",90),e("crab-worker",15)),"APPROACH",0],
 [scene(e("bee-worker",35,true),e("bee-worker",15,false)),"FOLLOW",0],
 [scene(e("ant-worker",65,false),e("ant-worker",95,true)),"FOLLOW",1],
 [scene(e("worm-worker",20,true),e("worm-depot",30)),"APPROACH",1],
 [scene(e("moth-depot",85),e("moth-depot",15)),"APPROACH",1],
 [scene(e("bee-worker",45,false),e("bee-worker",10,true)),"FOLLOW",1]
].map(([observation,action,target])=>({observation,action,target}));
const holdout=[
 [scene(e("scarab-worker",75),e("scarab-depot",95)),"APPROACH",1],
 [scene(e("worm-worker",115),e("worm-depot",123)),"APPROACH",1],
 [scene(e("moth-depot",95),e("moth-worker",8)),"APPROACH",0],
 [scene(e("rat-worker",30,true),e("rat-worker",12,false)),"FOLLOW",0],
 [scene(e("worm-worker",35,false),e("worm-worker",70,true)),"FOLLOW",1],
 [scene(e("ant-depot",110),e("ant-depot",25)),"APPROACH",1]
].map(([observation,action,target])=>({observation,action,target}));
const target=new MicroTarget();
const predict=x=>target.select(x.observation,x.action)?.target;
const before=holdout.map(predict);
target.train(training,{epochs:900,rate:.04});
const after=holdout.map(predict);
const result={schema:"ender-micro-target-eval/v1",before:before.filter((v,i)=>v===holdout[i].target).length,after:after.filter((v,i)=>v===holdout[i].target).length,total:holdout.length,expected:holdout.map(x=>x.target),predicted:after,weights:target.weights.length,checkpoint:target.export(),note:"Synthetic authored preferences; no live target outcome evaluation"};
console.log(JSON.stringify({...result,checkpoint:"omitted from console"},null,2));
if(result.after!==result.total)process.exitCode=1;
