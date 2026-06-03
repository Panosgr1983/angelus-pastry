const STORAGE_KEY = 'angelus_speed_tier';

export type QualityTier = 'eco' | 'low' | 'good' | 'best';

export interface AdaptiveConfig {
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

export function getAdaptiveConfig(): AdaptiveConfig {
  const connection = getConnectionType();

  let quality: QualityTier;
  switch (connection) {
    case 'slow-2g':
    case '2g':
      quality = 'eco';
      break;
    case '3g':
      quality = 'low';
      break;
    case '4g':
      quality = 'good';
      break;
    default:
      quality = 'best';
      break;
  }

  return { quality };
}

export function buildCloudinaryUrl(baseUrl: string, config: AdaptiveConfig): string {
  const { quality } = config;
  const transform = `f_webp,q_auto:${quality}`;
  return baseUrl.replace('/upload/', `/upload/${transform}/`);
}

export function getBlurPlaceholderUrl(baseUrl: string): string {
  if (!baseUrl.includes('res.cloudinary.com')) return baseUrl;
  return baseUrl.replace('/upload/', '/upload/w_30,e_blur:500,f_webp,q_auto:eco/');
}
