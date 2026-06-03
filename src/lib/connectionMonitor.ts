export type SpeedTier = 'slow-2g' | '2g' | '3g' | '4g';

export function getSpeedTier(): SpeedTier {
  return '4g';
}

export function getImageQuality(_tier: SpeedTier): string {
  return 'good';
}

export function getImageScale(_tier: SpeedTier): number {
  return 1;
}

export function getSimulatedDelay(_tier: SpeedTier): number {
  return 0;
}
