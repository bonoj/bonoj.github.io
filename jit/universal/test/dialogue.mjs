import assert from 'node:assert/strict';
import {generateFilm} from '../src/story/film.js';
import {dialogueFor,validateDialogueIntent} from '../src/language/dialogue.js';
const films=Array.from({length:100},(_,n)=>generateFilm('thriller',n));
for(const film of films)for(const scene of film.scenes){assert.equal(scene.dialoguePlan.length,2);assert.equal(validateDialogueIntent(scene),true);assert.deepEqual(scene.dialoguePlan,dialogueFor(film.identity.id,scene.number-1,scene.dialoguePlan.map(turn=>Object.entries(film.cast).find(([,name])=>name===turn.character)?.[0]==='protagonist'?'lead':Object.entries(film.cast).find(([,name])=>name===turn.character)?.[0]==='ally'?'ally':'opponent'),scene.functionId,{lead:film.cast.protagonist,ally:film.cast.ally,opponent:film.cast.opponent}));}
console.log('Dialogue tactic plans: 100 films, 1500 scenes, deterministic and speaker-valid');
