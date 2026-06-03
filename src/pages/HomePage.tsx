// ──────────────────────────────────────────────
// HomePage — κεντρική σελίδα
// ──────────────────────────────────────────────
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { ProductsByCategory } from '../components/ProductsByCategory';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Reviews } from '../components/Reviews';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <>
      <SEO
        title="Angelus Pastry & Bakery στο Γαλάτσι"
        description="Φρέσκο χειροποίητο ψωμί, sourdough, σφολιάτες, κουλούρια και γλυκά στο Γαλάτσι. Παράδοση & ποιότητα από το 2022. Παραγγελία στο 21 1418 0215."
      />
      <Hero />
      <FeaturedProducts />
      <ProductsByCategory />
      <About />
      <Reviews />
      <Contact />
    </>
  );
}
