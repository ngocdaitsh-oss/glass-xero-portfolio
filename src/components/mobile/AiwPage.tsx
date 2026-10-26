/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  CAPABILITIES_1,
  CAPABILITIES_2,
  COPY,
  FINAL_STEP,
  HANDOFF,
  INPUT_MAP_1,
  INPUT_MAP_2,
  INPUTS,
  LEAD,
  LEGEND,
  MAP_BODY,
  OUTPUT_LIST_1,
  OUTPUT_LIST_2,
  OUTPUTS,
  PHASE_CARDS,
  PHASE_HEADS,
  ROLE_ICON,
  ROLES_1,
  ROLES_2,
  STATS,
  STEPS,
  TOC,
  type Capability,
  type Role,
  type SectionId,
  type Who,
} from "@/lib/aiw";
import { useT } from "@/lib/i18n";
import { mobileZoom } from "@/lib/layout-mode";
import { useFrameThrottle } from "@/lib/scroll";
import { OverviewCopy } from "@/components/os/aiw-copy";
import { Reveal, useReveal } from "@/components/os/reveal";
import { HomeIndicator, NavBar, StatusBar, StickyNavBar } from "./parts";

/*
 * Mobile — AI Workflow (Light) (Figma 388:99259). Like the desktop document it
 * is a light page in both OS themes, so the subtree is pinned to Light Glass.
 * Command tokens (light values from the frame's variables) are inlined below.
 */
const C = {
  accent: "#3d6fe8",
  text: "#0a0a0a",
  secondary: "#4b4f58",
  muted: "#8a8f98",
  s1: "#ffffff",
  s2: "#f0f1f4",
  s3: "#e9ebf0",
  bg: "#f7f7f7",
  shadow: "rgba(26,31,54,0.08)",
};

const NODE: Record<Who, { color: string; tint: string; hard?: string }> = {
  AI: { color: "#6b4cff", tint: "rgba(107,76,255,0.12)", hard: "6px 6px 0 0 rgba(153,133,255,0.25)" },
  HUMAN: { color: "#1f8fd6", tint: "rgba(31,143,214,0.12)" },
  "HUMAN + AI": { color: "#e0457b", tint: "rgba(224,69,123,0.12)" },
};

const NP = { color: "#e5484d", tint: "rgba(229,72,77,0.12)" };
const GATE = "#f46c0b";
const M = "/figma/mobile/aiw";

/** "→" as a short SVG arrow (the font glyph renders as a long arrow, see HANDOFF "glance stat"). */
function Arrowed({ text }: { text: string }) {
  const parts = text.split("→");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i ? (
            <svg width="0.62em" height="0.62em" viewBox="0 0 10 10" aria-hidden className="mx-[0.12em] inline-block align-[-0.02em]">
              <path d="M0.6 5H8.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M5 1.7 8.6 5 5 8.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
          {part}
        </span>
      ))}
    </>
  );
}

const mono = "font-mono text-[18px] leading-[26px] tracking-[0.4px]";
const monoM = "font-mono text-[16px] leading-6 font-medium tracking-[0.2px]";
const small = "text-[14px] leading-5";
const h4 = "text-[20px] leading-7 font-semibold tracking-[-0.4px]";
const h3 = "text-[24px] leading-8 font-semibold tracking-[-0.7px]";

