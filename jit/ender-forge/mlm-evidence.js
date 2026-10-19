/* Bounded local epistemic memory: repeated sightings are not new knowledge.
   Distinguishes new kind, first grounded structure location, and unconfirmed change.
   Does not assert identity for mobile workers or causal rewards. */
const stableKind=k=>k==="tower"||String(k).endsWith("-depot");
const point=(self,e)=>({x:self.x+e.dx,y:self.y+e.dy});
const valid=(self,e)=>Number.isFinite(self?.x)&&Number.isFinite(self?.y)&&Number.isFinite(e?.dx)&&Number.isFinite(e?.dy);
export class MicroEvidence {
 constructor({capacity=32,tolerance=20}={}){this.capacity=Math.max(1,Math.min(128,capacity|0));this.tolerance=tolerance;this.known=[];this.seenKinds=new Set();this.samples=0}
 observe(o){
  const discoveries=[],uncertainties=[];
  if(!o?.self||!Array.isArray(o.entities))return {ok:false,reason:"invalid-observation"};
  const t=o.seconds??null;this.samples++;
  for(const e of o.entities){
   const kind=String(e.kind||"unknown");
   if(!this.seenKinds.has(kind)){this.seenKinds.add(kind);discoveries.push({type:"first-kind",kind,at:t})}
   if(!stableKind(kind)||!valid(o.self,e))continue;
   const p=point(o.self,e);
   const land=e.land||null;
   const match=this.known.find(k=>k.kind===kind&&k.land===land&&Math.hypot(k.x-p.x,k.y-p.y)<=this.tolerance);
   if(match){match.last=t;match.count++;continue}
   // Multiple coordinates may represent relocation or distinct structures.
   if(this.known.some(k=>k.kind===kind&&k.land===land))uncertainties.push({type:"unmatched-structure",kind,land,at:t});
   else discoveries.push({type:"first-structure-location",kind,land,x:Math.round(p.x),y:Math.round(p.y),at:t});
   this.known.push({kind,land,x:p.x,y:p.y,first:t,last:t,count:1});
   if(this.known.length>this.capacity)this.known.shift();
  }
  return {ok:true,discoveries,uncertainties,known:this.known.length,samples:this.samples};
 }
 export(){return {schema:"ender-micro-evidence/v1",samples:this.samples,kinds:[...this.seenKinds],structures:this.known.map(x=>({...x}))}}
}
