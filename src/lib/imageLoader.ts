const CLOUDINARY_BASE = 'https://res.cloudinary.com/duvtwanvc/image/upload';

function isCloudinary(url: string): boolean {
  return url.startsWith(CLOUDINARY_BASE);
}

export function buildFullUrl(url: string, _width: number): string {
  if (!isCloudinary(url)) return url;
  return url.replace('/upload/', '/upload/w_auto,q_auto:low/');
}
