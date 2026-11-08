import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import worker,{status} from './worker.mjs';
const sql=new DatabaseSync(':memory:');sql.exec(readFileSync('drizzle/0000_device_sessions.sql','utf8'));
sql.exec(readFileSync(new URL('./drizzle/0001_browser_observation.sql',import.meta.url),'utf8'));
sql.exec(readFileSync(new URL('./drizzle/0002_permanent_interface.sql',import.meta.url),'utf8'));
const DB = {
 prepare(query) {
  return { bind(...args) {
   return {
    async first() { return sql.prepare(query).get(...args) || null; },
    async run() { return {meta: {changes: sql.prepare(query).run(...args).changes}}; }
   };
  }};
 }
};
const origin='https://test.example';let clock=1794147600000;const actualNow=Date.now;Date.now=()=>clock;
async function api(action,body={},token=null,user='alice',extra={}) {const headers={'Content-Type':'application/json',Origin:origin,...(user?{'oai-authenticated-user-id':user}:{}),...(token?{Authorization:'Bearer '+token}:{}),...extra};const r=await worker.fetch(new Request(origin+'/api/device/'+action,{method:'POST',headers,body:JSON.stringify(body)}),{DB});return {code:r.status,data:await r.json()}}
async function tool(name,user='alice',args={},env={DB}) {const r=await worker.fetch(new Request(origin+'/mcp',{method:'POST',headers:{'Content-Type':'application/json',...(user?{'oai-authenticated-user-id':user}:{})},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}})}),env);return (await r.json()).result}
assert.equal((await tool('device_status')).structuredContent.online,false);
assert.equal((await api('enroll',{},null,null)).code,401);
assert.equal((await api('enroll',{},null,'alice',{Origin:'https://evil.example'})).code,403);
let e=(await api('enroll')).data;
assert.equal((await api('enroll')).code,429);
assert.equal((await tool('device_status')).structuredContent.paired,false);
assert.equal((await api('confirm',{code:e.code,confirm:true},e.token,'bob')).code,401);
assert.equal((await api('confirm',{code:e.code,confirm:true},'wrong')).code,401);
assert.equal((await api('heartbeat',{},e.token)).code,403);
assert.equal((await api('confirm',{code:e.code,confirm:true},e.token)).code,200);
assert.equal((await tool('device_status')).structuredContent.online,false);
const hb={visibility:'visible',platform:'Linux',device_time:new Date(clock-5000).toISOString(),nonce:crypto.randomUUID()};
assert.equal((await api('heartbeat',hb,e.token)).data.online,true);
assert.equal((await tool('device_status')).structuredContent.device_nonce,hb.nonce);
assert.equal((await tool('device_status','bob')).structuredContent.paired,false);
assert.equal((await tool('device_status',null)).isError,true);
clock+=45000;assert.equal((await tool('device_status')).structuredContent.online,false);
assert.equal((await tool('device_status')).structuredContent.state,'offline');
assert.equal((await api('heartbeat',{...hb,visibility:'hidden'},e.token)).data.online,false);
assert.equal((await tool('device_status')).structuredContent.state,'stale');
clock+=45000;assert.equal((await tool('device_status')).structuredContent.state,'offline');
assert.equal((await api('disconnect',{},e.token)).code,200);
assert.equal((await api('heartbeat',hb,e.token)).code,401);
assert.equal((await tool('device_status')).structuredContent.paired,false);
e=(await api('enroll')).data;for(let i=0;i<5;i++)assert.equal((await api('confirm',{code:'invalid',confirm:true},e.token)).code,403);
assert.equal((await api('confirm',{code:e.code,confirm:true},e.token)).code,403);
clock+=10000;e=(await api('enroll')).data;clock+=120000;
assert.equal((await api('confirm',{code:e.code,confirm:true},e.token)).code,403);
clock+=10000;e=(await api('enroll')).data;
await api('confirm',{code:e.code,confirm:true},e.token);await api('heartbeat',hb,e.token);
clock+=600000;assert.equal((await tool('device_status')).structuredContent.paired,false);
assert.equal((await api('heartbeat',hb,e.token)).code,401);
assert.equal(sql.prepare('SELECT count(*) AS n FROM device_sessions').get().n,0);
const p1=(await tool('integration_ping')).structuredContent,p2=(await tool('integration_ping')).structuredContent;
assert.notEqual(p1.nonce,p2.nonce);assert.equal(p1.connected_device,false);
async function discover() { return (await (await worker.fetch(new Request(origin+'/mcp',{
 method:'POST', body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})
}),{DB})).json()).result.tools; }
const toolDefinitions = await discover();
assert.deepEqual(toolDefinitions.map(tool=>tool.name),
 ['integration_ping','device_status','browser_observe','jit_capabilities','jit_observe','jit_invoke']);
