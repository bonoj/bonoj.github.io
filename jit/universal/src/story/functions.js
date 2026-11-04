// Stable narrative function contract. Genre adapters may realize each function differently.
export const FUNCTIONS=Object.freeze([
['normality','Establish protagonist and ordinary competence'],
['disruption','Introduce inciting disruption'],
['commitment','Force a reluctant commitment'],
['first-attempt','Deliver partial success'],
['alliance','Create a meaningful alliance'],
['warning','Introduce suppressed information'],
['reversal','Reverse apparent progress'],
['fallout','Damage trust or allegiance'],
['discovery','Reveal withheld evidence'],
['defeat','Defeat the initial plan'],
['reinterpretation','Change understanding of the original desire'],
['choice','Make a costly final choice'],
['confrontation','Confront the opposing force'],
['consequence','Resolve the main obligation and relationships'],
['closing-image','Echo the opening with changed meaning']
].map(([id,description],index)=>Object.freeze({id,description,index,required:true,requires:index?[index-1]:[]})));
export const FUNCTION_IDS=Object.freeze(FUNCTIONS.map(x=>x.id));
export function validateFunctionOrder(beats){if(beats.length!==FUNCTIONS.length)throw Error('function count mismatch');for(let i=0;i<FUNCTIONS.length;i++)if(beats[i].functionId!==FUNCTIONS[i].id)throw Error('function order mismatch at '+i);return true;}
