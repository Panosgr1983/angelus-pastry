// ──────────────────────────────────────────────
// Σημείο εισόδου — React + Vite
// ──────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { getSpeedTier } from './lib/connectionMonitor';

// Εγγραφή dev service worker για throttling (μόνο σε development)
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/dev-sw.js').then((reg) => {
      const tier = getSpeedTier();
      const msg = { speedTier: tier };
      if (reg.active) {
        reg.active.postMessage(msg);
      } else {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage(msg);
          }
        });
      }
    });
  });
}

// Δημιουργία root renderer και εκκίνηση εφαρμογής
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
