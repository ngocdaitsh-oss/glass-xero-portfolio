"use client";
/* eslint-disable @next/next/no-img-element -- Figma exports keep their measured size. */

import "./vops-system-a.css";
import type { CSSProperties, ReactNode } from "react";
import { useLang, useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { VopsEyebrow, VopsHeading } from "./parts";

const A = "/figma/vops/system-a";

/** Figma "Card/Soft": (0,1) r3 #0F17290A + (0,12) r32 s-4 #0F17290F. */
const CARD_SOFT = "0 1px 3px 0 rgba(15,23,41,0.04), 0 12px 32px -4px rgba(15,23,41,0.06)";

/** Section head used by these sections: eyebrow + H2, then a 24px gap and the 20/30 secondary lead. */
function Head({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead: ReactNode }) {
  const t = useT();
  return (
    <Reveal>
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-4">
          <VopsEyebrow label={t(eyebrow)} />
          <VopsHeading>{typeof title === "string" ? t(title) : title}</VopsHeading>
        </div>
        <p className="w-[900px] text-[20px] leading-[30px] text-[#4b4f58]">{typeof lead === "string" ? t(lead) : lead}</p>
      </div>
    </Reveal>
  );
}

const MONO_LABEL = "font-mono text-[14px] leading-[1.4] font-bold whitespace-nowrap text-[#9ca3af]";

/* ================================================================== */
/* Personas (276:14856)                                                */
/* ================================================================== */

type Persona = {
  initial: string;
  avatar: string;
  name: string;
  role: string;
  quote: string;
  goals: string[];
  frustrations: string[];
  /** Device split bar widths (mobile, desktop) inside the 434px track. */
  split: [number, number];
  splitLabel: string;
  systems: string[];
};

const PERSONAS: Persona[] = [
  {
    initial: "H",
    avatar: "#ffe2d6",
    name: "HùngNV35, 32",
    role: "Infrastructure engineer · provincial branch",
    quote: "\"In the field I have my phone and five spare minutes.\"",
    goals: ["Request duty and leave quickly on mobile", "Know what needs doing today", "Stop memorising many systems"],
    frustrations: ["Long forms on weak signal", "No idea if a request is approved", "Notifications scattered in 3 places"],
    split: [387, 43],
    splitLabel: "Mobile 90%  ·  Desktop 10%",
    systems: ["Chat", "Email", "HR"],
  },
  {
    initial: "L",
    avatar: "#dde9ff",
    name: "LanTTT2, 38",
    role: "HR specialist · headquarters",
    quote: "\"Half my time goes to answering the same questions.\"",
    goals: ["Process requests in batches, error-free", "Let staff self-serve policy questions", "Report quickly to leadership"],
    frustrations: ["Incomplete requests sent back", "A different system per request type", "Questions via chat, mail and phone"],
    split: [129, 301],
    splitLabel: "Mobile 30%  ·  Desktop 70%",
    systems: ["Documents", "Email", "HRM", "Excel"],
  },
  {
    initial: "T",
    avatar: "#ece4ff",
    name: "TuấnNM1, 45",
    role: "Department head · headquarters",
    quote: "\"I need to approve in 10 seconds — with enough context not to get it wrong.\"",
    goals: ["Approve on the move", "See team coverage before approving", "Summaries of long documents"],
    frustrations: ["Approving in several places", "No view of the team's leave", "Morning email overload"],
    split: [258, 172],
    splitLabel: "Mobile 60%  ·  Desktop 40%",
    systems: ["Documents", "Calendar", "Email", "Chat"],
  },
];

function ListBlock({ label, items, mark, markColor }: { label: string; items: string[]; mark: string; markColor: string }) {
  const t = useT();
  return (
    <div className="flex flex-col items-start gap-4">
      <p className={MONO_LABEL}>{t(label)}</p>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2.5 text-[16px]">
          <p className="leading-[1.5] font-bold whitespace-nowrap" style={{ color: markColor }}>
            {mark}
          </p>
          <p className="w-[400px] leading-6 tracking-[-0.2px] text-[#374151]">{t(item)}</p>
        </div>
      ))}
    </div>
  );
}

