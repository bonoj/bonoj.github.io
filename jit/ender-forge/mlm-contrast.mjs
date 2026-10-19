/* Contrastive policy test: disjoint synthetic scenes + real T+129 replay.
   Labels encode an experimental preference, not objectively correct behavior. */
import {MicroPolicy,MicroTarget,decideIntent} from "./mlm-policy.js";
const worker=(kind,carrying,distance)=>({kind:kind+"-worker",carrying,distance});
const depot=(kind,distance)=>({kind:kind+"-depot",distance});
const scene=(...visible)=>({visible});
const training=[
 [scene(),"ROAM"],
 [scene(worker("bee",true,30)),"FOLLOW"],
 [scene(worker("ant",true,50),worker("ant",false,30)),"FOLLOW"],
 [scene(worker("moth",false,12),worker("moth",false,25),worker("moth",false,40)),"LOOK"],
 [scene(worker("worm",false,40),worker("worm",false,60)),"LOOK"],
 [scene(depot("moth",60)),"APPROACH"],
 [scene(depot("crab",30)),"APPROACH"],
 [scene({kind:"tower",distance:12}),"LOOK"],
 [scene({kind:"creep",distance:12}),"WAIT"],
 [scene(worker("bee",false,90)),"LOOK"],
 [scene(worker("bee",true,20),depot("bee",60)),"FOLLOW"]
].map(([observation,action])=>({observation,action}));
const holdout=[
 [scene(worker("scarab",false,13),worker("scarab",false,16),worker("scarab",false,9),depot("scarab",10)),"LOOK"],
 [scene(worker("worm",true,24)),"FOLLOW"],
 [scene(depot("ant",52)),"APPROACH"],
 [scene({kind:"tower",distance:18}),"LOOK"],
 [scene(),"ROAM"],
 [scene(worker("moth",false,15)),"LOOK"]
].map(([observation,action])=>({observation,action}));
const model=new MicroPolicy();const before=holdout.map(x=>model.decide(x.observation).action);
model.train(training,{epochs:1200,rate:.05});
const after=holdout.map(x=>model.decide(x.observation).action);
const real={
 visible:[worker("moth",false,13),worker("moth",false,16),worker("moth",false,9),depot("moth",10)],
 landmarks:[{kind:"moth-depot",x:719,y:457}],events:[{type:"cargo-count-change"}],goal:{label:"revisit swamp tower"}
};
const realPrediction=model.decide(real);
const result={schema:"ender-mlm-contrast/v1",holdout:{before:before.filter((x,i)=>x===holdout[i].action).length,after:after.filter((x,i)=>x===holdout[i].action).length,total:holdout.length,predicted:after,expected:holdout.map(x=>x.action)},real:{action:realPrediction.action,confidence:realPrediction.confidence},parameters:model.weights.length*model.weights[0].length,note:"Synthetic supervised contrasts and one real replay; labels are authored and no world consequence measured"};
console.log(JSON.stringify(result,null,2));
