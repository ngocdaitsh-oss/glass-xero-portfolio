"use client";

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";

/**
 * Fades a block up the first time it enters its scrollport.
 * Measures with getBoundingClientRect so CSS zoom on the page cannot mark
 * offscreen blocks as visible the way IntersectionObserver does.
 * The first screen is shown immediately; everything below waits for scroll.
 */

type EnterFn = (batch: HTMLElement[]) => void;

type Group = {
  fns: Set<EnterFn>;
  run: () => void;
  ro: ResizeObserver;
  mo: MutationObserver;
  scroller: HTMLElement | Window;
};

const groups = new WeakMap<HTMLElement, Group>();

function check(el: HTMLElement, root: HTMLElement, enter: number): "in" | "out" | "wait" {
  if (el.classList.contains("is-in")) return "in";
  // data-reveal-window: the document scrolls (mobile pages), so the scrollport is the viewport.
  const port = root.dataset.revealWindow !== undefined ? { top: 0, bottom: window.innerHeight, height: window.innerHeight } : root.getBoundingClientRect();
  if (port.height < 32) return "wait";
  const box = el.getBoundingClientRect();
  if (box.width < 1 && box.height < 1) return "wait";
  const lead = Math.min(enter, port.height * 0.42);
  return box.top < port.bottom - lead ? "in" : "out";
}

function show(el: HTMLElement, delayMs: number, animate: boolean) {
  if (!animate) {
    el.style.transition = "none";
    el.style.transitionDelay = "0ms";
    el.classList.add("is-in");
    requestAnimationFrame(() => {
      el.style.transition = "";
    });
    return;
  }
  el.style.transitionDelay = `${delayMs}ms`;
  el.classList.add("is-in");
}

function subscribe(root: HTMLElement, fn: EnterFn) {
  let group = groups.get(root);
  if (!group) {
    const fns = new Set<EnterFn>();
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const batch: HTMLElement[] = [];
        for (const cb of fns) cb(batch);
        // Blocks that arrive together come in one after another, top to bottom,
        // including the first screen when the app opens.
        batch.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        batch.forEach((el, index) => show(el, Math.min(index, 7) * 90, true));
      });
    };
    const ro = new ResizeObserver(run);
    ro.observe(root);
    const zoomed = root.querySelector("[data-reveal-zoom]");
    if (zoomed instanceof Element) ro.observe(zoomed);
    const mo = new MutationObserver(run);
    if (zoomed) mo.observe(zoomed, { attributes: true, attributeFilter: ["style"] });
    const scroller: HTMLElement | Window = root.dataset.revealWindow !== undefined ? window : root;
    scroller.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    group = { fns, run, ro, mo, scroller };
    groups.set(root, group);
  }
  group.fns.add(fn);
  return () => {
    const current = groups.get(root);
    if (!current) return;
    current.fns.delete(fn);
    if (current.fns.size === 0) {
      current.scroller.removeEventListener("scroll", current.run);
      window.removeEventListener("resize", current.run);
      current.ro.disconnect();
      current.mo.disconnect();
      groups.delete(root);
    }
  };
}

/** Registers one element with its scroller's reveal group; returns the cleanup. */
function watchReveal(el: HTMLElement, enter: number): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = el.closest(".reveal-root");
  if (reduce || !(root instanceof HTMLElement)) {
    el.classList.add("is-in");
    return () => {};
  }

  const first = check(el, root, enter);
  if (first !== "wait") {
    root.classList.add("reveal-arm");
    if (!root.dataset.revealArmed) root.dataset.revealArmed = String(performance.now());
  }

  const unsub = subscribe(root, (batch) => {
    if (el.classList.contains("is-in")) return;
    const state = check(el, root, enter);
    if (state === "wait") return;
    root.classList.add("reveal-arm");
    if (!root.dataset.revealArmed) root.dataset.revealArmed = String(performance.now());
    if (state === "in") batch.push(el);
  });

  // Even blocks already on screen wait one frame and enter through the staggered batch.
  const id = requestAnimationFrame(() => groups.get(root)?.run());
  return () => {
    cancelAnimationFrame(id);
    unsub();
  };
}

export function useReveal<T extends HTMLElement>(enter = 120): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    return watchReveal(el, enter);
  }, [enter]);

  return ref;
}

/**
 * Same reveal, applied to existing elements inside `ref` that match `selector`
 * (for generated, absolutely positioned layouts that cannot take a wrapper div).
 * Each match gets the `reveal` class and enters on its own, through the same group.
 */
export function useRevealChildren<T extends HTMLElement>(selector: string, enter = 40): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const host = ref.current;
    if (!host) return;
    const els = [...host.querySelectorAll<HTMLElement>(selector)];
    els.forEach((el) => el.classList.add("reveal"));
    const stops = els.map((el) => watchReveal(el, enter));
    return () => stops.forEach((stop) => stop());
  }, [selector, enter]);

  return ref;
}

export function Reveal({
  children,
  className = "",
  enter = 120,
}: {
  children: ReactNode;
  className?: string;
  /** How far into the scrollport, in pixels, the block's top must sit before it animates in. */
  enter?: number;
}) {
  const ref = useReveal<HTMLDivElement>(enter);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
