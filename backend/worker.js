// Static-world memory v1: anonymous, append-only JSON with bounded public reads.
// Bind a Cloudflare D1 database as DB. Apply schema.sql before deployment.
const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...extra}});
const cors={"access-control-allow-origin":"*","access-control-allow-methods":"GET, POST, OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"86400"};
const valid=s=>/^[a-zA-Z0-9_-]{1,64}$/.test(s);
export default {
 async fetch(request,env){
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
  const reply=(v,s=200)=>json(v,s,cors);
  try{
   const url=new URL(request.url);
   if(url.pathname==="/health"&&request.method==="GET")return reply({ok:true,service:"static-world-memory",version:1});
   const match=/^\/v1\/data\/([^/]+)\/([^/]+)$/.exec(url.pathname);
   if(!match||!valid(match[1])||!valid(match[2]))return reply({error:"not_found"},404);
   const [,namespace,key]=match;
   if(request.method==="GET"){
    const limit=Math.min(100,Math.max(1,Number.parseInt(url.searchParams.get("limit")||"50",10)||50));
    const rows=await env.DB.prepare("SELECT id, created_at, payload FROM events WHERE namespace=? AND item_key=? ORDER BY id DESC LIMIT ?").bind(namespace,key,limit).all();
    return reply({namespace,key,events:rows.results.map(r=>({id:r.id,at:r.created_at,value:JSON.parse(r.payload)}))});
   }
   if(request.method!=="POST")return reply({error:"method_not_allowed"},405);
   if(Number(request.headers.get("content-length")||0)>4096)return reply({error:"payload_too_large"},413);
   const body=await request.text();
   if(new TextEncoder().encode(body).length>4096)return reply({error:"payload_too_large"},413);
   let value;try{value=JSON.parse(body)}catch{return reply({error:"invalid_json"},400)}
   if(value===null||typeof value!=="object"||Array.isArray(value))return reply({error:"expected_json_object"},400);
   // Coarse per-namespace quota. This is NOT bot-proof or a substitute for edge rate limiting.
   const minute=new Date().toISOString().slice(0,16);
   const result=await env.DB.batch([
    env.DB.prepare("INSERT INTO quotas (namespace, minute, count) VALUES (?, ?, 1) ON CONFLICT(namespace,minute) DO UPDATE SET count=count+1 RETURNING count").bind(namespace,minute),
   ]);
   const count=result[0].results[0]?.count||0;
   if(count>30)return reply({error:"rate_limited",retryAfterSeconds:60},429);
   const insert=await env.DB.prepare("INSERT INTO events (namespace,item_key,payload) VALUES (?,?,?)").bind(namespace,key,JSON.stringify(value)).run();
   return reply({ok:true,id:insert.meta.last_row_id},201);
  }catch(e){return reply({error:"server_error"},500)}
 }
};
