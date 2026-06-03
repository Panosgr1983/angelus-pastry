import { useState, useEffect, useRef } from 'react';
import { buildFullUrl, buildTinyPreview } from '../lib/imageLoader';
import { getSpeedTier, getSimulatedDelay } from '../lib/connectionMonitor';

type OptimizedImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> & {
  showBlur?: boolean;
};

export function OptimizedImage({
  showBlur = true,
  className = '',
  src,
  width,
  style,
  ...props
}: OptimizedImageProps) {
  const imgWidth = typeof width === 'number' ? width : parseInt(String(width), 10) || 600;
  const tier = getSpeedTier();
  const isSlow = tier === '2g' || tier === 'slow-2g';
  const useBlur = showBlur && isSlow;

  const [imgSrc, setImgSrc] = useState<string>(
    useBlur && src ? buildTinyPreview(String(src)) || String(src) : src ? buildFullUrl(String(src), imgWidth) : '',
  );
  const [phase, setPhase] = useState<'loading' | 'done'>(useBlur ? 'loading' : 'done');
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!useBlur || !src) return;

    const delay = getSimulatedDelay(tier);
    const fullSrc = buildFullUrl(String(src), imgWidth);

    const timer = setTimeout(() => {
      if (!mountedRef.current) return;
      const preload = new Image();
      preload.onload = () => {
        if (!mountedRef.current) return;
        setImgSrc(fullSrc);
        setPhase('done');
      };
      preload.onerror = () => {
        if (!mountedRef.current) return;
        setImgSrc(fullSrc);
        setPhase('done');
      };
      preload.src = fullSrc;
    }, delay);

    return () => clearTimeout(timer);
  }, [src, imgWidth, useBlur, tier]);

  return (
    <img
      src={imgSrc}
      width={width}
      className={`object-cover transition-all duration-700 ${className} ${phase === 'loading' ? 'opacity-60' : 'opacity-100'}`}
      style={phase === 'loading' ? { filter: 'blur(12px)', ...(style as object) } : style}
      {...props}
    />
  );
}
