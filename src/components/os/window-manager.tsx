"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import type { AppId } from "@/lib/apps";
import { blurRadiusFor, blurredWallpaper, prepareBlurredWallpaper } from "@/lib/glass-backdrop";
import { holdMotion, motionActive } from "@/lib/motion";
import { currentLayout, subscribeLayout, useLayoutMode, type LayoutMode } from "@/lib/layout-mode";

/** Frame on the stage in stage px. `k` (tablet) zooms the window's desktop-sized content to fit that frame. */
export type Geometry = { x: number; y: number; w: number; h: number; k?: number };

export type WindowState = {
  id: AppId;
  geo: Geometry;
  minimized: boolean;
  maximized: boolean;
  /** Plays the genie-out, then the window is removed. */
  exiting?: boolean;
  /** Minimizing or closing has started; the dock comes back while it plays. */
  leaving?: boolean;
  /** Pre-rendered and laid out but invisible: the pointer is down on something that opens it. */
  staged?: boolean;
};

/** Window frames on the 1920×1080 design stage, taken from each Figma screen. */
export const DEFAULT_GEOMETRY: Partial<Record<AppId, Geometry>> = {
  about: { x: 371, y: 150, w: 1152, h: 720 },
  mail: { x: 570, y: 203, w: 780, h: 689 },
  terminal: { x: 500, y: 230, w: 920, h: 620 },
  notes: { x: 460, y: 150, w: 1161, h: 724 },
  photos: { x: 460, y: 170, w: 1000, h: 660 },
  projects: { x: 280, y: 120, w: 1360, h: 820 },
  "ai-workflow": { x: 280, y: 120, w: 1360, h: 820 },
};

/**
 * Tablet frames (Figma section 359:91341, 1194×834 stage). Each window is its
 * desktop window scaled uniformly, so the content stays one layout and the
 * shell applies CSS zoom `k` = tablet width / desktop width.
 */
const TABLET_FRAMES: Partial<Record<AppId | "photos-preview", { x: number; y: number; w: number; h: number; dw: number }>> = {
  about: { x: 131, y: 74, w: 1032.96, h: 645.6, dw: 1152 },
  mail: { x: 224, y: 74, w: 746.03, h: 658.99, dw: 780 },
  terminal: { x: 137, y: 87, w: 920, h: 620, dw: 920 },
  notes: { x: 151, y: 74, w: 1035.28, h: 645.6, dw: 1161 },
  photos: { x: 108, y: 74, w: 978.18, h: 645.6, dw: 1000 },
  "photos-preview": { x: 67, y: 74, w: 1059.45, h: 645.6, dw: 1280 },
};

/** Tablet window area: 12px from the stage edges, under the 10 + 52 top bar. */
const TABLET_TOP = 74;
const TABLET_MARGIN = 12;

function stageSize() {
  const stage = document.querySelector<HTMLElement>("[data-desktop-stage]");
  return { w: stage?.clientWidth ?? 1920, h: stage?.clientHeight ?? 1080 };
}

/** Tablet frame for a window, centred on the live stage like the 1194×834 frame. Apps with no tablet frame keep their desktop size, fitted. */
export function tabletGeometry(id: AppId | "photos-preview"): Geometry | null {
  const stage = stageSize();
  const frame = TABLET_FRAMES[id];
  const base = frame ?? (id === "photos-preview" ? null : DEFAULT_GEOMETRY[id]);
  if (!base) return null;
  if (stage.h > stage.w) {
    const w = Math.max(320, stage.w - TABLET_MARGIN * 2);
    const availableH = Math.max(240, stage.h - TABLET_TOP - TABLET_MARGIN);
    const designWidth = "dw" in base ? base.dw : base.w;
    const k = id === "projects" || id === "ai-workflow" ? 1 : Math.min(1, w / designWidth);
    const sourceH = "h" in base ? base.h : 620;
    const h = id === "projects" || id === "ai-workflow" ? availableH : Math.min(availableH, Math.max(620, sourceH * k));
    return {
      x: TABLET_MARGIN,
      y: TABLET_TOP + (availableH - h) / 2,
      w,
      h,
      k,
    };
  }
  const w = frame ? frame.w : Math.min(base.w, stage.w - TABLET_MARGIN * 2);
  const h = frame ? frame.h : Math.min(base.h, stage.h - TABLET_TOP - TABLET_MARGIN);
  const x = frame ? frame.x : (1194 - w) / 2;
  const y = frame ? frame.y : TABLET_TOP;
  return {
    // Notes sits 7.72px from the right edge in Figma, so the clamp never pulls a frame in further than its own design.
    x: Math.max(TABLET_MARGIN, Math.min(x + (stage.w - 1194) / 2, stage.w - w - Math.min(TABLET_MARGIN, 1194 - x - w))),
    y: Math.max(TABLET_TOP, Math.min(y + (stage.h - 834) / 2, stage.h - h - TABLET_MARGIN)),
    w,
    h,
    k: frame ? frame.w / frame.dw : 1,
  };
}

