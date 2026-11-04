import {stream,choose,integer} from '../core/prng.js';
import {GENRES} from '../genre/catalog.js';
import {fountain,validateScreenplay} from '../render/fountain.js';
const settings={
romance:['COASTAL HOTEL','FERRY TERMINAL','FLOWER SHOP','ROOFTOP','TRAIN PLATFORM','old letters','the reunion','the last ferry','a shared future'],
romcom:['WEDDING HALL','BAKERY','CITY PARK','HOTEL LOBBY','REHEARSAL DINNER','guest list','the wedding','the rehearsal','an honest relationship'],
horror:['EMPTY HOTEL','SERVICE TUNNEL','BOILER ROOM','ATTIC','LOCKED WARD','room register','the missing guests','sunrise','a way out'],
thriller:['NEWSROOM','PARKING GARAGE','SAFE HOUSE','COURTHOUSE','ROOFTOP','encrypted drive','the investigation','the hearing','the truth'],
'science-fiction':['ORBITAL STATION','ENGINE BAY','OBSERVATION DECK','AIRLOCK','SURFACE OUTPOST','signal archive','the expedition','the launch window','the colony'],
western:['SALOON','SHERIFF OFFICE','DRY RIVERBED','RAIL DEPOT','RANCH','land deed','the settlement','the water auction','the town'],
mystery:['ARCHIVE','SEASIDE PIER','LIBRARY','POLICE STATION','OLD HOUSE','photograph','the disappearance','the inquest','the missing hour'],
action:['CHECKPOINT','CONVOY','BRIDGE','SERVICE TUNNEL','HANGAR','route map','the evacuation','the bridge closure','the convoy'],
drama:['FAMILY KITCHEN','HOSPITAL CORRIDOR','GARDEN','ATTIC','DINING ROOM','family ledger','the inheritance','the sale','the family'],
comedy:['CITY HALL','LOADING BAY','BANQUET HALL','OFFICE','BACKSTAGE','ceremonial schedule','the opening','the mayoral visit','the department'],
fantasy:['MOUNTAIN SHRINE','BELL TOWER','ANCIENT ROAD','GREAT HALL','FOREST CLEARING','sealed scroll','the kingdom','the eclipse','the valley'],
crime:['BACK OFFICE','NIGHTCLUB','WAREHOUSE','ALLEY','COURTROOM','account book','the crew','the collection','the operation']
};
const names=['MARA VALE','ELI ROWAN','NINA CALDER','THEO MERCER','IRIS BELL','JONAH REED','ADA VOSS','LEON PRICE','RUTH HALE','SAMIR CROSS','JUNE WARD','MICAH STONE','KELL MORROW','RUSK DANE','VERA SHAW','OSCAR BELL'];
const traits=['cautious','impatient','loyal','ambitious','skeptical','idealistic','practical','secretive'];
const intentions=['protect','expose','recover','escape','preserve','replace','control','repair'];
const frames=['An ordinary arrangement begins to unravel.','Nobody has the complete account.','The apparent solution creates another problem.','A private choice becomes public.','An old agreement acquires a new meaning.','The deadline is closer than anyone expected.','A small concession changes the balance.','The cost of waiting becomes visible.'];
const templates={
observe:['{A} notices a discrepancy in the {O}. It has been there long enough for someone to have overlooked it.','{A} studies the {O}. One detail refuses to fit the explanation.'],
reveal:['{A} shows {B} the evidence in the {O}. A private suspicion becomes shared knowledge.','{A} finally tells {B} what the {O} establishes.'],
conceal:['{A} removes the {O} from view before {B} arrives.','{A} leaves out the part about the {O}. {B} has no reason to know yet.'],
accuse:['{A} confronts {B} about the {O}. The accusation is impossible to take back.','{A} names {B} as responsible for the missing {O}.'],
apologize:['{A} admits to {B} that the earlier accusation went too far.','{A} offers {B} an apology, without asking for an immediate answer.'],
promise:['{A} promises {B} to keep the {O} safe. The promise now belongs to both of them.','{A} agrees to help {B}, despite what it may cost.'],
fulfill:['{A} makes good on the promise to {B}. The {O} is finally accounted for.','{A} completes the obligation to {B} without ceremony.'],
betray:['{A} gives {B} a reason to stop trusting them. The {O} is part of it.','{A} chooses an advantage over {B}. The damage is immediate.'],
reconcile:['{A} and {B} acknowledge what the argument cost them.','{A} offers {B} a way forward. Neither calls it forgiveness yet.'],
take:['{A} takes custody of the {O}. It is no longer available to anyone else.','{A} removes the {O} from its usual place.'],
give:['{A} passes the {O} to {B}. The decision changes who controls it.','{A} entrusts the {O} to {B}.'],
return:['{A} restores the {O} to its former place.','{A} gives back the {O}, ending one small dispute.'],
lock:['{A} seals the entrance. Nobody can pass through without another decision.','{A} closes the only easy route into the room.'],
unlock:['{A} opens the passage again. The room is accessible.','{A} releases the lock. A route that was closed is open.'],
spend:['{A} spends the remaining resources to keep the plan alive.','{A} commits what little is left. There will be no second attempt on these terms.'],
gain:['{A} secures the supplies they needed. The situation is briefly less desperate.','{A} finds a reserve that changes the calculation.'],
damage:['{A} damages the {O}. It can no longer be used as before.','The {O} is damaged during {A}\'s attempt.'],
repair:['{A} repairs the {O}, restoring a lost option.','{A} makes the {O} usable again.'],
delay:['{A} pushes the deadline back. Everyone gets more time, but not an answer.','{A} negotiates a delay. The pressure eases for the moment.'],
advance:['{A} brings the deadline forward. The others have less time than they thought.','{A} announces that the decision must happen sooner.'],
appoint:['{A} places {B} in charge. The authority changes hands.','{A} delegates the final decision to {B}.'],
depose:['{A} removes {B} from the position of authority.','{A} challenges {B}\'s right to make the decision and wins.'],
depart:['{A} leaves for another part of the building. The conversation remains unfinished.','{A} walks away before {B} can answer.'],
arrive:['{A} returns to the room. {B} has been waiting.','{A} arrives carrying news that changes the atmosphere.']
};
const dialogue=[
['I thought we agreed.','We agreed on what we knew then.'],
['Are you sure?','Not even slightly.'],
['You could have told me.','I was going to.'],
['That is not an answer.','It is the only one I have.'],
['What happens now?','We find out who still wants to help.'],
['You look tired.','I have been making decisions.'],
['This seems unnecessary.','Most things do, afterward.'],
['I do not like this.','You do not have to like it.'],
['Did you know?','I suspected. There is a difference.'],
['We have a problem.','We have several. Pick one.'],
['I was trying to help.','I know. That is what makes it difficult.'],
['Do you trust me?','I trust you to have a reason.'],
['There has to be another way.','There might be. We have not tried it.'],
['Can we discuss this later?','Later is getting expensive.'],
['I thought you would understand.','I understand. I disagree.'],
['So that is it?','That is what we can do today.'],
['You are avoiding the question.','I am avoiding the answer.'],
['I made a mistake.','Then we know something we did not know yesterday.'],
['I do not want to argue.','Neither do I.'],
['You cannot just leave.','I can. It is a very short walk.'],
['This is bigger than us.','That has never stopped us before.'],
['Are we still doing this?','Apparently.'],
['You should get some sleep.','That is a remarkably unpopular suggestion.'],
['I need you to listen.','I am listening.'],
['It was supposed to be simple.','That was the first mistake.'],
['I am not asking permission.','Then what are you asking?'],
['Do you think it will work?','I think we will know soon.'],
['You have changed.','So has the situation.'],
['I did not expect you.','That makes two of us.'],
['I wish you had called.','I wish I had known what to say.'],
['Who else knows?','Fewer people than you think.'],
['You are making this personal.','It was personal before I got here.'],
['We could walk away.','We could.'],
['I am serious.','I can tell.'],
['What do you want from me?','A decision.'],
['I remember it differently.','That does not surprise me.'],
['You promised.','I remember.'],
['That is a terrible idea.','It is the best one we have so far.'],
['Is there coffee?','There was.'],
['We are out of time.','Then we stop pretending we have any.']
];
const speech={
observe:[['Did you see that?','I see it now.'],['Something does not add up.','It rarely does at first.']],
reveal:[['I should have told you sooner.','Yes. You should have.'],['Here is what I found.','That changes things.']],
conceal:[['Is there anything else?','Nothing I can explain yet.']],
accuse:[['You knew about this.','You have not proved that.'],['I think you did it.','Then you are wrong.']],
apologize:[['I was wrong about you.','I appreciate you saying it.']],
promise:[['I will take care of it.','I am going to remember that.']],
fulfill:[['I said I would do it.','And you did.']],
betray:[['You went behind my back.','I did what I thought was necessary.']],
reconcile:[['Can we start again?','Not from the beginning.']],
take:[['What are you doing?','Making sure we have it.']],
give:[['You should hold on to this.','Are you sure?']],
return:[['I brought it back.','Thank you.']],
lock:[['Why did you close it?','Because someone was coming.']],
unlock:[['It is open.','Then we should go.']],
spend:[['That was everything we had.','I know.']],
gain:[['Where did you find that?','I asked the right person.']],
damage:[['That was important.','It still is. Just differently.']],
repair:[['Will it hold?','Long enough.']],
delay:[['We bought some time.','We should not waste it.']],
advance:[['They moved the deadline.','Of course they did.']],
appoint:[['You are in charge now.','That seems unwise.']],
depose:[['You cannot do that.','I just did.']],
depart:[['Where are you going?','Somewhere I can think.']],
arrive:[['You came back.','I said I might.']]
};
const replace=(t,A,B,O)=>t.replaceAll('{A}',A).replaceAll('{B}',B).replaceAll('{O}',O);
const cap=s=>s[0].toUpperCase()+s.slice(1);
function options(s,a,b){
const out=['observe','conceal','accuse','promise','betray','take','lock','spend','damage','delay','advance','appoint','depart'];
if(s.knowledge[a]>0)out.push('reveal');
if(s.trust[a][b]<0)out.push('apologize','reconcile');
if(s.promises[a]>0)out.push('fulfill');
if(s.holder===a)out.push('give','return');
if(s.access===false)out.push('unlock');
if(s.resources<4)out.push('gain');
if(s.condition===false)out.push('repair');
if(s.authority===b)out.push('depose');
if(s.location[a]!==s.location[b])out.push('arrive');
return out.filter(k=>k!=='take'||s.holder===null).filter(k=>k!=='lock'||s.access).filter(k=>k!=='spend'||s.resources>0).filter(k=>k!=='damage'||s.condition).filter(k=>k!=='depart'||s.location[a]===s.location[b]);
}
function apply(s,k,a,b){
switch(k){
case'observe':s.knowledge[a]++;break;case'reveal':s.knowledge[b]+=s.knowledge[a];break;
case'conceal':s.secrets[a]++;break;case'accuse':case'betray':s.trust[b][a]--;break;
case'apologize':case'reconcile':s.trust[a][b]++;s.trust[b][a]++;break;
case'promise':s.promises[a]++;break;case'fulfill':s.promises[a]--;break;
case'take':s.holder=a;break;case'give':s.holder=b;break;case'return':s.holder=null;break;
case'lock':s.access=false;break;case'unlock':s.access=true;break;
case'spend':s.resources--;break;case'gain':s.resources+=2;break;
case'damage':s.condition=false;break;case'repair':s.condition=true;break;
case'delay':s.deadline+=2;break;case'advance':s.deadline=Math.max(0,s.deadline-2);break;
case'appoint':s.authority=b;break;case'depose':s.authority=a;break;
case'depart':s.location[a]=1;break;case'arrive':s.location[a]=s.location[b];break;
} s.history.push({type:k,actor:a,target:b,step:s.history.length});
}
const fingerprint=(trace)=>trace.map(x=>x.type).join('/');
export function generateFeature(genre,ordinal){
if(!GENRES.includes(genre))throw Error('Unsupported genre '+genre);
const id=genre+'-'+ordinal, r=stream(id,'feature-v1'),w=settings[genre];
const cast=[...names];for(let i=cast.length-1;i>0;i--){const j=integer(r,i+1);[cast[i],cast[j]]=[cast[j],cast[i]];}
const people=cast.slice(0,5),roles=people.map((name,i)=>({name,trait:choose(r,traits),goal:choose(r,intentions),role:i===0?'lead':i===1?'confidant':i===2?'opponent':'associate'}));
const state={knowledge:Object.fromEntries(people.map(x=>[x,0])),secrets:Object.fromEntries(people.map(x=>[x,0])),promises:Object.fromEntries(people.map(x=>[x,0])),trust:Object.fromEntries(people.map(x=>[x,Object.fromEntries(people.filter(y=>y!==x).map(y=>[y,0]))])),holder:null,access:true,resources:3,condition:true,deadline:10,authority:people[2],location:Object.fromEntries(people.map(x=>[x,0])),history:[]};
const total=65+integer(r,26),scenes=[],acts=[0,Math.floor(total*.24),Math.floor(total*.51),Math.floor(total*.76),total],used=new Map();
const title=choose(r,['The Ordinary Matter of','A Reasonable Account of','An Arrangement Concerning','The Last Days of','A Brief History of','The Unfinished Business of'])+' '+choose(r,[w[6],w[8],w[5],w[7]]);
for(let i=0;i<total;i++){
const phase=acts.findIndex((v,j)=>j<acts.length-1&&i>=v&&i<acts[j+1]);
const A=people[(i+integer(r,people.length))%people.length],B=choose(r,people.filter(p=>p!==A)),O=w[5],place=choose(r,w.slice(0,5));
const available=options(state,A,B);const scored=available.map(k=>({k,score:r()*3-(used.get(k)||0)*.18+(phase>1&&['reveal','fulfill','reconcile','repair','unlock'].includes(k)?1.2:0)+(phase===0&&['observe','promise','take'].includes(k)?.8:0)})).sort((a,b)=>b.score-a.score);
const k=scored[0].k;used.set(k,(used.get(k)||0)+1);
const before=JSON.stringify(state);apply(state,k,A,B);const action=replace(choose(r,templates[k]),A,B,O);
const pair=choose(r,speech[k]||dialogue),talk=[pair,...Array.from({length:12},()=>choose(r,dialogue))];
const blocks=[{type:'action',text:action+' '+choose(r,frames)}];
for(let exchange=0;exchange<7+integer(r,6);exchange++){
const lines=talk[exchange%talk.length];
blocks.push({type:'character',text:exchange%2?B:A},{type:'dialogue',text:lines[0]});
blocks.push({type:'character',text:exchange%2?A:B},{type:'dialogue',text:lines[1]});
if(exchange%2===0)blocks.push({type:'action',text:choose(r,[A+' looks toward the door.',B+' waits for an answer.','Neither speaks for a moment.','The conversation continues without resolution.',A+' studies the room before replying.'])});
}
if(i%7===0)blocks.push({type:'action',text:choose(r,['Outside, the ordinary business of the day continues.','Someone has left the lights on.','A distant sound interrupts the silence.','No one volunteers to be the first to leave.'])});
scenes.push({number:i+1,functionId:'feature-'+phase,heading:(['DRY RIVERBED','SEASIDE PIER','GARDEN','CITY PARK','ROOFTOP','BRIDGE','ALLEY','FOREST CLEARING','ANCIENT ROAD','TRAIN PLATFORM'].includes(place)?'EXT. ':'INT. ')+place+' - '+(i%6===0?'NIGHT':'DAY'),location:place,participants:[A,B],blocks,event:{type:k,actor:A,target:B,before,after:JSON.stringify(state)}});
}
const film={identity:{id,genre,ordinal},title,genre,architecture:'autonomous-feature-v1',cast:{protagonist:people[0],ally:people[1],opponent:people[2]},characters:roles,premise:w[6],scenes,causality:{version:1,events:state.history,final:state,distinctOperators:used.size,fingerprint:fingerprint(state.history)},stage:'autonomous-feature-prototype'};
validateScreenplay(film);film.fountain=fountain(film);return film;
}
