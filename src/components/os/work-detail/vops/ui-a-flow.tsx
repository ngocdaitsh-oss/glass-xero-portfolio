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
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { VopsEyebrow, VopsHeading } from "./parts";

/**
 * vOps · "Section — User flows" (Figma 281:14856): head (293:15227) + the white
 * Flow Canvas (294:14857, 1560×2056) with its legend and the Zoom Control that sits
 * 47px above the canvas' top-right corner. The diagram is live DOM (nodes, pills,
 * step badges) over the exported Figma connector vectors. Behaves like the SAPP / Bave
 * user flow: − shrinks the diagram inside the white box, + / ⤢ / a click open the
 * full-window viewer over a dimmed backdrop (blur only once settled; drag to pan,
 * Ctrl/⌘ + wheel or the pill to zoom, double-click toggles 2×, Esc or a click
 * outside to close).
 */

const F = "/figma/vops/ui-a/flow";
const CANVAS_W = 1560;
const CANVAS_H = 2056;
/** Content box of the diagram inside the canvas (nodes span x 53–1507, y 100–1991, plus 2px rings). */
const CROP = { x: 41, y: 88, w: 1478, h: 1915 };
const MIN_Z = 0.5;
const MAX_Z = 3;
const STEP = 0.25;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, Math.round(z * 100) / 100));
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Link = { kind: "main" | "alt" | "edge" | "nav"; x: number; y: number; w: number; h: number; inset: string; src: string };
type Item = { t: string; bg?: string; color?: string };
type FlowNode = {
  name: string;
  x: number;
  y: number;
  w: number;
  bg: string;
  ring?: string;
  tile?: string;
  icon: string;
  label: string;
  labelColor: string;
  count?: string;
  rail?: number;
  items?: Item[];
  desc?: string;
};

/* ------------------------------------------------------------------ */
/* Icons (Figma "WRK/Zoom Control" 183:15591)                          */
/* ------------------------------------------------------------------ */

const MINUS = "M16.25 9.375C16.5952 9.375 16.875 9.65482 16.875 10C16.875 10.3452 16.5952 10.625 16.25 10.625H3.75C3.40482 10.625 3.125 10.3452 3.125 10C3.125 9.65482 3.40482 9.375 3.75 9.375H16.25Z";
const PLUS = "M10 3.125C10.3452 3.125 10.625 3.40482 10.625 3.75V9.375H16.25C16.5952 9.375 16.875 9.65482 16.875 10C16.875 10.3452 16.5952 10.625 16.25 10.625H10.625V16.25C10.625 16.5952 10.3452 16.875 10 16.875C9.65482 16.875 9.375 16.5952 9.375 16.25V10.625H3.75C3.40482 10.625 3.125 10.3452 3.125 10C3.125 9.65482 3.40482 9.375 3.75 9.375H9.375V3.75C9.375 3.40482 9.65482 3.125 10 3.125Z";
const MAXIMIZE = "M8.084 10.867C8.37382 10.5771 8.84323 10.5771 9.13305 10.867C9.42286 11.1568 9.42286 11.6262 9.13305 11.916L4.36977 16.6793H8.1447C8.55456 16.6793 8.88664 17.0113 8.88664 17.4212C8.88664 17.8311 8.55456 18.1631 8.1447 18.1631H2.57879C2.16893 18.1631 1.83685 17.8311 1.83685 17.4212V11.8553C1.83685 11.4454 2.16893 11.1134 2.57879 11.1134C2.98865 11.1134 3.32073 11.4454 3.32073 11.8553V15.6302L8.084 10.867ZM18.1631 8.1447C18.1631 8.55456 17.8311 8.88664 17.4212 8.88664C17.0113 8.88664 16.6793 8.55456 16.6793 8.1447V4.36977L11.916 9.13305C11.6262 9.42286 11.1568 9.42286 10.867 9.13305C10.5771 8.84323 10.5771 8.37382 10.867 8.084L15.6302 3.32073H11.8553C11.4454 3.32073 11.1134 2.98865 11.1134 2.57879C11.1134 2.16893 11.4454 1.83685 11.8553 1.83685H17.4212C17.8311 1.83685 18.1631 2.16893 18.1631 2.57879V8.1447Z";
const CLOSE = "M15.4419 4.55806C15.686 4.80214 15.686 5.19786 15.4419 5.44194L10.8839 10L15.4419 14.5581C15.686 14.8021 15.686 15.1979 15.4419 15.4419C15.1979 15.686 14.8021 15.686 14.5581 15.4419L10 10.8839L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L9.11612 10L4.55806 5.44194C4.31398 5.19786 4.31398 4.80214 4.55806 4.55806C4.80214 4.31398 5.19786 4.31398 5.44194 4.55806L10 9.11612L14.5581 4.55806C14.8021 4.31398 15.1979 4.31398 15.4419 4.55806Z";

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="block">
      <path d={d} fill="#4B4F58" />
    </svg>
  );
}

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
      <button type="button" aria-label={t("Zoom out")} title={t("Zoom out")} disabled={outDisabled} onClick={onOut} className="uia-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <Icon d={MINUS} />
      </button>
      <span aria-live="polite" className="flex h-9 w-14 shrink-0 items-center justify-center text-[14px] leading-5 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)] tabular-nums">
        {Math.round(pct)}%
      </span>
      <button type="button" aria-label={t("Zoom in")} title={t("Zoom in")} disabled={inDisabled} onClick={onIn} className="uia-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <Icon d={PLUS} />
      </button>
      <span aria-hidden className="h-5 w-px shrink-0 bg-[var(--cmd-text-muted)]" />
      <button type="button" aria-label={fitLabel} title={fitLabel} onClick={onFit} className="uia-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full">
        <Icon d={MAXIMIZE} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Legend (294:14858)                                                  */
