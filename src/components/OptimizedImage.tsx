import { ImgHTMLAttributes } from 'react';
import { buildFullUrl } from '../lib/imageLoader';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  showBlur?: boolean;
};

export function OptimizedImage({ showBlur, className = '', src, width, ...props }: OptimizedImageProps) {
  const imgSrc = src && width
    ? buildFullUrl(String(src), typeof width === 'number' ? width : parseInt(String(width), 10) || 600)
    : src;

  return <img className={`object-cover ${className}`} src={imgSrc} width={width} {...props} />;
}
