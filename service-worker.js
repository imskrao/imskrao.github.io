/**
 * Service worker - offline support for a static site.
 *
 * Strategy differs by request type, deliberately:
 *   - Navigations: network first. The previous version served HTML cache-first,
 *     which left returning visitors pinned to a stale page until the cache name
 *     changed. Content correctness beats a few hundred milliseconds here.
 *   - Same-origin assets: stale-while-revalidate. Fingerprint-free filenames
 *     mean we serve instantly and refresh in the background.
 *   - Cross-origin (fonts): cache first, since those URLs are immutable.
 */

const VERSION = 'v6';
const SHELL = `shell-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

const PRECACHE = [
  '/',
  '/about/',
  '/work/',
  '/contact/',
  '/404.html',
  '/css/app.css',
  '/js/main.js',
  '/images/icons.svg',
  '/images/santosh.jpg',
  '/favicon.svg',
  '/site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      // addAll() is all-or-nothing; one 404 would abort the whole install and
      // leave the site with no offline support at all.
      .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== SHELL && name !== RUNTIME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // HTML navigations - network first, cached copy as the offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match('/404.html'))
    );
    return;
  }

  // Cross-origin (Google Fonts) - cache first; these URLs never change content.
  if (url.origin !== self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            // Opaque responses are fine to store, but only if the fetch worked.
            if (response.ok || response.type === 'opaque') {
              const copy = response.clone();
              caches.open(RUNTIME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
    return;
  }

  // Same-origin assets - stale while revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
