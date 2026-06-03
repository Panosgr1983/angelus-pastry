import { ImgHTMLAttributes } from 'react';
import { buildFullUrl } from '../lib/imageLoader';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  showBlur?: boolean;
};

export function OptimizedImage({ showBlur, className = '', src, ...props }: OptimizedImageProps) {
  const imgSrc = src ? buildFullUrl(String(src), 0) : src;

  return <img className={`object-cover ${className}`} src={imgSrc} {...props} />;
}
