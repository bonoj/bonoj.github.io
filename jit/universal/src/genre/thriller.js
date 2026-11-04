import {choose,stream} from '../core/prng.js';
import {architectureFor} from '../story/architectures.js';
const leads=['MARA VALE','ELI ROWAN','NINA CALDER','THEO MERCER','IRIS BELL','JONAH REED'];
const allies=['ADA VOSS','LEON PRICE','RUTH HALE','SAMIR CROSS','JUNE WARD','MICAH STONE'];
const opponents=['DIRECTOR KELL','COMMISSIONER DANE','INSPECTOR RUSK','CHAIR MORROW','DEPUTY SHAW'];
const functions=['normality','disruption','commitment','first-attempt','alliance','warning','reversal','fallout','discovery','defeat','reinterpretation','choice','confrontation','consequence','closing-image'];
const speakerPattern=[['lead','ally'],['lead','ally'],['ally','lead'],['lead','ally'],['ally','lead'],['opponent','lead'],['ally','lead'],['lead','ally'],['lead','ally'],['opponent','lead'],['lead','ally'],['ally','lead'],['opponent','lead'],['ally','lead'],['ally','lead']];
const places={
exposure:['RECORDS OFFICE','RECORDS OFFICE','RECORDS OFFICE','PUBLIC INDEX','TRANSIT PLATFORM','CIVIC ANNEX','RECORDS OFFICE','RECORDS OFFICE','TRANSIT PLATFORM','CIVIC ANNEX','CIVIC PLAZA','RECORDS OFFICE','CIVIC ANNEX','CIVIC ANNEX','RECORDS OFFICE'],
rescue:['FERRY CONTROL','FERRY CONTROL','FERRY CONTROL','RADIO ROOM','CHART HOUSE','PORT AUTHORITY','DOCK','CHART HOUSE','CHART HOUSE','PORT AUTHORITY','RIVERBANK','DOCK','SERVICE CHANNEL','HIGH BANK','FERRY CONTROL'],
recovery:['BROADCAST CONTROL','BROADCAST CONTROL','BROADCAST CONTROL','RELAY ROOM','WORKSHOP','NETWORK OFFICE','TRANSMITTER ROOM','WORKSHOP','RELAY ROOM','NETWORK OFFICE','STATION CORRIDOR','WORKSHOP','BROADCAST CONTROL','BROADCAST CONTROL','BROADCAST CONTROL']
};
const exterior=new Set(['TRANSIT PLATFORM','CIVIC PLAZA','DOCK','RIVERBANK','SERVICE CHANNEL','HIGH BANK']);
const timeFor=i=>i===14?'DAWN':i>=10?'NIGHT':'DAY';
export const THRILLER={id:'thriller',version:3};
export function thrillerWorld(filmId){const c=stream(filmId,'casting'),a=architectureFor(filmId);return {lead:choose(c,leads),ally:choose(c,allies),opponent:choose(c,opponents),architecture:a.id,title:a.title,location:a.location,premise:'An ordinary professional discovers an institutional failure and must decide whether to act without permission.',story:a};}
export function realizeThriller(filmId){const w=thrillerWorld(filmId);const scenes=w.story.actions.map((action,i)=>{const location=places[w.architecture][i];return {number:i+1,functionId:functions[i],location,heading:(exterior.has(location)?'EXT. ':'INT. ')+location+' - '+timeFor(i),participants:[...new Set(speakerPattern[i].map(role=>w[role]))],blocks:[{type:'action',text:action},...w.story.lines[i].flatMap((line,j)=>[{type:'character',text:w[speakerPattern[i][j]]},{type:'dialogue',text:line}])]};});return {world:w,scenes};}
