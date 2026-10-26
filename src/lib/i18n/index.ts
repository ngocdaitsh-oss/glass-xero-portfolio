"use client";

import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { holdUntil } from "@/lib/motion";
import { vi } from "./vi";

/*
 * Tiny client-side i18n. English is the source language: components pass the
 * English string itself to `t()`, and the Vietnamese dictionaries in ./vi/*
 * map that exact string to its translation. A missing entry falls back to the
 * English text, so nothing ever renders blank.
 *
 *   const t = useT();
 *   t("Rearrange items")                 // "Sắp xếp biểu tượng"
 *   t("{n} projects", { n: 4 })          // "{n} dự án" → "4 dự án"
 *
 * For rich JSX copy that can't be a single string, branch on `useLang()`.
 */

export type Lang = "en" | "vi";
export type Vars = Record<string, string | number>;
export type TFn = (en: string, vars?: Vars) => string;

const KEY = "xero-lang";
const EVENT = "xero-lang";

export function currentLang(): Lang {
  return document.documentElement.lang === "vi" ? "vi" : "en";
}

export function subscribeLang(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

const serverLang = () => "en" as const;

export function useLang(): Lang {
  return useSyncExternalStore(subscribeLang, currentLang, serverLang);
}

function fill(s: string, vars?: Vars) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

export function translate(lang: Lang, en: string, vars?: Vars): string {
  return fill(lang === "vi" ? (vi[en] ?? en) : en, vars);
}

export function useT(): TFn {
  const lang = useLang();
  return useCallback((en: string, vars?: Vars) => translate(lang, en, vars), [lang]);
}

function commit(lang: Lang) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => { finished?: Promise<void> } };

/**
 * Switches language with a View Transition: the new language opens as a soft
 * circle from where the switch was clicked while the old text lifts away.
 * Only clip-path / transform / opacity animate. No API or reduced motion →
 * the text swaps instantly.
 */
export function applyLang(lang: Lang, origin?: { x: number; y: number }) {
  if (lang === currentLang()) return;
  const doc = document as VTDocument;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduce) {
    commit(lang);
    return;
  }
  const root = document.documentElement;
  const x = origin?.x ?? window.innerWidth - 120;
  const y = origin?.y ?? 36;
  root.style.setProperty("--lang-x", `${Math.round(x)}px`);
  root.style.setProperty("--lang-y", `${Math.round(y)}px`);
  root.classList.remove("vt-win");
  root.classList.add("lang-vt");
  const transition = doc.startViewTransition(() => flushSync(() => commit(lang)));
  holdUntil(transition);
  void transition.finished?.finally(() => root.classList.remove("lang-vt"));
}

/** Last pointer-down position, used as the transition origin by menus. */
export let lastPointer: { x: number; y: number } | undefined;
if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", (e) => (lastPointer = { x: e.clientX, y: e.clientY }), true);
}

