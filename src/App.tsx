// ──────────────────────────────────────────────
// Root component — Router, SEO, Header, Footer
// ──────────────────────────────────────────────
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleAnalyticsTracker } from './hooks/useGoogleAnalytics';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { GDPRPage } from './pages/GDPRPage';
import { B2BPage } from './pages/B2BPage';
import { StructuredData } from './components/StructuredData';
import { DevSpeedSimulator } from './components/DevSpeedSimulator';

// Αυτόματο scroll στο hash μετά από πλοήγηση
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [hash]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <StructuredData />
        <ScrollToHash />
        <GoogleAnalyticsTracker />
        {import.meta.env.DEV && <DevSpeedSimulator />}
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/xondriki" element={<B2BPage />} />
              <Route path="/gdpr" element={<GDPRPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
