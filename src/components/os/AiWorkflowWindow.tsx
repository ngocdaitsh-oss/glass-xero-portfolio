/* eslint-disable @next/next/no-img-element -- Figma exports keep their own width and height. */
"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { scrollToChild, useFrameThrottle } from "@/lib/scroll";
import { useStickyCopy } from "@/lib/sticky";
import { WindowControls } from "./AppWindow";
import { Reveal, useReveal } from "./reveal";
import { OverviewCopy } from "./aiw-copy";
import { useFitZoom, useTitleBarDrag, WindowShell } from "./window-manager";
import { useT } from "@/lib/i18n";
import {
  CAPABILITIES_1,
  CAPABILITIES_2,
  COPY,
  FINAL_STEP,
  HANDOFF,
  INPUTS,
  LEAD,
  LEGEND,
  MAP_BODY,
  OUTPUTS,
  PHASE_CARDS,
  PHASE_HEADS,
  ROLE_ICON,
  ROLES_1,
  ROLES_2,
  STATS,
  STEPS,
  TOC,
  type SectionId,
} from "@/lib/aiw";

function FiveToSix() {
  return (
    <span className="inline-flex items-center gap-3">
      5
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="shrink-0">
        <path d="M0.6 5H6.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M4.4 1.7 8.8 5 4.4 8.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      6
    </span>
  );
}

