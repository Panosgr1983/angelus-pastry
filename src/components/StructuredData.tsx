// ──────────────────────────────────────────────
// StructuredData — JSON-LD schema για SEO
// ──────────────────────────────────────────────
import { Helmet } from 'react-helmet-async';

// Δεδομένα LocalBusiness + AggregateRating
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Angelus Pastry & Bakery',
  image: 'https://angeluspastry.gr/logo.png',
  '@id': 'https://angeluspastry.gr',
  url: 'https://angeluspastry.gr',
  telephone: '+302114180215',
  priceRange: '€',
  servesCuisine: ['Ελληνική', 'French', 'Italian', 'Artisan Bakery'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Καββαδία 3 & Αρχιμήδους',
    addressLocality: 'Γαλάτσι',
    addressRegion: 'Αττική',
    postalCode: '111 46',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.018788,
    longitude: 23.752824,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '06:30',
      closes: '20:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '08:00',
      closes: '15:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Γαλάτσι' },
    { '@type': 'City', name: 'Αθήνα' },
  ],
  sameAs: [
    'https://instagram.com/angelusbakery',
    'https://facebook.com/angelusbakery',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: 138,
    bestRating: '5',
  },
};

export function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
    </Helmet>
  );
}