const observe = async user => {
 const legacy = (await tool('browser_observe',user)).structuredContent;
 const {interface_version,...stable} = (await tool('jit_observe',user)).structuredContent;
 assert.equal(interface_version,1);
 assert.deepEqual(stable,legacy);
 return stable;
};
assert.equal((await tool('browser_observe',null)).isError,true);
assert.equal((await observe()).reason,'unpaired_or_expired');
e = (await api('enroll')).data;
const snapshot = {
 share_id:crypto.randomUUID(), origin, path:'/device', title:'JIT MCP · Device',
 visibility:'visible', device_time:new Date(clock).toISOString(), nonce:crypto.randomUUID(), demo_counter:0
};
const write = (action,body={...snapshot,device_time:new Date(++clock).toISOString(),nonce:crypto.randomUUID()},user='alice',token=e.token) => api('observation/'+action,body,token,user);
assert.equal((await write('share')).code,403);
assert.equal((await api('confirm',{code:e.code,confirm:true},e.token)).code,200);
await api('heartbeat',hb,e.token);
assert.equal((await observe()).reason,'sharing_disabled');
assert.equal(sql.prepare('SELECT observation FROM device_sessions').get().observation,null);
assert.equal((await write('refresh')).code,409);
assert.equal((await write('share',snapshot,'bob')).code,401);
assert.equal((await write('share',snapshot,'alice','wrong')).code,401);
for (const invalid of [
 {...snapshot, path:'/device?secret=1'}, {...snapshot, path:'/device#secret'},
 {...snapshot, origin:'https://other.example'}, {...snapshot,title:'secret'},
 {...snapshot, visibility:'hidden'}, {...snapshot,demo_counter:1000},
 {...snapshot, nonce:'invalid'}, {...snapshot, device_time:'invalid'},
 {...snapshot, typed_text:'secret'}, {...snapshot, title:'x'.repeat(2048)}
]) assert.equal((await write('share',invalid)).code,400);
assert.equal((await write('share',snapshot)).code,200);
let observed = await observe();
assert.equal(observed.available,true);
assert.equal(observed.data.demo_counter,0);
assert.equal(observed.nonce,snapshot.nonce);
assert.equal(observed.observed_at,new Date(clock).toISOString());
assert.equal(observed.data.device_time,snapshot.device_time);
assert.equal(Object.hasOwn(observed.data,'share_id'),false);
assert.equal((await observe('bob')).data,null);
const changed = {...snapshot,demo_counter:1,nonce:crypto.randomUUID(),device_time:new Date(++clock).toISOString()};
assert.equal((await write('refresh',changed)).code,200);
observed = await observe();
assert.equal(observed.data.demo_counter,1);
assert.equal(observed.nonce,changed.nonce);
assert.equal((await write('refresh',changed)).code,409);
assert.equal((await write('refresh',{...changed,device_time:new Date(clock-45001).toISOString()})).code,400);
await api('heartbeat',{...hb,visibility:'hidden'},e.token);
assert.equal((await observe()).reason,'page_hidden');
assert.equal((await observe()).data,null);
await api('heartbeat',hb,e.token);
assert.equal((await observe()).reason,'snapshot_required');
assert.equal((await write('refresh')).code,200);
clock += 45000;
await api('heartbeat',hb,e.token);
assert.equal((await observe()).reason,'snapshot_expired');
assert.equal((await observe()).nonce,null);
assert.equal((await write('refresh')).code,200);
assert.equal((await write('revoke',{share_id:snapshot.share_id})).code,200);
assert.equal((await observe()).reason,'sharing_disabled');
assert.equal(sql.prepare('SELECT observation FROM device_sessions').get().observation,null);
assert.equal((await write('refresh')).code,409);
assert.equal((await write('share',changed)).code,400);
assert.equal((await write('share')).code,200);
const oldToken = e.token;
e = (await api('enroll')).data;
assert.equal((await write('refresh',snapshot,'alice',oldToken)).code,401);
assert.equal(sql.prepare('SELECT observation FROM device_sessions').get().observation,null);
assert.equal((await api('confirm',{code:e.code,confirm:true},e.token)).code,200);
await api('heartbeat',hb,e.token);
assert.equal((await write('share')).code,200);
assert.equal((await api('disconnect',{},e.token)).code,200);
assert.equal((await observe()).data,null);
e = (await api('enroll')).data;
await api('confirm',{code:e.code,confirm:true},e.token);
await api('heartbeat',hb,e.token);
assert.equal((await write('share')).code,200);
clock += 600000;
assert.equal((await observe()).reason,'unpaired_or_expired');
assert.equal((await observe()).data,null);
console.log('PASS: E4 MCP discovery, consent, bounded payload, isolation, refresh, hidden/expired snapshots, revoke, replacement and disconnect');
async function manage(body,user='alice',originHeader=origin) {
 const response = await worker.fetch(new Request(origin+'/api/capabilities',{
  method:'POST',headers:{'Content-Type':'application/json',Origin:originHeader,...(user?{'oai-authenticated-user-id':user}:{})},
  body:JSON.stringify(body)
 }),{DB});
 return {code:response.status,data:await response.json()};
}
const capability = {name:'demo_answer',kind:'constant_integer',value:42};
const callFixed = async (name,args={},user='alice') => (await tool(name,user,args)).structuredContent;
const invoke = (capability,input,expected_revision,user) => callFixed('jit_invoke',{capability,input,expected_revision},user);
assert.equal((await callFixed('jit_capabilities',{},null)).error,'authentication_required');
assert.equal((await callFixed('jit_observe',{scope:'other_tab'})).error,'invalid_arguments');
assert.equal((await invoke('echo_integer',{value:10},0)).data.value,10);
assert.equal((await invoke('echo_integer',{value:1000},0)).error,'invalid_input');
assert.equal((await invoke('echo_integer',{value:1,extra:0},0)).error,'invalid_input');
assert.equal((await invoke('demo_answer',{},0)).error,'capability_unavailable');
assert.equal((await manage({action:'test',entry:capability},null)).code,401);
assert.equal((await manage({action:'test',entry:capability},'alice','https://evil.example')).code,403);
assert.equal((await manage({action:'test',entry:{...capability,kind:'shell'}})).code,400);
assert.equal((await manage({action:'test',entry:capability})).data.data.value,42);
assert.equal((await invoke('demo_answer',{},0)).error,'capability_unavailable');
const update = {action:'publish',entry:capability,expected_revision:0};
const writes = await Promise.all([manage(update),manage(update)]);
assert.deepEqual(writes.map(result=>result.code).sort(),[200,409]);
const listing = await callFixed('jit_capabilities');
assert.equal(listing.revision,1);
assert.ok(listing.capabilities.some(item=>item.name==='demo_answer'));
assert.deepEqual(await discover(),toolDefinitions);
assert.equal((await invoke('demo_answer',{},0)).error,'revision_mismatch');
assert.deepEqual(await invoke('demo_answer',{},1),{interface_version:1,revision:1,capability:'demo_answer',data:{value:42}});
assert.equal((await invoke('demo_answer',{value:1},1)).error,'invalid_input');
assert.equal((await invoke('demo_answer',{},0,'bob')).error,'capability_unavailable');
assert.equal((await manage({action:'revoke',name:capability.name,expected_revision:1})).code,200);
assert.equal((await invoke('demo_answer',{},2)).error,'capability_unavailable');
assert.deepEqual(await discover(),toolDefinitions);
clock += 60000;
for (let i=0;i<60;i++) assert.equal((await invoke('echo_integer',{value:0},2)).data.value,0);
assert.equal((await invoke('echo_integer',{value:0},2)).error,'rate_limited');
assert.equal((await manage({action:'test',entry:capability})).code,429);
assert.deepEqual(Object.keys(sql.prepare('SELECT action,outcome,recorded_at FROM jit_activity WHERE user_id=?').get('alice')),
 ['action','outcome','recorded_at']);
