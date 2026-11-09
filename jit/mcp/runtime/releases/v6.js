(function(command){
"use strict";
if(document.readyState!=="complete"||location.protocol!=="https:")return {error:"document_unavailable"};
const clean=(s,n=100)=>String(s??"").replace(/\s+/g," ").trim().slice(0,n);
const visible=e=>!!(e.getClientRects().length)&&getComputedStyle(e).visibility!=="hidden"&&getComputedStyle(e).display!=="none";
const safeUrl=s=>{try{const u=new URL(s,location.href);if(!["http:","https:"].includes(u.protocol)||u.username||u.password||!u.hostname)return null;u.username="";u.password="";return u.href.slice(0,180)}catch{return null}};
const controls=Array.from(document.querySelectorAll("input,textarea,select,button,[role=button],[role=checkbox],[role=radio]")).filter(visible).slice(0,160);
const anchors=Array.from(document.querySelectorAll("a[href]")).filter(visible).slice(0,400);
const blocks=Array.from(document.querySelectorAll("h1,h2,main p,article p,body > p")).filter(visible).slice(0,400);
const label=e=>{const id=e.id;let l=id?Array.from(document.querySelectorAll("label[for]")).find(x=>x.htmlFor===id):null;return clean(l?.innerText||e.closest("label")?.innerText||e.getAttribute("aria-label")||e.getAttribute("title")||e.getAttribute("placeholder")||e.innerText||"",80)};
const isSensitive=e=>e.matches("input[type=password],input[type=hidden]")||/^(?:cc-|one-time-code|current-password|new-password)/.test(e.getAttribute("autocomplete")||"");
const linkItems=anchors.flatMap((e,i)=>{const href=safeUrl(e.href);const text=label(e);return href&&text?[{ref:"l"+i,text,href}]:[]});
const controlItems=controls.flatMap((e,i)=>{if(isSensitive(e))return [];const type=clean(e.getAttribute("type")||e.tagName.toLowerCase(),24).toLowerCase();const name=label(e);return [{ref:"c"+i,role:clean(e.getAttribute("role")||e.tagName.toLowerCase(),24),type,label:name,required:!!e.required,disabled:!!e.disabled,checked:!!e.checked}]});
const forms=Array.from(document.forms).filter(visible).slice(0,40).map((f,i)=>({ref:"f"+i,method:clean(f.method,12),action:safeUrl(f.action)||"",controls:controls.filter(e=>e.form===f).length}));
const title=clean(document.title,160),text=clean(blocks.slice(0,12).map(e=>e.innerText).join(" "),360);
const common={origin:location.origin,title,text:text.slice(0,120),links:linkItems.slice(0,1).map(({text,href})=>({text,href}))};
if(!command)return common;
if(command.schema_version!==1)return {error:"unsupported_operation"};
const result=(kind,payload)=>({...common,kind,schema_version:1,payload});
const op=command.operation,p=command.payload||{};
if(op==="observe")return result("browser.observation",{page:{title,excerpt:text},outline:{headings:blocks.filter(e=>/^H[12]$/.test(e.tagName)).slice(0,4).map(e=>({level:Number(e.tagName[1]),label:clean(e.innerText,60)}))},forms:forms.slice(0,1),control_count:controlItems.length,link_count:linkItems.length,links:linkItems.slice(0,2)});
if(op==="extract"){
 const collections={links:linkItems,controls:controlItems,forms,content:blocks.map(e=>({text:clean(e.innerText,140)})),options:controls.flatMap((e,i)=>e.tagName==="SELECT"?Array.from(e.options).slice(0,20).map((o,j)=>({control_ref:"c"+i,option_ref:"o"+i+"_"+j,label:clean(o.text,70),selected:o.selected,disabled:o.disabled})):[]),messages:Array.from(document.querySelectorAll("[role=alert],[aria-live],.error,.invalid-feedback")).filter(visible).slice(0,20).map(e=>({text:clean(e.innerText,140)}))};
 if(!Object.prototype.hasOwnProperty.call(collections,p.collection)||!Number.isInteger(p.limit)||p.limit<1||p.limit>8||(p.cursor!=null&&(!Number.isInteger(p.cursor)||p.cursor<0||p.cursor>400)))return {error:"observation_rejected"};
 const items=collections[p.collection],start=p.cursor||0,end=start+p.limit;
 return result("browser.observation",{collection:p.collection,items:items.slice(start,end),next_cursor:end<items.length?end:null,total:items.length});
}
if(op==="scroll"){if(!Number.isInteger(p.delta)||!p.delta||Math.abs(p.delta)>600)return {error:"observation_rejected"};const before=Math.round(scrollY);scrollBy({top:p.delta,behavior:"instant"});return result("browser.action",{scroll:{before,after:Math.round(scrollY),moved:Math.round(scrollY)!==before}})}
// Refs are observation-scoped and must be checked by the native expected_revision guard.
if(op==="click"){
 if(typeof p.ref!=="string"||!/^[lc]\d{1,3}$/.test(p.ref))return {error:"target_unavailable"};
 const index=Number(p.ref.slice(1)),e=p.ref[0]==="l"?anchors[index]:controls[index];
 if(!e||!e.isConnected||!visible(e)||e.disabled)return {error:"target_unavailable"};
 if(e.tagName==="A"&&(!safeUrl(e.href)||p.href&&safeUrl(e.href)!==p.href))return {error:"target_unavailable"};
 if(e.matches("button[type=submit],input[type=submit],button:not([type]),input[type=image]")||e.closest("form")&&e.matches("[type=submit]"))return {error:"submit_requires_confirmation"};
 e.click();return result("browser.action",{action:"click",state:"initiated",ref:p.ref});
}
if(op==="fill"&&p.option_ref===undefined&&p.checked===undefined){
 if(typeof p.ref!=="string"||!/^c\d{1,3}$/.test(p.ref)||typeof p.value!=="string"||p.value.length>512)return {error:"observation_rejected"};
 const e=controls[Number(p.ref.slice(1))];
 if(!e||!e.isConnected||!visible(e)||e.disabled||e.readOnly||isSensitive(e)||!e.matches("input:not([type=checkbox]):not([type=radio]):not([type=file]),textarea"))return {error:"target_unavailable"};
 const setter=Object.getOwnPropertyDescriptor(e.tagName==="TEXTAREA"?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,"value")?.set;
 if(!setter)return {error:"unsupported_operation"};setter.call(e,p.value);e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));
 return result("browser.action",{action:"fill",ref:p.ref,accepted:e.value===p.value,length:e.value.length});
}
if(op==="select"||op==="fill"&&p.option_ref!==undefined||op==="fill"&&p.checked!==undefined){
 if(typeof p.ref!=="string"||!/^c\\d{1,3}$/.test(p.ref))return {error:"observation_rejected"};
 const e=controls[Number(p.ref.slice(1))];
 if(!e||!e.isConnected||!visible(e)||e.disabled||isSensitive(e))return {error:"target_unavailable"};
 if(e.tagName==="SELECT"){
  if(typeof p.option_ref!=="string"||!/^o\\d{1,3}_\\d{1,2}$/.test(p.option_ref))return {error:"observation_rejected"};
  const parts=p.option_ref.slice(1).split("_").map(Number);
  if(parts[0]!==Number(p.ref.slice(1))||parts[1]>=e.options.length||parts[1]>=20||e.options[parts[1]].disabled)return {error:"target_unavailable"};
  e.selectedIndex=parts[1];e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));
  return result("browser.action",{action:"select",ref:p.ref,selected_option:p.option_ref,accepted:e.selectedIndex===parts[1]});
 }
 if(e.matches("input[type=checkbox],input[type=radio]")){
  if(typeof p.checked!=="boolean")return {error:"observation_rejected"};
  if(e.type==="radio"&&!p.checked)return {error:"observation_rejected"};
  e.checked=p.checked;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));
  return result("browser.action",{action:"select",ref:p.ref,checked:e.checked});
 }
 return {error:"unsupported_operation"};
}
if(op==="navigate"){if(typeof p.url!=="string"||!safeUrl(p.url)||new URL(p.url).origin!==location.origin)return {error:"observation_rejected"};location.assign(p.url);return result("browser.action",{action:"navigate",state:"initiated"});}
if(op==="back"||op==="forward"){history[op==="back"?"back":"forward"]();return result("browser.action",{action:op,state:"initiated"});}
return {error:"unsupported_operation"};
})
