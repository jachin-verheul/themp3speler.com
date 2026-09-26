// Minimal service worker for DualStream.
// Its only job is to satisfy the browser's installability requirements
// (a registered service worker with a fetch handler). It does not cache
// anything itself, so the app always loads fresh content.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
