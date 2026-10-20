import { createClient } from "npm:@supabase/supabase-js@2";
const cors = {"access-control-allow-origin":"*","access-control-allow-methods":"GET, POST, OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"86400"};
const response=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{...cors,"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const valid=(s:string)=>/^[a-zA-Z0-9_-]{1,64}$/.test(s);
Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
 const url=new URL(req.url);
 if(url.pathname.endsWith("/health")&&req.method==="GET")return response({ok:true,service:"hermeticon-memory",version:1});
 const m=/\/v1\/data\/([^/]+)\/([^/]+)$/.exec(url.pathname);
 if(!m||!valid(m[1])||!valid(m[2]))return response({error:"not_found"},404);
 const [,namespace,key]=m;
 const supabase=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false}});
 try{
  if(req.method==="GET"){
   const limit=Math.min(100,Math.max(1,Number.parseInt(url.searchParams.get("limit")||"50",10)||50));
   const {data,error}=await supabase.from("events").select("id,created_at,payload").eq("namespace",namespace).eq("item_key",key).order("id",{ascending:false}).limit(limit);
   if(error)throw error;
   return response({namespace,key,events:data?.map(x=>({id:x.id,at:x.created_at,value:x.payload}))||[]});
  }
  if(req.method!=="POST")return response({error:"method_not_allowed"},405);
  if(Number(req.headers.get("content-length")||0)>4096)return response({error:"payload_too_large"},413);
  const raw=await req.text();
  if(new TextEncoder().encode(raw).length>4096)return response({error:"payload_too_large"},413);
  let value:unknown;try{value=JSON.parse(raw)}catch{return response({error:"invalid_json"},400)}
  if(!value||typeof value!=="object"||Array.isArray(value))return response({error:"expected_json_object"},400);
  const minute=new Date().toISOString().slice(0,16)+":00Z";
  // Use a DB function for atomic quota + insert; avoid read-then-write races.
  const {data,error}=await supabase.rpc("append_event",{p_namespace:namespace,p_key:key,p_payload:value,p_minute:minute});
  if(error){if(error.code==="P0001")return response({error:"rate_limited"},429);throw error;}
  return response({ok:true,id:data},201);
 }catch(e){return response({error:"server_error"},500)}
});
