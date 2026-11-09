(function (command) {
 "use strict";
 if (document.readyState!=="complete" || location.protocol!=="https:") return {error:"document_unavailable"};
 const visible = element => element.getClientRects().length && getComputedStyle(element).visibility==="visible";
 const clean = (s,n) => String(s||"").replace(/\s+/g," ").trim().slice(0,n);
 const title = clean(document.title,160);
 const blocks = Array.from(document.querySelectorAll("h1,h2,main p,article p,body > p")).filter(visible).slice(0,400);
 const text = clean(blocks.slice(0,12).map(e=>e.innerText).join(" "),360);
 const links = Array.from(document.querySelectorAll("a[href]")).slice(0,400).filter(visible).flatMap(element=>{
  try {
   const url = new URL(element.href);
   if (!["http:","https:"].includes(url.protocol) || url.username || url.password || !url.hostname) return [];
   url.search=""; url.hash="";
   const label=clean(element.innerText || element.getAttribute("aria-label"),60);
   return label && url.href.length<=160 ? [{text:label,href:url.href}] : [];
  } catch {return [];}
 });
 const common={origin:location.origin,title,text,links:links.slice(0,5)};
 if (!command) return common;
 if (command.schema_version!==1) return {error:"unsupported_operation"};
 if (command.operation==="observe") return {...common,kind:"browser.observation",schema_version:1,payload:{page:{title,excerpt:text},outline:{headings:blocks.filter(e=>/^H[12]$/.test(e.tagName)).slice(0,5).map(e=>({level:Number(e.tagName[1]),label:clean(e.innerText,80)}))},links:links.slice(0,3)}};
 if (command.operation==="extract") {
  const p=command.payload;
  if (!p || !["links","content"].includes(p.collection) || !Number.isInteger(p.limit) || p.limit<1 || p.limit>5 ||
      (p.cursor!==null && (!Number.isInteger(p.cursor) || p.cursor<0 || p.cursor>400))) return {error:"observation_rejected"};
  const items=p.collection==="links"?links:blocks.map(element=>({text:clean(element.innerText,160)}));
  const start=p.cursor||0, end=start+p.limit;
  return {...common,kind:"browser.observation",schema_version:1,payload:{
   collection:p.collection,items:items.slice(start,end),next_cursor:end<items.length?end:null}};
 }
 if (command.operation==="scroll") {
  const amount=command.payload?.delta;
  if (!Number.isInteger(amount) || amount===0 || Math.abs(amount)>600) return {error:"observation_rejected"};
  const before=Math.round(window.scrollY);
  window.scrollBy({top:amount,behavior:"instant"});
  const after=Math.round(window.scrollY);
  return {...common,kind:"browser.action",schema_version:1,payload:{scroll:{before,after,moved:before!==after},page:{title}}};
 }
 return {error:"unsupported_operation"};
})
