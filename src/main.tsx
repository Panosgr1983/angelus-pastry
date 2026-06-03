// ──────────────────────────────────────────────
// Σημείο εισόδου — React + Vite
// ──────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Εγγραφή dev service worker για throttling (μόνο σε development)
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/dev-sw.js').then((reg) => {
      const tier = localStorage.getItem('angelus_speed_tier');
      if (reg.active) {
        reg.active.postMessage({ speedTier: tier || '2g' });
      } else {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ speedTier: tier || '2g' });
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
