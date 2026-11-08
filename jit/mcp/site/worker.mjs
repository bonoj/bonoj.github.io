const protocolVersion = '2026-07-28';
const TTL = 600000, PAIR_TTL = 120000, HEARTBEAT_TTL = 45000;
const caps = ['browser_heartbeat', 'page_visibility'];
const pageTitle = 'JIT MCP · Device';
const observationKeys = ['origin', 'path', 'title', 'visibility', 'device_time', 'nonce', 'demo_counter'];
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const descriptions = {
 integration_ping: 'Return a fresh UTC timestamp and random nonce to verify a live JIT MCP invocation.',
 device_status: 'Read the authenticated user’s paired browser session. Online requires a visible browser heartbeat within 45 seconds; this does not provide Android OS access.',
 browser_observe: 'Read the latest explicitly shared snapshot of the paired JIT MCP companion page, including its demo counter. Requires a visible, fresh session and active consent.',
};
const tools = Object.entries(descriptions).map(([name, description]) => ({name, description,
 inputSchema: {type:'object', properties:{}, additionalProperties:false}, annotations:{readOnlyHint:true,openWorldHint:false}}));
const json = (data, status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const rpc = (id, body) => json({jsonrpc:'2.0',id,...body});
const hash = async s => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))), b=>b.toString(16).padStart(2,'0')).join('');
const secret = () => Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
const iso = t => t == null ? null : new Date(t).toISOString();
export function status(row, now=Date.now()) {
 const valid = row && row.expires_at > now;
 const paired = !!(valid && row.paired);
 const age = paired && row.last_seen != null ? Math.max(0,(now-row.last_seen)/1000) : null;
 const online = paired && age !== null && age < HEARTBEAT_TTL/1000 && row.visibility === 'visible';
 return {paired,online,state:!valid?'unpaired':!paired?'pending':online?'online':age===null?'awaiting_heartbeat':age>=45?'offline':'stale',observed_at:paired?iso(row.last_seen):null,age_seconds:age,server_time:iso(now),device_time:paired?row.device_time:null,device_nonce:paired?row.nonce:null,platform:paired?row.platform:null,visibility:paired?row.visibility:null,capabilities:paired&&row.last_seen!=null?caps:[],expires_at:valid?iso(row.expires_at):null,heartbeat_timeout_seconds:45};
}
function browserObservation(row, now = Date.now()) {
 const device = status(row, now);
 const consentActive = device.paired && !!row.share_id;
 const receipt = consentActive ? row.observation_received_at : null;
 const age = receipt == null ? null : Math.max(0, now - receipt) / 1000;
 let reason = null;
 if (!device.paired) reason = 'unpaired_or_expired';
 else if (!consentActive) reason = 'sharing_disabled';
 else if (device.visibility === 'hidden') reason = 'page_hidden';
 else if (!device.online) reason = 'heartbeat_stale';
 else if (age === null) reason = 'snapshot_required';
 else if (age >= HEARTBEAT_TTL / 1000) reason = 'snapshot_expired';
 const data = reason ? null : JSON.parse(row.observation);
 return {
  available: !reason,
  state: !reason ? 'available' : ['page_hidden', 'heartbeat_stale', 'snapshot_expired'].includes(reason) ? 'stale' : 'unavailable',
  reason,
  observation_method: 'first_party_companion_dom',
  scope: 'companion_page_only',
  consent_active: consentActive,
  observed_at: reason ? null : iso(receipt),
  age_seconds: reason ? null : age,
  visibility: device.visibility,
  nonce: data?.nonce ?? null,
  data,
 };
}

async function readObservationBody(request) {
 const reader = request.body?.getReader();
 if (!reader) return null;
 const decoder = new TextDecoder('utf-8', {fatal: true});
 let size = 0, raw = '';
 try {
  while (true) {
   const {done, value} = await reader.read();
   if (done) break;
   size += value.byteLength;
   if (size > 1024) {
    await reader.cancel();
    return null;
   }
   raw += decoder.decode(value, {stream: true});
  }
  return JSON.parse(raw + decoder.decode());
 } catch {
  return null;
 }
}

