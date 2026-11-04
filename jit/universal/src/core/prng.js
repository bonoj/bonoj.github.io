// Stable 32-bit FNV-1a + mulberry32. All arithmetic is unsigned JS integer arithmetic.
export const hash32 = text => { let h=0x811c9dc5; for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,0x01000193);} return h>>>0; };
export function stream(filmId, domain){let a=hash32('universal/v1|'+filmId+'|'+domain);return ()=>{a=(a+0x6d2b79f5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
export function integer(next,max){if(!Number.isSafeInteger(max)||max<1)throw Error('invalid bound');const limit=Math.floor(4294967296/max)*max;let n;do{n=Math.floor(next()*4294967296);}while(n>=limit);return n%max;}
export const choose=(next,values)=>values[integer(next,values.length)];
