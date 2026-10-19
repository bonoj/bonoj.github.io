/* Bounded, explicit observation -> intent -> outcome trace. Pure JS.
   A trace is evidence of sequence, not proof of causal reward. */
export class MicroTrace {
  constructor({capacity=64}={}){this.capacity=Math.max(1,Math.min(256,capacity|0));this.records=[];this.pending=null;this.nextId=1}
  begin(observation,intent){
    if(this.pending)return {ok:false,reason:"pending-intent"};
    if(!observation?.self||!intent?.action)return {ok:false,reason:"missing-evidence"};
    const id=this.nextId++;
    this.pending={id,at:observation.seconds??null,before:observation,intent};
    return {ok:true,id};
  }
  end(after,evaluator){
    if(!this.pending)return {ok:false,reason:"no-pending-intent"};
    if(!after?.self||typeof evaluator!=="function")return {ok:false,reason:"missing-evidence"};
    const p=this.pending;
    const outcome=evaluator(p.before,after,p.intent);
    if(!outcome||!["observed","unknown"].includes(outcome.status)||!Number.isFinite(outcome.reward))return {ok:false,reason:"invalid-outcome"};
    const record={schema:"ender-micro-trace-record/v1",id:p.id,at:p.at,until:after.seconds??null,intent:p.intent,before:p.before,after,outcome};
    this.records.push(record);if(this.records.length>this.capacity)this.records.shift();
    this.pending=null;
    return {ok:true,record};
  }
  export(){return {schema:"ender-micro-trace/v1",capacity:this.capacity,nextId:this.nextId,pending:this.pending,records:this.records}}
}
