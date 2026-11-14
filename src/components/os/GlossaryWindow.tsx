/* eslint-disable @next/next/no-img-element -- Figma exports keep their own width and height. */
"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { useT } from "@/lib/i18n";
import { scrollToChild, useFrameThrottle } from "@/lib/scroll";
import { GLOSSARY, GLOSSARY_FUNCTIONS, type GlossaryTerm } from "@/lib/glossary";
import { WindowControls } from "./AppWindow";
import { Reveal } from "./reveal";
import { useFitZoom, useTitleBarDrag, WindowShell } from "./window-manager";

/*
 * UX Glossary — Figma yal6CdLdWWhvDCKXPsJcuE, section "Glossary" (2007:28936):
 * "Desktop — Glossary A–Z (Dark)" 2007:28937 and "Desktop — Glossary By function (Dark)" 2008:29361.
 * The window reuses the Works shell and its Command tokens (`.works`, --w-*), so Light Glass gets the
 * same paper treatment as Works; `.glossary` adds the few tokens only this screen needs.
 */

type View = "az" | "fn";
type Entry = GlossaryTerm & { letter: string; azId: string; fnId: string };

const pad = (n: number) => String(n).padStart(2, "0");
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Stable ids from the full list (A.01, 03.01) so filtering never renumbers a card.
const ENTRIES: Entry[] = (() => {
  const perLetter = new Map<string, number>();
  const perFn = new Map<number, number>();
  return GLOSSARY.map((t) => {
    const letter = t.term[0].toUpperCase();
    const a = (perLetter.get(letter) ?? 0) + 1;
    const f = (perFn.get(t.fn) ?? 0) + 1;
    perLetter.set(letter, a);
    perFn.set(t.fn, f);
    return { ...t, letter, azId: `${letter}.${pad(a)}`, fnId: `${pad(t.fn)}.${pad(f)}` };
  });
})();
const LETTERS = ALPHABET.filter((l) => ENTRIES.some((e) => e.letter === l));
const FUNCTION_BY_INDEX = new Map(GLOSSARY_FUNCTIONS.map((f) => [f.index, f]));

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function GlossaryWindow({ onOpenAi }: { onOpenAi: () => void }) {
  const t = useT();
  const drag = useTitleBarDrag();
  const scroller = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<View>("az");
  const [viewPhase, setViewPhase] = useState<"idle" | "out">("idle");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("");
  const [stuck, setStuck] = useState(false);
  const zoom = useFitZoom(scroller, 1872, true, 1.05);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return ENTRIES;
    return ENTRIES.filter((e) => normalize(`${e.term} ${e.definition}`).includes(q));
  }, [query]);

  const syncActive = useCallback(() => {
    const root = scroller.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top;
    const bar = barRef.current;
    // Pinned with JS like Works: sticky is unreliable inside the zoomed scroller.
    setStuck(bar ? bar.getBoundingClientRect().top - rootTop < 16 : false);
    let current = "";
    for (const el of root.querySelectorAll<HTMLElement>("[data-anchor]")) {
      if (el.getBoundingClientRect().top - rootTop <= 140) current = el.dataset.anchor ?? "";
    }
    setActive(current);
  }, []);
  const onScroll = useFrameThrottle(syncActive);
  useEffect(() => {
    requestAnimationFrame(syncActive);
  }, [results, view, syncActive]);

  const jump = useCallback((anchor: string) => {
    const root = scroller.current;
    const el = root?.querySelector<HTMLElement>(`[data-anchor="${anchor}"]`);
    if (!root || !el) return;
    scrollToChild(root, el, 120); // room for the pinned filter bar
    setActive(anchor);
  }, []);

  const toTop = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.current?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const switchView = useCallback(
    (next: View) => {
      if (next === view || viewPhase === "out") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      }, 200);
    },
    [view, viewPhase, stuck],
  );

  // "/" focuses search (the Shortcut hint in the bar); Escape clears it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const win = scroller.current?.closest("[data-window]");
      if (!win || win.closest("[inert]") || !win.isConnected) return;
      const typing = (e.target as HTMLElement | null)?.closest?.("input, textarea, [contenteditable]");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && e.target === searchRef.current) {
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bar = (pinned: boolean) => (
    <FilterBar
      view={view}
      onView={switchView}
      query={query}
      onQuery={setQuery}
      inputRef={pinned ? undefined : searchRef}
      onFocusMain={() => searchRef.current?.focus()}
      pinned={pinned}
    />
  );

  return (
    <WindowShell label={t("Glossary — UX Research & Design Terms")} className="works glossary rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] select-text">
      {/* Figma "Window Title Bar" (AIW/Window Title Bar): surface-1, logo, centred title, controls. */}
      <header {...drag} className="flex h-[52px] shrink-0 items-center justify-between bg-[var(--w-card)] pr-2.5 pl-4 select-none">
        <div className="flex w-[120px] items-center">
          <img src="/figma/logo.svg" alt="" className="theme-dark-only" />
          <img src="/figma/light/logo.svg" alt="" className="theme-light-only" />
        </div>
        <h1 className="truncate text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t("Glossary — UX Research & Design Terms")}</h1>
        <div className="flex w-[120px] items-center justify-end">
          <WindowControls buttonClassName="h-8 w-8 text-[var(--w-muted)] hover:bg-[var(--w-chip)]" />
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div ref={scroller} onScroll={onScroll} className="os-scroll reveal-root h-full overflow-y-auto" style={{ overflowX: "clip" }}>
          <div data-reveal-zoom className="mx-auto w-[1872px] overflow-x-clip px-[156px] pt-24 pb-[72px]" style={{ zoom }}>
            {/* Section — Header (2007:28945 / 2008:29369) */}
            <section className="flex flex-col gap-10">
              <Intro />
              <div ref={barRef}>{bar(false)}</div>
              <div key={view} className={`works-view ${viewPhase === "out" ? "is-leaving" : ""}`}>
                {view === "az" ? <LetterRail results={results} active={active} onJump={jump} /> : <LifecycleTrack results={results} active={active} onJump={jump} />}
              </div>
            </section>

            <div key={view} className={`works-view mt-[100px] ${viewPhase === "out" ? "is-leaving" : ""}`}>
              {results.length === 0 ? (
                <p className="py-24 text-center text-[18px] leading-7 text-[var(--w-secondary)]">{t("No terms match “{q}”.", { q: query.trim() })}</p>
              ) : view === "az" ? (
                <AZ results={results} />
              ) : (
                <ByFunction results={results} />
              )}
            </div>

            {/* Footer (2007:29088) */}
            <Reveal>
              <footer className="mt-[100px] flex flex-col items-center gap-10 pt-12 pb-6">
                <span className="h-px w-full bg-[var(--g-line)]" />
                <p className="text-[24px] leading-8 font-semibold tracking-[-0.7px]">© Tuan Ngoc Portfolio 2027</p>
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
            <div className="pointer-events-auto rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.28)]">{bar(true)}</div>
          </div>
        </div>

        {/* Floating Actions (2007:29091): WRK/Back To Top + WRK/App Link, as in Works. */}
        <div className="pointer-events-none absolute right-4 bottom-5 flex flex-col items-end gap-3">
          <button
            type="button"
            aria-label={t("Back to top")}
            onClick={toTop}
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
    </WindowShell>
  );
}

