import {initialState,applyEvent} from './state.js';
export function transactFilm(film){const lead=film.cast.protagonist,ally=film.cast.ally,opponent=film.cast.opponent;
const locations=[...new Set(film.scenes.map(s=>s.location))];
const state=initialState({characters:[{id:lead},{id:ally},{id:opponent}],facts:[{id:'disruption'},{id:'proof'}],objects:[{id:'evidence',owner:ally}],locations:locations.map(id=>({id}))});
const transactions={
1:[{type:'learnsFact',actor:lead,subject:'disruption'}],
2:[{type:'changesTrust',actor:lead,subject:'commitment',target:ally,amount:1}],
4:[{type:'changesTrust',actor:lead,subject:'alliance',target:ally,amount:1}],
7:[{type:'changesTrust',actor:lead,subject:'betrayal',target:ally,amount:-2}],
8:[{type:'discoversEvidence',actor:lead,subject:'proof'}],
10:[{type:'changesGoal',actor:lead,subject:'public-action'}],
11:[{type:'transfersObject',actor:ally,subject:'evidence',target:lead}],
12:[{type:'revealsFact',actor:lead,subject:'proof',target:ally}],
13:[{type:'changesTrust',actor:lead,subject:'resolution',target:ally,amount:1}]
};
let current=state;const history=[];
for(const scene of film.scenes){
const events=[];
for(const person of scene.participants){if(!current.characters[person])throw Error('unknown participant: '+person);if(current.characters[person].location!==scene.location)events.push({type:'entersLocation',actor:person,subject:scene.location});}
events.push(...(transactions[scene.number-1]||[]));
const before=current.history.length;
for(const event of events)current=applyEvent(current,event);
scene.events=events;scene.stateBefore=before;scene.stateAfter=current.history.length;history.push(...events);
for(const person of scene.participants)if(current.characters[person].location!==scene.location)throw Error('scene location mismatch');
for(const block of scene.blocks)if(block.type==='character'&&!scene.participants.includes(block.text))throw Error('speaker not present: '+block.text);
}
if(current.objects.evidence.owner!==lead||!current.characters[lead].knowledge.includes('proof'))throw Error('causal proof failed');
return {initial:state,final:current,events:history};}
