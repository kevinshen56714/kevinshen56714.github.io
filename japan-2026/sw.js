const CACHE = 'autumn-japan-2026-20261008-v3';
const FILES = ['./', './index.html', './styles.css', './data.js', './app.js', './en.js', './i18n.js', './manifest-en.webmanifest', './manifest.webmanifest', './assets/fuji.svg', './assets/tokyo.svg', './assets/kyoto.svg', './assets/icon.svg', './assets/icon-192.png', './assets/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('autumn-japan-2026-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(event.request);
      if (response.ok && response.type === 'basic') await cache.put(event.request, response.clone());
      return response;
    } catch {
      return await cache.match(event.request, { ignoreSearch: true }) || (event.request.mode === 'navigate' ? await cache.match('./index.html') : Response.error());
    }
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'CACHE_STATUS') event.waitUntil(caches.open(CACHE).then(cache => cache.match('./index.html')).then(response => { if (response) event.source?.postMessage({ type: 'CACHE_READY' }); }));
});
