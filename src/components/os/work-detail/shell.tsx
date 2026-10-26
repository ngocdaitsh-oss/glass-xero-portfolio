/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { scrollToChild, useFrameThrottle } from "@/lib/scroll";
import { works, type Work } from "@/lib/works";
import { useT } from "@/lib/i18n";
import { Eyebrow } from "./parts";
import { WindowControls } from "../AppWindow";
import { useFitZoom, useTitleBarDrag } from "../window-manager";

export type TrackItem = { id: string; label: string; group?: string };

/** Keeps the 1808×850 Figma hero fully visible inside short viewports. */
export function HeroFit({ children, className = "" }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = frame.current;
    const port = el?.closest<HTMLElement>(".work-detail");
    if (!el || !port) return;
    const sync = () => {
      const outerZoom = el.getBoundingClientRect().width / 1808 || 1;
      const available = Math.max(420, port.clientHeight / outerZoom - 64);
      setScale(Math.min(1, available / 850));
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(port);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className="relative w-full overflow-hidden" style={{ height: 850 * scale }}>
      <div
        className={`absolute top-0 left-1/2 h-[850px] w-[1808px] max-w-none -translate-x-1/2 origin-top ${className}`}
        style={{ scale }}
      >
        {children}
      </div>
    </div>
  );
}

/** Collapsed rail: one bar group per phase, split where an item starts a `group`. */
function railGroups(track: TrackItem[]) {
  const groups: number[][] = [];
  track.forEach((item, index) => {
    if (index === 0 || item.group) groups.push([]);
    groups[groups.length - 1].push(index);
  });
  return groups;
}

/**
 * Figma "Progress Tracker" (155:10534 / 214:13300). One element with two states:
 * collapsed it is short bars; on hover each bar stretches into its row and the
 * rail warps into the black "On this page" list in place. Over dark artwork the
 * bars switch to light ink.
 */
