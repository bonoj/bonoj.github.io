/* Reproducible signed-feedback learning smoke test.
   Reward is explicitly supplied by test harness, not fabricated by model. */
import {MicroPolicy,MicroExperience,ACTIONS} from "./mlm-policy.js";
const o={visible:[{kind:"moth-worker",carrying:false,distance:15}]};
const p=new MicroPolicy(),e=new MicroExperience(p,{capacity:8,rate:.08});
const before=p.probabilities(o)[ACTIONS.indexOf("FOLLOW")];
const rejected=e.resolve({reward:1}).ok===false;
for(let i=0;i<24;i++){
 if(!e.begin(o,{action:"FOLLOW"}).ok)throw Error("Could not begin episode");
 if(!e.resolve({reward:-1}).ok)throw Error("Could not resolve episode");
}
const after=p.probabilities(o)[ACTIONS.indexOf("FOLLOW")];
const snapshot=e.snapshot();
const result={schema:"ender-mlm-experience-test/v1",before,after,decreased:after<before,history:snapshot.history.length,bounded:snapshot.history.length===8,rejected,source:"Harness-authored negative outcomes; no actual world reward"};
console.log(JSON.stringify(result,null,2));
if(!result.decreased||!result.bounded||!result.rejected)process.exitCode=1;
