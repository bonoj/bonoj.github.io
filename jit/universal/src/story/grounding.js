import {world,transition,replayWorld} from './ontology.js';
import {stream,integer} from '../core/prng.js';
// Autonomous, seeded event sampling. No required object, witness, or plot pattern.
// The same concrete state ledger supplies all rendered physical/epistemic actions.
const props=['letter','key','ledger','photograph','parcel','map','ring','book','record','token'];

export function groundFilm(film){
const rng=stream(film.identity.id,'autonomous-grounding-v3');
const locations=[...new Set(film.scenes.map(s=>s.location))];
const agents=[...new Set([film.cast.protagonist,film.cast.ally,film.cast.opponent,...film.scenes.flatMap(s=>s.participants)])];
const objects=Array.from({length:5},(_,i)=>({id:'item-'+i,kind:props[integer(rng,props.length)],at:locations[integer(rng,locations.length)],fragile:false}));
const facts=Array.from({length:5},(_,i)=>({id:'fact-'+i}));
const initial=world({agents:agents.map(id=>({id,at:locations[0]})),places:locations.map(id=>({id,neighbors:locations.filter(p=>p!==id)})),objects,facts});
let state=initial;const events=[],trace=[],families=new Set();
const commit=(scene,event)=>{state=transition(state,event);events.push(event);scene.concreteEvents.push(event);};
for(const scene of film.scenes){
scene.concreteEvents=[];
const participants=scene.participants.length?scene.participants:[film.cast.protagonist];
const actor=participants[integer(rng,participants.length)];
if(state.agents[actor].at!==scene.location)commit(scene,{type:'move',actor,from:state.agents[actor].at,to:scene.location});
const options=[];
for(const object of Object.values(state.objects)){
if(object.heldBy===null&&object.at===scene.location)options.push({family:'custody',type:'take',object:object.id});
if(object.heldBy===actor)options.push({family:'custody',type:'drop',object:object.id});
for(const target of participants)if(target!==actor&&object.heldBy===actor&&state.agents[target].at===scene.location)options.push({family:'exchange',type:'give',object:object.id,to:target});
}
for(const target of participants)if(target!==actor&&state.agents[target].at===scene.location){
const other=state.agents[actor];
if(!other.commitments.includes('commitment-'+target))options.push({family:'commitment',type:'promise',to:target,fact:'commitment-'+target});
else options.push({family:'commitment',type:'fulfill',fact:'commitment-'+target});
if((other.trust[target]??0)<0)options.push({family:'relationship',type:'reconcile',to:target});
else options.push({family:'relationship',type:'betray',to:target});
}
for(const fact of Object.values(state.facts)){
if(!state.agents[actor].knows.includes(fact.id))options.push({family:'knowledge',type:'observe',fact:fact.id});
if(state.agents[actor].knows.includes(fact.id))for(const target of participants)if(target!==actor&&state.agents[target].at===scene.location&&!state.agents[target].knows.includes(fact.id))options.push({family:'communication',type:'tell',fact:fact.id,to:target});
if(state.agents[actor].knows.includes(fact.id)&&!state.agents[actor].believes.includes(fact.id))options.push({family:'inference',type:'infer',basis:fact.id,fact:fact.id});
}
const fresh=options.filter(o=>!families.has(o.family));
const pool=fresh.length?fresh:options;
if(!pool.length)continue;
const selected=pool[integer(rng,pool.length)];
const event={type:selected.type,actor};
if(selected.object)event.object=selected.object;
if(selected.to)event.to=selected.to;
if(selected.fact)event.fact=selected.fact;
if(selected.basis)event.basis=selected.basis;
if(event.type==='observe')event.at=scene.location;
if(event.type==='drop')event.impact='soft';
commit(scene,event);families.add(selected.family);
const object=selected.object?state.objects[selected.object]:null;
const lines={
take:()=>`${actor} takes possession of the ${object.kind}. It is no longer where it was left.`,
drop:()=>`${actor} puts down the ${object.kind}. It remains at ${scene.location.toLowerCase()}.`,
give:()=>`${actor} hands the ${object.kind} to ${event.to}. Its custody changes.`,
observe:()=>`${actor} notices a detail no one has yet explained. The observation stays with ${actor}.`,
tell:()=>`${actor} shares an earlier observation with ${event.to}. What one person knew, two now know.`,
infer:()=>`${actor} draws a conclusion from an earlier observation. It is a belief, not a newly witnessed fact.`,
promise:()=>`${actor} promises ${event.to} to act. An obligation now exists.`,
fulfill:()=>`${actor} fulfills an earlier promise. The obligation is discharged.`,
betray:()=>`${actor} breaks faith with ${event.to}. Their relationship deteriorates.`,
reconcile:()=>`${actor} makes amends with ${event.to}. Some trust is restored.`
};
const text=lines[event.type]();scene.blocks.push({type:'action',text});
trace.push({scene:scene.number,family:selected.family,event,text});
}
if(JSON.stringify(replayWorld(initial,events))!==JSON.stringify(state))throw Error('concrete event replay mismatch');
return {version:4,initial,events,final:state,trace,sceneCount:trace.length,families:[...families]};
}
