import {breadthPlan} from './breadth.js';
import {contractFor} from './contracts.js';
const CHANNELS=['material','relationship','obligation','knowledge','environment'];
const initial=()=>({material:0,relationship:0,obligation:0,knowledge:0,environment:0,trace:[]});
const delta={damage:-1,obscure:-1,disclose:1,bind:1,unbind:-1,introduce:1,remove:-1,transfer:1,pressure:-1,repair:1,strain:-1,enable:1,disable:-1,alter:1,negotiate:1,complicate:1,communicate:1,perturb:1};
function applicable(c,state){if(!c)return false;
// The abstract resource ledger tracks pressure/knowledge/relationship state,
// not concrete character possessions or object locations.
if(c.effect==='disclose'&&state.knowledge>=3)return false;
if(c.effect==='obscure'&&state.knowledge<=-3)return false;
if(c.effect==='damage'&&state.material<=-3)return false;
if(c.effect==='repair'&&state.relationship>=3)return false;
return true;
}
export function composeCausality(filmId){
const candidates=breadthPlan(filmId);const state=initial(),steps=[],rejected=[];
for(const slot of candidates.slots){const selected=[];
for(const [kind,id] of Object.entries(slot.primitives)){
const c=contractFor(id);
if(!applicable(c,state)){rejected.push({slot:slot.index,id,reason:'abstract-resource-bound'});continue;}
const before=state[c.channel],amount=delta[c.effect]??0;
state[c.channel]=Math.max(-3,Math.min(3,before+amount));
const event={slot:slot.index,kind,id,channel:c.channel,effect:c.effect,before,after:state[c.channel]};
state.trace.push(event);selected.push(event);
}
steps.push({slot:slot.index,selected});}
return {version:1,steps,rejected,final:state,accepted:steps.reduce((n,s)=>n+s.selected.length,0)};
}
export function replayCausality(composition){
const state=initial();for(const step of composition.steps)for(const e of step.selected){
if(state[e.channel]!==e.before)throw Error('broken causal ledger before '+e.id);
state[e.channel]=Math.max(-3,Math.min(3,state[e.channel]+(delta[e.effect]??0)));
if(state[e.channel]!==e.after)throw Error('broken causal ledger after '+e.id);
state.trace.push(e);
}
return state;
}
