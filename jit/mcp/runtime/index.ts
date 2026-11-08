// JIT MCP E5.1 capability runtime. Gateway integration pending.
// Separate from Hermeticon Memory's existing 'memory' Edge Function.
const json=(status,data)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
const plain=v=>v!==null&&typeof v==="object"&&!Array.isArray(v)&&Object.getPrototypeOf(v)===Object.prototype;
const keys=(v,allowed)=>plain(v)&&Object.keys(v).every(k=>allowed.includes(k));
const capabilities=Object.freeze([{name:"echo_text_v1",revision:1,read_only:true,description:"Return bounded text unchanged"}]);
const encoder=new TextEncoder();
function hex(bytes){return [...bytes].map(b=>b.toString(16).padStart(2,"0")).join("");}
function equalHex(a,b){if(!/^[0-9a-f]{64}$/.test(a)||!/^[0-9a-f]{64}$/.test(b))return false;let diff=0;for(let i=0;i<64;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}
export async function signRequest(secret,timestamp,nonce,raw){
  const key=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const bodyHash=hex(new Uint8Array(await crypto.subtle.digest("SHA-256",encoder.encode(raw))));
  return hex(new Uint8Array(await crypto.subtle.sign("HMAC",key,encoder.encode("jit-mcp-v1\\n"+timestamp+"\\n"+nonce+"\\n"+bodyHash))));
}
export function execute(payload){
  if(!keys(payload,["operation","capability","input"])||typeof payload.operation!=="string")return {status:400,data:{error:"invalid_request"}};
  if(payload.operation==="capabilities"){
    if(own(payload,"capability")||own(payload,"input"))return {status:400,data:{error:"invalid_request"}};
    return {status:200,data:{interface_version:1,revision:1,capabilities}};
  }
  if(payload.operation!=="invoke"||payload.capability!=="echo_text_v1"||!keys(payload.input,["text"])||typeof payload.input.text!=="string"||payload.input.text.length>256)
    return {status:400,data:{error:"unsupported_or_invalid_capability"}};
  return {status:200,data:{interface_version:1,revision:1,capability:"echo_text_v1",data:{text:payload.input.text}}};
}
// Replay admission must be backed by durable atomic storage; default deny.
export async function handle(req,secret,admit){
  if(req.method!=="POST")return json(405,{error:"method_not_allowed"});
  if(!secret||typeof admit!=="function")return json(503,{error:"not_configured"});
  if(!/^application\\/json(?:\\s*;|$)/i.test(req.headers.get("content-type")||""))return json(415,{error:"unsupported_media_type"});
  const declared=Number(req.headers.get("content-length")||0);
  if(declared>2048)return json(413,{error:"too_large"});
  let raw;try{raw=await req.text();}catch{return json(400,{error:"invalid_body"});}
  if(encoder.encode(raw).length>2048)return json(413,{error:"too_large"});
  const timestamp=req.headers.get("x-jit-timestamp")||"";
  const nonce=req.headers.get("x-jit-nonce")||"";
  const signature=req.headers.get("x-jit-signature")||"";
  if(!/^[0-9]{13}$/.test(timestamp)||Math.abs(Date.now()-Number(timestamp))>60000
     ||!/^[A-Za-z0-9_-]{20,128}$/.test(nonce)||!/^[0-9a-f]{64}$/.test(signature))
    return json(401,{error:"unauthorized"});
  const expected=await signRequest(secret,timestamp,nonce,raw);
  if(!equalHex(signature,expected))return json(401,{error:"unauthorized"});
  let accepted=false;
  try{accepted=await admit(nonce,Number(timestamp));}catch{return json(503,{error:"admission_unavailable"});}
  if(accepted!==true)return json(429,{error:"replay_or_rate_limit"});
  let payload;try{payload=JSON.parse(raw);}catch{return json(400,{error:"invalid_json"});}
  const result=execute(payload);return json(result.status,result.data);
}
// No production admission adapter is configured yet: deployed handler must fail closed.
if(import.meta.main)Deno.serve(req=>handle(req,Deno.env.get("JIT_MCP_GATEWAY_SECRET")));
