/* Pure local-evidence consequence evaluator. No privileged world data.
   Only reward changes actually observed between two local snapshots.
   Conservative: visibility loss is unknown, not failure or success. */
const finite=x=>Number.isFinite(x);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function evaluateLocalOutcome(before,after,intent,{arrivalRadius=30}={}){
  const unknown=reason=>({status:"unknown",reward:0,reason});
  if(!before?.self||!after?.self||!intent?.action)return unknown("missing-evidence");
  const a=before.self,b=after.self;
  if(![a.x,a.y,b.x,b.y].every(finite))return unknown("invalid-position");
  const moved=distance(a,b);
  if(intent.action==="ROAM"){
    if(moved>=20)return {status:"observed",reward:.25,reason:"measured-displacement",evidence:{moved}};
    return unknown("insufficient-displacement; may be blocked or waiting");
  }
  if(intent.action==="WAIT"){
    if(after.seconds>before.seconds)return {status:"observed",reward:0,reason:"elapsed-time",evidence:{seconds:after.seconds-before.seconds}};
    return unknown("no-time-evidence");
  }
  if(intent.action==="LOOK"){
    const prev=new Set((before.entities||[]).map(x=>x.kind));
    const newKinds=[...new Set((after.entities||[]).map(x=>x.kind))].filter(k=>!prev.has(k));
    if(newKinds.length)return {status:"observed",reward:.3,reason:"new-visible-kind",evidence:{newKinds}};
    return unknown("no-new-visible-kind; not proof of failed observation");
  }
  if(intent.action==="APPROACH"||intent.action==="FOLLOW"){
    const target=intent.target;
    if(!target||!finite(target.x)||!finite(target.y))return unknown("missing-anchored-target");
    if(intent.action==="FOLLOW"&&target.kind&&!String(target.kind).includes("worker"))return unknown("invalid-follow-kind");
    // A remembered coordinate is not stable identity for moving workers or towers.
    if(intent.action==="FOLLOW")return unknown("worker-identity-and-motion-untracked");
    const beforeDistance=distance(a,target),afterDistance=distance(b,target);
    if(beforeDistance-afterDistance>=12&&afterDistance<beforeDistance)
      return {status:"observed",reward:Math.min(.5,(beforeDistance-afterDistance)/100),reason:"closer-to-anchored-location",evidence:{beforeDistance,afterDistance}};
    if(afterDistance<=arrivalRadius)
      return {status:"observed",reward:.15,reason:"arrived-at-anchored-location",evidence:{afterDistance}};
    return unknown("no-confirmed-progress; target-may-have-moved");
  }
  return unknown("unsupported-action");
}
