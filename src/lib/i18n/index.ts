"use client";

import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
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

const CODE_GLYPHS = "01<>[]{}#*+=/\\|";
let languageRun = 0;

function visibleTextNodes() {
  const nodes: Array<{ node: Text; source: string }> = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let current: Node | null;
  while ((current = walker.nextNode())) {
    const node = current as Text;
    const source = node.nodeValue ?? "";
    const parent = node.parentElement;
    if (
      !parent ||
      !/[\p{L}\p{N}]/u.test(source) ||
      source.length > 280 ||
      parent.closest("script,style,noscript,textarea,input,option,[aria-hidden='true'],[data-no-lang-scramble]")
    ) {
      continue;
    }
    const rect = parent.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight || rect.right < 0 || rect.left > innerWidth || rect.width === 0 || rect.height === 0) {
      continue;
    }
    nodes.push({ node, source });
  }
  return nodes;
}

function scramble(source: string, progress: number, frame: number) {
  const chars = Array.from(source);
  const chaos = progress < 0.68 ? Math.min(1, progress / 0.18) : Math.max(0, (1 - progress) / 0.32);
  return chars
    .map((char, index) => {
      if (!/[\p{L}\p{N}]/u.test(char)) return char;
      const pulse = ((index * 17 + frame * 13) % 100) / 100;
      if (pulse > 0.18 + chaos * 0.78) return char;
      return CODE_GLYPHS[(index * 7 + frame * 5) % CODE_GLYPHS.length];
    })
    .join("");
}

/**
 * Runs a short, code-like glyph decode across the text currently on screen,
 * then commits the requested language. React only sees restored source text,
 * so untranslated strings cannot get stranded as scrambled DOM.
 */
export function applyLang(lang: Lang, _origin?: { x: number; y: number }) {
  void _origin;
  if (lang === currentLang()) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    commit(lang);
    return;
  }

  const run = ++languageRun;
  const root = document.documentElement;
  const samples = visibleTextNodes();
  const started = performance.now();
  root.dataset.langScramble = "";

  const restore = () => {
    for (const { node, source } of samples) {
      if (node.isConnected) node.nodeValue = source;
    }
  };

  const draw = (now: number) => {
    if (run !== languageRun) {
      restore();
      delete root.dataset.langScramble;
      return;
    }
    const progress = Math.min(1, (now - started) / 520);
    const frame = Math.floor((now - started) / 38);
    for (const { node, source } of samples) {
      if (node.isConnected) node.nodeValue = scramble(source, progress, frame);
    }
    if (progress < 1) {
      requestAnimationFrame(draw);
      return;
    }
    restore();
    flushSync(() => commit(lang));
    delete root.dataset.langScramble;
  };

  requestAnimationFrame(draw);
}

/** Last pointer-down position, used as the transition origin by menus. */
export let lastPointer: { x: number; y: number } | undefined;
if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", (e) => (lastPointer = { x: e.clientX, y: e.clientY }), true);
}

