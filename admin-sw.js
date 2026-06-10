self.addEventListener("install", () => {
  console.log("Admin SW instalado");
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