/* ------------------------------------------------------------------ */

function Dash({ color }: { color: string }) {
  return (
    <span className="flex items-start gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-0.5 w-[5px] rounded-[1px]" style={{ background: color }} />
      ))}
    </span>
  );
}

function Legend() {
  const t = useT();
  return (
    <div className="flex items-center gap-[18px] rounded-full bg-[var(--cmd-surface-2)] px-3.5 py-2 text-[14px] leading-5 whitespace-nowrap text-[#4b4f58]">
      <span className="flex items-center gap-2">
        <span className="h-0.5 w-[18px] bg-[#ee0033]" />
        {t("Main journey")}
      </span>
      <span className="flex items-center gap-2">
        <Dash color="#2d96ff" />
        {t("Alternative path")}
      </span>
      <span className="flex items-center gap-2">
        <Dash color="#f59e0b" />
        {t("Edge case")}
      </span>
      <span className="flex items-center gap-2">
        <span className="h-px w-[18px] bg-[#8a8f98]" />
        {t("Navigation")}
      </span>
      <span className="flex items-center gap-2">
        <span className="size-3 rounded-[4px] bg-[#e9ebf0]" />
        {t("Rail module")}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Diagram                                                              */
/* ------------------------------------------------------------------ */

function NodeCard({ n }: { n: FlowNode }) {
  const t = useT();
  return (
    <div
      className="uia-fnode absolute flex flex-col items-start gap-3.5 overflow-clip rounded-[18px] p-4"
      style={{ left: n.x, top: n.y, width: n.w, background: n.bg, boxShadow: n.ring ? `0 0 0 2px ${n.ring}` : undefined }}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-[10px] p-2" style={{ background: n.tile ?? "#ffffff" }}>
            <img src={`${F}/${n.icon}.svg`} alt="" width={20} height={20} className="block size-5" />
          </div>
          <div className="flex flex-col items-start whitespace-nowrap">
            <p className="text-[14px] leading-5" style={{ color: n.labelColor }}>
              {t(n.label)}
            </p>
            <p className="text-[18px] leading-[1.4] font-semibold text-[#0a0a0a]">{t(n.name)}</p>
          </div>
        </div>
        {n.count ? <p className="rounded-full bg-white px-2 py-px text-[14px] leading-5 whitespace-nowrap text-[#8a8f98]">{n.count}</p> : null}
      </div>
      {n.items ? (
        <div className="relative flex w-full flex-col items-start gap-1">
          <div className="absolute top-0 left-[7px] w-px bg-[#c4c7cd]" style={{ height: n.rail }} />
          {n.items.map((it) => (
            <div key={it.t} className="flex w-full items-start">
              <div className="relative h-8 w-5 shrink-0">
                <div className="absolute top-4 left-[7px] h-px w-[11px] bg-[#c4c7cd]" />
              </div>
              <div className="flex min-w-px flex-1 items-start rounded-[8px] px-2.5 py-1.5" style={{ background: it.bg ?? "#ffffff" }}>
                <p
                  className={`text-[14px] whitespace-nowrap ${it.bg ? "leading-[1.4] font-semibold" : "leading-5"}`}
                  style={{ color: it.color ?? "#4b4f58" }}
                >
                  {t(it.t)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[14px] leading-5 text-[#8a8f98]" style={{ width: n.w - 32 }}>
          {n.desc ? t(n.desc) : null}
        </p>
      )}
    </div>
  );
}

/** The full 1560×2056 canvas layer without the legend, at 1:1 design px. */
function DiagramLayer() {
  const t = useT();
  return (
    <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
      {LINKS.map((l, i) => (
        <div key={i} className="pointer-events-none absolute" style={{ left: l.x, top: l.y, width: l.w, height: l.h }}>
          <div className="absolute" style={{ inset: l.inset }}>
            <img src={`${F}/${l.src}.svg`} alt="" className="block size-full max-w-none" />
          </div>
        </div>
      ))}
      {NODES.map((n) => (
        <NodeCard key={n.name} n={n} />
      ))}
      {STEPS.map((s) => (
        <div key={s} className="absolute flex size-7 items-center justify-center rounded-full bg-[#ee0033]" style={{ left: 533, top: STEP_Y[s - 1] }}>
          <p className="text-[14px] leading-[1.4] font-semibold text-white">{s}</p>
        </div>
      ))}
      <div className="absolute flex items-start rounded-full bg-[#0a0a0a] px-2.5 py-0.5" style={{ left: 735.5, top: 199 }}>
        <p className="text-[14px] leading-5 whitespace-nowrap text-white">{t("6 modules")}</p>
      </div>
    </div>
  );
}

/** The diagram cropped to its content box. */
function Diagram() {
  return (
    <div className="relative overflow-hidden" style={{ width: CROP.w, height: CROP.h }}>
      <div className="absolute" style={{ left: -CROP.x, top: -CROP.y }}>
        <DiagramLayer />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

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

export function VopsUserFlows() {
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
    <section id="wd-flows" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <div className="flex w-full flex-col items-start gap-6">
        <Reveal enter={60}>
          <div className="flex flex-col items-start gap-4">
            <VopsEyebrow label={t("IDEATION  ·  03.1")} />
            <VopsHeading>{t("User flow")}</VopsHeading>
          </div>
        </Reveal>
        <Reveal enter={40}>
          <p className="w-[727px] text-[20px] leading-[1.4] text-[#4b4f58]">
            {t("How an employee moves through vOps on the web — six modules on the rail, one highlighted journey (filing a leave request), two alternative routes and the edge cases each step has to survive.")}
          </p>
        </Reveal>
      </div>

      <Reveal className="w-full" enter={60}>
        <div
          className="wd-hover relative w-full shrink-0 rounded-[32px] bg-[var(--cmd-surface-1)] shadow-[12px_12px_0_0_rgba(103,152,255,0.32),inset_0_1px_0_0_var(--cmd-edge)]"
          style={{ height: CANVAS_H }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[32px]">
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
                  transformOrigin: "50% 0",
                  transform: `scale(${inline})`,
                  transition: `transform 420ms ${EASE}`,
                }}
              >
                <Diagram />
              </div>
            </div>
            <div className="pointer-events-none absolute top-7 left-8">
              <Legend />
            </div>
          </div>
          {/* Figma places the Zoom Control 47px above the canvas, flush with its right inset (28). */}
          <div className="absolute right-7" style={{ top: -47 }}>
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
      </Reveal>

      {popup
        ? createPortal(
            <FlowPopup fixed={popup.fixed} initialZoom={popup.zoom} getOrigin={origin} onClosed={() => setPopup(null)} />,
            popup.host,
          )
        : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full-window viewer                                                   */
/* ------------------------------------------------------------------ */

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
  "--brand-vops": "#ee0033",
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
      className={`uia-overlay ${fixed ? "fixed" : "absolute"} inset-0 z-[80]`}
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
            <span className="size-[7px] shrink-0 rounded-full bg-[var(--brand-vops)]" />
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
              className="uia-zbtn flex size-11 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-2)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
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

/* ------------------------------------------------------------------ */
/* Data — Flow Canvas 294:14857 (positions in canvas px)               */
/* ------------------------------------------------------------------ */

const STEPS = [1, 2, 3, 4, 5];
const STEP_Y = [648, 968, 1268, 1588, 1848];

const LINKS: Link[] = [
  { kind: "edge", x: 769, y: 1340, w: 581, h: 401, inset: "-1.38% -0.13% -0.19% -0.13%", src: "link-edge" },
  { kind: "alt", x: 769, y: 855, w: 501, h: 1045, inset: "0 -0.15% -0.53% -0.15%", src: "link-alt" },
  { kind: "edge", x: 1350, y: 855, w: 0, h: 745, inset: "0 -5.52px -0.1% -5.52px", src: "link-edge1" },
  { kind: "alt", x: 769, y: 740, w: 391, h: 920, inset: "0 -0.19% -0.6% -0.19%", src: "link-alt1" },
  { kind: "edge", x: 1000, y: 855, w: 0, h: 125, inset: "0 -5.52px -0.6% -5.52px", src: "link-edge2" },
  { kind: "edge", x: 353, y: 1640, w: 192, h: 0, inset: "-5.52px 0 -5.52px -0.39%", src: "link-edge3" },
  { kind: "edge", x: 353, y: 1320, w: 192, h: 0, inset: "-5.52px 0 -5.52px -0.39%", src: "link-edge3" },
  { kind: "edge", x: 353, y: 1020, w: 192, h: 0, inset: "-5.52px 0 -5.52px -0.39%", src: "link-edge3" },
  { kind: "main", x: 657, y: 1731, w: 0, h: 129, inset: "0 -7.36px -0.78% -7.36px", src: "link-main" },
  { kind: "main", x: 657, y: 1511, w: 0, h: 89, inset: "0 -7.36px -1.12% -7.36px", src: "link-main1" },
  { kind: "main", x: 657, y: 1175, w: 0, h: 105, inset: "0 -7.36px -0.95% -7.36px", src: "link-main2" },
  { kind: "main", x: 657, y: 891, w: 0, h: 89, inset: "0 -7.36px -1.12% -7.36px", src: "link-main1" },
  { kind: "alt", x: 903, y: 501, w: 447, h: 159, inset: "0 -1.24% -0.47% -0.17%", src: "link-alt2" },
  { kind: "alt", x: 697, y: 573, w: 303, h: 87, inset: "0 -1.82% -0.86% -0.25%", src: "link-alt3" },
  { kind: "nav", x: 165, y: 573, w: 452, h: 87, inset: "0 -0.11% -0.57% -0.81%", src: "link-nav" },
  { kind: "main", x: 657, y: 573, w: 0, h: 87, inset: "0 -7.36px -1.15% -7.36px", src: "link-main3" },
  { kind: "main", x: 657, y: 211, w: 123, h: 95, inset: "0 -0.81% -1.05% -5.99%", src: "link-main4" },
  { kind: "nav", x: 1395, y: 262, w: 0, h: 44, inset: "0 -0.5px", src: "link-nav1" },
  { kind: "nav", x: 1149, y: 262, w: 0, h: 44, inset: "0 -0.5px", src: "link-nav1" },
  { kind: "nav", x: 903, y: 262, w: 0, h: 44, inset: "0 -0.5px", src: "link-nav1" },
  { kind: "nav", x: 411, y: 262, w: 0, h: 44, inset: "0 -0.5px", src: "link-nav1" },
  { kind: "nav", x: 165, y: 262, w: 0, h: 44, inset: "0 -0.5px", src: "link-nav1" },
  { kind: "nav", x: 165, y: 262, w: 1230, h: 0, inset: "-0.5px 0", src: "link-nav2" },
  { kind: "edge", x: 920, y: 140, w: 90, h: 0, inset: "-5.52px -0.83% -5.52px 0", src: "link-edge4" },
];

const NODES: FlowNode[] = [
  { name: "Sign in · SSO", x: 640, y: 100, w: 280, bg: "#f0f1f4", icon: "icon-lock", label: "ENTRY", labelColor: "#8a8f98", desc: "Viettel SSO, then lands on Discover" },
  { name: "Session expired", x: 1010, y: 100, w: 300, bg: "#fff8eb", ring: "#f59e0b", icon: "icon-shield-alert", label: "EDGE CASE", labelColor: "#b45309", desc: "Silent SSO re-auth, back to the same screen" },
  { name: "Chat", x: 53, y: 306, w: 224, bg: "#f0f1f4", icon: "icon-message", label: "RAIL", labelColor: "#8a8f98", count: "4", rail: 124, items: [{ t: "All · Unread" }, { t: "Teams" }, { t: "Channels" }, { t: "Photo & video" }] },
  { name: "Contacts", x: 299, y: 306, w: 224, bg: "#f0f1f4", icon: "icon-users", label: "RAIL", labelColor: "#8a8f98", count: "3", rail: 88, items: [{ t: "Group directory" }, { t: "Units" }, { t: "Profiles" }] },
  { name: "Discover", x: 545, y: 306, w: 224, bg: "#fff4f6", ring: "#e03", icon: "icon-sparkles", label: "RAIL · HOME", labelColor: "#e03", count: "5", rail: 160, items: [{ t: "Activity feed" }, { t: "GenHub suggestions" }, { t: "AI Agents" }, { t: "Mini-app catalogue", bg: "#ffd6de", color: "#e03" }, { t: "Q&A history" }] },
  { name: "Inbox", x: 791, y: 306, w: 224, bg: "#f0f1f4", icon: "icon-inbox", label: "RAIL", labelColor: "#8a8f98", count: "3", rail: 88, items: [{ t: "Email" }, { t: "Incoming documents" }, { t: "Notifications" }] },
  { name: "Documents", x: 1037, y: 306, w: 224, bg: "#f0f1f4", icon: "icon-file-text", label: "RAIL", labelColor: "#8a8f98", count: "3", rail: 88, items: [{ t: "Documents" }, { t: "E-signing" }, { t: "Sharing" }] },
  { name: "Calendar", x: 1283, y: 306, w: 224, bg: "#f0f1f4", icon: "icon-calendar", label: "RAIL", labelColor: "#8a8f98", count: "3", rail: 88, items: [{ t: "Meetings" }, { t: "Room booking" }, { t: "Reminders" }] },
  { name: "AI Agents", x: 53, y: 660, w: 224, bg: "#f0f1f4", icon: "icon-star-mark", label: "HUB", labelColor: "#8a8f98", count: "4", rail: 124, items: [{ t: "GenHub assistant" }, { t: "Finance & Accounting" }, { t: "Budget" }, { t: "+ 5 domain agents" }] },
  { name: "App catalogue", x: 545, y: 660, w: 224, bg: "#fff4f6", ring: "#e03", icon: "icon-grid", label: "HUB", labelColor: "#e03", count: "4", rail: 124, items: [{ t: "HR · 12 apps", bg: "#ffd6de", color: "#e03" }, { t: "Admin · 10 apps" }, { t: "Utilities · 5 apps" }, { t: "Media" }] },
  { name: "Ask GenHub", x: 860, y: 660, w: 280, bg: "#eef6ff", ring: "#2d96ff", icon: "icon-sparkles1", label: "ALTERNATIVE · A", labelColor: "#2d96ff", count: "3", rail: 88, items: [{ t: "\"Request leave on Friday\"" }, { t: "AI pre-fills the request", bg: "#d6e9ff", color: "#2d96ff" }, { t: "Confirm → Review" }] },
  { name: "Approval card in feed", x: 1200, y: 660, w: 300, bg: "#eef6ff", ring: "#2d96ff", icon: "icon-bell", label: "ALTERNATIVE · B · MANAGER", labelColor: "#2d96ff", count: "3", rail: 88, items: [{ t: "Team coverage 86%" }, { t: "Approve", bg: "#d6e9ff", color: "#2d96ff" }, { t: "Reject + reason" }] },
  { name: "Time off", x: 545, y: 980, w: 224, bg: "#fff4f6", ring: "#e03", icon: "icon-briefcase", label: "MINI APP", labelColor: "#e03", count: "3", rail: 88, items: [{ t: "Leave balance" }, { t: "New request", bg: "#ffd6de", color: "#e03" }, { t: "Request history" }] },
  { name: "Dates overlap", x: 53, y: 980, w: 300, bg: "#fff8eb", ring: "#f59e0b", icon: "icon-block", label: "EDGE CASE", labelColor: "#b45309", desc: "Blocks the duplicate and links to the existing request" },
  { name: "GenHub not confident", x: 860, y: 980, w: 280, bg: "#fff8eb", ring: "#f59e0b", icon: "icon-shield-alert", label: "EDGE CASE", labelColor: "#b45309", desc: "No source found → hands off to the mini app or an HR contact" },
  { name: "Leave request", x: 545, y: 1280, w: 224, bg: "#fff4f6", ring: "#e03", icon: "icon-signature", label: "FORM", labelColor: "#e03", count: "4", rail: 124, items: [{ t: "Leave type · sheet" }, { t: "Dates · calendar" }, { t: "Reason" }, { t: "Approver · auto-filled", bg: "#ffd6de", color: "#e03" }] },
  { name: "Not enough balance", x: 53, y: 1280, w: 300, bg: "#fff8eb", ring: "#f59e0b", icon: "icon-shield-alert", label: "EDGE CASE", labelColor: "#b45309", desc: "Inline warning, suggests unpaid leave" },
  { name: "Review & submit", x: 545, y: 1600, w: 224, bg: "#fff4f6", ring: "#e03", icon: "icon-eye", label: "REVIEW", labelColor: "#e03", desc: "Summary, balance after leave, approver" },
  { name: "Connection lost", x: 53, y: 1600, w: 300, bg: "#fff8eb", ring: "#f59e0b", icon: "icon-wifi", label: "EDGE CASE", labelColor: "#b45309", desc: "Draft kept, one-tap retry when back online" },
  { name: "Status timeline", x: 545, y: 1860, w: 224, bg: "#fff4f6", ring: "#e03", tile: "#e03", icon: "icon-check", label: "DONE", labelColor: "#e03", desc: "Submitted → Manager → HR, push at each step" },
  { name: "Request rejected", x: 1200, y: 1600, w: 300, bg: "#fff8eb", ring: "#f59e0b", icon: "icon-close", label: "EDGE CASE", labelColor: "#b45309", desc: "Reason shown → edit & resubmit" },
];
