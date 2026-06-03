import { buildCloudinaryUrl } from './adaptiveLoader';

export function buildFullUrl(url: string, width: number): string {
  return buildCloudinaryUrl(url, width || 400);
}