function ProgressTracker({
  track,
  active,
  onDark,
  onJump,
}: {
  track: TrackItem[];
  active: number;
  onDark: boolean;
  onJump: (id: string) => void;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [cap, setCap] = useState<number | null>(null);
  const rail = useMemo(() => railGroups(track), [track]);
  /**
   * The open list must stay inside the document scroller: measure the room between the
   * rail's top and the scroller's bottom (in unzoomed px) and, only if the list is
   * taller, cap it and let it scroll inside.
   */
  const show = (el: HTMLElement) => {
    const port = el.closest<HTMLElement>(".work-detail");
    if (port) {
      const r = el.getBoundingClientRect();
      const k = el.offsetWidth ? r.width / el.offsetWidth : 1;
      setCap(Math.max(160, (port.getBoundingClientRect().bottom - r.top) / k - 24));
    }
    setOpen(true);
  };
  return (
    <nav
      aria-label={t("On this page")}
      className={`pt pointer-events-auto absolute top-0 right-8 ${open ? "is-open" : ""} ${onDark ? "on-dark" : ""}`}
      style={open && cap ? { maxHeight: cap, overflowY: "auto", overscrollBehavior: "contain" } : undefined}
      onMouseEnter={(e) => show(e.currentTarget)}
      onMouseLeave={() => setOpen(false)}
      onFocus={(e) => show(e.currentTarget)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="pt-head">
        <span className="font-semibold text-white">{t("On this page")}</span>
        <span className="text-[#7c7c7c]">
          {String(active + 1).padStart(2, "0")}/{String(track.length).padStart(2, "0")}
        </span>
      </div>
      {rail.map((group) => (
        <div key={group[0]} className="pt-group">
          {track[group[0]].group ? <p className="pt-label">{t(track[group[0]].group ?? "")}</p> : null}
          {group.map((index) => {
            const item = track[index];
            const on = index === active;
            return (
              <button
                key={item.id}
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => onJump(item.id)}
                aria-current={on ? "true" : undefined}
                className={`pt-row ${on ? "is-active" : ""}`}
                style={{ transitionDelay: open ? `${index * 12}ms` : "0ms" }}
              >
                <span className="pt-ind" />
                <span className="pt-text">{t(item.label)}</span>
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/**
 * Chrome shared by every case study: breadcrumb title bar, the zoomed 1872px
 * document scroller and the progress tracker. `children` must be stable
 * (memoized by the caller) so scroll-driven tracker updates never re-render
 * the document.
 */
export function CaseStudyShell({
  open = true,
  onBack,
  category,
  title,
  track,
  darkZones = [],
  children,
}: {
  open?: boolean;
  onBack: () => void;
  category: string;
  title: string;
  track: TrackItem[];
  /** Section ids whose artwork is dark or saturated, where the rail uses light ink. */
  darkZones?: string[];
  children: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const zoom = useFitZoom(scroller, 1872, true, 1.05);
  const drag = useTitleBarDrag();
  const t = useT();
  const [active, setActive] = useState(0);
  const [onDark, setOnDark] = useState(true);

  const sync = useCallback(() => {
    const root = scroller.current;
    if (!root) return;
    const limit = root.getBoundingClientRect().top + root.clientHeight * 0.35;
    let current = 0;
    track.forEach((item, index) => {
      const el = root.querySelector<HTMLElement>(`#${item.id}`);
      if (el && el.getBoundingClientRect().top <= limit) current = index;
    });
    setActive(current);
    const rail = root.querySelector<HTMLElement>(".pt");
    if (rail) {
      const r = rail.getBoundingClientRect();
      const mid = r.top + Math.min(r.height, 220) / 2;
      setOnDark(
        darkZones.some((id) => {
          const b = root.querySelector<HTMLElement>(`#${id}`)?.getBoundingClientRect();
          return b ? mid >= b.top && mid <= b.bottom && r.right >= b.left && r.left <= b.right : false;
        }),
      );
    }
  }, [track, darkZones]);

  useEffect(() => {
    if (!open) return;
    scroller.current?.scrollTo({ top: 0 });
    const id = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(id);
  }, [sync, open]);

  const onScroll = useFrameThrottle(sync);

  const jump = useCallback((id: string) => {
    const root = scroller.current;
    if (root) scrollToChild(root, root.querySelector<HTMLElement>(`#${id}`), 0);
  }, []);

  return (
    <>
      <header
        {...drag}
        className="relative flex h-14 shrink-0 items-center justify-between border-b border-[var(--w-line)] px-4 select-none"
      >
        <div className="flex w-[120px] items-center gap-1">
          <button
            type="button"
            aria-label={t("Back to works")}
            onClick={onBack}
            className="flex size-8 items-center justify-center rounded-full bg-[var(--w-chip)] transition-[background-color,transform] duration-200 hover:-translate-x-0.5 hover:bg-[var(--w-toggle-on)]"
          >
            <img src="/figma/chevron-left.svg" alt="" className="theme-dark-only size-4" />
            <img src="/figma/light/chevron-left.svg" alt="" className="theme-light-only size-4" />
          </button>
          <span aria-hidden className="flex size-8 items-center justify-center opacity-40">
            <img src="/figma/chevron-right-sm.svg" alt="" className="theme-dark-only size-4" />
            <img src="/figma/light/chevron-right-sm.svg" alt="" className="theme-light-only size-4" />
          </span>
        </div>
        <nav aria-label={t("Breadcrumb")} className="flex items-center gap-3 rounded-full bg-[var(--w-chip)] px-4 py-1.5 text-[15px] leading-6">
          <img src="/figma/logo.svg" alt="" className="theme-dark-only size-5" />
          <img src="/figma/light/logo.svg" alt="" className="theme-light-only size-5" />
          <button type="button" onClick={onBack} className="text-[var(--w-secondary)] transition-colors hover:text-[var(--w-text)]">
            {t("Works")}
          </button>
          <span className="text-[var(--w-muted)]">›</span>
          <button type="button" onClick={onBack} className="text-[var(--w-secondary)] transition-colors hover:text-[var(--w-text)]">
            {t(category)}
          </button>
          <span className="text-[var(--w-muted)]">›</span>
          <span className="font-semibold">{t(title)}</span>
        </nav>
        <div className="flex w-[120px] justify-end">
          <WindowControls buttonClassName="h-7 w-8 text-[var(--w-muted)] hover:bg-[var(--w-chip)]" iconSize={24} />
        </div>
      </header>
      <div className="relative min-h-0 flex-1">
        <div ref={scroller} onScroll={onScroll} className="os-scroll work-detail reveal-root h-full overflow-y-auto" style={{ overflowX: "clip" }}>
          <div data-reveal-zoom className="relative mx-auto w-[1872px] overflow-x-clip" style={{ zoom }}>
            {/* 32px from the right edge and the top, so the open list always fits above the fold. */}
            <div className="pointer-events-none sticky top-8 z-20 h-0">
              <ProgressTracker track={track} active={active} onDark={onDark} onJump={jump} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

/** Figma "Section — Related Projects": dark band, eyebrow, title, All works, two project cards. */
export function RelatedProjects({
  ids,
  onBack,
  renderCard,
  cardHeight,
}: {
  ids: string[];
  onBack: () => void;
  renderCard: (work: Work) => ReactNode;
  /** Fixed card height from the case study's Figma (bave: 908); the Works card keeps its own layout inside. */
  cardHeight?: number;
}) {
  const t = useT();
  const related = ids.map((id) => works.find((w) => w.id === id)).filter((w): w is Work => Boolean(w));
  return (
    <section id="wd-related" className="works-ink flex flex-col gap-12 rounded-t-[80px] bg-[var(--cmd-bg-related)] px-[156px] pt-[120px] pb-10">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-4">
          <Eyebrow label={t("UP NEXT  ·  MORE WORK")} phase="next" />
          <h2 className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] text-[var(--cmd-text-primary)]">{t("Related projects")}</h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="hover-lift rounded-full bg-[var(--cmd-surface-1)] px-5 py-3 text-sm leading-5 font-semibold text-[var(--cmd-text-primary)] hover:bg-[var(--cmd-surface-2)]"
        >
          {t("All works")}
        </button>
      </div>
      <div className={`grid gap-6 ${related.length === 1 ? "mx-auto w-[780px] grid-cols-1" : "grid-cols-2"} ${cardHeight ? "[&>*]:overflow-hidden" : ""}`} style={cardHeight ? { gridAutoRows: cardHeight } : undefined}>
        {related.map((w) => renderCard(w))}
      </div>
    </section>
  );
}

/** Figma "Footer": divider and copyright on the dark band, no side padding on the rule. */
export function CaseFooter({ variant }: { variant?: "bave" } = {}) {
  if (variant === "bave") {
    // Figma bave "Footer" (190:22964): pt 100 / pb 72, 156px sides, 1px divider, 40px gap, 24/32 semibold.
    return (
      <footer id="wd-footer" className="works-ink flex flex-col items-center gap-10 bg-[var(--cmd-bg-related)] px-[156px] pt-[100px] pb-[72px]">
        <div className="h-px w-full bg-[#2a2a2a]" />
        <p className="text-[24px] leading-8 font-semibold tracking-[-0.7px] whitespace-nowrap text-[var(--cmd-text-primary)]">© Tuan Ngoc Portfolio 2027</p>
      </footer>
    );
  }
  return (
    <footer id="wd-footer" className="works-ink bg-[var(--cmd-bg-related)] pt-12 pb-16 text-center">
      <div className="h-px bg-[var(--w-line)]" />
      <p className="mt-10 text-[22px] leading-9 text-[var(--cmd-text-primary)]">© Tuan Ngoc Portfolio 2027</p>
    </footer>
  );
}
