// ──────────────────────────────────────────────
// FeaturedProducts — grid με προτεινόμενα προϊόντα
// ──────────────────────────────────────────────
import { useFeaturedProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Loader2 } from 'lucide-react';

export function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();

  // Loading spinner όσο φορτώνουν τα δεδομένα
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            Τα Δημοφιλέστερα
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Προτεινόμενα Προϊόντα
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ανακαλύψτε τις αγαπημένες επιλογές των πελατών μας
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
