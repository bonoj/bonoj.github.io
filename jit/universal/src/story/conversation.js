// Lightweight context-bound conversation: event, knowledge and character intent
// determine the exchange; seeded fallback lines supply mundane texture.
const context={
 observe:['There is something wrong with the {object}.','What kind of wrong?','The sort that was here before we arrived.'],
 reveal:['I need to show you what I found about the {object}.','How long have you known?','Long enough to wish I had said something sooner.'],
 conceal:['You keep looking at the {object}.','It is nothing.','Then why will you not leave it alone?'],
 accuse:['I think you know what happened to the {object}.','That is a fairly serious thing to say.','I know.'],
 apologize:['I owe you an apology about the {object}.','I was wondering when you would notice.','I noticed earlier. Saying it took longer.'],
 promise:['I will take care of the {object}.','You said that last time.','I remember.'],
 fulfill:['I did what I promised about the {object}.','I can see that.','I thought you should hear it from me.'],
 betray:['You went behind my back over the {object}.','I did not see another option.','You could have told me.'],
 reconcile:['We cannot keep arguing about the {object}.','We can stop. That is not the same as agreeing.','I know.'],
 take:['Why are you taking the {object}?','Because leaving it here is not working.','That is not much of a plan.'],
 give:['I want you to keep the {object}.','Why me?','Because you are still here.'],
 return:['I brought the {object} back.','Did you find what you needed?','Not exactly.'],
 lock:['I closed the way through.','You cannot keep it closed forever.','I only need a little time.'],
 unlock:['I opened it again.','What changed?','I did. A little.'],
 spend:['That was our last reserve.','I know.','Then I hope it was worth it.'],
 gain:['We have enough to try again.','Where did it come from?','Someone decided to help.'],
 damage:['The {object} is damaged.','Can it be fixed?','I do not know yet.'],
 repair:['The {object} works again.','Are you sure?','As sure as I can be.'],
 delay:['We have a little longer before {deadline}.','How much longer?','Not enough to be comfortable.'],
 advance:['They moved {deadline} forward.','Can they do that?','They already have.'],
 appoint:['You are responsible for {problem} now.','I did not ask for that.','Nobody ever does.'],
 depose:['You are not in charge of {problem} anymore.','Who decided that?','The people who were waiting for an answer.'],
 depart:['I need to get away from {problem}.','For how long?','Until I can think about it.'],
 arrive:['I came back about {problem}.','I was not expecting you.','Neither was I.']
};
const substitute=(line,vars)=>line.replace(/\{(object|deadline|problem)\}/g,(_,key)=>vars[key]);
export function conversation({type,actor,target,object,deadline,problem,agency,random,history}){
 const vars={object,deadline,problem};
 const source=context[type]||context.observe;
 const opening=source.map(line=>substitute(line,vars));
 const prior=history.filter(e=>e.actor===actor&&e.target===target).length;
 const tail=prior>2?[
  'We have had this conversation before.',
  'I know. I was hoping it would go differently.',
  'It still might.'
 ]:[
  'There is probably something we have missed.',
  'There usually is.',
  'We can look again.'
 ];
 const speaker=agency[actor],listener=agency[target];
 const ending=speaker?.goalProgress>2?[
  'I am trying to '+speaker.goal+' what matters here.',
  'I understand that. I just want to know what happens next.',
  'So do I.'
 ]:tail;
 return [...opening,...ending];
}
