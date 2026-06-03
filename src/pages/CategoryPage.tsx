// ──────────────────────────────────────────────
// CategoryPage — προϊόντα ανά κατηγορία
// ──────────────────────────────────────────────
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getCategory, getProductsByCategory } from '../hooks/useProducts';

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategory(categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-center text-gray-600">Η κατηγορία δεν βρέθηκε</p>
      </div>
    );
  }

  // JSON-LD breadcrumb structured data
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Αρχική', item: 'https://angeluspastry.gr' },
      { '@type': 'ListItem', position: 2, name: category.name, item: `https://angeluspastry.gr/category/${category.id}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12">
      <Helmet>
        <title>{`${category.name} | Angelus Pastry & Bakery`}</title>
        <meta name="description" content={`${category.name}: ${category.description}. Ανακαλύψτε τα χειροποίητα προϊόντα μας στο Angelus Pastry & Bakery στο Γαλάτσι.`} />
        <meta property="og:title" content={`${category.name} | Angelus Pastry & Bakery`} />
        <meta property="og:description" content={`${category.name}: ${category.description}.`} />
        <link rel="canonical" href={`https://angeluspastry.gr/category/${category.id}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Αρχική', to: '/#hero' },
          { label: 'Προϊόντα', to: '/#collection-label' },
          { label: category.name, to: `/?category=${category.id}#tabs-end` },
        ]} />

        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            Κατηγορία
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">{category.description}</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <p className="text-gray-500 text-lg">
              Δεν υπάρχουν προϊόντα σε αυτήν την κατηγορία
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
