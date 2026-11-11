/* Experience 012 — Living Ocean: relational, depth-distributed music. */
(()=>{
'use strict';
const $=id=>document.getElementById('ocean-'+id), panel=$('panel'), canvas=$('view'), g=canvas.getContext('2d');
const species=[
 {name:'Lantern',shape:'lantern',color:'#86f5df',voice:'bell',motif:[0,2,4,3],pace:2.8},
 {name:'Ribbon',shape:'ribbon',color:'#83bce9',voice:'flute',motif:[4,3,2,0],pace:3.4},
 {name:'Drifter',shape:'drifter',color:'#c2a8ee',voice:'glass',motif:[0,4,2,1],pace:4.2},
 {name:'Chorus',shape:'chorus',color:'#f3c98b',voice:'bass',motif:[0,2,1,0],pace:5.1},
 {name:'Wisp',shape:'wisp',color:'#9df5b0',voice:'bell',motif:[2,4,3,1],pace:3.1},
 {name:'Leviathan',shape:'leviathan',color:'#76b6c9',voice:'bass',motif:[0,1,3,2],pace:7.2}
];
const regions=[[0,'SUNLIT','A world of scattered voices'],[200,'TWILIGHT','The first conversations'],[1000,'MIDNIGHT','Listening in the dark'],[4000,'ABYSS','Songs travel farther here'],[6000,'HADAL','The oldest voices answer']];
const scale=[38,40,41,43,45,47,48,50,52,53,55,57,59,60,62,64,65,67,69,71,72];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const creatures=Array.from({length:56},(_,i)=>{
 const family=i%species.length;
 const layer=Math.floor(i/7);
 const depth=90+layer*1350+(i%7)*155+((i*83)%170);
 return {id:i,kind:family,depth,x:.10+((i*37)%81)/100,phase:i*2.399,energy:0,heard:-100,spoken:-100,phrase:0,reply:null,partner:null,active:false};
});
let ac,out,echo,feedback,wet,playing=false,depth=0,rate=32,last=0,next=0,clock=null,voices=[],events=[],ripples=[],worldTime=0,w=0,h=0,selected=null;
const hz=m=>440*Math.pow(2,(m-69)/12);
function resize(){w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);g.setTransform(d,0,0,d,0,0)}
new ResizeObserver(resize).observe(canvas);
function setup(){
 if(ac)return;
 ac=new(window.AudioContext||window.webkitAudioContext)();
 out=ac.createGain();out.gain.value=.28;
 const compressor=ac.createDynamicsCompressor();compressor.threshold.value=-21;compressor.ratio.value=3;out.connect(compressor);compressor.connect(ac.destination);
 echo=ac.createDelay(2);echo.delayTime.value=.56;feedback=ac.createGain();feedback.gain.value=.18;echo.connect(feedback);feedback.connect(echo);wet=ac.createGain();wet.gain.value=.16;out.connect(echo);echo.connect(wet);wet.connect(compressor);
}
function tone(c,degree,time,strength=.65,answer=false){
 if(!ac||ac.state!=='running')return;
 const sp=species[c.kind],m=scale[clamp(degree,0,scale.length-1)],f=hz(m),dur=sp.voice==='bass'?3.3:sp.voice==='flute'?2.4:2.9;
 const env=ac.createGain(),filter=ac.createBiquadFilter(),pan=ac.createStereoPanner();
 const gain=(sp.voice==='bass'?.045:.032)*strength;
 env.gain.setValueAtTime(.0001,time);env.gain.exponentialRampToValueAtTime(gain,time+.04);env.gain.exponentialRampToValueAtTime(.0001,time+dur);
 filter.type='lowpass';filter.frequency.value=Math.max(420,2700-depth*.19);
 pan.pan.value=clamp((c.x-.5)*1.5,-.8,.8);filter.connect(env);env.connect(pan);pan.connect(out);
 const harmonics=sp.voice==='flute'?[1,2,3]:sp.voice==='bass'?[1,2,3,4]:[1,2,3,4,5];
 for(const harmonic of harmonics){
  const o=ac.createOscillator(),a=ac.createGain();
  o.type='sine';o.frequency.setValueAtTime(f*harmonic,time);
  a.gain.value=(harmonic===1?1:.46)/Math.pow(harmonic,1.5);
  o.connect(a);a.connect(filter);o.start(time);o.stop(time+dur+.04);
 }
 voices.push({env,end:time+dur+.06});
 c.energy=Math.max(c.energy,answer?1.15:.8);
 ripples.push({x:c.x*w,y:screenY(c),radius:3,alpha:.7,color:sp.color});
}
function screenY(c){return h*(.50+(c.depth-depth)/2600)+Math.sin(worldTime*.32+c.phase)*9}
function visible(c){return Math.abs(c.depth-depth)<1550}
function neighbors(c){
 return creatures.filter(n=>n!==c&&visible(n)&&Math.abs(n.depth-c.depth)<950&&Math.abs(n.x-c.x)<.38)
 .sort((a,b)=>(Math.abs(a.depth-c.depth)/1300+Math.abs(a.x-c.x))-(Math.abs(b.depth-c.depth)/1300+Math.abs(b.x-c.x)));
}
function speak(c,t,replyTo=null){
 const sp=species[c.kind],step=c.phrase++%sp.motif.length;
 // A creature remembers its motif. Replies inherit the last heard interval, then bend toward its own contour.
 const base=replyTo?replyTo.lastDegree:4;
 const degree=clamp((replyTo?base+[-2,0,1,-1][step]:4)+sp.motif[step]-2,1,scale.length-2);
 const phraseDuration=sp.pace*.29;
 tone(c,degree,t,replyTo?.72:.54,!!replyTo);
 c.lastDegree=degree;c.spoken=worldTime;c.partner=replyTo?.id??null;
 if(!replyTo){
  const listener=neighbors(c).find(n=>worldTime-n.heard>1.5&&worldTime-n.spoken>1.5);
  if(listener){listener.reply={from:c.id,due:worldTime+phraseDuration,degree};listener.heard=worldTime;}
 }else{
  const source=creatures[replyTo.id];if(source&&visible(source))source.energy=Math.max(source.energy,.4);
 }
}
function tick(){
 if(!playing||!ac||ac.state!=='running')return;
 const now=ac.currentTime;
 while(next<now+.16){
  // Shared pulse, but each individual has a memory, a neighborhood, and a conversational role.
  const audible=creatures.filter(visible);
  for(const c of audible){
   if(c.reply&&worldTime>=c.reply.due){
    const from=creatures[c.reply.from],r=c.reply;c.reply=null;
    if(from&&visible(from))speak(c,next,{id:from.id,lastDegree:r.degree});
   }
  }
  // Conversation seeds: one at a time, with rests; no independent random note barrage.
  const eligible=audible.filter(c=>!c.reply&&worldTime-c.spoken>species[c.kind].pace*1.9&&worldTime-c.heard>2);
  if(eligible.length&&Math.floor(worldTime*2.5)%7===0){
   const choice=eligible[Math.floor(worldTime/2.8)%eligible.length];
   speak(choice,next);
  }
  next+=.26;
  worldTime+=.26;
 }
 voices=voices.filter(v=>v.end>now);
}
function silence(){
 if(!ac)return;const t=ac.currentTime;
 for(const v of voices){v.env.gain.cancelScheduledValues(t);v.env.gain.setTargetAtTime(.0001,t,.025)}voices=[];
}
function stop(){
 playing=false;if(clock!==null){clearInterval(clock);clock=null}silence();
 $('start').textContent='Resume listening ♫';
 if(ac&&ac.state==='running')ac.suspend();
}
$('start').onclick=async()=>{
 if(playing){stop();return}
 try{setup();await ac.resume();playing=true;next=ac.currentTime+.09;clock=setInterval(tick,45);$('start').textContent='Pause listening';}
 catch(e){$('caption').textContent='Audio unavailable: '+e.message}
};
$('drift').addEventListener('input',()=>{rate=Number($('drift').value);$('drift-label').textContent=rate===0?'STILL':rate+' m/s'});
function activate(c){
 if(!c)return;selected=c;const wasPlaying=playing;
 if(!wasPlaying)$('start').click();
 if(!ac)return;
 const t=ac.currentTime+.08;
 speak(c,t);
 const ns=neighbors(c).slice(0,2);
 ns.forEach((n,i)=>{n.reply={from:c.id,due:worldTime+.7+i*.6,degree:c.lastDegree};n.heard=worldTime});
 $('caption').textContent=species[c.kind].name+' · calling to '+ns.length+' nearby '+(ns.length===1?'listener':'listeners');
}
canvas.addEventListener('pointerdown',e=>{
 const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
 const candidates=creatures.filter(visible).map(c=>({c,d:Math.hypot(x-c.x*w,y-screenY(c))})).sort((a,b)=>a.d-b.d);
 if(candidates[0]?.d<46)activate(candidates[0].c);
});
document.getElementById('nav-ocean').onclick=()=>{
 document.querySelectorAll('main > section.panel').forEach(el=>el.classList.add('hidden'));
 document.querySelectorAll('nav button').forEach(el=>el.setAttribute('aria-current','false'));
 for(const id of ['stop','ruins-stop','theory-silence','field-stop','ecs-stop','tree-stop','strings-stop','lute-stop','harp-stop','procession-stop','bathyal-start']){
  const el=document.getElementById(id);
  if(id==='bathyal-start'){if(el?.textContent.includes('Pause'))el.click()}
  else if(el)el.click();
 }
 panel.classList.remove('hidden');document.getElementById('nav-ocean').setAttribute('aria-current','page');resize();
};
document.querySelectorAll('nav button:not(#nav-ocean)').forEach(el=>el.addEventListener('click',()=>{stop();panel.classList.add('hidden');document.getElementById('nav-ocean').setAttribute('aria-current','false')}));
function frame(ms){
 const dt=Math.min(.05,(ms-last)/1000||0);last=ms;
 if(!panel.classList.contains('hidden')){
  if(playing&&ac?.state==='running')depth=clamp(depth+dt*rate,0,10900);
  let zone=0;for(let i=0;i<regions.length;i++)if(depth>=regions[i][0])zone=i;
  $('depth').textContent=Math.floor(depth).toLocaleString()+' m · '+regions[zone][1];
  const darkness=Math.min(1,depth/2000);
  g.fillStyle='rgb(3,'+Math.round(37-30*darkness)+','+Math.round(58-42*darkness)+')';g.fillRect(0,0,w,h);
  const now=ms*.001;
  for(let i=0;i<38;i++){
   const x=(i*97.3)%Math.max(1,w),y=(i*131.7-now*(3+rate*.1))%Math.max(1,h);
   g.fillStyle='rgba(150,220,233,.17)';g.beginPath();g.arc(x,(y+h)%h,.5+i%3*.25,0,Math.PI*2);g.fill();
  }
  for(const c of creatures){
   if(!visible(c))continue;
   const sp=species[c.kind],x=c.x*w+Math.sin(now*.25+c.phase)*12,y=screenY(c),proximity=1-Math.abs(c.depth-depth)/1550;
   c.energy*=Math.pow(.3,dt);
   const size=(5+(c.kind===5?11:c.kind===2?5:2))*proximity+2;
   g.save();g.translate(x,y);g.globalAlpha=clamp(proximity*.9+.1,.1,1);
   g.shadowBlur=8+c.energy*24;g.shadowColor=sp.color;g.fillStyle=sp.color;
   if(sp.shape==='ribbon'||sp.shape==='leviathan'){
    g.beginPath();g.moveTo(-size*1.5,0);g.quadraticCurveTo(0,-size*.9,size*1.5,0);g.quadraticCurveTo(0,size*.6,-size*1.5,0);g.fill();
    g.strokeStyle=sp.color;g.beginPath();g.moveTo(size,0);g.quadraticCurveTo(size*2,Math.sin(now+c.phase)*size,size*2.6,0);g.stroke();
   }else if(sp.shape==='drifter'){
    g.beginPath();g.ellipse(0,0,size*1.25,size*.55,0,0,Math.PI*2);g.fill();
    for(let k=-2;k<=2;k++){g.strokeStyle=sp.color;g.beginPath();g.moveTo(k*size*.35,2);g.lineTo(k*size*.42+Math.sin(now+k)*3,size*2);g.stroke()}
   }else{
    g.beginPath();g.arc(0,0,size,0,Math.PI*2);g.fill();
    if(sp.shape==='lantern'||sp.shape==='wisp'){g.strokeStyle=sp.color;g.beginPath();g.moveTo(0,size);g.quadraticCurveTo(size,2*size,size*.4,3*size);g.stroke()}
   }
   if(c.energy>.12){g.globalAlpha=c.energy*.4;g.beginPath();g.arc(0,0,size+8+c.energy*7,0,Math.PI*2);g.strokeStyle=sp.color;g.stroke()}
   g.restore();
  }
  ripples=ripples.filter(r=>r.alpha>.03);
  for(const r of ripples){r.radius+=dt*30;r.alpha*=Math.pow(.36,dt);g.strokeStyle=r.color;g.globalAlpha=r.alpha*.4;g.beginPath();g.arc(r.x,r.y,r.radius,0,Math.PI*2);g.stroke()}g.globalAlpha=1;
  $('population').textContent=creatures.filter(visible).length+' nearby · 56 throughout the water column';
 }
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
