import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import worker,{status} from './worker.mjs';
const sql=new DatabaseSync(':memory:');sql.exec(readFileSync('drizzle/0000_device_sessions.sql','utf8'));
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
Date.now=actualNow;console.log('PASS: real SQLite transport lifecycle, auth/isolation, CSRF, rate limits, explicit pairing, heartbeat, hidden/stale, 45s expiry, revocation, 2min code expiry, 10min session expiry, cleanup, ping');
