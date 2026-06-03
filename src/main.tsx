// ──────────────────────────────────────────────
// Σημείο εισόδου — React + Vite
// ──────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Δημιουργία root renderer και εκκίνηση εφαρμογής
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
