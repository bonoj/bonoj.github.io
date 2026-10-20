import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('./channels.json',import.meta.url),'utf8'));
assert.equal(manifest.channels.length,53);
assert.equal(manifest.channels.filter(c=>c.disposition==='ACTIVE').length,10);
assert(manifest.channels.every(c=>['ACTIVE','DEFERRED','REMOVE_CANDIDATE'].includes(c.disposition)));
const cases=[
  {id:'weather',url:'https://api.open-meteo.com/v1/forecast?latitude=51&longitude=0&current=temperature_2m,wind_gusts_10m,precipitation&timezone=GMT',fields:['temperature_2m','wind_gusts_10m','precipitation']},
  {id:'marine',url:'https://marine-api.open-meteo.com/v1/marine?latitude=3&longitude=-2&current=wave_height&timezone=GMT',fields:['wave_height']},
  {id:'air',url:'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51&longitude=0&current=pm2_5,nitrogen_dioxide&timezone=GMT',fields:['pm2_5','nitrogen_dioxide']},
  {id:'iss',url:'https://api.wheretheiss.at/v1/satellites/25544',fields:['latitude','longitude','altitude']},
  {id:'eonet',url:'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=10',fields:['events']},
  {id:'nws',url:'https://api.weather.gov/alerts/active',fields:['features']}
];
let failures=0;
for(const c of cases){
 try{
  const res=await fetch(c.url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'Lattice-source-probe (https://github.com/bonoj/bonoj.github.io)','Accept':'application/geo+json, application/json'}});
  assert(res.ok,`HTTP ${res.status}`);
  const body=await res.json(), root=body.current??body;
  for(const field of c.fields)assert(root[field]!==undefined&&root[field]!==null,`missing ${field}`);
  console.log('PASS',c.id,res.status,c.fields.join(','));
 }catch(e){failures++;console.error('FAIL',c.id,e.message)}
}

const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const match=html.match(/const latticeSampleGroups=(\[[^;]+\]);/);
assert(match,'Runtime sample-group registry missing');
const groups=JSON.parse(match[1]);
assert.equal(groups.length,15);
const byId=new Map(manifest.channels.map(c=>[c.id,c]));
for(const g of groups){
 for(const id of g.channelIds){
  const c=byId.get(id);
  assert(c,`Unknown channel ${id}`);
  assert.equal(c.adapter,g.adapter,`Adapter mismatch ${id}`);
  assert(g.fields.includes(c.field),`Missing mapped field ${id} / ${c.field}`);
 }
 const base=g.adapter==='weather'?'https://api.open-meteo.com/v1/forecast':g.adapter==='marine'?'https://marine-api.open-meteo.com/v1/marine':'https://air-quality-api.open-meteo.com/v1/air-quality';
 const url=base+'?latitude='+g.sample[0]+'&longitude='+g.sample[1]+'&current='+g.fields.join(',')+'&timezone=GMT';
 try{
  const res=await fetch(url,{signal:AbortSignal.timeout(15000)});
  if(!res.ok)throw Error(`HTTP ${res.status}: ${(await res.text()).slice(0,160)}`);
  const data=await res.json();
  assert(data.current&&typeof data.current==='object','Missing current');
  for(const field of g.fields)assert(typeof data.current[field]==='number'&&Number.isFinite(data.current[field]),`Missing numeric ${field}`);
  console.log('PASS',g.id,g.channelIds.join(','),g.sample.join(','));
 }catch(e){failures++;console.error('FAIL',g.id,g.channelIds.join(','),e.message)}
}
console.log('Lattice sample-group audit:',groups.length,'groups,',groups.reduce((n,g)=>n+g.channelIds.length,0),'channel mappings;',failures,'failed checks');
if(failures)process.exitCode=1;

