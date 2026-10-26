"use client";

import "./vops-research.css";
import type { CSSProperties, ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { VopsEyebrow, VopsHeading } from "./parts";

const A = "/figma/vops/research";

/** Figma "Card/Soft". */
const CARD_SOFT = "0 12px 32px -4px rgba(15,23,41,0.06), 0 1px 3px 0 rgba(15,23,41,0.04)";
const RED = "#e50030";
const INK = "#14141a";
const BODY = "text-[16px] leading-[24px] tracking-[-0.2px]";
const H3 = "text-[24px] leading-[32px] font-semibold tracking-[-0.24px] whitespace-nowrap";

/* ================================================================== */
/* Phase band (Figma 272:14774; reused by Phase 02 / 03)               */
/* ================================================================== */

/* Blurred 18% white disc (r 256.5, blur 190) re-expressed as a radial gradient — no CSS blur. */
const GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.108) 0%, rgba(255,255,255,0.098) 20%, rgba(255,255,255,0.075) 40%, rgba(255,255,255,0.04) 63%, rgba(255,255,255,0.012) 85%, rgba(255,255,255,0) 100%)";

export type VopsPhaseBandProps = {
  /** Section id (e.g. "wd-phase-research"). */
  id: string;
  /** "01" — drawn as the 180px phase number and in the "PHASE 01" label. */
  num: string;
  title: string;
  text: ReactNode;
  chips: string[];
  /** Band fill (Figma `phase/vops-ui-solid`, #ee0033 on phase 01). */
  solid?: string;
  /** 12px offset shadow colour (Figma `phase/vops-ink`, #14141a on phase 01). */
  shadow?: string;
  /** Number, label, title and description colour. */
  ink?: string;
  /** Chip label colour / chip fill. */
  chipInk?: string;
  chipBg?: string;
  /** Dot grid (black dots on a 25.23×24 grid, multiply). */
  dotColor?: string;
  dotOpacity?: number;
  /** White glow at the right edge; false hides it. */
  glow?: boolean;
};

