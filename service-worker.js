const cacheName = 'v5';
const cacheAssets = [
    'index.html',
    // CSS files
    'css/minified/bootstrap.min.css',
    'css/minified/aos.min.css',
    'css/minified/style.min.css',
    'css/all.min.css',
    // Fonts
    'https://fonts.googleapis.com/css2?family=Ubuntu&family=Source+Sans+Pro&family=Pacifico&family=Merienda&family=Roboto:wght@300;400;500;700;900&display=swap',
    // Javascript
    'js/jquery-2.2.3.min.js',
    'js/minified/aos.min.js',
    'js/minified/online-resume.min.js',
    'js/minified/bootstrap.min.js',
    // images
    'images/about.jpg',
    'images/about2.jpg',
    'images/about3.jpg',
    'images/contact.jpg',
    'images/exprience.jpg',
    'images/services.jpg',
    'images/services2.jpg',
    'images/move-top.png',
    'images/overlay.png',
    // video
    'videos/banner-video.mp4'
];

// Install event - cache assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(cacheAssets);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', e => {
    // Skip chrome-extension requests
    if (e.request.url.startsWith('chrome-extension://')) {
        return;
    }
    
    e.respondWith(
        caches.match(e.request)
            .then(cachedResponse => {
                // Return cached response if found
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(e.request)
                    .then(networkResponse => {
                        // Clone the response
                        const responseClone = networkResponse.clone();
                        
                        // Open cache
                        caches.open(cacheName)
                            .then(cache => {
                                // Add response to cache if it's not a chrome-extension URL
                                if (!e.request.url.startsWith('chrome-extension://')) {
                                    cache.put(e.request, responseClone);
                                }
                            });
                            
                        return networkResponse;
                    });
            })
            .catch(() => {
                // Fallback for offline pages
                if (e.request.url.indexOf('.html') > -1) {
                    return caches.match('index.html');
                }
            })
    );
});