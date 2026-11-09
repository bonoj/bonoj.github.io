// This release includes only a DOM observer. No storage, form values or native bridge.
export const observationScript = "(function () {\n \"use strict\";\n if (document.readyState !== \"complete\" || location.protocol !== \"https:\") return {error:\"document_unavailable\"};\n const visible = el => el.getClientRects().length && getComputedStyle(el).visibility === \"visible\";\n const text = Array.from(document.querySelectorAll(\"h1,h2,main p,article p,body > p\"))\n   .filter(visible).slice(0,12).map(el => el.innerText).join(\" \").replace(/\\s+/g,\" \").trim().slice(0,360);\n const links = [];\n for (const el of document.querySelectorAll(\"a[href]\")) {\n   if (links.length >= 5) break;\n   if (!visible(el)) continue;\n   const label = (el.innerText || el.getAttribute(\"aria-label\") || \"\").replace(/\\s+/g,\" \").trim().slice(0,60);\n   const href = el.href;\n   if (!label || href.length>160 || !/^https?:\\/\\//i.test(href)) continue;\n   links.push({text:label,href});\n }\n return {origin:location.origin,title:document.title.slice(0,160),text,links};\n})()";
const baselineScript = "(function (command) {\n \"use strict\";\n if (document.readyState!==\"complete\" || location.protocol!==\"https:\") return {error:\"document_unavailable\"};\n const visible = element => element.getClientRects().length && getComputedStyle(element).visibility===\"visible\";\n const clean = (s,n) => String(s||\"\").replace(/\\s+/g,\" \").trim().slice(0,n);\n const title = clean(document.title,160);\n const blocks = Array.from(document.querySelectorAll(\"h1,h2,main p,article p,body > p\")).filter(visible).slice(0,400);\n const text = clean(blocks.slice(0,12).map(e=>e.innerText).join(\" \"),360);\n const links = Array.from(document.querySelectorAll(\"a[href]\")).slice(0,400).filter(visible).flatMap(element=>{\n  try {\n   const url = new URL(element.href);\n   if (![\"http:\",\"https:\"].includes(url.protocol) || url.username || url.password || !url.hostname) return [];\n   url.search=\"\"; url.hash=\"\";\n   const label=clean(element.innerText || element.getAttribute(\"aria-label\"),60);\n   return label && url.href.length<=160 ? [{text:label,href:url.href}] : [];\n  } catch {return [];}\n });\n const common={origin:location.origin,title,text,links:links.slice(0,5)};\n if (!command) return common;\n if (command.schema_version!==1) return {error:\"unsupported_operation\"};\n if (command.operation===\"observe\") return {...common,kind:\"browser.observation\",schema_version:1,payload:{title,text,links:links.slice(0,3)}};\n if (command.operation===\"extract\") {\n  const p=command.payload;\n  if (!p || ![\"links\",\"content\"].includes(p.collection) || !Number.isInteger(p.limit) || p.limit<1 || p.limit>5 ||\n      (p.cursor!==null && (!Number.isInteger(p.cursor) || p.cursor<0 || p.cursor>400))) return {error:\"observation_rejected\"};\n  const items=p.collection===\"links\"?links:blocks.map(element=>({text:clean(element.innerText,160)}));\n  const start=p.cursor||0, end=start+p.limit;\n  return {...common,kind:\"browser.observation\",schema_version:1,payload:{\n   collection:p.collection,items:items.slice(start,end),next_cursor:end<items.length?end:null}};\n }\n return {error:\"unsupported_operation\"};\n})\n";
const encoder = new TextEncoder();
const b64 = bytes=>btoa(String.fromCharCode(...bytes));
const hex = bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
export async function signingKey(secret) {
 const root=await crypto.subtle.importKey('raw',encoder.encode(secret),'HKDF',false,['deriveBits']);
 const seed=new Uint8Array(await crypto.subtle.deriveBits({
  name:'HKDF',hash:'SHA-256',salt:encoder.encode('jit-mcp-e6'),info:encoder.encode('android-runtime-ed25519-v1')
 },root,256));
 const prefix=Uint8Array.from([0x30,0x2e,0x02,0x01,0x00,0x30,0x05,0x06,0x03,0x2b,0x65,0x70,0x04,0x22,0x04,0x20]);
 const pkcs8=new Uint8Array(prefix.length+seed.length);
 pkcs8.set(prefix);pkcs8.set(seed,prefix.length);
 return crypto.subtle.importKey('pkcs8',pkcs8,'Ed25519',true,['sign']);
}
export async function publicKey(secret) {
 return (await crypto.subtle.exportKey('jwk',await signingKey(secret))).x;
}
export async function runtimeRelease(secret, hostProtocol=0, approved=null) {
 let version=hostProtocol===1?4:3;
 let script=hostProtocol===1?baselineScript:observationScript;
 if (hostProtocol===1 && approved && Number.isSafeInteger(approved.version) &&
     approved.version>=5 && approved.version<=65535 && /^[0-9a-f]{64}$/.test(approved.sha256)) {
  const response=await fetch('https://bonoj.github.io/jit/mcp/runtime/releases/v'+approved.version+'.js',
   {redirect:'error',signal:AbortSignal.timeout(4000)});
  if (!response.ok) throw Error('release_unavailable');
  const reader=response.body.getReader();
  const chunks=[];
  let size=0;
  while (true) {
   const {done,value}=await reader.read();
   if (done) break;
   size+=value.byteLength;
   if (size>4096) {await reader.cancel();throw Error('release_too_large');}
   chunks.push(value);
  }
  const bytes=new Uint8Array(size);
  let offset=0;
  for (const chunk of chunks) {bytes.set(chunk,offset);offset+=chunk.byteLength;}
  if (hex(await crypto.subtle.digest('SHA-256',bytes))!==approved.sha256) throw Error('release_digest_mismatch');
  script=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);
  version=approved.version;
 }
 const sha256=hex(await crypto.subtle.digest('SHA-256',encoder.encode(script)));
 const manifest=encoder.encode('jit-dom-v1\n'+version+'\n1\n'+sha256+'\n');
 return {version,min_host:1,sha256,script,
  signature:b64(new Uint8Array(await crypto.subtle.sign('Ed25519',await signingKey(secret),manifest)))};
}