function PersonaCard({ p }: { p: Persona }) {
  const t = useT();
  return (
    <Reveal className="vsa-bars flex w-[506px] shrink-0 self-stretch">
      <div className="wd-hover flex w-full flex-col items-start gap-4 rounded-[24px] bg-white p-8" style={{ boxShadow: CARD_SOFT }}>
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full" style={{ background: p.avatar }}>
            <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[#14141a]">{p.initial}</p>
          </div>
          <div className="flex flex-col items-start gap-0.5 whitespace-nowrap">
            <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] text-[#14141a]">{p.name}</p>
            <p className="text-[16px] leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(p.role)}</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-start rounded-[16px] bg-[#fff4f6] px-[18px] py-4">
          <p className="w-[406px] text-[16px] leading-6 tracking-[-0.2px] text-[#b30026]">{t(p.quote)}</p>
        </div>
        <div className="flex flex-col items-start gap-6">
          <ListBlock label="GOALS" items={p.goals} mark="✓" markColor="#16a34a" />
          <ListBlock label="FRUSTRATIONS" items={p.frustrations} mark="✕" markColor="#e50030" />
        </div>
        <p className={MONO_LABEL}>{t("DEVICE SPLIT")}</p>
        <div className="flex items-start gap-1">
          <div className="vsa-bar h-3 rounded-[6px] bg-[#e50030]" style={{ width: p.split[0] }} />
          <div className="vsa-bar vsa-bar-2 h-3 rounded-[6px] bg-[#f9d0d8]" style={{ width: p.split[1] }} />
        </div>
        <p className="text-[16px] leading-6 tracking-[-0.2px] whitespace-pre text-[var(--cmd-text-secondary)]">{t(p.splitLabel)}</p>
        <p className={MONO_LABEL}>{t("SYSTEMS TODAY")}</p>
        <div className="flex items-start gap-2">
          {p.systems.map((s) => (
            <div key={s} className="flex items-start rounded-full bg-[#f3f4f6] px-3.5 py-1.5">
              <p className="text-[14px] leading-5 font-semibold whitespace-nowrap text-[#374151]">{t(s)}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Personas() {
  return (
    <section id="wd-personas" className="flex flex-col items-start gap-10 px-[156px] pt-[100px]" style={{ minHeight: 1042 }}>
      <Head eyebrow="RESEARCH  ·  01.5" title="Personas" lead="Three personas anchor every decision — one for each role that touches a request." />
      <div className="flex w-full items-start gap-5">
        {PERSONAS.map((p) => (
          <PersonaCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Journey map (276:14995)                                             */
/* ================================================================== */

const STAGES = ["Realise I need leave", "Find the system", "Fill in the form", "Wait for approval", "Get the result"];
const ACTIVE_STAGE = 2;

const ACTIONS = [
  "Family plans — needs Friday off",
  "Asks colleagues which system; signs in again",
  "14-field mobile web form, picks the wrong leave type",
  "Messages the manager on Zalo to approve",
  "No notification — checks manually",
];
const TOUCHPOINTS = [["Phone"], ["Chat", "Portal"], ["HRM web"], ["Chat", "Phone call"], ["HRM web"]];
const THINKING = [
  "\"Do I need two days' notice?\"",
  "\"Where was that link again?\"",
  "\"How many days do I have left?\"",
  "\"Has my manager seen it?\"",
  "\"Is it approved yet?\"",
];
const PAINS = ["Unclear leave policy", "4 systems, many passwords", "Long form, no defaults", "Approval happens outside the system", "No status at all"];
const OPPORTUNITIES = [
  "Show policy and balance up front",
  "One door: the mini-app catalogue",
  "Short form, pre-filled defaults, bottom sheets",
  "Approval card in the manager's feed",
  "Push + status timeline",
];

/** Emotion points (left/top inside the 1295×300 curve box). */
const POINTS = [
  { label: "Calm", face: "face-happy", left: 97.5, top: 56.2 },
  { label: "Annoyed", face: "face-annoyed", left: 342, top: 124.2 },
  { label: "Frustrated", face: "face-frustrated", left: 594.5, top: 171.8 },
  { label: "Anxious", face: "face-anxious", left: 863.5, top: 144.6 },
  { label: "Unsure", face: "face-meh", left: 1125, top: 103.8 },
];
const CURVE_W = 1295;
/** Line draw duration / delay (ms): keep in sync with --vsa-draw-ms / --vsa-draw-delay in the CSS. */
const DRAW_MS = 1600;
const DRAW_DELAY = 200;

function RowLabel({ icon, label, tint = "#f3f4f6" }: { icon: string; label: string; tint?: string }) {
  const t = useT();
  return (
    <div className="flex w-[200px] shrink-0 items-center gap-2.5 py-3 pr-3">
      <div className="flex items-start rounded-[10px] p-1.5" style={{ background: tint }}>
        <img src={`${A}/${icon}.svg`} alt="" className="block size-5 max-w-none" />
      </div>
      <p className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap text-[#14141a]">{t(label)}</p>
    </div>
  );
}

function Cell({ children }: { children: ReactNode }) {
  return <div className="flex w-[259px] shrink-0 flex-col items-start px-1.5">{children}</div>;
}

function MarkRow({ icon, label, tint, items, mark, markColor, bg }: { icon: string; label: string; tint: string; items: string[]; mark: string; markColor: string; bg: string }) {
  const tr = useT();
  return (
    <div className="flex w-full items-start py-2">
      <RowLabel icon={icon} label={label} tint={tint} />
      {items.map((t) => (
        <Cell key={t}>
          <div className="flex h-[106px] w-full flex-col items-start gap-1.5 rounded-[14px] px-4 py-3.5 text-[16px] leading-[1.5]" style={{ background: bg }}>
            <p className="font-semibold whitespace-nowrap" style={{ color: markColor }}>
              {mark}
            </p>
            <p className="w-[215px] text-[var(--cmd-text-primary)]">{tr(t)}</p>
          </div>
        </Cell>
      ))}
    </div>
  );
}

function EmotionCurve() {
  const t = useT();
  return (
    <Reveal className="reveal-fade vsa-draw relative h-[300px] w-[1295px] shrink-0" enter={200}>
      {[259, 518, 777, 1036].map((x) => (
        <div key={x} className="absolute top-0 h-[300px] w-px bg-white" style={{ left: x }} />
      ))}
      {/* Line "draws" left → right: a clip box slides in while its content counter-slides. */}
      <div className="vsa-wipe pointer-events-none absolute top-0 left-0 h-[310px] w-[1295px]">
        <div className="absolute inset-0">
          <img src={`${A}/curve-area.svg`} alt="" className="absolute left-0 block w-[1295px] max-w-none" style={{ top: 88.2, height: 216.822 }} />
          <img src={`${A}/curve.svg`} alt="" className="absolute left-0 block w-[1295px] max-w-none" style={{ top: 86.7 - 1.49, height: 124.011 }} />
        </div>
      </div>
      {POINTS.map((pt) => (
        <div
          key={pt.label}
          className="vsa-pop absolute flex flex-col items-center gap-2"
          style={{ left: pt.left, top: pt.top, "--d": `${DRAW_DELAY + Math.round(((pt.left + 40) / CURVE_W) * DRAW_MS)}ms` } as CSSProperties}
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 6px 16px 0 rgba(237,0,51,0.22)" }}>
            <img src={`${A}/${pt.face}.svg`} alt="" className="block size-10 max-w-none" />
          </div>
          <div className="flex items-start rounded-full bg-white px-3 py-1">
            <p className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap text-[#14141a]">{t(pt.label)}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}

function Journey() {
  const tr = useT();
  return (
    <section id="wd-journey" className="flex flex-col items-start gap-10 px-[156px] pt-[100px]" style={{ minHeight: 1414 }}>
      <Head
        eyebrow="RESEARCH  ·  01.6"
        title="Journey map — a one-day leave request, before vOps"
        lead="Following Hùng through one leave request: five steps, four systems, two phone calls."
      />
      <Reveal className="w-full">
        <div className="wd-hover flex w-full flex-col items-start rounded-[28px] bg-white px-8 pt-8 pb-10" style={{ boxShadow: CARD_SOFT }}>
          {/* Persona strip */}
          <div className="flex w-full items-center gap-4 pb-7">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#ffe2d6]">
              <p className="text-[22px] leading-[1.5] font-semibold whitespace-nowrap text-[#9a3412]">H</p>
            </div>
            <div className="flex min-w-px flex-1 flex-col items-start gap-0.5 leading-[1.5] whitespace-nowrap">
              <p className="text-[18px] font-semibold text-[#14141a]">{tr("Hùng · Infrastructure engineer, provincial branch")}</p>
              <p className="text-[16px] text-[var(--cmd-text-primary)]">{tr("Files a one-day leave request — before vOps")}</p>
            </div>
            {[
              ["5", "stages"],
              ["4", "systems"],
              ["2", "phone calls"],
            ].map(([n, label]) => (
              <div key={label} className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#fff4f6] px-3.5 py-2 leading-[1.5] whitespace-nowrap">
                <p className="text-[18px] font-semibold text-[#e03]">{n}</p>
                <p className="text-[16px] text-[#b30026]">{tr(label)}</p>
              </div>
            ))}
          </div>

          {/* Stages */}
          <div className="flex w-full items-start">
            <div className="h-[100px] w-[200px] shrink-0" />
            {STAGES.map((s, i) => {
              const active = i === ACTIVE_STAGE;
              const last = i === STAGES.length - 1;
              return (
                <div key={s} className={`flex w-[259px] shrink-0 items-center ${last ? "" : "gap-1 pr-1.5"}`}>
                  <div className={`flex min-w-px flex-1 items-center gap-2.5 rounded-[16px] p-3.5 ${active ? "bg-[#e03]" : "bg-[#fff4f6]"}`}>
                    <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${active ? "bg-white" : "bg-[#e03]"}`}>
                      <p className={`text-[14px] leading-[1.5] font-semibold whitespace-nowrap ${active ? "text-[#e03]" : "text-white"}`}>{i + 1}</p>
                    </div>
                    <p className={`text-[16px] leading-[1.5] font-semibold whitespace-nowrap ${active ? "text-white" : "text-[#14141a]"}`}>{tr(s)}</p>
                  </div>
                  {last ? null : <p className="text-[22px] leading-[1.5] font-semibold whitespace-nowrap text-[#f3a3b3]">›</p>}
                </div>
              );
            })}
          </div>
          <div className="h-4 w-2.5 shrink-0" />

          {/* Actions */}
          <div className="flex w-full items-start py-2">
            <RowLabel icon="ic-hand" label="Actions" />
            {ACTIONS.map((t) => (
              <Cell key={t}>
                <div className="flex h-[76px] w-full flex-col items-start rounded-[14px] bg-[#f7f7f8] px-4 py-3.5">
                  <p className="w-[215px] text-[16px] leading-[1.5] text-[var(--cmd-text-primary)]">{tr(t)}</p>
                </div>
              </Cell>
            ))}
          </div>

          {/* Touchpoints */}
          <div className="flex w-full items-start py-2">
            <RowLabel icon="ic-grid" label="Touchpoints" />
            {TOUCHPOINTS.map((chips, i) => (
              <Cell key={i}>
                <div className="flex w-full flex-wrap content-start items-start gap-1.5 rounded-[14px] py-1.5">
                  {chips.map((c) => (
                    <div key={c} className="flex items-start rounded-full bg-[#f3f4f6] px-3 py-1.5">
                      <p className="text-[16px] leading-[1.5] whitespace-nowrap text-[var(--cmd-text-primary)]">{tr(c)}</p>
                    </div>
                  ))}
                </div>
              </Cell>
            ))}
          </div>

          {/* Thinking */}
          <div className="flex w-full items-start py-2">
            <RowLabel icon="ic-message" label="Thinking" />
            {THINKING.map((t) => (
              <Cell key={t}>
                <div className="wd-hover flex h-[76px] w-full flex-col items-start rounded-[14px] bg-white px-4 py-3.5" style={{ boxShadow: "0 4px 14px 0 rgba(0,0,0,0.07)" }}>
                  <p className="w-[215px] text-[16px] leading-[1.5] text-[var(--cmd-text-primary)] italic">{tr(t)}</p>
                </div>
              </Cell>
            ))}
          </div>

          {/* Emotion */}
          <div className="flex w-full items-start py-4">
            <div className="flex w-[200px] shrink-0 flex-col items-start gap-3.5 py-3 pr-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-start rounded-[10px] bg-[#fff4f6] p-1.5">
                  <img src={`${A}/ic-star.svg`} alt="" className="block size-5 max-w-none" />
                </div>
                <p className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap text-[#14141a]">{tr("Emotion")}</p>
              </div>
              {[
                ["face-happy-sm", "Positive"],
                ["face-meh-sm", "Neutral"],
                ["face-frustrated-sm", "Negative"],
              ].map(([face, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <img src={`${A}/${face}.svg`} alt="" className="block size-5 max-w-none" />
                  <p className="text-[16px] leading-[1.5] whitespace-nowrap text-[#6b7280]">{tr(label)}</p>
                </div>
              ))}
            </div>
            <EmotionCurve />
          </div>

          <MarkRow icon="ic-shield" label="Pain points" tint="#ffe8ec" items={PAINS} mark="✕" markColor="#e03" bg="#fff1f3" />
          <MarkRow icon="ic-check" label="Opportunities" tint="#e8f5e9" items={OPPORTUNITIES} mark="✓" markColor="#16a34a" bg="#eefaf1" />
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* Synthesis (276:15127)                                               */
/* ================================================================== */

const THREADS = [
  {
    n: "01",
    theme: "Fragmentation",
    themeBg: "#ffe2d6",
    themeInk: "#9a3412",
    heard: "\"A different app for every task — and a different password for each.\"",
    hmw: "How might we make 27 mini apps from different teams feel like one product?",
    principle: "One door",
    body: "One entry point for every daily task.",
    accent: 75,
  },
  {
    n: "02",
    theme: "Information overload",
    themeBg: "#dde9ff",
    themeInk: "#1e40af",
    heard: "\"40 emails every morning — which one first?\"",
    hmw: "How might we show each employee what matters today — before they go looking?",
    principle: "Proactive",
    body: "The system brings work to you, not the other way round.",
    accent: 98,
  },
  {
    n: "03",
    theme: "Invisible status",
    themeBg: "#fff1c2",
    themeInk: "#8a5a00",
    heard: "\"Once I submit, I don't know who's holding it.\"",
    hmw: "How might we let a request be filed, approved and tracked from one card?",
    principle: "Consistent",
    body: "One status language across every mini app.",
    accent: 75,
  },
  {
    n: "04",
    theme: "Mobile gaps",
    themeBg: "#dcf5e3",
    themeInk: "#166534",
    heard: "\"On site I only have my phone.\"",
    hmw: "How might we make a request doable in five minutes on a phone?",
    principle: "Mobile first",
    body: "Short forms, bottom sheets, thumb-reach actions.",
    accent: 98,
  },
];

function Arrow({ delay }: { delay: number }) {
  return (
    <div className="relative h-3 w-24 shrink-0">
      <img
        src={`${A}/arrow.svg`}
        alt=""
        className="vsa-arrow absolute block w-24 max-w-none"
        style={{ top: -1, height: 14, "--d": `${delay}ms` } as CSSProperties}
      />
    </div>
  );
}

const SYN_HEAD = "font-mono text-[16px] leading-[1.4] whitespace-nowrap text-[var(--cmd-text-primary)]";

function Synthesis() {
  const tr = useT();
  return (
    <section id="wd-synthesis" className="flex flex-col items-start gap-10 px-[156px] pt-[100px]" style={{ minHeight: 1345 }}>
      <Head
        eyebrow="RESEARCH  ·  01.8"
        title="Synthesis"
        lead="Research turned into one problem statement, then four threads: what we heard, the question it raised, and the principle we committed to."
      />
      <Reveal className="w-full">
        <div className="wd-hover relative flex w-full flex-col items-start gap-3.5 overflow-clip rounded-[24px] bg-[#e50030] p-12">
          <p className="font-mono text-[14px] leading-[1.4] font-bold whitespace-nowrap text-[#ffd0d9]">{tr("PROBLEM STATEMENT")}</p>
          <p className="relative w-[1168px] text-[32px] leading-10 font-semibold tracking-[-0.64px] text-white">
            {tr("Viettel employees lose time and confidence moving between disconnected systems, because no single place tells them what needs their attention and lets them act on it — especially on mobile.")}
          </p>
          <img src={`${A}/quote-mark.svg`} alt="" className="pointer-events-none absolute block max-w-none" style={{ left: 1294, top: 23, width: 229, height: 179 }} />
        </div>
      </Reveal>
      <div className="flex w-full flex-col items-start">
        <Reveal className="w-full">
          <div className="flex w-full items-start pt-2 pb-4">
            <div className="h-5 w-24 shrink-0" />
            <div className="flex w-[330px] shrink-0 items-start">
              <p className={SYN_HEAD}>{tr("WHAT WE HEARD")}</p>
            </div>
            <div className="h-5 w-24 shrink-0" />
            <div className="flex w-[560px] shrink-0 items-start">
              <p className={SYN_HEAD}>{tr("HOW MIGHT WE")}</p>
            </div>
            <div className="h-5 w-24 shrink-0" />
            <div className="flex w-[382px] shrink-0 items-start">
              <p className={SYN_HEAD}>{tr("PRINCIPLE")}</p>
            </div>
          </div>
          <div className="h-px w-full bg-[#e5e7eb]" />
        </Reveal>
        {THREADS.map((t) => (
          <Reveal key={t.n} className="vsa-thread w-full" enter={80}>
            <div className="flex w-full items-center py-9">
              <div className="flex w-24 shrink-0 items-start">
                <p className="text-[40px] leading-[1.45] font-semibold whitespace-nowrap text-[#e03]">{t.n}</p>
              </div>
              <div className="flex w-[330px] shrink-0 flex-col items-start gap-3">
                <div className="flex items-start rounded-full px-3.5 py-1.5" style={{ background: t.themeBg }}>
                  <p className="text-[14px] leading-[1.45] font-semibold whitespace-nowrap" style={{ color: t.themeInk }}>
                    {tr(t.theme)}
                  </p>
                </div>
                <p className="w-[306px] text-[16px] leading-[1.45] text-[var(--cmd-text-primary)] italic">{tr(t.heard)}</p>
              </div>
              <Arrow delay={420} />
              <div className="flex w-[560px] shrink-0 flex-col items-start">
                <p className="w-[528px] text-[24px] leading-[1.45] text-[var(--cmd-text-primary)]">{tr(t.hmw)}</p>
              </div>
              <Arrow delay={620} />
              <div className="relative flex w-[382px] shrink-0 flex-col items-start gap-1.5 pl-6">
                <div className="vsa-accent absolute top-0 left-0 w-1 rounded-[2px] bg-[#e03]" style={{ height: t.accent }} />
                <p className="text-[32px] leading-[1.45] font-semibold whitespace-nowrap text-[#e03]">{tr(t.principle)}</p>
                <p className="w-[358px] text-[16px] leading-[1.45] text-[var(--cmd-text-primary)]">{tr(t.body)}</p>
              </div>
            </div>
            <div className="h-px w-full bg-[#e5e7eb]" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Phase 02 — Design System phase band (272:14847)                     */
/* Built locally: research.tsx did not export VopsPhaseBand yet.       */
/* ================================================================== */

/** Glow (272:14849): 18% white disc r316 blurred σ70, re-expressed as a radial gradient (no CSS blur). */
const BAND_GLOW =
  "radial-gradient(circle, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.15) 246px, rgba(255,255,255,0.09) 316px, rgba(255,255,255,0.03) 386px, rgba(255,255,255,0) 466px)";

const BAND_STEPS = [
  ["02.1  Audit", "02.2  Principles", "02.3  Architecture", "02.4  Tokens"],
  ["02.5  Foundations", "02.6  Components", "02.7  vOps layer", "02.8  Governance"],
];

function PhaseSystem() {
  const t = useT();
  return (
    <section id="wd-phase-system" className="relative h-[511px]">
      <Reveal className="absolute inset-0">
        <div
          className="absolute left-1/2 h-[400px] w-[1640px] -translate-x-1/2 overflow-clip rounded-[40px] bg-[#14141a]"
          style={{ top: 99.89, boxShadow: "12px 12px 0 0 #e03" }}
        >
          <div aria-hidden className="pointer-events-none absolute" style={{ right: -297, top: -136.11, width: 912, height: 912, backgroundImage: BAND_GLOW }} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] opacity-[0.24]"
            style={{ backgroundImage: "radial-gradient(circle at 1.05px 1px, #fff 0.8px, transparent 1.2px)", backgroundSize: "25.2308px 24px" }}
          />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap text-white">02</p>
          <div className="absolute left-[520px] flex w-[813px] -translate-y-1/2 flex-col items-start gap-[18px] text-white" style={{ top: "calc(50% + 0.11px)" }}>
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {n}", { n: "02" })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t("Design System phase")}</p>
            <p className="w-[860px] text-[20px] leading-7">{t("From audit to system: VIC for every Viettel IT product, then a vOps layer for mini apps and GenHub.")}</p>
            <div className="flex w-full flex-col items-start gap-2">
              {BAND_STEPS.map((row) => (
                <div key={row[0]} className="flex h-9 w-full items-center gap-2">
                  {row.map((s) => (
                    <div key={s} className="wd-hover flex h-full min-w-px flex-1 items-center rounded-full bg-white px-3 py-1.5">
                      <p className="text-[16px] leading-6 tracking-[-0.2px] whitespace-pre text-[#14141a]">{t(s)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* Principles (278:15062)                                              */
/* ================================================================== */

const PRINCIPLES = [
  { n: "01", title: "Consistent", sub: "Nhất quán", body: "A leave form in vOps and a purchase form in vERP share the same input, validation and status language." },
  { n: "02", title: "Reusable", sub: "Build once, use everywhere", body: "A component ships once in VIC; products consume it from the library, never by copy-paste." },
  { n: "03", title: "Extensible", sub: "Mở rộng được", body: "Product layers like vOps add patterns on top without forking the core." },
  { n: "04", title: "Documented", sub: "Tài liệu hóa", body: "No component is done without anatomy, usage, do/don't and a changelog." },
];

function Principles() {
  const t = useT();
  const lang = useLang();
  return (
    <section id="wd-principles" className="flex flex-col items-start gap-10 px-[156px] pt-[100px]" style={{ minHeight: 558 }}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.2" title="Principles" lead="Four principles, written with product teams, decide every trade-off in VIC." />
      <div className="flex w-full items-stretch gap-5">
        {PRINCIPLES.map((p, i) => {
          // Figma: the first card uses 16 / 12 gaps, the other three 10 / 8.
          const first = i === 0;
          return (
            <Reveal key={p.n} className="flex w-[375px] shrink-0">
              <div className={`wd-hover flex w-full flex-col items-start rounded-[24px] bg-white p-8 ${first ? "gap-4" : "gap-2.5"}`} style={{ boxShadow: CARD_SOFT }}>
                <div className={`flex flex-col items-start whitespace-nowrap ${first ? "gap-3" : "gap-2"}`}>
                  <p className="font-mono text-[16px] leading-[1.4] font-bold text-[#e03]">{p.n}</p>
                  <div className="flex flex-col items-start gap-1 font-semibold">
                    <p className="text-[24px] leading-8 tracking-[-0.7px] text-[#14141a]">{t(p.title)}</p>
                    <p className="text-[16px] leading-[1.5] text-[#6b7280]">{lang === "vi" ? p.title : p.sub}</p>
                  </div>
                </div>
                <p className="w-[311px] text-[16px] leading-6 tracking-[-0.2px] text-[#4b5563]">{t(p.body)}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/** Personas · Journey map · Synthesis · Phase 02 band · Principles (Figma 276:14856 → 278:15062). */
export function VopsSystemA() {
  return (
    <>
      <Personas />
      <Journey />
      <Synthesis />
      <PhaseSystem />
      <Principles />
    </>
  );
}