export function AiwPage({ onHome }: { onHome: () => void }) {
  const t = useT();
  const [active, setActive] = useState<SectionId>("overview");
  const toc = useRef<HTMLDivElement>(null);

  const sync = useCallback(() => {
    let current: SectionId = "overview";
    for (const item of TOC) {
      const el = document.getElementById(`m-aiw-${item.id}`);
      if (el && el.getBoundingClientRect().top <= 140) current = item.id;
    }
    setActive(current);
  }, []);
  const onScroll = useFrameThrottle(sync);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Keep the active chip visible in the horizontally scrolling TOC.
  useEffect(() => {
    const row = toc.current;
    const chip = row?.querySelector<HTMLElement>(`[data-toc="${active}"]`);
    if (!row || !chip) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left: Math.max(0, chip.offsetLeft - 16), behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const jump = (id: SectionId) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    const el = document.getElementById(`m-aiw-${id}`);
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 16 * mobileZoom(), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div data-theme="light" className="relative" style={{ color: C.text }}>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background: C.bg }} />
      <div className="m-page-body reveal-root relative" data-reveal-window>
        <StatusBar />
        <div className="m-col">
          <NavBar variant="large" title={t("AI Workflow")} back={{ label: t("Home"), onClick: onHome }} />
          <StickyNavBar title={t("AI Workflow")} back={{ label: t("Home"), onClick: onHome }} background={C.bg} threshold={96} />
          <div className="flex flex-col gap-14 px-4 pt-2" style={{ paddingBottom: "calc(74px + env(safe-area-inset-bottom) / var(--m-zoom, 1))" }}>
            {/* 483:37961 — On this page · Hero · At a glance */}
            <div className="flex flex-col gap-6">
              <div ref={toc} className="m-hscroll -mx-4 px-4">
                <nav aria-label={t("On this page")} className="flex w-max gap-2 pr-4">
                  {TOC.map((item) => {
                    const on = active === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-toc={item.id}
                        aria-current={on || undefined}
                        onClick={() => jump(item.id)}
                        className="flex h-11 shrink-0 items-center gap-3 rounded-full py-[9px] pr-4 pl-3 whitespace-nowrap transition-colors duration-300"
                        style={{ background: on ? C.s2 : "transparent" }}
                      >
                        <span className={mono} style={{ color: on ? C.accent : C.muted }}>
                          {item.index}
                        </span>
                        <span className={small} style={{ color: on ? C.text : C.secondary }}>
                          {t(item.label)}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <Hero />
              <div className="grid grid-cols-2 gap-2.5">
                {STATS.map(([key, value]) => (
                  <Reveal key={key}>
                    <div className="flex flex-col items-start gap-1.5 rounded-lg p-5 whitespace-nowrap" style={{ background: C.s2 }}>
                      <p className="font-mono text-[36px] leading-6 font-medium tracking-[0.2px]">
                        <Arrowed text={value} />
                      </p>
                      <p className={small} style={{ color: C.secondary }}>
                        <Arrowed text={t(key)} />
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* 388:99317 — 01 Overview */}
            <section className="flex flex-col gap-6">
              <Reveal>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={monoM} style={{ color: C.accent }}>
                      {t("01 — OVERVIEW")}
                    </p>
                    <h2 className="text-[32px] leading-[1.2] font-semibold tracking-[-1.4px]">{t("AI Workflow Overview")}</h2>
                  </div>
                  <div className={`${small} flex flex-col gap-3`} style={{ color: C.secondary }}>
                    <OverviewCopy />
                  </div>
                </div>
              </Reveal>
              <div className="flex flex-col gap-3">
                {PHASE_CARDS.map((card) => (
                  <Reveal key={card.title}>
                    <div className="flex items-start gap-[18px] rounded-[18px] p-5" style={{ background: C.s1, boxShadow: `0 16px 40px 0 ${C.shadow}` }}>
                      <img src={card.icon} alt="" className="size-[52px] shrink-0" />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <p className={h4}>{t(card.title)}</p>
                        <p className="text-[16px] leading-6 tracking-[-0.2px]" style={{ color: C.secondary }}>
                          {t(card.text)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 388:99339 — 02 Workflow map */}
            <section id="m-aiw-workflow-map" className="flex flex-col gap-9">
              <Reveal>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={mono} style={{ color: C.accent }}>
                      {t("02 — WORKFLOW MAP")}
                    </p>
                    <h2 className="text-[32px] leading-[1.2] font-semibold tracking-[-1.4px]">{t("From documents to handoff")}</h2>
                  </div>
                  <p className={small} style={{ color: C.secondary }}>
                    {t(MAP_BODY)}
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 rounded-lg px-4 py-3" style={{ background: C.s1 }}>
                  <span className={mono} style={{ color: C.secondary }}>
                    {t("LEGEND")}
                  </span>
                  <span className="h-1 w-3" />
                  {LEGEND.map((item) => (
                    <span key={item.label} className={`${small} flex items-center gap-2 rounded-full py-1.5 pr-3 pl-2.5`} style={{ background: C.s2, color: C.secondary }}>
                      {item.swatch === "dot" ? (
                        <span className="size-2.5 rounded-full" style={{ background: item.color }} />
                      ) : (
                        <span className="flex size-3 items-center justify-center">
                          <span className="size-[8.5px] rotate-45 rounded-[1.5px]" style={{ background: item.color }} />
                        </span>
                      )}
                      {t(item.label)}
                    </span>
                  ))}
                </div>
              </Reveal>
              <div className="flex flex-col items-center gap-3">
                <ArtifactCard title="INPUT" count="05" items={INPUTS} />
                <Connector />
                <Pipeline />
                <Connector />
                <ArtifactCard title="OUTPUT" count="06" items={OUTPUTS} />
              </div>
            </section>

            {/* 388:99504 — 03 Phase 1 */}
            <section id="m-aiw-phase-1" className="flex flex-col gap-12">
              <PhaseHead {...PHASE_HEADS["phase-1"]} />
              <Block kicker="OBJECT" title="Object" body={COPY.object1}>
                <Roles roles={ROLES_1} />
              </Block>
              <Block kicker="INPUT" title="Document Input" body={COPY.input1}>
                <InputMap map={INPUT_MAP_1} />
              </Block>
              <Block kicker="AI ROLE" title="What AI does" body={COPY.aiRole1}>
                <Capabilities items={CAPABILITIES_1} />
              </Block>
              <Block kicker="OUTPUT" title="Output" body={COPY.output1} gap={32}>
                <Reveal>
                  <ol className="flex flex-col rounded-2xl px-4 py-1.5" style={{ background: C.s1 }}>
                    {OUTPUT_LIST_1.map((row, i) => (
                      <li key={row}>
                        {i ? <span className="block h-px w-full" style={{ background: C.s3 }} /> : null}
                        <span className="flex items-center gap-3 py-3.5 leading-[normal]">
                          <span className="font-mono text-[14px]" style={{ color: C.muted }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 text-[16px]">{t(row)}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </Block>
            </section>

            {/* 388:99590 — 04 Phase 2 */}
            <section id="m-aiw-phase-2" className="flex flex-col gap-12">
              <PhaseHead {...PHASE_HEADS["phase-2"]} />
              <Block kicker="OBJECT" title="Object" body={COPY.object2}>
                <Roles roles={ROLES_2} />
              </Block>
              <Block kicker="INPUT" title="Design Input" body={COPY.input2}>
                <InputMap map={INPUT_MAP_2} />
              </Block>
              <Block kicker="AI ROLE" title="What AI does" body={COPY.aiRole2}>
                <Capabilities items={CAPABILITIES_2} />
              </Block>
              <Block kicker="OUTPUT" title="Output" body={COPY.output2}>
                <ItemList title="AI DESIGN DRAFT" count="05 ITEMS" items={OUTPUT_LIST_2} />
              </Block>
            </section>

            {/* 388:99661 — 05 Phase 3 */}
            <section id="m-aiw-phase-3" className="flex flex-col gap-12">
              <PhaseHead {...PHASE_HEADS["phase-3"]} />
              <Block kicker="REVIEW LOOP" title="Review & approval" body={COPY.review3} large>
                <Reveal>
                  <div className="flex flex-col gap-3.5 rounded-2xl p-5" style={{ background: C.s1 }}>
                    <StepNode step={STEPS[4]} surface={C.s2} np fullNp />
                    <GateNode surface={C.s1} />
                    <StepNode step={FINAL_STEP} surface={C.s2} last />
                  </div>
                </Reveal>
              </Block>
              <Block kicker="DELIVERY" title="Final output" body={COPY.final3} large>
                <ItemList title="HANDOFF PACKAGE" count="04 ITEMS" items={HANDOFF} monoCode />
              </Block>
            </section>

            {/* 388:99739 — Footer */}
            <Reveal>
              <footer className="flex flex-col items-center gap-5 border-t border-[#ddd] pt-20 pb-10 text-center">
                <span className="block h-px w-full" style={{ background: C.s2 }} />
                <p className="text-[40px] leading-[80px] font-semibold tracking-[-2.6px] whitespace-nowrap">{t("Thanks for watching")}</p>
                <div className="flex flex-col items-center gap-4">
                  <p className={`${mono} whitespace-nowrap`} style={{ color: C.muted }}>
                    © TUAN NGOC PORTFOLIO 2027
                  </p>
                  <button
                    type="button"
                    onClick={() => jump("overview")}
                    className="m-press relative flex items-center gap-1.5 rounded-lg px-3 py-[7px] text-[14px] leading-5 font-semibold before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-['']"
                    style={{ background: C.s2 }}
                  >
                    {t("Back to top")}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M3 8.5 L7 4.5 L11 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </footer>
            </Reveal>
          </div>
        </div>
      </div>
      <HomeIndicator onHome={onHome} />
    </div>
  );
}

/** Section — Hero (388:99282): blobs, dot grid, the tilted title pill and the lead. */
function Hero() {
  const t = useT();
  return (
    <section id="m-aiw-overview" className="relative h-[301px] overflow-hidden rounded-[32px]" style={{ background: C.s1 }}>
      <div aria-hidden className="absolute top-[57px] left-[180px] h-[385px] w-[404px]">
        <div className="absolute inset-[-20.78%_-19.8%]">
          <img src={`${M}/blob-warm.svg`} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div aria-hidden className="absolute top-[-288px] left-[-181px] h-[532px] w-[435px]">
        <div className="absolute inset-[-51.5%_-62.99%]">
          <img src={`${M}/blob-cool.svg`} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(ellipse 0.8px 0.61px at 0.8px 0.61px, rgba(91,107,154,0.3) 99%, transparent 100%)",
          backgroundSize: "13.5219px 10.3372px",
        }}
      />
      <div className="absolute top-[57px] left-5 flex h-[62.589px] w-[319.686px] items-center justify-center">
        <div className="-rotate-2">
          <div className="flex items-center gap-[12.014px] rounded-[10.137px] bg-[#a100ff] py-[8.26px] pr-[10.512px] pl-[16.519px]">
            <p className="text-[28.533px] leading-[34.54px] font-bold tracking-[-0.901px] whitespace-nowrap text-white">UI/UX AI Workflow</p>
            <span className="relative flex size-[27.031px] shrink-0 items-center justify-center overflow-hidden rounded-[4.505px] bg-white p-[3px]">
              <img src={`${M}/pill-texture.png`} alt="" className="absolute inset-0 size-full object-cover opacity-65" />
              <img src={`${M}/sparkle.svg`} alt="" className="relative size-[16.766px]" />
            </span>
          </div>
        </div>
      </div>
      <p className="absolute top-[143.62px] left-1/2 w-[318px] -translate-x-1/2 text-center text-[14px] leading-5 font-semibold tracking-[-0.2px]" style={{ color: C.secondary }}>
        {t(LEAD)}
      </p>
    </section>
  );
}

function Connector() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden className="reveal reveal-fade flex w-12 justify-center">
      <img src={`${M}/arrow-down.svg`} alt="" className="h-[40px] w-[73px] max-w-none rotate-90" style={{ margin: "16.5px 0" }} />
    </div>
  );
}

function Tile({ icon }: { icon: string }) {
  return (
    <span className="relative size-7 shrink-0 overflow-hidden rounded-[6px]" style={{ background: C.s3 }}>
      <img src={icon} alt="" className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2" />
    </span>
  );
}

/** Inputs (388:99362) / Outputs (388:99493): AIW/Artifact Row list. */
function ArtifactCard({ title, count, items }: { title: string; count: string; items: [string, string, string][] }) {
  const t = useT();
  return (
    <Reveal className="w-full">
      <div className="flex flex-col gap-3 rounded-lg px-3.5 pt-4 pb-3.5" style={{ background: C.s1 }}>
        <div className={`${mono} flex items-start justify-between px-0.5 pb-1.5`}>
          <span style={{ color: C.muted }}>{t(title)}</span>
          <span style={{ color: C.accent }}>{count}</span>
        </div>
        <ul className="flex flex-col gap-2">
          {items.map(([name, code, icon]) => (
            <li key={name} className="flex items-center gap-3 rounded-lg py-2.5 pr-3 pl-2.5" style={{ background: C.s2 }}>
              <Tile icon={icon} />
              <span className="min-w-0 flex-1 text-[16px] leading-6 tracking-[-0.2px]">{t(name)}</span>
              <span className={monoM} style={{ color: C.muted }}>
                {code}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** Rows with a 14px code (Phase 2 "AI DESIGN DRAFT" 388:99652, Phase 3 handoff package). */
function ItemList({ title, count, items, monoCode = false }: { title: string; count: string; items: readonly (readonly [string, string, string])[]; monoCode?: boolean }) {
  const t = useT();
  return (
    <Reveal>
      <div className="flex flex-col gap-2.5 rounded-lg p-4" style={{ background: C.s1 }}>
        <div className={`${mono} flex items-start justify-between px-0.5 pb-1 whitespace-nowrap`}>
          <span style={{ color: C.muted }}>{t(title)}</span>
          <span style={{ color: C.accent }}>{t(count)}</span>
        </div>
        {items.map(([name, code, icon]) => (
          <div key={name} className="flex items-center gap-3 rounded-lg py-2.5 pr-3 pl-2.5" style={{ background: C.s2 }}>
            <Tile icon={icon} />
            <span className="min-w-0 flex-1 text-[16px] leading-6 tracking-[-0.2px]">{t(name)}</span>
            <span className={monoCode ? monoM : small} style={{ color: C.muted }}>
              {code}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Dot({ who }: { who: Who }) {
  return (
    <span className="relative flex size-4 shrink-0 items-center justify-center rounded-full" style={{ background: NODE[who].color }}>
      <span className="size-1.5 rounded-full" style={{ background: C.bg }} />
    </span>
  );
}

function TypeTag({ who, large = false }: { who: Who; large?: boolean }) {
  const t = useT();
  return (
    <span className={`rounded-full px-2 py-[3px] whitespace-nowrap ${large ? mono : monoM}`} style={{ color: NODE[who].color, background: NODE[who].tint }}>
      {t(who)}
    </span>
  );
}

function NpLoop({ full = false }: { full?: boolean }) {
  const t = useT();
  return (
    <span className={`flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-2 ${full ? "w-full" : ""}`} style={{ background: NP.tint }}>
      <img src={`${M}/np-loop.svg`} alt="" className="size-3 shrink-0" />
      <span className={`${mono} min-w-0 ${full ? "" : "whitespace-nowrap"}`} style={{ color: NP.color }}>
        {t("NP · revise in STEP 04")}
      </span>
    </span>
  );
}

/** AIW/Workflow Node: rail (dot + line) and the step card. */
function StepNode({
  step,
  surface,
  last = false,
  np = false,
  fullNp = false,
  hard = false,
}: {
  step: { id: string; who: Who; title: string; body: string };
  surface: string;
  last?: boolean;
  np?: boolean;
  fullNp?: boolean;
  hard?: boolean;
}) {
  const t = useT();
  return (
    <article className="flex w-full items-stretch gap-4">
      <div className="flex w-6 shrink-0 flex-col items-center gap-1.5 pt-[22px]">
        <Dot who={step.who} />
        {last ? null : <span className="min-h-px w-0.5 flex-1" style={{ background: C.s3 }} />}
      </div>
      <div
        className="flex min-w-0 flex-1 flex-col items-start gap-2 rounded-2xl px-5 py-[18px]"
        style={{ background: surface, boxShadow: hard ? NODE[step.who].hard : undefined }}
      >
        <div className="flex items-center gap-2.5">
          <span className={`${monoM} whitespace-nowrap`} style={{ color: C.muted }}>
            {t("STEP {n}", { n: step.id })}
          </span>
          <TypeTag who={step.who} />
        </div>
        <h3 className={h4}>{t(step.title)}</h3>
        <p className={small} style={{ color: C.secondary }}>
          {t(step.body)}
        </p>
        {np ? <NpLoop full={fullNp} /> : null}
      </div>
    </article>
  );
}

/** AIW/Gate Node: diamond rail and the yellow UI Approval card. */
function GateNode({ surface }: { surface: string }) {
  const t = useT();
  return (
    <article className="flex w-full items-stretch gap-4">
      <div className="flex w-6 shrink-0 flex-col items-center gap-1.5 pt-[26px]">
        <img src={`${M}/diamond.svg`} alt="" className="size-5" />
        <span className="min-h-px w-0.5 flex-1" style={{ background: C.s3 }} />
      </div>
      <div
        className="flex min-w-0 flex-1 flex-col items-start gap-2.5 rounded-2xl border border-[#ffc857] px-5 py-[18px]"
        style={{
          backgroundImage: `linear-gradient(rgba(214,180,0,0.14), rgba(214,180,0,0.14)), linear-gradient(${surface}, ${surface})`,
          boxShadow: "6px 6px 0 0 rgba(214,202,111,0.3)",
        }}
      >
        <p className={mono} style={{ color: GATE }}>
          {t("GATE")}
        </p>
        <p className={`${h4} whitespace-nowrap`}>{t("UI Approval")}</p>
        <div className="flex w-full flex-wrap gap-2">
          <span className={`${mono} rounded-full px-2.5 py-1 whitespace-nowrap`} style={{ background: C.s2, color: C.secondary }}>
            <Arrowed text={t("PASS → STEP 06")} />
          </span>
          <span className={`${mono} rounded-full px-2.5 py-1 whitespace-nowrap`} style={{ background: NP.tint, color: NP.color }}>
            <Arrowed text={t("NP → BACK TO STEP 05")} />
          </span>
        </div>
      </div>
    </article>
  );
}

/** Pipeline (388:99376): six steps and the gate, each entering on scroll. */
function Pipeline() {
  const t = useT();
  const rows: ReactNode[] = [
    ...STEPS.map((step) => <StepNode key={step.id} step={step} surface={C.s1} np={step.id === "05"} hard={step.who === "AI"} />),
    <GateNode key="gate" surface={C.s1} />,
    <StepNode key="06" step={FINAL_STEP} surface={C.s1} last />,
  ];
  return (
    <div className="flex w-full flex-col">
      <Reveal>
        <p className={`${mono} flex gap-2 pb-3.5 pl-10 whitespace-nowrap`} style={{ color: C.muted }}>
          <span>{t("WORKFLOW")}</span>
          <span>{t("· 6 STEPS · 1 GATE")}</span>
        </p>
      </Reveal>
      <div className="flex flex-col gap-3.5">
        {rows.map((row, i) => (
          <Reveal key={i}>{row}</Reveal>
        ))}
      </div>
    </div>
  );
}

/** Phase Head (388:99505). */
function PhaseHead({ index, title, subtitle, people }: { index: string; title: string; subtitle: string; people: [string, string][] }) {
  const t = useT();
  return (
    <Reveal>
      <header className="flex flex-col gap-4 rounded-3xl px-5 py-6" style={{ background: C.s1 }}>
        <div className="flex flex-col justify-center gap-2.5">
          <p className={mono} style={{ color: C.accent }}>
            {t(index)}
          </p>
          <div className="flex flex-wrap gap-x-1.5 gap-y-2">
            {people.map(([label, color]) => (
              <span key={label} className={`${small} flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-2`} style={{ background: C.s2, color: C.secondary }}>
                <span className="size-2 rounded-full" style={{ background: color }} />
                {t(label)}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] leading-[1.4] font-semibold tracking-[-2.6px]">{t(title)}</h2>
          <p className="text-[16px] leading-6 tracking-[-0.2px]" style={{ color: C.secondary }}>
            {t(subtitle)}
          </p>
        </div>
      </header>
    </Reveal>
  );
}

/** Story block: kicker, title, body, then the visual (24px apart). */
function Block({
  kicker,
  title,
  body,
  children,
  gap = 24,
  large = false,
}: {
  kicker: string;
  title: string;
  body: string | string[];
  children: ReactNode;
  gap?: number;
  /** Phase 3 copy is Cmd/Body (16/24) in Figma. */
  large?: boolean;
}) {
  const t = useT();
  return (
    <div className="flex flex-col" style={{ gap }}>
      <Reveal>
        <div className="flex flex-col gap-3.5">
          <p className={mono} style={{ color: C.muted }}>
            {t(kicker)}
          </p>
          <h3 className={h3}>{t(title)}</h3>
          {(Array.isArray(body) ? body : [body]).map((p) => (
            <p key={p} className={large ? "text-[16px] leading-6 tracking-[-0.2px]" : small} style={{ color: C.secondary }}>
              {t(p)}
            </p>
          ))}
        </div>
      </Reveal>
      {children}
    </div>
  );
}

/** AIW/Role Card (94:3325), stacked; the AI card carries the violet offset shadow. */
function Roles({ roles }: { roles: Role[] }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-4">
      {roles.map((role) => (
        <Reveal key={role.title}>
          <article
            className="flex flex-col items-start gap-3.5 rounded-2xl p-6"
            style={{
              background: C.s1,
              boxShadow: role.accent ? "6px 6px 0 0 rgba(153,133,255,0.3)" : "0 6px 7px rgba(3,10,31,0.05)",
            }}
          >
            <div className="flex w-full items-center justify-between">
              <img src={ROLE_ICON[role.glyph]} alt="" className="size-10 shrink-0" />
              <TypeTag who={role.who} large />
            </div>
            <h4 className={`${h3} whitespace-nowrap`} style={role.title === "BA / PO" ? { color: "#168eff" } : undefined}>
              {t(role.title)}
            </h4>
            <p className={small} style={{ color: C.secondary }}>
              {t(role.body)}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** Input list (388:99537): core input, then grouped context chips. */
function InputMap({ map }: { map: { core: string; groups: { label: string; items: string[] }[] } }) {
  const t = useT();
  const label = "font-mono text-[14px] leading-[normal] whitespace-nowrap";
  return (
    <Reveal>
      <div className="flex flex-col items-start gap-2.5 rounded-2xl p-4" style={{ background: C.s1 }}>
        <p className={label} style={{ color: C.muted }}>
          {t("INPUT MAP")}
        </p>
        <div className="flex w-full flex-col items-start gap-0.5 rounded-xl px-3.5 py-3 leading-[normal] whitespace-nowrap" style={{ background: C.s3 }}>
          <p className="font-mono text-[14px]" style={{ color: C.accent }}>
            {t("CORE INPUT")}
          </p>
          <p className="text-[18px] font-semibold">{t(map.core)}</p>
        </div>
        {map.groups.map((group) => (
          <div key={group.label} className="flex w-full flex-col items-start gap-2.5">
            <p className={label} style={{ color: C.muted }}>
              {t(group.label)}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-[10px] px-3 py-2 text-[15px] leading-[normal] whitespace-nowrap" style={{ background: C.s2 }}>
                  {t(item)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** AIW/Capability Tile (94:3304) in a two-column grid; tiles in a row share a height. */
function Capabilities({ items }: { items: Capability[] }) {
  const t = useT();
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((cap) => (
        <CapabilityTile key={cap.n} cap={cap} label={t(cap.title)} />
      ))}
    </div>
  );
}

function CapabilityTile({ cap, label }: { cap: Capability; label: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <article className="flex h-full min-h-[160px] flex-col items-start gap-6 rounded-lg p-5" style={{ background: C.s1 } as CSSProperties}>
        <div className="flex w-full items-center justify-between">
          <span className="relative size-10 shrink-0 overflow-hidden">
            <img src={cap.icon} alt="" className={cap.crop ?? "absolute inset-0 size-full max-w-none object-cover"} />
          </span>
          <span className={mono} style={{ color: C.muted }}>
            {cap.n}
          </span>
        </div>
        <p className={h4}>{label}</p>
      </article>
    </div>
  );
}
