/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { SectionHead } from "../parts";
import { useT } from "@/lib/i18n";
import { FLOW_H, FlowDiagram } from "./flowDiagram";

/**
 * Figma "Section — User Flow" (190:21977): head + white Flow Canvas (190:21985)
 * with the legend and Zoom Control (190:22364) on top. Behaves like the SAPP user
 * flow: − shrinks the diagram inside the white box, + / ⤢ / a click open it in a
 * full-window viewer over a dimmed, blurred backdrop (drag to pan, Ctrl/⌘ + wheel
 * or the pill to zoom, Esc or a click outside to close). The diagram is live DOM,
 * so it stays sharp at every zoom.
 */

/** The diagram's content box inside the 1584×1344 Figma canvas (nodes span x 53–1507, y 100–1280). */
const CROP = { x: 40, y: 88, w: 1480, h: 1206 };
const MIN_Z = 0.5;
const MAX_Z = 3;
const STEP = 0.25;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, Math.round(z * 100) / 100));
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ICON = {
  minus: "/figma/wd/v2/flow/70142.svg",
  plus: "/figma/wd/v2/flow/86842.svg",
  fit: "/figma/wd/v2/flow/443fa.svg",
};
const CLOSE =
  "M15.4419 4.55806C15.686 4.80214 15.686 5.19786 15.4419 5.44194L10.8839 10L15.4419 14.5581C15.686 14.8021 15.686 15.1979 15.4419 15.4419C15.1979 15.686 14.8021 15.686 14.5581 15.4419L10 10.8839L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L9.11612 10L4.55806 5.44194C4.31398 5.19786 4.31398 4.80214 4.55806 4.55806C4.80214 4.31398 5.19786 4.31398 5.44194 4.55806L10 9.11612L14.5581 4.55806C14.8021 4.31398 15.1979 4.31398 15.4419 4.55806Z";

/** Figma "Zoom Control" (190:22364). */
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
    <div className="relative flex shrink-0 items-center gap-0.5 rounded-full bg-[var(--cmd-surface-2)] p-1 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <button type="button" aria-label={t("Zoom out")} title={t("Zoom out")} disabled={outDisabled} onClick={onOut} className="bv-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <img src={ICON.minus} alt="" width={20} height={20} />
      </button>
      <span aria-live="polite" className="flex h-9 w-14 shrink-0 items-center justify-center text-[14px] leading-5 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)] tabular-nums">
        {Math.round(pct)}%
      </span>
      <button type="button" aria-label={t("Zoom in")} title={t("Zoom in")} disabled={inDisabled} onClick={onIn} className="bv-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <img src={ICON.plus} alt="" width={20} height={20} />
      </button>
      <span aria-hidden className="h-5 w-px shrink-0 bg-[var(--cmd-text-muted)]" />
      <button type="button" aria-label={fitLabel} title={fitLabel} onClick={onFit} className="bv-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full">
        <img src={ICON.fit} alt="" width={20} height={20} />
      </button>
    </div>
  );
}

function Legend() {
  const t = useT();
  return (
    <div className="flex shrink-0 items-center gap-[18px] rounded-full bg-[var(--cmd-surface-2)] px-3.5 py-2 text-[14px] leading-5 whitespace-nowrap text-[var(--cmd-text-secondary)]">
      <span className="flex items-center gap-2">
        <span className="h-0.5 w-[18px] bg-[var(--brand-bave)]" />
        {t("Booking path")}
      </span>
      <span className="flex items-center gap-2">
        <span className="h-px w-[18px] bg-[var(--cmd-text-muted)]" />
        {t("Navigation")}
      </span>
      <span className="flex items-center gap-2">
        <span className="size-3 rounded-[4px] bg-[var(--brand-bave-tint)]" />
        {t("Bottom-tab screen")}
      </span>
    </div>
  );
}

/** The diagram cropped to its content box, laid out at 1:1 design px. */
function Diagram() {
  return (
    <div className="relative overflow-hidden" style={{ width: CROP.w, height: CROP.h }}>
      <div className="absolute" style={{ left: -CROP.x, top: -CROP.y, width: 1584, height: FLOW_H }}>
        <FlowDiagram />
      </div>
    </div>
  );
}

type Rect = { x: number; y: number; w: number; h: number };
type Popup = { host: HTMLElement; fixed: boolean; zoom: number };

/** Rect of `el` in the unscaled coordinate space of `host` (the desktop may be CSS-scaled). */
function localRect(el: HTMLElement, host: HTMLElement, fixed: boolean): Rect {
  const r = el.getBoundingClientRect();
  if (fixed) return { x: r.left, y: r.top, w: r.width, h: r.height };
  const hr = host.getBoundingClientRect();
  const k = host.offsetWidth ? hr.width / host.offsetWidth : 1;
  return { x: (r.left - hr.left) / k, y: (r.top - hr.top) / k, w: r.width / k, h: r.height / k };
}

