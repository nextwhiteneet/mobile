const VERSION="pcpro-v4";
const SHELL=["./","./index.html","./manifest-pcpro.webmanifest","./pcpro-192.png","./pcpro-512.png","./pcpro-maskable-512.png"];
const CDN=/^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
const shellPaths=SHELL.map(p=>new URL(p,self.location).pathname);
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.allSettled(SHELL.map(p=>c.add(p)))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("pcpro-")&&x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
const r=e.request;if(r.method!=="GET")return;
const u=new URL(r.url);
if(u.origin===location.origin){
if(!shellPaths.includes(u.pathname))return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./index.html"))));
}else if(CDN.test(r.url)){
e.respondWith(caches.open(VERSION).then(c=>c.match(r).then(m=>{const f=fetch(r).then(res=>{c.put(r,res.clone());return res;}).catch(()=>m);return m||f;})));
}});
