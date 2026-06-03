const CLOUDINARY_BASE = 'https://res.cloudinary.com/duvtwanvc/image/upload';

function isCloudinary(url: string): boolean {
  return url.startsWith(CLOUDINARY_BASE);
}

export function buildFullUrl(url: string, width: number): string {
  if (!isCloudinary(url)) return url;
  const w = Math.max(width, 40);
  return url.replace('/upload/', `/upload/w_${w}/`);
}
