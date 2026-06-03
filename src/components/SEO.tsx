// ──────────────────────────────────────────────
// SEO — δυναμικά meta tags για κάθε σελίδα
// ──────────────────────────────────────────────
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

export function SEO({ title, description, ogImage = '/og-image.png', canonical = 'https://angeluspastry.gr' }: SEOProps) {
  const fullTitle = `${title} | Angelus Pastry & Bakery`;
  const url = canonical;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
