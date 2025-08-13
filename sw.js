// Minimal SW; forces update on each deploy by versioning (?v=7) and skipWaiting
const CACHE_NAME = "meal-planner-v7";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
