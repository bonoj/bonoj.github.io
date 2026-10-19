/* Reproducible checkpoint regression; run with Node ESM. */
import {readFileSync} from "node:fs";
import {MicroPolicy,MicroTarget,decideIntent,FEATURES,TARGET_FEATURES} from "./mlm-policy.js";
const checkpoint=JSON.parse(readFileSync(new URL("./mlm-checkpoint.json",import.meta.url),"utf8"));
if(checkpoint.schema!=="ender-micro-checkpoint/v1"||checkpoint.featureCount!==FEATURES.length||checkpoint.targetFeatureCount!==TARGET_FEATURES.length)throw Error("Checkpoint incompatible");
const policy=MicroPolicy.import(checkpoint.action),target=MicroTarget.import(checkpoint.target);
const observation={visible:[{kind:"worm-worker",distance:101,carrying:false},{kind:"worm-depot",distance:103}]};
const prediction=decideIntent(policy,target,observation);
const valid=prediction.ok&&prediction.action==="APPROACH"&&prediction.target===1;
const result={schema:"ender-micro-checkpoint-test/v1",valid,prediction,actionSteps:policy.steps,targetSteps:target.steps,learnedParameters:FEATURES.length*5+TARGET_FEATURES.length};
console.log(JSON.stringify(result,null,2));
if(!valid)process.exitCode=1;
