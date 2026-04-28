const CACHE_NAME = 'scorpion-tactical-v1';
const assets = [
  './',
  'index.html',
  'icon.png'
];

// Установка: кэшируем файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Кэширование ресурсов для оффлайн');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Активация: чистим старый кэш
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Перехват запросов: берем из кэша, если нет сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
