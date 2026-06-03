import { buildCloudinaryUrl } from './adaptiveLoader';

export function buildFullUrl(url: string, _width: number): string {
  return buildCloudinaryUrl(url);
}
