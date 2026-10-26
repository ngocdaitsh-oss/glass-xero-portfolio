"use client";
/* eslint-disable @next/next/no-img-element -- Figma exports keep their measured size; large figures lazy-load. */

import "./testing.css";
import type { CSSProperties, ReactNode } from "react";
import { sappBeVietnam, sappFira } from "./fonts";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { SappEyebrow, SappHeading } from "./parts";

/* Figma "Section — Usability Testing" (247:15938) + "Case End" (247:16107). */

const beVietnam = sappBeVietnam;
const firaSans = sappFira;

const A = "/figma/sapp/testing";
const OFFSET = "shadow-[6px_6px_0_0_var(--sapp-back),inset_0_1px_0_0_var(--cmd-edge)]";
const RING = "linear-gradient(270deg, #ffd017 0%, #ffa20a 44.2988%)";

const vi = (i: number) => ({ "--i": i }) as CSSProperties;

/* ---------- shared bits ---------- */

function SubHead({ title, children, center = false, width }: { title: string; children: ReactNode; center?: boolean; width?: number }) {
  const t = useT();
  return (
    <div className={`flex flex-col gap-[14px] ${center ? "items-center text-center" : "items-start"}`} style={width ? { width } : undefined}>
      <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[var(--brand-sapp)]">{t(title)}</p>
      {children}
    </div>
  );
}

function Lead({ children, width }: { children: ReactNode; width?: number }) {
  return (
    <p className="text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]" style={width ? { width } : undefined}>
      {children}
    </p>
  );
}

function BlockHead({ kicker, kickerClass, title, lead, width }: { kicker: string; kickerClass: string; title: string; lead: string; width: number }) {
  const t = useT();
  return (
    <div className="flex flex-col items-start gap-2.5" style={{ width }}>
      <p className={`font-mono font-bold whitespace-nowrap text-[#e68200] ${kickerClass}`}>{t(kicker)}</p>
      <p className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap text-[#0a0a0a]">{t(title)}</p>
      <p className="text-base leading-6 tracking-[-0.2px] text-[#4b5563]">{t(lead)}</p>
    </div>
  );
}

function FlowName({ dot, name, width }: { dot: string; name: string; width: number }) {
  const t = useT();
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-2.5 shrink-0 rounded-[5px]" style={{ background: dot }} />
      <p className="text-base leading-6 tracking-[-0.2px] text-[#1f2937]" style={{ width }}>
        {t(name)}
      </p>
    </div>
  );
}

/** Flow category dots (Figma table legend colours). */
const DOT = {
  act: "#2fbf71",
  quiz: "#22aaff",
  result: "#e45bd0",
  lesson: "#f5b400",
  login: "#ff9f5a",
  cal: "#7cbf3a",
  dash: "#5b8def",
  res: "#f06a5d",
} as const;
type Cat = keyof typeof DOT;

/* ---------- Head ---------- */

const PILLARS = [
  { left: 0, top: 81.78, h: 553.225, bg: "linear-gradient(180deg, #fff 57.254%, #f7f7f7 93.166%)", icon: "ic-continue.webp", ix: 20.5, iy: 20.14, iw: 56.745, ih: 56.745, i: 0 },
  { left: 192.43, top: 279.02, h: 333.539, bg: "linear-gradient(180deg, #fff 0%, #f7f7f7 99.681%)", icon: "ic-learn.webp", ix: 12.03, iy: 11.22, iw: 73.763, ih: 74.565, i: 1 },
  { left: 379.24, top: 0, h: 625.385, bg: "linear-gradient(180deg, #fff 50%, #f7f7f7 96.973%)", icon: "ic-quiz.webp", ix: 15.23, iy: 14.43, iw: 67.349, ih: 68.151, i: 2 },
];

