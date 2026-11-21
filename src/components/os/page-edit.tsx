"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

/*
 * DOM-level page editing shared by the glossary article and the case studies.
 *
 * - Gap: in edit mode, hovering a flex/grid box that has a gap shows a small −/+ pill to change it.
 * - Text (opt-in, for pages whose copy is not wrapped in glossary <T>): leaf text elements become
 *   contentEditable and their html is saved.
 *
 * Both are stored per browser in localStorage, keyed by the element's child-index path from the editor
 * root, so the source stays untouched and "Khôi phục bản gốc" clears them. Paths are positional: if a page's
 * structure changes, bump the storage key version so old edits are dropped instead of landing elsewhere.
 */

type Store = { gap: Record<string, number>; text: Record<string, string> };
const EMPTY: Store = { gap: {}, text: {} };
const UI = "data-edit-ui";

function load(key: string): Store {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return EMPTY;
    const v = JSON.parse(raw) as Partial<Store>;
    return { gap: v.gap ?? {}, text: v.text ?? {} };
  } catch {
    return EMPTY;
  }
}

function save(key: string, v: Store) {
  try {
    if (!Object.keys(v.gap).length && !Object.keys(v.text).length) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* private mode or full storage: edits just don't persist */
  }
}

/** Element children that belong to the page (not editor chrome such as the glossary delete buttons). */
const kids = (el: Element) => [...el.children].filter((c) => !c.hasAttribute(UI) && !c.classList.contains("g-blk-btn"));

function pathOf(root: Element, el: Element): string | null {
  const parts: number[] = [];
  let cur: Element | null = el;
  while (cur && cur !== root) {
    const parent: Element | null = cur.parentElement;
    if (!parent) return null;
    parts.unshift(kids(parent).indexOf(cur));
    cur = parent;
  }
  return cur === root ? parts.join(".") : null;
}

function byPath(root: Element, path: string): HTMLElement | null {
  let cur: Element | undefined = root;
  if (path === "") return root as HTMLElement;
  for (const i of path.split(".")) {
    cur = cur ? kids(cur)[Number(i)] : undefined;
    if (!cur) return null;
  }
  return cur as HTMLElement;
}

export function usePageEdits(key: string) {
  const [store, setStore] = useState<Store>(EMPTY);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
    setStore(load(key));
  }, [key]);
  const update = useCallback(
    (fn: (s: Store) => Store) =>
      setStore((s) => {
        const next = fn(s);
        save(key, next);
        return next;
      }),
    [key],
  );
  const setGap = useCallback(
    (path: string, px: number | null) =>
      update((s) => {
        const gap = { ...s.gap };
        if (px === null) delete gap[path];
        else gap[path] = px;
        return { ...s, gap };
      }),
    [update],
  );
  const setText = useCallback((path: string, html: string) => update((s) => ({ ...s, text: { ...s.text, [path]: html } })), [update]);
  const reset = useCallback(() => update(() => EMPTY), [update]);
  return { store, setGap, setText, reset, changes: Object.keys(store.gap).length + Object.keys(store.text).length };
}

export type PageEdits = ReturnType<typeof usePageEdits>;

const INLINE_TAGS = new Set(["SPAN", "B", "STRONG", "EM", "I", "BR", "A", "SMALL", "SUP", "SUB", "CODE", "MARK", "U"]);

/** A text leaf: has visible text and only inline children, and is not inside another leaf or a control. */
function isLeaf(el: HTMLElement) {
  if (!el.textContent?.trim()) return false;
  if (el.closest(`button, a, input, textarea, select, svg, [${UI}], [contenteditable], .g-blk-btn`)) return false;
  if (INLINE_TAGS.has(el.tagName) && el.parentElement && isLeafShape(el.parentElement)) return false;
  return isLeafShape(el);
}
const isLeafShape = (el: HTMLElement) => [...el.children].every((c) => INLINE_TAGS.has(c.tagName) && !c.querySelector("img, svg, video"));

const gapOf = (el: HTMLElement) => {
  const cs = getComputedStyle(el);
  if (!/flex|grid/.test(cs.display)) return 0;
  return Math.max(parseFloat(cs.rowGap) || 0, parseFloat(cs.columnGap) || 0);
};

/**
 * Applies saved edits to `root` and, while `editing`, offers the gap pill (and text editing when
 * `text` is on). Re-applies when the page re-renders or lazily mounts more content.
 */