export function AiWorkflowWindow({ onNext }: { onNext?: () => void }) {
  const t = useT();
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionId>("overview");
  const drag = useTitleBarDrag();
  // The document always spans the area right of the sidebar (88px side gutters in design units), scaling up on wide screens instead of centering.
  const zoom = useFitZoom(scroller, 1608, true, 1.2);

  const syncActive = useCallback(() => {
    const root = scroller.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top;
    let current: SectionId = "overview";
    for (const item of TOC) {
      const el = root.querySelector<HTMLElement>(`#${item.id}`);
      if (!el) continue;
      if (el.getBoundingClientRect().top - rootTop <= 120) current = item.id;
    }
    setActive(current);
  }, []);

  const onScroll = useFrameThrottle(syncActive);

  const scrollTo = useCallback((id: SectionId) => {
    const root = scroller.current;
    if (!root) return;
    if (id === "overview") root.scrollTo({ top: 0, behavior: "smooth" });
    else scrollToChild(root, root.querySelector<HTMLElement>(`#${id}`));
    setActive(id);
  }, []);

  return (
    <WindowShell
      label="UI/UX AI Workflow"
      className="rounded-[20px] bg-[#fafafa] text-[#0a0a0a] shadow-[0_24px_80px_rgba(10,33,71,0.22)] select-text"
    >
      <header
        {...drag}
        className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#eceef2] bg-white pr-2.5 pl-4 select-none"
      >
        <div className="flex w-[120px] items-center">
          <img src="/figma/aiw/app-icon.svg" alt="" />
        </div>
        <h1 className="truncate text-[20px] leading-7 font-semibold tracking-[-0.4px]">UI/UX AI Workflow</h1>
        <div className="flex w-[120px] items-center justify-end">
          <WindowControls buttonClassName="h-8 w-8 text-[#8a8f98] hover:bg-[#f2f3f5]" />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="os-scroll os-scroll-ink flex w-[264px] shrink-0 flex-col overflow-y-auto border-r border-[#eceef2] bg-white px-5 py-8">
          <p className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#8a8f98]">{t("ON THIS PAGE")}</p>
          <nav aria-label={t("On this page")} className="mt-4 flex flex-col gap-1">
            {TOC.map((item) => {
              const on = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  aria-current={on ? "true" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-[9px] text-left transition-colors duration-200 ${
                    on ? "bg-[#f2f3f5]" : "hover:bg-[#f7f8fa]"
                  }`}
                >
                  <span
                    className={`shrink-0 self-center font-mono text-[16px] leading-6 font-medium tracking-[0.2px] transition-colors duration-200 ${
                      on ? "text-[#3d6fe8]" : "text-[#8a8f98]"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className={`min-w-0 flex-1 text-[16px] leading-6 tracking-[-0.2px] transition-colors duration-200 ${on ? "text-[#0a0a0a]" : "text-[#4b4f58]"}`}>
                    {t(item.label)}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 shrink-0 rounded-lg bg-[#f2f3f5] p-4">
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap text-[#8a8f98]">{t("AT A GLANCE")}</p>
            <dl className="mt-3.5 flex flex-col gap-3.5">
              {STATS.map(([key, value]) => (
                <div key={key} className="flex items-start justify-between gap-3 whitespace-nowrap">
                  <dt className="text-[16px] leading-6 tracking-[-0.2px] text-[#4b4f58]">{t(key)}</dt>
                  <dd className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px]">
                    {value === "5 → 6" ? <FiveToSix /> : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div
          ref={scroller}
          data-aiw-scroll
          onScroll={onScroll}
          className="os-scroll os-scroll-ink reveal-root min-w-0 flex-1 overflow-y-auto bg-[#fafafa]"
          style={{ overflowX: "clip" }}
        >
          <div
            data-reveal-zoom
            className="relative mx-auto w-[1608px] bg-[#fafafa] px-[88px] pt-[72px] pb-[120px]"
            style={{ zoom }}
          >
            <Reveal><Hero /></Reveal>
            <Overview />
            <WorkflowMap />
            <PhaseOne />
            <PhaseTwo />
            <PhaseThree />
            <Reveal><Footer onTop={() => scrollTo("overview")} /></Reveal>
          </div>
        </div>
        <div className="pointer-events-none absolute right-4 bottom-5 z-30 flex flex-col items-end gap-3">
          <button
            type="button"
            aria-label={t("Back to top")}
            onClick={() => scrollTo("overview")}
            className="hover-lift pointer-events-auto flex size-[52px] items-center justify-center rounded-full bg-white shadow-[0_12px_16px_rgba(0,0,0,0.16)] hover:bg-[#f7f8fa]"
          >
            <img src="/figma/aiw/chevron-down.svg" alt="" className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="group/next hover-lift pointer-events-auto flex items-center gap-3.5 rounded-[22px] bg-white py-2.5 pr-[18px] pl-2.5 shadow-[0_12px_16px_rgba(0,0,0,0.16)] hover:bg-[#f7f8fa]"
          >
            <img src="/figma/aiw/project-layers.svg" alt="" className="size-10" />
            <span className="text-left">
              <span className="block text-[14px] leading-5 text-[#8a8f98]">{t("Next app")}</span>
              <span className="block text-[16px] leading-6 font-semibold tracking-[-0.2px]">{t("My Project")}</span>
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-[#f2f3f5] transition-colors duration-200 group-hover/next:bg-[#e3e7f5]">
              <img src="/figma/aiw/external.svg" alt="" className="size-5" />
            </span>
          </button>
        </div>
      </div>
    </WindowShell>
  );
}

function Hero() {
  const t = useT();
  const [art, setArt] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setArt(true), 0);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <section id="overview" className="relative h-[620px] scroll-mt-6 overflow-hidden rounded-[32px] bg-white">
      {art ? (
      <>
      <div className="absolute top-[-560px] left-[-271px] h-[1060px] w-[1057px]">
        <div className="absolute inset-[-25.85%_-25.92%]">
          <img src="/figma/aiw/blob-cool.svg" alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute top-[260px] left-[889px] h-[760px] w-[793px]">
        <div className="absolute inset-[-10.53%_-10.09%]">
          <img src="/figma/aiw/blob-warm.svg" alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <img src="/figma/aiw/dot-grid.svg" alt="" className="pointer-events-none absolute inset-x-0 -bottom-[3%] h-[104%] w-full object-fill" />
      </>
      ) : null}

      <LogoBubble src="/figma/aiw/logo-figma.png" className="top-[75px] left-[132px]" />
      <LogoBubble src="/figma/aiw/logo-claude.png" className="top-[92px] left-[1266px]" />
      <LogoBubble src="/figma/aiw/logo-terminal.png" className="top-[344px] left-[64px]" />
      <LogoBubble src="/figma/aiw/logo-jira.png" className="top-[478px] left-[301px]" />
      <LogoBubble src="/figma/aiw/logo-openai.png" className="top-[464px] left-[992px]" />
      <LogoBubble src="/figma/aiw/logo-antigravity.png" className="top-[412px] left-[1242px]" />

      <div className="absolute top-[130px] left-1/2 flex w-[860px] -translate-x-1/2 -rotate-2 justify-center">
        <div className="flex items-center gap-8 rounded-[27px] bg-[#9b3bff] py-[22px] pr-7 pl-11 shadow-[0_18px_40px_rgba(155,59,255,0.28)]">
          <p className="text-[76px] leading-[92px] font-bold tracking-[-2.4px] whitespace-nowrap text-white">
            UI/UX AI Workflow
          </p>
          <div className="relative flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white">
            <img src="/figma/aiw/pill-texture.png" alt="" className="absolute inset-0 size-full object-cover opacity-65" />
            <img src="/figma/aiw/sparkle.svg" alt="" className="relative" />
          </div>
        </div>
      </div>
      <p className="absolute top-[328px] left-1/2 w-[767px] -translate-x-1/2 text-center text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[#4b4f58]">
        {t(LEAD)}
      </p>
    </section>
  );
}

function LogoBubble({ src, className }: { src: string; className: string }) {
  return (
    <div
      className={`aiw-hover absolute flex size-[88px] items-center justify-center rounded-full shadow-[0_6px_12px_rgba(226,226,226,0.86)] ${className}`}
      style={{
        backgroundImage: "linear-gradient(224deg, rgba(241,245,250,0.72) 14%, rgba(255,255,255,0.92) 61%)",
      }}
    >
      <img src={src} alt="" className="size-12 object-contain" />
    </div>
  );
}

function Overview() {
  const t = useT();
  return (
    <Reveal enter={210} className="mt-[100px]">
    <section aria-labelledby="overview-heading" className="grid min-h-[800px] grid-cols-[520px_1fr] items-center gap-10">
      <div>
        <p className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#3d6fe8]">{t("01 — OVERVIEW")}</p>
        <h2 id="overview-heading" className="mt-3 text-[44px] leading-[52px] font-semibold tracking-[-1.4px]">
          {t("AI Workflow Overview")}
        </h2>
        <div className="mt-8 space-y-6 text-[16px] leading-6 tracking-[-0.2px] text-[#4b4f58]">
          <OverviewCopy />
        </div>
      </div>
      <Orbit />
    </section>
    </Reveal>
  );
}

function Orbit() {
  return (
    <div className="relative h-[800px]">
      <div className="absolute top-[180px] left-[250px] size-[440px]">
        <img src="/figma/aiw/orbit-glow.svg" alt="" className="absolute inset-[-40.91%] block size-[181.82%] max-w-none" />
      </div>
      <img src="/figma/aiw/ring-outer.svg" alt="" className="absolute top-[60px] left-[130px] size-[680px] max-w-none" />
      <img src="/figma/aiw/ring-dashed.svg" alt="" className="aiw-orbit-dashed absolute top-[156px] left-[226px] size-[488px] max-w-none" />

      <div className="aiw-orbit-dots pointer-events-none absolute inset-0">
        <span className="absolute top-[308px] left-[232px] size-[18px] rounded-full bg-[#f05252]" />
        <span className="absolute top-[184px] left-[590px] size-[18px] rounded-full bg-[#3d6fe8]" />
        <span className="absolute top-[617px] left-[552px] size-[18px] rounded-full bg-[#22a06b]" />
      </div>

      <div className="aiw-orbit-badges absolute inset-0">
        <Badge src="/figma/aiw/logo-figma.png" className="top-[47px] left-[305px]" />
        <Badge src="/figma/aiw/logo-claude.png" className="top-[362px] left-[772px]" />
        <Badge src="/figma/aiw/logo-terminal.png" className="top-[668px] left-[283px]" />
      </div>

      {PHASE_CARDS.map((card, i) => (
        <PhaseCard
          key={card.title}
          className={["top-[150px] left-[28px]", "top-[333px] left-[248px]", "top-[516px] left-[68px]"][i]}
          icon={<img src={card.icon} alt="" className="size-[52px] shrink-0" />}
          title={card.title}
          text={card.text}
        />
      ))}
    </div>
  );
}

function Badge({ src, className }: { src: string; className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="aiw-orbit-badge-upright">
        <div className="aiw-hover flex size-[76px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
          <img src={src} alt="" className="size-10 object-contain" />
        </div>
      </div>
    </div>
  );
}

function PhaseCard({
  className,
  icon,
  title,
  text,
}: {
  className: string;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  const t = useT();
  return (
    <div className={`aiw-hover absolute flex items-start gap-[18px] rounded-[18px] bg-white py-[22px] pr-8 pl-6 whitespace-nowrap shadow-[0_16px_40px_rgba(16,24,40,0.08)] ${className}`}>
      {icon}
      <div className="flex flex-col gap-2">
        <p className="text-[24px] leading-8 font-semibold tracking-[-0.6px]">{t(title)}</p>
        <p className="text-[16px] leading-6 tracking-[-0.2px] text-[#4b4f58]">{t(text)}</p>
      </div>
    </div>
  );
}

function WorkflowMap() {
  const t = useT();
  return (
    <section id="workflow-map" className="relative mt-16 scroll-mt-6">
      <img
        src="/figma/aiw/map-bg.png"
        alt=""
        className="pointer-events-none absolute -top-14 -right-[88px] z-0 w-[1280px] max-w-none select-none"
      />
      <div className="relative z-[1]">
      <Reveal>
      <div>
      <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#3d6fe8]">{t("02 — WORKFLOW MAP")}</p>
      <h2 className="mt-3 text-[44px] leading-[52px] font-semibold tracking-[-1.4px]">{t("From documents to handoff")}</h2>
      <p className="mt-8 w-[455px] text-[16px] leading-6 tracking-[-0.2px] text-[#4b4f58]">
        {t(MAP_BODY)}
      </p>
      </div>
      </Reveal>

      <Reveal>
      <div className="aiw-hover mt-9 flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-3">
        <span className="mr-3 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#4b4f58]">{t("LEGEND")}</span>
        {LEGEND.map((item) => (
          <Legend key={item.label} swatch={item.swatch} color={item.color} label={item.label} />
        ))}
      </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-[minmax(220px,296px)_40px_minmax(0,1fr)_48px_minmax(220px,296px)] items-start">
        <ArtifactColumn
          title="INPUT"
          count="05"
          strong
          items={INPUTS}
        />
        <Reveal>
        <div className="flex h-[50px] items-center justify-center text-[#7c3aed]">
          <Arrow />
        </div>
        </Reveal>
        <Pipeline />
        <Reveal>
        <div className="flex h-[74px] items-end justify-center pb-1 text-[#7c3aed]">
          <Arrow />
        </div>
        </Reveal>
        <ArtifactColumn
          title="OUTPUT"
          count="06"
          items={OUTPUTS}
        />
      </div>
      </div>
    </section>
  );
}

function Legend({ swatch, color, label }: { swatch: "dot" | "diamond"; color: string; label: string }) {
  const t = useT();
  return (
    <span className="flex items-center gap-2 rounded-full bg-[#f0f1f4] py-1.5 pr-3 pl-2.5 text-[14px] leading-5 text-[#4b4f58]">
      {swatch === "dot" ? (
        <span className="size-2.5 rounded-full" style={{ background: color }} />
      ) : (
        <span className="size-[9px] rotate-45 rounded-[2px]" style={{ background: color }} />
      )}
      {t(label)}
    </span>
  );
}

function ArtifactColumn({
  title,
  count,
  items,
  strong = false,
}: {
  title: string;
  count: string;
  items: [string, string, string][];
  strong?: boolean;
}) {
  const t = useT();
  return (
    <div className="aiw-hover flex flex-col gap-2 rounded-2xl bg-white px-3.5 pt-4 pb-3.5">
      <div className="flex items-start justify-between px-0.5 pb-1.5">
        <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#8a8f98]">{t(title)}</p>
        <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#3d6fe8]">{count}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map(([name, code, icon]) => (
          <ArtifactRow key={name} name={name} code={code} icon={icon} strong={strong} />
        ))}
      </ul>
    </div>
  );
}

function ArtifactRow({ name, code, icon, strong = false }: { name: string; code: string; icon: string; strong?: boolean }) {
  const t = useT();
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="reveal">
      <div className="aiw-row flex items-center gap-3 rounded-lg bg-[#f0f1f4] py-2.5 pr-3 pl-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#e9ebf0]">
          <img src={icon} alt="" className="size-5" />
        </span>
        <span className={`flex-1 text-[16px] leading-6 tracking-[-0.2px] ${strong ? "font-medium" : ""}`}>{t(name)}</span>
        <span className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#8a8f98]">{code}</span>
      </div>
    </li>
  );
}

const HARD_SHADOW: Record<string, string> = {
  AI: "6px 6px 0 0 rgba(153,133,255,0.25)",
  HUMAN: "6px 6px 0 0 rgba(61,111,232,0.22)",
  "HUMAN + AI": "6px 6px 0 0 rgba(232,90,173,0.22)",
  GATE: "6px 6px 0 0 rgba(255,141,40,0.28)",
};

function Pipeline() {
  const t = useT();
  const stack = useRef<HTMLDivElement>(null);
  const arrowRef = useReveal<HTMLImageElement>();
  const [arrowTop, setArrowTop] = useState(504);
  useLayoutEffect(() => {
    const root = stack.current;
    const step = root?.querySelector<HTMLElement>('[data-step="04"]');
    const gate = root?.querySelector<HTMLElement>('[data-step="gate"]');
    if (!root || !step || !gate) return;
    const top = step.offsetTop + 32;
    const bottom = gate.offsetTop + gate.offsetHeight - 28;
    setArrowTop(top);
    const img = root.querySelector<HTMLImageElement>("[data-loop-arrow]");
    if (img) img.style.height = `${Math.max(280, bottom - top)}px`;
  }, []);
  const rows: { id: string; who: string; title: string; body: string; gate?: boolean }[] = [
    ...STEPS,
    {
      id: "gate",
      who: "GATE",
      title: "UI Approval",
      body: "",
      gate: true,
    },
    FINAL_STEP,
  ];
  return (
    <div className="relative">
      <Reveal>
      <div className="flex items-center gap-2 pb-3.5 pl-10 font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap text-[#8a8f98]">
        <p>{t("WORKFLOW")}</p>
        <p>{t("· 6 STEPS · 1 GATE")}</p>
      </div>
      </Reveal>
      <div ref={stack} className="relative flex flex-col gap-3.5">
        {rows.map((step, index) => (
          <StepCard key={step.id} step={step} last={index === rows.length - 1} />
        ))}
        <img
          ref={arrowRef}
          src="/figma/aiw/loop-arrow.svg"
          alt=""
          data-loop-arrow
          className="reveal reveal-fade pointer-events-none absolute right-[89px] z-20 w-[133px] max-w-none object-fill"
          style={{ top: arrowTop }}
        />
      </div>
    </div>
  );
}

const NODE = {
  AI: { color: "#6b4cff", tint: "rgba(107,76,255,0.12)" },
  HUMAN: { color: "#1f8fd6", tint: "rgba(31,143,214,0.12)" },
  "HUMAN + AI": { color: "#e0457b", tint: "rgba(224,69,123,0.12)" },
} as const;

function TypeTag({ who, large = false }: { who: keyof typeof NODE; large?: boolean }) {
  const t = useT();
  return (
    <span
      className={`rounded-full px-2 py-[3px] font-mono ${large ? "text-[18px] leading-[26px] tracking-[0.4px]" : "text-[16px] leading-6 font-medium tracking-[0.2px]"}`}
      style={{ color: NODE[who].color, background: NODE[who].tint }}
    >
      {t(who)}
    </span>
  );
}

function GatePills({ fail }: { fail: string }) {
  const t = useT();
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-[#f0f1f4] px-2.5 py-1 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#4b4f58]">
        {t("PASS → STEP 06")}
      </span>
      <span className="rounded-full bg-[rgba(229,72,77,0.12)] py-1 pr-4 pl-2.5 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#e5484d]">
        {t(fail)}
      </span>
    </div>
  );
}

function StepCard({
  step,
  last,
}: {
  step: { id: string; who: string; title: string; body: string; gate?: boolean };
  last?: boolean;
}) {
  const t = useT();
  const ref = useReveal<HTMLElement>();
  const dot = step.who === "AI" ? "#9985ff" : step.who === "HUMAN" ? "#3d6fe8" : step.gate ? "#ff8d28" : "#e85aad";
  return (
    <article ref={ref} data-step={step.id} className="reveal flex items-stretch gap-4">
      <div className={`flex w-6 shrink-0 flex-col items-center ${step.gate ? "pt-[26px]" : "pt-[22px]"}`}>
        <span
          className={`relative z-10 shrink-0 ${step.gate ? "size-[15px] rotate-45 rounded-[2px]" : "size-4 rounded-full"}`}
          style={{ background: dot }}
        />
        {!last ? <span className="mt-1.5 w-0.5 flex-1 bg-[#e9ebf0]" style={{ marginBottom: -36 }} /> : null}
      </div>
      <div
        className={`aiw-hard flex min-w-0 flex-1 flex-col rounded-2xl px-5 py-[18px] ${
          step.gate ? "gap-2.5 border border-[#ffc857] bg-[#fbf9ef]" : "gap-2 bg-white"
        }`}
        style={{ "--hard": (HARD_SHADOW[step.who] ?? HARD_SHADOW.AI).replace("6px 6px 0 0 ", "") } as CSSProperties}
      >
        {step.gate ? (
          <>
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#f46c0b]">{t("GATE")}</p>
            <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t("UI Approval")}</p>
            <GatePills fail="IF NoPass → BACK TO STEP 04" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#8a8f98]">{t("STEP {n}", { n: step.id })}</span>
              <TypeTag who={step.who as keyof typeof NODE} />
            </div>
            <h3 className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t(step.title)}</h3>
            <p className="text-[14px] leading-5 text-[#4b4f58]">{t(step.body)}</p>
          </>
        )}
      </div>
    </article>
  );
}

function StickyStory({ steps }: { steps: { kicker: string; title: string; body: ReactNode; visual: ReactNode }[] }) {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);

  useStickyCopy(root, "[data-aiw-scroll]", 16, [steps.length]);

  return (
    <div ref={root} className="mt-[100px] flex flex-col gap-[100px]">
      {steps.map((step) => (
        <Reveal key={step.kicker} className="min-w-0">
        <article
          data-story
          className="grid grid-cols-[400px_minmax(0,1fr)] items-start gap-16"
        >
          <div data-copy className="flex flex-col gap-3.5">
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#8a8f98]">{t(step.kicker)}</p>
            <h3 className="text-[24px] leading-8 font-semibold tracking-[-0.7px] whitespace-nowrap">{t(step.title)}</h3>
            <div className="text-[16px] leading-6 tracking-[-0.2px] text-[#4b4f58] [&>p+p]:!mt-3.5">{typeof step.body === "string" ? t(step.body) : step.body}</div>
          </div>
          <div className="min-w-0">{step.visual}</div>
        </article>
        </Reveal>
      ))}
    </div>
  );
}

function PhaseOne() {
  const t = useT();
  return (
    <section id="phase-1" className="relative mt-20 scroll-mt-6">
      <Reveal>
      <PhaseHead {...PHASE_HEADS["phase-1"]} />
      </Reveal>
      <StickyStory
        steps={[
          {
            kicker: "OBJECT",
            title: "Object",
            body: COPY.object1,
            visual: (
              <div className="grid grid-cols-3 gap-4">
                {ROLES_1.map((role) => (
                  <RoleCard key={role.title} {...role} />
                ))}
              </div>
            ),
          },
          {
            kicker: "INPUT",
            title: "Document Input",
            body: (
              <>
                <p>{t(COPY.input1[0])}</p>
                <p className="mt-4">{t(COPY.input1[1])}</p>
              </>
            ),
            visual: <DocumentGraph />,
          },
          {
            kicker: "AI ROLE",
            title: "What AI does",
            body: COPY.aiRole1,
            visual: (
              <div className="grid grid-cols-3 gap-4">
                {CAPABILITIES_1.map((cap) => (
                  <Capability key={cap.n} {...cap} />
                ))}
              </div>
            ),
          },
          {
            kicker: "OUTPUT",
            title: "Output",
            body: COPY.output1,
            visual: <img src="/figma/aiw/output-phase1.png" alt={t("Discovery output: requirement summary, flows, open questions and confirmed scope")} className="aiw-output-float mx-auto w-full max-w-[560px]" />,
          },
        ]}
      />
    </section>
  );
}

function PhaseTwo() {
  const t = useT();
  return (
    <section id="phase-2" className="relative mt-20 scroll-mt-6">
      <img
        src="/figma/aiw/phase-bg.png"
        alt=""
        className="pointer-events-none absolute -top-16 -left-[88px] z-0 h-[866px] w-[1608px] max-w-none select-none"
      />
      <div className="relative z-[1]">
      <Reveal>
      <PhaseHead {...PHASE_HEADS["phase-2"]} />
      </Reveal>
      <StickyStory
        steps={[
          {
            kicker: "OBJECT",
            title: "Object",
            body: COPY.object2,
            visual: (
              <div className="grid grid-cols-2 gap-4">
                {ROLES_2.map((role) => (
                  <RoleCard key={role.title} {...role} />
                ))}
              </div>
            ),
          },
          {
            kicker: "INPUT",
            title: "Design Input",
            body: COPY.input2,
            visual: <DesignGraph />,
          },
          {
            kicker: "AI ROLE",
            title: "What AI does",
            body: COPY.aiRole2,
            visual: (
              <div className="grid grid-cols-3 gap-4">
                {CAPABILITIES_2.map((cap) => (
                  <Capability key={cap.n} {...cap} />
                ))}
              </div>
            ),
          },
          {
            kicker: "OUTPUT",
            title: "Output",
            body: (
              <>
                <p>{t(COPY.output2[0])}</p>
                <p className="mt-4">{t(COPY.output2[1])}</p>
              </>
            ),
            visual: <img src="/figma/aiw/output-phase2.png" alt={t("AI design execution outputs, from the UX brief through the self-review checklist")} className="aiw-output-float aiw-output-float-delayed mx-auto w-full max-w-[560px]" />,
          },
        ]}
      />
      </div>
    </section>
  );
}

function PhaseThree() {
  const t = useT();
  return (
    <section id="phase-3" className="relative mt-20 scroll-mt-6">
      <Reveal>
      <PhaseHead {...PHASE_HEADS["phase-3"]} />
      </Reveal>
      <StickyStory
        steps={[
          {
            kicker: "REVIEW LOOP",
            title: "Review & approval",
            body: (
              <>
                <p>{t(COPY.review3[0])}</p>
                <p className="mt-4">{t(COPY.review3[1])}</p>
              </>
            ),
            visual: <ReviewLoop />,
          },
          {
            kicker: "DELIVERY",
            title: "Final output",
            body: COPY.final3,
            visual: <HandoffPackage />,
          },
        ]}
      />
    </section>
  );
}

function ReviewLoop() {
  const t = useT();
  return (
    <div className="flex flex-col gap-3.5 rounded-2xl bg-white p-5">
      <div className="flex items-stretch gap-4">
        <div className="flex w-6 shrink-0 flex-col items-center pt-[22px]">
          <span className="size-4 rounded-full bg-[#e85aad]" />
          <span className="mt-1.5 w-0.5 flex-1 bg-[#e9ebf0]" />
        </div>
        <div className="aiw-hover flex min-w-0 flex-1 flex-col items-start gap-2 rounded-2xl bg-[#f0f1f4] px-5 py-[18px]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#8a8f98]">{t("STEP {n}", { n: "05" })}</span>
            <TypeTag who="HUMAN + AI" />
          </div>
          <h4 className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t("Designer reviews the UI")}</h4>
          <p className="text-[14px] leading-5 text-[#4b4f58]">{t("Quality review and handling of missing data, edge cases & consistency.")}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(229,72,77,0.12)] py-1 pr-2.5 pl-2 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#e5484d]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M10 6a4 4 0 1 1-1.2-2.85M10 1.8v2.4H7.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("NP · revise in STEP 04")}
          </span>
        </div>
      </div>
      <div className="flex items-stretch gap-4">
        <div className="flex w-6 shrink-0 flex-col items-center pt-[26px]">
          <span className="size-[15px] rotate-45 rounded-[2px] bg-[#ff8d28]" />
          <span className="mt-1.5 w-0.5 flex-1 bg-[#e9ebf0]" />
        </div>
        <div
          className="aiw-hard flex min-w-0 flex-1 flex-col gap-2.5 rounded-2xl border border-[#ffc857] bg-[#fbf9ef] px-5 py-[18px]"
          style={{ "--hard": "rgba(214,202,111,0.3)" } as CSSProperties}
        >
          <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#f46c0b]">{t("GATE")}</p>
          <h4 className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t("UI Approval")}</h4>
          <GatePills fail="NP → BACK TO STEP 05" />
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex w-6 shrink-0 justify-center pt-[22px]">
          <span className="size-4 rounded-full bg-[#3d6fe8]" />
        </div>
        <div className="aiw-hover flex min-w-0 flex-1 flex-col gap-2 rounded-2xl bg-[#f0f1f4] px-5 py-[18px]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#8a8f98]">{t("STEP {n}", { n: "06" })}</span>
            <TypeTag who="HUMAN" />
          </div>
          <h4 className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t("Final high-fidelity design & handoff")}</h4>
          <p className="text-[14px] leading-5 text-[#4b4f58]">{t("Review, edit & hand over development-ready designs.")}</p>
        </div>
      </div>
    </div>
  );
}

