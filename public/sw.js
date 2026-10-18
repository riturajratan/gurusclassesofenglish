/* Network-first: never cache the teacher's desk, credentials, or API requests. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);
 if(url.origin !== self.location.origin) return;
 if(event.request.method === 'POST' && url.pathname === '/publish/') {
  event.respondWith((async () => {
   const form = await event.request.formData();const file = form.get('image');
   if(!(file instanceof File) || !['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5*1024*1024) return Response.redirect(new URL('/publish/?share=invalid',url.origin),303);
   const db = await openDb();await new Promise((resolve,reject)=>{const tx=db.transaction('images','readwrite');tx.objectStore('images').put(file,'pending');tx.oncomplete=resolve;tx.onerror=reject;});db.close();
   return Response.redirect(new URL('/publish/?share=ready',url.origin),303);
  })());
 } else if(event.request.mode === 'navigate' && event.request.method === 'GET') {
  event.respondWith(fetch(event.request).catch(()=>new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>You are offline</title><body style="font:18px/1.7 system-ui;padding:40px;background:#f8f6ee;color:#172e2a"><h1>Let’s reconnect.</h1><p>Reconnect to the internet, then refresh this page to load lessons or publish. Your image stays on your phone.</p></body></html>',{headers:{'Content-Type':'text/html; charset=utf-8'}})));
 }
});
function openDb(){return new Promise((resolve,reject)=>{const req=indexedDB.open('gurus-share',1);req.onupgradeneeded=()=>req.result.createObjectStore('images');req.onsuccess=()=>resolve(req.result);req.onerror=reject;});}
