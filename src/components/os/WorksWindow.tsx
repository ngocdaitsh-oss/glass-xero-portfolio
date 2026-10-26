/* eslint-disable @next/next/no-img-element -- Figma exports keep their own width and height. */
"use client";

import { createContext, useCallback, useContext, useEffect, startTransition, useRef, useState, type RefObject } from "react";
import { motionActive } from "@/lib/motion";
import { useLang, useT } from "@/lib/i18n";
import { scrollToChild, useFrameThrottle } from "@/lib/scroll";
import { graphicWorks, uiWorks, type Work } from "@/lib/works";
import { MaskIcon, WindowControls } from "./AppWindow";
import { Reveal } from "./reveal";
import { useFitZoom, useTitleBarDrag, WindowShell } from "./window-manager";
import { Cover, Logo, PlayContext } from "./work-cover";
import { DETAIL_READY, WorkDetail } from "./work-detail/WorkDetail";

/** Hovering a card pre-renders its case study so the drawer opens without a render stall. */
const WarmContext = createContext<(id: string) => void>(() => undefined);

type View = "grid" | "list";
type SectionId = "top" | "uiux" | "graphic";

/**
 * `initialDetail` opens that case study straight away (mobile Search, Photos and the mobile Works page link to one).
 * `onExitDetail` replaces the drawer's own back (the mobile Works page goes back to itself instead).
 */
