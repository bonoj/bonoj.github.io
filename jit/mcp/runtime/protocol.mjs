// E8 wire validators. Keep the Site copy in sync; application fields are opaque.
const e8Ops = new Set(['observe','extract','scroll','click','fill','navigate','back','forward','submit']);
const e8Action = value => e8Ops.has(value) && value!=='observe' && value!=='extract';
const e8Id = value => typeof value==='string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);
const e8Object = value => value !== null && typeof value==='object' && !Array.isArray(value);
const e8Exact = (value, keys) => e8Object(value) && Object.keys(value).length===keys.length &&
 keys.every(key=>Object.hasOwn(value,key));
function e8Payload(value) {
 if (!e8Object(value)) return false;
 let nodes=0;
 function visit(item,depth) {
  if (++nodes>128 || depth>6) return false;
  if (item===null || typeof item==='boolean') return true;
  if (typeof item==='number') return Number.isFinite(item) && Math.abs(item)<=Number.MAX_SAFE_INTEGER;
  if (typeof item==='string') return item.length<=1024;
  if (Array.isArray(item)) return item.length<=24 && item.every(child=>visit(child,depth+1));
  return e8Object(item) && Object.keys(item).length<=24 && Object.entries(item).every(([key,child])=>
   /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(key) &&
   !/^(?:constructor|prototype|password|passcode|secret|token|cookie|authorization|script|html)$/i.test(key) &&
   visit(child,depth+1));
 }
 return visit(value,0) && new TextEncoder().encode(JSON.stringify(value)).length<=2048;
}
function e8Command(value) {
 return e8Exact(value,['protocol_version','operation','schema_version','expected_revision','payload']) &&
  value.protocol_version===1 && e8Ops.has(value.operation) && Number.isInteger(value.schema_version) &&
  value.schema_version>=1 && value.schema_version<=255 && e8Payload(value.payload) &&
  (e8Action(value.operation)?e8Id(value.expected_revision):value.expected_revision===null || e8Id(value.expected_revision));
}
function e8Result(value) {
 if (!e8Exact(value,['protocol_version','kind','schema_version','origin','observed_at','nonce','runtime_version','revision','payload'])) return false;
 let origin;
 try {origin=new URL(value.origin);} catch {return false;}
 return value.protocol_version===1 && ['browser.observation','browser.action'].includes(value.kind) &&
  Number.isInteger(value.schema_version) && value.schema_version>=1 && value.schema_version<=255 &&
  typeof value.origin==='string' && value.origin.length<=253 && origin.origin===value.origin &&
  origin.protocol==='https:' && !origin.port && /^(?:[a-z0-9-]+\.)+[a-z]{2,63}$/.test(origin.hostname) &&
  !/\.(?:local|internal|localhost|test|invalid|onion)$/.test(origin.hostname) &&
  typeof value.observed_at==='string' && Number.isFinite(Date.parse(value.observed_at)) &&
  e8Id(value.nonce) && e8Id(value.revision) && Number.isSafeInteger(value.runtime_version) &&
  value.runtime_version>=4 && e8Payload(value.payload);
}
export {e8Command,e8Result,e8Payload};
