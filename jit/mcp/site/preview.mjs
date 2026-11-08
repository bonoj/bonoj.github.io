// Local QA only. Never bundled by build.mjs. A synthetic QA identity is used;
// the browser observations themselves come from the real preview browser.
import {createServer} from 'node:http';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import worker from './worker.mjs';
const sqlite=new DatabaseSync(':memory:');sqlite.exec(readFileSync(new URL('./drizzle/0000_device_sessions.sql',import.meta.url),'utf8'));
sqlite.exec(readFileSync(new URL('./drizzle/0001_browser_observation.sql',import.meta.url),'utf8'));
sqlite.exec(readFileSync(new URL('./drizzle/0002_permanent_interface.sql',import.meta.url),'utf8'));
sqlite.exec(readFileSync(new URL('./drizzle/0003_gateway_setup.sql',import.meta.url),'utf8'));
const DB={prepare(q){return {bind(...args){return {async first(){return sqlite.prepare(q).get(...args)||null},async run(){return {meta:{changes:sqlite.prepare(q).run(...args).changes}}}}}}}};
createServer(async(req,res)=>{try{const chunks=[];for await(const c of req)chunks.push(c);const headers=new Headers(req.headers);headers.set('oai-authenticated-user-id','local-browser-qa');const origin=req.headers.origin||'http://'+req.headers.host;const r=await worker.fetch(new Request(origin+req.url,{method:req.method,headers,...(chunks.length?{body:Buffer.concat(chunks)}:{})}),{DB});res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));}catch(e){res.writeHead(500);res.end(String(e))}}).listen(Number(process.env.PORT||process.argv[process.argv.indexOf('--port')+1]||3000),'0.0.0.0',()=>console.log('Local browser QA ready'));
