const VERSION="pcpro-v1";
const SHELL=["./indexpcpro.html","./manifest-pcpro.webmanifest","./icons/pcpro-192.png","./icons/pcpro-512.png","./icons/pcpro-maskable-512.png"];
const CDN=/^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("pcpro-")&&x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
const r=e.request;if(r.method!=="GET")return;
const u=new URL(r.url);
if(u.origin===location.origin){
if(!SHELL.some(p=>new URL(p,location).pathname===u.pathname)&&r.mode!=="navigate")return;
if(r.mode==="navigate"&&!u.pathname.endsWith("indexpcpro.html"))return;
e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("./indexpcpro.html"))));
}else if(CDN.test(r.url)){
e.respondWith(caches.open(VERSION).then(c=>c.match(r).then(m=>{const f=fetch(r).then(res=>{c.put(r,res.clone());return res;}).catch(()=>m);return m||f;})));
}});