/** Where a window opens in the given layout. */
function defaultGeometry(id: AppId, layout: LayoutMode): Geometry | null {
  if (layout === "tablet") return tabletGeometry(id);
  const base = DEFAULT_GEOMETRY[id];
  if (!base) return null;
  // Figma places windows on a 1920×1080 stage; the live stage can be 1440–2560+ wide and taller, so keep the same centring.
  const stage = stageSize();
  return {
    ...base,
    // Smaller stages (down to 1440×900 design px) pull the window in by the same half-difference, never under the top bar or past an edge.
    x: Math.max(15, Math.min(base.x + (stage.w - 1920) / 2, stage.w - base.w - 15)),
    y: Math.max(82, Math.min(base.y + (stage.h - 1080) / 2, stage.h - base.h - 16)),
  };
}

/**
 * Light windows are pre-rendered hidden (React `<Activity mode="hidden">`) while the
 * desktop is idle and stay mounted while minimized, so opening / restoring one only
 * reveals DOM that already exists instead of mounting it inside the transition's
 * first frame. Activity keeps their effects unmounted while hidden, so reveal
 * staggers and intros still play on show. Closing drops the instance (state resets
 * as before) and a fresh one is pre-rendered at the next idle moment.
 */
export const KEEP_ALIVE: ReadonlySet<AppId> = new Set<AppId>(["about", "mail", "notes", "terminal", "photos"]);

export type WindowSlot = { state: WindowState; index: number; key: string; hidden: boolean };

/** Apps whose Figma screen shows the window filling the desktop. */
export const OPENS_MAXIMIZED: AppId[] = ["projects", "ai-workflow"];

const GRAB_MARGIN = 48;

type WindowApi = {
  state: WindowState;
  focused: boolean;
  z: number;
  close: () => void;
  minimize: () => void;
  toggleMaximize: () => void;
  focus: () => void;
  setGeometry: (geo: Geometry) => void;
  setLeaving: (leaving: boolean) => void;
};

const WindowContext = createContext<WindowApi | null>(null);

export const WindowProvider = WindowContext.Provider;

/** True inside the mobile shell's full-screen page: WindowShell drops its frame and motion and just fills the page. */
export const EmbedContext = createContext(false);

export function useWindow() {
  const api = useContext(WindowContext);
  if (!api) throw new Error("useWindow must be used inside a WindowProvider");
  return api;
}

function deskScale() {
  const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--desk-scale"));
  return Number.isFinite(value) && value > 0 ? value : 1;
}

/**
 * Pointer handlers for a title bar: drag moves the restored window, double-click
 * toggles maximize. Presses that start on a button are left to the button.
 */
export function useTitleBarDrag() {
  const { state, setGeometry, toggleMaximize, focus } = useWindow();
  // While dragging, the window only moves by transform (compositor); the new
  // geometry is committed once, on release, so React and layout stay idle.
  const start = useRef<{
    px: number;
    py: number;
    geo: Geometry;
    bounds: { w: number; h: number };
    el: HTMLElement | null;
    next: Geometry;
    raf: number;
  } | null>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    focus();
    if (e.button !== 0 || state.maximized) return;
    if ((e.target as HTMLElement).closest("button, a, input")) return;
    const stage = (e.currentTarget.closest("[data-desktop-stage]") as HTMLElement | null) ?? document.body;
    start.current = {
      px: e.clientX,
      py: e.clientY,
      geo: state.geo,
      bounds: { w: stage.clientWidth, h: stage.clientHeight },
      el: e.currentTarget.closest<HTMLElement>("[data-window]"),
      next: state.geo,
      raf: 0,
    };
    start.current.el?.classList.add("win-dragging");
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const s = start.current;
    if (!s) return;
    const scale = deskScale();
    const x = s.geo.x + (e.clientX - s.px) / scale;
    const y = s.geo.y + (e.clientY - s.py) / scale;
    s.next = {
      ...s.geo,
      x: Math.min(Math.max(x, GRAB_MARGIN - s.geo.w), s.bounds.w - GRAB_MARGIN),
      y: Math.min(Math.max(y, 0), s.bounds.h - 36),
    };
    if (s.raf) return;
    s.raf = requestAnimationFrame(() => {
      s.raf = 0;
      // The window's own tablet zoom also scales its transform.
      const k = s.geo.k ?? 1;
      if (s.el) s.el.style.transform = `translate3d(${(s.next.x - s.geo.x) / k}px, ${(s.next.y - s.geo.y) / k}px, 0)`;
    });
  };

  const end = (e: ReactPointerEvent<HTMLElement>) => {
    const s = start.current;
    if (!s) return;
    start.current = null;
    cancelAnimationFrame(s.raf);
    if (s.el) {
      s.el.style.transform = "";
      s.el.classList.remove("win-dragging");
    }
    if (s.next.x !== s.geo.x || s.next.y !== s.geo.y) flushSync(() => setGeometry(s.next));
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerCancel: end,
    onDoubleClick: (e: ReactMouseEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).closest("button, a, input")) return;
      toggleMaximize();
    },
    style: { cursor: state.maximized ? undefined : "var(--c-move)", touchAction: "none" } as CSSProperties,
  };
}

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Where the app's dock icon sits once the dock is fully shown. The dock may be
 * sliding in (or hidden) while a window minimizes, so its current slide offset
 * is taken back out of the measured box.
 */
