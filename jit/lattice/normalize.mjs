/* Lattice normalization seam — pure functions; no network access. */
export function normalize(channel,payload,{url,fetchedAt=new Date().toISOString()}={}){
  if(!channel||!channel.field)throw Error('Channel mapping unavailable');
  const root=channel.adapter==='iss'?payload:payload?.current;
  if(!root||typeof root!=='object')throw Error('Missing data object');
  const value=root[channel.field];
  if(channel.id==='52'){
    if(typeof value!=='string'||!value.startsWith('1 '))throw Error('Invalid TLE line');
    if(typeof root.line2!=='string'||!root.line2.startsWith('2 '))throw Error('Invalid TLE line 2');
  }else if(typeof value!=='number'||!Number.isFinite(value))throw Error('Missing numeric '+channel.field);
  const observedAt=channel.adapter==='iss'?(typeof payload.timestamp==='number'?new Date(payload.timestamp*1000).toISOString():null):(typeof root.time==='string'?root.time:null);
  return {channelId:channel.id,providerId:channel.provider,kind:channel.kind,geometry:channel.sample?{type:'Point',coordinates:[channel.sample[1],channel.sample[0]]}:null,observedAt,publishedAt:null,fetchedAt,validAt:null,value,unit:channel.unit,quality:'unverified',sourceUrl:url||null,transformVersion:'lattice-normalize/v1'};
}
export function validateManifest(manifest){
 if(manifest?.schema!=='lattice-channels/v1'||!Array.isArray(manifest.channels)||manifest.channels.length!==53)throw Error('Expected 53 channels');
 const ids=new Set();for(let i=0;i<53;i++){const c=manifest.channels[i];if(c.id!==String(i+1).padStart(2,'0')||ids.has(c.id)||!c.provider||!c.adapter)throw Error('Invalid channel '+i);ids.add(c.id)}return true;
}
