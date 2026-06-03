const STORAGE_KEY = 'angelus_speed_tier';

export type SpeedTier = 'slow-2g' | '2g' | '3g' | '4g';

export function getSpeedTier(): SpeedTier {
  if (typeof localStorage === 'undefined') return '4g';

  const override = localStorage.getItem(STORAGE_KEY);
  if (override === 'slow-2g' || override === '2g' || override === '3g' || override === '4g') {
    return override;
  }

  const conn = (navigator as any).connection;
  if (conn?.effectiveType) {
    const t = conn.effectiveType as SpeedTier;
    if (t === 'slow-2g' || t === '2g' || t === '3g') return t;
    return '4g';
  }

  return '4g';
}
