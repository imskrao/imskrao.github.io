const cacheName = 'v2';
const cacheAssets = [
    'index.html',
    // CSS files
    'css/bootstrap.css',
    'css/animation-aos.css',
    'css/aos.css',
    'css/style.css',
    'css/all.min.css',
    // Fonts
    'https://fonts.googleapis.com/css?family=Ubuntu&display=swap',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
    '//fonts.googleapis.com/css?family=Pacifico&amp;subset=cyrillic,latin-ext,vietnamese',
    'https://fonts.googleapis.com/css?family=Merienda',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap',
    // Javascript
    'js/jquery-2.2.3.min.js',
    'js/aos.js',
    'js/online-resume.js',
    'js/bootstrap.js',
    // image
    'images/about.jpg'
]


// call install event

self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed')
})

// call activate event

self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated')
    // Remove unwanted chaches
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })
    )
})

// Call fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy of response
                const resClone = res.clone()
                // open caches
                caches.open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(e.request, resClone)
                    })
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    )
})