import {stream,integer} from '../core/prng.js';
import {BY_KIND,PRIMITIVE_COUNTS} from './primitives.js';
const KINDS=['physical','social','plot','dialogue','world'];
// Fifteen slots, each samples all five dimensions. Every genre uses the same catalog.
export function breadthPlan(filmId){
const rng=stream(filmId,'breadth-v1');
const slots=Array.from({length:15},(_,index)=>Object.freeze({index,primitives:Object.freeze(Object.fromEntries(KINDS.map(kind=>[kind,BY_KIND[kind][integer(rng,BY_KIND[kind].length)].id])))}));
return Object.freeze({version:1,slots});
}
export function breadthSignature(plan){return plan.slots.map(s=>KINDS.map(k=>s.primitives[k]).join('|')).join(';');}
export {PRIMITIVE_COUNTS};
