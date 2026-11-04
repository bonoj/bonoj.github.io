import {world,transition,replayWorld} from './ontology.js';
// Concrete physical and epistemic events, rendered from validated state transitions.
// Deliberately a narrow integrated slice; not a claim that the entire plot is generated.
const props=['mug','key','envelope','photograph','glass','note','parcel','token','document','coat','book','map'];
export function groundFilm(film){
const selected=film.scenes.map((scene,i)=>({scene,i})).filter(({i})=>i%3===1);
const locations=[...new Set(film.scenes.map(s=>s.location))];
const agents=[...new Set([film.cast.protagonist,film.cast.ally,film.cast.opponent,...film.scenes.flatMap(s=>s.participants)])];
const objects=selected.map(({scene,i})=>({id:'prop-'+i,kind:props[i%props.length],at:scene.location,fragile:i%2===0}));
const facts=selected.map(({i})=>({id:'noise-'+i}));
const initial=world({agents:agents.map(id=>({id,at:film.scenes[0].location})),places:locations.map(id=>({id,neighbors:locations.filter(other=>other!==id)})),objects,facts});
let state=initial;const allEvents=[];
for(const {scene,i} of selected){
const actor=scene.participants[0]||film.cast.protagonist;
const witness=scene.participants.find(p=>p!==actor)||null;
const events=[];
const move=(who)=>{if(state.agents[who].at!==scene.location)events.push({type:'move',actor:who,from:state.agents[who].at,to:scene.location});};
move(actor);if(witness)move(witness);
const prop='prop-'+i,fact='noise-'+i;
events.push({type:'take',actor,object:prop},{type:'drop',actor,object:prop,impact:i%2===0?'hard':'soft'});
if(witness)events.push({type:'observe',actor:witness,fact,at:scene.location});
for(const event of events)state=transition(state,event);
allEvents.push(...events);scene.concreteEvents=events;
const object=state.objects[prop],condition=object.condition;
scene.blocks.push({type:'action',text:`${actor} picks up a ${object.kind}, then drops it. ${condition==='broken'?'It breaks against the floor.':'It lands intact.'}${witness?' '+witness+' witnesses the fall.':''}`});
}
const replay=replayWorld(initial,allEvents);
if(JSON.stringify(replay)!==JSON.stringify(state))throw Error('concrete scene ledger failed replay');
return {version:1,initial,events:allEvents,final:state,sceneCount:selected.length};
}