/** Intro (2007:28946): display headline left, lead + three stats right, bottom-aligned. */
function Intro() {
  const t = useT();
  const stats: [string, string][] = [
    [pad(ENTRIES.length), "TERMS"],
    [pad(GLOSSARY_FUNCTIONS.length), "FUNCTIONS"],
    [pad(LETTERS.length), "LETTERS"],
  ];
  return (
    <Reveal>
      <div className="flex items-end justify-between">
        <h2 className="text-[136px] leading-[128px] font-normal tracking-[-6.8px] whitespace-nowrap">
          UX
          <br />
          Glossary
        </h2>
        <div className="flex w-[600px] flex-col gap-10">
          <p className="text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[var(--w-secondary)]">
            {t(
              "The working vocabulary of UX research and product design. Read it A to Z, or by function — grouped by where each term sits in the product lifecycle, from discovering a problem to scaling the practice.",
            )}
          </p>
          <div className="flex">
            {stats.map(([value, label]) => (
              <div key={label} className="flex flex-1 flex-col gap-1">
                <span className="text-[48px] leading-[52px] font-semibold tracking-[-1.44px]">{value}</span>
                <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">{t(label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Filter Bar (2007:28961): A–Z / By function segment and the search field on a surface-1 pill. */
function FilterBar({
  view,
  onView,
  query,
  onQuery,
  inputRef,
  onFocusMain,
  pinned,
}: {
  view: View;
  onView: (v: View) => void;
  query: string;
  onQuery: (q: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  onFocusMain: () => void;
  pinned: boolean;
}) {
  const t = useT();
  const sorts: { id: View; label: string; count: string }[] = [
    { id: "az", label: "A–Z", count: "ABC" },
    { id: "fn", label: "By function", count: pad(GLOSSARY_FUNCTIONS.length) },
  ];
  return (
    <div className="flex items-center gap-2 rounded-full bg-[var(--w-card)] p-2">
      <div className="flex shrink-0 items-start gap-1">
        {sorts.map((s) => {
          const on = view === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => onView(s.id)}
              className={`flex items-center gap-2.5 rounded-full px-5 py-3 whitespace-nowrap transition-colors duration-300 ${
                on ? "bg-[var(--w-active-bg)] text-[var(--w-active-fg)]" : "text-[var(--w-secondary)] hover:bg-[var(--w-chip)]"
              }`}
            >
              <span className="text-[18px] leading-7 font-semibold tracking-[-0.2px]">{t(s.label)}</span>
              <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-muted)]">{s.count}</span>
            </button>
          );
        })}
      </div>
      <label className="flex h-11 min-w-0 flex-1 items-center gap-3.5 border-l border-[var(--g-line)] pr-4 pl-6">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className="shrink-0 text-[var(--w-muted)]">
          <path
            d="M16.5 10.0833C16.5 13.6272 13.6272 16.5 10.0833 16.5C6.53951 16.5 3.66667 13.6272 3.66667 10.0833C3.66667 6.53951 6.53951 3.66667 10.0833 3.66667C13.6272 3.66667 16.5 6.53951 16.5 10.0833Z"
            stroke="currentColor"
            strokeWidth="1.83333"
          />
          <path d="M18.3333 18.3333L15.125 15.125" stroke="currentColor" strokeWidth="1.83333" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          // The pinned copy hands focus to the real field so the shortcut and caret stay in one place.
          onFocus={pinned ? onFocusMain : undefined}
          placeholder={t("Search {n} terms and definitions", { n: ENTRIES.length })}
          aria-label={t("Search the glossary")}
          className="glossary-search min-w-0 flex-1 bg-transparent text-[18px] leading-7 text-[var(--w-text)] outline-none placeholder:text-[var(--w-muted)]"
        />
        <kbd className="shrink-0 rounded-md border border-[var(--g-line)] px-2 py-0.5 font-mono text-[14px] leading-normal text-[var(--w-muted)]">/</kbd>
      </label>
    </div>
  );
}

/** Letter Rail (2007:29298): every letter; ones with no terms are faint and inert. */
function LetterRail({ results, active, onJump }: { results: Entry[]; active: string; onJump: (anchor: string) => void }) {
  const t = useT();
  const present = new Set(results.map((e) => e.letter));
  const current = active.startsWith("l-") ? active.slice(2) : (LETTERS.find((l) => present.has(l)) ?? "");
  return (
    <nav aria-label={t("Jump to letter")} className="flex items-center justify-between px-4">
      {ALPHABET.map((l) => {
        const has = present.has(l);
        const on = has && l === current;
        return (
          <button
            key={l}
            type="button"
            disabled={!has}
            aria-current={on ? "true" : undefined}
            onClick={() => onJump(`l-${l}`)}
            className={`flex size-11 items-center justify-center rounded-xl font-mono text-[18px] leading-normal transition-colors duration-200 ${
              on
                ? "bg-[var(--g-accent-soft)] text-[var(--w-accent)]"
                : has
                  ? "text-[var(--w-secondary)] hover:bg-[var(--w-chip)] hover:text-[var(--w-text)]"
                  : "cursor-default text-[var(--g-faint)]"
            }`}
          >
            {l}
          </button>
        );
      })}
    </nav>
  );
}

/** Lifecycle Track (2008:30399): the seven functions as steps on a dashed line. */
function LifecycleTrack({ results, active, onJump }: { results: Entry[]; active: string; onJump: (anchor: string) => void }) {
  const t = useT();
  const present = new Set(results.map((e) => e.fn));
  const first = GLOSSARY_FUNCTIONS.find((f) => present.has(f.index))?.index;
  const current = active.startsWith("f-") ? Number(active.slice(2)) : first;
  return (
    <nav aria-label={t("Jump to function")} className="relative h-[110px]">
      <span aria-hidden className="glossary-connector absolute top-[22px] left-[22px] h-px w-[1422px]" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between">
        {GLOSSARY_FUNCTIONS.map((f) => {
          const on = f.index === current;
          const has = present.has(f.index);
          return (
            <button
              key={f.index}
              type="button"
              disabled={!has}
              aria-current={on ? "true" : undefined}
              onClick={() => onJump(`f-${f.index}`)}
              className={`group/step flex flex-col items-start gap-2.5 text-left ${has ? "" : "cursor-default opacity-40"}`}
            >
              <span
                className={`flex size-11 items-center justify-center rounded-full font-mono text-[16px] leading-6 tracking-[0.4px] transition-colors duration-300 ${
                  on ? "bg-[var(--w-accent)] text-white" : "border border-[var(--g-faint)] bg-[var(--w-bg)] text-[var(--w-secondary)] group-hover/step:border-[var(--w-accent)]"
                }`}
              >
                {pad(f.index)}
              </span>
              <span className="font-mono text-[14px] leading-5 tracking-[1.6px] text-[var(--w-muted)]">{t(f.stage)}</span>
              <span className={`text-[18px] leading-[26px] font-semibold tracking-[-0.2px] whitespace-nowrap transition-colors duration-300 ${on ? "text-[var(--w-text)]" : "text-[var(--w-secondary)]"}`}>
                {t(f.name)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Glossary — A–Z (2008:28541): a letter head beside a three-column card grid per letter. */
function AZ({ results }: { results: Entry[] }) {
  const t = useT();
  const groups = LETTERS.map((l, i) => ({ letter: l, index: i + 1, items: results.filter((e) => e.letter === l) })).filter((g) => g.items.length);
  return (
    <div>
      {groups.map((g, i) => (
        <section
          key={g.letter}
          data-anchor={`l-${g.letter}`}
          className={`flex items-start gap-12 ${i === 0 ? "pb-12" : "border-t border-[var(--g-line)] py-12"}`}
        >
          <Reveal className="flex w-[150px] shrink-0 flex-col gap-3 whitespace-nowrap">
            <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-accent)]">{pad(g.index)}</span>
            <span className="text-[112px] leading-[104px] font-normal tracking-[-4px]">{g.letter}</span>
            <span className="font-mono text-[16px] leading-6 tracking-[1.2px] text-[var(--w-muted)]">
              {pad(g.items.length)} {t(g.items.length === 1 ? "TERM" : "TERMS")}
            </span>
          </Reveal>
          <div className="grid flex-1 grid-cols-3 gap-6">
            {g.items.map((e) => (
              <Reveal key={e.term} className="flex">
                <Card id={e.azId} tag={t(FUNCTION_BY_INDEX.get(e.fn)!.stage)} term={e.term} definition={e.definition} minH={300} footer={<FunctionTag fn={e.fn} />} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Glossary — By function (2008:30511): one section per lifecycle function, 100px apart. */
function ByFunction({ results }: { results: Entry[] }) {
  const t = useT();
  const sections = GLOSSARY_FUNCTIONS.map((f) => ({ f, items: results.filter((e) => e.fn === f.index) })).filter((s) => s.items.length);
  return (
    <div className="flex flex-col gap-[100px]">
      {sections.map(({ f, items }) => (
        <section key={f.index} data-anchor={`f-${f.index}`} className="flex flex-col gap-10">
          <Reveal>
            <div className="flex items-end justify-between whitespace-nowrap">
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-accent)]">{pad(f.index)}</span>
                  <h3 className="text-[56px] leading-[60px] font-bold tracking-[-3.5px]">{t(f.name)}</h3>
                </div>
                <p className="text-[18px] leading-7 tracking-[-0.2px] text-[var(--w-secondary)]">{t(f.blurb)}</p>
              </div>
              <p className="font-mono text-[24px] leading-8 tracking-[0.4px] text-[var(--w-muted)]">
                {pad(items.length)} {t(items.length === 1 ? "TERM" : "TERMS")} · {t(f.stage)}
              </p>
            </div>
          </Reveal>
          <span className="h-px w-full bg-[var(--g-line)]" />
          <div className="grid grid-cols-3 gap-6">
            {items.map((e) => (
              <Reveal key={e.term} className="flex">
                <Card id={e.fnId} tag={e.letter} term={e.term} definition={e.definition} minH={208} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Term card (2008:28548 in A–Z, 2008:30686 by function). Cards in a row share the row's height. */
function Card({ id, tag, term, definition, minH, footer }: { id: string; tag: string; term: string; definition: string; minH: number; footer?: ReactNode }) {
  return (
    <article
      className={`glossary-card flex w-full flex-col gap-4 rounded-[24px] bg-[var(--w-card)] px-8 pt-8 ${footer ? "pb-7" : "pb-8"}`}
      style={{ minHeight: minH }}
    >
      <div className="flex justify-between font-mono text-[14px] leading-5 whitespace-nowrap text-[var(--w-muted)]">
        <span className="tracking-[0.4px]">{id}</span>
        <span className="tracking-[1.2px]">{tag}</span>
      </div>
      <h4 className="text-[28px] leading-9 font-semibold tracking-[-0.6px]">{term}</h4>
      <p className={`text-[18px] leading-7 tracking-[-0.1px] text-[var(--w-secondary)] ${footer ? "flex-1" : ""}`}>{definition}</p>
      {footer ? <Fragment>{footer}</Fragment> : null}
    </article>
  );
}

/** Function Tag (2008:28554): the term's lifecycle function, number in accent. */
function FunctionTag({ fn }: { fn: number }) {
  const t = useT();
  const f = FUNCTION_BY_INDEX.get(fn)!;
  return (
    <span className="flex items-center gap-2.5 self-start rounded-[10px] bg-[var(--w-chip)] px-3 py-2 text-[14px] leading-5 whitespace-nowrap">
      <span className="font-mono tracking-[0.4px] text-[var(--w-accent)]">{pad(f.index)}</span>
      <span className="font-semibold text-[var(--w-secondary)]">{t(f.name)}</span>
    </span>
  );
}
