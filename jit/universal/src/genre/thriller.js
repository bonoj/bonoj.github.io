// Thriller adapter, Phase 1: a causally ordered 15-scene fixture, not feature-length.
import {choose,stream} from '../core/prng.js';
const locations=[['MUNICIPAL ARCHIVE','RIVERSIDE PLATFORM','CIVIC ANNEX'],['HARBOR RECORDS OFFICE','FERRY TERMINAL','PORT AUTHORITY'],['COUNTY REGISTRY','BUS DEPOT','COURTHOUSE'],['PUBLIC RADIO STATION','PARKING GARAGE','TRANSPORT OFFICE']];
const leads=['MARA VALE','ELI ROWAN','NINA CALDER','THEO MERCER','IRIS BELL','JONAH REED'];
const allies=['ADA VOSS','LEON PRICE','RUTH HALE','SAMIR CROSS','JUNE WARD','MICAH STONE'];
const opponents=['DIRECTOR KELL','COMMISSIONER DANE','INSPECTOR RUSK','CHAIR MORROW','DEPUTY SHAW'];
const evidence=[['a sealed inspection report','the amended inspection log'],['a missing audit tape','the original recording'],['an unsigned transfer order','the signed carbon copy'],['a falsified evacuation map','the unaltered survey']];
const hazards=['a scheduled demolition','a midnight transfer','a public hearing','an emergency closure'];
export const THRILLER={id:'thriller',version:1};
export function thrillerWorld(filmId){const n=stream(filmId,'world'),c=stream(filmId,'casting');const [office,transit,authority]=choose(n,locations);const [missing,proof]=choose(n,evidence);const hazard=choose(n,hazards);const lead=choose(c,leads),ally=choose(c,allies),opponent=choose(c,opponents);return {office,transit,authority,missing,proof,hazard,lead,ally,opponent,title:choose(n,['The Last Copy','Public Record','The Quiet Amendment','After the Hearing','A Matter of Record','The Unmarked File']),premise:'An ordinary records worker finds that a routine civic decision has been manufactured from false evidence.'};}
const beats=[
['office','normality',w=>`Rows of folders wait beneath tired fluorescent lights. ${w.lead} corrects a misfiled date before anyone notices.`,w=>[[w.ally,'You could have left that for tomorrow.'],[w.lead,'Tomorrow is when mistakes become policy.']]],
['office','disruption',w=>`A delivery arrives without a return address. Inside: ${w.missing}, marked for destruction before ${w.hazard}.`,w=>[[w.lead,'This was approved before anyone reviewed it.'],[w.ally,'Then somebody wanted the order reversed.']]],
['office','commitment',w=>`${w.lead} makes a duplicate and hides it in a ledger. The official channels are controlled by ${w.opponent}.`,w=>[[w.ally,'We should hand this over.'],[w.lead,'To the person who signed it?']]],
['transit','first-attempt',w=>`At ${w.transit.toLowerCase()}, ${w.lead} finds the referenced order on a notice board, but the attached page is gone.`,w=>[[w.lead,'The index survived.'],[w.ally,'And the part that matters did not.']]],
['transit','alliance',w=>`${w.ally} produces a receipt showing where the archived original was moved. They have a destination.`,w=>[[w.ally,'I kept this because it made no sense.'],[w.lead,'That is becoming a useful qualification.']]],
['authority','warning',w=>`Outside ${w.authority.toLowerCase()}, ${w.opponent} announces that the files will be sealed at closing. A clerk signals that a second copy exists.`,w=>[[w.opponent,'The public has had sufficient opportunity to comment.'],[w.lead,'On documents it was never allowed to see.']]],
['office','reversal',w=>`Archive access is revoked. The duplicate ledger is gone. The investigation has been exposed.`,w=>[[w.ally,'They know what we copied.'],[w.lead,'Then they know we noticed.']]],
['office','fallout',w=>`${w.lead} accuses ${w.ally} of disclosing their route. ${w.ally} leaves.`,w=>[[w.ally,'I brought you the receipt.'],[w.lead,'And somebody knew exactly where to find us.']]],
['transit','discovery',w=>`Following the receipt alone, ${w.lead} finds ${w.proof} inside a retired timetable case. Its signature predates the public review.`,w=>[[w.lead,'There you are.'],[w.lead,'You were never supposed to survive.']]],
['authority','defeat',w=>`${w.opponent} refuses the evidence and orders the building cleared. The scheduled ${w.hazard} proceeds.`,w=>[[w.opponent,'There is no authorized procedure for this.'],[w.lead,'That is precisely the problem.']]],
['transit','reinterpretation',w=>`Outside, people wait for a decision already made. ${w.lead} realizes the evidence must become public.`,w=>[[w.lead,'I kept trying to get permission.'],[w.ally,'You were trying to be right in the right room.']]],
['office','choice',w=>`${w.ally} returns with access to the public announcement system. Using it will cost both their positions.`,w=>[[w.ally,'There will be no going back to work on Monday.'],[w.lead,'There may be no work worth going back to.']]],
['authority','confrontation',w=>`The public announcement begins as ${w.opponent} enters. ${w.lead} reads the dates. ${w.ally} displays ${w.proof}.`,w=>[[w.opponent,'Turn that system off.'],[w.lead,'You can turn it off after the last date.']]],
['authority','consequence',w=>`The scheduled ${w.hazard} is suspended pending review. ${w.opponent} leaves without speaking.`,w=>[[w.ally,'We are both out of a job.'],[w.lead,'At least the record is accurate.']]],
['office','closing-image',w=>`Next morning, an empty desk waits beneath fluorescent lights. A new clerk corrects a misfiled date.`,w=>[['CLERK','Someone should keep these in order.']]]
];
export function realizeThriller(filmId){const w=thrillerWorld(filmId);return {world:w,scenes:beats.map(([location,intent,action,dialogue],i)=>({number:i+1,functionId:intent,heading:'INT. '+w[location]+' - '+(i===14?'MORNING':i>9?'NIGHT':'DAY'),blocks:[{type:'action',text:action(w)},...dialogue(w).flatMap(([character,text])=>[{type:'character',text:character},{type:'dialogue',text}])]}))};}