function dockTarget(id: AppId) {
  const icon = document.querySelector<HTMLElement>(`[data-dock-app="${id}"]`);
  if (!icon) return null;
  const box = icon.getBoundingClientRect();
  const slide = icon.closest<HTMLElement>("[data-dock-slide]");
  let offset = 0;
  if (slide) {
    const transform = getComputedStyle(slide).transform;
    if (transform && transform !== "none") offset = new DOMMatrixReadOnly(transform).m42 * deskScale();
  }
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 - offset, w: box.width };
}

/** Shells and the stage never scroll; undo any scroll that focus or the browser slips in. */
export function pinFrame(e: { currentTarget: HTMLElement }) {
  const el = e.currentTarget;
  if (el.scrollTop || el.scrollLeft) {
    el.scrollTop = 0;
    el.scrollLeft = 0;
  }
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeIn = (t: number) => t * t * t;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * macOS-style genie toward the dock icon. The window is drawn into a funnel:
 * first its bottom edge pinches toward the icon while the sides bend into an
 * S-curve, then the whole body is pulled down through the neck. Everything is
 * transform + clip-path on one element (no backdrop blur while it runs), so it
 * stays on a cheap paint path.
 */
function genieKeyframes(w: number, h: number, tx: number, ty: number, neck: number): Keyframe[] {
  const STEPS = 36;
  const ROWS = 14;
  const frames: Keyframe[] = [];
  const left = tx - neck / 2;
  const right = tx + neck / 2;
  for (let i = 0; i <= STEPS; i++) {
    const p = i / STEPS;
    const pinch = easeInOut(clamp01(p / 0.5));
    const pull = easeIn(clamp01((p - 0.28) / 0.72));
    const stretch = easeInOut(clamp01(p / 0.42));
    const top = lerp(0, ty, pull);
    const bottom = Math.max(top + 1, lerp(h, ty, stretch));
    const sy = (bottom - top) / h;

    const lTop = lerp(0, left, pull);
    const rTop = lerp(w, right, pull);
    const lBottom = lerp(0, left, pinch);
    const rBottom = lerp(w, right, pinch);
    const leftSide: string[] = [];
    const rightSide: string[] = [];
    for (let r = 0; r <= ROWS; r++) {
      const s = r / ROWS;
      const bend = s * s * (3 - 2 * s);
      const y = (s * h).toFixed(1);
      leftSide.push(`${lerp(lTop, lBottom, bend).toFixed(1)}px ${y}px`);
      rightSide.unshift(`${lerp(rTop, rBottom, bend).toFixed(1)}px ${y}px`);
    }
    frames.push({
      offset: p,
      transform: `translateY(${top.toFixed(2)}px) scaleY(${sy.toFixed(4)})`,
      clipPath: `polygon(${[...leftSide, ...rightSide].join(", ")})`,
      opacity: p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1,
    });
  }
  return frames;
}

/** Stage zoom times the window's own (tablet) zoom: viewport px per window px. */
function windowScale(el: HTMLElement) {
  return deskScale() * (parseFloat(getComputedStyle(el).zoom) || 1);
}

function runGenie(el: HTMLElement, id: AppId, direction: "in" | "out") {
  if (reduceMotion()) return Promise.resolve();
  const target = dockTarget(id);
  const box = el.getBoundingClientRect();
  const zoom = windowScale(el);
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const tx = target ? (target.x - box.left) / zoom : w / 2;
  const ty = target ? (target.y - box.top) / zoom : h + 160;
  const neck = target ? target.w / zoom : 56;
  el.classList.add("win-anim");
  el.style.transformOrigin = "0 0";
  const animation = el.animate(genieKeyframes(w, h, tx, ty, neck), {
    duration: direction === "out" ? 620 : 560,
    easing: "linear",
    direction: direction === "out" ? "normal" : "reverse",
    fill: "both",
  });
  return animation.finished.then(
    () => {
      if (direction === "in") {
        animation.cancel();
        el.style.transformOrigin = "";
        el.classList.remove("win-anim");
      }
    },
    () => undefined,
  );
}

/** First open: the window zooms up from slightly smaller, as macOS opens windows. */
function runOpen(el: HTMLElement) {
  if (reduceMotion()) return;
  el.classList.add("win-anim");
  const animation = el.animate(
    [
      { opacity: 0, transform: "translateY(14px) scale(0.94)" },
      { opacity: 1, transform: "none" },
    ],
    { duration: 340, easing: EASE_OUT },
  );
  void animation.finished.then(
    () => el.classList.remove("win-anim"),
    () => el.classList.remove("win-anim"),
  );
}

function runClose(el: HTMLElement) {
  if (reduceMotion()) return Promise.resolve();
  el.classList.add("win-anim");
  const animation = el.animate(
    [
      { opacity: 1, transform: "none" },
      { opacity: 0, transform: "scale(0.95)" },
    ],
    { duration: 200, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "both" },
  );
  return animation.finished.then(
    () => undefined,
    () => undefined,
  );
}

type ViewTransitionLike = { ready: Promise<void>; finished: Promise<void> };
type VTDocument = Document & { startViewTransition?: (cb: () => void) => ViewTransitionLike };

/**
 * Window motion runs on View Transition snapshots: the browser freezes the
 * window into a bitmap and only that bitmap is transformed, so neither the
 * window's DOM nor its backdrop blur is redrawn per frame.
 */
function canViewTransition() {
  return typeof document !== "undefined" && Boolean((document as VTDocument).startViewTransition) && !reduceMotion();
}

/**
 * `html.vt-win` takes the root out of the snapshot (`view-transition-name: none`),
 * so the browser captures only the window: the rest of the desktop (wallpaper
 * canvas, glass blur, dock) stays live instead of being rendered into two
 * full-stage bitmaps at the first frame and composited for the whole transition.
 */
let windowTransitions = 0;

function startViewTransition(update: () => void) {
  const root = document.documentElement;
  windowTransitions += 1;
  root.classList.add("vt-win");
  const release = holdMotion();
  const transition = (document as VTDocument).startViewTransition!(update);
  let settled = false;
  const done = () => {
    if (settled) return;
    settled = true;
    release();
    windowTransitions = Math.max(0, windowTransitions - 1);
    if (windowTransitions === 0) root.classList.remove("vt-win");
  };
  transition.finished.then(done, done);
  return transition;
}

function windowEl(id: AppId) {
  return document.querySelector<HTMLElement>(`[data-window="${id}"]`);
}

function nameWindow(el: HTMLElement, id: AppId, cls: string) {
  el.style.setProperty("view-transition-name", `win-${id}`);
  el.style.setProperty("view-transition-class", cls);
}

function unnameWindow(id: AppId) {
  const el = windowEl(id);
  el?.style.removeProperty("view-transition-name");
  el?.style.removeProperty("view-transition-class");
}

function animateSnapshot(id: AppId, part: "old" | "new", frames: Keyframe[], options: KeyframeAnimationOptions) {
  document.documentElement.animate(frames, { ...options, fill: "both", pseudoElement: `::view-transition-${part}(win-${id})` });
}

/**
 * Maximize / restore frame morph, compositor-only. The UA group animation tweens
 * width / height (main thread, a repaint per frame); instead the group sits at the
 * new box and a translate + `clip-path: inset(… round 20px)` carry the frame from
 * the old box to it. The snapshots stay pinned top-left at their own size
 * (`html.vt-morph` in globals.css), so it looks the same as the UA morph.
 */
const MORPH: KeyframeAnimationOptions = { duration: 460, easing: "cubic-bezier(0.32, 0.72, 0, 1)", fill: "both" };

function morphFrame(id: AppId, from: DOMRect, to: DOMRect) {
  const root = document.documentElement;
  const group = `::view-transition-group(win-${id})`;
  const ua = root
    .getAnimations({ subtree: true })
    .filter((a) => (a.effect as KeyframeEffect | null)?.pseudoElement === group);
  if (!ua.length || !to.width || !to.height) return;
  ua.forEach((a) => a.cancel());
  const style = getComputedStyle(root, group);
  const w = parseFloat(style.width);
  const h = parseFloat(style.height);
  if (!w || !h) return;
  const k = w / to.width; // group px per viewport px (html zoom / --desk-scale)
  const end = style.transform && style.transform !== "none" ? style.transform : "";
  const dx = (from.left - to.left) * k;
  const dy = (from.top - to.top) * k;
  root.classList.add("vt-morph");
  root.animate(
    [
      {
        transform: `translate(${dx}px, ${dy}px) ${end}`.trim(),
        clipPath: `inset(0px ${w - from.width * k}px ${h - from.height * k}px 0px round 20px)`,
      },
      { transform: end || "none", clipPath: "inset(0px 0px 0px 0px round 20px)" },
    ],
    { ...MORPH, pseudoElement: group },
  );
}

/**
 * Glass stand-in for View Transition snapshots. A captured window is its own
 * backdrop root, so its backdrop blur samples nothing and the glass reads as
 * see-through while it moves. While captured, `data-glassfake` paints the blurred
 * wallpaper (the decoded still behind the live shader, aligned to the window) under
 * the content (`::before`) with the window's own tint over it (`::after`), which is
 * what the real blur shows at rest. Afterwards it fades out over the real blur.
 */
const GLASS_PAD = 40; // the blurred layer overhangs the window, so its edges sample real neighbours

function fakeGlass(el: HTMLElement | null) {
  if (!el || !el.classList.contains("glass")) return;
  const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const img = document.querySelector<HTMLImageElement>(`img.wallpaper-${theme}`);
  const style = getComputedStyle(el);
  const width = parseFloat(style.width);
  const win = el.getBoundingClientRect();
  if (!img?.naturalWidth || !width || !win.width) return;
  const r = win.width / width; // viewport px per window px (desk scale, tablet zoom)
  const box = img.getBoundingClientRect();
  const cover = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
  const dw = img.naturalWidth * cover;
  const dh = img.naturalHeight * cover;
  const x = (box.left + (box.width - dw) / 2 - win.left) / r + GLASS_PAD;
  const y = (box.top + (box.height - dh) / 2 - win.top) / r + GLASS_PAD;
  const blurPx = parseFloat(style.getPropertyValue("--glass-blur")) || 20;
  // Pre-blurred still when it is ready (no live filter during the morph), else a CSS blur.
  const radius = blurRadiusFor(img, blurPx, dw / r);
  const still = blurredWallpaper(img, radius);
  if (!still) prepareBlurredWallpaper(img, radius);
  el.style.setProperty("--gf-wall", `url("${still ?? (img.currentSrc || img.src)}")`);
  el.style.setProperty("--gf-size", `${dw / r}px ${dh / r}px`);
  el.style.setProperty("--gf-pos", `${x}px ${y}px`);
  el.style.setProperty("--gf-blur", still ? "none" : `blur(${blurPx}px)`);
  el.style.setProperty("--gf-tint", style.backgroundImage);
  el.dataset.glassfake = "on";
}

/** Builds the pre-blurred wallpapers for desktop windows ahead of the first transition. */
export function prepareGlass() {
  const stage = document.querySelector<HTMLElement>("[data-desktop-stage]");
  if (!stage?.clientWidth) return;
  const r = stage.getBoundingClientRect().width / stage.clientWidth;
  document.querySelectorAll<HTMLImageElement>("img.wallpaper").forEach((img) => {
    if (!img.naturalWidth) return;
    const box = img.getBoundingClientRect();
    const cover = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
    prepareBlurredWallpaper(img, blurRadiusFor(img, 20, (img.naturalWidth * cover) / r));
  });
}

function releaseGlass(el: HTMLElement | null, fade = true) {
  if (!el || !el.dataset.glassfake) return;
  const clear = () => {
    if (el.dataset.glassfake !== "out") return;
    delete el.dataset.glassfake;
    for (const name of ["--gf-wall", "--gf-size", "--gf-pos", "--gf-blur", "--gf-tint"]) el.style.removeProperty(name);
  };
  el.dataset.glassfake = "out";
  if (fade && el.isConnected) window.setTimeout(clear, 280);
  else clear();
}

/** Genie frames for a snapshot in viewport px, from its box toward the dock icon. */
function genieFor(box: DOMRect, target: { x: number; y: number; w: number } | null) {
  const tx = target ? target.x - box.left : box.width / 2;
  const ty = target ? target.y - box.top : box.height + 160;
  return genieKeyframes(box.width, box.height, tx, ty, target ? target.w : 56).map((frame) => ({
    ...frame,
    transformOrigin: "0 0",
  }));
}

const OPEN_FRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(16px) scale(0.94)" },
  { opacity: 1, transform: "none" },
];

