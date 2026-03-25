// Service Worker for PWA caching - high performance offline support
const CACHE_NAME = 'highperf-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/assets/css/main.min.css',
  '/assets/css/vendor.min.css',
  '/assets/js/main.min.js',
  '/assets/js/vendor.min.js',
  '/assets/js/lazyload.js',
  '/assets/images/hero.webp',
  '/assets/images/product1.webp',
  '/assets/images/product2.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

