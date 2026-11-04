import {plan,validatePlan} from './planner.js';
import {realizeThriller} from '../genre/thriller.js';
import {realizeGenre,GENRES} from '../genre/catalog.js';
import {validateScreenplay,fountain} from '../render/fountain.js';
import {transactFilm} from './transactions.js';
import {applyRecombination} from './recombination.js';
import {breadthPlan} from './breadth.js';
import {composeCausality} from './composition.js';
export {GENRES};
export function generateFilm(genre,ordinal){if(!GENRES.includes(genre))throw Error('Genre not implemented: '+genre);const p=plan(genre,ordinal);validatePlan(p);const r=genre==='thriller'?realizeThriller(p.identity.id):realizeGenre(genre,p.identity.id);const film={identity:p.identity,title:r.world.title,genre,architecture:r.world.architecture,cast:{protagonist:r.world.lead,ally:r.world.ally,opponent:r.world.opponent},premise:r.world.premise,beats:p.beats,scenes:r.scenes,stage:'genre-fixture-not-feature'};for(let i=0;i<film.scenes.length;i++)if(film.scenes[i].functionId!==p.beats[i].functionId)throw Error('realization contract mismatch');applyRecombination(film);film.breadth=breadthPlan(film.identity.id);film.abstractCausality=composeCausality(film.identity.id);film.causality=transactFilm(film);validateScreenplay(film);film.fountain=fountain(film);return film;}