function HandoffPackage() {
  const t = useT();
  const rows = HANDOFF;
  return (
    <div className="aiw-hover flex flex-col gap-2.5 rounded-lg bg-white p-4">
      <div className="flex items-start justify-between px-0.5 pb-1">
        <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#8a8f98]">{t("HANDOFF PACKAGE")}</p>
        <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#3d6fe8]">{t("04 ITEMS")}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {rows.map(([name, code, icon]) => (
          <li key={name} className="aiw-row flex items-center gap-3 rounded-lg bg-[#f0f1f4] py-2.5 pr-3 pl-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#e9ebf0]">
              <img src={icon} alt="" className="size-5" />
            </span>
            <span className="flex-1 text-[16px] leading-6 tracking-[-0.2px] text-[#0a0a0a]">{t(name)}</span>
            <span className="font-mono text-[16px] leading-6 font-medium tracking-[0.2px] text-[#8a8f98]">{code}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ onTop }: { onTop: () => void }) {
  const t = useT();
  return (
    <footer className="mt-[100px] flex flex-col items-center gap-5 border-t border-[#e9ebf0] pt-20 pb-10 text-center">
      <p className="text-[72px] leading-[80px] font-semibold tracking-[-2.6px]">{t("Thanks for watching")}</p>
      <div className="flex items-center justify-center gap-4">
        <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#8a8f98]">© TUAN NGOC PORTFOLIO 2027</p>
        <button
          type="button"
          onClick={onTop}
          className="aiw-hover flex items-center gap-1.5 rounded-lg bg-[#f0f1f4] px-3 py-[7px] text-[14px] leading-5 font-semibold text-[#0a0a0a] hover:bg-[#e9ebf0]"
        >
          {t("Back to top")}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 8.5 L7 4.5 L11 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  );
}

