"use client";

/**
 * Marks `<html data-motion>` while a big transition runs (window View Transitions,
 * theme / language wipes). The live wallpaper skips frames while it is set, so the
 * GPU is not redrawing a full-screen shader — and re-blurring every glass surface
 * above it — underneath the animation. CSS can also key off it.
 */
let holds = 0;

export function holdMotion(): () => void {
  holds += 1;
  document.documentElement.dataset.motion = "";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holds = Math.max(0, holds - 1);
    if (holds === 0) delete document.documentElement.dataset.motion;
  };
}

/** Holds motion until a View Transition (or any `{ finished }`) settles. */
export function holdUntil(transition: { finished?: Promise<unknown> } | null | undefined) {
  const release = holdMotion();
  if (!transition?.finished) {
    release();
    return;
  }
  transition.finished.then(release, release);
}

export function motionActive() {
  return document.documentElement.dataset.motion !== undefined;
}
