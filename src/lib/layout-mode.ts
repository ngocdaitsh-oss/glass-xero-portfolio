"use client";

import { useSyncExternalStore } from "react";

/**
 * "desktop": 1920×1080 design stage (≥ 1280 wide).
 * "tablet": 1194×834 landscape or 834px-wide portrait stage. Includes
 * 768–1279px viewports and large 4:3-class tablets up to 1439px.
 * "mobile": the iOS shell in src/components/mobile (width < 768), a real
 * 390-wide layout zoomed by `--m-zoom` (innerWidth / 390, clamped 0.82–1.15).
 * The inline script in src/app/layout.tsx sets `<html data-layout>` before
 * paint and re-picks it on resize, firing "xero-layout" when it changes.
 * Styling differences use the Tailwind `tablet:` / `mobile:` variants; this hook is for JS ones.
 */
export type LayoutMode = "desktop" | "tablet" | "mobile";

export function currentLayout(): LayoutMode {
  const mode = document.documentElement.dataset.layout;
  return mode === "tablet" || mode === "mobile" ? mode : "desktop";
}

export function subscribeLayout(onChange: () => void) {
  window.addEventListener("xero-layout", onChange);
  return () => window.removeEventListener("xero-layout", onChange);
}

const serverLayout = () => "desktop" as const;

export function useLayoutMode(): LayoutMode {
  return useSyncExternalStore(subscribeLayout, currentLayout, serverLayout);
}

/** Viewport px per mobile design px (the `--m-zoom` the boot script sets). */
export function mobileZoom() {
  const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--m-zoom"));
  return Number.isFinite(value) && value > 0 ? value : 1;
}
