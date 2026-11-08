import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import worker,{status} from './worker.mjs';
const sql=new DatabaseSync(':memory:');sql.exec(readFileSync('drizzle/0000_device_sessions.sql','utf8'));
sql.exec(readFileSync(new URL('./drizzle/0001_browser_observation.sql',import.meta.url),'utf8'));
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
async function tool(name,user='alice') {const r=await worker.fetch(new Request(origin+'/mcp',{method:'POST',headers:{'Content-Type':'application/json',...(user?{'oai-authenticated-user-id':user}:{})},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:{}}})}),{DB});return (await r.json()).result}
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
const discovery = await worker.fetch(new Request(origin+'/mcp',{
 method:'POST', body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})
}),{DB});
assert.deepEqual((await discovery.json()).result.tools.map(tool=>tool.name),
 ['integration_ping','device_status','browser_observe']);
const observe = async user => (await tool('browser_observe',user)).structuredContent;
assert.equal((await tool('browser_observe',null)).isError,true);
assert.equal((await observe()).reason,'unpaired_or_expired');
e = (await api('enroll')).data;
const snapshot = {
 share_id:crypto.randomUUID(), origin, path:'/device', title:'JIT MCP · Device',
 visibility:'visible', device_time:new Date(clock).toISOString(), nonce:crypto.randomUUID(), demo_counter:0
};
const write = (action,body=snapshot,user='alice',token=e.token) => api('observation/'+action,body,token,user);
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
assert.equal((await write('share')).code,200);
let observed = await observe();
assert.equal(observed.available,true);
assert.equal(observed.data.demo_counter,0);
assert.equal(observed.nonce,snapshot.nonce);
assert.equal(observed.observed_at,new Date(clock).toISOString());
assert.equal(observed.data.device_time,snapshot.device_time);
assert.equal(Object.hasOwn(observed.data,'share_id'),false);
assert.equal((await observe('bob')).data,null);
const changed = {...snapshot,demo_counter:1,nonce:crypto.randomUUID()};
assert.equal((await write('refresh',changed)).code,200);
observed = await observe();
assert.equal(observed.data.demo_counter,1);
assert.equal(observed.nonce,changed.nonce);
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
Date.now=actualNow;console.log('PASS: real SQLite transport lifecycle, auth/isolation, CSRF, rate limits, explicit pairing, heartbeat, hidden/stale, 45s expiry, revocation, 2min code expiry, 10min session expiry, cleanup, ping');
