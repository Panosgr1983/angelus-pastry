import { useRef, useState, useEffect, ImgHTMLAttributes } from 'react';
import { buildFullUrl } from '../lib/imageLoader';
import { getBlurPlaceholderUrl } from '../lib/adaptiveLoader';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  showBlur?: boolean;
};

export function OptimizedImage({ showBlur, className = '', src, width, ...props }: OptimizedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(!showBlur);
  const [loaded, setLoaded] = useState(false);

  const imgSrc = src ? buildFullUrl(String(src), Number(width) || 400) : src;
  const blurSrc = src && showBlur ? getBlurPlaceholderUrl(String(src)) : null;

  const isEager = props.loading === 'eager';

  useEffect(() => {
    if (!showBlur || isEager || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [showBlur, isEager]);

  const handleLoad = () => setLoaded(true);

  const imgEl = (
    <img
      key={imgSrc}
      src={inView || isEager ? imgSrc : undefined}
      className={`transition-opacity duration-500 ${
        showBlur && !loaded ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      onLoad={handleLoad}
      onError={() => setLoaded(true)}
      width={width}
      {...props}
    />
  );

  if (!showBlur || loaded) return imgEl;

  const showPlaceholder = (inView || isEager);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {showPlaceholder && !loaded && blurSrc && (
        <img
          src={blurSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          loading={props.loading}
        />
      )}
      {imgEl}
    </div>
  );
}
