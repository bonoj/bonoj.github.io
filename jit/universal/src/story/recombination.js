import {stream,choose,integer} from '../core/prng.js';
// Reusable physical actions, social devices and dialogue moves. No genre labels.
export const ACTIONS=Object.freeze([
{id:'drop',verb:'drops',object:'mug',effect:'attention'},
{id:'misplace',verb:'misplaces',object:'key',effect:'access'},
{id:'exchange',verb:'passes',object:'envelope',effect:'possession'},
{id:'break',verb:'breaks',object:'glass',effect:'attention'},
{id:'conceal',verb:'hides',object:'note',effect:'knowledge'},
{id:'discover',verb:'finds',object:'photograph',effect:'knowledge'},
{id:'interrupt',verb:'interrupts',object:'conversation',effect:'attention'},
{id:'arrive',verb:'arrives carrying',object:'parcel',effect:'presence'},
{id:'leave',verb:'leaves behind',object:'coat',effect:'possession'},
{id:'overhear',verb:'overhears mention of',object:'promise',effect:'knowledge'},
{id:'refuse',verb:'refuses to surrender',object:'document',effect:'commitment'},
{id:'return',verb:'returns',object:'token',effect:'trust'}
]);
export const DEVICES=Object.freeze([
{id:'misunderstanding',trigger:'a mistaken assumption',cost:'a broken alliance'},
{id:'deadline',trigger:'an approaching deadline',cost:'a lost opportunity'},
{id:'betrayal',trigger:'a concealed agreement',cost:'a collapse of trust'},
{id:'false-identity',trigger:'a name that belongs to someone else',cost:'a compromised identity'},
{id:'withheld-fact',trigger:'a fact deliberately withheld',cost:'a damaged relationship'},
{id:'unexpected-witness',trigger:'a witness who was never meant to be present',cost:'a public reckoning'},
{id:'reversal',trigger:'evidence that contradicts the accepted account',cost:'an abandoned plan'},
{id:'sacrifice',trigger:'a choice that protects somebody else',cost:'a personal loss'},
{id:'wrong-recipient',trigger:'a message delivered to the wrong person',cost:'an exposed secret'},
{id:'unreliable-record',trigger:'an official record that cannot be trusted',cost:'a failed institution'},
{id:'shared-secret',trigger:'a secret held by two rivals',cost:'an uneasy alliance'},
{id:'missing-object',trigger:'an object no one can account for',cost:'a blocked route'}
]);
export const MOVES=Object.freeze([
['Did you see that?','I saw enough.'],
['You knew?','Not until now.'],
['Give it back.','Tell me why first.'],
['We had an agreement.','We had a different understanding.'],
['That changes nothing.','Then why are you afraid?'],
['You can still leave.','Not without an answer.'],
['Is that all?','It is all I can prove.'],
['You promised.','I remember.'],
['Who else knows?','That depends on what you do next.'],
['You should have told me.','Would you have believed me?'],
['I cannot do this alone.','You are not alone.'],
['Then it is settled.','It never was.']
]);
const functions=['normality','disruption','commitment','first-attempt','alliance','warning','reversal','fallout','discovery','defeat','reinterpretation','choice','confrontation','consequence','closing-image'];
export function recombination(filmId){
const rng=stream(filmId,'universal-device-graph-v1');
const first=integer(rng,DEVICES.length),step=1+integer(rng,DEVICES.length-1);
const devices=Array.from({length:5},(_,i)=>DEVICES[(first+i*step)%DEVICES.length]);
const actions=Array.from({length:15},(_,i)=>ACTIONS[integer(rng,ACTIONS.length)]);
const moves=Array.from({length:15},(_,i)=>MOVES[integer(rng,MOVES.length)]);
return {id:'device-graph-v1',devices,actions,moves,functions};
}
export function applyRecombination(film){
const plan=recombination(film.identity.id);const protagonist=film.cast.protagonist,ally=film.cast.ally;
for(let i=0;i<film.scenes.length;i++){
const scene=film.scenes[i],device=plan.devices[Math.floor(i/3)],action=plan.actions[i],move=plan.moves[i];
const actor=scene.participants[0]||protagonist,partner=scene.participants[1]||ally;
const material=`${actor} ${action.verb} the ${action.object}. ${device.trigger} now threatens ${device.cost}.`;
scene.blocks.push({type:'action',text:material});
scene.blocks.push({type:'character',text:actor},{type:'dialogue',text:move[0]},{type:'character',text:partner},{type:'dialogue',text:move[1]});
scene.recombination={device:device.id,action:action.id,move:plan.moves.indexOf(move)};
}
film.recombination={id:plan.id,deviceIds:plan.devices.map(d=>d.id),actionIds:plan.actions.map(a=>a.id),moveIds:plan.moves.map(m=>plan.moves.indexOf(m))};
return film;
}
