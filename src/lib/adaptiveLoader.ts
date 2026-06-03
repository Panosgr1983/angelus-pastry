const SPEED_KEY = 'angelus_speed_tier';
const COMPRESSION_MAP_KEY = 'angelus_compression_map';

export const COMPRESSION_OPTIONS = [
  { value: 'f_webp,q_auto:eco', label: 'WebP Eco', benchmark: '~17KB' },
  { value: 'f_webp,q_auto:low', label: 'WebP Low', benchmark: '~20KB' },
  { value: 'f_webp,q_auto:good', label: 'WebP Good', benchmark: '~28KB' },
  { value: 'f_webp,q_auto:best', label: 'WebP Best', benchmark: '~38KB' },
  { value: 'f_auto,q_auto', label: 'Auto', benchmark: '~28KB' },
  { value: '', label: 'Raw', benchmark: '~162KB' },
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

function getAdaptiveWidth(requestedWidth: number): number {
  const connection = getConnectionType();
  const device = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const viewport = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxWidth = Math.max(viewport, requestedWidth);

  let cap: number;
  switch (connection) {
    case 'slow-2g':
    case '2g':
      cap = 300;
      break;
    case '3g':
      cap = 500;
      break;
    case '4g':
      cap = 800;
      break;
    default:
      cap = 1200;
      break;
  }

  if (device) {
    cap = Math.min(cap, Math.max(viewport, 300));
  }

  return Math.min(requestedWidth, cap);
}

export function buildCloudinaryUrl(baseUrl: string, requestedWidth?: number): string {
  const CLOUDINARY_BASE = 'https://res.cloudinary.com/duvtwanvc/image/upload';
  if (!baseUrl.startsWith(CLOUDINARY_BASE)) return baseUrl;

  try {
    const map = JSON.parse(localStorage.getItem(COMPRESSION_MAP_KEY) || '{}');
    const connection = getConnectionType();
    const mode = map[connection] || DEFAULT_MAP[connection];

    if (mode === '' || !mode) return baseUrl;

    const width = getAdaptiveWidth(requestedWidth || 400);
    return baseUrl.replace('/upload/', `/upload/w_${width},${mode}/`);
  } catch {
    return baseUrl;
  }
}

export function getBlurPlaceholderUrl(baseUrl: string): string {
  if (!baseUrl.includes('res.cloudinary.com')) return baseUrl;
  return baseUrl.replace('/upload/', '/upload/w_30,e_blur:500,f_webp,q_auto:eco/');
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
