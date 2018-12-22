const CACHE_NAME = 'network-or-cache-v1';

// eslint-disable-next-line no-undef
const { assets } = serviceWorkerOption;
const urlsToCache = [...assets, '/'];

self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
));

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            if (response && response.status === 200
                || response &&  response.type === 'basic') {
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }

            return response;
          })
          .catch(() => cacheResponse);
      })
  );
});