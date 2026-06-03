import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', 'public');

const categories = [
  { id: 'psomia', name: 'Ψωμιά' },
  { id: 'sfoliates', name: 'Σφολιάτες' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'koulouria', name: 'Κουλούρια' },
  { id: 'glyka-atomika', name: 'Γλυκά Ατομικά' },
  { id: 'cakes-tsourekia', name: 'Cakes & Τσουρέκια' },
  { id: 'kafedes', name: 'Καφέδες' },
  { id: 'donuts-muffins', name: 'Donuts & Muffins' },
  { id: 'bares', name: 'Μπάρες' },
  { id: 'voutimata', name: 'Βουτήματα' },
  { id: 'kritsinia', name: 'Κριτσίνια' },
  { id: 'pagotinia', name: 'Παγωτίνια' },
  { id: 'anapsyktika', name: 'Αναψυκτικά' },
];

const products = [
  'psomi-xoriatiko', 'psomi-polisporo', 'lagana', 'psomi-olikis-alesis', 'mpagketa-xoriatiki',
  'rustic-sourdough', 'psomi-zeas', 'psomi-xoriatiko-me-elies', 'psomi-kalampokiou',
  'ciabatta-artisan', 'psomi-me-cranberries-kai-karidia', 'psomi-sikalis', 'psomi-ktasporo',
  'walnut-sourdough', 'brioche-bread', 'pretzel-bread', 'seeded-baguette', 'milk-bread-shokupan',
  'potato-bread', 'fougasse', 'black-charcoal-bread', 'olive-ciabatta',
  'pitsa', 'peinirli', 'pitsa-me-loukaniko', 'piroski-loukaniko', 'krouasan-special',
  'krouasan-sokolata', 'mpougatsa-serrwn-me-krema', 'zamponoturopita', 'gravieropita',
  'turopita-sfoliata', 'turopita-kourou', 'spanakopita', 'kotopita',
  'bagel-polysporo-galopoula', 'sandwich-zampon-kai-gouda', 'mini-brioche-zampon',
  'krouasan-galopoula', 'sandwich-galopoula-kai-gouda', 'brioche-caesars',
  'koulouri-galopoula',
  'koulouri-thessalonikis', 'koulouri-afrato-me-sousami', 'trokoulouro',
  'koulouri-kalampokiou', 'koulouri-polisporo', 'koulouri-me-stafida', 'koulouri-olikis-alesis',
  'profiterol-sokolata-galakto', 'profiterol-sokolata-ygeia', 'profiterol-cookies',
  'profiterol-oreo', 'cheesecake-lemoni', 'cheesecake-fraoula', 'cheesecake-agriokeraso',
  'mpampas', 'banoffee', 'tiramisu', 'ekmek-kantaifi',
  'tsourekia-550gr', 'tsourekia-1kg', 'tsourekia-120gr', 'tsourekia-prava-sokolata-130gr',
  'tsourekia-me-kastano-130gr', 'tsourekia-me-marmelada-verikoko-130gr', 'cake-vania-450gr',
  'cake-sokolata-450gr', 'cake-vania-kai-sokolata-450gr', 'cake-choris-zachari-450gr',
  'espresso-monos', 'espresso-diplos', 'cappuccino', 'freddo-espresso', 'freddo-cappuccino',
  'latte', 'ellinikos-kafes', 'sokolata-rofima',
  'donut-prava-kai-sokolata', 'donut-prava-kai-mpiskoto', 'donut-bueno-kai-sokolata',
  'muffin-vania-kai-lemoni', 'muffin-vania-kai-prava', 'muffin-red-velvet',
  'muffin-sokolata-kai-banana', 'muffin-bueno', 'berliner-prava-sokolata', 'berliner-lemoni',
  'berliner-karamela', 'loukoumas-me-zachari', 'krouasan-prava', 'cinnamon-roll',
  'soft-cookie-vania', 'soft-cookie-sokolata', 'soft-cookie-fystiki', 'soft-cookie-red-velvet',
  'mpara-sokolata-kai-banana', 'mpara-red-velvet', 'mpara-mpiskoto',
  'mpara-sokolata-choris-zachari', 'mpara-vania-choris-zachari',
  'mpara-amuggalo-portokali-kai-karuda', 'mpara-banoffee', 'mpara-ginger-kai-lemoni',
  'mpiskota-vania', 'mpiskota-sokolata', 'mpiskota-vromis-choco-chips', 'pti-four-marmelada-verikoko',
  'koulourakia-zachari-kai-kanela', 'koulourakia-sousami-kai-stafida', 'moustokouloura-tragana',
  'koulourakia-choris-zachari', 'mpiskota-me-file-amugdalou', 'koulourakia-smurneika',
  'kritsinia-me-turi', 'kritsinia-polyspora', 'kritsinia-karoto', 'kritsinia-ktaspora',
  'pagoto-vania', 'pagoto-sokolata', 'pagoto-fraoula', 'pagotini-xulaki',
  'coca-cola-330ml', 'coca-cola-zero-330ml', 'sprite-330ml', 'fanta-portokali-330ml',
  'nero-500ml', 'chimos-portokali', 'lemonada-spitiki',
];

const siteUrl = 'https://angeluspastry.gr';
const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: siteUrl, priority: '1.0', changefreq: 'weekly' },
  { loc: `${siteUrl}/xondriki`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${siteUrl}/gdpr`, priority: '0.3', changefreq: 'monthly' },
  ...categories.map((cat) => ({
    loc: `${siteUrl}/category/${cat.id}`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  ...products.map((slug) => ({
    loc: `${siteUrl}/product/${slug}`,
    priority: '0.7',
    changefreq: 'weekly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`✅ Sitemap generated: ${urls.length} URLs → public/sitemap.xml`);
