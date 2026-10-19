/* Read-only policy shadow. Does not control Ender or train on its predictions.
   Input adapter uses the exact local observation shape from enderSnapshot(). */
import {MicroPolicy,MicroTarget,decideIntent,encodeObservation,ACTIONS} from "./mlm-policy.js";
export function adaptLocalSnapshot(snapshot,{landmarks=[],events=[],goal=null}={}){
 if(snapshot?.schema!=="ender-local-observation/v1"||!Array.isArray(snapshot.entities))throw Error("Local snapshot required");
 return {visible:snapshot.entities.map(e=>({...e})),landmarks,events,goal};
}
export class MicroShadow {
 constructor({policy=new MicroPolicy(),targets=new MicroTarget(),capacity=24}={}){
  this.policy=policy;this.targets=targets;this.capacity=Math.max(1,Math.min(128,capacity|0));
  this.records=[];this.nextId=1;
 }
 observe(snapshot,context={}){
  const observation=adaptLocalSnapshot(snapshot,context);
  const prediction=decideIntent(this.policy,this.targets,observation);
  const probabilities=this.policy.probabilities(observation);
  const features=[...encodeObservation(observation)];
  const record={id:this.nextId++,at:snapshot.seconds,position:{...snapshot.self},
    prediction,diagnostics:{actions:ACTIONS.map((action,i)=>({action,p:Math.round(probabilities[i]*10000)/10000})),features,workers:observation.visible.filter(e=>String(e.kind).endsWith("-worker")).length,depots:observation.visible.filter(e=>String(e.kind).endsWith("-depot")).length},visible:observation.visible.map(e=>({kind:e.kind,distance:e.distance,carrying:e.carrying??null})),
    note:"Read-only prediction; no action executed or reward assigned"};
  this.records.push(record);if(this.records.length>this.capacity)this.records.shift();
  return record;
 }
 export(){return {schema:"ender-micro-shadow/v1",records:this.records,modelSteps:this.policy.steps,limits:"No action execution, online reward or causal attribution"}}
}
