import {e8Command,e8Result} from './protocol.mjs';
const project = 'https://iqglyokmcobegledbfcm.supabase.co';
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const versioned = [
 {name:'browser_command_v1', action:'enqueue_v2', input_kind:'browser_envelope', output_kind:'command', description:'Queue a bounded browser operation for the foreground device'},
 {name:'browser_pair_v1', action:'pair', input_kind:'empty', output_kind:'pairing', description:'Create a one-time enrollment code for the Android companion'},
 {name:'browser_observe_v1', action:'enqueue', input_kind:'empty', output_kind:'command', description:'Queue a DOM observation on the foreground companion'},
 {name:'browser_result_v1', action:'result', input_kind:'command_ref', output_kind:'command', description:'Read a completed DOM observation or its pending status'},
];
export const browserCapabilities = versioned.map(({action,...entry})=>({...entry,revision:1,read_only:true}));
const fields = (value,keys) => value && typeof value==='object' && !Array.isArray(value) &&
 Object.keys(value).length===keys.length && keys.every(key=>Object.hasOwn(value,key));
const safeOrigin = value => {
 try {
  const url = new URL(value);
  return url.origin===value && url.protocol==='https:' && url.port==='' &&
   /^(?:[a-z0-9-]+\.)+[a-z]{2,63}$/.test(url.hostname) &&
   !/\.(?:local|internal|localhost|test|invalid|onion)$/.test(url.hostname);
 } catch { return false; }
};
async function hash(value) {
 return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');
}
async function callDb(key,action,owner,verifier,data) {
 const response = await fetch(project+'/rest/v1/rpc/jit_browser_transport_v1',{
  method:'POST',redirect:'error',
  headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json'},
  body:JSON.stringify({p_action:action,p_owner:owner,p_token:verifier,p_data:data})
 });
 if (!response.ok) return {error:'transport_unavailable'};
 return await response.json();
}
export function validDeviceBody(body) {
 if (!body || typeof body!=='object') return false;
 switch(body.operation) {
  case 'enroll': return fields(body,['operation','pairing_code']) && typeof body.pairing_code==='string' && /^[0-9a-f]{32}$/.test(body.pairing_code);
  case 'runtime': return fields(body,['operation']) || (fields(body,['operation','host_protocol']) && body.host_protocol===1);
  case 'start': return (fields(body,['operation','origin']) || (fields(body,['operation','origin','host_protocol']) && body.host_protocol===1)) && typeof body.origin==='string' && safeOrigin(body.origin);
  case 'claim': case 'stop': return fields(body,['operation','session_id']) && typeof body.session_id==='string' && uuid.test(body.session_id);
  case 'complete': {
   if (!fields(body,['operation','session_id','command_id','result']) ||
    typeof body.session_id!=='string'||!uuid.test(body.session_id)||
    typeof body.command_id!=='string'||!uuid.test(body.command_id)) return false;
   const result = body.result;
   if (e8Result(result)) return Math.abs(Date.now()-Date.parse(result.observed_at))<15000;
   if (!result || typeof result!=='object') return false;
   if (fields(result,['error'])) return ['document_unavailable','invalid_runtime_result','observation_rejected','execution_timeout','unsupported_operation','stale_observation','confirmation_required','user_denied','payload_too_large'].includes(result.error);
   const hasLinks=Object.hasOwn(result,'links');
   if (hasLinks && (!Array.isArray(result.links) || result.links.length>5 ||
      !result.links.every(link=>fields(link,['text','href']) && typeof link.text==='string' &&
        link.text.length>0 && link.text.length<=60 && typeof link.href==='string' && link.href.length<=160 &&
        (()=>{try{const u=new URL(link.href);return ['http:','https:'].includes(u.protocol)&&!!u.hostname&&!u.username&&!u.password;}catch{return false;}})()))) return false;
   return fields(result,hasLinks?['origin','title','text','observed_at','nonce','runtime_version','links']:['origin','title','text','observed_at','nonce','runtime_version']) &&
    safeOrigin(result.origin) && typeof result.title==='string' && result.title.length<=160 &&
    typeof result.text==='string' && result.text.length<=360 &&
    typeof result.observed_at==='string' && Math.abs(Date.now()-Date.parse(result.observed_at))<15000 &&
    typeof result.nonce==='string' && uuid.test(result.nonce) &&
    Number.isSafeInteger(result.runtime_version) && result.runtime_version>=1;
  }
  default: return false;
 }
}
export async function deviceCall(request,body,key) {
 const credential=request.headers.get('x-jit-device-token');
 if (!credential || !/^[0-9a-f]{64}$/.test(credential) || !validDeviceBody(body)) return {error:'invalid_device_request'};
 const {operation,...data}=body;
 return callDb(key,operation,null,await hash(credential),data);
}
export async function browserCall(request,body,key) {
 const entry=versioned.find(item=>item.name===body.capability);
 const owner=request.headers.get('x-jit-browser-owner');
 if (!entry) return null;
 if (!owner || !uuid.test(owner)) return {error:'invalid_owner'};
 const input=body.input;
 if (entry.action==='enqueue_v2') return e8Command(input)?callDb(key,entry.action,owner,null,input):{error:'invalid_input'};
 if (entry.action==='result' ? !fields(input,['command_id']) || typeof input.command_id!=='string' || !uuid.test(input.command_id) : !fields(input,[])) return {error:'invalid_input'};
 return callDb(key,entry.action,owner,null,input);
}