const CLOSE_FRAMES: Keyframe[] = [
  { opacity: 1, transform: "none" },
  { opacity: 0, transform: "scale(0.95)" },
];

function useStageBox() {
  const [box, setBox] = useState({ w: 1920, h: 1080 });
  useEffect(() => {
    const stage = document.querySelector("[data-desktop-stage]");
    if (!stage) return;
    const update = () => setBox({ w: stage.clientWidth, h: stage.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  return box;
}

/** Positions a window on the stage: maximized fills below the top bar, otherwise its geometry. */
export function WindowShell({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: ReactNode;
}) {
  const api = useWindow();
  const { state, z, focus } = api;
  const embedded = useContext(EmbedContext);
  const ref = useRef<HTMLElement>(null);
  const stage = useStageBox();
  const tablet = useLayoutMode() === "tablet";
  const wasMinimized = useRef(state.minimized);
  const busy = useRef(false);
  const opened = useRef(false);
  const closeRef = useRef(api.close);
  const flipFrom = useRef<DOMRect | null>(null);

  // Tablet: the frame is in stage px and the content is zoomed by k. CSS zoom also
  // multiplies the element's own left/top/width/height, so those are divided back.
  const k = tablet ? (state.geo.k ?? 1) : 1;
  const frame = state.maximized
    ? tablet
      ? { top: TABLET_TOP, left: TABLET_MARGIN, width: Math.max(320, stage.w - TABLET_MARGIN * 2), height: Math.max(240, stage.h - TABLET_TOP - TABLET_MARGIN) }
      : { top: 82, left: 15, width: Math.max(320, stage.w - 30), height: Math.max(240, stage.h - 94) }
    : { top: state.geo.y, left: state.geo.x, width: state.geo.w, height: state.geo.h };
  const placement: CSSProperties =
    k === 1
      ? { ...frame, zIndex: z }
      : { top: frame.top / k, left: frame.left / k, width: frame.width / k, height: frame.height / k, zoom: k, zIndex: z };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || state.minimized || state.exiting || state.staged) return;
    const restoring = wasMinimized.current;
    wasMinimized.current = false;
    const first = !opened.current;
    opened.current = true;
    if (canViewTransition()) return; // useWindowManager().open animated the snapshot
    if (restoring) void runGenie(el, state.id, "in");
    else if (first) runOpen(el);
  }, [state.minimized, state.exiting, state.staged, state.id]);

  // FLIP: the window jumps to its new frame at once, then a transform carries it
  // there from the old one — one layout instead of one per frame.
  useLayoutEffect(() => {
    const el = ref.current;
    const first = flipFrom.current;
    flipFrom.current = null;
    if (!el || !first || reduceMotion()) return;
    const last = el.getBoundingClientRect();
    if (!last.width || !last.height) return;
    const zoom = windowScale(el);
    const dx = (first.left - last.left) / zoom;
    const dy = (first.top - last.top) / zoom;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    el.classList.add("win-anim");
    el.style.transformOrigin = "0 0";
    const animation = el.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transform: "none" }],
      { duration: 460, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
    );
    const done = () => {
      el.style.transformOrigin = "";
      el.classList.remove("win-anim");
    };
    void animation.finished.then(done, done);
  }, [state.maximized]);

  useEffect(() => {
    closeRef.current = api.close;
  });

  useEffect(() => {
    const el = ref.current;
    if (!state.exiting || !el || busy.current) return;
    busy.current = true;
    void runClose(el).then(() => closeRef.current());
  }, [state.exiting, state.id]);

  const toggleMaximize = () => {
    const el = ref.current;
    if (busy.current || !el) return;
    if (!canViewTransition()) {
      flipFrom.current = el.getBoundingClientRect();
      api.toggleMaximize();
      return;
    }
    // The browser snapshots the window before and after and only morphs that
    // bitmap between the two frames, so nothing inside re-lays out per frame.
    busy.current = true;
    fakeGlass(el);
    el.style.setProperty("view-transition-name", `win-${state.id}`);
    el.style.setProperty("view-transition-class", "win");
    const from = el.getBoundingClientRect();
    const transition = startViewTransition(() => {
      flushSync(() => api.toggleMaximize());
      fakeGlass(el); // realign the stand-in to the new frame before the new snapshot
    });
    transition.ready.then(() => morphFrame(state.id, from, el.getBoundingClientRect())).catch(() => undefined);
    transition.finished.finally(() => {
      document.documentElement.classList.remove("vt-morph");
      el.style.removeProperty("view-transition-name");
      el.style.removeProperty("view-transition-class");
      releaseGlass(el);
      busy.current = false;
    });
  };

  const minimize = () => {
    const el = ref.current;
    if (busy.current || !el) return;
    busy.current = true;
    wasMinimized.current = true;
    if (canViewTransition()) {
      // Snapshot the window, drop it from the DOM, and pour the bitmap into the dock.
      const box = el.getBoundingClientRect();
      const target = dockTarget(state.id);
      fakeGlass(el);
      nameWindow(el, state.id, "win-pop");
      const transition = startViewTransition(() => flushSync(() => api.minimize()));
      transition.ready
        .then(() => animateSnapshot(state.id, "old", genieFor(box, target), { duration: 600, easing: "linear" }))
        .catch(() => undefined);
      transition.finished.finally(() => {
        unnameWindow(state.id);
        releaseGlass(el, false);
        busy.current = false;
      });
      return;
    }
    api.setLeaving(true);
    void runGenie(el, state.id, "out").then(() => {
      busy.current = false;
      api.minimize();
    });
  };

  const close = () => {
    const el = ref.current;
    if (busy.current || !el) return;
    busy.current = true;
    if (canViewTransition()) {
      fakeGlass(el);
      nameWindow(el, state.id, "win-pop");
      const transition = startViewTransition(() => flushSync(() => api.close()));
      transition.ready
        .then(() => animateSnapshot(state.id, "old", CLOSE_FRAMES, { duration: 200, easing: "cubic-bezier(0.4, 0, 1, 1)" }))
        .catch(() => undefined);
      return;
    }
    api.setLeaving(true);
    void runClose(el).then(() => api.close());
  };

  if (state.minimized && !KEEP_ALIVE.has(state.id)) return null;

  if (embedded) {
    // Mobile: the window fills its page (no frame, no window motion); the page owns open/close.
    return (
      <section
        role="dialog"
        aria-label={label}
        data-window={state.id}
        data-embedded
        data-maximized
        className={`relative flex size-full flex-col overflow-hidden ${className}`}
        onScroll={pinFrame}
      >
        {children}
      </section>
    );
  }

  return (
    <WindowProvider value={{ ...api, minimize, close, toggleMaximize }}>
      <section
        ref={ref}
        role="dialog"
        aria-label={label}
        data-window={state.id}
        data-maximized={(state.maximized && !state.minimized) || undefined}
        data-staged={state.staged || undefined}
        className={`absolute flex flex-col overflow-hidden ${className}`}
        style={placement}
        onPointerDownCapture={focus}
        onScroll={pinFrame}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </WindowProvider>
  );
}