function PhaseHead({
  index,
  title,
  subtitle,
  people,
}: {
  index: string;
  title: string;
  subtitle: string;
  people: [string, string][];
}) {
  const t = useT();
  return (
    <header className="flex flex-col gap-4 rounded-[24px] bg-white p-10">
      <div className="flex items-center justify-between gap-6">
        <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#3d6fe8]">{t(index)}</p>
        <div className="flex flex-wrap justify-end gap-1.5">
          {people.map(([label, color]) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-[#f0f1f4] py-1 pr-2.5 pl-2 text-[14px] leading-5 text-[#4b4f58]"
            >
              <span className="size-2 rounded-full" style={{ background: color }} />
              {t(label)}
            </span>
          ))}
        </div>
      </div>
      <h2 className="text-[72px] leading-[80px] font-semibold tracking-[-2.6px]">{t(title)}</h2>
      <p className="text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[#4b4f58]">{t(subtitle)}</p>
    </header>
  );
}

function RoleCard({
  glyph,
  who,
  title,
  body,
  accent = false,
}: {
  glyph: "clip" | "speech" | "spark";
  who: "AI" | "HUMAN";
  title: string;
  body: string;
  accent?: boolean;
}) {
  const t = useT();
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal h-full">
      <article
        className={`flex h-full flex-col gap-3.5 rounded-2xl bg-white p-6 ${
          accent ? "aiw-hard" : "aiw-hover shadow-[0_6px_7px_rgba(3,10,31,0.05)]"
        }`}
        style={accent ? ({ "--hard": "rgba(153,133,255,0.3)" } as CSSProperties) : undefined}
      >
        <div className="flex items-start justify-between">
          <img src={ROLE_ICON[glyph]} alt="" className="size-10 shrink-0" />
          <TypeTag who={who} large />
        </div>
        <h4 className="text-[24px] leading-8 font-semibold tracking-[-0.7px]" style={title === "BA / PO" ? { color: "#168eff" } : undefined}>
          {t(title)}
        </h4>
        <p className="text-[14px] leading-5 text-[#4b4f58]">{t(body)}</p>
      </article>
    </div>
  );
}

