// Placeholder Firebase Messaging Service Worker
// This file prevents 500 errors when Firebase messaging is not actively used

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