async function writeObservation(db, row, user, action, body, origin, now) {
 if (!row.paired) return json({error:'Confirm pairing first'},403);
 if (!body || typeof body.share_id !== 'string' || !uuid.test(body.share_id)) {
  return json({error:'Invalid sharing request'},400);
 }
 if (action === 'revoke') {
  if (Object.keys(body).length !== 1) return json({error:'Invalid revocation'},400);
  await db.prepare('UPDATE device_sessions SET share_id=NULL,observation=NULL,observation_received_at=NULL WHERE user_id=? AND session_id=? AND share_id=?')
   .bind(user,row.session_id,body.share_id).run();
  return json({consent_active:false});
 }
 if (Object.keys(body).length !== observationKeys.length + 1 || !observationKeys.every(key => Object.hasOwn(body, key)) ||
     body.origin !== origin || body.path !== '/device' || body.title !== pageTitle || body.visibility !== 'visible' ||
     typeof body.nonce !== 'string' || !uuid.test(body.nonce) ||
     typeof body.device_time !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(body.device_time) ||
     !Number.isFinite(Date.parse(body.device_time)) ||
     !Number.isInteger(body.demo_counter) || body.demo_counter < 0 || body.demo_counter > 999) {
  return json({error:'Invalid companion observation'},400);
 }
 const data = Object.fromEntries(observationKeys.map(key => [key, body[key]]));
 // A refresh already in flight cannot revive consent after revocation or replacement.
 const consentCondition = action === 'share' ? 'share_id IS NULL' : 'share_id = ?';
 const consentArgs = action === 'share' ? [] : [body.share_id];
 const result = await db.prepare(
  'UPDATE device_sessions SET share_id=?,observation=?,observation_received_at=? WHERE user_id=? AND session_id=? AND paired=1 AND expires_at>? AND visibility=\'visible\' AND last_seen>? AND ' + consentCondition
 ).bind(body.share_id,JSON.stringify(data),now,user,row.session_id,now,now-HEARTBEAT_TTL,...consentArgs).run();
 if (result.meta.changes !== 1) return json({error:'Sharing requires a visible, connected page and current consent'},409);
 return json({consent_active:true,observed_at:iso(now)});
}