export function WorksWindow({
  onOpenAi,
  initialDetail,
  onExitDetail,
  onDetailChange,
}: {
  onOpenAi: () => void;
  initialDetail?: string;
  onExitDetail?: () => void;
  onDetailChange?: (id: string | null) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("grid");
  const [active, setActive] = useState<SectionId>("top");
  const [detail, setDetail] = useState<string | null>(initialDetail ?? null);
  const [stuck, setStuck] = useState(false);
  const [viewPhase, setViewPhase] = useState<"idle" | "out">("idle");
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useTitleBarDrag();
  const t = useT();
  // The case study is a drawer over the list. It is mounted off-screen first and
  // only slides once that heavy first render has painted, so the slide never stalls.
  const [drawerIn, setDrawerIn] = useState(Boolean(initialDetail));
  // Pre-render the (heavy) case study while the browser is idle, hidden off to the
  // right, so opening it is a pure slide with no first render in the way.
  const [warmId, setWarmId] = useState<string | null>(initialDetail ?? null);
  useEffect(() => {
    // A transition, so the heavy render yields to input instead of one long task.
    // Its first layout (~4k objects) cannot be split, so it never starts while a window /
    // theme transition is running — it waits for the next idle moment instead.
    let id = 0;
    const idle = (fn: () => void) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(fn, { timeout: 2500 }) : (setTimeout(fn, 1200) as unknown as number);
    const warmFirst = () => {
      if (motionActive()) {
        id = idle(warmFirst);
        return;
      }
      startTransition(() => setWarmId((current) => current ?? "bave"));
    };
    id = idle(warmFirst);
    return () => ("cancelIdleCallback" in window ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, []);
  const warmWork = useCallback(
    (id: string) => {
      if (DETAIL_READY.has(id) && !detail) setWarmId(id);
    },
    [detail],
  );
  const closeTimer = useRef(0);
  const openWork = useCallback((id: string) => {
    if (!DETAIL_READY.has(id)) return;
    window.clearTimeout(closeTimer.current);
    setWarmId(id);
    setDetail(id);
    onDetailChange?.(id);
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawerIn(true)));
  }, [onDetailChange]);
  const renderCard = useCallback((work: Work) => <ProjectCard key={work.id} work={work} onOpen={openWork} />, [openWork]);
  const closeWork = useCallback(() => {
    setDrawerIn(false);
    onDetailChange?.(null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = window.setTimeout(() => setDetail(null), reduce ? 0 : 640);
  }, [onDetailChange]);

  // Browser Back/Forward changes the case-study URL outside this drawer. Keep the
  // already-mounted Works window and its list scroll position while syncing the drawer.
  useEffect(() => {
    const onRoute = (event: Event) => {
      const id = (event as CustomEvent<{ id: string | null }>).detail.id;
      window.clearTimeout(closeTimer.current);
      if (id && DETAIL_READY.has(id)) {
        setWarmId(id);
        setDetail(id);
        requestAnimationFrame(() => requestAnimationFrame(() => setDrawerIn(true)));
      } else {
        setDrawerIn(false);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        closeTimer.current = window.setTimeout(() => setDetail(null), reduce ? 0 : 640);
      }
    };
    window.addEventListener("xero-work-route", onRoute);
    return () => window.removeEventListener("xero-work-route", onRoute);
  }, []);
  const zoom = useFitZoom(scroller, 1872, true, 1.05);

  const syncActive = useCallback(() => {
    const root = scroller.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top;
    const bar = barRef.current;
    // The filter bar pins once it would scroll past the top edge (pinned with JS: sticky is unreliable under CSS zoom).
    setStuck(bar ? bar.getBoundingClientRect().top - rootTop < 16 : false);
    let current: SectionId = "top";
    for (const id of ["uiux", "graphic"] as const) {
      const el = root.querySelector<HTMLElement>(`#${id}`);
      if (el && el.getBoundingClientRect().top - rootTop <= 140) current = id;
    }
    setActive(current);
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    const root = scroller.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (id === "top") {
      root.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      setActive("top");
      return;
    }
    const el = root.querySelector<HTMLElement>(`#${id}`);
    if (!el) return;
    // Leave room for the pinned filter bar.
    scrollToChild(root, el, 120);
    setActive(id);
  }, []);

  const onScroll = useFrameThrottle(syncActive);

  const switchView = useCallback(
    (next: View) => {
      if (next === view || viewPhase === "out") return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setView(next);
        return;
      }
      setViewPhase("out");
      window.setTimeout(() => {
        setView(next);
        setViewPhase("idle");
        const root = scroller.current;
        const bar = barRef.current;
        if (root && bar && stuck) root.scrollTop = Math.max(0, root.scrollTop + bar.getBoundingClientRect().top - root.getBoundingClientRect().top - 16);
        requestAnimationFrame(syncActive);
      }, 200);
    },
    [view, viewPhase, stuck, syncActive],
  );

  return (
    <WindowShell
      label={t("Works — Selected Projects")}
      className="works rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] select-text"
    >
      <WarmContext.Provider value={warmWork}>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      {warmId || detail ? (
        <div
          inert={!drawerIn || undefined}
          aria-hidden={!detail || undefined}
          className={`works-light wd-drawer absolute inset-0 z-30 flex flex-col ${drawerIn ? "is-in" : ""}`}
          style={{ visibility: detail ? "visible" : "hidden" }}
        >
          <PlayContext.Provider value={drawerIn}>
            <WorkDetail id={detail ?? warmId ?? "bave"} open={Boolean(detail)} onBack={onExitDetail ?? closeWork} renderCard={renderCard} />
          </PlayContext.Provider>
        </div>
      ) : null}
      <PlayContext.Provider value={!drawerIn}>
      <div inert={drawerIn || undefined} className={`works-list flex min-h-0 flex-1 flex-col ${drawerIn ? "is-covered" : ""}`}>
      <header
        {...drag}
        className="flex h-[52px] shrink-0 items-center justify-between border-b border-[var(--w-line)] pr-2.5 pl-4 select-none"
      >
        <div className="flex w-[120px] items-center">
          <img src="/figma/logo.svg" alt="" className="theme-dark-only" />
          <img src="/figma/light/logo.svg" alt="" className="theme-light-only" />
        </div>
        <h1 className="truncate text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t("Works — Selected Projects")}</h1>
        <div className="flex w-[120px] items-center justify-end">
          <WindowControls buttonClassName="h-7 w-8 text-[var(--w-muted)] hover:bg-[var(--w-chip)]" iconSize={24} />
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div ref={scroller} onScroll={onScroll} className="os-scroll reveal-root h-full overflow-y-auto" style={{ overflowX: "clip" }}>
          <div data-reveal-zoom className="mx-auto w-[1872px] overflow-x-clip px-[156px] pt-24 pb-28" style={{ zoom }}>
            <Header active={active} view={view} barRef={barRef} onJump={scrollTo} onView={switchView} />
            <div key={view} className={`works-view ${viewPhase === "out" ? "is-leaving" : ""}`}>
              <WorkSection id="uiux" index="01" heading={t("UI/UX Works")} count={t("{n} PROJECTS", { n: "04" })} items={uiWorks} view={view} onOpen={openWork} />
              <WorkSection
                id="graphic"
                index="02"
                heading={t("Graphic Works")}
                count={t("{n} PROJECTS", { n: "02" })}
                items={graphicWorks}
                view={view}
                onOpen={openWork}
              />
            </div>
            <Reveal>
              <footer className="mt-[100px] flex flex-col items-center gap-10 pt-12 pb-6">
                <span className="h-px w-full bg-[var(--w-line)]" />
                <p className="text-[28px] leading-9 font-semibold tracking-[-0.7px]">© Tuan Ngoc Portfolio 2027</p>
              </footer>
            </Reveal>
          </div>
        </div>

        <div
          aria-hidden={!stuck || undefined}
          inert={!stuck || undefined}
          className={`works-pin pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden ${stuck ? "is-stuck" : ""}`}
        >
          <div className="mx-auto w-[1872px] px-[156px] pt-4 pb-6" style={{ zoom }}>
            <div className="pointer-events-auto rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.28)]">
              <FilterBar active={active} view={view} onJump={scrollTo} onView={switchView} />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-4 bottom-5 flex flex-col items-end gap-3">
          <button
            type="button"
            aria-label={t("Back to top")}
            onClick={() => scrollTo("top")}
            className="pointer-events-auto flex size-[52px] items-center justify-center rounded-full bg-[var(--w-chip)] shadow-[0_12px_16px_rgba(0,0,0,0.35)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--w-toggle-on)]"
          >
            <img src="/figma/chevron-down.svg" alt="" className="theme-dark-only rotate-180" />
            <img src="/figma/light/chevron-down.svg" alt="" className="theme-light-only rotate-180" />
          </button>
          <button
            type="button"
            onClick={onOpenAi}
            className="group/app pointer-events-auto flex items-center gap-3.5 rounded-[22px] bg-[var(--w-card)] py-2.5 pr-[18px] pl-2.5 shadow-[0_12px_16px_rgba(0,0,0,0.5)] transition-colors duration-200 hover:bg-[var(--w-chip)]"
          >
            <span className="flex size-12 items-center justify-center rounded-[14px] bg-[var(--w-chip)]">
              <img src="/figma/works/ai-glyph.svg" alt="" />
            </span>
            <span className="text-left">
              <span className="block text-[14px] leading-5 text-[var(--w-muted)]">{t("Next app")}</span>
              <span className="block text-[14px] leading-5 font-semibold">{t("AI Workflow")}</span>
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-[var(--w-chip)] transition-colors duration-200 group-hover/app:bg-[#6798ff]">
              <img src="/figma/works/external.svg" alt="" />
            </span>
          </button>
        </div>
      </div>
      </div>
      </PlayContext.Provider>
      </div>
      </WarmContext.Provider>
    </WindowShell>
  );
}

const CHIPS: { id: SectionId; label: string; count: string }[] = [
  { id: "top", label: "All works", count: "06" },
  { id: "uiux", label: "UI/UX", count: "04" },
  { id: "graphic", label: "Graphic", count: "02" },
];

/** Figma "Filter Bar" (120:3700): category chips + grid/list toggle on a surface-1 pill. */
function FilterBar({
  active,
  view,
  onJump,
  onView,
}: {
  active: SectionId;
  view: View;
  onJump: (id: SectionId) => void;
  onView: (view: View) => void;
}) {
  const t = useT();
  return (
    <div className="flex items-center justify-between rounded-full bg-[var(--w-card)] p-2">
      <div className="relative flex items-center gap-1">
        {CHIPS.map((chip) => {
          const on = active === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              aria-current={on ? "true" : undefined}
              onClick={() => onJump(chip.id)}
              className={`flex items-center gap-2.5 rounded-full px-5 py-3 transition-colors duration-300 ${
                on ? "bg-[var(--w-active-bg)] text-[var(--w-active-fg)]" : "text-[var(--w-secondary)] hover:bg-[var(--w-chip)]"
              }`}
            >
              <span className="text-[18px] leading-7 font-semibold tracking-[-0.2px]">{t(chip.label)}</span>
              <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">{chip.count}</span>
            </button>
          );
        })}
      </div>
      <div className="relative flex gap-0.5 rounded-full bg-[var(--w-chip)] p-1">
        <span
          aria-hidden
          className="absolute top-1 left-1 h-9 w-10 rounded-full bg-[var(--w-toggle-on)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.5,1)]"
          style={{ transform: view === "grid" ? "translateX(0)" : "translateX(42px)" }}
        />
        {(["grid", "list"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-label={t(item === "grid" ? "Grid view" : "List view")}
            aria-pressed={view === item}
            onClick={() => onView(item)}
            className={`relative flex h-9 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
              view === item ? "text-[var(--w-text)]" : "text-[var(--w-muted)] hover:text-[var(--w-secondary)]"
            }`}
          >
            <MaskIcon src={item === "grid" ? "/figma/works/icon-grid-24.svg" : "/figma/works/icon-list-24.svg"} size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Header({
  active,
  view,
  barRef,
  onJump,
  onView,
}: {
  active: SectionId;
  view: View;
  barRef: RefObject<HTMLDivElement | null>;
  onJump: (id: SectionId) => void;
  onView: (view: View) => void;
}) {
  const t = useT();
  const lang = useLang();
  return (
    <div id="top" className="scroll-mt-6">
      <Reveal>
        <div className="flex items-end justify-between gap-16">
          <div>
            {view === "list" ? (
              <p className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-[var(--w-chip)] py-1.5 pr-3.5 pl-3 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)]">
                <span className="size-2 rounded-full bg-[var(--w-secondary)]" />
                {t("PORTFOLIO INDEX")} · 2022
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="shrink-0">
                  <path d="M0.6 5H6.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M4.4 1.7 8.8 5 4.4 8.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                2024
              </p>
            ) : null}
            <h2 className="text-[136px] leading-[128px] font-normal tracking-[-6.8px] whitespace-nowrap">
              {lang === "vi" ? "Dự án" : "Selected"}
              <br />
              {lang === "vi" ? "tiêu biểu" : "works"}
            </h2>
          </div>
          <div className="w-[600px]">
            <p className="text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[var(--w-secondary)]">
              {t("Product design for learning, mobility, finance and telecom — plus brand identities for food and fashion. Every project opens into a full case study.")}
            </p>
            <dl className="mt-10 grid grid-cols-3">
              {[
                ["06", "PROJECTS"],
                ["04", "UI/UX"],
                ["02", "BRAND IDENTITY"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="text-[48px] leading-[52px] font-semibold tracking-[-1.44px]">{value}</dt>
                  <dd className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">{t(label)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div ref={barRef} className="mt-14">
          <FilterBar active={active} view={view} onJump={onJump} onView={onView} />
        </div>
      </Reveal>
    </div>
  );
}

function WorkSection({
  id,
  index,
  heading,
  count,
  items,
  view,
  onOpen,
}: {
  id: string;
  index: string;
  heading: string;
  count: string;
  items: Work[];
  view: View;
  onOpen: (id: string) => void;
}) {
  const t = useT();
  return (
    <section id={id} className="mt-[100px] scroll-mt-6">
      <Reveal>
      <div className="flex items-end justify-between whitespace-nowrap">
        <h3 className="flex items-baseline gap-6">
          <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-accent)]">{index}</span>
          <span className="text-[56px] leading-[60px] font-bold tracking-[-1.96px]">{heading}</span>
        </h3>
        <p className="font-mono text-[24px] leading-8 tracking-[0.4px] text-[var(--w-muted)]">{count}</p>
      </div>
      </Reveal>
      {view === "grid" ? <div className="mt-10 h-px bg-[var(--w-line)]" /> : null}
      {view === "grid" ? (
        <div className="mt-10 grid grid-cols-2 gap-6">
          {items.map((work) => (
            <Reveal key={work.id} className="min-w-0">
              <ProjectCard work={work} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <div className="grid grid-cols-[56px_224px_minmax(0,1fr)_280px_96px_44px] items-center gap-8 py-2 pr-5 pl-4 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">
            <span>#</span>
            <span>{t("PREVIEW")}</span>
            <span>{t("PROJECT")}</span>
            <span>{t("CATEGORY")}</span>
            <span>{t("YEAR")}</span>
            <span />
          </div>
          {items.map((work) => (
            <Reveal key={work.id}>
              <ProjectRow work={work} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({ work, onOpen }: { work: Work; onOpen: (id: string) => void }) {
  const warm = useContext(WarmContext);
  const t = useT();
  return (
    <article
      onPointerEnter={() => warm(work.id)}
      onClick={() => onOpen(work.id)}
      className="group flex flex-col rounded-[28px] bg-[var(--w-card)] p-3 transition-colors hover:bg-[var(--w-hover)]">
      <div className="h-[520px] overflow-hidden rounded-[18px] bg-[var(--w-well)]">
        <div className="h-full transition-transform duration-300 group-hover:-translate-y-2">
          <Cover id={work.cover} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between overflow-hidden px-5 pt-6 pb-3">
        <div className="flex flex-col items-start gap-4">
          <div className="flex h-[75px] w-full items-center gap-3 overflow-hidden">
            <Logo kind={work.logo} />
            <img src="/figma/works/dot.svg" alt="" />
            <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)]">{work.year}</span>
            <span className="ml-auto font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">{work.index}</span>
          </div>
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {work.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[var(--w-chip)] px-3 py-1.5 text-[14px] leading-5 whitespace-nowrap text-[var(--w-secondary)]">
                {t(tag)}
              </span>
            ))}
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <h4 className="w-full text-[30px] leading-9 font-semibold tracking-[-0.6px]">{t(work.title)}</h4>
            {work.highlights ? (
              <ul className="flex w-full flex-col gap-2.5 overflow-hidden">
                {work.highlights.map((line) => (
                  <li key={line} className={`flex w-full items-center gap-3 text-[18px] leading-7 tracking-[-0.2px] text-[var(--w-secondary)] ${work.highlightStrong ? "font-semibold" : ""}`}>
                    <img src="/figma/works/check.svg" alt="" className="size-6 shrink-0" />
                    <span className="min-w-0 flex-1">{t(line)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="w-full text-[18px] leading-7 tracking-[-0.2px] text-[var(--w-secondary)]">{t(work.description ?? "")}</p>
            )}
          </div>
        </div>
        <div className="flex items-end justify-end overflow-hidden pt-2">
          <span className="flex items-center gap-3">
            <span className="text-[14px] leading-5 font-semibold">{t("View case study")}</span>
            <span className="flex size-11 items-center justify-center rounded-full bg-[var(--w-chip)] transition-colors group-hover:bg-white">
              <img src="/figma/works/chevron-right.svg" alt="" className="group-hover:hidden" />
              <img src="/figma/light/chevron-right.svg" alt="" className="hidden group-hover:block" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ work, onOpen }: { work: Work; onOpen: (id: string) => void }) {
  const warm = useContext(WarmContext);
  const t = useT();
  return (
    <article
      onPointerEnter={() => warm(work.id)}
      onClick={() => onOpen(work.id)}
      className="group grid cursor-[var(--c-pointer)] grid-cols-[56px_224px_minmax(0,1fr)_280px_96px_44px] items-center gap-8 rounded-[24px] border-b border-[var(--w-line)] py-4 pr-5 pl-4 transition-colors duration-200 hover:bg-[var(--w-card)]">
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">{work.index}</span>
      <div className="h-[156px] w-[224px] overflow-hidden rounded-2xl bg-[var(--w-well)]">
        <Cover id={work.cover} />
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2.5">
        <Logo kind={work.logo} row />
        <h4 className="text-[30px] leading-9 font-semibold tracking-[-0.6px]">{t(work.title)}</h4>
        <p className="text-[18px] leading-7 tracking-[-0.2px] text-[var(--w-secondary)]">{t(work.blurb)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[var(--w-card)] px-3 py-1.5 text-[14px] leading-5 text-[var(--w-secondary)] transition-colors duration-200 group-hover:bg-[var(--w-chip)]">
            {t(tag)}
          </span>
        ))}
      </div>
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)]">{work.year}</span>
      <span className="flex size-11 items-center justify-center rounded-full bg-[var(--w-card)] transition-colors group-hover:bg-white">
        <img src="/figma/works/chevron-right.svg" alt="" className="group-hover:hidden" />
        <img src="/figma/light/chevron-right.svg" alt="" className="hidden group-hover:block" />
      </span>
    </article>
  );
}
