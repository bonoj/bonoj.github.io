import {stream,choose} from '../core/prng.js';
import {ALTERNATES} from './alternates.js';
import {realizeScene} from './realization.js';
export const GENRES=['romance','romcom','horror','thriller','science-fiction','western','mystery','action','drama','comedy','fantasy','crime'];
const data={
romance:['The Long Way Home','TRAIN STATION','Two former partners must decide whether to rebuild a relationship after an unexpected reunion.','a letter never delivered','the last train','a promise made years ago','an honest conversation'],
romcom:['Almost on Purpose','WEDDING VENUE','Two rival event planners are forced to rescue a wedding neither of them believes will work.','a swapped guest list','the rehearsal dinner','an embarrassing misunderstanding','a public apology'],
horror:['The Room Below','ABANDONED HOTEL','A caretaker discovers that the building repeats the voices of people who never checked out.','a locked room','the last night shift','a voice behind the wall','the door left open'],
'science-fiction':['The Second Earth','ORBITAL STATION','A survey pilot discovers a distress signal from a colony that has not yet been founded.','a transmission from tomorrow','the launch window','a duplicate flight log','a message to the future'],
western:['The Dry Crossing','FRONTIER DEPOT','A former marshal must keep a settlement alive when the water rights are sold out from under it.','a forged land deed','the cattle drive','a hidden spring','a choice between law and neighbors'],
mystery:['The Missing Hour','SEASIDE LIBRARY','A librarian reconstructs the hour missing from every witness account of a disappearance.','an unsigned photograph','the annual festival','a stopped clock','a testimony withheld'],
action:['The Last Convoy','MOUNTAIN CHECKPOINT','A transport driver must get a medical convoy through a blockade before the pass closes.','a compromised route','the bridge demolition','a stolen access card','a diversion through the gorge'],
drama:['The Quiet House','FAMILY HOME','Two siblings reunite to decide what to do with the house their mother left behind.','an unopened envelope','the estate sale','a disputed memory','an act of forgiveness'],
comedy:['A Very Important Meeting','CITY HALL','An unqualified interim manager must prevent a ceremonial opening from becoming a municipal disaster.','a missing ceremonial key','the mayoral visit','a wildly incorrect schedule','an accidental success'],
fantasy:['The Ashen Bell','MOUNTAIN SHRINE','An apprentice keeper learns that the bell protecting the valley also imprisons its oldest guardian.','a forbidden inscription','the eclipse','a broken ward','a bargain with the guardian'],
crime:['The Third Account','NIGHTCLUB OFFICE','A small-time bookkeeper discovers that a trusted partner has been laundering the crew’s money.','a duplicate ledger','the midnight collection','a false confession','a deal with a rival']
};
const stages=['normality','disruption','commitment','first-attempt','alliance','warning','reversal','fallout','discovery','defeat','reinterpretation','choice','confrontation','consequence','closing-image'];
const phrases=[
(w)=>`At ${w.place.toLowerCase()}, ${w.lead} tends to the ordinary work of keeping things together. ${w.ally} arrives with a familiar complaint.`,
(w)=>`A routine exchange reveals ${w.clue}. The detail contradicts everything ${w.lead} believed about the situation.`,
(w)=>`${w.lead} decides to investigate, despite the cost. ${w.opponent} has already begun making arrangements for ${w.deadline}.`,
(w)=>`The first attempt fails to settle the matter. A small discovery suggests the original explanation was incomplete.`,
(w)=>`${w.ally} offers help and access to information that ${w.lead} could not have obtained alone.`,
(w)=>`${w.opponent} warns that further questions will have consequences. The deadline draws closer.`,
(w)=>`An unexpected obstacle closes the obvious route forward. ${w.lead} loses the advantage gained earlier.`,
(w)=>`${w.lead} and ${w.ally} disagree about what happened. Their alliance fractures when neither will admit uncertainty.`,
(w)=>`Working from the earlier clue, ${w.lead} discovers ${w.discovery}. The new information changes the meaning of the original disruption.`,
(w)=>`${w.opponent} blocks the proposed solution. With ${w.deadline} approaching, the situation appears irretrievable.`,
(w)=>`Alone, ${w.lead} realizes that winning the original argument would not solve the underlying problem.`,
(w)=>`${w.ally} returns. Together they choose ${w.resolution}, accepting that neither will emerge unchanged.`,
(w)=>`At ${w.place.toLowerCase()}, ${w.lead} confronts ${w.opponent}. The concealed evidence is brought into the open.`,
(w)=>`The immediate crisis passes. The consequences are less tidy than expected, but the people involved must live with the choice.`,
(w)=>`Morning settles over ${w.place.toLowerCase()}. ${w.lead} returns to an ordinary task, now understanding it differently.`
];
const exchanges=[
['Another day.','Until it stops being one.'],['You saw that too?','I was hoping I had not.'],['We cannot ignore this.','Someone expects us to.'],['That did not work.','It told us where not to look.'],['I can help.','Then stay.'],['You have been warned.','I heard you the first time.'],['They closed it.','Then we find another way.'],['You should have told me.','You would not have listened.'],['This changes everything.','It changes what we thought we knew.'],['There is no time left.','There is still a choice.'],['I wanted the wrong thing.','You wanted the simple thing.'],['We might lose everything.','Then we decide what matters.'],['You cannot prove it.','I do not have to hide it anymore.'],['It is over.','Not entirely.'],['Same as yesterday?','Not quite.']
];
export function realizeGenre(genre,filmId){
if(!data[genre])throw Error('Genre not implemented: '+genre);
const r=stream(filmId,'genre-world'),cast=stream(filmId,'genre-cast');const family=choose(stream(filmId,'causal-family'),[0,1]);const [title,place,premise,clue,deadline,discovery,resolution]=family?ALTERNATES[genre]:data[genre];
const leads=['MARA VALE','ELI ROWAN','NINA CALDER','THEO MERCER','IRIS BELL','JONAH REED'];const allies=['ADA VOSS','LEON PRICE','RUTH HALE','SAMIR CROSS','JUNE WARD','MICAH STONE'];const opponents=['DIRECTOR KELL','COMMISSIONER DANE','INSPECTOR RUSK','CHAIR MORROW','DEPUTY SHAW'];
const w={title:choose(r,[title,title+' — A Motion Picture',title+' (Revised)']),place,premise,clue,deadline,discovery,resolution,lead:choose(cast,leads),ally:choose(cast,allies),opponent:choose(cast,opponents)};
const scenes=stages.map((functionId,i)=>({number:i+1,functionId,...realizeScene(genre,w,i,Math.floor(r()*3))}));
return {world:{...w,architecture:genre+'-family-'+family,story:null},scenes};
}
