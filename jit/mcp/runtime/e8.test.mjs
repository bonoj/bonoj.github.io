import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {e8Command,e8Result,e8Payload} from './protocol.mjs';
import {handle,execute} from './index.mjs';
import {runtimeRelease,publicKey} from './runtime.mjs';
import {validDeviceBody} from './transport.mjs';

const id='00000000-0000-4000-8000-000000000001';
const command={protocol_version:1,operation:'observe',schema_version:1,expected_revision:null,payload:{}};
const result={protocol_version:1,kind:'browser.observation',schema_version:1,origin:'https://example.com',
 observed_at:new Date().toISOString(),nonce:id,runtime_version:4,revision:id,payload:{page:{headings:[{label:'🐝'}]}}};
test('bounded generic protocol',()=>{
 assert.ok(e8Command(command));assert.ok(e8Result(result));
 for(const invalid of [
  {...command,protocol_version:2},{...command,operation:'eval'},{...command,operation:'submit'},
  {...command,payload:{script:'alert(1)'}},{...command,payload:{nested:{password:'x'}}},
  {...command,payload:{text:'🐝'.repeat(512)}},{...command,payload:{items:Array(25).fill(0)}},
  {...command,payload:{a:{b:{c:{d:{e:{f:{g:1}}}}}}}},
 ]) assert.equal(e8Command(invalid),false);
 assert.ok(e8Command({...command,operation:'submit',expected_revision:id}));
 assert.equal(e8Result({...result,origin:'https://example.com@localhost'}),false);
 assert.equal(e8Result({...result,origin:'https://example.com/?q=private'}),false);
 assert.equal(e8Payload(JSON.parse('{"__proto__":{"x":1}}')),false);
});
test('legacy and generic device validation',()=>{
 const legacy={origin:'https://example.com',title:'Example Domain',text:'test',
  observed_at:result.observed_at,nonce:id,runtime_version:3,links:[{text:'Example',href:'https://example.com'}]};
 const complete={operation:'complete',session_id:id,command_id:id,result};
 assert.ok(validDeviceBody(complete));
 assert.ok(validDeviceBody({...complete,result:legacy}));
 assert.equal(validDeviceBody({...complete,result:{...legacy,links:[{text:'bad',href:'javascript:alert(1)'}]}}),false);
 assert.equal(validDeviceBody({...complete,result:{...result,observed_at:'2020-01-01T00:00:00Z'}}),false);
 assert.equal(execute({operation:'invoke',capability:'text_length_v1',input:{text:'Hello 🐝'}}).data.data.value,7);
});
test('device authorization and owner binding at RPC boundary',async()=>{
 const original=globalThis.fetch;
 let last;
 globalThis.fetch=async (_url,opts)=>{last=JSON.parse(opts.body);return Response.json({error:'unauthorized'});};
 const req=(body,headers={})=>new Request('https://test.example',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
 try{
  assert.equal((await handle(req({operation:'capabilities'}),'test','db')).status,401);
  assert.equal((await handle(req({operation:'runtime',host_protocol:1},{'x-jit-device-token':'a'.repeat(64)}),'test','db')).status,401);
  assert.equal(last.p_owner,null);assert.notEqual(last.p_token,'a'.repeat(64));
  const body={operation:'invoke',capability:'browser_command_v1',input:command};
  assert.equal((await (await handle(req(body,{'x-jit-gateway-secret':'test'}),'test','db')).json()).data.error,'invalid_owner');
  await handle(req(body,{'x-jit-gateway-secret':'test','x-jit-browser-owner':id}),'test','db');
  assert.equal(last.p_owner,id);assert.equal(last.p_action,'enqueue_v2');
 }finally{globalThis.fetch=original;}
});
test('signed v5 publication introduces structure and scroll through the unchanged command envelope',async()=>{
 const secret='fixture-only';
 const baseline=await runtimeRelease(secret,1);
 const old=await runtimeRelease(secret,0);
 assert.equal(old.version,3);assert.equal(baseline.version,4);
 const v5=await readFile(new URL('./releases/v5.js',import.meta.url));
 const sha256=Buffer.from(await crypto.subtle.digest('SHA-256',v5)).toString('hex');
 const original=globalThis.fetch;
 let release;
 try{
  globalThis.fetch=async ()=>new Response(v5);
  release=await runtimeRelease(secret,1,{version:5,sha256});
  await assert.rejects(()=>runtimeRelease(secret,1,{version:5,sha256:'0'.repeat(64)}),/release_digest_mismatch/);
 }finally{globalThis.fetch=original;}
 const pub=await crypto.subtle.importKey('jwk',{kty:'OKP',crv:'Ed25519',x:await publicKey(secret)},'Ed25519',false,['verify']);
 const manifest=new TextEncoder().encode('jit-dom-v1\n5\n1\n'+sha256+'\n');
 assert.ok(await crypto.subtle.verify('Ed25519',pub,Buffer.from(release.signature,'base64'),manifest));
 assert.equal(await crypto.subtle.verify('Ed25519',pub,Buffer.from(release.signature,'base64'),new TextEncoder().encode('downgrade')),false);
 const heading={innerText:'Example Domain',tagName:'H1',getClientRects:()=>[1]};
 const context={document:{readyState:'complete',title:'Example Domain',querySelectorAll:q=>q.startsWith('h1')?[heading]:[]},
  location:{protocol:'https:',origin:'https://example.com'},getComputedStyle:()=>({visibility:'visible'}),
  window:{scrollY:0,scrollBy(o){this.scrollY+=o.top;}}};
 const before=vm.runInNewContext(baseline.script,context);
 const after=vm.runInNewContext(release.script,context);
 assert.equal(before({...command,operation:'scroll',payload:{delta:50}}).error,'unsupported_operation');
 assert.equal(after(command).payload.outline.headings[0].label,'Example Domain');
 assert.equal(after({...command,operation:'scroll',payload:{delta:50}}).payload.scroll.after,50);
});
