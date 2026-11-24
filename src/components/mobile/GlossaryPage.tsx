"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { mobileZoom } from "@/lib/layout-mode";
import { useFrameThrottle } from "@/lib/scroll";
import { GLOSSARY_FUNCTIONS } from "@/lib/glossary";
import { ENTRIES, FUNCTION_BY_INDEX, LETTERS, normalize, pad, type Entry } from "@/components/os/GlossaryWindow";
import { GLOSSARY_ARTICLES } from "@/components/os/glossary/GlossaryDetail";
import { ARTICLES, ARTICLE_BY_SLUG } from "@/components/os/glossary/articles";
import { Icon } from "@/components/os/glossary/ui";
import { NavBar, StatusBar, StickyNavBar } from "./parts";

/*
 * Mobile — UX Glossary. The phone take on the desktop Glossary window (Figma 2007:28936) and its detail
 * page (2011:28710): same data, cards and Command tokens (`.works .glossary`), laid out in the 390 column.
 * The list pins its filter bar and letter / function rail under the sticky nav bar like Mobile Works.
 * Articles reuse the desktop bodies inside `.g-m`, whose CSS reflows the 1188px layouts to one column.
 */

type View = "az" | "fn";
type GState = { mGloss?: string; mScroll?: number } | null;

/** 16px top room + 48px sticky inline nav row, in design px. */
const NAV = 64;
/** Pinned area: nav + filter bar + rail, in design px. */
const PIN = NAV + 128;

function reduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GlossaryPage({ onHome }: { onHome: () => void }) {
  const [slug, setSlug] = useState<string | null>(() => (typeof window === "undefined" ? null : ((history.state as GState)?.mGloss ?? null)));

  // Back gesture / button between an article and the list (each article is its own history entry).
  useEffect(() => {
    const onPop = () => {
      const next = (history.state as GState)?.mGloss ?? null;
      setSlug(next);
      if (!next) requestAnimationFrame(() => window.scrollTo(0, (history.state as GState)?.mScroll ?? 0));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const open = useCallback((next: string) => {
    const state = (history.state as object | null) ?? {};
    if ((state as GState)?.mGloss) history.replaceState({ ...state, mGloss: next }, "");
    else {
      history.replaceState({ ...state, mScroll: window.scrollY }, "");
      history.pushState({ ...state, mGloss: next, mScroll: 0 }, "");
    }
    setSlug(next);
    window.scrollTo(0, 0);
  }, []);

  const back = useCallback(() => {
    if ((history.state as GState)?.mGloss) history.back();
    else setSlug(null);
  }, []);

  return (
    <>
      <div aria-hidden className="works glossary pointer-events-none fixed inset-0 z-0" />
      {slug && ARTICLE_BY_SLUG[slug] ? <Detail key={slug} slug={slug} onBack={back} onOpen={open} /> : <List onHome={onHome} onOpen={open} />}
    </>
  );
}

/* ── List ─────────────────────────────────────────────────────────────── */

function List({ onHome, onOpen }: { onHome: () => void; onOpen: (slug: string) => void }) {
  const t = useT();
  const [view, setView] = useState<View>("az");
  const [phase, setPhase] = useState<"idle" | "out">("idle");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [stuck, setStuck] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return ENTRIES;
    return ENTRIES.filter((e) => normalize(`${e.term} ${e.definition}`).includes(q));
  }, [query]);

  const sync = useCallback(() => {
    const z = mobileZoom();
    const box = bar.current?.getBoundingClientRect();
    setStuck(box ? box.top < (NAV + 8) * z : false);
    let current = "";
    for (const el of document.querySelectorAll<HTMLElement>("[data-m-anchor]")) {
      if (el.getBoundingClientRect().top <= (PIN + 24) * z) current = el.dataset.mAnchor ?? "";
    }
    setActive(current);
  }, []);
  const onScroll = useFrameThrottle(sync);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer.current);
    };
  }, [onScroll, sync]);
  useEffect(() => {
    requestAnimationFrame(sync);
  }, [results, view, sync]);

  const jump = (anchor: string) => {
    const el = document.querySelector<HTMLElement>(`[data-m-anchor="${anchor}"]`);
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - PIN * mobileZoom(), behavior: reduce() ? "auto" : "smooth" });
    setActive(anchor);
  };

  const switchView = (next: View) => {
    if (next === view || phase === "out") return;
    const swap = () => {
      setView(next);
      setPhase("idle");
      const box = bar.current?.getBoundingClientRect();
      if (box && stuck) window.scrollTo(0, Math.max(0, window.scrollY + box.top - (NAV + 8) * mobileZoom()));
      requestAnimationFrame(sync);
    };
    if (reduce()) {
      swap();
      return;
    }
    setPhase("out");
    timer.current = window.setTimeout(swap, 200);
  };

  const filter = (pinned: boolean) => (
    <div className="flex flex-col gap-3">
      <FilterBar view={view} onView={switchView} query={query} onQuery={setQuery} pinned={pinned} />
      {view === "az" ? <LetterRail results={results} active={active} onJump={jump} /> : <FunctionRail results={results} active={active} onJump={jump} />}
    </div>
  );

  return (
    <>
      <div className="m-page-body works glossary reveal-root relative bg-transparent">
        <StatusBar />
        <div className="m-col">
          <NavBar variant="inline" title="UX Glossary" back={{ label: t("Home"), onClick: onHome }} />
          <StickyNavBar title="UX Glossary" back={{ label: t("Home"), onClick: onHome }} background="var(--w-bg)" threshold={48} />
          <div className="flex flex-col gap-10 px-4 pt-5" style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom) / var(--m-zoom, 1))" }}>
            <Intro />
            <div ref={bar} className={stuck ? "invisible" : undefined}>
              {filter(false)}
            </div>

            <div key={view} className={`works-view ${phase === "out" ? "is-leaving" : ""}`}>
              {results.length ? (
                view === "az" ? (
                  <AZ results={results} onOpen={onOpen} />
                ) : (
                  <ByFunction results={results} onOpen={onOpen} />
                )
              ) : (
                <p className="py-16 text-center text-[16px] leading-6 text-[var(--w-secondary)]">{t("No terms match “{q}”.", { q: query.trim() })}</p>
              )}
            </div>

            <footer className="flex flex-col items-center gap-10 pt-8 pb-6">
              <span className="h-px w-full bg-[var(--g-line)]" />
              <p className="font-display text-[18px] leading-7 whitespace-nowrap">© Tuan Ngoc Portfolio 2027</p>
            </footer>
          </div>
        </div>
      </div>

      {/* The filter bar and rail pin under the sticky nav bar once the real ones scroll past. */}
      <div aria-hidden={!stuck || undefined} inert={!stuck || undefined} className={`works glossary works-pin pointer-events-none fixed inset-x-0 top-0 z-30 ${stuck ? "is-stuck" : ""}`}
        style={{ background: "linear-gradient(180deg, var(--w-bg) 0%, var(--w-bg) calc(100% - 16px), transparent 100%)" }}
      >
        <div className="m-col px-4 pb-4" style={{ paddingTop: `calc(${NAV + 8}px + env(safe-area-inset-top) / var(--m-zoom, 1))` }}>
          <div className="pointer-events-auto">{filter(true)}</div>
        </div>
      </div>
    </>
  );
}

