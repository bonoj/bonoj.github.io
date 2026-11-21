'use strict';
/* Deterministic synthetic civic simulation. No external authority or actions. */
const {assess}=typeof require==='function'?require('./stewardship.js'):globalThis.CommonwealthStewardship;
function deliberate(scenario){
 const {regions,sharedCapacity}=scenario;
 if(!Array.isArray(regions)||!Number.isFinite(sharedCapacity)||sharedCapacity<0||regions.some(r=>!r.id||!Number.isFinite(r.need)||!Number.isFinite(r.capacity)||r.need<0||r.capacity<0))throw Error('invalid scenario');
 const gaps=regions.map(r=>Math.max(0,r.need-r.capacity)),total=gaps.reduce((a,b)=>a+b,0),available=Math.min(sharedCapacity,total);
 const proportional=regions.map((r,i)=>({id:r.id,transfer:total?available*gaps[i]/total:0,unmet:gaps[i]-(total?available*gaps[i]/total:0)}));
 let remaining=available;const smallestFirst=regions.map((r,i)=>({id:r.id,gap:gaps[i]})).sort((a,b)=>a.gap-b.gap||a.id.localeCompare(b.id));
 const byId={};for(const r of smallestFirst){byId[r.id]=Math.min(remaining,r.gap);remaining-=byId[r.id];}
 const targeted=regions.map((r,i)=>({id:r.id,transfer:byId[r.id],unmet:gaps[i]-byId[r.id]}));
 const disagreements=regions.filter((r,i)=>Math.abs(proportional[i].transfer-targeted[i].transfer)>1e-8).map(r=>r.id);
 const proposal={jurisdiction:'synthetic',mandate:{valid:true,scope:['publish-recommendation']},action:'publish-recommendation',humanApproval:true,independentReview:true,proposer:'steward-a',approver:'human-reviewer',auditor:'independent-auditor',discriminate:false,conditionEssentialsOnWork:false,affectsEssentialServices:true,continuityPlan:'existing capacity preserved',externalTransfer:false,coerciveAction:false,appealAvailable:true,evidence:{source:'synthetic fixture',uncertainty:'high'}};
 const constitutional=assess(proposal);
 const audit={inputValid:true,conserved:Math.abs(proportional.reduce((a,r)=>a+r.transfer,0)-available)<1e-7&&Math.abs(targeted.reduce((a,r)=>a+r.transfer,0)-available)<1e-7,nonnegative:[...proportional,...targeted].every(r=>r.transfer>=0&&r.unmet>=-1e-8),shortageRemaining:total>available,disagreements,constitutional};
 return {scenario:scenario.name||'synthetic',available,totalGap:total,stewardA:{policy:'proportional-gap',allocation:proportional},stewardB:{policy:'smallest-gap-first',allocation:targeted},audit,decision:'human review required: no autonomous selection or transfer'};
}
if(typeof module!=='undefined')module.exports={deliberate};
else globalThis.CommonwealthCouncil={deliberate};
