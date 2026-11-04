import {choose,stream} from '../core/prng.js';
import {architectureFor} from '../story/architectures.js';
const leads=['MARA VALE','ELI ROWAN','NINA CALDER','THEO MERCER','IRIS BELL','JONAH REED'];
const allies=['ADA VOSS','LEON PRICE','RUTH HALE','SAMIR CROSS','JUNE WARD','MICAH STONE'];
const opponents=['DIRECTOR KELL','COMMISSIONER DANE','INSPECTOR RUSK','CHAIR MORROW','DEPUTY SHAW'];
const functions=['normality','disruption','commitment','first-attempt','alliance','warning','reversal','fallout','discovery','defeat','reinterpretation','choice','confrontation','consequence','closing-image'];
const speakerPattern=[['lead','ally'],['lead','ally'],['ally','lead'],['lead','ally'],['ally','lead'],['opponent','lead'],['ally','lead'],['lead','ally'],['lead','ally'],['opponent','lead'],['lead','ally'],['ally','lead'],['opponent','lead'],['ally','lead'],['ally','lead']];
export const THRILLER={id:'thriller',version:2};
export function thrillerWorld(filmId){const c=stream(filmId,'casting'),a=architectureFor(filmId);return {lead:choose(c,leads),ally:choose(c,allies),opponent:choose(c,opponents),architecture:a.id,title:a.title,location:a.location,premise:'An ordinary professional discovers an institutional failure and must decide whether to act without permission.',story:a};}
export function realizeThriller(filmId){const w=thrillerWorld(filmId);const scenes=w.story.actions.map((action,i)=>({number:i+1,functionId:functions[i],heading:'INT. '+w.location+' - '+(i>9?'NIGHT':'DAY'),blocks:[{type:'action',text:action},...w.story.lines[i].flatMap((line,j)=>[{type:'character',text:w[speakerPattern[i][j]]},{type:'dialogue',text:line}])]}));return {world:w,scenes};}
