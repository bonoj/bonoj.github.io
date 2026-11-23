/* Read-only presentation. All updates originate in scheduled GitHub commits. */
const base = './';
const el = id => document.getElementById(id);
const safe = value => String(value ?? '—');
async function json(path){const r=await fetch(base+path+'?v='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error(path+': HTTP '+r.status);return r.json();}
function metric(label,value){const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=safe(value);const wrap=document.createElement('div');wrap.append(dt,dd);return wrap;}
(async()=>{try{
 const [state,history]=await Promise.all([json('state.json'),json('history.json')]);
 el('status').textContent=state.last_result==='not_run'?'Awaiting first scheduled checkpoint':safe(state.last_result);
 const metrics=el('metrics');metrics.replaceChildren(metric('Verified runs',state.run_count),metric('Last run (UTC)',state.last_run_utc),metric('Latest report',state.latest_report_path||'Not yet written'));
 const link=el('report');if(state.latest_report_path){const a=document.createElement('a');a.href='./'+state.latest_report_path.replace(/^jit\/affirm\//,'');a.textContent='Read latest persisted report';link.replaceChildren(a);}else link.textContent='No report persisted yet.';
 const target=el('history');target.replaceChildren();for(const item of (history.entries||[]).slice(0,12)){const a=document.createElement('a');a.href='./'+item.path.replace(/^jit\/affirm\//,'');a.textContent=safe(item.timestamp_utc)+' · '+safe(item.label||'AFRM checkpoint');target.append(a);}if(!target.children.length)target.textContent='Waiting for the first scheduled run.';
 }catch(err){el('status').textContent='State unavailable';el('history').textContent='Could not load persisted state: '+err.message;}})();
