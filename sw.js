const CACHE = 'rezim-offline-v2';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon.svg'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(names => Promise.all(names.filter(n=>n!==CACHE).map(n=>caches.delete(n)))));self.clients.claim();});
self.addEventListener('fetch', event => {if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));});