function Head() {
  const t = useT();
  return (
    <div className="flex w-[1400px] items-center justify-between">
      <Reveal className="flex w-[601px] flex-col items-start gap-[22px]">
        <div className="flex flex-col items-start gap-4">
          <SappEyebrow label={t("TESTING  ·  04.1")} phase="test" />
          <SappHeading>{t("Usability testing")}</SappHeading>
        </div>
        <p className="text-base leading-6 text-[var(--cmd-text-secondary)]">
          {t("Usability testing evaluated how easily learners could understand and complete key tasks on LMS Pro. Different learner groups — including the proto-personas — completed core flows while we observed behaviour, completion level, friction points and task difficulty.")}
        </p>
      </Reveal>
      <Reveal className="relative h-[635px] w-[542px] shrink-0">
        {PILLARS.map((p) => (
          <div key={p.icon} className="wd-hover absolute w-[162.76px]" style={{ left: p.left, top: p.top, height: p.h }}>
            <div className="ut-y absolute inset-0 rounded-[40.891px]" style={{ background: p.bg, ...vi(p.i) }} />
            <div className="ut-pop absolute top-[32.87px] left-[32.87px] size-[97.015px] rounded-full" style={{ background: RING, ...vi(p.i + 2) }}>
              <img alt="" src={`${A}/${p.icon}`} className="absolute max-w-none object-cover" style={{ left: p.ix, top: p.iy, width: p.iw, height: p.ih }} />
            </div>
            <div className="ut-fade absolute top-[166.77px] left-[80.98px] h-[100.222px] w-0" style={vi(p.i * 3 + 8)}>
              <div className="absolute top-[50.111px] left-[-50.111px] h-0 w-[100.222px] -rotate-90">
                <img alt="" src={`${A}/head-line.svg`} className="absolute top-[-11.81px] bottom-[-11.81px] left-0 right-[-1.6%] max-w-none" />
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

/* ---------- Testing methods ---------- */

const SATS = [
  { left: -0.55, top: 6.33, white: [75.05, 75.05], img: "tm-moderated.webp", ix: 35.55, iy: 33.97, iw: 74.26, ih: 74.26, i: 1 },
  { left: 697.81, top: 6.33, white: [75.05, 75.05], img: "tm-thinkaloud.webp", ix: 20.54, iy: 30.02, iw: 108.823, ih: 87.058, i: 2 },
  { left: -0.55, top: 235.43, white: [75.05, 77.4], img: "tm-retro.webp", ix: 37.13, iy: 35.55, iw: 79, ih: 79, i: 3 },
  { left: 697.81, top: 235.43, white: [75.05, 75.05], img: "tm-pilot.webp", ix: 23.7, iy: 29.23, iw: 102.592, ih: 90.946, i: 4 },
];

const LINES = [
  { left: 145.6, top: 100.34, w: 115.34, h: 33.18, len: 120.018, rot: 16.05, src: "tm-line-tl.svg" },
  { left: 587.21, top: 90.07, w: 111.39, h: 43.45, len: 119.564, rot: -21.31, src: "tm-line-tr.svg" },
  { left: 147.18, top: 259.92, w: 116.13, h: 56.09, len: 128.966, rot: 154.22, src: "tm-line-bl.svg" },
  { left: 584.05, top: 259.92, w: 114.55, h: 43.45, len: 122.514, rot: -159.23, src: "tm-line-br.svg" },
];

const METHOD_LABELS = [
  { text: "Primary method: Moderated Usability Testing", right: true, x: 258, top: 57.36, w: 226 },
  { text: "Supplementary support method: Retrospective Think-Aloud", right: true, x: 258, top: 292.36, w: 295 },
  { text: "Supplementary support method: Think-Aloud Protocol", right: false, x: 1144, top: 56.36, w: 247 },
  { text: "Supplementary support method: Pilot testing", right: false, x: 1144, top: 286.36, w: 197 },
];

function TestingMethods() {
  const t = useT();
  return (
    <div className="flex w-[1391px] flex-col items-center gap-8">
      <Reveal>
        <SubHead title="Testing methods" center>
          <Lead width={720}>
            {t("Task-based testing with real LMS Pro learners from different study formats, including the target proto-personas. Primary method: moderated usability testing — supported by think-aloud, retrospective think-aloud and pilot testing.")}
          </Lead>
        </SubHead>
      </Reveal>
      <Reveal className="relative h-[499px] w-[1391px]">
        <div className="absolute top-[0.36px] left-[277.32px] h-[499px] w-[847.359px] overflow-hidden">
          <img alt="" src={`${A}/tm-dots.webp`} loading="lazy" decoding="async" className="absolute top-[-97px] left-[-0.32px] h-[636px] w-[848px] max-w-none object-cover opacity-[0.13] mix-blend-color-burn" />
          {/* Hub */}
          <div className="wd-hover absolute top-[16.6px] left-[248.3px] size-[350.76px] rounded-full">
            <div className="ut-pop absolute inset-0 rounded-full shadow-[inset_0_0_0_3.16px_#ffb700]" style={vi(0)} />
            <div className="absolute top-[25.28px] left-[25.28px] size-[300.2px] rounded-full bg-[#fdfdfd] shadow-[0_13.43px_66.52px_0_rgba(0,0,0,0.12)]" />
            <img alt="" src={`${A}/tm-lms.webp`} className="ut-pop absolute top-[80.58px] left-[80.58px] size-[189.6px] max-w-none object-cover" style={vi(1)} />
          </div>
          {LINES.map((l, i) => (
            <div key={l.src} className="ut-fade absolute flex items-center justify-center" style={{ left: l.left, top: l.top, width: l.w, height: l.h, ...vi(i * 3 + 6) }}>
              <img alt="" src={`${A}/${l.src}`} className="h-[18.244px] max-w-none flex-none" style={{ width: l.len, transform: `rotate(${l.rot}deg)` }} />
            </div>
          ))}
          {SATS.map((s) => (
            <div key={s.img} className="ut-pop absolute size-[150.1px]" style={{ left: s.left, top: s.top, ...vi(s.i) }}>
              <div className="wd-hover relative size-full rounded-full">
                <div
                  className="absolute size-[121.66px] rounded-full bg-[#fdfdfd] shadow-[0_3.16px_66.36px_0_rgba(0,0,0,0.02)]"
                  style={{ left: s.white[0] - 60.83, top: s.white[1] - 60.83 }}
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_3.16px_#ffb700,0_3.16px_66.36px_0_rgba(0,0,0,0.02)]" />
                <img alt="" src={`${A}/${s.img}`} className="absolute max-w-none object-cover" style={{ left: s.ix, top: s.iy, width: s.iw, height: s.ih }} />
              </div>
            </div>
          ))}
          <div className="ut-fade absolute top-[404.49px] left-[285.03px] flex h-[94.845px] w-[276.507px] flex-col items-center gap-[15px]" style={vi(10)}>
            <img alt="SAPP" src={`${A}/tm-sapp-logo.webp`} className="h-[43.507px] w-[87.17px] max-w-none object-cover" />
            <p className={`${firaSans.className} text-[24.37px] leading-[1.5] font-semibold whitespace-nowrap text-[#474464]`}>{t("LMS Pro version 2")}</p>
          </div>
        </div>
        {METHOD_LABELS.map((m, i) => (
          <p
            key={m.text}
            className={`${beVietnam.className} ut-fade absolute text-base leading-[1.5] font-semibold text-[#474464] ${m.right ? "-translate-x-full text-right" : ""}`}
            style={{ left: m.x, top: m.top, width: m.w, ...vi(i + 4) }}
          >
            {t(m.text)}
          </p>
        ))}
      </Reveal>
    </div>
  );
}

/* ---------- Task scope ---------- */

const SCOPE_CIRCLES = [
  { left: 28.7, src: "ic-login.webp", box: { left: "-0.23%", top: "3.53%", width: "94.36%", height: "94.36%" } },
  { left: 258.01, src: "ic-continue.webp", box: { left: 16.07, top: 15.79, width: 44.484, height: 44.484 } },
  { left: 487.32, src: "ic-activity.webp", box: { left: 7.75, top: 7.89, width: 60.269, height: 60.269 } },
  { left: 717, src: "ic-learn.webp", box: { left: 6.95, top: 7.17, width: 61.704, height: 61.704 } },
  { left: 945.94, src: "ic-quiz.webp", box: { left: 10.47, top: 10.76, width: 54.529, height: 54.529 } },
  { left: 1175.25, src: "ic-calendar.webp", box: { left: 18.66, top: 18.65, width: 38.744, height: 38.744 } },
];

const SCOPE_ITEMS: { n: string; label: string | readonly [string, string]; left: number; top: number }[] = [
  { n: "01", label: "Log in and access to learning account.", left: 0, top: 0 },
  { n: "02", label: "Ability to start and continue learning on the LMS", left: 218, top: 289 },
  {
    n: "03",
    label: ["Learning capability", "on Learning Activity"],
    left: 458,
    top: 0,
  },
  { n: "04", label: "Ability to use learning support tools", left: 677, top: 289 },
  { n: "05", label: "Ability to search for & take quizzes/tests", left: 917, top: 0 },
  { n: "06", label: "Track your class schedule and progress", left: 1146, top: 289 },
];

function TaskScope() {
  const t = useT();
  return (
    <div className="flex w-[1326px] flex-col items-center gap-8">
      <Reveal>
        <SubHead title="Task scope" center width={528}>
          <Lead>
            {t("Tasks follow key workflows in the learner's journey on LMS Pro — the frequent touchpoints that directly impact starting a course, continuing studies and managing personal schedules.")}
          </Lead>
        </SubHead>
      </Reveal>
      <Reveal className="relative h-[417px] w-[1326px]">
        <div className="absolute top-[136px] left-3 h-[121.256px] w-[1280px]">
          <div className="ut-x absolute inset-0 rounded-[20px] bg-[#ffefdd]" style={vi(0)} />
          <img alt="" src={`${A}/scope-dash.svg`} className="ut-x absolute top-[57.99px] left-[71.03px] h-[3px] w-[1146.547px] max-w-none" style={vi(6)} />
          {SCOPE_CIRCLES.map((c, i) => (
            <div key={c.src} className="ut-pop absolute top-[22.96px] size-[76.054px]" style={{ left: c.left, ...vi(i + 2) }}>
              <div className="wd-hover relative size-full overflow-hidden rounded-full" style={{ background: RING }}>
                <img alt="" src={`${A}/${c.src}`} className="absolute max-w-none object-cover" style={c.box} />
              </div>
            </div>
          ))}
        </div>
        {SCOPE_ITEMS.map((it, i) => (
          <div
            key={it.n}
            className={`${beVietnam.className} ut-fade absolute flex w-[180px] flex-col items-center gap-2 text-center leading-[1.5]`}
            style={{ left: it.left, top: it.top, ...vi(i * 2 + 4) }}
          >
            <p
              className="w-full bg-clip-text text-[32px] font-bold text-transparent"
              style={{ backgroundImage: "linear-gradient(-90deg, #ffd017 0%, #ffa20a 44.299%)" }}
            >
              {it.n}
            </p>
            <p className="w-full text-base font-semibold text-[#1b1b1b]">
              {typeof it.label === "string" ? (
                t(it.label)
              ) : (
                <>
                  {t(it.label[0])}
                  <br />
                  {t(it.label[1])}
                </>
              )}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

/* ---------- KPI & weighting (raster figures) ---------- */

function KpiMetric() {
  const t = useT();
  return (
    <div className="flex w-[1240px] items-center gap-20">
      <Reveal>
        <SubHead title="KPI & metric">
          <Lead width={460}>{t("Usability is evaluated through three categories of metrics: effectiveness, efficiency and user satisfaction.")}</Lead>
          <Lead width={460}>
            {t("They measure whether learners complete tasks, how long actions take, what difficulties appear and how users feel afterwards — so the team can prioritise improvements and optimise the learning experience.")}
          </Lead>
        </SubHead>
      </Reveal>
      <Reveal className="shrink-0">
        <img
          alt={t("Usability KPI map: completion, efficiency and satisfaction metrics")}
          src={`${A}/ut-kpi.webp`}
          loading="lazy"
          decoding="async"
          className="block h-[477px] w-[700px] max-w-none object-cover"
        />
      </Reveal>
    </div>
  );
}

function TaskWeighting() {
  const t = useT();
  return (
    <div className="flex w-[1400px] items-center justify-between px-10">
      <Reveal className="shrink-0">
        <img
          alt={t("Pain point groups: navigation, learning comprehension, feature value")}
          src={`${A}/ut-pain.webp`}
          loading="lazy"
          decoding="async"
          className="block h-[478px] w-[640px] max-w-none object-cover"
        />
      </Reveal>
      <Reveal>
        <SubHead title="Task weighting formula">
          <Lead width={460}>
            {t("Task weight assesses the severity of each issue found during testing, based on level of impact, frequency of occurrence and the user's ability to resolve it independently.")}
          </Lead>
          <Lead width={460}>
            {t("High-weight issues are prioritised — especially when they cause significant time loss, hide key functions or stop users from completing tasks.")}
          </Lead>
        </SubHead>
      </Reveal>
    </div>
  );
}

const WEIGHTS = [
  { pct: "25%", title: "Task Criticality", q: "Is this flow important to the user's main goal?" },
  { pct: "25%", title: "Business Impact", q: "Does the flow have a significant impact on the business?" },
  { pct: "20%", title: "Frequency of use", q: "Do users use this flow frequently?" },
  { pct: "15%", title: "Risk if failed", q: "If the user fails here, will it have a significant impact?" },
  { pct: "15%", title: "Dependency in journey", q: "Where does this flow fit into the journey, and does it affect the subsequent flow?" },
];

function WeightCircle({ w, i }: { w: (typeof WEIGHTS)[number]; i: number }) {
  const t = useT();
  return (
    <div className="relative size-[324.09px] shrink-0">
      <div className="ut-pop absolute inset-0 rounded-full" style={{ background: "linear-gradient(180deg, #ffefc8 33.5016%, #f7f7f7 75.9615%)", ...vi(i) }} />
      <div className={`${beVietnam.className} absolute top-[84.04px] left-[34.05px] flex w-[255.99px] flex-col items-center gap-2 text-center leading-[1.5]`}>
        <p className="ut-fade w-full text-[50.409px] font-bold text-[#ffb700]" style={vi(i * 3 + 4)}>
          {w.pct}
        </p>
        <div className="ut-fade flex w-full flex-col items-center gap-2 text-[#1b1b1b]" style={vi(i * 3 + 6)}>
          <p className="w-full text-base font-bold">{t(w.title)}</p>
          <p className="w-[218px] text-sm">{t(w.q)}</p>
        </div>
      </div>
    </div>
  );
}

function Weights() {
  const t = useT();
  return (
    <div className="flex w-[1072px] flex-col items-center gap-12">
      <Reveal className="flex w-full flex-col items-center">
        <div className="flex w-full items-center gap-[46px]">
          {WEIGHTS.slice(0, 3).map((w, i) => (
            <WeightCircle key={w.title} w={w} i={i} />
          ))}
        </div>
        <div className="flex items-center gap-[46px]">
          {WEIGHTS.slice(3).map((w, i) => (
            <WeightCircle key={w.title} w={w} i={i + 3} />
          ))}
        </div>
      </Reveal>
      <Reveal>
        <img
          alt={t("Base Flow Importance formula: weighted sum of the five criteria")}
          src={`${A}/ut-formula.webp`}
          loading="lazy"
          decoding="async"
          className="block h-[340px] w-[1072px] max-w-none object-cover"
        />
      </Reveal>
    </div>
  );
}

/* ---------- The full model ---------- */

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#1A1A1C"
        d="M12.0001 2.45C12.2892 2.45016 12.5525 2.61668 12.6768 2.87773L15.2012 8.18926L21.0372 8.95684C21.324 8.99453 21.5641 9.19339 21.6534 9.46855C21.7426 9.74378 21.6653 10.0461 21.4551 10.2449L17.1817 14.284L18.2667 20.0613C18.32 20.3457 18.2055 20.636 17.9718 20.8064C17.7379 20.9767 17.4262 20.9971 17.1719 20.8592L11.9991 18.0525L6.82722 20.8592C6.57306 20.9969 6.26214 20.9765 6.02839 20.8064C5.79469 20.636 5.67916 20.3456 5.73249 20.0613L6.81648 14.284L2.54402 10.2449C2.33408 10.0461 2.2567 9.74364 2.34577 9.46855C2.43497 9.19343 2.67526 8.99465 2.96199 8.95684L8.79695 8.18926L11.3223 2.87773L11.3751 2.78496C11.5126 2.57784 11.7468 2.45012 12.0001 2.45ZM9.97663 9.20195C9.8674 9.43152 9.64959 9.59066 9.39753 9.62383L4.7198 10.2371L8.1446 13.4754C8.32986 13.6506 8.41323 13.9074 8.36628 14.158L7.49714 18.7889L11.6417 16.5408L11.7276 16.5008C11.9315 16.4214 12.1624 16.4351 12.3575 16.5408L16.501 18.7889L15.6329 14.158C15.586 13.9076 15.6695 13.6505 15.8546 13.4754L19.2784 10.2371L14.6016 9.62383C14.3497 9.59051 14.1317 9.43148 14.0225 9.20195L11.9991 4.94609L9.97663 9.20195Z"
      />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A1A1C" aria-hidden className="shrink-0">
      <path d="M2 17C2 11.48 6.48 7 12 7C17.52 7 22 11.48 22 17H20.5C20.5 12.31 16.69 8.5 12 8.5C7.31 8.5 3.5 12.31 3.5 17H2Z" />
      <path d="M12 15.1C13.05 15.1 13.9 15.95 13.9 17C13.9 18.05 13.05 18.9 12 18.9C10.95 18.9 10.1 18.05 10.1 17C10.1 15.95 10.95 15.1 12 15.1Z" />
      <path d="M10.7 15.9L17.6 10.4L13.1 18.3L10.7 15.9Z" />
    </svg>
  );
}

function PriorityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" fillOpacity="0.92" aria-hidden className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3.5H6C6.83 3.5 7.5 4.17 7.5 5V7C7.5 7.83 6.83 8.5 6 8.5H4C3.17 8.5 2.5 7.83 2.5 7V5C2.5 4.17 3.17 3.5 4 3.5ZM4.5 5H5.5C5.78 5 6 5.22 6 5.5V6.5C6 6.78 5.78 7 5.5 7H4.5C4.22 7 4 6.78 4 6.5V5.5C4 5.22 4.22 5 4.5 5ZM4 9.5H6C6.83 9.5 7.5 10.17 7.5 11V13C7.5 13.83 6.83 14.5 6 14.5H4C3.17 14.5 2.5 13.83 2.5 13V11C2.5 10.17 3.17 9.5 4 9.5ZM4.5 11H5.5C5.78 11 6 11.22 6 11.5V12.5C6 12.78 5.78 13 5.5 13H4.5C4.22 13 4 12.78 4 12.5V11.5C4 11.22 4.22 11 4.5 11ZM4 15.5H6C6.83 15.5 7.5 16.17 7.5 17V19C7.5 19.83 6.83 20.5 6 20.5H4C3.17 20.5 2.5 19.83 2.5 19V17C2.5 16.17 3.17 15.5 4 15.5ZM4.5 17H5.5C5.78 17 6 17.22 6 17.5V18.5C6 18.78 5.78 19 5.5 19H4.5C4.22 19 4 18.78 4 18.5V17.5C4 17.22 4.22 17 4.5 17Z"
      />
      <path d="M10.25 5.25H20.75C21.16 5.25 21.5 5.59 21.5 6C21.5 6.41 21.16 6.75 20.75 6.75H10.25C9.84 6.75 9.5 6.41 9.5 6C9.5 5.59 9.84 5.25 10.25 5.25ZM10.25 11.25H17.75C18.16 11.25 18.5 11.59 18.5 12C18.5 12.41 18.16 12.75 17.75 12.75H10.25C9.84 12.75 9.5 12.41 9.5 12C9.5 11.59 9.84 11.25 10.25 11.25ZM10.25 17.25H14.75C15.16 17.25 15.5 17.59 15.5 18C15.5 18.41 15.16 18.75 14.75 18.75H10.25C9.84 18.75 9.5 18.41 9.5 18C9.5 17.59 9.84 17.25 10.25 17.25Z" />
    </svg>
  );
}

function ModelCard({ dark, icon, title, formula, note }: { dark?: boolean; icon: ReactNode; title: string; formula: string[]; note: string }) {
  const t = useT();
  return (
    <div className={`wd-hover ut-emph flex w-[420px] shrink-0 flex-col items-start gap-[14px] self-stretch rounded-[24px] p-8 ${OFFSET} ${dark ? "bg-[#29353c]" : "bg-[var(--cmd-surface-1)]"}`}>
      <div className="flex items-center gap-3">
        {icon}
        <p className={`text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap ${dark ? "text-white" : "text-[#0a0a0a]"}`}>{t(title)}</p>
      </div>
      <div className={`w-full rounded-[12px] px-4 py-[14px] ${dark ? "bg-[#404041]" : "bg-[#fffbf2]"}`}>
        <p className={`w-[324px] font-mono text-base leading-6 whitespace-pre-wrap ${dark ? "text-[#ffd466]" : "text-[#664a00]"}`}>{formula.join("\n")}</p>
      </div>
      <p className={`w-[356px] text-sm leading-5 ${dark ? "text-[#d1d5db]" : "text-[#4b5563]"}`}>{t(note)}</p>
    </div>
  );
}

function Operator({ children }: { children: string }) {
  return (
    <div className="flex h-10 w-[70px] shrink-0 items-center justify-center">
      <p className="text-[30px] leading-[1.5] font-semibold text-[#ffb700]">{children}</p>
    </div>
  );
}

function FullModel() {
  return (
    <div className="flex w-[1400px] flex-col items-start gap-8">
      <Reveal>
        <BlockHead
          kicker="THE FULL MODEL"
          kickerClass="text-[12px] leading-[19px]"
          title="From importance to fix priority"
          lead="Weighting criteria alone doesn't tell the team what to fix first. The model combines how important a flow is with how badly it failed across learner segments — and only the product of the two becomes the backlog order."
          width={860}
        />
      </Reveal>
      <Reveal className="flex w-full items-stretch">
        <ModelCard
          icon={<StarIcon />}
          title="Base Flow Importance"
          formula={["Σ criteria score × weight", "(TC .25 · BI .25 · Freq .20", " Risk .15 · Dep .15)"]}
          note="How much a flow matters to learners and to the business — scored 1–5 by the team for 21 flows."
        />
        <Operator>×</Operator>
        <ModelCard
          icon={<GaugeIcon />}
          title="Weighted Severity"
          formula={["Σ segment severity × 0.33", "(Offline · Online · Blended)"]}
          note="How badly the flow failed in testing, normalised 0–1 and balanced across the three study formats."
        />
        <Operator>=</Operator>
        <ModelCard
          dark
          icon={<PriorityIcon />}
          title="Final Fix Priority"
          formula={["Base Flow Importance", "× Weighted Severity"]}
          note="One number per flow. Sorted high → low, it became the order the team fixed the product in."
        />
      </Reveal>
    </div>
  );
}

/* ---------- Step 1: importance table ---------- */

const SCORE_BG = ["", "#fff1cc", "#ffe399", "#ffd466", "#ffc633", "#ffb700"];
const SCORE_LEGEND = ["1 Very low", "2 Low", "3 Medium", "4 High", "5 Very high"];
const IMP_COLS = [
  ["Task criticality", "25%"],
  ["Business impact", "25%"],
  ["Frequency", "20%"],
  ["Risk if failed", "15%"],
  ["Dependency", "15%"],
];

const IMPORTANCE: [string, Cat, number[], string][] = [
  ["Activity / Video interaction", "act", [5, 5, 5, 5, 2], "4.55"],
  ["Activity / Switch tab", "act", [5, 5, 5, 5, 2], "4.55"],
  ["Test/Quiz – Find a Test", "quiz", [5, 5, 5, 4, 3], "4.55"],
  ["Test/Quiz – Find a Quiz", "quiz", [5, 5, 5, 3, 3], "4.40"],
  ["Test/Quiz – Submit correctly", "quiz", [5, 3, 4, 5, 5], "4.30"],
  ["Test Result – Understand the result", "result", [5, 5, 5, 4, 1], "4.25"],
  ["Test Result – Find the breakdown", "result", [5, 5, 5, 4, 1], "4.25"],
  ["Test Result – Review wrong answers", "result", [5, 5, 5, 4, 1], "4.25"],
  ["Find unfinished lesson", "lesson", [5, 5, 5, 2, 2], "4.10"],
  ["Test Result – Find the result", "result", [5, 5, 3, 3, 3], "4.00"],
  ["Login", "login", [5, 2, 3, 5, 5], "3.85"],
  ["Calendar – Find the Calendar", "cal", [5, 5, 2, 3, 2], "3.65"],
  ["Dashboard – Understand calculation", "dash", [5, 4, 3, 3, 1], "3.45"],
  ["Dashboard – Read the metrics", "dash", [5, 4, 3, 3, 1], "3.45"],
  ["Test/Quiz – Tell question types apart", "quiz", [3, 4, 2, 4, 1], "2.90"],
  ["Dashboard – Reach Course Content", "dash", [3, 2, 2, 4, 4], "2.85"],
  ["Test/Quiz – Use in-test tools", "quiz", [3, 3, 3, 2, 1], "2.55"],
  ["Resource", "res", [2, 4, 2, 2, 1], "2.35"],
  ["Activity / Highlight, notes, calculator", "act", [3, 3, 2, 1, 1], "2.20"],
  ["Calendar – Switch mode", "cal", [3, 1, 2, 1, 1], "1.70"],
  ["Calendar – Use filters", "cal", [3, 1, 2, 1, 1], "1.70"],
];

function ImportanceBlock() {
  const t = useT();
  return (
    <div className="flex w-[1400px] flex-col items-start gap-8">
      <Reveal>
        <BlockHead
          kicker="STEP 1"
          kickerClass="text-[14px] leading-[1.5]"
          title="Base Flow Importance — 21 flows scored"
          lead="Each flow was rated 1 (very low) to 5 (very high) on the five weighted criteria. Darker cells mean the flow matters more on that criterion."
          width={860}
        />
      </Reveal>
      <Reveal className="w-full">
        <div className={`wd-hover flex w-full flex-col items-start rounded-[24px] bg-[var(--cmd-surface-1)] p-8 ${OFFSET}`}>
          <div className="flex w-full flex-col items-start gap-4 border-b border-[#dadada] px-2 pb-6">
            <p className="text-base leading-6 font-semibold tracking-[-0.2px] text-[#6b7280]">{t("Legend")}</p>
            <div className="flex items-center gap-[14px]">
              {SCORE_LEGEND.map((l, i) => (
                <div key={l} className="flex items-start gap-1.5">
                  <span className="size-[18px] shrink-0 rounded-[4px]" style={{ background: SCORE_BG[i + 1] }} />
                  <p className="text-sm leading-5 whitespace-nowrap text-[#6b7280]">{t(l)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full items-start py-3 text-sm leading-5 font-semibold text-[#6b7280]">
            <p className="w-[380px] shrink-0 px-2">{t("Flow")}</p>
            {IMP_COLS.map(([a, b]) => (
              <p key={a} className="w-[120px] shrink-0 pr-2 text-center whitespace-nowrap">
                {t(a)}
                <br />
                {b}
              </p>
            ))}
            <p className="w-[356px] shrink-0 pr-2">Base Flow Importance</p>
          </div>
          {IMPORTANCE.map(([name, cat, scores, total], r) => (
            <div key={name} className={`ut-row flex w-full items-center rounded-[8px] py-1 ${r % 2 === 0 ? "bg-[#fcfcfc]" : ""}`}>
              <div className="w-[380px] shrink-0 px-2">
                <FlowName dot={DOT[cat]} name={name} width={340} />
              </div>
              {scores.map((s, c) => (
                <div key={c} className="w-[120px] shrink-0 px-1.5">
                  <div
                    className="ut-fade flex h-[42px] w-[108px] items-center justify-center rounded-[8px]"
                    style={{ background: SCORE_BG[s], ...vi(r + c) }}
                  >
                    <p className={`text-base leading-[1.5] font-semibold ${s >= 4 ? "text-[#29353c]" : "text-[#6b7280]"}`}>{s}</p>
                  </div>
                </div>
              ))}
              <div className="flex w-[356px] shrink-0 items-center gap-3 pr-2 pl-4">
                <div className="h-2.5 w-[200px] shrink-0 overflow-hidden rounded-full bg-[#f3f4f6]">
                  <div className="ut-x h-2.5 rounded-full bg-[#00b2ff]" style={{ width: Number(total) * 40, ...vi(r) }} />
                </div>
                <p className="ut-fade text-base leading-[1.5] font-semibold text-[#0a0a0a]" style={vi(r + 4)}>
                  {total}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Step 2: severity ---------- */

function sevTone(v: number | null) {
  if (v === null) return { bg: "#f3f4f6", fg: "#9ca3af" };
  if (v === 0) return { bg: "#f3f4f6", fg: "#374151" };
  if (v <= 0.25) return { bg: "#fde7e3", fg: "#7a2e1f" };
  if (v <= 0.5) return { bg: "#fbc2b5", fg: "#7a2e1f" };
  if (v <= 0.75) return { bg: "#f6907a", fg: "#ffffff" };
  return { bg: "#e8553d", fg: "#ffffff" };
}

const SEV_SCALE: [string, string][] = [
  ["#f3f4f6", "0 · None"],
  ["#fde7e3", "0–0.25 · Low"],
  ["#fbc2b5", "0.25–0.5 · Medium"],
  ["#f6907a", "0.5–0.75 · High"],
  ["#e8553d", "0.75–1 · Very high"],
];

const SEVERITY: [string, Cat, (number | null)[], number][] = [
  ["Activity / Video interaction", "act", [1, 1, 0.75], 0.9],
  ["Activity / Highlight, notes, calculator", "act", [1, 1, 0.75], 0.9],
  ["Calendar – Find the Calendar", "cal", [0.75, 1, 1], 0.9],
  ["Dashboard – Read the metrics", "dash", [0, 1, 1], 0.66],
  ["Dashboard – Understand calculation", "dash", [0, 1, 0.75], 0.57],
  ["Find unfinished lesson", "lesson", [1, null, 0.75], 0.57],
  ["Resource", "res", [0.66, 1, 0], 0.54],
  ["Test/Quiz – Find a Test", "quiz", [0.3, 0.5, 0.75], 0.5],
  ["Dashboard – Reach Course Content", "dash", [0.25, 0.5, 0.5], 0.41],
  ["Test/Quiz – Find a Quiz", "quiz", [0, 0.6, 0.6], 0.39],
  ["Test Result – Understand the result", "result", [0, 0.6, 0.6], 0.36],
  ["Test Result – Find the result", "result", [0.6, 0, 0.5], 0.36],
  ["Calendar – Use filters", "cal", [0.6, 0.5, 0], 0.24],
  ["Login", "login", [0.5, 0, 0.25], 0.24],
  ["Activity / Switch tab", "act", [0.5, 0, 0.25], 0.08],
  ["Test/Quiz – Tell question types apart", "quiz", [0, 0.25, 0], 0.08],
  ["Test/Quiz – Use in-test tools", "quiz", [0.25, 0, 0], 0.08],
  ["Test Result – Review wrong answers", "result", [0, 0.25, 0], 0.08],
  ["Calendar – Switch mode", "cal", [0, 0, 0.25], 0],
  ["Test/Quiz – Submit correctly", "quiz", [0, 0, 0], 0],
  ["Test Result – Find the breakdown", "result", [0, 0, 0], 0],
];

function SeverityBlock() {
  const t = useT();
  return (
    <div className="flex w-[1400px] flex-col items-start gap-8">
      <Reveal>
        <BlockHead
          kicker="STEP 2"
          kickerClass="text-[14px] leading-[1.4]"
          title="Weighted Severity — how badly each flow failed"
          lead="Severity was normalised per learner segment, then averaged with equal weights so no single study format dominates the result."
          width={710}
        />
      </Reveal>
      <Reveal className="flex w-full items-stretch gap-5">
        <div className={`wd-hover ut-emph flex w-[690px] shrink-0 flex-col items-start gap-4 rounded-[24px] bg-[var(--cmd-surface-1)] p-8 ${OFFSET}`}>
          <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-[#0a0a0a]">{t("Normalise per segment")}</p>
          <div className="flex w-full flex-col items-start gap-1.5 rounded-[14px] bg-[#fffbf2] px-5 py-[18px]">
            <p className="font-mono text-base leading-[1.4] text-[#664a00]">Severity Norm = Σ Severity ÷ (Severity max × N)</p>
            <p className="text-sm leading-5 whitespace-nowrap text-[#6b7280]">{t("N = number of participants in the segment")}</p>
          </div>
          <p className="font-mono text-base leading-6 text-[var(--cmd-text-primary)]">{t('e.g. "Find unfinished lesson", Offline: (4 + 4 + 4) ÷ (4 × 3) = 1.00')}</p>
          <div className="flex w-full items-start gap-3">
            {SEV_SCALE.map(([c, l], i) => (
              <div key={l} className="flex w-[115px] flex-col items-start gap-1">
                <span className="ut-x h-3.5 w-[115px] rounded-[4px]" style={{ background: c, ...vi(i * 2) }} />
                <p className="w-[115px] text-sm leading-5 text-[#6b7280]">{t(l)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="wd-hover ut-emph flex w-[690px] shrink-0 flex-col items-start gap-4 rounded-[24px] bg-[#29353c] p-8 shadow-[6px_6px_0_0_#0582cc,inset_0_1px_0_0_var(--cmd-edge)] [--ut-accent:#0582cc]">
          <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-white">{t("Balance the three segments")}</p>
          <div className="flex w-full flex-wrap items-start gap-x-2.5 gap-y-2">
            {["Offline · 0.33", "Online · 0.33", "Blended · 0.33"].map((c) => (
              <span key={c} className="rounded-full bg-[#404041] px-3 py-[5px] text-sm leading-5 font-semibold whitespace-nowrap text-white">
                {c}
              </span>
            ))}
          </div>
          <div className="w-full rounded-[14px] bg-[#404041] px-5 py-[18px]">
            <p className="w-full font-mono text-[15px] leading-[1.4] text-[#ffd466]">Weighted Severity = Σ (Segment Severity × W_segment)</p>
          </div>
          <p className="font-mono text-base leading-6 text-white">{t("e.g. Video interaction: (1 × 0.33) + (1 × 0.33) + (0.75 × 0.33) = 0.90")}</p>
        </div>
      </Reveal>
      <Reveal className="w-full">
        <div className={`wd-hover flex w-full flex-col items-start rounded-[24px] bg-[var(--cmd-surface-1)] p-8 ${OFFSET}`}>
          <div className="flex w-full items-start pb-3 text-sm leading-5 font-semibold whitespace-nowrap text-[#6b7280]">
            <p className="w-[430px] shrink-0 px-2">{t("Flow")}</p>
            <p className="w-[170px] shrink-0 px-2 text-center">Offline</p>
            <p className="w-[170px] shrink-0 px-2 text-center">Online</p>
            <p className="w-[170px] shrink-0 px-2 text-center">Blended</p>
            <p className="w-[396px] shrink-0 px-2">Weighted Severity</p>
          </div>
          {SEVERITY.map(([name, cat, segs, w], r) => {
            const bar = sevTone(w);
            return (
              <div key={name} className={`ut-row flex w-full items-center rounded-[8px] py-1 ${r % 2 === 0 ? "bg-[#fcfcfc]" : ""}`}>
                <div className="w-[430px] shrink-0 px-2">
                  <FlowName dot={DOT[cat]} name={name} width={390} />
                </div>
                {segs.map((v, c) => {
                  const tone = sevTone(v);
                  return (
                    <div key={c} className="w-[170px] shrink-0 px-2">
                      <div className="ut-fade flex h-[42px] w-[154px] items-center justify-center rounded-[8px]" style={{ background: tone.bg, ...vi(r + c) }}>
                        <p className="text-base leading-[1.5] font-semibold" style={{ color: tone.fg }}>
                          {v === null ? "—" : v.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex w-[396px] shrink-0 items-center gap-3 pr-2 pl-4">
                  <div className="h-2.5 w-[260px] shrink-0 overflow-hidden rounded-full bg-[#f3f4f6]">
                    <div className="ut-x h-2.5 rounded-full" style={{ width: Math.max(4, w * 260), background: bar.bg === "#f3f4f6" ? "#fde7e3" : bar.bg, ...vi(r) }} />
                  </div>
                  <p className="ut-fade text-base leading-[1.5] font-semibold text-[#0a0a0a]" style={vi(r + 4)}>
                    {w.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Step 3: leaderboard ---------- */

type Rank = [string, Cat, string, number];
const TIERS: Record<"fix" | "monitor" | "next" | "none", { label: string; color: string; rows: Rank[] }> = {
  fix: {
    label: "FIX FIRST",
    color: "#f80903",
    rows: [
      ["Activity / Video interaction", "act", "4.55 × 0.90", 4.1],
      ["Calendar – Find the Calendar", "cal", "3.65 × 0.90", 3.29],
      ["Find unfinished lesson", "lesson", "4.01 × 0.57", 2.34],
      ["Dashboard – Read the metrics", "dash", "3.45 × 0.66", 2.28],
      ["Test/Quiz – Find a Test", "quiz", "4.55 × 0.50", 2.28],
      ["Activity / Highlight, notes, calculator", "act", "2.20 × 0.90", 1.98],
      ["Dashboard – Understand calculation", "dash", "3.45 × 0.57", 1.97],
    ],
  },
  monitor: {
    label: "MONITOR",
    color: "#6b7280",
    rows: [
      ["Login", "login", "3.85 × 0.24", 0.92],
      ["Calendar – Use filters", "cal", "1.70 × 0.24", 0.41],
      ["Test/Quiz – Use in-test tools", "quiz", "4.55 × 0.08", 0.36],
      ["Activity / Switch tab", "act", "2.90 × 0.08", 0.34],
      ["Test/Quiz – Tell question types apart", "quiz", "2.55 × 0.08", 0.23],
      ["Test Result – Review wrong answers", "result", "4.25 × 0.08", 0.2],
    ],
  },
  next: {
    label: "NEXT",
    color: "#e68200",
    rows: [
      ["Test/Quiz – Find a Quiz", "quiz", "4.40 × 0.39", 1.72],
      ["Test Result – Understand the result", "result", "4.25 × 0.36", 1.53],
      ["Test Result – Find the result", "result", "4.00 × 0.36", 1.44],
      ["Resource", "res", "2.35 × 0.54", 1.27],
      ["Dashboard – Reach Course Content", "dash", "2.85 × 0.41", 1.17],
    ],
  },
  none: {
    label: "NO ISSUE",
    color: "#10b367",
    rows: [
      ["Calendar – Switch mode", "cal", "1.70 × 0.00", 0],
      ["Test/Quiz – Submit correctly", "quiz", "4.30 × 0.00", 0],
      ["Test Result – Find the breakdown", "result", "4.25 × 0.00", 0],
    ],
  },
};

function TierList({ tier, first = false, offset }: { tier: keyof typeof TIERS; first?: boolean; offset: number }) {
  const t = useT();
  const tr = TIERS[tier];
  return (
    <div className="flex min-w-px flex-1 flex-col items-start gap-1.5">
      <div className={`flex w-full items-center gap-2 ${first ? "p-1" : "px-1 pt-[14px] pb-1"}`}>
        <span className="size-2 shrink-0 rounded-[4px]" style={{ background: tr.color }} />
        <p className="font-mono text-[14px] leading-[1.4] font-bold whitespace-nowrap" style={{ color: tr.color }}>
          {t(tr.label)}
        </p>
      </div>
      {tr.rows.map(([name, cat, calc, v], i) => (
        <div key={name} className={`ut-row flex w-full items-center gap-3 rounded-[12px] py-2 pr-3 pl-2 ${first && i < 3 ? "bg-[#fff8e6]" : ""}`}>
          <div className="flex w-[340px] shrink-0 flex-col items-start gap-0.5">
            <FlowName dot={DOT[cat]} name={name} width={318} />
            <p className="font-mono text-[14px] leading-[1.4] whitespace-nowrap text-[#9ca3af]">{calc}</p>
          </div>
          <div className="h-3 w-[150px] shrink-0 overflow-hidden rounded-full bg-[#f3f4f6]">
            <div className="ut-x h-3 rounded-full" style={{ width: Math.max(4, (v / 4.1) * 150), background: tr.color, ...vi(offset + i) }} />
          </div>
          <p className="ut-fade text-base leading-[1.5] font-semibold whitespace-nowrap text-[#0a0a0a]" style={vi(offset + i + 3)}>
            {v.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

function PriorityBlock() {
  const t = useT();
  return (
    <div className="flex w-[1400px] flex-col items-start gap-8">
      <Reveal>
        <BlockHead
          kicker="STEP 3"
          kickerClass="text-[14px] leading-[1.4]"
          title="Final Fix Priority — the backlog order"
          lead={`Multiplying importance by severity separates "important but fine" from "broken and important". Seven flows scored above 1.9 and became the first redesign wave.`}
          width={780}
        />
      </Reveal>
      <Reveal className="w-full">
        <div className={`wd-hover flex w-full flex-col items-start gap-1.5 rounded-[24px] bg-[var(--cmd-surface-1)] p-7 ${OFFSET}`}>
          <div className="w-full rounded-[12px] bg-[#fffbf2] px-4 py-[14px]">
            <p className="w-full font-mono text-[14px] leading-[1.4] text-[#664a00]">{t("Final Fix Priority = Base Flow Importance × Weighted Severity")}</p>
          </div>
          <div className="h-2 w-px" />
          <div className="relative flex h-[888px] w-[1344px] flex-col items-start gap-3">
            <div className="flex w-full items-start gap-12">
              <TierList tier="fix" first offset={0} />
              <TierList tier="monitor" offset={2} />
            </div>
            <div className="h-px w-full shrink-0 bg-black/20" />
            <div className="flex w-full items-start gap-12">
              <TierList tier="next" offset={8} />
              <TierList tier="none" offset={10} />
            </div>
            <div className="absolute top-1/2 left-1/2 h-[887px] w-px -translate-x-1/2 -translate-y-1/2 bg-black/20" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Synthesis: affinity diagram ---------- */

const STATS = [
  ["18", "clusters, one per flow"],
  ["116", "evidence notes & clips"],
  ["3", "learner segments"],
  ["6.29 / 7", "best SEQ — Login"],
];

type Insight = { t: string; notes: string; seq?: string; dep?: boolean; q: string };
type Cluster = { name: string; flows: string; bg: string; ink: string; pos: string; items: Insight[] };

const CLUSTERS: Cluster[] = [
  {
    name: "Login",
    flows: "1 flow",
    bg: "#ffdcbc",
    ink: "#9a4a00",
    pos: "left-0 top-0",
    items: [
      {
        t: "Login",
        notes: "6 notes",
        seq: "SEQ 6.29 / 7",
        q: "Login itself works, but edge cases break trust — switching devices, forced logout, time-outs and unclear status. Logout was the biggest pain.",
      },
    ],
  },
  {
    name: "Resume learning",
    flows: "1 flow",
    bg: "#ffeac2",
    ink: "#8a5a00",
    pos: "left-[473px] top-0",
    items: [
      {
        t: "Find unfinished lesson",
        notes: "6 notes",
        q: "Returning learners can't find where they left off: no progress signals, so they rely on memory and titles, click the wrong item and lose their flow.",
      },
    ],
  },
  {
    name: "Activity",
    flows: "3 flows",
    bg: "#e7ffe5",
    ink: "#1b6b2f",
    pos: "left-[946px] top-0",
    items: [
      {
        t: "Video interaction",
        notes: "8 notes",
        seq: "SEQ 5.7 / 7",
        q: "Learners expect 5/10/15s skips and arrow keys but must drag the timeline. Picture-in-picture goes unnoticed — once shown, they find it useful.",
      },
      {
        t: "Highlight, notes, calculator",
        notes: "18 notes",
        seq: "SEQ 5.7 / 7",
        q: "Unclear where notes are saved and Note List vs Add Note gets confused — so learners go back to pen and paper, and notes can't support revision.",
      },
      { t: "Switch tab", notes: "3 notes", seq: "SEQ 5.7 / 7", q: "Users know where to click; they don't understand the logic the content is organised by." },
    ],
  },
  {
    name: "Resource",
    flows: "1 flow",
    bg: "#fad8d4",
    ink: "#9b2c22",
    pos: "left-0 top-[260px]",
    items: [
      {
        t: "Resource",
        notes: "8 notes",
        q: "Low discoverability, part-by-part hunting and no preview — and since materials are handed out up front, learners skip Resource entirely.",
      },
    ],
  },
  {
    name: "Test / Quiz",
    flows: "4 flows",
    bg: "#ccf7ff",
    ink: "#0b6a80",
    pos: "left-[473px] top-[260px]",
    items: [
      { t: "Find a Test", notes: "3 notes", q: "Tests aren't hard to find for regulars; infrequent users stumble because the test flow's logic isn't visible." },
      { t: "Find a Quiz", notes: "6 notes", q: "Weak search limits re-finding quizzes; offline learners come only for tests, online learners rarely open the list." },
      { t: "Tell question types apart", notes: "2 notes", q: "The flow already gives learners what they need." },
      { t: "Use in-test tools", notes: "6 notes", dep: true, q: "Calculator and scratch note feel too basic to be worth using." },
    ],
  },
  {
    name: "Test Result",
    flows: "3 flows",
    bg: "#fac0f1",
    ink: "#8a1c78",
    pos: "left-[946px] top-[584px]",
    items: [
      {
        t: "Find the result",
        notes: "5 notes",
        q: "Test, Quiz, Course Content and Result are separated with no visible relationship — learners can't map \"take a test → see how I did\".",
      },
      { t: "Understand the result", notes: "6 notes", q: "Wording and the global-average display confuse learners, even though it mimics a real exam." },
      {
        t: "Review wrong answers",
        notes: "5 notes",
        q: "Learners want to review in place — tap a topic or question and jump inline. Page jumps break context, so reviews get shallow or skipped.",
      },
    ],
  },
  {
    name: "Dashboard",
    flows: "3 flows",
    bg: "#c5e3ff",
    ink: "#1d4f91",
    pos: "left-0 top-[520px]",
    items: [
      {
        t: "Understand calculation",
        notes: "9 notes",
        q: "Metrics show as aggregates with no comparison or link to goals — learners can't tell what decision the dashboard supports.",
      },
      {
        t: "Read the metrics",
        notes: "10 notes",
        q: "Radar charts are hard to read and data doesn't match how people actually study (blended / online), so they stop trusting it.",
      },
      { t: "Reach Course Content", notes: "4 notes", q: "Too many entry points and no clear main path — 50% path deviation; tasks get done without confidence." },
    ],
  },
  {
    name: "Calendar",
    flows: "2 flows",
    bg: "#d1f0ba",
    ink: "#3c6b14",
    pos: "left-[473px] top-[936px]",
    items: [
      { t: "Find the Calendar", notes: "6 notes", q: "No fixed place and a sidebar that changes per screen — learners guess (usually Course Content) and get lost." },
      { t: "Use filters", notes: "5 notes", dep: true, q: "Works as is — it just needs an \"All\" option." },
    ],
  },
];

function Chip({ bg, fg, children }: { bg: string; fg: string; children: ReactNode }) {
  return (
    <span className="rounded-full px-2.5 py-1 text-sm leading-5 font-semibold whitespace-nowrap" style={{ background: bg, color: fg }}>
      {children}
    </span>
  );
}

function InsightCard({ it, ink }: { it: Insight; ink: string }) {
  const t = useT();
  return (
    <div className="wd-hover ut-emph flex w-full flex-col items-start gap-2.5 rounded-[16px] bg-white p-[18px]" style={{ "--ut-accent": ink } as CSSProperties}>
      <p className="text-sm leading-5 font-semibold whitespace-nowrap text-[#1f2937]">{t(it.t)}</p>
      <div className="flex flex-wrap items-start gap-1.5">
        <Chip bg="#f6f6f6" fg="#374151">
          {t(it.notes)}
        </Chip>
        {it.seq ? (
          <Chip bg="#e7fcf2" fg="#05673a">
            {it.seq}
          </Chip>
        ) : null}
        {it.dep ? (
          <Chip bg="#f3f4f6" fg="#6b7280">
            {t("Deprioritised")}
          </Chip>
        ) : null}
      </div>
      <div className="flex items-start gap-2.5">
        <span className="w-[3px] shrink-0 self-stretch rounded-[2px]" style={{ background: ink }} />
        <p className="w-[360px] text-[13px] leading-[1.5] text-[#374151]">{t(it.q)}</p>
      </div>
    </div>
  );
}

function AffinityBlock() {
  const t = useT();
  return (
    <div className="flex w-[1400px] flex-col items-start gap-8">
      <Reveal>
        <BlockHead
          kicker="SYNTHESIS"
          kickerClass="!font-normal text-[16px] leading-6"
          title="Affinity diagram — from evidence to insight"
          lead="Notes and clips from every session were clustered per flow on one board, then each cluster was distilled into a single insight statement. SEQ (Single Ease Question, 1–7) was recorded where a task could be timed end to end."
          width={860}
        />
      </Reveal>
      <Reveal className="flex w-full items-stretch gap-5">
        {STATS.map(([n, l], i) => (
          <div key={l} className={`wd-hover flex min-w-px flex-1 flex-col items-start gap-1.5 rounded-[24px] bg-[var(--cmd-surface-1)] p-7 ${OFFSET}`}>
            <p className="ut-fade text-[48px] leading-[52px] font-semibold tracking-[-1.44px] whitespace-nowrap text-[#0a0a0a]" style={vi(i * 3)}>
              {n}
            </p>
            <p className="text-sm leading-5 whitespace-nowrap text-[#6b7280]">{t(l)}</p>
          </div>
        ))}
      </Reveal>
      <div className="relative h-[1288px] w-full">
        {CLUSTERS.map((c) => (
          <Reveal key={c.name} className={`absolute w-[453px] ${c.pos}`}>
            <div className="flex w-full flex-col items-start gap-3 rounded-[20px] p-3" style={{ background: c.bg }}>
              <div className="flex items-center gap-2 p-2">
                <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-[var(--cmd-text-primary)]">{t(c.name)}</p>
                <Chip bg="#ffffff" fg={c.ink}>
                  {t(c.flows)}
                </Chip>
              </div>
              {c.items.map((it) => (
                <InsightCard key={it.t} it={it} ink={c.ink} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */

export function SappUsabilityTesting() {
  return (
    <section id="wd-usability" className="flex w-[1872px] flex-col items-center gap-12 px-[236px] pt-[100px]">
      <Head />
      <div className="flex w-[1400px] flex-col items-center gap-[120px]">
        <TestingMethods />
        <TaskScope />
        <KpiMetric />
        <TaskWeighting />
        <Weights />
        <FullModel />
        <ImportanceBlock />
        <SeverityBlock />
        <PriorityBlock />
        <AffinityBlock />
      </div>
    </section>
  );
}

export function SappCaseEnd() {
  const t = useT();
  return (
    <section id="wd-case-end" className="flex w-[1872px] flex-col items-center gap-7 px-[156px] pt-[100px] pb-20">
      <div className="flex w-full items-center gap-5 overflow-hidden">
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="size-3 shrink-0 rounded-full bg-[var(--brand-sapp)]" />
          <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{t("END OF CASE STUDY  ·  SAPP LMS  ·  2025")}</p>
        </div>
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
      </div>
      <p className="text-center text-[44px] leading-[56px] tracking-[-1.1px] whitespace-nowrap text-[var(--cmd-text-primary)]">
        {t("Thanks for reading — here is what I built next.")}
      </p>
    </section>
  );
}
