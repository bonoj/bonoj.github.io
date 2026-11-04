// Goal-directed selection and replayable narrative diagnostics for the feature compiler.
// Genre-neutral; the screenplay compiler supplies the binding and prose.
export const GOALS=['protect','expose','recover','escape','preserve','replace','control','repair'];
const tendencies={
 protect:['promise','fulfill','give','repair','reconcile','lock'],
 expose:['observe','reveal','accuse','unlock','depose'],
 recover:['take','return','gain','arrive','observe'],
 escape:['unlock','depart','delay','gain'],
 preserve:['lock','repair','promise','reconcile','return'],
 replace:['depose','appoint','take','conceal'],
 control:['appoint','lock','conceal','advance','take'],
 repair:['repair','apologize','reconcile','fulfill','give']
};
const counter={observe:'conceal',reveal:'accuse',promise:'betray',lock:'unlock',damage:'repair',depose:'appoint',take:'return',advance:'delay',betray:'reconcile'};
export function establishAgency(roles){
 return Object.fromEntries(roles.map((role,i)=>[role.name,{
  goal:role.goal,trait:role.trait,role:role.role,
  goalProgress:0,decisions:0,lastActions:[],focus:i===0?'central':i===1?'relationship':'practical'
 }]));
}
export function selectAction({available,actor,target,agency,state,rng,phase,used,previous}){
 const self=agency[actor],other=agency[target];
 const scored=available.map(type=>{
  const favors=tendencies[self.goal]||[];
  let score=rng()*1.8+(favors.includes(type)?2.8:0);
  if(other&&other.goal!==self.goal&&['accuse','betray','depose','conceal','lock'].includes(type))score+=.6;
  if(previous&&counter[previous.type]===type&&previous.target===actor)score+=3.3;
  if(phase>=2&&['fulfill','reconcile','reveal','repair','unlock','return'].includes(type))score+=1.3;
  if(phase===0&&['observe','promise','take','conceal'].includes(type))score+=.8;
  score-=Math.min(2.5,(used.get(type)||0)*.22);
  if(self.lastActions.includes(type))score-=1.7;
  if(type==='fulfill'&&state.promises[actor]>0)score+=1;
  return {type,score};
 }).sort((a,b)=>b.score-a.score);
 return scored[0];
}
export function registerDecision(agency,actor,target,type){
 const a=agency[actor];a.decisions++;
 a.lastActions.push(type);if(a.lastActions.length>4)a.lastActions.shift();
 if((tendencies[a.goal]||[]).includes(type))a.goalProgress++;
 return {actor,target,type,goal:a.goal,progress:a.goalProgress,decision:a.decisions};
}
export function analyzeAgency(agency,history){
 const characters=Object.values(agency);
 const counts=Object.fromEntries(characters.map(c=>[c.role,{goal:c.goal,decisions:c.decisions,progress:c.goalProgress}]));
 const transitions=history.filter(e=>['betray','reconcile','promise','fulfill','reveal','accuse','damage','repair','depose','appoint'].includes(e.type)).length;
 return {characters:counts,consequentialTransitions:transitions,centralCharacterDecisions:characters.find(c=>c.role==='lead')?.decisions??0};
}
