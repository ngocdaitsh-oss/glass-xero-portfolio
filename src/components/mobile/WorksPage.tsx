/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLang, useT } from "@/lib/i18n";
import { mobileZoom } from "@/lib/layout-mode";
import { useFrameThrottle } from "@/lib/scroll";
import { graphicWorks, uiWorks, type Work } from "@/lib/works";
import { MaskIcon } from "@/components/os/AppWindow";
import { Reveal } from "@/components/os/reveal";
import { Cover, LazyCoverContext, Logo } from "@/components/os/work-cover";
import { HomeIndicator, NavBar, StatusBar, StickyNavBar } from "./parts";

/*
 * Mobile — Works (Figma section 675:36910): Grid 394:25047 (dark) / 675:36961
 * (light), List 394:25516 (dark) / 675:37260 (light). Same data, covers and
 * logos as the desktop Works window (lib/works.ts, os/work-cover.tsx); the
 * Command tokens (--cmd-*) are the frames' variables, set on `.m-works`.
 * The view toggle is Figma's (hidden) "View Toggle" 394:25557, placed in the
 * nav bar's actions slot.
 */

type View = "grid" | "list";
type SectionId = "top" | "uiux" | "graphic";

const mono = "font-mono tracking-[0.4px]";
/** The 16px top breathing room + 48px sticky inline nav row, in design px. */
const NAV = 64;
/** Height of the pinned area: nav + filter bar (8 top + 60 bar + 16 fade), in design px. */
const PIN = NAV + 84;

/** List-row logo heights (Figma Meta rows): bave 18, vOps 22, the others 28. */
const ROW_LOGO: Partial<Record<Work["logo"], string>> = { bave: "h-[18px]", vops: "h-[22px]" };

function reduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function WorksPage({ onHome, onOpenWork }: { onHome: () => void; onOpenWork: (id: string) => void }) {
  const t = useT();
  const lang = useLang();
  const [view, setView] = useState<View>("grid");
  const [phase, setPhase] = useState<"idle" | "out">("idle");
  const [active, setActive] = useState<SectionId>("top");
  const [stuck, setStuck] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  const sync = useCallback(() => {
    const z = mobileZoom();
    const box = bar.current?.getBoundingClientRect();
    setStuck(box ? box.top < (NAV + 8) * z : false);
    let current: SectionId = "top";
    for (const id of ["uiux", "graphic"] as const) {
      const el = document.getElementById(`m-works-${id}`);
      if (el && el.getBoundingClientRect().top <= 140 * z) current = id;
    }
    setActive(current);
  }, []);
  const onScroll = useFrameThrottle(sync);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer.current);
    };
  }, [onScroll]);

  const jump = (id: SectionId) => {
    const behavior = reduce() ? "auto" : "smooth";
    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
      setActive("top");
      return;
    }
    const el = document.getElementById(`m-works-${id}`);
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - PIN * mobileZoom(), behavior });
    setActive(id);
  };

  const switchView = (next: View) => {
    if (next === view || phase === "out") return;
    const swap = () => {
      setView(next);
      setPhase("idle");
      // Past the filter bar: keep it pinned where it was, so the new view starts right under it.
      const box = bar.current?.getBoundingClientRect();
      if (box && stuck) window.scrollTo(0, Math.max(0, window.scrollY + box.top - (NAV + 8) * mobileZoom()));
      requestAnimationFrame(sync);
    };
    if (reduce()) {
      swap();
      return;
    }
    // The old view fades down (works-view is-leaving), the new one rises in.
    setPhase("out");
    timer.current = window.setTimeout(swap, 200);
  };

  const chips: { id: SectionId; label: string; count: string }[] = [
    { id: "top", label: lang === "vi" ? "Tất cả" : t("All works"), count: "06" },
    { id: "uiux", label: t("UI/UX"), count: "04" },
    { id: "graphic", label: t("Graphic"), count: "02" },
  ];

  return (
    <LazyCoverContext.Provider value>
      <div aria-hidden className="m-works pointer-events-none fixed inset-0 z-0 bg-[var(--cmd-bg)]" />
      <div className="m-page-body m-works reveal-root relative" data-reveal-window>
        <StatusBar />
        <div className="m-col">
          <NavBar
            variant="inline"
            title={t("Works")}
            back={{ label: t("Home"), onClick: onHome }}
            trailing={<ViewToggle view={view} onView={switchView} />}
          />
          <StickyNavBar
            title={t("Works")}
            back={{ label: t("Home"), onClick: onHome }}
            trailing={<ViewToggle view={view} onView={switchView} />}
            background="var(--cmd-bg)"
            threshold={48}
          />
          <div className="flex flex-col gap-12 px-4 pt-5" style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom) / var(--m-zoom, 1))" }}>
            {/* Section — Header (394:25054) */}
            <div className="flex flex-col gap-14">
              <Reveal>
                <div className="flex flex-col gap-7">
                  <h2 className="text-[56px] leading-none font-normal tracking-[-2.8px] whitespace-nowrap text-[var(--cmd-text-primary)]">
                    {lang === "vi" ? "Dự án" : "Selected"}
                    <br />
                    {lang === "vi" ? "tiêu biểu" : "works"}
                  </h2>
                  <div className="flex flex-col gap-10">
                    <p className="text-[16px] leading-7 font-semibold tracking-[-0.2px] text-[var(--cmd-text-secondary)]">
                      {t("Product design for learning, mobility, finance and telecom — plus brand identities for food and fashion. Every project opens into a full case study.")}
                    </p>
                    <dl className="flex gap-3">
                      {[
                        ["06", "PROJECTS"],
                        ["04", "UI/UX"],
                        ["02", "BRAND IDENTITY"],
                      ].map(([value, label]) => (
                        <div key={label} className="flex min-w-0 flex-1 flex-col gap-1">
                          <dt className="text-[32px] leading-[52px] font-semibold tracking-[-0.96px] text-[var(--cmd-text-primary)]">{value}</dt>
                          <dd className={`${mono} text-[18px] leading-[26px] text-[var(--cmd-text-muted)]`}>{t(label)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div ref={bar}>
                  <FilterBar chips={chips} active={active} onJump={jump} />
                </div>
              </Reveal>
            </div>

            <div key={view} className={`works-view flex flex-col gap-12 ${phase === "out" ? "is-leaving" : ""}`}>
              <Section id="uiux" index="01" heading={t("UI/UX Works")} count={t("{n} PROJECTS", { n: "04" })} items={uiWorks} view={view} align="center" gap="gap-8" onOpen={onOpenWork} />
              <Section id="graphic" index="02" heading={t("Graphic Works")} count={t("{n} PROJECTS", { n: "02" })} items={graphicWorks} view={view} align="end" gap="gap-10" onOpen={onOpenWork} />
            </div>

            <Reveal>
              <footer className="flex flex-col items-center gap-10 pt-12 pb-6">
                <span className="h-px w-full bg-[var(--cmd-surface-3)]" />
                <p className="text-center text-[18px] leading-9 font-semibold tracking-[-0.7px] whitespace-nowrap text-[var(--cmd-text-primary)]">© Tuan Ngoc Portfolio 2027</p>
              </footer>
            </Reveal>
          </div>
        </div>
      </div>

      {/* The filter bar pins under the sticky nav bar once the real one scrolls past (same as the desktop window). */}
      <div aria-hidden={!stuck || undefined} inert={!stuck || undefined} className={`m-works works-pin pointer-events-none fixed inset-x-0 top-0 z-30 ${stuck ? "is-stuck" : ""}`}>
        <div className="m-col px-4 pb-4" style={{ paddingTop: `calc(${NAV + 8}px + env(safe-area-inset-top) / var(--m-zoom, 1))` }}>
          <div className="m-works-pin-bar pointer-events-auto rounded-full">
            <FilterBar chips={chips} active={active} onJump={jump} />
          </div>
        </div>
      </div>

      <HomeIndicator onHome={onHome} />
    </LazyCoverContext.Provider>
  );
}

/** Figma "View Toggle" (394:25557): surface-2 pill, the selected 40×36 segment in surface-3 slides. */
function ViewToggle({ view, onView }: { view: View; onView: (view: View) => void }) {
  const t = useT();
  return (
    <div role="group" aria-label={t("View mode")} className="relative flex gap-0.5 rounded-full bg-[var(--cmd-surface-2)] p-1">
      <span
        aria-hidden
        className="absolute top-1 left-1 h-9 w-10 rounded-full bg-[var(--cmd-surface-3)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.5,1)]"
        style={{ transform: view === "grid" ? "none" : "translateX(42px)" }}
      />
      {(["grid", "list"] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-label={t(item === "grid" ? "Grid view" : "List view")}
          aria-pressed={view === item}
          onClick={() => onView(item)}
          // 40×36 segment, 44×44 touch target.
          className={`relative flex h-9 w-10 items-center justify-center rounded-full transition-colors duration-300 before:absolute before:-inset-x-0.5 before:-inset-y-1 before:content-[''] ${
            view === item ? "text-[var(--cmd-text-primary)]" : "text-[var(--cmd-text-muted)]"
          }`}
        >
          <MaskIcon src={item === "grid" ? "/figma/works/icon-grid.svg" : "/figma/works/icon-list.svg"} size={18} />
        </button>
      ))}
    </div>
  );
}

/** Figma "Filter Bar" (394:25070): three equal chips on a surface-1 pill; the selected one (text-primary) slides. */
function FilterBar({ chips, active, onJump }: { chips: { id: SectionId; label: string; count: string }[]; active: SectionId; onJump: (id: SectionId) => void }) {
  const index = Math.max(0, chips.findIndex((chip) => chip.id === active));
  return (
    <div className="rounded-full bg-[var(--cmd-surface-1)] p-2">
      <div className="relative grid grid-cols-3 gap-1">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[calc((100%-8px)/3)] rounded-full bg-[var(--cmd-text-primary)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.5,1)]"
          style={{ transform: `translateX(calc(${index} * (100% + 4px)))` }}
        />
        {chips.map((chip) => {
          const on = chip.id === active;
          return (
            <button
              key={chip.id}
              type="button"
              aria-current={on ? "true" : undefined}
              onClick={() => onJump(chip.id)}
              className="m-press relative flex h-11 min-w-0 items-center justify-center gap-2.5 rounded-full px-2 text-[14px] leading-5 font-semibold whitespace-nowrap"
            >
              <span className={`transition-colors duration-300 ${on ? "text-[var(--cmd-bg)]" : "text-[var(--cmd-text-secondary)]"}`}>{chip.label}</span>
              <span className="text-[var(--cmd-text-muted)]">{chip.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Section({
  id,
  index,
  heading,
  count,
  items,
  view,
  align,
  gap,
  onOpen,
}: {
  id: "uiux" | "graphic";
  index: string;
  heading: string;
  count: string;
  items: Work[];
  view: View;
  align: "center" | "end";
  gap: string;
  onOpen: (id: string) => void;
}) {
  return (
    <section id={`m-works-${id}`} className={`flex flex-col ${gap}`}>
      <Reveal>
        <div className={`flex justify-between gap-3 whitespace-nowrap ${align === "center" ? "items-center" : "items-end"}`}>
          <h3 className="flex min-w-0 items-baseline gap-6">
            <span className={`${mono} text-[18px] leading-[26px] text-[var(--cmd-accent)]`}>{index}</span>
            <span className="text-[28px] leading-[60px] font-bold tracking-[-0.98px] text-[var(--cmd-text-primary)]">{heading}</span>
          </h3>
          <p className={`${mono} text-[14px] leading-8 text-[var(--cmd-text-muted)]`}>{count}</p>
        </div>
      </Reveal>
      {view === "grid" ? (
        <>
          <span aria-hidden className="h-px w-full bg-[var(--cmd-surface-3)]" />
          <div className="flex flex-col gap-4">
            {items.map((work) => (
              <Reveal key={work.id}>
                <Card work={work} onOpen={onOpen} />
              </Reveal>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          {items.map((work, i) => (
            <Reveal key={work.id}>
              {i ? <span aria-hidden className="block h-px w-full bg-[var(--cmd-surface-2)]" /> : null}
              <Row work={work} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

/** Tap / Enter / Space opens the case study. */
function tapProps(work: Work, onOpen: (id: string) => void, t: (s: string) => string) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-label": t(work.title),
    onClick: () => onOpen(work.id),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(work.id);
      }
    },
  };
}

function Chevron() {
  return <MaskIcon src="/figma/works/chevron-right.svg" size={20} className="text-[var(--cmd-text-primary)]" />;
}

function Check() {
  return <MaskIcon src="/figma/works/check.svg" size={18} className="shrink-0 text-[var(--cmd-accent)]" />;
}

/** Card — Figma "Card — 01 SAPP LMS" (394:25098) / "Card — 05 Thuc Vi Thien" (394:25248). */
function Card({ work, onOpen }: { work: Work; onOpen: (id: string) => void }) {
  const t = useT();
  const graphic = !work.highlights;
  const tags = (
    <div className="flex gap-2">
      {work.tags.map((tag) => (
        <span key={tag} className="rounded-full bg-[var(--cmd-surface-2)] px-3 py-1.5 text-[14px] leading-5 whitespace-nowrap text-[var(--cmd-text-secondary)]">
          {t(tag)}
        </span>
      ))}
    </div>
  );
  return (
    <article
      {...tapProps(work, onOpen, t)}
      className="flex cursor-pointer flex-col rounded-[28px] bg-[var(--cmd-surface-1)] p-3 transition-transform duration-200 ease-out active:scale-[0.98]"
    >
      <div className="h-[233px] overflow-hidden rounded-[18px] bg-[var(--cmd-surface-2)]">
        <Cover id={work.cover} />
      </div>
      <div className={`flex flex-col px-2 pt-4 pb-3 ${graphic ? "gap-4" : ""}`}>
        <div className="flex flex-col gap-4">
          <div className="flex h-[50px] items-center gap-3">
            <Logo kind={work.logo} />
            <img src="/figma/works/dot.svg" alt="" className="size-1 shrink-0" />
            <span className={`${mono} text-[18px] leading-[26px] text-[var(--cmd-text-secondary)]`}>{work.year}</span>
            <span className={`${mono} ml-auto text-[18px] leading-[26px] text-[var(--cmd-text-muted)]`}>{work.index}</span>
          </div>
          {graphic ? (
            <div className="flex flex-col gap-2">
              {tags}
              <h4 className="text-[20px] leading-9 font-semibold tracking-[-0.4px] text-[var(--cmd-text-primary)]">{t(work.title)}</h4>
              <p className="text-[16px] leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(work.description ?? "")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {tags}
              <div className="flex flex-col gap-4">
                <h4 className="text-[24px] leading-9 font-semibold tracking-[-0.48px] text-[var(--cmd-text-primary)]">{t(work.title)}</h4>
                <ul className="flex flex-col gap-2.5">
                  {work.highlights?.map((line) => (
                    <li key={line} className="flex items-center gap-3 text-[16px] leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">
                      <Check />
                      <span className="min-w-0 flex-1">{t(line)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className={`flex items-center justify-end ${graphic ? "pt-2" : "pt-4"}`}>
          <span className="flex items-center gap-3">
            <span className="text-[14px] leading-5 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)]">{t("View case study")}</span>
            <span className="flex size-11 items-center justify-center rounded-full bg-[var(--cmd-surface-2)]">
              <Chevron />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

/** Row — Figma "Row — 01 SAPP LMS" (394:25894): 104×72 thumb, logo + year, title, short summary. */
function Row({ work, onOpen }: { work: Work; onOpen: (id: string) => void }) {
  const t = useT();
  return (
    <article {...tapProps(work, onOpen, t)} className="flex cursor-pointer items-center gap-3.5 py-4 transition-transform duration-200 ease-out active:scale-[0.98]">
      <div className="h-[72px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-[var(--cmd-surface-1)]">
        <Cover id={work.cover} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <div className="flex h-7 items-center gap-2">
          <Logo kind={work.logo} height={ROW_LOGO[work.logo]} />
          <img src="/figma/works/dot.svg" alt="" className="size-1 shrink-0" />
          <span className={`${mono} text-[14px] leading-[26px] whitespace-nowrap text-[var(--cmd-text-secondary)]`}>{work.year}</span>
        </div>
        <h4 className="text-[17px] leading-9 font-semibold tracking-[-0.34px] text-[var(--cmd-text-primary)]">{t(work.title)}</h4>
        <p className="text-[14px] leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(work.mobileBlurb ?? work.blurb)}</p>
      </div>
    </article>
  );
}
