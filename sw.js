var CACHE_NAME = 'simple-PWA-localStorage';
var urlsToCache = [
    './',
    './index.html',
    './about.html',
    './legal.html',
    './album.html',
    './app.html',
    './artist.html',
    './favourites.html',
    './track.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js',
    'https://kit.fontawesome.com/6c8f33a97a.js',
    './css/master.css',
    './css/aboutus.css',
    './css/app.css',
    './css/Favourites.css',
    './css/legal.css',
    './css/track.css',
    './css/index.css',
    './js/album.js',
    './js/search.js',
    './js/search_index.js',
    './js/artist.js',
    './js/track.js',
    './js/Favourites.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});