export function PageEditor({ root, editing, edits, text = false }: { root: RefObject<HTMLElement | null>; editing: boolean; edits: PageEdits; text?: boolean }) {
  const { store, setGap, setText } = edits;
  const [target, setTarget] = useState<{ el: HTMLElement; path: string; rect: DOMRect } | null>(null);
  const lock = useRef(false);
  const applied = useRef(new Set<string>());

  // Apply saved gaps / text, and keep them applied as React or lazy sections change the DOM.
  useEffect(() => {
    const r = root.current;
    if (!r) return;
    const apply = () => {
      for (const p of applied.current) {
        if (store.gap[p] !== undefined) continue;
        const el = byPath(r, p);
        if (el) el.style.gap = "";
        applied.current.delete(p);
      }
      for (const [p, px] of Object.entries(store.gap)) {
        const el = byPath(r, p);
        if (el && el.style.gap !== `${px}px`) el.style.gap = `${px}px`;
        applied.current.add(p);
      }
      if (text)
        for (const [p, html] of Object.entries(store.text)) {
          const el = byPath(r, p);
          if (el && document.activeElement !== el && el.innerHTML !== html) el.innerHTML = html;
        }
    };
    apply();
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    });
    mo.observe(r, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [root, store, text]);

  // Text editing on leaf elements.
  useEffect(() => {
    const r = root.current;
    if (!r || !editing || !text) return;
    const leaves = [...r.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,p,li,span,div,td,th,figcaption,blockquote,dt,dd,label")].filter(isLeaf);
    const before = new WeakMap<HTMLElement, string>();
    const onFocus = (e: FocusEvent) => before.set(e.currentTarget as HTMLElement, (e.currentTarget as HTMLElement).innerHTML);
    const onBlur = (e: FocusEvent) => {
      const el = e.currentTarget as HTMLElement;
      const p = pathOf(r, el);
      if (p !== null && el.innerHTML !== before.get(el)) setText(p, el.innerHTML);
    };
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      document.execCommand("insertText", false, e.clipboardData?.getData("text/plain") ?? "");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") (e.currentTarget as HTMLElement).blur();
    };
    for (const el of leaves) {
      el.contentEditable = "true";
      el.spellcheck = false;
      el.classList.add("g-editable");
      el.addEventListener("focus", onFocus);
      el.addEventListener("blur", onBlur);
      el.addEventListener("paste", onPaste);
      el.addEventListener("keydown", onKey);
    }
    return () => {
      for (const el of leaves) {
        el.removeAttribute("contenteditable");
        el.classList.remove("g-editable");
        el.removeEventListener("focus", onFocus);
        el.removeEventListener("blur", onBlur);
        el.removeEventListener("paste", onPaste);
        el.removeEventListener("keydown", onKey);
      }
    };
  }, [root, editing, text, setText]);

  // Gap pill follows the innermost flex/grid box with a gap under the pointer.
  useEffect(() => {
    const r = root.current;
    if (!r || !editing) {
      setTarget(null);
      return;
    }
    const pick = (e: PointerEvent) => {
      if (lock.current) return;
      let el = e.target as HTMLElement | null;
      while (el && el !== r && !(gapOf(el) > 0 && kids(el).length > 1)) el = el.parentElement;
      if (!el || el === r) return setTarget(null);
      const path = pathOf(r, el);
      if (path === null) return setTarget(null);
      setTarget((t) => (t?.el === el ? { ...t, rect: el.getBoundingClientRect() } : { el, path, rect: el.getBoundingClientRect() }));
    };
    const onScroll = () => setTarget((t) => (t ? { ...t, rect: t.el.getBoundingClientRect() } : t));
    r.addEventListener("pointermove", pick);
    const scroller = r.closest(".os-scroll") ?? r;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      r.removeEventListener("pointermove", pick);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [root, editing]);

  if (!editing || !target || typeof document === "undefined") return null;
  const current = Math.round(gapOf(target.el));
  const saved = store.gap[target.path] !== undefined;
  const set = (px: number) => {
    const v = Math.max(0, px);
    target.el.style.gap = `${v}px`;
    setGap(target.path, v);
    setTarget({ ...target, rect: target.el.getBoundingClientRect() });
  };
  const top = Math.max(8, target.rect.top + 6);
  const left = Math.max(8, target.rect.left + 6);
  return createPortal(
    <>
      <div
        {...{ [UI]: "" }}
        aria-hidden
        className="pointer-events-none fixed z-[9998] rounded-lg bg-[rgba(103,152,255,0.08)]"
        style={{ top: target.rect.top, left: target.rect.left, width: target.rect.width, height: target.rect.height }}
      />
      <div
        {...{ [UI]: "" }}
        onPointerEnter={() => (lock.current = true)}
        onPointerLeave={() => (lock.current = false)}
        className="fixed z-[9999] flex items-center gap-1 rounded-full bg-[var(--d-ink,#0a0a0a)] py-1 pr-1 pl-3 text-[13px] leading-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        style={{ top, left }}
      >
        <span className="mr-1 font-mono">gap {current}</span>
        {[
          ["−", -4],
          ["+", 4],
        ].map(([l, d]) => (
          <button
            key={l}
            type="button"
            aria-label={d === 4 ? "Tăng gap" : "Giảm gap"}
            onClick={() => set(current + (d as number))}
            className="flex size-6 items-center justify-center rounded-full bg-white/10 font-semibold hover:bg-white/20"
          >
            {l}
          </button>
        ))}
        {saved ? (
          <button
            type="button"
            onClick={() => {
              target.el.style.gap = "";
              setGap(target.path, null);
            }}
            className="rounded-full px-2 py-0.5 text-white/70 hover:text-white"
          >
            Gốc
          </button>
        ) : null}
      </div>
    </>,
    document.body,
  );
}
