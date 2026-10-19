/* Ender MLM policy v1: tiny learned, menu-free action predictor.
   Isolated experiment: not attached to the live simulation.
   Fixed action grammar, local observations only, strict output validation.
   Learned softmax classifier; synthetic supervision is a bootstrap, NOT emergent curiosity. */
export const ACTIONS=["ROAM","LOOK","APPROACH","FOLLOW","WAIT"];
export const FEATURES=["bias","visible","worker","carrying","depot","tower","creep","near","memory","change","risk","goal","idleWorkers","carryingShare","goalAge","recentFailure"];
const clamp=x=>Math.max(0,Math.min(1,Number.isFinite(x)?x:0));
export function encodeObservation(o={}){
  const v=Array.isArray(o.visible)?o.visible:[];
  const count=f=>v.filter(f).length;
  const workers=v.filter(x=>String(x.kind||"").includes("worker"));
  const nearby=v.filter(x=>Number(x.distance)<40);
  return Float32Array.from([1,clamp(v.length/20),clamp(workers.length/8),
    clamp(workers.filter(x=>x.carrying).length/4),
    clamp(count(x=>String(x.kind||"").includes("depot"))/3),
    clamp(count(x=>x.kind==="tower")/3),
    clamp(count(x=>["creep","enemy","fire-scorpion"].some(k=>String(x.kind||"").includes(k)))/3),
    clamp(nearby.length/5),clamp((o.landmarks||[]).length/10),
    clamp((o.events||[]).length/5),clamp(o.risk||0),o.goal?1:0,
    clamp(workers.filter(x=>!x.carrying).length/8),
    workers.length?workers.filter(x=>x.carrying).length/workers.length:0,
    clamp((o.goal?.age||0)/90),clamp((o.outcomes||[]).filter(x=>x.status==="stale"||x.status==="unreachable").length/4)]);
}
export class MicroPolicy {
  constructor(seed=741){
    this.seed=seed>>>0;this.weights=ACTIONS.map(()=>Float32Array.from(FEATURES,()=> (this.rand()-.5)*.01));
    this.steps=0;
  }
  rand(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296}
  probabilities(input){
    const x=input instanceof Float32Array?input:encodeObservation(input);
    if(x.length!==FEATURES.length)throw Error("Invalid observation feature count");
    const logits=this.weights.map(w=>w.reduce((s,a,i)=>s+a*x[i],0));
    const max=Math.max(...logits),exp=logits.map(z=>Math.exp(z-max)),sum=exp.reduce((a,b)=>a+b,0);
    return exp.map(z=>z/sum);
  }
  train(examples,{epochs=100,rate=.08}={}){
    if(!Array.isArray(examples)||!examples.length)throw Error("Training examples required");
    let loss=0;
    for(let ep=0;ep<epochs;ep++)for(const example of examples){
      const target=ACTIONS.indexOf(example.action);
      if(target<0)throw Error("Unknown training action");
      const x=encodeObservation(example.observation),p=this.probabilities(x);
      loss=-Math.log(Math.max(1e-12,p[target]));
      for(let a=0;a<ACTIONS.length;a++){
        const delta=rate*(p[a]-(a===target?1:0));
        for(let j=0;j<x.length;j++)this.weights[a][j]-=delta*x[j];
      }
      this.steps++;
    }
    return {steps:this.steps,lastLoss:loss};
  }
  decide(observation){
    const probabilities=this.probabilities(observation);
    const index=probabilities.indexOf(Math.max(...probabilities));
    return {action:ACTIONS[index],confidence:probabilities[index]};
  }
  export(){return {schema:"ender-micro-policy/v1",seed:this.seed,steps:this.steps,weights:this.weights.map(w=>[...w])}}
  static import(data){
    if(data?.schema!=="ender-micro-policy/v1"||data.weights?.length!==ACTIONS.length||
       data.weights.some(w=>w.length!==FEATURES.length||w.some(v=>!Number.isFinite(v))))throw Error("Invalid policy checkpoint");
    const m=new MicroPolicy(data.seed);m.weights=data.weights.map(w=>Float32Array.from(w));m.steps=data.steps;return m;
  }
}
export function validateIntent(intent,observation){
  if(!intent||!ACTIONS.includes(intent.action))return {ok:false,reason:"invalid-action"};
  const v=Array.isArray(observation?.visible)?observation.visible:[];
  const memory=Array.isArray(observation?.landmarks)?observation.landmarks:[];
  if(intent.action==="APPROACH"||intent.action==="FOLLOW"){
    const id=intent.target;
    if(!Number.isInteger(id)||id<0||id>=v.length)return {ok:false,reason:"target-not-visible"};
    if(intent.action==="FOLLOW"&&!String(v[id].kind||"").includes("worker"))return {ok:false,reason:"target-not-worker"};
    return {ok:true,action:intent.action,target:v[id]};
  }
  return {ok:true,action:intent.action};
}

