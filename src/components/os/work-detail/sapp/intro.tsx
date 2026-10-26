"use client";
/* eslint-disable @next/next/no-img-element -- static Figma exports, sized exactly; next/image adds nothing here. */

import { useT } from "@/lib/i18n";
import { sappBeVietnam, sappInter } from "./fonts";
import type { CSSProperties } from "react";
import { SappEyebrow, SappHeading } from "./parts";
import { HeroFit } from "../shell";

/* Figma "Design overall process" cards use Be Vietnam; the cursor tag uses Inter. */
const beVietnam = sappBeVietnam;
const inter = sappInter;

const A = "/figma/sapp/intro";
const MONO = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap";

/* ───────────────────────── Hero (247:14581) ───────────────────────── */

const HERO_FACTS: { label: string; lines: string[] }[] = [
  { label: "Position:", lines: ["Product Designer", "Graphic Designer", "Animator"] },
  { label: "Target:", lines: ["ACCA, CFA, CMA", "student"] },
  { label: "Platform:", lines: ["Website App"] },
  { label: "Status:", lines: ["Publishing", "Maintaining"] },
];

export function SappHero() {
  const t = useT();
  return (
    <section id="wd-overview-hero" className="relative p-8">
      <HeroFit className="overflow-hidden rounded-[50px]" backdropStyle={{ backgroundImage: `url(${A}/hero-blobs.webp)` }}>
        {/* IMG/hero_blobs */}
        <img src={`${A}/hero-blobs.webp`} alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        {/* IMG/logo4x */}
        <img
          src={`${A}/logo.png`}
          alt="SAPP — Advance your career"
          className="absolute top-[190px] left-1/2 h-[238px] w-[485px] max-w-none -translate-x-1/2 object-cover"
        />
        {/* Facts card */}
        <div className="absolute top-[610px] left-1/2 w-[846px] -translate-x-1/2">
          <div className="wd-hover flex items-start justify-between rounded-[24px] bg-[rgba(255,255,255,0.5)] px-8 py-6 text-[#404041] shadow-[0_4.178px_17.34px_0_rgba(0,0,0,0.15)]">
            {HERO_FACTS.map((f) => (
              <div key={f.label} className="flex shrink-0 flex-col items-start gap-2 whitespace-nowrap">
                <p className="text-[24px] leading-8 font-bold">{t(f.label)}</p>
                <div className="text-base leading-6">
                  {f.lines.map((l) => (
                    <p key={l}>{t(l)}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </HeroFit>
    </section>
  );
}

/* ──────────────────── Process Highlight / Overview (247:14598) ──────────────────── */


/** Logo/Figma: dark 3D tile, built in CSS (64px). */
function FigmaTile() {
  return (
    <div
      className="relative size-14 shrink-0 rounded-[12px] bg-gradient-to-b from-[#2c3445] to-[#1c2230]"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(3,5,15,0.15), inset 0 -3.75px 6.75px 0 rgba(3,5,15,0.35), inset 0 0.75px 0.75px 0 rgba(255,255,255,0.08), inset 0 -1.125px 0.75px 0 rgba(255,255,255,0.22)",
      }}
    >
      <div className="absolute inset-[17.19%_28.41%_17.71%_28.13%]">
        <img src={`${A}/figma-glyph.svg`} alt="Figma" className="absolute inset-[-3.51%_-10.51%_-10.53%_-10.51%] block size-auto max-w-none" />
      </div>
    </div>
  );
}

function SvgTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-14 shrink-0">
      <img src={src} alt={alt} className="absolute block max-w-none" style={{ left: -16, top: -12, width: 88, height: 88 }} />
    </div>
  );
}

/* Bento v2 (636:29374): challenge → opportunity row, then one white facts card with four columns. */
const OV_LABEL = `${MONO} text-[var(--cmd-text-secondary)]`;
const OV_LIST = "flex w-full flex-col items-start gap-1.5 text-[20px] leading-[30px] tracking-[-0.1px] text-[var(--cmd-text-primary)]";
const OV_COL = "flex min-w-px flex-1 flex-col items-start gap-5 self-stretch px-9 pt-8 pb-9";
const OV_RULE = "border-l border-solid border-[rgba(10,10,15,0.08)]";

function OverviewStatement({ kicker, dot, title, body, className }: { kicker: string; dot: string; title: string; body: string; className: string }) {
  const t = useT();
  return (
    <div className={`flex min-w-px flex-1 flex-col items-start gap-5 py-2 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="size-2 shrink-0 rounded-full" style={{ background: dot }} />
        <p className={OV_LABEL}>{t(kicker)}</p>
      </div>
      <p className="w-full text-[36px] leading-[44px] font-semibold tracking-[-0.72px] text-[var(--cmd-text-primary)]">{t(title)}</p>
      <p className="w-full text-[22px] leading-[34px] tracking-[-0.11px] text-[var(--cmd-text-secondary)]">{t(body)}</p>
    </div>
  );
}

export function SappProcessHighlight() {
  const t = useT();
  return (
    <section id="wd-overview" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <div className="flex flex-col items-start gap-4">
        <SappEyebrow label={t("PROCESS HIGHLIGHT")} />
        <SappHeading>{t("Overview")}</SappHeading>
      </div>
      <div className="flex w-full flex-col items-start gap-14 pb-2">
        <div className="flex w-full items-start">
          <OverviewStatement
            className="pr-14"
            kicker="01 — CHALLENGE"
            dot="#b8bcc6"
            title="Design a complex LMS platform"
            body="Support students, teachers and operations across online learning, testing, scheduling and progress tracking."
          />
          <div className="flex w-16 shrink-0 flex-col items-center gap-3 self-stretch">
            <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-solid border-[rgba(10,10,15,0.08)] bg-white shadow-[0_4px_14px_0_rgba(10,10,15,0.08)]">
              <img src={`${A}/ov-arrow.svg`} alt="" className="block size-6" />
            </div>
            <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
          </div>
          <OverviewStatement
            className="pl-14"
            kicker="02 — OPPORTUNITY"
            dot="#f5a300"
            title="One seamless learning ecosystem"
            body="Help students manage courses, track progress, take tests and stay connected with teachers and support teams."
          />
        </div>
        <div className="wd-hover relative flex w-full items-start overflow-hidden rounded-[28px] bg-white shadow-[6px_6px_0_0_var(--sapp-back),inset_0_1px_0_0_var(--cmd-edge)]">
          <div className={OV_COL}>
            <p className={OV_LABEL}>{t("TIMELINE")}</p>
            <div className="flex w-full flex-col items-start gap-1">
              <p className="w-full text-[26px] leading-[34px] font-semibold tracking-[-0.52px] text-[var(--cmd-text-primary)]">{t("March 2025")}</p>
              <p className="w-full text-[20px] leading-[30px] tracking-[-0.1px] text-[var(--cmd-text-secondary)]">{t("→ January 2026")}</p>
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("DISCIPLINES")}</p>
            <div className={OV_LIST}>
              {["User Experience Design", "User Interface Design", "Usability Testing"].map((x) => <p key={x} className="w-full">{t(x)}</p>)}
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("RESPONSIBILITIES")}</p>
            <div className={OV_LIST}>
              {["UX Research", "Sketching", "UI Design", "Prototyping", "Design System Application"].map((x) => <p key={x} className="w-full">{t(x)}</p>)}
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("TOOLS USING")}</p>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2.5">
                <FigmaTile />
                <SvgTile src={`${A}/ov-ai.svg`} alt="Adobe Illustrator" />
                <SvgTile src={`${A}/ov-ps.svg`} alt="Adobe Photoshop" />
              </div>
              <div className="flex items-start gap-2.5">
                <img src={`${A}/tool-lottie.png`} alt="LottieFiles" className="block size-14 shrink-0 object-cover" />
                <img src={`${A}/tool-confluence.png`} alt="Confluence" className="block h-[54px] w-14 shrink-0 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Our Vision (247:14649) ───────────────────────── */

export function SappVision() {
  const t = useT();
  return (
    <section id="wd-vision" className="relative flex flex-col items-start px-[156px] pt-40">
      {/* Decorative group 247:14650 — overflows the section bottom on purpose (not clipped). */}
      <img
        src={`${A}/vision-deco.svg`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[62px] left-[876px] block h-[709.534px] w-[950px] max-w-none"
      />
      <div className="relative flex w-full items-center justify-between pl-20">
        <img src={`${A}/logo.png`} alt="SAPP — Advance your career" className="h-[226px] w-[457px] max-w-none shrink-0 object-cover" />
        <div className="flex shrink-0 flex-col items-start gap-10">
          <SappEyebrow label={t("BACKGROUND · OUR VISION")} />
          <p className="w-[797px] text-[44px] leading-[56px] tracking-[-1.1px]">
            <span className="text-[#8a8f98]">
              {t("At SAPP Academy, LMS Pro was envisioned as one learning platform connecting students, teachers and operation teams.")}{" "}
            </span>
            <span className="text-[#0a0a0a]">
              {t("By centralizing learning activities and data, it makes online and hybrid education more structured, scalable and efficient.")}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Design Process (247:14660) ───────────────────────── */

type Step = { title: string; items: string[]; left: number; top: number; width: number; centerHead?: boolean };

const STEPS: Step[] = [
  {
    title: "Requirement Intake",
    items: ["Receive documents from BA", "Review user stories, business rules", "Identify product scope, user roles, and key objectives"],
    left: 107,
    top: 0,
    width: 259,
    centerHead: true,
  },
  {
    title: "Requirement Clarification",
    items: ["Identify unclear logic, missing information", "Clarify permissions, edge cases, and business constraints", "Align with BA/PM before starting design"],
    left: 89,
    top: 308,
    width: 296,
  },
  {
    title: "User Flow Mapping",
    items: ["Define main user journeys and entry points", "Map key actions, decision points, and outcomes", "Cover happy paths, alternative paths, and exception cases"],
    left: 562,
    top: 75,
    width: 303,
  },
  {
    title: "Review & Iteration",
    items: [
      "Review designs with BA, PM, Dev, and stakeholders",
      "Collect feedback on UX logic, UI consistency, and feasibility",
      "Refine screens, flows, states, and interaction details",
    ],
    left: 1092,
    top: 409,
    width: 277,
  },
  {
    title: "Wireframe & UI Design",
    items: [
      "Create low-fidelity layouts and content structure (Optional)",
      "Organize information hierarchy and navigation",
      "Apply design system components to build high-fidelity UI",
    ],
    left: 1092,
    top: 29,
    width: 277,
  },
  {
    title: " Screen & State Planning",
    items: [
      "List all required screens for the product feature",
      "Define default, empty, loading, error, and success states",
      "Identify modals, confirmations, notifications, and permission cases",
    ],
    left: 558,
    top: 409,
    width: 317,
  },
];

/** Centers of the 14px connector nodes (Ellipse 2832), canvas coords. */
const NODES: [number, number][] = [
  [237, 215],
  [237, 309],
  [717, 409],
  [1231, 409],
  [385, 425],
  [563, 192],
  [717, 307],
  [1231, 282],
  [875, 526],
  [1093, 146],
];

function StepCard({ s }: { s: Step }) {
  const t = useT();
  return (
    <div
      className={`wd-hover absolute flex flex-col items-start gap-4 rounded-[16px] bg-white p-4 shadow-[inset_0_0_0_1px_#e9e9e9,0_4px_8px_0_rgba(0,0,0,0.1)]`}
      style={{ left: s.left, top: s.top, width: s.width }}
    >
      <div className={`flex items-center gap-4 ${s.centerHead ? "w-full justify-center" : ""}`}>
        <div className="relative h-6 w-[23px] shrink-0 overflow-hidden">
          <img src={`${A}/step-icon.png`} alt="" className="absolute top-[-17.86%] left-[-24.07%] h-[142.86%] w-[148.15%] max-w-none" />
        </div>
        <p className={`text-[18px] leading-[1.5] font-bold tracking-[-0.02em] whitespace-pre text-[#3a3a3a] ${s.centerHead ? "min-w-px flex-1" : ""}`}>{t(s.title)}</p>
      </div>
      <div className="h-px w-full shrink-0 bg-[#c5c5c5]" />
      <ul className="flex w-full flex-col gap-2 text-[14px] leading-[1.5] text-[#1b1b1b]">
        {s.items.map((x) => (
          <li key={x} className="ms-[21px] list-disc">
            {t(x)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SappDesignProcess() {
  const t = useT();
  return (
    <section id="wd-process" className="relative flex flex-col items-center justify-center gap-12 px-[156px] pt-40">
      <div className="flex w-full flex-col items-center justify-center gap-[22px]">
        <h2 className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">
          <span className="text-[#f5a300]">{t("Design overall ")}</span>
          <span className="text-[#8a8f98]">{t("process")}</span>
        </h2>
        <p className="w-[670px] text-center text-[22px] leading-[34px] tracking-[-0.11px] text-[var(--cmd-text-secondary)]">
          {t("From BA documents to reviewed UI — six steps that kept a complex LMS consistent, complete and ready to hand off.")}
        </p>
      </div>
      <div className={`relative h-[688px] w-full shrink-0 ${beVietnam.className}`}>
        {STEPS.map((s) => (
          <StepCard key={s.title} s={s} />
        ))}
        {/* Connectors: straight lines, elbow vectors and nodes, drawn above the cards as in Figma. */}
        <svg className="pointer-events-none absolute top-0 left-0" width={1560} height={688} viewBox="0 0 1560 688" fill="none" aria-hidden>
          <g stroke="#FFB700" strokeWidth={2}>
            <path d="M237 220V310" />
            <path d="M717 308V408" />
            <path d="M1231 286V408" />
            <path
              transform="translate(383.5 191)"
              d="M0 234H58.3645C69.4102 234 78.3645 225.046 78.3645 214V21C78.3645 9.9543 87.3189 1 98.3645 1H174.5"
            />
            <path
              transform="translate(873 145)"
              d="M0 381H75.5418C86.5875 381 95.5418 372.046 95.5418 361V21C95.5418 9.9543 104.496 1 115.542 1H219"
            />
          </g>
          <g fill="#fff" stroke="#F8BC29" strokeWidth={2}>
            {NODES.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={6} />
            ))}
          </g>
        </svg>
        {/* Cursor + "This is me" comment */}
        <div className="pointer-events-none absolute top-[269px] left-[1294px] flex size-[26px] items-center justify-center">
          <div className="relative h-[19.411px] w-[17.498px] rotate-[-39.74deg]">
            <img src={`${A}/cursor.svg`} alt="" className="absolute inset-[-2.92%_-12.07%_-16.69%_-12.07%] block max-w-none" style={{ width: "124.14%", height: "119.61%" }} />
          </div>
        </div>
        <div className={`absolute top-[291px] left-[1316px] flex items-start rounded-[24px] bg-[#039855] px-4 py-2 shadow-[inset_0_0_0_2px_#039855] ${inter.className}`}>
          <p className="text-base leading-6 font-medium whitespace-nowrap text-white">{t("This is me")}</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Phase bands (247:14741 / 14852 / 15313 / 15924) ───────────────────────── */

type Glow = { left: number; top: number; size: number; gradient: string };

/* Blurred 18% white discs, re-expressed as radial gradients (no CSS blur). */
const GLOW_WIDE =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.108) 0%, rgba(255,255,255,0.098) 20%, rgba(255,255,255,0.075) 40%, rgba(255,255,255,0.04) 63%, rgba(255,255,255,0.012) 85%, rgba(255,255,255,0) 100%)";
const glowTight = (r: number) =>
  `radial-gradient(circle, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.15) ${r - 70}px, rgba(255,255,255,0.09) ${r}px, rgba(255,255,255,0.03) ${r + 70}px, rgba(255,255,255,0) ${r + 150}px)`;

type PhaseProps = {
  id: string;
  num: string;
  title: string;
  lead: string;
  steps: string[];
  phase: "research" | "system" | "ui" | "test";
  /** Text color on the band (white, or the ink token on the light-green UI band). */
  text: string;
  dotOpacity: number;
  glow: Glow;
};

function PhaseBand({ id, num, title, lead, steps, phase, text, dotOpacity, glow }: PhaseProps) {
  const t = useT();
  const solid = `var(--sapp-${phase}-solid)`;
  const deep = `var(--sapp-${phase}-deep)`;
  const ink = `var(--sapp-${phase}-ink)`;
  const dotGrid: CSSProperties = {
    opacity: dotOpacity,
    backgroundImage: `radial-gradient(circle at 1.05px 1px, ${deep} 0.75px, transparent 1.15px)`,
    backgroundSize: "25.2308px 24px",
  };
  return (
    <section id={id} className="relative h-[500px]">
      <div
        className="absolute top-[100px] left-1/2 h-[400px] w-[1640px] -translate-x-1/2 overflow-clip rounded-[40px]"
        style={{ background: solid, boxShadow: `12px 12px 0 0 ${deep}` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: glow.left, top: glow.top, width: glow.size, height: glow.size, backgroundImage: glow.gradient }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply" style={dotGrid} />
        <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap" style={{ color: text }}>
          {num}
        </p>
        <div className="absolute top-1/2 left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px]" style={{ color: text }}>
          <p className={MONO}>{t("PHASE {num}", { num })}</p>
          <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t(title)}</p>
          <p className="w-[860px] text-[22px] leading-[34px] tracking-[-0.11px]">{t(lead)}</p>
          <div className="flex w-[900px] flex-wrap content-start items-start gap-2">
            {steps.map((s) => (
              <span
                key={s}
                className="wd-hover flex items-center rounded-full bg-white px-3 py-1.5 text-base leading-6 tracking-[-0.2px] whitespace-pre"
                style={{ color: ink }}
              >
                {t(s)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SappPhaseResearch() {
  return (
    <PhaseBand
      id="wd-phase-1"
      num="01"
      phase="research"
      title="Research phase"
      lead="Before pixels: who are ACCA, CFA and CMA learners, and where does the current learning experience break down?"
      steps={["01.1  Initial problem", "01.2  Proto-persona", "01.3  Heuristic evaluation"]}
      text="#fff"
      dotOpacity={0.3}
      glow={{ left: 823, top: -306, size: 1273, gradient: GLOW_WIDE }}
    />
  );
}

export function SappPhaseSystem() {
  return (
    <PhaseBand
      id="wd-phase-2"
      num="02"
      phase="system"
      title="Design System phase"
      lead="From insight to structure: shape the solution, map every learning flow, then lock the visual language into the LMS design system."
      steps={["02.1  Design solution", "02.2  User flow", "02.3  Design system", "02.4  Design anatomy"]}
      text="#fff"
      dotOpacity={0.4}
      glow={{ left: 1025, top: -136, size: 912, gradient: glowTight(316) }}
    />
  );
}

export function SappPhaseUi() {
  return (
    <PhaseBand
      id="wd-phase-3"
      num="03"
      phase="ui"
      title="UI Design phase"
      lead="The release: seven learning flows built on the system, polished with micro interactions that answer every user action."
      steps={["03.1  UI for launch", "03.2  Micro interaction"]}
      text="var(--sapp-ui-ink)"
      dotOpacity={1}
      glow={{ left: 929, top: -169, size: 902, gradient: glowTight(311) }}
    />
  );
}

export function SappPhaseTesting() {
  return (
    <PhaseBand
      id="wd-phase-4"
      num="04"
      phase="test"
      title="Usability Testing phase"
      lead="Proof over opinion: real learners complete the core LMS flows while we measure completion, efficiency and satisfaction — then weight every issue to prioritise fixes."
      steps={["04.1  Usability testing", "04.2  Related projects"]}
      text="#fff"
      dotOpacity={1}
      glow={{ left: 929, top: -169, size: 902, gradient: glowTight(311) }}
    />
  );
}

/* ───────────────────────── Initial Problem (247:14757) ───────────────────────── */

export function SappInitialProblem() {
  const t = useT();
  return (
    <section id="wd-problem" className="relative flex flex-col items-start px-[156px] pt-[140px]">
      <div className="flex w-full items-center justify-between px-20">
        <div className="flex w-[683px] shrink-0 flex-col items-start gap-6">
          <SappEyebrow label={t("RESEARCH  ·  01.1")} />
          <SappHeading>{t("Initial problem")}</SappHeading>
          <p className="text-base leading-6 text-[var(--cmd-text-primary)]">
            {t("As SAPP Academy expanded its online and hybrid learning programs, the existing learning experience became increasingly fragmented. Students needed a clearer way to access courses, track progress, complete tests, view schedules, and receive timely updates, while teachers and operation teams needed better tools to manage classes, teaching progress, requests, and student data.")}
          </p>
          <p className="text-base leading-6 text-[var(--cmd-text-primary)]">
            {t("The challenge was to design a unified LMS experience that could support complex learning journeys, reduce manual coordination, and make the entire education process more structured, transparent, and scalable.")}
          </p>
        </div>
        <img src={`${A}/ipad.webp`} alt={t("SAPP LMS activity screen on iPad")} className="h-[483px] w-[630px] max-w-none shrink-0 object-cover" />
      </div>
    </section>
  );
}
