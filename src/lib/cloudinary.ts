const CLOUDINARY_BASE = 'https://res.cloudinary.com/duvtwanvc/image/upload';

export function cloudinaryOptimize(url: string, width?: number): string {
  if (!url.startsWith(CLOUDINARY_BASE)) return url;
  if (!width) return url;
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  return `${parts[0]}/upload/c_fill,w_${width}/${parts[1]}`;
}

export function cloudinarySrcset(url: string, widths: number[]): string {
  return widths.map((w) => `${cloudinaryOptimize(url, w)} ${w}w`).join(', ');
}
