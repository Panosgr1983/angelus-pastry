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
  const [imgSrc, setImgSrc] = useState<string | undefined | null>(undefined);
  const [blurSrc, setBlurSrc] = useState<string | null>(null);

  const isEager = props.loading === 'eager';

  useEffect(() => {
    try {
      if (src) {
        setImgSrc(buildFullUrl(String(src), Number(width) || 400));
        if (showBlur) setBlurSrc(getBlurPlaceholderUrl(String(src)));
      } else {
        setImgSrc(src);
      }
    } catch {
      setImgSrc(src as string);
    }
  }, [src, width, showBlur]);

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

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {showBlur && (inView || isEager) && !loaded && blurSrc && (
        <img
          src={blurSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          loading={props.loading}
        />
      )}
      <img
        src={inView || isEager ? imgSrc : undefined}
        className={`object-cover w-full h-full transition-opacity duration-500 ${
          showBlur && !loaded ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={() => setLoaded(true)}
        width={width}
        {...props}
      />
    </div>
  );
}
