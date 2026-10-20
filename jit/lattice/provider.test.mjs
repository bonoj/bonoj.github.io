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
if(failures)process.exitCode=1;
