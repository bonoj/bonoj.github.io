// JIT MCP E5.1 capability runtime. Gateway integration pending.
// Separate from Hermeticon Memory's existing 'memory' Edge Function.
const json=(status,data)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
const plain=v=>v!==null&&typeof v==="object"&&!Array.isArray(v)&&Object.getPrototypeOf(v)===Object.prototype;
const keys=(v,allowed)=>plain(v)&&Object.keys(v).every(k=>allowed.includes(k));
const capabilities=Object.freeze([{name:"echo_text_v1",revision:1,read_only:true,description:"Return bounded text unchanged"}]);
function equalSecret(a,b){if(!a||!b)return false;const x=new TextEncoder().encode(a),y=new TextEncoder().encode(b);let diff=x.length^y.length;for(let i=0;i<Math.max(x.length,y.length);i++)diff|=(x[i]||0)^(y[i]||0);return diff===0;}
export function execute(payload){
  if(!keys(payload,["operation","capability","input"])||typeof payload.operation!=="string")return {status:400,data:{error:"invalid_request"}};
  if(payload.operation==="capabilities"){
    if(Object.keys(payload).length!==1)return {status:400,data:{error:"invalid_request"}};
    return {status:200,data:{interface_version:1,revision:1,capabilities}};
  }
  if(payload.operation!=="invoke"||payload.capability!=="echo_text_v1"||!keys(payload.input,["text"])||Object.keys(payload.input).length!==1||typeof payload.input.text!=="string"||payload.input.text.length>256)
    return {status:400,data:{error:"unsupported_or_invalid_capability"}};
  return {status:200,data:{interface_version:1,revision:1,capability:"echo_text_v1",data:{text:payload.input.text}}};
}
export async function handle(req,secret){
  if(req.method!=="POST")return json(405,{error:"method_not_allowed"});
  if(!secret)return json(503,{error:"not_configured"});
  if(!equalSecret(req.headers.get("x-jit-gateway-secret"),secret))return json(401,{error:"unauthorized"});
  if(!/^application\/json(?:\s*;|$)/i.test(req.headers.get("content-type")||""))return json(415,{error:"unsupported_media_type"});
  const declared=req.headers.get("content-length");
  if(declared!==null&&(!/^\\d+$/.test(declared)||Number(declared)>2048))return json(413,{error:"too_large"});
  let raw;try{raw=await req.text();}catch{return json(400,{error:"invalid_body"});}
  if(new TextEncoder().encode(raw).length>2048)return json(413,{error:"too_large"});
  let payload;try{payload=JSON.parse(raw);}catch{return json(400,{error:"invalid_json"});}
  const result=execute(payload);return json(result.status,result.data);
}
if(import.meta.main)Deno.serve(req=>handle(req,Deno.env.get("JIT_MCP_GATEWAY_SECRET")));
