// This release includes only a DOM observer. No storage, form values or native bridge.
export const observationScript = `(function () {
 "use strict";
 if (document.readyState !== "complete" || location.protocol !== "https:") return {error:"document_unavailable"};
 const text = Array.from(document.querySelectorAll("h1,h2,main p,article p,body > p"))
   .filter(el => el.getClientRects().length && getComputedStyle(el).visibility === "visible")
   .slice(0,12).map(el => el.innerText).join(" ").replace(/\\s+/g," ").trim().slice(0,360);
 return {origin:location.origin,title:document.title.slice(0,160),text};
})()`;
const version = 2;
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
export async function runtimeRelease(secret) {
 const sha256=hex(await crypto.subtle.digest('SHA-256',encoder.encode(observationScript)));
 const manifest=encoder.encode('jit-dom-v1\n'+version+'\n1\n'+sha256+'\n');
 return {version,min_host:1,sha256,script:observationScript,
  signature:b64(new Uint8Array(await crypto.subtle.sign('Ed25519',await signingKey(secret),manifest)))};
}