export function BaveUserFlow() {
  const t = useT();
  const stageRef = useRef<HTMLDivElement>(null);
  const [inline, setInline] = useState(1);
  const [popup, setPopup] = useState<Popup | null>(null);

  const open = useCallback((zoom: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const win = stage.closest<HTMLElement>("[data-window]");
    setPopup({ host: win ?? document.body, fixed: !win, zoom });
  }, []);

  const origin = useCallback((): Rect | null => {
    const stage = stageRef.current;
    if (!stage || !popup) return null;
    return localRect(stage, popup.host, popup.fixed);
  }, [popup]);

  return (
    <section id="wd-flow" className="relative flex flex-col gap-12 px-[156px] pt-[140px]">
      <SectionHead
        eyebrow={t("IDEATION  ·  02.1")}
        phase="system"
        title={t("User flow")}
        lead={t("A simple booking app focused on the core jobs — explore, compare, book, manage orders and review. The highlighted path is the 1-tap booking journey.")}
      />
      <div data-rv className="wd-hover relative h-[1344px] w-full shrink-0 overflow-hidden rounded-[32px] bg-[var(--cmd-surface-1)] shadow-[6px_6px_0_0_var(--wd-system-back),inset_0_1px_0_0_var(--cmd-edge)]">
        <div
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
          className="absolute inset-0 cursor-zoom-in"
        >
          <div
            ref={stageRef}
            className="absolute"
            style={{
              left: CROP.x,
              top: CROP.y,
              transformOrigin: "50% 45%",
              transform: `scale(${inline})`,
              transition: `transform 420ms ${EASE}`,
            }}
          >
            <Diagram />
          </div>
        </div>
        <div className="pointer-events-none absolute top-7 left-8 flex w-[1500px] items-center justify-between">
          <Legend />
          <div className="pointer-events-auto">
            <ZoomPill
              pct={inline * 100}
              outDisabled={inline <= MIN_Z}
              onOut={() => setInline((z) => Math.max(MIN_Z, z - STEP))}
              onIn={() => (inline < 1 ? setInline((z) => Math.min(1, z + STEP)) : open(1))}
              onFit={() => (inline < 1 ? setInline(1) : open(1))}
              fitLabel={inline < 1 ? t("Reset zoom") : t("Open full view")}
            />
          </div>
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
  "--cmd-text-on-primary": "#ffffff",
  "--cmd-edge": "rgba(10, 10, 10, 0.04)",
  "--cmd-accent": "#3d6fe8",
  "--brand-bave": "#02c3ea",
  "--brand-bave-tint": "rgba(2, 195, 234, 0.12)",
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

  const fit = port.w && port.h ? Math.min((port.w - 64) / CROP.w, (port.h - 64) / CROP.h) : 0;

  useEffect(() => {
    geo.current = { w: port.w, h: port.h, fit };
  }, [port, fit]);

  const clampView = useCallback((v: View): View => {
    const { w, h, fit: f } = geo.current;
    const sc = f * v.z;
    const mx = Math.max(0, (CROP.w * sc - w) / 2 + 32);
    const my = Math.max(0, (CROP.h * sc - h) / 2 + 32);
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

  useEffect(() => {
    const el = portRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPort({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Open: the dim fades in, the panel grows out of the in-page canvas; the backdrop
  // blur is switched on only once nothing is moving.
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    closeRef.current?.focus({ preventScroll: true });
    if (reduced()) {
      overlay.classList.add("is-settled");
      return;
    }
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    const o = getOrigin();
    const settle = () => {
      if (!closing.current) overlay.classList.add("is-settled");
    };
    if (!o) {
      settle();
      return;
    }
    const k = o.w / panel.offsetWidth;
    const from = `translate(${o.x - panel.offsetLeft}px, ${o.y - panel.offsetTop}px) scale(${k})`;
    const a = panel.animate(
      [
        { transform: from, opacity: 0.4 },
        { transform: "none", opacity: 1 },
      ],
      { duration: 460, easing: EASE },
    );
    a.onfinish = settle;
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    overlay?.classList.remove("is-settled");
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
  const canPan = CROP.w * sc > port.w || CROP.h * sc > port.h;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("User flow diagram")}
      className={`bv-overlay ${fixed ? "fixed" : "absolute"} inset-0 z-[80]`}
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
        <div className="flex h-[76px] shrink-0 items-center justify-between gap-6 pr-5 pl-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="size-[7px] shrink-0 rounded-full bg-[var(--cmd-accent)]" />
            <p className="text-[18px] leading-6 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)]">{t("User flow")}</p>
            <p className="truncate text-[14px] leading-5 text-[var(--cmd-text-muted)]">{t("Drag to pan · Ctrl / ⌘ + scroll to zoom")}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Legend />
            <ZoomPill
              pct={view.z * 100}
              outDisabled={view.z <= MIN_Z}
              inDisabled={view.z >= MAX_Z}
              onOut={() => zoomTo(view.z - STEP)}
              onIn={() => zoomTo(view.z + STEP)}
              onFit={() => setView({ z: 1, x: 0, y: 0 })}
              fitLabel={t("Fit to screen")}
            />
            <button
              ref={closeRef}
              type="button"
              aria-label={t("Close")}
              title={t("Close (Esc)")}
              onClick={close}
              className="bv-zbtn flex size-11 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-2)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="block">
                <path d={CLOSE} fill="#4B4F58" />
              </svg>
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
            <div
              className="pointer-events-none absolute top-1/2 left-1/2"
              style={{
                width: CROP.w,
                height: CROP.h,
                transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${sc})`,
                transition: dragging ? "none" : `transform 260ms ${EASE}`,
                willChange: dragging ? "transform" : undefined,
              }}
            >
              <Diagram />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
