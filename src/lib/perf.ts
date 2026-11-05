"use client";

/**
 * Low-end tier: `<html data-perf="low">`. The boot script in app/layout.tsx sets it before paint
 * for weak hardware or Save-Data; `watchFrames` sets it at runtime when frames stay slow on a
 * machine the hints missed. It drops the expensive decoration (live wallpaper, backdrop blur,
 * pre-rendering), never content. Kept for the browser session.
 */
const KEY = "xero-perf";

export function isLowPerf() {
  return typeof document !== "undefined" && document.documentElement.dataset.perf === "low";
}

function markLow() {
  document.documentElement.dataset.perf = "low";
  try {
    sessionStorage.setItem(KEY, "low");
  } catch {}
  window.dispatchEvent(new Event("xero-perf"));
}

export function subscribePerf(onChange: () => void) {
  window.addEventListener("xero-perf", onChange);
  return () => window.removeEventListener("xero-perf", onChange);
}

/** Samples ~2s of frames while nothing big is animating; a slow median means the GPU cannot keep up. */
export function watchFrames() {
  if (isLowPerf()) return () => undefined;
  const SLOW_MS = 30;
  const SAMPLES = 60;
  let frames: number[] = [];
  let last = 0;
  let raf = 0;
  let rounds = 0;
  const tick = (now: number) => {
    const quiet = !document.hidden && document.documentElement.dataset.motion === undefined;
    if (last && quiet) frames.push(now - last);
    else if (!quiet) frames = [];
    last = quiet ? now : 0;
    if (frames.length >= SAMPLES) {
      const median = [...frames].sort((a, b) => a - b)[SAMPLES >> 1];
      frames = [];
      rounds += 1;
      if (median > SLOW_MS) {
        markLow();
        return;
      }
      if (rounds >= 5) return;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
