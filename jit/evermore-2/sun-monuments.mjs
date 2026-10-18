// Evermore II Sun monument headless core. Dormant until a real worker integration is designed.
// No DOM, timer, random, inventory or unit mutation outside this explicit model.
export const createSunMonuments = function(config={}) {
  const {cx=0,cy=0,width=520,height=520,exclusion={x:cx,y:cy,r:76},radius=120,footprint=22,cost=1}=config;
  if(!Number.isInteger(cost)||cost<1)throw Error("positive integer stone cost required");
  const state={tower:{x:cx,y:cy},sites:[],looseStone:[],inventoryStone:0,events:[]};
  const emit=(type,detail={})=>state.events.push({type,...detail});
  const plan=()=>{
    state.sites=Array.from({length:5},(_,i)=>{
      const a=-Math.PI/2+i*2*Math.PI/5,x=state.tower.x+Math.cos(a)*radius,y=state.tower.y+Math.sin(a)*radius;
      return {id:i,x,y,stone:0,status:"planned",inhabitant:null};
    });
    return state.sites;
  };
  const blocked=(site)=>Math.hypot(site.x-exclusion.x,site.y-exclusion.y)<exclusion.r+footprint||
    site.x<footprint||site.x>width-footprint||site.y<footprint||site.y>height-footprint||
    state.sites.some(other=>other!==site&&other.status==="built"&&Math.hypot(site.x-other.x,site.y-other.y)<footprint*2);
  const arrive=(id,stone,at)=>{
    const site=state.sites[id];
    if(!site||site.status!=="planned"||!Number.isInteger(stone)||stone!==cost) return {ok:false,reason:"invalid-delivery"};
    if(!at||Math.hypot(at.x-site.x,at.y-site.y)>footprint) return {ok:false,reason:"worker-not-at-site"};
    if(blocked(site)){site.status="credited";state.inventoryStone+=stone;emit("monumentBlockedCredited",{id,stone});return {ok:true,status:"credited"}}
    site.status="built";site.stone=stone;emit("monumentBuilt",{id,stone});return {ok:true,status:"built"};
  };
  const inhabit=(id,cherub)=>{
    const site=state.sites[id];
    if(!site||site.status!=="built"||site.inhabitant||!cherub)return false;
    site.inhabitant={id:cherub.id??null};emit("monumentInhabited",{id});return true;
  };
  const attack=(id)=>{const site=state.sites[id];if(!site||site.status!=="built")return false;if(site.inhabitant){emit("monumentImmune",{id});return false}site.status="destroyed";for(let i=0;i<site.stone;i++)state.looseStone.push({x:site.x,y:site.y});site.stone=0;emit("monumentDestroyed",{id});return true};
  const relocate=(x,y)=>{
    if(x===state.tower.x&&y===state.tower.y)return 0;
    let fallen=0;
    for(const site of state.sites)if(site.status==="built"){for(let i=0;i<site.stone;i++)state.looseStone.push({x:site.x,y:site.y});fallen+=site.stone;site.stone=0;site.inhabitant=null;site.status="collapsed";}
    state.tower={x,y};plan();emit("monumentsCollapsed",{stone:fallen});return fallen;
  };
  plan();return {state,plan,blocked,arrive,inhabit,attack,relocate};
};