function Capability({ n, icon, crop, title }: { n: string; icon: string; crop?: string; title: string }) {
  const t = useT();
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <article className="aiw-hover flex h-full min-h-[160px] flex-col gap-6 rounded-2xl bg-white p-5 shadow-[0_6px_14px_rgba(3,10,31,0.05)]">
        <div className="flex items-start justify-between">
          <span className="relative size-10 shrink-0 overflow-hidden">
            <img src={icon} alt="" className={crop ?? "absolute inset-0 size-full max-w-none object-cover"} />
          </span>
          <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#8a8f98]">{n}</span>
        </div>
        <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t(title)}</p>
      </article>
    </div>
  );
}

function GraphFrame({ height, radius, children }: { height: number; radius: number; children: ReactNode }) {
  const t = useT();
  return (
    <div className="aiw-hover relative w-full overflow-hidden bg-white" style={{ height, borderRadius: radius }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <span className="absolute top-4 left-4 rounded bg-[#f7f7f7] px-2 py-1 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#8a8f98]">
        {t("INPUT MAP")}
      </span>
      {children}
    </div>
  );
}

function CoreNode({ top, label }: { top: number; label: string }) {
  const t = useT();
  return (
    <div
      className="absolute left-[364px] flex h-[88px] w-[240px] flex-col items-center justify-center gap-2 rounded-lg bg-[#e9ebf0] px-4"
      style={{ top, boxShadow: "6px 6px 0 0 rgba(102,153,255,0.35)" }}
    >
      <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[#3d6fe8]">{t("CORE INPUT")}</p>
      <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">{t(label)}</p>
    </div>
  );
}

function SideNode({ className, tone, mono = false, children }: { className: string; tone: "ai" | "pink"; mono?: boolean; children: ReactNode }) {
  return (
    <div
      className={`absolute flex items-center justify-center rounded-lg border px-4 text-center text-[#0a0a0a] ${
        mono ? "font-mono text-[14px] leading-5" : "text-[14px] leading-5 font-semibold"
      } ${tone === "ai" ? "border-[#623fff] bg-[#eeeafe]" : "border-[#ef3fff] bg-[#feeaf9]"} ${className}`}
    >
      {children}
    </div>
  );
}

function DocCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`aiw-hover absolute flex w-[274px] flex-col items-center justify-center gap-2.5 rounded-lg bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${className}`}>
      <NodesIcon />
      <p className="font-mono text-[20px] leading-[30px] tracking-[0.2px] text-[#1b1b1b]">{children}</p>
    </div>
  );
}

