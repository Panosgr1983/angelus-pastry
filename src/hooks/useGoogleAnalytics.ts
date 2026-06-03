// ──────────────────────────────────────────────
// Google Analytics — initialisation + page tracking
// ──────────────────────────────────────────────
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = 'G-PK9QZ4KW02';

// Φόρτωση gtag script δυναμικά (αν δεν έχει ήδη φορτωθεί)
function loadGtag() {
  if (document.querySelector(`script[src*="${GA_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// Track page views σε κάθε route change
export function GoogleAnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    loadGtag();
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', GA_ID, { page_path: pathname });
    }
  }, [pathname]);

  return null;
}
