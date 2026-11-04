// Causal provenance: track which earlier state change made a later action possible.
// This is a diagnostic graph, not a proof of narrative coherence.
const reads={
 observe:['knowledge'],reveal:['knowledge'],conceal:['secrets'],accuse:['trust'],apologize:['trust'],promise:['promises'],fulfill:['promises'],
 betray:['trust'],reconcile:['trust'],take:['holder'],give:['holder'],return:['holder'],lock:['access'],unlock:['access'],
 spend:['resources'],gain:['resources'],damage:['condition'],repair:['condition'],delay:['deadline'],advance:['deadline'],
 appoint:['authority'],depose:['authority'],depart:['location'],arrive:['location']
};
const writes={...reads,observe:['knowledge'],reveal:['knowledge'],accuse:['trust'],apologize:['trust'],betray:['trust'],reconcile:['trust']};
export function causalGraph(scenes){
 const last=new Map(),nodes=[],edges=[];
 for(const scene of scenes){
  const e=scene.event,thread=['central','relationship','practical'][scene.number%3],requires=[];
  for(const field of reads[e.type]||[]){
   const prior=last.get(field);
   if(prior!==undefined){requires.push(prior);edges.push({from:prior,to:scene.number,via:field});}
  }
  const priorActor=last.get('actor:'+e.actor);
  if(priorActor!==undefined&&!requires.includes(priorActor)){requires.push(priorActor);edges.push({from:priorActor,to:scene.number,via:'character-continuity'});}
  nodes.push({scene:scene.number,type:e.type,actor:e.actor,target:e.target,goal:e.motive.goal,thread,requires});
  for(const field of writes[e.type]||[])last.set(field,scene.number);
  last.set('actor:'+e.actor,scene.number);
 }
 return {version:1,nodes,edges,connected: nodes.filter(n=>n.requires.length).length,threads:['central','relationship','practical']};
}
