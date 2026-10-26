"use client";

import "./solution.css";
import { sappBeVietnam } from "./fonts";
import { useT } from "@/lib/i18n";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { SappHeading, SappSectionHead } from "./parts";

const beVietnam = sappBeVietnam;

const A = "/figma/sapp/solution";

/* ------------------------------------------------------------------ */
/* Design solution — Figma 247:14870                                   */
/* ------------------------------------------------------------------ */

type Goal = {
  title: string;
  body: string;
  bg: string;
  bodyWidth: number;
  /** Trailing empty paragraph in Figma (Clarity only) keeps the copy 24px higher. */
  trail?: boolean;
  image: ReactNode;
};

const GOALS: Goal[] = [
  {
    title: "Clarity",
    body: "Help learners clearly understand their course status, progress, deadlines, and next learning actions.",
    bg: "#ff9310",
    bodyWidth: 311,
    trail: true,
    image: (
      <div className="sol-goal-img relative aspect-[898/887] w-full shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`${A}/goal-clarity.png`} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      </div>
    ),
  },
  {
    title: "Structure",
    body: "Organize courses, sections, activities, tests, notes, and resources into a clear and consistent learning flow.",
    bg: "#e8c0e9",
    bodyWidth: 354,
    image: (
      <div className="sol-goal-img relative h-[412px] w-[403px] shrink-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={`${A}/goal-structure.png`} className="absolute top-[4.77%] left-[-0.12%] h-[90.43%] w-full max-w-none" />
        </div>
      </div>
    ),
  },
  {
    title: "Progress Tracking",
    body: "Provide visual dashboards and progress indicators so users can monitor learning completion and performance.",
    bg: "#d1ea21",
    bodyWidth: 354,
    image: (
      <div className="sol-goal-img relative h-[396px] w-[403px] shrink-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={`${A}/goal-progress.png`} className="absolute top-[7.83%] left-[0.04%] h-[84.46%] w-full max-w-none" />
        </div>
      </div>
    ),
  },
];

