import {world,runWorld,replayWorld} from './ontology.js';
import {stream,integer} from '../core/prng.js';
// One event, multiple causal interpretations. Same physical transition across genres.
const CONTEXTS={
romance:['A dropped mug interrupts a reunion.','The noise gives the other person a reason to stay.'],
romcom:['A dropped mug interrupts a wedding rehearsal.','The accident reveals who has been hiding the seating chart.'],
horror:['A dropped mug echoes through the empty hotel.','A second impact answers from a locked room.'],
thriller:['A dropped mug interrupts a covert exchange.','The sound draws a witness toward the evidence.'],
'science-fiction':['A dropped mug floats for a moment before striking the deck.','The unexpected trajectory exposes a gravity fault.'],
western:['A dropped mug breaks the silence in the saloon.','Someone notices the shaking hand that let it fall.'],
mystery:['A dropped mug interrupts the witness interview.','The spilled liquid reveals writing beneath the page.'],
action:['A dropped mug strikes the concrete at the checkpoint.','A guard turns away long enough for a courier to pass.'],
drama:['A dropped mug shatters during a family argument.','Its owner recognizes the cup they thought was lost.'],
comedy:['A dropped mug interrupts the mayor’s speech.','Everyone applauds because they mistake it for a cue.'],
fantasy:['A dropped mug strikes the shrine floor.','The liquid traces an inscription nobody could read.'],
crime:['A dropped mug interrupts the exchange of money.','The distraction exposes the second ledger.']
};
export function mugDemonstration(genre,filmId='universal-demo'){
if(!CONTEXTS[genre])throw Error('unknown genre '+genre);
const r=stream(filmId,'mug-demonstration');
const fragile=integer(r,2)===0;
const initial=world({places:[{id:'room'}],agents:[{id:'LEAD',at:'room'},{id:'WITNESS',at:'room'}],objects:[{id:'mug',kind:'mug',heldBy:'LEAD',fragile}],facts:[{id:'noise-heard'},{id:'meaning'}]});
const events=[{type:'drop',actor:'LEAD',object:'mug',impact:'hard'},{type:'observe',actor:'WITNESS',fact:'noise-heard',at:'room'},{type:'infer',actor:'WITNESS',basis:'noise-heard',fact:'meaning'}];
const result=runWorld(initial,events);
if(JSON.stringify(replayWorld(initial,events))!==JSON.stringify(result.final))throw Error('nonreplayable');
return {...result,genre,interpretation:CONTEXTS[genre],primitive:'physical:drop'};
}
