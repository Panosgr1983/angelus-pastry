import { getAdaptiveConfig, buildCloudinaryUrl } from './adaptiveLoader';

export function buildFullUrl(url: string, _width: number): string {
  const CLOUDINARY_BASE = 'https://res.cloudinary.com/duvtwanvc/image/upload';
  if (!url.startsWith(CLOUDINARY_BASE)) return url;

  const config = getAdaptiveConfig();
  return buildCloudinaryUrl(url, config);
}
