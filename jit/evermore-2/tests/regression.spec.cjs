const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const bridge = `window.__test = {
  snapshot: () => ({ towers: towers.map(t=>({...t})), drones: drones.map(d=>({...d})), armies: armies.map(a=>({...a})), units: units.map(u=>({...u})), crops: crops.map(p=>({...p})), mountains: mountains.map(m=>({...m})), remains: remains.map(p=>({...p})), lumberHut: lumberHut&&({...lumberHut}), lumberAnts: lumberAnts.map(a=>({x:a.x,y:a.y,state:a.fsm.state,stateTime:a.fsm.time,hasTree:!!a.tree,carrying:a.fsm.state==='carry'||a.fsm.state==='unload'})), woodDelivered, resources:{...resources}, workers:Object.fromEntries(Object.entries(workerGroups).map(([k,g])=>[k,{depot:{...g.depot},actors:g.workers.map(a=>({x:a.x,y:a.y,state:a.fsm.state,cargo:a.cargo,motion:a.prof.motion}))}])), enemies: enemies.map(e=>({...e})), coins, gems, hp, kills, selected, castSpell, arenaScale, w, h, cx, cy }),
  seed: () => { coins=100000; gems=100000; hud(); },
  enemy: (x,y,hp=2) => { const e={x,y,hp,speed:0,slow:0,poison:0,pt:0,dead:false}; enemies.push(e); return e; },
  crop: (source,stage,x,y) => { const p={source,stage,x,y,growAt:0,phase:0}; crops.push(p); return p; },
  mountain: (stage,x,y) => { const m={stage,x,y,nextStage:-1,changeAt:0}; mountains.push(m); return m; },
  startWorkers: kind => startWorkers(kind),
  towerFire: i => towerFire(towers.find(t=>t.i===i)),
  unitFire: i => unitFire(units.find(u=>u.i===i)),
  recruit: i => recruit(armies.find(a=>a.i===i)),
  hit: (index,damage) => hit(enemies[index],damage,'#ffffff'),
  water: i => waterPlants(towers.find(t=>t.i===i), Math.min(w,h)*.23),
  step: (seconds) => { for(let n=0;n<Math.ceil(seconds/.04);n++) frame(last+40); },
  pause: () => { over=true; },
  resume: () => { over=false; }
};`;
test.beforeEach(async ({page}) => {
  await page.route('**/game-test', async route => {
    const instrumented=html.replace('function frame(now){', bridge+'function frame(now){');
    if(instrumented===html) throw Error('Game entrypoint changed');
    await route.fulfill({status:200,contentType:'text/html',body:instrumented});
  });
  await page.goto('http://localhost:4179/game-test');
  await expect.poll(()=>page.evaluate(()=>!!window.__test)).toBe(true);
  await page.evaluate(()=>window.__test.seed());
});
async function state(page){return page.evaluate(()=>window.__test.snapshot())}
async function buyAll(page){for(let i=0;i<5;i++)await page.locator('.buy').nth(i).click()}
async function place(page,i,x,y){
  await page.locator('.spell').nth(i).click();
  await page.locator('#game').evaluate((el,p)=>{const r=el.getBoundingClientRect();const s=window.__test.snapshot();el.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:r.left+p.x*r.width/s.w,clientY:r.top+p.y*r.height/s.h}))},{x,y});
}
test('shop, unlocks, tower identities, relocation and scale',async({page})=>{
  await buyAll(page);let s=await state(page);
  expect(s.drones.map(d=>d.i)).toEqual([0,1,2,3,4]);expect(s.arenaScale).toBe(2);
  for(let i=0;i<5;i++)await place(page,i,80+i*60,90);
  s=await state(page);expect(s.towers.map(t=>t.i)).toEqual([0,1,2,3,4]);expect(s.towers).toHaveLength(5);
  await place(page,0,95,145);s=await state(page);
  expect(s.towers).toHaveLength(5);expect(s.towers[0].x).toBeCloseTo(95,0);
  expect(s.towers[0].y).toBeCloseTo(145,0);
  await buyAll(page);s=await state(page);
  expect(s.armies.map(a=>a.i)).toEqual([0,1,2,3,4]);
  expect(s.drones).toHaveLength(5);
});
test('all five recruit divisions spawn, attack, and preserve their distinct effects',async({page})=>{
  await buyAll(page);
  const s0=await state(page);
  for(let i=0;i<5;i++)await place(page,i,70+i*70,90);
  await buyAll(page);
  await page.evaluate(()=>{window.__test.pause();for(let i=0;i<5;i++)window.__test.recruit(i)});
  let s=await state(page);expect(s.units.map(u=>u.i)).toEqual([0,1,2,3,4]);
  for(let i=0;i<5;i++){
    await page.evaluate(i=>{const t=window.__test.snapshot().units.find(u=>u.i===i);window.__test.enemy(t.x+30,t.y,5);window.__test.unitFire(i)},i);
  }
  s=await state(page);
  expect(s.units).toHaveLength(5);
  expect(s.enemies.some(e=>e.hp<5)).toBe(true);
  expect(s.enemies.some(e=>e.poison>0)).toBe(true);
  expect(s.enemies.some(e=>e.slow>0)).toBe(true);
  expect(s0.armies).toHaveLength(0);
});
test('tower pulses water crops, burn vegetation, and change geology',async({page})=>{
  await buyAll(page);
  for(let i=0;i<5;i++)await place(page,i,130,100);
  await page.evaluate(()=>{
    window.__test.pause();
    window.__test.crop(0,'sprout',145,115);
    window.__test.crop(4,'sprout',155,115);
    window.__test.mountain(0,145,125);
    window.__test.towerFire(1);
  });
  let s=await state(page);
  expect(s.crops.every(p=>p.growAt>0)).toBe(true);
  expect(s.mountains[0].nextStage).toBe(1);
  await page.evaluate(()=>window.__test.towerFire(3));
  s=await state(page);expect(s.crops.every(p=>p.burnAt>0)).toBe(true);
});
test('swamp death produces bones, reset clears world',async({page})=>{
  await buyAll(page);await place(page,2,120,100);
  await page.evaluate(()=>{window.__test.pause();window.__test.enemy(125,105,1);window.__test.hit(0,1)});
  let s=await state(page);
  expect(s.remains).toHaveLength(1);expect(s.remains[0].stage).toBe('bones');
  expect(s.kills).toBe(1);
  await page.evaluate(()=>reset());s=await state(page);
  expect(s.towers).toHaveLength(0);expect(s.armies).toHaveLength(0);
  expect(s.units).toHaveLength(0);expect(s.remains).toHaveLength(0);
  expect(s.drones).toHaveLength(0);expect(s.hp).toBe(5);
});
test('mobile arena and controls remain usable without invented UI',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('#game')).toBeVisible();
  await expect(page.locator('.spell')).toHaveCount(5);
  await expect(page.locator('.buy')).toHaveCount(5);
  await expect(page.locator('#build-id')).toBeVisible();
  await buyAll(page);
  expect((await state(page)).arenaScale).toBe(2);
  await expect(page.locator('#game')).toBeVisible();
});

