import test from "node:test";
import assert from "node:assert/strict";
import {execute,handle} from "./index.mjs";
const secret="unit-test-secret";
function req(data,headers={},method="POST"){return new Request("https://example.invalid",{method,headers:{"content-type":"application/json","authorization":`Bearer ${secret}`,...headers},...(method==="POST"?{body:typeof data==="string"?data:JSON.stringify(data)}:{})});}
async function status(r,s){assert.equal(r.status,s);return r.json();}
test("capabilities",()=>{const r=execute({operation:"capabilities"});assert.equal(r.status,200);assert.equal(r.data.capabilities[0].name,"echo_text_v1");});
test("bounded echo",()=>{assert.equal(execute({operation:"invoke",capability:"echo_text_v1",input:{text:"ok"}}).data.data.text,"ok");assert.equal(execute({operation:"invoke",capability:"echo_text_v1",input:{text:"x".repeat(257)}}).status,400);});
test("default deny",()=>{for(const x of [null,[],{}, {operation:"invoke",capability:"exec",input:{text:"x"}},{operation:"capabilities",extra:1},{operation:"invoke",capability:"echo_text_v1",input:{text:"ok",extra:1}}])assert.equal(execute(x).status,400);});
test("authentication fail closed",async()=>{await status(await handle(req({operation:"capabilities"}),undefined),503);await status(await handle(req({operation:"capabilities"},{authorization:"Bearer wrong"}),secret),401);await status(await handle(req({operation:"capabilities"},{authorization:""}),secret),401);});
test("method/content-type/json/size",async()=>{await status(await handle(req(undefined,{},"GET"),secret),405);await status(await handle(req("{}",
{"content-type":"text/plain"}),secret),415);await status(await handle(req("bad-json"),secret),400);await status(await handle(req("x".repeat(2100)),secret),413);});
test("authenticated discovery and invocation",async()=>{const a=await status(await handle(req({operation:"capabilities"}),secret),200);assert.equal(a.revision,1);const b=await status(await handle(req({operation:"invoke",capability:"echo_text_v1",input:{text:"hello"}}),secret),200);assert.equal(b.data.text,"hello");});
