// ──────────────────────────────────────────────
// ProductsByCategory — tabs + grid φιλτραρισμένα ανά κατηγορία
// ──────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from 'react';
import { useCategories, useProducts } from '../hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { adaptiveImage, adaptiveSrcset } from '../lib/imageLoader';

export function ProductsByCategory() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl ?? null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const tabsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll για tabs στο hover (mouse-driven scroll)
  const autoScroll = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const mid = rect.width / 2;
    const speed = Math.min(Math.abs(x - mid) / mid, 1) * 8;
    const dir = x < mid ? -1 : 1;
    el.scrollLeft += dir * speed;
    animationRef.current = requestAnimationFrame(() => autoScroll(clientX));
  }, []);

  // Συγχρονισμός URL params με επιλεγμένη κατηγορία
  useEffect(() => {
    if (categories.length > 0) {
      if (categoryFromUrl && categories.some((c) => c.id === categoryFromUrl)) {
        setSelectedCategory(categoryFromUrl);
        setSearchParams({}, { replace: true });
      } else if (!selectedCategory) {
        setSelectedCategory(categories[0].id);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, categoryFromUrl, setSearchParams]);

  if (categoriesLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div id="collection-label" className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4 scroll-mt-[110px]">
            Η Συλλογή μας
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Τα Προϊόντα μας
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Φρέσκα προϊόντα κάθε μέρα, φτιαγμένα με αγάπη και τις καλύτερες πρώτες ύλες
          </p>
        </div>

        {/* Category tabs με hover scroll */}
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-2 mb-10"
          onMouseMove={(e) => {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = requestAnimationFrame(() => autoScroll(e.clientX));
          }}
          onMouseLeave={() => cancelAnimationFrame(animationRef.current)}
        >
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-max mx-auto px-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchParams({ category: category.id }, { replace: true });
                  if (window.innerWidth < 768) {
                    setTimeout(() => {
                      tabsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                }}
                className={`shrink-0 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div ref={tabsEndRef} id="tabs-end" className="scroll-mt-[140px]" />
        {selectedCategory && (
          <p className="text-center text-gray-500 text-sm mb-8 -mt-4">
            {categories.find((category) => category.id === selectedCategory)?.description}
          </p>
        )}

        {/* Product grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="animate-fade-in-up group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={adaptiveImage(product.image_url, 400)}
                  alt={product.name}
                  width={400}
                  height={400}
                  loading="lazy"
                  srcSet={adaptiveSrcset(product.image_url, [200, 400, 600])}
                  sizes={adaptiveSrcset(product.image_url, [200, 400, 600]) ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" : undefined}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.top && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                    Top
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3 relative">
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-500" />
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Δεν βρέθηκαν προϊόντα σε αυτήν την κατηγορία</p>
          </div>
        )}
      </div>
    </section>
  );
}
