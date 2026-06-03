self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

let speedTier = '4g';

self.addEventListener('message', (e) => {
  if (e.data?.speedTier) {
    speedTier = e.data.speedTier;
  }
  if (e.data?.clearCache) {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});

const delays = { 'slow-2g': 1500, '2g': 800, '3g': 400, '4g': 0 };

function shouldThrottle(url) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname) || url.hostname.includes('cloudinary') || url.hostname.includes('pexels');
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (!shouldThrottle(url)) return;

  const delay = delays[speedTier] || 0;

  e.respondWith(
    delay > 0
      ? new Promise((resolve) => setTimeout(() => resolve(fetch(e.request)), delay))
      : fetch(e.request)
  );
});