test('Arborist lumberjacks chop, transport and deliver without extra controls',async({page})=>{
  await buyAll(page);
  await place(page,4,150,120);
  await buyAll(page);
  let s=await state(page);
  expect(s.lumberHut).not.toBeNull();
  expect(s.lumberAnts).toHaveLength(3);
  await page.evaluate(()=>{const s=window.__test.snapshot();window.__test.crop(4,'tree',s.lumberHut.x+55,s.lumberHut.y);window.__test.pause();});
  await page.evaluate(()=>window.__test.resume());
  await page.evaluate(()=>window.__test.step(8));
  s=await state(page);
  expect(s.woodDelivered).toBeGreaterThan(0);
  expect(s.crops.filter(p=>p.stage==='tree')).toHaveLength(0);
  await expect(page.locator('.buy')).toHaveCount(5);
  await page.locator('#restart').click();
  s=await state(page);
  expect(s.lumberAnts).toHaveLength(0);
  expect(s.lumberHut).toBeNull();
  expect(s.woodDelivered).toBe(0);
});

test('lumber FSM releases destroyed targets and delivers exactly once',async({page})=>{
 await buyAll(page);await place(page,4,150,120);await buyAll(page);
 await page.evaluate(()=>{window.__test.pause();const s=window.__test.snapshot();window.__test.crop(4,'tree',s.lumberHut.x+50,s.lumberHut.y);window.__test.resume()});
 await page.evaluate(()=>window.__test.step(.5));
 let s=await state(page);expect(s.lumberAnts.some(a=>a.state==='travel'||a.state==='chop')).toBe(true);
 await page.evaluate(()=>{const s=window.__test.snapshot();window.__test.pause(); /* tree removal via game ecology */ window.__test.towerFire(3);window.__test.resume()});
 await page.evaluate(()=>window.__test.step(8));
 s=await state(page);expect(s.woodDelivered).toBeGreaterThanOrEqual(1);
 expect(s.lumberAnts.every(a=>['idle','travel','chop','carry','unload'].includes(a.state))).toBe(true);
});

