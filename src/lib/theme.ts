"use client";

import { flushSync } from "react-dom";
import { holdUntil } from "@/lib/motion";

export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function subscribeTheme(onChange: () => void) {
  window.addEventListener("xero-theme", onChange);
  return () => window.removeEventListener("xero-theme", onChange);
}

function commit(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("xero-theme", theme);
  } catch {}
  window.dispatchEvent(new Event("xero-theme"));
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => unknown };

/**
 * Switches Dark / Light Glass with a slanted wipe: the new theme sweeps across
 * the screen on a diagonal edge, left→right into Light and right→left back to
 * Dark. The browser snapshots the page once before and once after and only
 * clips the new bitmap, so nothing restyles or repaints while it plays.
 */
export function applyTheme(theme: Theme, _origin?: { x: number; y: number }) {
  void _origin;
  if (theme === currentTheme()) return;
  const doc = document as VTDocument;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduce) {
    commit(theme);
    return;
  }
  const root = document.documentElement;
  const cls = theme === "light" ? "theme-vt-light" : "theme-vt-dark";
  root.classList.remove("vt-win");
  root.classList.add(cls);
  const transition = doc.startViewTransition(() => flushSync(() => commit(theme))) as { finished?: Promise<void> };
  holdUntil(transition);
  void transition.finished?.finally(() => root.classList.remove(cls));
}
