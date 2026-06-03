import { useState } from 'react';
import { getSpeedTier, type SpeedTier } from '../lib/connectionMonitor';
import { Gauge, RotateCcw, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'angelus_speed_tier';

const options: { value: SpeedTier; label: string; icon: string }[] = [
  { value: '4g',       label: 'Χωρίς περιορισμό', icon: '🚀' },
  { value: '3g',       label: '4G (γρήγορη)',      icon: '📶' },
  { value: '2g',       label: '3G (μέτρια)',       icon: '📶' },
  { value: 'slow-2g',  label: '2G (αργή)',          icon: '🐢' },
];

const tierColors: Record<SpeedTier, string> = {
  '4g': 'bg-emerald-500',
  '3g': 'bg-yellow-500',
  '2g': 'bg-orange-500',
  'slow-2g': 'bg-red-500',
};

function postToSW(msg: Record<string, unknown>) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}

async function clearAllCaches() {
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  }
  if ('serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map((r) => r.unregister()));
  }
}

export function DevSpeedSimulator() {
  const [open, setOpen] = useState(false);
  const [clearing, setClearing] = useState(false);
  const current = getSpeedTier();

  const setSpeed = async (tier: SpeedTier) => {
    localStorage.setItem(STORAGE_KEY, tier);
    postToSW({ speedTier: tier, clearCache: true });
    await clearAllCaches();
    window.location.reload();
  };

  const handleClearReload = async () => {
    setClearing(true);
    postToSW({ clearCache: true });
    await clearAllCaches();
    window.location.reload();
  };

  const currentLabel = options.find((o) => o.value === current)?.label ?? '';
  const currentOption = options.find((o) => o.value === current);

  return (
    <div className="fixed top-20 right-4 z-[9999]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-xl transition-all"
        title="Προσομοίωση ταχύτητας σύνδεσης"
      >
        <span className={`w-2 h-2 rounded-full ${tierColors[current]}`} />
        <Gauge size={16} className="text-gray-500" />
        <span className="hidden sm:inline">{currentLabel}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
            <p className="text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Gauge size={14} />
              Speed Simulator
            </p>
            <p className="text-[11px] text-emerald-600">Αλλαγή ταχύτητας = clear cache + reload</p>
          </div>

          <div className="py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSpeed(opt.value)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  current === opt.value
                    ? 'bg-emerald-100 text-emerald-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full ${tierColors[opt.value]} shrink-0" />
                <span className="text-base">{opt.icon}</span>
                <span>{opt.label}</span>
                {current === opt.value && (
                  <span className="ml-auto text-emerald-600 text-xs font-bold">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100">
            <button
              onClick={handleClearReload}
              disabled={clearing}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {clearing ? (
                <RotateCcw size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} className="text-red-400" />
              )}
              <span>{clearing ? 'Καθαρισμός...' : 'Clear Cache & Reload'}</span>
            </button>
          </div>

          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">
              Το service worker παρεμβάλλει πραγματική καθυστέρηση στα requests εικόνων.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
