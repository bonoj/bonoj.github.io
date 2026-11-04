import {assert,validateEvent} from '../core/schema.js';
export function initialState({characters=[],facts=[],objects=[],locations=[]}={}){return {characters:Object.fromEntries(characters.map(c=>[c.id,{...c,alive:true,location:c.location||null,knowledge:[...(c.knowledge||[])]}])),facts:Object.fromEntries(facts.map(f=>[f.id,{...f}])),objects:Object.fromEntries(objects.map(o=>[o.id,{...o}])),locations:Object.fromEntries(locations.map(l=>[l.id,{...l}])),promises:{},threads:{},access:{},trust:{},history:[]};}
const owns=(s,id)=>Object.prototype.hasOwnProperty.call(s,id);
export function applyEvent(state,event){validateEvent(event);const s=structuredClone(state);const actor=s.characters[event.actor];assert(actor&&actor.alive,'actor unavailable: '+event.actor);const id=event.subject;
switch(event.type){
case 'learnsFact':case 'discoversEvidence':assert(owns(s.facts,id),'fact not established: '+id);assert(!actor.knowledge.includes(id),'already known');actor.knowledge.push(id);break;
case 'revealsFact':assert(actor.knowledge.includes(id),'revealer does not know fact');assert(s.characters[event.target]?.alive,'recipient unavailable');if(!s.characters[event.target].knowledge.includes(id))s.characters[event.target].knowledge.push(id);break;
case 'transfersObject':assert(s.objects[id]?.owner===event.actor,'object not held');assert(s.characters[event.target]?.alive,'recipient unavailable');s.objects[id].owner=event.target;break;
case 'entersLocation':assert(owns(s.locations,id),'unknown location');actor.location=id;break;
case 'makesPromise':assert(!owns(s.promises,id),'duplicate promise');s.promises[id]={maker:event.actor,recipient:event.target||null,status:'open'};break;
case 'breaksPromise':assert(s.promises[id]?.maker===event.actor&&s.promises[id].status==='open','promise not open');s.promises[id].status='broken';break;
case 'resolvesThread':assert(s.threads[id]?.status==='open','thread not open');s.threads[id].status='resolved';break;
case 'changesTrust':assert(s.characters[event.target],'unknown target');assert(Number.isFinite(event.amount),'invalid trust delta');s.trust[[event.actor,event.target].sort().join('|')]=(s.trust[[event.actor,event.target].sort().join('|')]||0)+event.amount;break;
case 'incursInjury':actor.injured=true;break;
case 'dies':actor.alive=false;break;
case 'changesGoal':actor.goal=id;break;
case 'opensAccess':s.access[id]=true;break;
case 'closesAccess':s.access[id]=false;break;
case 'spendsResource':assert(s.objects[id]?.owner===event.actor,'resource not held');delete s.objects[id];break;
default:throw Error('unsupported event: '+event.type);
}
s.history.push({...event});return s;}
export function replay(initial,events){return events.reduce(applyEvent,initial);}
