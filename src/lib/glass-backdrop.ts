"use client";

/**
 * Pre-blurred wallpaper stills for the window glass stand-in (window-manager
 * fakeGlass). Blurring once on a canvas and using the result as a plain background
 * means a transition never runs a live `filter: blur()` over a window-sized layer.
 * Built while the desktop is idle; until one is ready the stand-in falls back to
 * a CSS filter.
 */
const ready = new Map<string, string>();
const pending = new Set<string>();

const keyOf = (img: HTMLImageElement, radius: number) => `${img.currentSrc || img.src}|${radius}`;

/** Blur radius in the image's own pixels for a CSS blur of `blurPx` shown at `displayWidth` px. */
export function blurRadiusFor(img: HTMLImageElement, blurPx: number, displayWidth: number) {
  return Math.max(1, Math.round((blurPx * img.naturalWidth) / Math.max(1, displayWidth)));
}

export function blurredWallpaper(img: HTMLImageElement, radius: number) {
  return ready.get(keyOf(img, radius)) ?? null;
}

export function prepareBlurredWallpaper(img: HTMLImageElement, radius: number) {
  const key = keyOf(img, radius);
  if (ready.has(key) || pending.has(key) || !img.naturalWidth) return;
  pending.add(key);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const pad = radius * 3;
  // The still stretched under itself, so the blur has real-looking edges instead of transparency.
  const source = document.createElement("canvas");
  source.width = w + pad * 2;
  source.height = h + pad * 2;
  const sctx = source.getContext("2d");
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const octx = out.getContext("2d");
  if (!sctx || !octx || !("filter" in octx)) {
    pending.delete(key);
    return;
  }
  sctx.drawImage(img, 0, 0, source.width, source.height);
  sctx.drawImage(img, pad, pad, w, h);
  octx.filter = `blur(${radius}px)`;
  octx.drawImage(source, -pad, -pad);
  out.toBlob(
    (blob) => {
      if (!blob) {
        pending.delete(key);
        return;
      }
      const url = URL.createObjectURL(blob);
      const probe = new Image();
      probe.src = url;
      void probe
        .decode()
        .catch(() => undefined)
        .finally(() => {
          ready.set(key, url);
          pending.delete(key);
        });
    },
    "image/webp",
    0.92,
  );
}