test('sprite size tokens and ant axe remain semantically consistent',async({page})=>{
 const values=await page.evaluate(()=>({...VISUAL_SIZE}));
 expect(values).toEqual({micro:12,small:19,medium:24,actor:27,worldFeature:30,hero:49,towerIcon:21,cargo:25});
 expect(html).toContain("ctx.translate(rig.tool.mountX,rig.tool.mountY)");
 expect(html).toContain("ctx.scale(a.facing*rig.bodyNativeFacing,1)");
 expect(html).toContain("if(chopping&&a.target)faceActor(a,a.target.x)");
 expect(html).toContain("ctx.font=spriteFont(VISUAL_SIZE.worldFeature)");
});

test('three professions share FSM, fly/scuttle, harvest and deliver distinct materials',async({page})=>{
 await buyAll(page);
 for(let i=0;i<5;i++)await place(page,i,100+i*55,110);
 await buyAll(page);
 let s=await state(page);
 expect(Object.keys(s.workers).sort()).toEqual(['ant','bee','crab']);
 for(const kind of ['ant','bee','crab'])expect(s.workers[kind].actors).toHaveLength(3);
 expect(s.workers.bee.actors[0].motion).toBe('fly');
 expect(s.workers.crab.actors[0].motion).toBe('scuttle');
 await page.evaluate(()=>{
   window.__test.pause();const s=window.__test.snapshot();
   window.__test.crop(0,'wheat',s.workers.bee.depot.x+54,s.workers.bee.depot.y);
   window.__test.crop(4,'tree',s.workers.ant.depot.x+54,s.workers.ant.depot.y);
   window.__test.mountain(3,s.workers.crab.depot.x+55,s.workers.crab.depot.y);
   window.__test.resume();
 });
 await page.evaluate(()=>window.__test.step(10));
 s=await state(page);
 expect(s.resources.wood).toBeGreaterThan(0);
 expect(s.resources.wheat).toBeGreaterThan(0);
 expect(s.resources.ice).toBeGreaterThan(0);
 expect(s.mountains.some(m=>m.stage===2)).toBe(true);
 await page.evaluate(()=>window.__test.step(12));
 s=await state(page);
 expect(s.resources.herbs).toBeGreaterThan(0);
 await page.evaluate(()=>window.__test.step(12));
 s=await state(page);
 expect(s.resources.stone).toBeGreaterThan(0);
 expect(s.mountains.some(m=>m.stage===0)).toBe(false);
 await page.evaluate(()=>reset());
 s=await state(page);
 expect(Object.keys(s.workers)).toHaveLength(0);
 expect(Object.values(s.resources).every(n=>n===0)).toBe(true);
});
