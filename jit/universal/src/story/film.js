import {plan,validatePlan} from './planner.js';
import {realizeThriller} from '../genre/thriller.js';
import {validateScreenplay,fountain} from '../render/fountain.js';
export function generateFilm(genre,ordinal){if(genre!=='thriller')throw Error('Genre not implemented: '+genre);const p=plan(genre,ordinal);validatePlan(p);const r=realizeThriller(p.identity.id);const film={identity:p.identity,title:r.world.title,genre,cast:{protagonist:r.world.lead,ally:r.world.ally,opponent:r.world.opponent},premise:r.world.premise,beats:p.beats,scenes:r.scenes,stage:'phase1-short-fixture'};for(let i=0;i<film.scenes.length;i++)if(film.scenes[i].functionId!==p.beats[i].functionId)throw Error('realization contract mismatch');validateScreenplay(film);film.fountain=fountain(film);return film;}
