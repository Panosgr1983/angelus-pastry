import { ImgHTMLAttributes } from 'react';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  showBlur?: boolean;
};

export function OptimizedImage({ showBlur, className = '', ...props }: OptimizedImageProps) {
  return <img className={`object-cover ${className}`} {...props} />;
}