/* Learned target binding: score visible candidates directly, without constructing
   an action menu. Only local sensor indices can be selected. */
export const TARGET_FEATURES=["bias","worker","carrying","depot","tower","creep","near","distance","sameKind","risk"];
export function encodeTarget(entity={},observation={}){
  const kind=String(entity.kind||""),distance=Number(entity.distance);
  const d=Number.isFinite(distance)?Math.max(0,distance):125;
  const visible=Array.isArray(observation.visible)?observation.visible:[];
  return Float32Array.from([1,kind.includes("worker")?1:0,entity.carrying?1:0,
    kind.includes("depot")?1:0,kind==="tower"?1:0,
    kind.includes("creep")||kind.includes("scorpion")?1:0,
    d<40?1:0,clamp(d/125),
    clamp(visible.filter(v=>v.kind===kind).length/8),clamp(observation.risk||0)]);
}
export class MicroTarget {
  constructor(seed=741){
    this.seed=seed>>>0;this.weights=Float32Array.from(TARGET_FEATURES,()=>{
      this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;
      return (this.seed/4294967296-.5)*.01;
    });this.steps=0;
  }
  score(entity,observation){
    const x=encodeTarget(entity,observation);
    return this.weights.reduce((sum,w,i)=>sum+w*x[i],0);
  }
  candidates(observation,action){
    const visible=Array.isArray(observation?.visible)?observation.visible:[];
    return visible.map((entity,index)=>({entity,index})).filter(({entity})=>
      action==="APPROACH"||action==="FOLLOW"&&String(entity.kind||"").includes("worker"));
  }
  select(observation,action){
    const candidates=this.candidates(observation,action);
    if(!candidates.length)return null;
    const best=candidates.reduce((a,b)=>this.score(a.entity,observation)>=this.score(b.entity,observation)?a:b);
    return {target:best.index,score:this.score(best.entity,observation)};
  }
  train(examples,{epochs=100,rate=.06}={}){
    if(!examples?.length)throw Error("Target training examples required");
    let lastLoss=0;
    for(let ep=0;ep<epochs;ep++)for(const {observation,action,target} of examples){
      const c=this.candidates(observation,action);
      if(c.length<2||!c.some(x=>x.index===target))throw Error("Need >=2 valid candidates and valid target");
      const logits=c.map(x=>this.score(x.entity,observation));
      const max=Math.max(...logits),exps=logits.map(v=>Math.exp(v-max));
      const total=exps.reduce((a,b)=>a+b,0),probs=exps.map(x=>x/total);
      const correct=c.findIndex(x=>x.index===target);
      lastLoss=-Math.log(Math.max(1e-12,probs[correct]));
      const gradient=new Float32Array(TARGET_FEATURES.length);
      c.forEach((candidate,i)=>{
        const x=encodeTarget(candidate.entity,observation),err=probs[i]-(i===correct?1:0);
        for(let j=0;j<gradient.length;j++)gradient[j]+=err*x[j];
      });
      for(let j=0;j<this.weights.length;j++)this.weights[j]-=rate*gradient[j];
      this.steps++;
    }
    return {steps:this.steps,lastLoss};
  }
  export(){return {schema:"ender-micro-target/v1",seed:this.seed,steps:this.steps,weights:[...this.weights]}}
  static import(d){
    if(d?.schema!=="ender-micro-target/v1"||d.weights?.length!==TARGET_FEATURES.length||
      d.weights.some(x=>!Number.isFinite(x)))throw Error("Invalid target checkpoint");
    const m=new MicroTarget(d.seed);m.weights=Float32Array.from(d.weights);m.steps=d.steps;return m;
  }
}
export function decideIntent(policy,targetModel,observation){
  const choice=policy.decide(observation);
  if(choice.action!=="APPROACH"&&choice.action!=="FOLLOW")return validateIntent(choice,observation);
  const binding=targetModel.select(observation,choice.action);
  if(!binding)return {ok:true,action:"LOOK",fallback:"no-eligible-target"};
  return validateIntent({action:choice.action,target:binding.target},observation);
}
