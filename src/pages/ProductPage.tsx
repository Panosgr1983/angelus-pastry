// ──────────────────────────────────────────────
// ProductPage — λεπτομέρειες προϊόντος + related
// ──────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { getCategory, getProduct, getProductsByCategory } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { adaptiveImage, adaptiveSrcset } from '../lib/imageLoader';

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // Scroll πάνω κάθε φορά που αλλάζει προϊόν
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Preload εικόνες related products
  useEffect(() => {
    relatedProducts.forEach((rp) => {
      const img = new Image();
      img.src = adaptiveImage(rp.image_url, 600);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const product = getProduct(productId);
  const category = getCategory(product?.category_id);
  const relatedProducts = getProductsByCategory(product?.category_id)
    .filter((relatedProduct) => relatedProduct.id !== productId);

  // Carousel scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const amount = el.clientWidth * 0.8;
      el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      updateScrollButtons();
      el.addEventListener('scroll', updateScrollButtons);
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, [relatedProducts.length]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-center text-gray-600">Το προϊόν δεν βρέθηκε</p>
      </div>
    );
  }

  // JSON-LD breadcrumb + product schema
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Αρχική', item: 'https://angeluspastry.gr' },
      ...(category ? [{ '@type': 'ListItem', position: 2, name: category.name, item: `https://angeluspastry.gr/category/${category.id}` }] : []),
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://angeluspastry.gr/product/${product.id}` },
    ],
  };

  const productJson = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    description: product.description,
    category: category?.name ?? '',
    brand: { '@type': 'Brand', name: 'Angelus Pastry & Bakery' },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://angeluspastry.gr/product/${product.id}`,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12">
      <Helmet>
        <title>{`${product.name} | Angelus Pastry & Bakery`}</title>
        <meta name="description" content={`${product.name}: ${product.description}. Χειροποίητο από το Angelus Pastry & Bakery στο Γαλάτσι.`} />
        <meta property="og:title" content={`${product.name} | Angelus Pastry & Bakery`} />
        <meta property="og:description" content={`${product.name}: ${product.description.slice(0, 120)}`} />
        <meta property="og:image" content={product.image_url} />
        <link rel="canonical" href={`https://angeluspastry.gr/product/${product.id}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJson) }} />
        <link rel="preload" as="image" href={adaptiveImage(product.image_url, 900)} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Αρχική', to: '/#hero' },
          { label: 'Προϊόντα', to: '/#collection-label' },
          ...(category ? [{ label: category.name, to: `/?category=${category.id}#tabs-end` }] : []),
        ]} />

        {/* Product details grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <img
              src={adaptiveImage(product.image_url, 900)}
              alt={product.name}
              width={900}
              height={600}
              loading="eager"
              srcSet={adaptiveSrcset(product.image_url, [600, 900, 1200])}
              sizes={adaptiveSrcset(product.image_url, [600, 900, 1200]) ? "(max-width: 768px) 100vw, 50vw" : undefined}
              className="w-full aspect-[3/2] md:aspect-auto md:h-[600px] object-cover rounded-3xl shadow-2xl"
            />
            {product.featured && (
              <div className="absolute top-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                Προτεινόμενο
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            {category && (
              <Link
                to={`/?category=${category.id}#tabs-end`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
              >
                <Tag size={16} />
                {category.name}
              </Link>
            )}

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="prose prose-lg text-gray-600">
              <p className="text-xl leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Χαρακτηριστικά */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Χαρακτηριστικά
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-xl">✓</span>
                  <span>Φρέσκο καθημερινά</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-xl">✓</span>
                  <span>Χωρίς συντηρητικά</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-xl">✓</span>
                  <span>Premium υλικά</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 text-xl">✓</span>
                  <span>Χειροποίητο</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button
                onClick={() => {
                  navigate('/', { replace: true });
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="inline-block px-8 py-4 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Επικοινωνήστε για Παραγγελία
              </button>
            </div>
          </div>
        </div>

        {/* Related products carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Σχετικά Προϊόντα
            </h2>
            <div className="relative group/carousel">
              {canScrollLeft && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-100"
                  aria-label="Προηγούμενα"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400"
              >
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="min-w-[350px] md:min-w-[400px] snap-start">
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
              </div>
              {canScrollRight && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-100"
                  aria-label="Επόμενα"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