clock += 60000;
assert.equal((await invoke('echo_integer',{value:0},2)).data.value,0);
console.log('PASS: E5 fixed tool definitions across test/publish/invoke/revoke, typed dispatch, revision races, quota and isolation');
const gateway = {DB,JIT_MCP_SUPABASE_JWT:'fixture-jwt',JIT_MCP_GATEWAY_SECRET:'fixture-secret'};
const liveFetch = globalThis.fetch;
let backendRevision = 1, downstreamCalls = 0, backendFailure = false, malformedOutput = false;
globalThis.fetch = async (url, options) => {
 assert.equal(url,'https://iqglyokmcobegledbfcm.supabase.co/functions/v1/jit-mcp-capabilities');
 assert.equal(options.redirect,'error');
 assert.equal(options.headers.Authorization,'Bearer fixture-jwt');
 assert.equal(options.headers['X-JIT-Gateway-Secret'],'fixture-secret');
 const payload = JSON.parse(options.body);
 if (backendFailure) return new Response(null,{status:503});
 const base = {interface_version:1,revision:backendRevision};
 if (payload.operation==='capabilities') return Response.json({...base,capabilities:[
  {name:'echo_text_v1',revision:1,description:'Echo text',read_only:true},
  ...(backendRevision===2?[{name:'text_length_v1',revision:1,description:'Count text units',read_only:true,input_kind:'text',output_kind:'integer'}]:[]),
 ]});
 downstreamCalls++;
 const data = payload.capability==='echo_text_v1' ? {text:payload.input.text} : {value:payload.input.text.length};
 return Response.json({...base,capability:payload.capability,data:malformedOutput?{unexpected:true}:data});
};
const gatewayCall = async (name,args={}) => (await tool(name,'gateway-user',args,gateway)).structuredContent;
try {
 assert.equal((await tool('jit_capabilities','gateway-user')).structuredContent.backend_status,'not_configured');
 const baseline = await gatewayCall('jit_capabilities');
 assert.equal(baseline.backend_status,'available');
 assert.ok(!baseline.capabilities.some(item=>item.name==='text_length_v1'));
 assert.deepEqual((await gatewayCall('jit_invoke',{capability:'echo_text_v1',input:{text:'baseline'},expected_revision:baseline.revision})).data,{text:'baseline'});
 assert.equal((await gatewayCall('jit_invoke',{capability:'echo_text_v1',input:{text:'too much'.repeat(100)}})).error,'invalid_input');
 assert.equal(downstreamCalls,1);
 backendRevision = 2;
 const next = await gatewayCall('jit_capabilities');
 assert.notEqual(next.revision,baseline.revision);
 assert.ok(next.capabilities.some(item=>item.name==='text_length_v1'));
 assert.deepEqual(await discover(),toolDefinitions);
 assert.equal((await gatewayCall('jit_invoke',{capability:'text_length_v1',input:{text:'abc'},expected_revision:baseline.revision})).error,'revision_mismatch');
 assert.deepEqual((await gatewayCall('jit_invoke',{capability:'text_length_v1',input:{text:'abc'},expected_revision:next.revision})).data,{value:3});
 malformedOutput = true;
 assert.equal((await gatewayCall('jit_invoke',{capability:'text_length_v1',input:{text:'abc'}})).error,'invalid_output');
 backendFailure = true;
 assert.equal((await gatewayCall('jit_capabilities')).backend_status,'unavailable');
 assert.deepEqual((await gatewayCall('jit_invoke',{capability:'echo_integer',input:{value:42}})).data,{value:42});
} finally {globalThis.fetch = liveFetch;}
console.log('PASS: gateway credential headers, typed forwarding, backend-only catalog revision, fixed tool definitions, invalid output, and local fallback');
Date.now=actualNow;console.log('PASS: real SQLite transport lifecycle, auth/isolation, CSRF, rate limits, explicit pairing, heartbeat, hidden/stale, 45s expiry, revocation, 2min code expiry, 10min session expiry, cleanup, ping');
