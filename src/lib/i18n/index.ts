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

function scrambleOut(source: string, progress: number, frame: number) {
  const chars = Array.from(source);
  return chars
    .map((char, index) => {
      if (!/[\p{L}\p{N}]/u.test(char)) return char;
      const threshold = Math.max(0, Math.min(1, progress * 1.28 - (index % 11) * 0.025));
      const pulse = ((index * 17 + frame * 11) % 100) / 100;
      if (pulse > threshold) return char;
      return CODE_GLYPHS[(index * 7 + frame * 5) % CODE_GLYPHS.length];
    })
    .join("");
}

function decodeIn(target: string, progress: number, frame: number) {
  const chars = Array.from(target);
  return chars
    .map((char, index) => {
      if (!/[\p{L}\p{N}]/u.test(char)) return char;
      const reveal = Math.max(0, Math.min(1, progress * 1.22 - (index % 13) * 0.018));
      const pulse = ((index * 19 + frame * 7) % 100) / 100;
      if (pulse < reveal) return char;
      return CODE_GLYPHS[(index * 5 + frame * 3) % CODE_GLYPHS.length];
    })
    .join("");
}

/**
 * Scrambles the current copy out, commits the language at the midpoint, then
 * decodes the freshly-rendered copy in. Capturing the target nodes only after
 * React commits keeps long desktop copy and every other translated string in
 * sync in both directions.
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
  const outgoing = visibleTextNodes();
  const started = performance.now();
  const outDuration = 230;
  const inDuration = 390;
  root.dataset.langScramble = "";

  const restore = (samples: ReturnType<typeof visibleTextNodes>) => {
    for (const { node, source } of samples) {
      if (node.isConnected) node.nodeValue = source;
    }
  };

  const drawOut = (now: number) => {
    if (run !== languageRun) {
      restore(outgoing);
      delete root.dataset.langScramble;
      return;
    }
    const elapsed = now - started;
    const progress = Math.min(1, elapsed / outDuration);
    const frame = Math.floor(elapsed / 34);
    for (const { node, source } of outgoing) {
      if (node.isConnected) node.nodeValue = scrambleOut(source, progress, frame);
    }
    if (progress < 1) {
      requestAnimationFrame(drawOut);
      return;
    }

    restore(outgoing);
    flushSync(() => commit(lang));
    const incoming = visibleTextNodes();
    const decodeStarted = performance.now();

    const drawIn = (decodeNow: number) => {
      if (run !== languageRun) {
        restore(incoming);
        delete root.dataset.langScramble;
        return;
      }
      const decodeElapsed = decodeNow - decodeStarted;
      const decodeProgress = Math.min(1, decodeElapsed / inDuration);
      const decodeFrame = Math.floor(decodeElapsed / 34);
      for (const { node, source } of incoming) {
        if (node.isConnected) node.nodeValue = decodeIn(source, decodeProgress, decodeFrame);
      }
      if (decodeProgress < 1) {
        requestAnimationFrame(drawIn);
        return;
      }
      restore(incoming);
      delete root.dataset.langScramble;
    };

    requestAnimationFrame(drawIn);
  };

  requestAnimationFrame(drawOut);
}

/** Last pointer-down position, used as the transition origin by menus. */
export let lastPointer: { x: number; y: number } | undefined;
if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", (e) => (lastPointer = { x: e.clientX, y: e.clientY }), true);
}

