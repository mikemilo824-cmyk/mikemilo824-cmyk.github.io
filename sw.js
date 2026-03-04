const CACHE = "hammerbid-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/sw.js",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});