/** Figma "Phase 0X — … phase": 1640×400 band, offset shadow, glow, dot grid, number, copy and step chips. */
export function VopsPhaseBand({
  id,
  num,
  title,
  text,
  chips,
  solid = "#ee0033",
  shadow = "#14141a",
  ink = "#ffffff",
  chipInk = "#14141a",
  chipBg = "#ffffff",
  dotColor = "#000000",
  dotOpacity = 0.18,
  glow = true,
}: VopsPhaseBandProps) {
  const t = useT();
  const dotGrid: CSSProperties = {
    opacity: dotOpacity,
    backgroundImage: `radial-gradient(circle at 1.05px 1px, ${dotColor} 0.75px, transparent 1.15px)`,
    backgroundSize: "25.2308px 24px",
  };
  return (
    <section id={id} className="relative h-[512px] w-full">
      <Reveal className="absolute top-[100px] left-[116px] h-[400px] w-[1640px]" enter={80}>
        <div className="relative size-full overflow-clip rounded-[40px]" style={{ background: solid, boxShadow: `12px 12px 0 0 ${shadow}` }}>
          {glow ? (
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{ left: 823, top: -306, width: 1273, height: 1273, backgroundImage: GLOW }}
            />
          ) : null}
          <div aria-hidden className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply" style={dotGrid} />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap" style={{ color: ink }}>
            {num}
          </p>
          <div className="absolute top-1/2 left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px]" style={{ color: ink }}>
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {n}", { n: num })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t(title)}</p>
            <p className="w-[860px] text-[20px] leading-[28px]">{typeof text === "string" ? t(text) : text}</p>
            <div className="flex w-[900px] flex-wrap content-start items-start gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className={`wd-hover flex items-center rounded-full px-3 py-1.5 whitespace-pre ${BODY}`}
                  style={{ color: chipInk, background: chipBg }}
                >
                  {t(c)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* Shared bits                                                          */
/* ================================================================== */

/** Section head: eyebrow + 56px heading, then the grey lead (gap 24 inside a block, or 40 as a sibling). */
function Head({ eyebrow, title, lead, leadWidth, gap }: { eyebrow: string; title: ReactNode; lead: ReactNode; leadWidth: number; gap: number }) {
  const t = useT();
  return (
    <div className="flex w-full flex-col items-start" style={{ gap }}>
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <VopsEyebrow label={t(eyebrow)} />
          <VopsHeading>{typeof title === "string" ? t(title) : title}</VopsHeading>
        </div>
      </Reveal>
      <Reveal enter={40}>
        <p className="text-[20px] leading-[1.5] text-[#4b4f58]" style={{ width: leadWidth }}>
          {typeof lead === "string" ? t(lead) : lead}
        </p>
      </Reveal>
    </div>
  );
}

/** Label (300) · 12px bar on a grey track · bold value. Fill width is the percentage of the track. */
function BarRow({ label, pct, track, color, i }: { label: string; pct: number; track: number; color: string; i: number }) {
  const t = useT();
  return (
    <div className="flex items-center gap-4">
      <p className={`w-[300px] shrink-0 whitespace-nowrap text-[#374151] ${BODY}`}>{t(label)}</p>
      <div className="flex h-3 shrink-0 items-start rounded-full bg-[#f3f4f6]" style={{ width: track }}>
        <div
          className="vr-fill h-3 rounded-full"
          style={{ width: `${pct}%`, background: color, "--vr-i": i } as CSSProperties}
        />
      </div>
      <p className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
        {pct}%
      </p>
    </div>
  );
}

/* ================================================================== */
/* 01.1 Research plan (Figma 275:14935)                                */
/* ================================================================== */

const GOALS = [
  "Map a typical working day across roles",
  "Measure fragmentation: how many systems, how much time",
  "Find the most repeated tasks to prioritise mini apps",
  "Gauge expectations of — and trust in — an AI assistant",
  "Audit the UI of existing internal products",
];

const METHODS = [
  { n: "8", title: "Stakeholder interviews", desc: "Digital transformation, HR, Admin and IT — goals & constraints", icon: "group", left: 217.91, top: -8.09 },
  { n: "18", title: "1:1 user interviews", desc: "45 minutes each, remote and on-site, three role groups", icon: "dialogue", left: 203.79, top: 13.79 },
  { n: "1,240", title: "Survey responses", desc: "21 questions sent across the whole group", icon: "clipboard", left: 203.79, top: 13.79 },
  { n: "6", title: "Contextual inquiries", desc: "A full working day shadowed at HQ and a provincial branch", icon: "binoculars", left: 218, top: -6 },
  { n: "15", title: "Product audit", desc: "UI audit and heuristic review of internal systems", icon: "audit", left: 218, top: 5 },
  { n: "30d", title: "Analytics review", desc: "Usage logs of legacy systems: frequency and timing", icon: "analytics", left: 212, top: 0 },
];

function ResearchPlan() {
  const t = useT();
  return (
    <section id="wd-research-plan" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="RESEARCH  ·  01.1"
        title="Research plan"
        lead="Five methods over six weeks, mixing breadth (survey, analytics) with depth (interviews, shadowing) across office, branch and field staff."
        leadWidth={688}
        gap={24}
      />
      <div className="flex w-full items-start gap-5">
        <Reveal className="shrink-0" enter={40}>
          <div
            className="vr-card wd-hover relative flex h-[420px] w-[520px] flex-col items-start gap-[14px] overflow-clip rounded-[24px] bg-white p-8"
            style={{ boxShadow: CARD_SOFT }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/target.svg`} alt="" aria-hidden className="vr-target pointer-events-none absolute top-[266px] left-[319px] block size-[201px] max-w-none" />
            <p className={`relative ${H3}`} style={{ color: INK }}>
              {t("Research goals")}
            </p>
            {GOALS.map((g) => (
              <div key={g} className="relative flex items-start gap-3">
                <span className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: RED }}>
                  —
                </span>
                <p className={`w-[420px] text-[#374151] ${BODY}`}>{t(g)}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="flex w-[1020px] shrink-0 flex-wrap content-start items-start gap-5">
          {METHODS.map((m) => (
            <Reveal key={m.title} className="shrink-0" enter={40}>
              <div
                className="vr-card wd-hover relative flex w-[326px] flex-col items-start gap-2 overflow-clip rounded-[24px] bg-white p-7"
                style={{ boxShadow: CARD_SOFT }}
              >
                <div aria-hidden className="pointer-events-none absolute flex size-[108.426px] items-center justify-center" style={{ left: m.left, top: m.top }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${A}/${m.icon}.svg`} alt="" className="vr-deco block size-24 max-w-none" />
                </div>
                <p className="relative text-[48px] leading-[52px] font-semibold tracking-[-1.44px] whitespace-nowrap" style={{ color: RED }}>
                  {m.n}
                </p>
                <p className="relative text-[18px] leading-[28px] font-semibold tracking-[-0.2px] whitespace-nowrap" style={{ color: INK }}>
                  {t(m.title)}
                </p>
                <p className={`relative w-[270px] text-[#6b7280] ${BODY}`}>{t(m.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 01.2 Who we talked to (Figma 275:14986)                             */
/* ================================================================== */

const MATRIX_HEAD = ["​", "HQ office", "Branch office", "Field / technical", "Total"];
const MATRIX = [
  ["Employee", "3", "3", "4", "10"],
  ["Manager", "2", "2", "1", "5"],
  ["HR / Admin", "2", "1", "0", "3"],
  ["Total", "7", "6", "5", "18"],
];

const DEVICES = [
  { label: "Mobile", pct: 68, color: "#e50030" },
  { label: "Laptop / desktop", pct: 27, color: "#f5a3b3" },
  { label: "Tablet", pct: 5, color: "#f9d0d8" },
];

function WhoWeTalkedTo() {
  const t = useT();
  return (
    <section id="wd-who" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="RESEARCH  ·  01.2"
        title="Who we talked to"
        lead="Participants mirrored the workforce: most employees work outside headquarters and on the move."
        leadWidth={642}
        gap={24}
      />
      <div className="flex w-full items-stretch gap-5">
        <Reveal className="flex shrink-0" enter={40}>
          <div className="wd-hover flex w-[880px] flex-col items-start rounded-[24px] bg-white p-8" style={{ boxShadow: CARD_SOFT }}>
            <p className={H3} style={{ color: INK }}>
              {t("Interviews · n = 18")}
            </p>
            <div className="h-4 w-px shrink-0" />
            <div className="flex items-start rounded-[12px] bg-[#fff4f6] py-3">
              {MATRIX_HEAD.map((h, i) => (
                <div key={i} className="flex w-[163px] shrink-0 items-start px-4">
                  <p className="text-[14px] leading-[20px] font-semibold whitespace-nowrap text-[#b30026]">{t(h)}</p>
                </div>
              ))}
            </div>
            {MATRIX.map((row) => {
              const total = row[0] === "Total";
              return (
                <div key={row[0]} className="vr-row flex items-start py-[14px]">
                  {row.map((c, i) => (
                    <div key={i} className="flex w-[163px] shrink-0 items-start px-4">
                      <p
                        className={`whitespace-nowrap ${i === 0 || total ? "text-[16px] leading-[1.5] font-semibold" : BODY}`}
                        style={{ color: INK }}
                      >
                        {t(c)}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal className="shrink-0" enter={40}>
          <div className="wd-hover flex h-[364px] w-[660px] flex-col items-start gap-[18px] rounded-[24px] bg-white p-8" style={{ boxShadow: CARD_SOFT }}>
            <p className={H3} style={{ color: INK }}>
              {t("Primary device for work")}
            </p>
            <p className="text-[14px] leading-[20px] whitespace-nowrap text-[#6b7280]">{t("Survey · n = 1,240")}</p>
            {DEVICES.map((d, i) => (
              <BarRow key={d.label} label={d.label} pct={d.pct} track={196} color={d.color} i={i} />
            ))}
            <div className="flex items-start rounded-[12px] bg-[#fff4f6] px-4 py-[14px]">
              <p className={`w-[560px] text-[#b30026] ${BODY}`}>
                {t("Mobile-first is non-negotiable — and the web must still serve desk-heavy HR and admin roles.")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 01.3 Survey highlights (Figma 275:15076)                            */
/* ================================================================== */

const STATS = [
  { n: "23 min", t: "lost each day switching and searching for the right tool" },
  { n: "7+", t: "systems used weekly by 47% of staff" },
  { n: "64%", t: "don't know the status of a request after submitting it" },
  { n: "71%", t: "want one app for chat, documents and HR requests" },
];

const TASKS: [string, number][] = [
  ["Read email & incoming documents", 82],
  ["Group & 1:1 chat", 78],
  ["Check meeting schedule", 61],
  ["Request leave or duty", 54],
  ["Check income & payslip", 49],
  ["Book a car or meals", 37],
  ["Update profile & dependants", 18],
];

const SYSTEMS: [string, number][] = [
  ["1 – 3 systems", 12],
  ["4 – 6 systems", 41],
  ["7+ systems", 47],
];

const AI: [string, number][] = [
  ["Would use it daily", 58],
  ["Only if answers are right & sourced", 31],
  ["Don't trust it", 11],
];

function SurveyHighlights() {
  const t = useT();
  return (
    <section id="wd-survey" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="RESEARCH  ·  01.3"
        title="Survey highlights"
        lead="People are not short of tools — they are short of one place that tells them what to do next."
        leadWidth={900}
        gap={40}
      />
      <div className="flex w-full items-stretch gap-5">
        {STATS.map((s) => (
          <Reveal key={s.n} className="flex shrink-0" enter={40}>
            <div className="wd-hover flex h-[174px] w-[375px] flex-col items-start gap-2.5 rounded-[24px] p-8 text-white" style={{ background: RED }}>
              <p className="text-[48px] leading-[52px] font-semibold tracking-[-1.44px] whitespace-nowrap">{t(s.n)}</p>
              <p className={`w-[310px] ${BODY}`}>{t(s.t)}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="flex w-full items-stretch gap-5">
        <Reveal className="flex shrink-0" enter={40}>
          <div className="wd-hover flex h-[408px] w-[770px] flex-col items-start gap-4 rounded-[24px] bg-white p-8" style={{ boxShadow: CARD_SOFT }}>
            <p className={H3} style={{ color: INK }}>
              {t("Most frequent weekly tasks")}
            </p>
            {TASKS.map(([l, p], i) => (
              <BarRow key={l} label={l} pct={p} track={306} color={RED} i={i} />
            ))}
          </div>
        </Reveal>
        <Reveal className="flex shrink-0" enter={40}>
          <div className="wd-hover flex w-[770px] flex-col items-start gap-4 rounded-[24px] bg-white p-8" style={{ boxShadow: CARD_SOFT }}>
            <p className={H3} style={{ color: INK }}>
              {t("Systems opened per week")}
            </p>
            {SYSTEMS.map(([l, p], i) => (
              <BarRow key={l} label={l} pct={p} track={306} color={RED} i={i} />
            ))}
            <div className="h-2 w-px shrink-0" />
            <p className={H3} style={{ color: INK }}>
              {t("Attitude to an AI assistant at work")}
            </p>
            {AI.map(([l, p], i) => (
              <BarRow key={l} label={l} pct={p} track={306} color="#7c5cff" i={i + 3} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 01.4 Interviews & affinity map (Figma 275:15182)                    */
/* ================================================================== */

const CLUSTERS = [
  {
    title: "Fragmentation",
    bg: "#ffe2d6",
    notes: [
      "\"A different app for every task — and a different password for each.\"",
      "\"I ask colleagues where the car-booking form lives.\"",
      "\"Notifications arrive in three different places.\"",
    ],
  },
  {
    title: "Invisible status",
    bg: "#fff1c2",
    notes: [
      "\"Once I submit, I don't know who's holding it.\"",
      "\"My boss approves by message; the system stays stuck.\"",
      "\"I end up calling HR.\"",
    ],
  },
  {
    title: "Mobile gaps",
    bg: "#dcf5e3",
    notes: ["\"On site I only have my phone.\"", "\"The mobile version has half the features.\"", "\"Long forms are painful to type on a phone.\""],
  },
  {
    title: "Information overload",
    bg: "#dde9ff",
    notes: [
      "\"40 emails every morning — which one first?\"",
      "\"Long documents — I just need to know what to do.\"",
      "\"Every notification is red.\"",
    ],
  },
  {
    title: "Trust in AI",
    bg: "#ece4ff",
    count: "text-[14px] leading-[20px] text-[#5b21b6]",
    notes: [
      "\"If the AI gets a policy wrong, who's responsible?\"",
      "\"Show me the source document.\"",
      "\"Summaries are great — decisions stay with me.\"",
    ],
  },
];

function InterviewsAffinity() {
  const t = useT();
  return (
    <section id="wd-interviews" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="RESEARCH  ·  01.4"
        title="Interviews & affinity map"
        lead="18 interviews produced 260+ notes. Clustering them surfaced five themes."
        leadWidth={900}
        gap={24}
      />
      <div className="flex w-full items-stretch gap-5">
        {CLUSTERS.map((c) => (
          <Reveal key={c.title} className="flex shrink-0" enter={40}>
            <div className="flex w-[296px] flex-col items-start gap-3 rounded-[24px] p-5" style={{ background: c.bg }}>
              <p className="text-[20px] leading-[28px] font-semibold tracking-[-0.4px] whitespace-nowrap text-[var(--cmd-text-primary)]">{t(c.title)}</p>
              <p className={`whitespace-nowrap ${c.count ?? `${BODY} text-[var(--cmd-text-secondary)]`}`}>{t("3+ notes")}</p>
              {c.notes.map((n) => (
                <div key={n} className="wd-hover flex w-64 flex-col items-start rounded-[14px] bg-white p-4">
                  <p className={`w-[224px] text-[#374151] ${BODY}`}>{t(n)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */

/** Phase 01 band + Research plan, Who we talked to, Survey highlights, Interviews & affinity map. */
export function VopsResearch() {
  return (
    <>
      <VopsPhaseBand
        id="wd-phase-research"
        num="01"
        title="Research phase"
        text="Before pixels: how does a Viettel employee get through a day of chat, documents and HR requests — and where does it break?"
        chips={[
          "01.1  Research plan",
          "01.2  Participants",
          "01.3  Survey",
          "01.4  Affinity",
          "01.5  Personas",
          "01.6  Journey",
          "01.7  Benchmark",
          "01.8  Synthesis",
        ]}
      />
      <ResearchPlan />
      <WhoWeTalkedTo />
      <SurveyHighlights />
      <InterviewsAffinity />
    </>
  );
}
