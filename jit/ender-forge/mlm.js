/* Ender MLM v0 — genuine trainable character-level neural language model.
   Experimental standalone module. Not wired to the simulation. No external APIs. */
export class MicroLanguageModel {
  constructor({vocab=" abcdefghijklmnopqrstuvwxyz0123456789.,:;?!-\n",hidden=32,seed=741}={}){
    this.vocab=[...new Set([...vocab])];this.ids=new Map(this.vocab.map((c,i)=>[c,i]));
    this.V=this.vocab.length;this.H=hidden;this.seed=seed>>>0;
    const random=()=>{this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296};
    this.E=Array.from({length:this.V},()=>Float32Array.from({length:hidden},()=> (random()-.5)*.15));
    this.W=Array.from({length:hidden},()=>Float32Array.from({length:this.V},()=> (random()-.5)*.15));
    this.b=new Float32Array(this.V);this.steps=0;this.loss=0;
  }
  // A learned one-token-context neural softmax LM: embedding -> linear logits -> probability.
  distribution(id,temperature=1){
    const logits=Float64Array.from({length:this.V},(_,j)=>{
      let z=this.b[j];for(let h=0;h<this.H;h++)z+=this.E[id][h]*this.W[h][j];
      return z/Math.max(.05,temperature);
    });
    const max=Math.max(...logits);let sum=0;
    for(let j=0;j<this.V;j++){logits[j]=Math.exp(logits[j]-max);sum+=logits[j]}
    for(let j=0;j<this.V;j++)logits[j]/=sum;
    return logits;
  }
  train(text,{epochs=1,rate=.07}={}){
    const ids=[...text.toLowerCase()].map(c=>this.ids.get(c)).filter(i=>i!==undefined);
    if(ids.length<2)throw Error("Training corpus requires two recognized characters");
    let total=0,n=0;
    for(let ep=0;ep<epochs;ep++)for(let k=1;k<ids.length;k++){
      const x=ids[k-1],y=ids[k],p=this.distribution(x);
      total-=Math.log(Math.max(1e-12,p[y]));n++;
      const grad=Float32Array.from(p);grad[y]-=1;
      // Simultaneous gradient update: use pre-update weights for embedding gradient.
      const de=new Float32Array(this.H);
      for(let h=0;h<this.H;h++){
        let g=0;for(let j=0;j<this.V;j++)g+=this.W[h][j]*grad[j];
        de[h]=g;
      }
      for(let h=0;h<this.H;h++){
        const e=this.E[x][h];
        for(let j=0;j<this.V;j++)this.W[h][j]-=rate*e*grad[j];
        this.E[x][h]-=rate*de[h];
      }
      for(let j=0;j<this.V;j++)this.b[j]-=rate*grad[j];
    }
    this.steps+=n;this.loss=total/n;return {steps:this.steps,crossEntropy:this.loss,perplexity:Math.exp(this.loss)};
  }
  generate(prefix,{length=120,temperature=.8}={}){
    let output=prefix.toLowerCase(),id=this.ids.get([...output].at(-1))??0;
    for(let k=0;k<length;k++){
      const p=this.distribution(id,temperature);let r=this.random(),next=p.length-1;
      for(let j=0;j<p.length;j++){r-=p[j];if(r<=0){next=j;break}}
      output+=this.vocab[next];id=next;
    }
    return output;
  }
  random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296}
  export(){return {schema:"ender-mlm/v0",vocab:this.vocab.join(""),hidden:this.H,seed:this.seed,steps:this.steps,embedding:this.E.map(a=>[...a]),projection:this.W.map(a=>[...a]),bias:[...this.b]}}
  static import(data){
    if(data.schema!=="ender-mlm/v0")throw Error("Invalid model");
    const m=new MicroLanguageModel({vocab:data.vocab,hidden:data.hidden,seed:data.seed});
    if(data.embedding.length!==m.V||data.projection.length!==m.H||data.bias.length!==m.V)throw Error("Shape mismatch");
    m.E=data.embedding.map(a=>Float32Array.from(a));m.W=data.projection.map(a=>Float32Array.from(a));m.b=Float32Array.from(data.bias);m.steps=data.steps;return m;
  }
}
