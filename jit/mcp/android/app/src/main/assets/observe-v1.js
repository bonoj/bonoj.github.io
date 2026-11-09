(function () {
 "use strict";
 if (document.readyState !== "complete" || location.protocol !== "https:") return {error:"document_unavailable"};
 const text = Array.from(document.querySelectorAll("h1,main p,body > p"))
   .filter(el => el.getClientRects().length && getComputedStyle(el).visibility === "visible")
   .slice(0,12).map(el => el.innerText).join(" ").replace(/\s+/g," ").trim().slice(0,360);
 return {origin:location.origin,title:document.title.slice(0,160),text};
})()
