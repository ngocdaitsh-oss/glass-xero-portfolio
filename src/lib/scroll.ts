import { useCallback, useEffect, useRef } from "react";

/**
 * Scrolls `root` so `el` sits `gap` design-px below its top edge.
 *
 * Never use `scrollIntoView` inside a window: it also scrolls every
 * overflow-hidden ancestor (the window shell, the desktop stage), which
 * shoves the whole window off its frame. Rects are post-zoom, scrollTop is
 * not, so the offset is divided by the measured ratio.
 */
export function scrollToChild(root: HTMLElement, el: HTMLElement | null, gap = 24) {
  if (!el) return;
  const box = root.getBoundingClientRect();
  const ratio = root.clientHeight ? box.height / root.clientHeight : 1;
  const top = root.scrollTop + (el.getBoundingClientRect().top - box.top) / (ratio || 1) - gap;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
}

/** Runs `fn` at most once per animation frame (for scroll handlers that measure). */
export function useFrameThrottle(fn: () => void) {
  const raf = useRef(0);
  const latest = useRef(fn);
  useEffect(() => {
    latest.current = fn;
  });
  // Reset the id too: under StrictMode the effect is torn down and re-run, and a
  // cancelled-but-nonzero id would make every later call return early.
  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    },
    [],
  );
  return useCallback(() => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      latest.current();
    });
  }, []);
}
