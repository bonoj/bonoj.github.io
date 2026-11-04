// Concrete, replayable universal event operators. Independent of genre.
const clone=x=>structuredClone(x);
export function world({agents=[],objects=[],places=[],facts=[]}={}){
return {agents:Object.fromEntries(agents.map(a=>[a.id,{id:a.id,at:a.at??null,knows:[...(a.knows||[])],believes:[...(a.believes||[])]}])),objects:Object.fromEntries(objects.map(o=>[o.id,{id:o.id,kind:o.kind??'object',at:o.at??null,heldBy:o.heldBy??null,condition:o.condition??'intact',fragile:!!o.fragile}])),places:Object.fromEntries(places.map(p=>[p.id,{id:p.id,neighbors:[...(p.neighbors||[])]}])),facts:Object.fromEntries(facts.map(f=>[f.id,{id:f.id,truth:f.truth??true}])),history:[]};
}
const requireThat=(ok,msg)=>{if(!ok)throw Error(msg)};
const has=(map,key)=>Object.prototype.hasOwnProperty.call(map,key);
function apply(s,e){
const a=s.agents[e.actor];requireThat(a,'unknown actor '+e.actor);
const o=e.object?s.objects[e.object]:null;
switch(e.type){
case 'move':requireThat(has(s.places,e.to),'unknown place');requireThat(a.at===e.from,'actor origin mismatch');requireThat(e.from===e.to||s.places[e.from]?.neighbors.includes(e.to),'nonadjacent move');a.at=e.to;break;
case 'take':requireThat(o&&o.heldBy===null&&o.at===a.at,'object not available');o.heldBy=e.actor;o.at=null;break;
case 'drop':requireThat(o&&o.heldBy===e.actor,'object not held');o.heldBy=null;o.at=a.at;if(o.fragile&&e.impact==='hard')o.condition='broken';break;
case 'give':requireThat(o&&o.heldBy===e.actor,'object not held');requireThat(s.agents[e.to]?.at===a.at,'recipient not co-located');o.heldBy=e.to;break;
case 'observe':requireThat(has(s.facts,e.fact),'unknown fact');requireThat(e.at===a.at,'observer not present');if(!a.knows.includes(e.fact))a.knows.push(e.fact);break;
case 'tell':requireThat(a.knows.includes(e.fact),'speaker lacks knowledge');requireThat(s.agents[e.to]?.at===a.at,'listener not co-located');if(!s.agents[e.to].knows.includes(e.fact))s.agents[e.to].knows.push(e.fact);break;
case 'infer':requireThat(a.knows.includes(e.basis),'basis not known');requireThat(has(s.facts,e.fact),'unknown inference');if(!a.believes.includes(e.fact))a.believes.push(e.fact);break;
default:throw Error('unknown concrete operator '+e.type);
}
s.history.push(clone(e));return s;
}
export function transition(state,event){const next=clone(state);return apply(next,event);}
export function replayWorld(initial,events){return events.reduce(transition,initial);}
export function runWorld(initial,events){const states=[clone(initial)];for(const e of events)states.push(transition(states.at(-1),e));return {initial:clone(initial),events:clone(events),final:states.at(-1),states};}