export function SappDesignSolution() {
  const t = useT();
  return (
    <section id="wd-solution" className="relative flex w-full flex-col items-start px-[156px] pt-[100px]">
      <div className="flex w-full flex-col items-start gap-12 px-20">
        <SappSectionHead
          eyebrow={t("IDEATION  ·  02.1")}
          title={t("Design solution")}
          lead={t("A unified learning experience where students access courses, track progress, complete tests, manage schedules and receive updates in one place — while teachers and internal teams get tools for classes, teaching progress, requests and learning data. The goal: fewer fragmented workflows and a clear next step at every point of the journey.")}
        />
        <div className="flex w-full flex-col items-start gap-6">
          <h3 className={`${beVietnam.className} w-full text-[24px] leading-[1.5] font-bold tracking-[0.24px] text-[#1b1b1b]`}>
            {t("Design goals")}
          </h3>
          <ul className="sol-goals flex w-full items-stretch gap-6">
            {GOALS.map((g) => (
              <li
                key={g.title}
                tabIndex={0}
                className="sol-goal relative flex h-[635px] min-w-px flex-1 items-start rounded-[24px] px-6 py-8 outline-none"
                style={{ background: g.bg }}
              >
                <div className="flex h-full min-w-px flex-1 flex-col items-center justify-between">
                  {g.image}
                  <div className={`sol-goal-copy flex w-full shrink-0 flex-col items-center gap-4 text-center text-[#1b1b1b] ${g.trail ? "pb-6" : ""}`}>
                    <p className="text-[24px] leading-8 font-bold">{t(g.title)}</p>
                    <p className="sol-goal-desc text-base leading-6" style={{ width: g.bodyWidth }}>
                      {t(g.body)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* User flow — Figma 247:14900                                         */
/* ------------------------------------------------------------------ */

/** Diagram as laid out in Figma: 1496×1131 (cropped to 1336 inside the canvas). Source PNG is 3970×3002. */
const W0 = 1496;
const H0 = 1131;
const CLIP_W = 1336;
const MIN_Z = 0.5;
const MAX_Z = 3;
const STEP = 0.25;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, Math.round(z * 100) / 100));

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="block">
      <path d={d} fill="#4B4F58" />
    </svg>
  );
}

const MINUS = "M16.25 9.375C16.5952 9.375 16.875 9.65482 16.875 10C16.875 10.3452 16.5952 10.625 16.25 10.625H3.75C3.40482 10.625 3.125 10.3452 3.125 10C3.125 9.65482 3.40482 9.375 3.75 9.375H16.25Z";
const PLUS = "M10 3.125C10.3452 3.125 10.625 3.40482 10.625 3.75V9.375H16.25C16.5952 9.375 16.875 9.65482 16.875 10C16.875 10.3452 16.5952 10.625 16.25 10.625H10.625V16.25C10.625 16.5952 10.3452 16.875 10 16.875C9.65482 16.875 9.375 16.5952 9.375 16.25V10.625H3.75C3.40482 10.625 3.125 10.3452 3.125 10C3.125 9.65482 3.40482 9.375 3.75 9.375H9.375V3.75C9.375 3.40482 9.65482 3.125 10 3.125Z";
const MAXIMIZE = "M8.084 10.867C8.37382 10.5771 8.84323 10.5771 9.13305 10.867C9.42286 11.1568 9.42286 11.6262 9.13305 11.916L4.36977 16.6793H8.1447C8.55456 16.6793 8.88664 17.0113 8.88664 17.4212C8.88664 17.8311 8.55456 18.1631 8.1447 18.1631H2.57879C2.16893 18.1631 1.83685 17.8311 1.83685 17.4212V11.8553C1.83685 11.4454 2.16893 11.1134 2.57879 11.1134C2.98865 11.1134 3.32073 11.4454 3.32073 11.8553V15.6302L8.084 10.867ZM18.1631 8.1447C18.1631 8.55456 17.8311 8.88664 17.4212 8.88664C17.0113 8.88664 16.6793 8.55456 16.6793 8.1447V4.36977L11.916 9.13305C11.6262 9.42286 11.1568 9.42286 10.867 9.13305C10.5771 8.84323 10.5771 8.37382 10.867 8.084L15.6302 3.32073H11.8553C11.4454 3.32073 11.1134 2.98865 11.1134 2.57879C11.1134 2.16893 11.4454 1.83685 11.8553 1.83685H17.4212C17.8311 1.83685 18.1631 2.16893 18.1631 2.57879V8.1447Z";
const CLOSE = "M15.4419 4.55806C15.686 4.80214 15.686 5.19786 15.4419 5.44194L10.8839 10L15.4419 14.5581C15.686 14.8021 15.686 15.1979 15.4419 15.4419C15.1979 15.686 14.8021 15.686 14.5581 15.4419L10 10.8839L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L9.11612 10L4.55806 5.44194C4.31398 5.19786 4.31398 4.80214 4.55806 4.55806C4.80214 4.31398 5.19786 4.31398 5.44194 4.55806L10 9.11612L14.5581 4.55806C14.8021 4.31398 15.1979 4.31398 15.4419 4.55806Z";

/** Figma "WRK/Zoom Control" (183:15591). */
function ZoomPill({
  pct,
  onOut,
  onIn,
  onFit,
  outDisabled,
  inDisabled,
  fitLabel,
}: {
  pct: number;
  onOut: () => void;
  onIn: () => void;
  onFit: () => void;
  outDisabled?: boolean;
  inDisabled?: boolean;
  fitLabel: string;
}) {
  const t = useT();
  return (
    <div className="relative flex items-center gap-0.5 rounded-full bg-[var(--cmd-surface-2)] p-1 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <button type="button" aria-label={t("Zoom out")} title={t("Zoom out")} disabled={outDisabled} onClick={onOut} className="sol-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <Icon d={MINUS} />
      </button>
      <span aria-live="polite" className="flex h-9 w-14 shrink-0 items-center justify-center text-[14px] leading-5 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)] tabular-nums">
        {Math.round(pct)}%
      </span>
      <button type="button" aria-label={t("Zoom in")} title={t("Zoom in")} disabled={inDisabled} onClick={onIn} className="sol-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <Icon d={PLUS} />
      </button>
      <span aria-hidden className="h-5 w-px shrink-0 bg-[var(--cmd-text-muted)]" />
      <button type="button" aria-label={t(fitLabel)} title={t(fitLabel)} onClick={onFit} className="sol-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full">
        <Icon d={MAXIMIZE} />
      </button>
    </div>
  );
}

type Rect = { x: number; y: number; w: number; h: number };
type Popup = { host: HTMLElement; fixed: boolean; zoom: number };

/** Rect of `el` in the unscaled coordinate space of `host` (the window may be CSS-scaled). */
function localRect(el: HTMLElement, host: HTMLElement, fixed: boolean): Rect {
  const r = el.getBoundingClientRect();
  if (fixed) return { x: r.left, y: r.top, w: r.width, h: r.height };
  const hr = host.getBoundingClientRect();
  const k = host.offsetWidth ? hr.width / host.offsetWidth : 1;
  return { x: (r.left - hr.left) / k, y: (r.top - hr.top) / k, w: r.width / k, h: r.height / k };
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SappUserFlow() {
  const t = useT();
  const clipRef = useRef<HTMLDivElement>(null);
  const [inline, setInline] = useState(1);
  const [popup, setPopup] = useState<Popup | null>(null);

  const open = useCallback((zoom: number) => {
    const clip = clipRef.current;
    if (!clip) return;
    const win = clip.closest<HTMLElement>("[data-window]");
    setPopup({ host: win ?? document.body, fixed: !win, zoom });
  }, []);

  const origin = useCallback((): Rect | null => {
    const clip = clipRef.current;
    if (!clip || !popup) return null;
    return localRect(clip, popup.host, popup.fixed);
  }, [popup]);

  const s = inline;
  const tx = Math.max(0, (CLIP_W - W0 * s) / 2);
  const ty = (H0 - H0 * s) / 2;

  return (
    <section id="wd-flow" className="relative flex w-full flex-col items-start gap-12 px-[236px] pt-[140px]">
      <div className="flex w-full flex-col items-start gap-[22px]">
        <div className="flex flex-col items-start gap-4">
          <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
            <span className="size-[7px] shrink-0 rounded-full bg-[var(--cmd-accent)]" />
            <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{t("IDEATION  ·  02.2")}</span>
          </span>
          <SappHeading>{t("User flow")}</SappHeading>
        </div>
        <p className="w-[760px] text-base leading-6 text-[var(--cmd-text-primary)]">
          {t("LMS Pro user flow covers the complete learning journey — from accessing courses and activating content to studying lessons, taking tests, tracking progress and reviewing results — so learners move clearly between courses, sections, activities, schedules, notifications and dashboards.")}
        </p>
      </div>

      <div className="wd-hover relative h-[1251px] w-full shrink-0 rounded-[32px] bg-[var(--cmd-surface-1)] shadow-[12px_12px_0_0_var(--sapp-back),inset_0_1px_0_0_var(--cmd-edge)]">
        <div
          ref={clipRef}
          role="button"
          tabIndex={0}
          aria-label={t("Open the user flow diagram in full view")}
          onClick={() => open(1)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open(1);
            }
          }}
          className="absolute top-8 left-8 h-[1131px] w-[1336px] cursor-zoom-in overflow-hidden rounded-[16px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={t("SAPP LMS Pro user flow: login, course access, learning activity and test flows")}
            src={`${A}/userflow.png`}
            draggable={false}
            className="pointer-events-none absolute top-0 left-0 max-w-none select-none"
            style={{
              width: W0,
              height: H0,
              transformOrigin: "0 0",
              transform: `translate(${tx}px, ${ty}px) scale(${s})`,
              transition: `transform 420ms ${EASE}`,
            }}
          />
        </div>
        <div className="absolute top-8 right-7">
          <ZoomPill
            pct={inline * 100}
            outDisabled={inline <= MIN_Z}
            onOut={() => setInline((z) => Math.max(MIN_Z, z - STEP))}
            onIn={() => open(1)}
            onFit={() => (inline < 1 ? setInline(1) : open(1))}
            fitLabel={inline < 1 ? "Reset zoom" : "Open full view"}
          />
        </div>
      </div>

      {popup
        ? createPortal(
            <FlowPopup fixed={popup.fixed} initialZoom={popup.zoom} getOrigin={origin} onClosed={() => setPopup(null)} />,
            popup.host,
          )
        : null}
    </section>
  );
}

type View = { z: number; x: number; y: number };

/** The popup is portalled outside `.work-detail`, so it carries the light case-study tokens itself. */
const POPUP_TOKENS = {
  "--cmd-surface-1": "#ffffff",
  "--cmd-surface-2": "#f0f1f3",
  "--cmd-surface-3": "#e4e6ea",
  "--cmd-text-primary": "#0a0a0a",
  "--cmd-text-secondary": "#4b4f58",
  "--cmd-text-muted": "#8a8f98",
  "--cmd-edge": "rgba(10, 10, 10, 0.04)",
  "--cmd-accent": "#3d6fe8",
} as CSSProperties;

function FlowPopup({
  fixed,
  initialZoom,
  getOrigin,
  onClosed,
}: {
  fixed: boolean;
  initialZoom: number;
  getOrigin: () => Rect | null;
  onClosed: () => void;
}) {
  const t = useT();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const portRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const geo = useRef({ w: 0, h: 0, fit: 1 });
  const drag = useRef<{ id: number; sx: number; sy: number; vx: number; vy: number } | null>(null);

  const [port, setPort] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View>({ z: clampZ(initialZoom), x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const fit = port.w && port.h ? Math.min((port.w - 64) / W0, (port.h - 64) / H0) : 0;

  useEffect(() => {
    geo.current = { w: port.w, h: port.h, fit };
  }, [port, fit]);

  const clampView = useCallback((v: View): View => {
    const { w, h, fit: f } = geo.current;
    const sc = f * v.z;
    const mx = Math.max(0, (W0 * sc - w) / 2 + 32);
    const my = Math.max(0, (H0 * sc - h) / 2 + 32);
    return { z: v.z, x: Math.min(mx, Math.max(-mx, v.x)), y: Math.min(my, Math.max(-my, v.y)) };
  }, []);

  /** Zoom to `z`, keeping the point (cx, cy) — relative to the viewport centre — still. */
  const zoomTo = useCallback(
    (z: number, cx = 0, cy = 0) => {
      setView((v) => {
        const z2 = clampZ(z);
        const k = z2 / v.z;
        return clampView({ z: z2, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      });
    },
    [clampView],
  );

  // Measure the viewport.
  useEffect(() => {
    const el = portRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPort({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Open: overlay fades in, panel grows out of the in-page canvas.
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    closeRef.current?.focus({ preventScroll: true });
    if (reduced()) return;
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    const o = getOrigin();
    if (!o) return;
    const k = o.w / panel.offsetWidth;
    const from = `translate(${o.x - panel.offsetLeft}px, ${o.y - panel.offsetTop}px) scale(${k})`;
    panel.animate(
      [
        { transform: from, opacity: 0.4 },
        { transform: "none", opacity: 1 },
      ],
      { duration: 460, easing: EASE },
    );
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const o = getOrigin();
    if (!overlay || !panel || !o || reduced()) {
      onClosed();
      return;
    }
    const k = o.w / panel.offsetWidth;
    const to = `translate(${o.x - panel.offsetLeft}px, ${o.y - panel.offsetTop}px) scale(${k})`;
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease-in", fill: "forwards" });
    const a = panel.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: to, opacity: 0 },
      ],
      { duration: 340, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
    );
    a.onfinish = () => onClosed();
  }, [getOrigin, onClosed]);

  // Esc closes the popup only — captured before the desktop's Esc-closes-window handler.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      e.preventDefault();
      close();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [close]);

  // Wheel never reaches the page: ctrl/⌘ + wheel zooms at the cursor, plain wheel pans.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const el = portRef.current;
      if (!el || !el.contains(e.target as Node)) return;
      const r = el.getBoundingClientRect();
      const k = el.clientWidth ? r.width / el.clientWidth : 1;
      if (e.ctrlKey || e.metaKey) {
        const cx = (e.clientX - r.left) / k - el.clientWidth / 2;
        const cy = (e.clientY - r.top) / k - el.clientHeight / 2;
        setView((v) => {
          const z2 = clampZ(v.z * Math.exp(-e.deltaY * 0.0015));
          const f = z2 / v.z;
          return clampView({ z: z2, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f });
        });
      } else {
        setView((v) => clampView({ z: v.z, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    overlay.addEventListener("wheel", onWheel, { passive: false });
    return () => overlay.removeEventListener("wheel", onWheel);
  }, [clampView]);

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y };
    setDragging(true);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const r = e.currentTarget.getBoundingClientRect();
    const k = e.currentTarget.clientWidth ? r.width / e.currentTarget.clientWidth : 1;
    const nx = d.vx + (e.clientX - d.sx) / k;
    const ny = d.vy + (e.clientY - d.sy) / k;
    setView((v) => clampView({ z: v.z, x: nx, y: ny }));
  };
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
  };

  const sc = fit * view.z;
  const canPan = W0 * sc > port.w || H0 * sc > port.h;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("User flow diagram")}
      className={`${fixed ? "fixed" : "absolute"} inset-0 z-[80] bg-[rgba(10,10,10,0.55)]`}
      style={POPUP_TOKENS}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        className="absolute inset-10 flex flex-col overflow-hidden rounded-[32px] bg-[var(--cmd-surface-1)] shadow-[0_30px_80px_-20px_rgba(10,10,10,0.45),inset_0_1px_0_0_var(--cmd-edge)]"
        style={{ transformOrigin: "0 0" }}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between pr-5 pl-8">
          <div className="flex items-center gap-3">
            <span className="size-[7px] rounded-full bg-[var(--cmd-accent)]" />
            <p className="text-[18px] leading-6 font-semibold text-[var(--cmd-text-primary)]">{t("User flow")}</p>
            <p className="text-[14px] leading-5 text-[var(--cmd-text-muted)]">{t("Drag to pan · Ctrl / ⌘ + scroll to zoom")}</p>
          </div>
          <div className="flex items-center gap-3">
            <ZoomPill
              pct={view.z * 100}
              outDisabled={view.z <= MIN_Z}
              inDisabled={view.z >= MAX_Z}
              onOut={() => zoomTo(view.z - STEP)}
              onIn={() => zoomTo(view.z + STEP)}
              onFit={() => setView({ z: 1, x: 0, y: 0 })}
              fitLabel="Fit to screen"
            />
            <button
              ref={closeRef}
              type="button"
              aria-label={t("Close")}
              title={t("Close (Esc)")}
              onClick={close}
              className="sol-zbtn flex size-11 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-2)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
            >
              <Icon d={CLOSE} />
            </button>
          </div>
        </div>
        <div
          ref={portRef}
          className={`relative mx-5 mb-5 min-h-0 flex-1 touch-none overflow-hidden rounded-[20px] bg-[var(--cmd-surface-1)] select-none ${
            canPan ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
          }`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onDoubleClick={() => zoomTo(view.z < 1.5 ? 2 : 1)}
        >
          {fit ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt={t("SAPP LMS Pro user flow, full diagram")}
              src={`${A}/userflow.png`}
              draggable={false}
              className="pointer-events-none absolute top-1/2 left-1/2 max-w-none"
              style={{
                width: W0,
                height: H0,
                transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${sc})`,
                transition: dragging ? "none" : `transform 260ms ${EASE}`,
                willChange: dragging ? "transform" : undefined,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
