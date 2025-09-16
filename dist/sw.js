// Financial Empire Service Worker
// Provides caching for improved performance

const CACHE_NAME = "financial-empire-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/global.css",
  "/manifest.json",
  // Add other static assets
];

const API_CACHE_NAME = "financial-empire-api-v1";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("Service worker installed successfully");
        self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log("Service worker activated");
        self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with cache-first strategy for non-critical data
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Check if cached response is still fresh
          if (cachedResponse) {
            const cachedDate = new Date(cachedResponse.headers.get("date"));
            const now = new Date();
            if (now - cachedDate < CACHE_DURATION) {
              return cachedResponse;
            }
          }

          // Fetch fresh data
          return fetch(request)
            .then((response) => {
              // Only cache successful responses
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // Return cached version if network fails
              return (
                cachedResponse ||
                new Response("Network unavailable", {
                  status: 503,
                  statusText: "Service Unavailable",
                })
              );
            });
        });
      }),
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/");
          }
        });
    }),
  );
});

// Handle background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle any queued actions when back online
      console.log("Background sync triggered"),
    );
  }
});

// Handle push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      tag: "financial-empire-notification",
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "View Dashboard",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/dashboard"));
  }
});

// Performance monitoring
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "PERFORMANCE_REPORT") {
    // Log performance metrics
    console.log("Performance report:", event.data.metrics);
  }
});