/**
 * Proportional fit for documents laid out on a fixed design width: below that
 * width the content zooms down so the layout keeps its ratios.
 */
/** `fill` also scales up past the design width, at most to `maxZoom` (wide stages centre the column instead). */
export function useFitZoom(ref: RefObject<HTMLElement | null>, designWidth: number, fill = false, maxZoom = Infinity) {
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A skipped subtree (content-visibility: hidden while motion runs) measures 0; keep the last zoom.
    const update = () => el.clientWidth > 0 && setZoom(fill ? Math.min(maxZoom, el.clientWidth / designWidth) : Math.min(1, el.clientWidth / designWidth));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, designWidth, fill, maxZoom]);
  return zoom;
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  // A pre-rendered window made visible (at opacity 0) on pointer-down, so its effects,
  // style and layout run during the press and the open's first frame only drops the flag.
  const [staged, setStaged] = useState<AppId | null>(null);
  const latest = useRef(windows);
  const lastTabletPortrait = useRef(false);
  useLayoutEffect(() => {
    if (currentLayout() !== "tablet") return;
    const stage = stageSize();
    lastTabletPortrait.current = stage.h > stage.w;
  }, []);
  useLayoutEffect(() => {
    latest.current = windows;
  }, [windows]);

  const open = useCallback((id: AppId) => {
    const apply = () => {
      setStaged((current) => (current === id ? null : current));
      setWindows((list) => {
        const existing = list.find((w) => w.id === id);
        if (existing) return [...list.filter((w) => w.id !== id), { ...existing, minimized: false, leaving: false }];
        const geo = defaultGeometry(id, currentLayout());
        if (!geo) return list;
        return [...list, { id, geo, minimized: false, maximized: OPENS_MAXIMIZED.includes(id) }];
      });
    };
    const existing = latest.current.find((w) => w.id === id);
    const kind = !existing ? (DEFAULT_GEOMETRY[id] ? "open" : null) : existing.minimized ? "restore" : null;
    if (!kind || !canViewTransition()) {
      apply();
      return;
    }
    // Restore reverses the genie out of the dock icon; a first open zooms the snapshot up.
    const target = kind === "restore" ? dockTarget(id) : null;
    let box: DOMRect | null = null;
    const transition = startViewTransition(() => {
      flushSync(apply);
      const el = windowEl(id);
      if (!el) return;
      fakeGlass(el);
      nameWindow(el, id, "win-pop");
      box = el.getBoundingClientRect();
    });
    transition.ready
      .then(() => {
        if (!box) return;
        if (kind === "restore") {
          animateSnapshot(id, "new", genieFor(box, target), { duration: 540, easing: "linear", direction: "reverse" });
        } else {
          animateSnapshot(id, "new", OPEN_FRAMES, { duration: 360, easing: EASE_OUT });
        }
      })
      .catch(() => undefined);
    transition.finished.finally(() => {
      unnameWindow(id);
      releaseGlass(windowEl(id));
    });
  }, []);

  // Crossing 1280px switches desktop ⇄ tablet live: open windows move to that layout's frame.
  useEffect(
    () =>
      subscribeLayout(() => {
        const layout = currentLayout();
        if (layout === "tablet") {
          const stage = stageSize();
          lastTabletPortrait.current = stage.h > stage.w;
        }
        setWindows((list) => list.map((w) => ({ ...w, geo: defaultGeometry(w.id, layout) ?? w.geo })));
      }),
    [],
  );

  // Inside tablet mode an iPad rotating (or the browser resizing) changes the stage; keep windows on it.
  useEffect(() => {
    const onResize = () => {
      if (currentLayout() !== "tablet") return;
      const stage = stageSize();
      const portrait = stage.h > stage.w;
      setWindows((list) => {
        if (portrait !== lastTabletPortrait.current) {
          lastTabletPortrait.current = portrait;
          return list.map((w) => ({ ...w, geo: tabletGeometry(w.id) ?? w.geo }));
        }
        let changed = false;
        const next = list.map((w) => {
          // Only a frame that now runs off the stage moves (Figma's own frames may sit closer than 12px to an edge).
          const y = w.geo.y + w.geo.h > stage.h ? Math.max(TABLET_TOP, stage.h - w.geo.h - TABLET_MARGIN) : w.geo.y;
          const x = w.geo.x + w.geo.w > stage.w ? Math.max(TABLET_MARGIN, stage.w - w.geo.w - TABLET_MARGIN) : w.geo.x;
          if (x === w.geo.x && y === w.geo.y) return w;
          changed = true;
          return { ...w, geo: { ...w.geo, x, y } };
        });
        return changed ? next : list;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const update = useCallback((id: AppId, patch: (w: WindowState) => Partial<WindowState>) => {
    setWindows((list) => list.map((w) => (w.id === id ? { ...w, ...patch(w) } : w)));
  }, []);

  // Pre-rendered (hidden) light windows, and a generation per app so a closed one comes back fresh.
  const [warm, setWarm] = useState<AppId[]>([]);
  const [gens, setGens] = useState<Partial<Record<AppId, number>>>({});
  const stage = useCallback((id: AppId) => {
    if (!KEEP_ALIVE.has(id) || latest.current.some((w) => w.id === id)) return;
    setStaged(id);
  }, []);
  const unstage = useCallback((id: AppId) => setStaged((current) => (current === id ? null : current)), []);

  const prewarm = useCallback((id: AppId) => {
    if (!KEEP_ALIVE.has(id)) return;
    startTransition(() => setWarm((list) => (list.includes(id) ? list : [...list, id])));
  }, []);

  /** A closed keep-alive window unmounts with the close; a fresh copy is pre-rendered later. */
  const retire = useCallback((ids: AppId[]) => {
    const kept = ids.filter((id) => KEEP_ALIVE.has(id));
    if (!kept.length) return;
    setWarm((list) => list.filter((id) => !kept.includes(id)));
    setGens((g) => Object.fromEntries([...Object.entries(g), ...kept.map((id) => [id, (g[id] ?? 0) + 1])]));
    const again = () => (motionActive() ? schedule() : kept.forEach(prewarm));
    const schedule = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(again, { timeout: 4000 }) : setTimeout(again, 1500);
    window.setTimeout(schedule, 600);
  }, [prewarm]);

  const close = useCallback(
    (id: AppId) => {
      setWindows((list) => list.filter((w) => w.id !== id));
      retire([id]);
    },
    [retire],
  );

  const closeAll = useCallback(() => {
    retire(latest.current.filter((w) => w.minimized).map((w) => w.id));
    setWindows((list) => list.flatMap((w) => (w.minimized ? [] : [{ ...w, exiting: true }])));
  }, [retire]);

  const slots = useMemo<WindowSlot[]>(() => {
    const keyOf = (id: AppId) => `${id}:${gens[id] ?? 0}`;
    const list: WindowSlot[] = windows.map((w, index) => ({
      state: w,
      index,
      key: keyOf(w.id),
      hidden: KEEP_ALIVE.has(w.id) && w.minimized,
    }));
    for (const id of warm) {
      if (windows.some((w) => w.id === id)) continue;
      const geo = defaultGeometry(id, currentLayout());
      const isStaged = staged === id;
      if (geo) list.push({ state: { id, geo, minimized: false, maximized: false, staged: isStaged || undefined }, index: windows.length, key: keyOf(id), hidden: !isStaged });
    }
    return list;
  }, [windows, warm, gens, staged]);

  const focus = useCallback((id: AppId) => {
    setWindows((list) => {
      const target = list.find((w) => w.id === id);
      if (!target || list[list.length - 1]?.id === id) return list;
      return [...list.filter((w) => w.id !== id), target];
    });
  }, []);

  const visible = windows.filter((w) => !w.minimized);
  const top = visible[visible.length - 1] ?? null;

  return { windows, slots, top, open, close, closeAll, focus, update, prewarm, stage, unstage };
}
