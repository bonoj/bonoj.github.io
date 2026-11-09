import {publicKey,runtimeRelease} from './runtime.mjs';
import {browserCapabilities,browserCall,deviceCall} from './transport.mjs';
// JIT MCP E5.1 capability runtime. Gateway integration pending.
// Separate from Hermeticon Memory's existing 'memory' Edge Function.
const json=(status,data)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
const plain=v=>v!==null&&typeof v==="object"&&!Array.isArray(v)&&Object.getPrototypeOf(v)===Object.prototype;
const keys=(v,allowed)=>plain(v)&&Object.keys(v).every(k=>allowed.includes(k));
const capabilities=Object.freeze([{name:"echo_text_v1",revision:1,read_only:true,description:"Return bounded text unchanged",input_kind:"text",output_kind:"text"},{name:"text_length_v1",revision:2,read_only:true,description:"Count Unicode code points in bounded text",input_kind:"text",output_kind:"integer"},...browserCapabilities,{name:"browser_runtime_key_v1",revision:1,read_only:true,input_kind:"empty",output_kind:"text",description:"Read the Android runtime signing public key"}]);
function equalSecret(a,b){if(!a||!b)return false;const x=new TextEncoder().encode(a),y=new TextEncoder().encode(b);let diff=x.length^y.length;for(let i=0;i<Math.max(x.length,y.length);i++)diff|=(x[i]||0)^(y[i]||0);return diff===0;}
export function execute(payload){
  if(!keys(payload,["operation","capability","input"])||typeof payload.operation!=="string")return {status:400,data:{error:"invalid_request"}};
  if(payload.operation==="capabilities"){
    if(Object.keys(payload).length!==1)return {status:400,data:{error:"invalid_request"}};
    return {status:200,data:{interface_version:1,revision:3,capabilities}};
  }
  if(payload.operation!=="invoke"||!["echo_text_v1","text_length_v1"].includes(payload.capability)||!keys(payload.input,["text"])||Object.keys(payload.input).length!==1||typeof payload.input.text!=="string"||payload.input.text.length>256)
    return {status:400,data:{error:"unsupported_or_invalid_capability"}};
  return {status:200,data:{interface_version:1,revision:3,capability:payload.capability,data:payload.capability==="text_length_v1"?{value:[...payload.input.text].length}:{text:payload.input.text}}};
}
export async function handle(req,secret,serviceKey){
  if(req.method!=="POST")return json(405,{error:"method_not_allowed"});
  const device = req.headers.has("x-jit-device-token");
  if(!device && !secret)return json(503,{error:"not_configured"});
  if(!device && !equalSecret(req.headers.get("x-jit-gateway-secret"),secret))return json(401,{error:"unauthorized"});
  if(!/^application\/json(?:\s*;|$)/i.test(req.headers.get("content-type")||""))return json(415,{error:"unsupported_media_type"});
  const declared=req.headers.get("content-length");
  if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>2048))return json(413,{error:"too_large"});
  let raw;try{raw=await req.text();}catch{return json(400,{error:"invalid_body"});}
  if(new TextEncoder().encode(raw).length>2048)return json(413,{error:"too_large"});
  let payload;try{payload=JSON.parse(raw);}catch{return json(400,{error:"invalid_json"});}
  try {
    if (device && payload?.operation==="runtime") {
      if (!serviceKey || !secret || !keys(payload,["operation"])) return json(400,{error:"invalid_request"});
      const session = await deviceCall(req,{operation:"runtime"},serviceKey);
      if (session.error) return json(401,session);
      return json(200,await runtimeRelease(secret));
    }
    if (device) return serviceKey ? json(200,await deviceCall(req,payload,serviceKey)) : json(503,{error:"transport_unavailable"});
    if (payload?.operation==="invoke" && payload.capability==="browser_runtime_key_v1" && keys(payload,["operation","capability","input"]) && keys(payload.input,[])) {
      return json(200,{interface_version:1,revision:3,capability:payload.capability,data:{text:await publicKey(secret)}});
    }
    if (payload?.operation==="invoke" && browserCapabilities.some(item=>item.name===payload.capability)) {
      if (!serviceKey || !keys(payload,["operation","capability","input"])) return json(400,{error:"invalid_request"});
      const data=await browserCall(req,payload,serviceKey);
      return json(200,{interface_version:1,revision:3,capability:payload.capability,data});
    }
    const result=execute(payload);return json(result.status,result.data);
  } catch {return json(503,{error:"transport_unavailable"});}
}
if(import.meta.main)Deno.serve(req=>handle(req,Deno.env.get("JIT_MCP_GATEWAY_SECRET"),Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")));
