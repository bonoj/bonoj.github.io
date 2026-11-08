import test from "node:test";
import assert from "node:assert/strict";
import {execute,handle,signRequest} from "./index.mjs";
const secret="test-only-key";
const nonce="nonce_abcdefghijklmnopqrstuvwxyz";
async function signed(payload,{time=Date.now(),n=nonce,key=secret,alterBody=false}={}){
  const body=JSON.stringify(payload);
  const timestamp=String(time);
  const sig=await signRequest(key,timestamp,n,body);
  return new Request("https://example.invalid",{method:"POST",headers:{"content-type":"application/json","x-jit-timestamp":timestamp,"x-jit-nonce":n,"x-jit-signature":sig},body:alterBody?body+" ":body});
}
async function check(res,expected){assert.equal(res.status,expected);return res.json();}
test("capabilities",()=>{const r=execute({operation:"capabilities"});assert.equal(r.status,200);assert.equal(r.data.capabilities[0].name,"echo_text_v1");});
test("bounded echo",()=>{assert.equal(execute({operation:"invoke",capability:"echo_text_v1",input:{text:"ok"}}).data.data.text,"ok");assert.equal(execute({operation:"invoke",capability:"echo_text_v1",input:{text:"x".repeat(257)}}).status,400);});
test("default deny",()=>{for(const x of [null,[],{}, {operation:"invoke",capability:"exec",input:{text:"x"}},{operation:"capabilities",extra:1},{operation:"invoke",capability:"echo_text_v1",input:{text:"ok",extra:1}}])assert.equal(execute(x).status,400);});
test("unconfigured fail closed",async()=>{const q=await signed({operation:"capabilities"});await check(await handle(q,secret),503);await check(await handle(await signed({operation:"capabilities"}),undefined,async()=>true),503);});
test("valid signed request",async()=>{const r=await handle(await signed({operation:"invoke",capability:"echo_text_v1",input:{text:"hello"}}),secret,async()=>true);const data=await check(r,200);assert.equal(data.data.text,"hello");});
test("wrong signature or changed body",async()=>{await check(await handle(await signed({operation:"capabilities"},{key:"wrong"}),secret,async()=>true),401);await check(await handle(await signed({operation:"capabilities"},{alterBody:true}),secret,async()=>true),401);});
test("stale and malformed request",async()=>{await check(await handle(await signed({operation:"capabilities"},{time:Date.now()-120000}),secret,async()=>true),401);const q=await signed({operation:"capabilities"});q.headers.set("x-jit-nonce","short");await check(await handle(q,secret,async()=>true),401);});
test("replay rejected",async()=>{const seen=new Set();const admit=async n=>{if(seen.has(n))return false;seen.add(n);return true;};await check(await handle(await signed({operation:"capabilities"}),secret,admit),200);await check(await handle(await signed({operation:"capabilities"}),secret,admit),429);});
test("admission failure closed",async()=>{await check(await handle(await signed({operation:"capabilities"}),secret,async()=>{throw Error("db unavailable");}),503);});
test("size limit",async()=>{await check(await handle(await signed({operation:"invoke",capability:"echo_text_v1",input:{text:"x".repeat(3000)}}),secret,async()=>true),413);});