function Intro() {
  const t = useT();
  return (
    <section className="flex flex-col gap-7">
      <h2 className="font-display text-[56px] leading-[56px] whitespace-nowrap">
        UX
        <br />
        Glossary
      </h2>
      <p className="text-[16px] leading-7 font-semibold tracking-[-0.2px] text-[var(--w-secondary)]">
        {t(
          "The working vocabulary of UX research and product design. Read it A to Z, or by function — grouped by where each term sits in the product lifecycle, from discovering a problem to scaling the practice.",
        )}
      </p>
      <dl className="flex gap-3">
        {[
          [pad(ENTRIES.length), "TERMS"],
          [pad(GLOSSARY_FUNCTIONS.length), "FUNCTIONS"],
          [pad(LETTERS.length), "LETTERS"],
        ].map(([value, label]) => (
          <div key={label} className="flex min-w-0 flex-1 flex-col gap-1">
            <dt className="font-display text-[32px] leading-[44px]">{value}</dt>
            <dd className="font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-muted)]">{t(label)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FilterBar({ view, onView, query, onQuery, pinned }: { view: View; onView: (v: View) => void; query: string; onQuery: (q: string) => void; pinned: boolean }) {
  const t = useT();
  const tabs: { id: View; label: string; hint: string }[] = [
    { id: "az", label: "A–Z", hint: "ABC" },
    { id: "fn", label: t("By function"), hint: pad(GLOSSARY_FUNCTIONS.length) },
  ];
  return (
    <div className={`flex flex-col gap-2 rounded-[26px] bg-[var(--w-card)] p-1.5 ${pinned ? "shadow-[0_12px_32px_var(--effect-shadow)]" : ""}`}>
      <div role="tablist" className="flex gap-1">
        {tabs.map((tab) => {
          const on = tab.id === view;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onView(tab.id)}
              className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full text-[16px] leading-6 transition-colors duration-200 ${
                on ? "bg-[var(--w-active-bg)] font-semibold text-[var(--w-active-fg)]" : "text-[var(--w-secondary)]"
              }`}
            >
              {tab.label}
              <span className={`font-mono text-[14px] leading-5 tracking-[0.4px] ${on ? "opacity-60" : "text-[var(--w-muted)]"}`}>{tab.hint}</span>
            </button>
          );
        })}
      </div>
      <label className="flex h-11 items-center gap-2.5 rounded-full bg-[var(--w-well)] px-4">
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="shrink-0 text-[var(--w-muted)]">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={t("Search {n} terms", { n: String(ENTRIES.length) })}
          aria-label={t("Search terms")}
          className="glossary-search min-w-0 flex-1 bg-transparent text-[16px] leading-6 text-[var(--w-text)] outline-none placeholder:text-[var(--w-muted)]"
        />
        {query ? (
          <button type="button" aria-label={t("Clear search")} onClick={() => onQuery("")} className="flex size-6 items-center justify-center rounded-full bg-[var(--w-chip)] text-[var(--w-secondary)]">
            <Icon name="x" size={14} />
          </button>
        ) : null}
      </label>
    </div>
  );
}

/** Horizontal rail; the active chip scrolls itself into view. */
function Rail({ children, activeKey }: { children: React.ReactNode; activeKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    const el = root?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!root || !el) return;
    const left = el.offsetLeft - root.clientWidth / 2 + el.clientWidth / 2;
    root.scrollTo({ left, behavior: reduce() ? "auto" : "smooth" });
  }, [activeKey]);
  return (
    <div ref={ref} className="-mx-4 flex gap-1.5 overflow-x-auto px-4" style={{ scrollbarWidth: "none" }}>
      {children}
    </div>
  );
}

function LetterRail({ results, active, onJump }: { results: Entry[]; active: string; onJump: (anchor: string) => void }) {
  const has = new Set(results.map((e) => e.letter));
  return (
    <Rail activeKey={active}>
      {LETTERS.map((l) => {
        const on = active === `l-${l}`;
        const enabled = has.has(l);
        return (
          <button
            key={l}
            type="button"
            disabled={!enabled}
            aria-current={on ? "true" : undefined}
            onClick={() => onJump(`l-${l}`)}
            className={`flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-[16px] leading-6 transition-colors duration-200 ${
              on ? "bg-[var(--g-accent-soft)] font-semibold text-[var(--w-accent)]" : enabled ? "bg-[var(--w-card)] text-[var(--w-secondary)]" : "bg-[var(--w-card)] text-[var(--g-faint)]"
            }`}
          >
            {l}
          </button>
        );
      })}
    </Rail>
  );
}

function FunctionRail({ results, active, onJump }: { results: Entry[]; active: string; onJump: (anchor: string) => void }) {
  const t = useT();
  const has = new Set(results.map((e) => e.fn));
  return (
    <Rail activeKey={active}>
      {GLOSSARY_FUNCTIONS.map((f) => {
        const on = active === `f-${f.index}`;
        const enabled = has.has(f.index);
        return (
          <button
            key={f.index}
            type="button"
            disabled={!enabled}
            aria-current={on ? "true" : undefined}
            onClick={() => onJump(`f-${f.index}`)}
            className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-[14px] leading-5 whitespace-nowrap transition-colors duration-200 ${
              on ? "bg-[var(--g-accent-soft)] font-semibold text-[var(--w-accent)]" : enabled ? "bg-[var(--w-card)] text-[var(--w-secondary)]" : "bg-[var(--w-card)] text-[var(--g-faint)]"
            }`}
          >
            <span className="font-mono tracking-[0.4px]">{pad(f.index)}</span>
            {t(f.stage)}
          </button>
        );
      })}
    </Rail>
  );
}

function AZ({ results, onOpen }: { results: Entry[]; onOpen: (slug: string) => void }) {
  const t = useT();
  const groups = LETTERS.map((l, i) => ({ letter: l, index: i + 1, items: results.filter((e) => e.letter === l) })).filter((g) => g.items.length);
  return (
    <div className="flex flex-col gap-10">
      {groups.map((g) => (
        <section key={g.letter} data-m-anchor={`l-${g.letter}`} className="flex flex-col gap-4">
          <div className="flex items-end justify-between whitespace-nowrap">
            <div className="flex items-end gap-3">
              <span className="font-display text-[56px] leading-[52px]">{g.letter}</span>
              <span className="font-display pb-1 text-[16px] leading-6 text-[var(--w-accent)]">{pad(g.index)}</span>
            </div>
            <span className="font-display pb-1 text-[14px] leading-5 tracking-[1.2px] text-[var(--w-muted)]">
              {pad(g.items.length)} {t(g.items.length === 1 ? "TERM" : "TERMS")}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {g.items.map((e) => (
              <Card key={e.term} id={e.azId} tag={t(FUNCTION_BY_INDEX.get(e.fn)!.stage)} entry={e} showFn onOpen={onOpen} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ByFunction({ results, onOpen }: { results: Entry[]; onOpen: (slug: string) => void }) {
  const t = useT();
  const sections = GLOSSARY_FUNCTIONS.map((f) => ({ f, items: results.filter((e) => e.fn === f.index) })).filter((s) => s.items.length);
  return (
    <div className="flex flex-col gap-14">
      {sections.map(({ f, items }) => (
        <section key={f.index} data-m-anchor={`f-${f.index}`} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-display text-[14px] leading-5 tracking-[1.2px] whitespace-nowrap">
              <span className="text-[var(--w-accent)]">
                {pad(f.index)} · {t(f.stage)}
              </span>
              <span className="text-[var(--w-muted)]">
                {pad(items.length)} {t(items.length === 1 ? "TERM" : "TERMS")}
              </span>
            </div>
            <h3 className="font-display text-[32px] leading-[38px]">{t(f.name)}</h3>
            <p className="text-[16px] leading-6 tracking-[-0.1px] text-[var(--w-secondary)]">{t(f.blurb)}</p>
          </div>
          <div className="flex flex-col gap-3">
            {items.map((e) => (
              <Card key={e.term} id={e.fnId} tag={e.letter} entry={e} onOpen={onOpen} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Card({ id, tag, entry, showFn = false, onOpen }: { id: string; tag: string; entry: Entry; showFn?: boolean; onOpen: (slug: string) => void }) {
  const t = useT();
  const slug = GLOSSARY_ARTICLES[entry.term];
  const f = FUNCTION_BY_INDEX.get(entry.fn)!;
  return (
    <article className="relative flex flex-col gap-3 rounded-[20px] bg-[var(--w-card)] p-5 transition-transform duration-200 active:scale-[0.98]">
      <div className="flex justify-between font-mono text-[14px] leading-5 whitespace-nowrap text-[var(--w-muted)]">
        <span className="tracking-[0.4px]">{id}</span>
        <span className="tracking-[1.2px]">{tag}</span>
      </div>
      <h4 className="flex items-center justify-between gap-3 text-[20px] leading-7 font-semibold tracking-[-0.4px]">
        {slug ? (
          <button type="button" onClick={() => onOpen(slug)} className="text-left after:absolute after:inset-0 after:rounded-[20px] after:content-['']">
            {entry.term}
          </button>
        ) : (
          entry.term
        )}
        {slug ? <Icon name="arrow-right" size={20} className="text-[var(--w-accent)]" /> : null}
      </h4>
      <p className="text-[16px] leading-6 tracking-[-0.1px] text-[var(--w-secondary)]">{entry.definition}</p>
      {showFn ? (
        <span className="mt-1 flex items-center gap-2.5 self-start rounded-[10px] bg-[var(--w-chip)] px-3 py-2 text-[14px] leading-5 whitespace-nowrap">
          <span className="font-mono tracking-[0.4px] text-[var(--w-accent)]">{pad(f.index)}</span>
          <span className="font-semibold text-[var(--w-secondary)]">{t(f.name)}</span>
        </span>
      ) : null}
    </article>
  );
}

/* ── Detail ───────────────────────────────────────────────────────────── */

function Detail({ slug, onBack, onOpen }: { slug: string; onBack: () => void; onOpen: (slug: string) => void }) {
  const article = ARTICLE_BY_SLUG[slug];
  const next = ARTICLES[ARTICLES.indexOf(article) + 1];
  const fn = GLOSSARY_FUNCTIONS.find((f) => f.index === article.fn)!;
  const { Body, sections } = article;
  const [toc, setToc] = useState(false);

  const jump = (id: string) => {
    const el = document.getElementById(`g-${id}`);
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - (NAV + 16) * mobileZoom(), behavior: reduce() ? "auto" : "smooth" });
  };

  const chip = "rounded-full bg-[var(--w-card)] px-3 py-1.5 font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-secondary)] uppercase";

  return (
    <div className="m-page-body works glossary relative bg-transparent">
      <StatusBar />
      <div className="m-col">
        <NavBar variant="inline" title="" back={{ label: "Glossary", onClick: onBack }} />
        <StickyNavBar title="" back={{ label: "Glossary", onClick: onBack }} background="var(--w-bg)" threshold={48} />
        <div className="flex flex-col gap-14 px-4 pt-5" style={{ paddingBottom: "calc(40px + env(safe-area-inset-bottom) / var(--m-zoom, 1))" }}>
          {/* Hero */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <span className={`${chip} flex items-center gap-2`}>
                <Icon name="flask" size={16} className="text-[var(--d-accent)]" />
                UX Glossary
              </span>
              <span className={chip}>
                {pad(fn.index)} · {fn.stage}
              </span>
              <span className={chip}>{article.kind}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-[44px] leading-[46px] tracking-[-1px] [overflow-wrap:anywhere]">{article.term}</h1>
              <p className="text-[18px] leading-7 tracking-[-0.3px] text-[var(--w-secondary)]">{article.vi}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-[24px] bg-[var(--w-card)] p-5">
              <p className="text-[18px] leading-7 font-semibold tracking-[-0.3px]">{article.definition}</p>
              <p className="text-[16px] leading-6 tracking-[-0.1px] text-[var(--w-secondary)]">{article.definitionMore}</p>
            </div>
            <div className="flex flex-col gap-4 rounded-[24px] bg-[var(--d-fill)] p-5 text-white">
              <p className="text-[18px] leading-7 font-semibold tracking-[-0.3px]">{article.oneLine}</p>
              <div className="flex gap-2.5">
                {article.glance.map(([k, v], i) => (
                  <div key={i} className="flex min-w-0 flex-1 flex-col gap-1 rounded-2xl bg-white/12 px-4 py-3">
                    <span className="text-[28px] leading-8 font-bold tracking-[-1px]">{k}</span>
                    <span className="text-[14px] leading-5">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col rounded-[24px] bg-[var(--w-card)] px-5">
              {article.facts.map((f, i) => (
                <div key={f.label} className={`flex flex-col gap-2 py-4 ${i ? "border-t border-[var(--d-line)]" : ""}`}>
                  <span className="font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-secondary)] uppercase">{f.label}</span>
                  {f.items.map((it) => (
                    <p key={it} className="text-[16px] leading-6 tracking-[-0.2px]">
                      {it}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Trên trang này: collapsed to a row on a phone, opens into the full list. */}
          <nav aria-label="Trên trang này" className="flex flex-col rounded-[20px] bg-[var(--d-well)] p-2">
            <button type="button" aria-expanded={toc} onClick={() => setToc((v) => !v)} className="flex h-11 items-center justify-between px-3 text-[16px] leading-6 font-semibold">
              Trên trang này
              <span className="flex items-center gap-2 text-[14px] font-normal text-[var(--w-muted)]">
                {pad(sections.length)} mục
                <Icon name="chevron-down" size={18} className={`transition-transform duration-200 ${toc ? "rotate-180" : ""}`} />
              </span>
            </button>
            {toc ? (
              <div className="flex flex-col gap-0.5 pt-1">
                {sections.map((s) => (
                  <button key={s.id} type="button" onClick={() => jump(s.id)} className="flex min-h-11 items-center gap-3 rounded-[12px] px-3 py-2 text-left active:bg-[var(--d-well-on)]">
                    <Icon name={s.icon} size={20} className="text-[var(--d-accent)]" />
                    <span className="min-w-0 flex-1 text-[16px] leading-6 tracking-[-0.2px] text-[var(--w-secondary)]">{s.title}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </nav>

          <div className="g-m">
            <Body />
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--d-line)] pt-8">
            {next ? (
              <button type="button" onClick={() => onOpen(next.slug)} className="flex flex-col items-start gap-1 rounded-[20px] bg-[var(--w-card)] p-5 text-left">
                <span className="font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-muted)]">THUẬT NGỮ TIẾP THEO</span>
                <span className="text-[20px] leading-7 font-semibold tracking-[-0.4px] text-[var(--d-accent)]">{next.term} →</span>
              </button>
            ) : null}
            <button type="button" onClick={onBack} className="flex h-[52px] items-center justify-center rounded-full bg-[var(--w-active-bg)] px-6 text-[16px] leading-6 font-semibold text-[var(--w-active-fg)]">
              ← Quay lại UX Glossary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
