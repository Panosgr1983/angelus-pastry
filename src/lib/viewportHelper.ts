export function detectSafeAreaTop(): number {
  if (typeof window === 'undefined') return 0;

  const methods: number[] = [];

  // Method 1: env(safe-area-inset-top) via hidden div
  try {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;pointer-events:none;opacity:0;z-index:-1';
    document.body.appendChild(div);
    const envTop = parseInt(getComputedStyle(div).top, 10);
    document.body.removeChild(div);
    if (!isNaN(envTop) && envTop > 0) methods.push(envTop);
  } catch {}

  // Method 2: fixed element getBoundingClientRect
  // If top != 0, the browser offset tells us the safe area
  try {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;pointer-events:none;opacity:0;z-index:-1';
    document.body.appendChild(div);
    const rectTop = div.getBoundingClientRect().top;
    document.body.removeChild(div);
    if (rectTop < 0) methods.push(Math.abs(rectTop));
  } catch {}

  // Method 3: window.screen.availTop (Android)
  try {
    const availTop = (window.screen as any).availTop;
    if (typeof availTop === 'number' && availTop > 0 && availTop < 200) methods.push(availTop);
  } catch {}

  // Method 4: window.visualViewport offset
  try {
    const vv = window.visualViewport;
    if (vv) {
      const offset = vv.offsetTop;
      if (offset > 0 && offset < 200) methods.push(offset);
    }
  } catch {}

  if (methods.length === 0) return 0;

  // Use the median to avoid outliers
  methods.sort((a, b) => a - b);
  const median = methods.length % 2 === 0
    ? (methods[methods.length / 2 - 1] + methods[methods.length / 2]) / 2
    : methods[Math.floor(methods.length / 2)];

  return Math.round(median);
}