function DocumentGraph() {
  const t = useT();
  return (
    <GraphFrame height={428} radius={24}>
      <SideNode tone="ai" className="top-[93px] left-[72px] h-[50px] w-[160px]">{t("User role")}</SideNode>
      <CoreNode top={71} label="Requirement" />
      <SideNode tone="pink" className="top-[93px] left-[736px] h-[50px] w-[160px]">{t("Business rule")}</SideNode>
      <div className="absolute top-[117px] left-[232px] h-0.5 w-[132px] bg-[#e9ebf0]" />
      <div className="absolute top-[117px] left-[604px] h-0.5 w-[132px] bg-[#e9ebf0]" />
      <div className="absolute top-[159px] left-[483px] h-[53px] w-0.5 bg-[#e9ebf0]" />
      <DocCard className="top-[212px] left-[349px] h-[130px]">{t("BA Documents")}</DocCard>
      <div className="absolute top-[331px] left-[277px] flex gap-3">
        {["BRD", "FS", "User Story"].map((chip) => (
          <span
            key={chip}
            className={`aiw-hover flex items-center justify-center rounded-lg bg-white p-4 font-mono text-[16px] leading-6 tracking-[0.16px] text-[#1b1b1b] shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${chip === "User Story" ? "" : "w-[130px]"}`}
          >
            {t(chip)}
          </span>
        ))}
      </div>
    </GraphFrame>
  );
}

