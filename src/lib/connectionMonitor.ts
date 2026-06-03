export type SpeedTier = 'slow-2g' | '2g' | '3g' | '4g';

const STORAGE_KEY = 'angelus_speed_tier';

export function getDevOverride(): SpeedTier | null {
  if (!import.meta.env.DEV) return null;
  const val = localStorage.getItem(STORAGE_KEY);
  if (val && ['slow-2g', '2g', '3g', '4g'].includes(val)) return val as SpeedTier;
  return null;
}

function detectNativeTier(): SpeedTier | null {
  if (typeof navigator === 'undefined') return null;
  const conn = (navigator as any).connection;
  if (!conn?.effectiveType) return null;
  const t = conn.effectiveType;
  if (['slow-2g', '2g', '3g', '4g'].includes(t)) return t as SpeedTier;
  return null;
}

export function getSpeedTier(): SpeedTier {
  const dev = getDevOverride();
  if (dev) return dev;

  const native = detectNativeTier();
  if (native) return native;

  return import.meta.env.DEV ? '2g' as SpeedTier : '4g';
}

export function getImageQuality(tier: SpeedTier): string {
  switch (tier) {
    case 'slow-2g': return 'low';
    case '2g':      return 'low';
    case '3g':      return 'eco';
    case '4g':      return 'good';
  }
}

export function getImageScale(tier: SpeedTier): number {
  switch (tier) {
    case 'slow-2g': return 0.15;
    case '2g':      return 0.2;
    case '3g':      return 0.5;
    case '4g':      return 1;
  }
}

export function getSimulatedDelay(tier: SpeedTier): number {
  switch (tier) {
    case 'slow-2g': return 1500;
    case '2g':      return 800;
    case '3g':      return 400;
    case '4g':      return 0;
  }
}
