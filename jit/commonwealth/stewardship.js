'use strict';
// Synthetic constitutional gate: no real identity, funds, or external actions.
function assess(p) {
 const f=[];
 if(!p||typeof p!=='object')return {approved:false,failures:['invalid proposal']};
 if(!p.jurisdiction||!p.mandate?.valid)f.push('missing lawful mandate');
 if(!p.mandate?.scope?.includes(p.action))f.push('action outside mandate');
 if(!p.humanApproval||!p.independentReview)f.push('missing independent human authorization');
 if(p.proposer===p.approver||p.approver===p.auditor||p.proposer===p.auditor)f.push('separation of duties');
 if(p.discriminate||p.conditionEssentialsOnWork)f.push('unconditional rights violated');
 if(p.affectsEssentialServices&&!p.continuityPlan)f.push('missing service continuity');
 if(p.externalTransfer||p.coerciveAction)f.push('external transfer or coercive action forbidden in research prototype');
 if(!p.appealAvailable)f.push('no accessible appeal');
 if(!p.evidence?.source||!p.evidence?.uncertainty)f.push('unverifiable evidence');
 return {approved:f.length===0,failures:f};
}
function allocate(regions,available){
 if(!Array.isArray(regions)||!Number.isFinite(available)||available<0)throw Error('invalid input');
 if(regions.some(r=>!Number.isFinite(r.need)||r.need<0||!Number.isFinite(r.capacity)||r.capacity<0))throw Error('invalid region');
 const gaps=regions.map(r=>Math.max(0,r.need-r.capacity)),total=gaps.reduce((a,b)=>a+b,0),share=total===0?0:Math.min(1,available/total);
 return regions.map((r,i)=>({id:r.id,need:r.need,capacity:r.capacity,transfer:gaps[i]*share,unmet:gaps[i]*(1-share)}));
}
if(typeof module!=='undefined')module.exports={assess,allocate};

if(typeof window!=='undefined')window.CommonwealthStewardship={assess,allocate};
