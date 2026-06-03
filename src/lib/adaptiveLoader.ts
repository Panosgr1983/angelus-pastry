const SPEED_KEY = 'angelus_speed_tier';
const COMPRESSION_MAP_KEY = 'angelus_compression_map';

export type QualityTier = 'eco' | 'low' | 'good' | 'best';

export type CompressionMode = string;

export const COMPRESSION_OPTIONS = [
  { value: 'f_webp,q_auto:eco', label: 'WebP Eco', benchmark: '19KB' },
  { value: 'f_webp,q_auto:low', label: 'WebP Low', benchmark: '20KB' },
  { value: 'f_webp,q_auto:good', label: 'WebP Good', benchmark: '23KB' },
  { value: 'f_webp,q_auto:best', label: 'WebP Best', benchmark: '29KB' },
  { value: 'f_auto,q_auto', label: 'Auto', benchmark: '28KB' },
  { value: '', label: 'Raw', benchmark: '81KB' },
];

const DEFAULT_MAP: Record<string, string> = {
  'slow-2g': 'f_webp,q_auto:eco',
  '2g': 'f_webp,q_auto:eco',
  '3g': 'f_webp,q_auto:low',
  '4g': 'f_webp,q_auto:good',
};

function getConnectionType(): string {
  if (typeof navigator === 'undefined') return '4g';
  const override = localStorage.getItem(SPEED_KEY);
  if (override) return override;
  const conn = (navigator as any).connection;
  if (conn?.effectiveType) return conn.effectiveType;
  return '4g';
}

export function getCompressionMode(): string {
  const connection = getConnectionType();
  try {
    const map = JSON.parse(localStorage.getItem(COMPRESSION_MAP_KEY) || '{}');
    if (map[connection]) return map[connection];
  } catch {}
  return DEFAULT_MAP[connection] || 'f_webp,q_auto:good';
}

export function getCompressionModeForTier(tier: string): string {
  try {
    const map = JSON.parse(localStorage.getItem(COMPRESSION_MAP_KEY) || '{}');
    if (map[tier]) return map[tier];
  } catch {}
  return DEFAULT_MAP[tier] || 'f_webp,q_auto:good';
}

export function setCompressionModeForTier(tier: string, mode: string): void {
  try {
    const map = JSON.parse(localStorage.getItem(COMPRESSION_MAP_KEY) || '{}');
    map[tier] = mode;
    localStorage.setItem(COMPRESSION_MAP_KEY, JSON.stringify(map));
  } catch {}
}

export function buildCloudinaryUrl(baseUrl: string): string {
  const CLOUDINARY_BASE = 'https://res.cloudinary.com/duvtwanvc/image/upload';
  if (!baseUrl.startsWith(CLOUDINARY_BASE)) return baseUrl;

  const mode = getCompressionMode();
  if (!mode) return baseUrl;

  return baseUrl.replace('/upload/', `/upload/${mode}/`);
}

export function getBlurPlaceholderUrl(baseUrl: string): string {
  if (!baseUrl.includes('res.cloudinary.com')) return baseUrl;
  return baseUrl.replace('/upload/', '/upload/w_30,e_blur:500,f_webp,q_auto:eco/');
}
