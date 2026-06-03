const STORAGE_KEY = 'angelus_speed_tier';

export type QualityTier = 'eco' | 'low' | 'good' | 'best';

export interface AdaptiveConfig {
  width: number;
  quality: QualityTier;
}

function getConnectionType(): string {
  if (typeof navigator === 'undefined') return '4g';

  const override = localStorage.getItem(STORAGE_KEY);
  if (override) return override;

  const conn = (navigator as any).connection;
  if (conn?.effectiveType) return conn.effectiveType;

  return '4g';
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  const w = window.innerWidth;

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    return w < 480 ? 'mobile' : 'tablet';
  }
  if (w < 768) return 'tablet';
  return 'desktop';
}

export function getAdaptiveConfig(requestedWidth: number): AdaptiveConfig {
  const connection = getConnectionType();
  const device = getDeviceType();
  const viewport = typeof window !== 'undefined' ? window.innerWidth : 1200;

  let width = Math.min(requestedWidth, Math.max(viewport, 400));

  let quality: QualityTier;
  switch (connection) {
    case 'slow-2g':
    case '2g':
      quality = 'eco';
      width = Math.min(width, 300);
      break;
    case '3g':
      quality = 'low';
      width = Math.min(width, 500);
      break;
    case '4g':
      quality = 'good';
      width = Math.min(width, 800);
      break;
    default:
      quality = 'best';
      width = Math.min(width, 1200);
      break;
  }

  if (device === 'mobile') {
    width = Math.min(width, Math.max(viewport, 300));
  }

  return { width, quality };
}

export function buildCloudinaryUrl(baseUrl: string, config: AdaptiveConfig): string {
  const { width, quality } = config;
  const transform = `f_webp,q_auto:${quality},w_${width}`;
  return baseUrl.replace('/upload/', `/upload/${transform}/`);
}

export function getBlurPlaceholderUrl(baseUrl: string): string {
  if (!baseUrl.includes('res.cloudinary.com')) return baseUrl;
  return baseUrl.replace('/upload/', '/upload/w_30,e_blur:500,f_webp,q_auto:eco/');
}
