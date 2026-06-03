import { cloudinaryOptimize, cloudinarySrcset } from './cloudinary';

function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  if (!conn?.effectiveType) return false;
  return ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
}

export function adaptiveImage(url: string, width?: number): string {
  if (isSlowConnection() && width) {
    return cloudinaryOptimize(url, width);
  }
  return url;
}

export function adaptiveSrcset(url: string, widths: number[]): string | undefined {
  if (isSlowConnection()) {
    return cloudinarySrcset(url, widths);
  }
  return undefined;
}
