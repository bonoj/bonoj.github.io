import {stream,choose} from '../core/prng.js';
const strategies={
normality:['observe','deflect'],disruption:['question','infer'],commitment:['warn','refuse'], 'first-attempt':['observe','qualify'],alliance:['offer','accept'],warning:['assert','challenge'],reversal:['report','reframe'],fallout:['accuse','defend'],discovery:['infer','confirm'],defeat:['assert','challenge'],reinterpretation:['admit','reframe'],choice:['warn','commit'],confrontation:['command','resist'],consequence:['observe','qualify'],'closing-image':['observe','affirm']
};
const variants={
observe:['Look at what is in front of us.','This is not how it was supposed to look.','There is a detail nobody mentioned.'],
deflect:['It can wait until morning.','We have other things to settle.','That is not the question they asked.'],
question:['Who decided this?','How did this get here?','Why would anyone do that?'],
infer:['Someone knew before we did.','That only works if the decision came first.','Then the record is telling us something.'],
warn:['There will be consequences.','They will not let this go.','You know what this will cost.'],
refuse:['I am not signing it.','I cannot leave it alone.','Then we do it without permission.'],
qualify:['Not the part we needed.','Only if we can prove it.','That is not the whole story.'],
offer:['I can get you inside.','I kept something that might help.','There is another way through.'],
accept:['Show me.','Then we go together.','All right. But we do it carefully.'],
assert:['The decision is final.','There is nothing further to discuss.','You have no authority here.'],
challenge:['That does not make it true.','You have not answered the question.','Then explain the missing part.'],
report:['The route is closed.','The copy is gone.','Someone was here before us.'],
reframe:['That changes what we can do.','We were asking the wrong question.','It is not over. It is different.'],
accuse:['You told them where to find us.','You knew this would happen.','You left me with nothing.'],
defend:['I did what you asked.','I was trying to keep us safe.','You are wrong about me.'],
confirm:['It is the original.','The date matches.','This is what they tried to hide.'],
admit:['I thought the rules would protect us.','I wanted somebody else to make the choice.','I kept waiting for the right moment.'],
commit:['Then we take the risk.','I will finish what we started.','We do it now.'],
command:['Stop this immediately.','Turn it off.','Leave the room.'],
resist:['Not until they hear it.','You can explain yourself afterward.','It is already public.'],
affirm:['Someone should.','It matters.','This time we will know.']
};
const profiles=[
{kind:'measured',prefix:['',''],suffix:['','']},
{kind:'terse',prefix:['',''],suffix:['','']},
{kind:'guarded',prefix:['',''],suffix:['','']}
];
export function dialogueFor(filmId,sceneIndex,roles,beat,context){
const rand=stream(filmId,'dialogue:'+sceneIndex), tactics=strategies[beat]||['observe','qualify'];
return tactics.map((tactic,i)=>{const character=context[roles[i]];if(!character)throw Error('missing dialogue role');const options=variants[tactic];const text=choose(rand,options);return {character,tactic,text,source:'tactic-library-v1'};});
}
export function validateDialogueIntent(scene){if(!scene.dialoguePlan)throw Error('missing dialogue plan');for(const turn of scene.dialoguePlan){if(!scene.participants.includes(turn.character))throw Error('absent dialogue speaker');if(!variants[turn.tactic]?.includes(turn.text))throw Error('unregistered tactic realization');}return true;}
