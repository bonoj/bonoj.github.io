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
assert(!html.includes('if(!ids.includes(\'iss\'))ids.push(\'iss\')'),'Do not poll ISS outside the selected view');
assert(html.includes('wake=setTimeout(drain,'),'Governor must wake a host-throttled queue');
assert(!html.includes('for(const r of regions)for(const id of r.channels)enqueue(id,r)'),'Do not fan out all continents in background batch');
const match=html.match(/const latticeSampleGroups=(\[[^;]+\]);/);
assert(match,'Runtime sample-group registry missing');
const groups=JSON.parse(match[1]);
const activeMatch=html.match(/const latticeEnabledIds=new Set\((\[[^;]+\])\);/);
assert(activeMatch,'Runtime active channel registry missing');
const runtimeActive=new Set(JSON.parse(activeMatch[1].replaceAll("'",'"')));
assert.deepEqual([...runtimeActive].sort(),manifest.channels.filter(c=>c.disposition==='ACTIVE').map(c=>c.id).sort(),'Runtime polling and manifest dispositions diverged');
assert(html.includes('for(const g of latticeSampleGroups)enqueue(g.id'),'Batch must gather all pretested sample groups');
assert(html.includes('sampleGroupsSuccessful:'),'Runtime eye must expose successful sample collection');
assert(html.includes('function latticeCollectRecords(id,j,url)'),'Structured event collector missing');
assert(html.includes('channels.coops={label:'),'NOAA CO-OPS source must exist');
assert(html.includes('channels.usgswater={label:'),'USGS Water source missing');
assert(html.includes('channels.ndbc={label:'),'NOAA NDBC source missing');
assert(html.includes('channels.emsc={label:'),'EMSC source missing');
assert(html.includes('channels.bom={label:'),'BOM source missing');
assert(html.includes("{id:'bom',region:'oc'}"),'BOM must be in global vacuum');
assert(html.includes("if(id==='bom')"),'BOM record extraction missing');
assert(html.includes("{id:'emsc',region:'eu'}"),'EMSC must be in continuous vacuum');
assert(html.includes("if(id==='emsc')"),'EMSC event extraction missing');
assert(html.includes("{id:'ndbc',region:'na'}"),'NDBC must be scheduled in vacuum');
assert(html.includes("if(id==='ndbc')"),'NDBC records must be extracted');
assert(html.includes("responseType==='text'?latticeParseNdbc(body):JSON.parse(body)"),'NDBC text transport missing');
assert(html.includes("{id:'usgswater',region:'na'}"),'USGS Water must run globally');
assert(html.includes("if(id==='usgswater')"),'USGS Water structured observations missing');
assert(html.includes("{id:'coops',region:'na'}"),'NOAA source must be in continuous vacuum');
assert(html.includes("if(id==='coops')"),'NOAA observation normalization must exist');
assert(html.includes('latticeCollectRecords(j.id,payload,j.url)'),'Provider responses must enter record collector');
assert(html.includes('recordCollections:[...latticeEventCollections]'),'Eye must expose bounded record collection counts');
for(const id of ['quakes','events','alerts','floods','river'])assert(html.includes("if(id==='"+id+"')"),'Missing record adapter '+id);
assert(html.includes("c.id!=='51'&&c.id!=='53'"),'ISS position must feed both altitude and ground-track channels');
assert(html.includes("c.id==='53'&&Number.isFinite(j.longitude)"),'ISS ground-track geometry must use live coordinates');
assert(html.includes('function tick(){if(document.hidden||!navigator.onLine)return;collectVacuum();'),'Periodic tick must refresh vacuum feeds');
assert(html.includes('function collectVacuum(){for(const g of latticeSampleGroups)enqueue(g.id'),'Vacuum must gather all tested sample groups');
assert(html.includes('for(const f of latticeGlobalFeeds)enqueue(f.id'),'Vacuum must gather global feeds independent of selection');
for(const id of ['quakes','events','alerts','floods','river','iss','tles'])assert(html.includes("{id:'"+id+"',region:"),'Missing global feed '+id);
const activeGroups=groups.filter(g=>g.channelIds.some(id=>runtimeActive.has(id)));
assert.equal(activeGroups.length,5,'Expected five active provider sample groups');
console.log('Active runtime sample groups:',activeGroups.map(g=>g.id).join(','));
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