async function read(db,user) { return db.prepare('SELECT * FROM device_sessions WHERE user_id = ?').bind(user).first(); }
async function api(request, env, user, path) {
 if (!user) return json({error:'Sign in with ChatGPT required'},401);
 if (request.method !== 'POST') return json({error:'POST required'},405);
 if (request.headers.get('Origin') !== new URL(request.url).origin || request.headers.get('Content-Type')?.split(';')[0] !== 'application/json') return json({error:'Same-origin JSON required'},403);
 const now=Date.now(), db=env.DB;
 await db.prepare('DELETE FROM device_sessions WHERE expires_at <= ?').bind(now).run();
 const observationAction = /^\/api\/device\/observation\/(share|refresh|revoke)$/.exec(path)?.[1];
 let body; try {body=observationAction ? await readObservationBody(request) : await request.json();} catch{return json({error:'Invalid JSON'},400);}
 if (!body || typeof body !== 'object') return json({error:'Invalid body'},400);
 const row=await read(db,user);
 if(path === '/api/device/enroll') {
  if(row && now-row.created_at<10000) return json({error:'Wait ten seconds before starting another pairing'},429);
  const token=secret(), id=crypto.randomUUID();
  const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0');
  await db.prepare('INSERT INTO device_sessions (user_id,session_id,token_hash,code_hash,created_at,expires_at,pair_expires_at,attempts,paired) VALUES (?,?,?,?,?,?,?,0,0) ON CONFLICT(user_id) DO UPDATE SET session_id=excluded.session_id,token_hash=excluded.token_hash,code_hash=excluded.code_hash,created_at=excluded.created_at,expires_at=excluded.expires_at,pair_expires_at=excluded.pair_expires_at,attempts=0,paired=0,last_seen=NULL,device_time=NULL,nonce=NULL,platform=NULL,visibility=NULL,share_id=NULL,observation=NULL,observation_received_at=NULL').bind(user,id,await hash(token),await hash(code),now,now+TTL,now+PAIR_TTL).run();
  return json({token,code,pair_expires_at:iso(now+PAIR_TTL),expires_at:iso(now+TTL)});
 }
 const token=request.headers.get('Authorization')?.replace(/^Bearer /,'');
 if(!row || !token || await hash(token)!==row.token_hash || row.expires_at<=now) return json({error:'Session expired or revoked. Pair again.'},401);
 if(observationAction) return writeObservation(db,row,user,observationAction,body,new URL(request.url).origin,now);
 if(path === '/api/device/disconnect') {
  await db.prepare('DELETE FROM device_sessions WHERE user_id = ? AND session_id = ?').bind(user,row.session_id).run();
  return json({paired:false,online:false});
 }
 if(path === '/api/device/confirm') {
  if(row.paired || row.pair_expires_at<=now || row.attempts>=5) return json({error:'Pairing code expired or locked. Start again.'},403);
  const match=typeof body.code==='string' && /^\d{6}$/.test(body.code) && await hash(body.code)===row.code_hash && body.confirm===true;
  const result=await db.prepare('UPDATE device_sessions SET attempts=attempts+1,paired=?,code_hash=CASE WHEN ?=1 THEN NULL ELSE code_hash END WHERE user_id=? AND session_id=? AND attempts<5 AND paired=0 AND pair_expires_at>?').bind(match?1:0,match?1:0,user,row.session_id,now).run();
  if(!match || result.meta.changes!==1) return json({error:'Pairing not confirmed'},403);
  return json({paired:true,online:false});
 }
 if(path === '/api/device/heartbeat') {
  if(!row.paired) return json({error:'Confirm pairing first'},403);
  if(!['visible','hidden'].includes(body.visibility)||!['Android','iOS','Windows','macOS','Linux','Other'].includes(body.platform)||typeof body.device_time!=='string'||!Number.isFinite(Date.parse(body.device_time))||typeof body.nonce!=='string'||! /^[0-9a-f-]{36}$/.test(body.nonce)) return json({error:'Invalid heartbeat'},400);
  const result=await db.prepare('UPDATE device_sessions SET last_seen=?,device_time=?,nonce=?,platform=?,visibility=?,observation=CASE WHEN ?=1 THEN NULL ELSE observation END,observation_received_at=CASE WHEN ?=1 THEN NULL ELSE observation_received_at END WHERE user_id=? AND session_id=? AND paired=1 AND expires_at>?').bind(now,new Date(body.device_time).toISOString(),body.nonce,body.platform,body.visibility,Number(body.visibility==='hidden'),Number(body.visibility==='hidden'),user,row.session_id,now).run();
  if(result.meta.changes!==1) return json({error:'Session revoked'},401);
  return json(status(await read(db,user),now));
 }
 return json({error:'Not found'},404);
}
const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${pageTitle}</title><style>
:root{color-scheme:dark;font:17px/1.5 system-ui;background:#101816;color:#edf5ef}*{box-sizing:border-box}body{margin:0;padding:28px 20px}main{max-width:520px;margin:5vh auto}small{color:#a9bdb1;letter-spacing:.12em}h1{font-size:36px;line-height:1.15;margin:16px 0}p{color:#bdcec4}section{padding:22px;border:1px solid #385247;border-radius:18px;margin:24px 0;background:#17251e}button,input{width:100%;font:inherit;border-radius:10px;padding:14px;margin:8px 0}button{border:0;background:#b8edcc;color:#10251a;font-weight:700;cursor:pointer}button:disabled{opacity:.4;cursor:default}input{background:#101816;color:white;border:1px solid #799a88}#disconnect{background:#f4b9a8;color:#341b13}#code{font-size:36px;letter-spacing:.2em;color:#b8edcc}#state{font-size:24px;font-weight:700}pre{font-size:13px;white-space:pre-wrap;overflow-wrap:anywhere;color:#b8cdbf}a{color:#b8edcc}[hidden]{display:none!important}</style></head><body><main><small>JIT MCP / E4</small><h1>This browser.<br>Your conversation.</h1><p>Pair this page to let your private JIT MCP plugin read its connection status. Keep it visible for live heartbeats.</p><section><div id="state" role="status" aria-live="polite">Not paired</div><p id="message">A session lasts 10 minutes. Nothing starts until you confirm.</p><button id="start">Start pairing</button><div id="pair" hidden><p>Your one-time code · valid for 2 minutes</p><div id="code"></div><label for="entered">Re-enter the code to confirm this browser</label><input id="entered" inputmode="numeric" autocomplete="off" maxlength="6" pattern="[0-9]{6}"><button id="confirm">Confirm pairing</button></div><button id="disconnect" disabled>Disconnect</button><pre id="details"></pre></section><section aria-labelledby="observation-heading"><h2 id="observation-heading">Page observation</h2>
<p>Sharing is off by default. Each snapshot includes this page’s address and title, visibility, the demo counter, timestamps and a nonce. Snapshots expire after 45 seconds.</p>
<p>Demo counter <output id="demo-counter">0</output></p>
<button id="increment">Change demo counter</button>
<button id="share" disabled>Share this page state</button>
<button id="refresh" disabled>Refresh shared snapshot</button>
<button id="revoke" disabled>Stop sharing</button>
<p id="sharing-state" role="status">Sharing off · pair to enable.</p></section><p>Hiding this page makes it stale. Closing it makes it offline within 45 seconds of its last heartbeat. Reloading requires pairing again.</p><a href="/">JIT MCP</a></main><script src="/device.js"></script></body></html>`;
const client = `function nonce(){const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,v=>v.toString(16).padStart(2,'0')).join('');return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20)}\nconst el=id=>document.getElementById(id);let token=null,paired=false,timer=null,busy=false;
let shareId=null, sharingBusy=false, hiddenPending=false;
const platform=/Android/i.test(navigator.userAgent)?'Android':/iPhone|iPad/i.test(navigator.userAgent)?'iOS':/Windows/i.test(navigator.userAgent)?'Windows':/Macintosh/i.test(navigator.userAgent)?'macOS':/Linux/i.test(navigator.userAgent)?'Linux':'Other';
async function call(action,body={}){const r=await fetch('/api/device/'+action,{method:'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(body),cache:'no-store',keepalive:action==='heartbeat'});const data=await r.json();if(!r.ok){if(r.status===401){clearInterval(timer);paired=false;token=null;el('start').disabled=false;el('disconnect').disabled=true;resetSharing();}throw Error(data.error||'Request failed')}return data}
function error(e){el('state').textContent='Not connected';el('message').textContent=e.message}
async function beat(){if(!paired||busy)return;busy=true;const visibility=hiddenPending?'hidden':document.visibilityState;hiddenPending=false;try{const d=await call('heartbeat',{visibility,platform,device_time:new Date().toISOString(),nonce:nonce()});el('state').textContent=d.online?'Connected':d.state;el('message').textContent='Session expires '+new Date(d.expires_at).toLocaleTimeString();el('details').textContent=JSON.stringify(d,null,2)}catch(e){error(e)}finally{busy=false;if(hiddenPending)void beat();}}
el('start').onclick=async()=>{el('start').disabled=true;try{const d=await call('enroll');token=d.token;el('code').textContent=d.code;el('pair').hidden=false;el('entered').value='';el('disconnect').disabled=false;el('state').textContent='Awaiting confirmation';el('message').textContent='Confirm only if you want this browser paired. Starting again replaces your previous session.'}catch(e){error(e);el('start').disabled=false}};
el('confirm').onclick=async()=>{el('confirm').disabled=true;try{await call('confirm',{code:el('entered').value,confirm:true});paired=true;el('pair').hidden=true;el('code').textContent='';el('entered').value='';await beat();renderSharing();timer=setInterval(()=>{if(document.visibilityState==='visible')beat()},20000)}catch(e){error(e)}finally{el('confirm').disabled=false}};
el('disconnect').onclick=async()=>{try{await call('disconnect');clearInterval(timer);paired=false;token=null;resetSharing();el('pair').hidden=true;el('details').textContent='';el('state').textContent='Disconnected';el('message').textContent='Session revoked. The plugin will report no paired browser.';el('start').disabled=false;el('disconnect').disabled=true}catch(e){error(e)}};
function renderSharing(message) {
 const visible = document.visibilityState === 'visible';
 el('share').disabled = !paired || !!shareId || sharingBusy || !visible;
 el('refresh').disabled = !paired || !shareId || sharingBusy || !visible;
 el('revoke').disabled = !paired || !shareId || sharingBusy;
 if (message) el('sharing-state').textContent = message;
}
function resetSharing() {
 shareId = null;
 renderSharing('Sharing off · pair to enable.');
}
async function snapshot(action) {
 if (!paired || sharingBusy || document.visibilityState !== 'visible') return;
 const enrollment = token;
 if (action === 'share') shareId = nonce();
 if (!shareId) return;
 sharingBusy = true;
 renderSharing();
 try {
  const result = await call('observation/'+action, {
   share_id: shareId, origin: location.origin, path: location.pathname,
   title: document.title, visibility: document.visibilityState,
   device_time: new Date().toISOString(), nonce: nonce(),
   demo_counter: Number(el('demo-counter').textContent)
  });
  if (token === enrollment) renderSharing('Shared at '+new Date(result.observed_at).toLocaleTimeString()+'. Refresh after a change.');
 } catch (e) {
  if (token === enrollment) renderSharing(e.message+' · Stop sharing to reset.');
 } finally {
  sharingBusy = false;
  renderSharing();
 }
}
el('increment').onclick = () => {
 el('demo-counter').textContent = (Number(el('demo-counter').textContent)+1)%1000;
 if (shareId) renderSharing('Counter changed locally. Refresh to share the new value.');
};
el('share').onclick = () => snapshot('share');
el('refresh').onclick = () => snapshot('refresh');
el('revoke').onclick = async () => {
 if (!shareId || sharingBusy) return;
 sharingBusy = true;
 renderSharing();
 try {
  await call('observation/revoke',{share_id:shareId});
  shareId = null;
  renderSharing('Sharing off. The shared snapshot was cleared.');
 } catch(e) {
  if (shareId) renderSharing('Stop sharing was not confirmed. '+e.message);
 } finally {
  sharingBusy = false;
  renderSharing();
 }
};
document.addEventListener('visibilitychange',() => {
 if (document.visibilityState === 'hidden' && paired) {
  hiddenPending = true;
  if (shareId) renderSharing('Page hidden. Refresh the snapshot when visible again.');
 } else renderSharing();
 void beat();
});window.addEventListener('online',beat);window.addEventListener('offline',()=>{el('state').textContent='Offline';el('message').textContent='Network unavailable. Server heartbeat expires after 45 seconds.'});`;
export default {async fetch(request,env) {
 const path=new URL(request.url).pathname,user=request.headers.get('oai-authenticated-user-id');
 try {
 if(path.startsWith('/api/device/')) return await api(request,env,user,path);
 if(path==='/device' && request.method==='GET') {
  if(!user)return new Response(null,{status:302,headers:{Location:'/signin-with-chatgpt?return_to=%2Fdevice','Cache-Control':'no-store'}});
  return new Response(page,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",'Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
 }
 if(path==='/device.js') return new Response(client,{headers:{'Content-Type':'text/javascript','Cache-Control':'no-store'}});
 if(path==='/') return new Response('JIT MCP — private deterministic browser transport. Open /device to pair.\n');
 if(path!=='/mcp')return json({error:'Not found'},404);
 if(request.method!=='POST')return json({error:'POST required'},405);
 let m;try{m=await request.json()}catch{return rpc(null,{error:{code:-32700,message:'Parse error'}})}
 if(m?.jsonrpc!=='2.0'||typeof m.method!=='string')return rpc(null,{error:{code:-32600,message:'Invalid request'}});
 if(m.id===undefined)return new Response(null,{status:202});
 const {id,method,params}=m;
 if(method==='server/discover')return rpc(id,{result:{supportedVersions:[protocolVersion],capabilities:{tools:{}}}});
 if(method==='initialize')return rpc(id,{result:{protocolVersion:[protocolVersion,'2025-11-25','2025-06-18','2025-03-26'].includes(params?.protocolVersion)?params.protocolVersion:protocolVersion,capabilities:{tools:{}},serverInfo:{name:'jit-mcp',version:'1.1.0'}}});
 if(method==='tools/list')return rpc(id,{result:{tools}});
 if(method==='tools/call') {
  if(!tools.some(t=>t.name===params?.name))return rpc(id,{error:{code:-32602,message:'Unknown tool'}});
  const args=params.arguments;if(args!==undefined&&(!args||typeof args!=='object'||Array.isArray(args)||Object.keys(args).length))return rpc(id,{error:{code:-32602,message:'Tool takes no arguments'}});
  if(params.name!=='integration_ping'&&!user)return rpc(id,{result:{isError:true,content:[{type:'text',text:'Authenticated user identity required'}]}});
  const data=params.name==='integration_ping'?{timestamp:new Date().toISOString(),nonce:crypto.randomUUID(),source:'jit-mcp',connected_device:false}:
   (params.name==='browser_observe' ? browserObservation : status)(await read(env.DB,user));
  return rpc(id,{result:{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}});
 }
 return rpc(id,{error:{code:-32601,message:'Method not found'}});
 }catch{return json({error:'Transport unavailable; no device connection verified'},503)}
}};