function DesignGraph() {
  const t = useT();
  return (
    <GraphFrame height={476} radius={8}>
      <SideNode tone="ai" mono className="top-[118px] left-[72px] h-[66px] w-[180px]">{t("Design System for AI")}</SideNode>
      <CoreNode top={104} label="Confirm scope" />
      <SideNode tone="pink" mono className="top-[118px] left-[716px] h-[66px] w-[180px]">{t("UX writing guideline")}</SideNode>
      <div className="absolute top-[150px] left-[252px] h-0.5 w-[112px] bg-[#e9ebf0]" />
      <div className="absolute top-[150px] left-[604px] h-0.5 w-[112px] bg-[#e9ebf0]" />
      <div className="absolute top-[192px] left-[483px] h-[81px] w-0.5 bg-[#e9ebf0]" />
      <DocCard className="top-[273px] left-[344px] text-center">{t("AI Component library")}</DocCard>
    </GraphFrame>
  );
}

function Arrow() {
  return (
    <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden>
      <path d="M0 6 H28" stroke="currentColor" strokeWidth="1.6" />
      <path d="M22 1.5 L28.5 6 L22 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Glyph = "doc" | "shield" | "grid" | "tag" | "fig" | "lib" | "check" | "flow" | "down" | "clip" | "speech" | "spark" | "pencil" | "book";

function GlyphIcon({ name, large = false }: { name: Glyph; large?: boolean }) {
  const box = large ? "size-10 rounded-xl" : "size-7 rounded-lg";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-[#eef2ff] text-[#3d6fe8] ${box}`}>
      <Mini name={name} />
    </span>
  );
}

function Mini({ name }: { name: Glyph }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" as const, "aria-hidden": true as const };
  if (name === "doc" || name === "fig")
    return (
      <svg {...common}>
        <path d="M4 2.5h5l3 3V13.5H4v-11z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 2.5V5.5h3" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg {...common}>
        <path d="M8 1.8l5 2v4.2c0 3-2.1 4.8-5 6-2.9-1.2-5-3-5-6V3.8l5-2z" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  if (name === "grid" || name === "lib")
    return (
      <svg {...common}>
        <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  if (name === "tag")
    return (
      <svg {...common}>
        <path d="M2.5 8.2L8 2.7h5.2V8L7.8 13.4 2.5 8.2z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="10.2" cy="5.6" r="0.8" fill="currentColor" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...common}>
        <path d="M3 8.2l3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  if (name === "flow")
    return (
      <svg {...common}>
        <circle cx="4" cy="4" r="1.6" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="4" cy="12" r="1.6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.5 4.6L10.4 7.4M5.5 11.4L10.4 8.6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  if (name === "down")
    return (
      <svg {...common}>
        <path d="M8 2.5v9M4.5 8.5L8 12.2l3.5-3.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  if (name === "clip")
    return (
      <svg {...common}>
        <path d="M6 9.5l4.2-4.2a1.8 1.8 0 012.5 2.5L8 12.5a3 3 0 01-4.2-4.2L8.2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  if (name === "speech")
    return (
      <svg {...common}>
        <path d="M3 3.5h10v7H7l-2.5 2v-2H3v-7z" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  if (name === "spark")
    return (
      <svg {...common}>
        <path d="M8 1.5l1.1 3.6L12.8 6.2 9.1 7.3 8 11l-1.1-3.7L3.2 6.2l3.7-1.1L8 1.5z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  if (name === "pencil")
    return (
      <svg {...common}>
        <path d="M9.2 2.8l4 4L6 14H2v-4l7.2-7.2z" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 2.5h10v11H3v-11z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function NodesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="6" r="2.2" stroke="#8a8f98" strokeWidth="1.4" />
      <circle cx="6" cy="20" r="2.2" stroke="#8a8f98" strokeWidth="1.4" />
      <circle cx="22" cy="20" r="2.2" stroke="#8a8f98" strokeWidth="1.4" />
      <path d="M14 8.2v4.2M12.4 14.2L7.4 18.2M15.6 14.2l5 4" stroke="#8a8f98" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="2" stroke="#8a8f98" strokeWidth="1.4" />
    </svg>
  );
}
