/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size and crop. */
"use client";

import "./bsc-research.css";
import type { CSSProperties, ReactNode } from "react";
import { Reveal, useRevealChildren } from "../../reveal";
import { sappBeVietnam } from "../sapp/fonts";
import { BscEyebrow, BscHeading } from "./parts";
import { useT } from "@/lib/i18n";

const A = "/figma/bsc/research";

/** Centred section head (Figma "Head"): eyebrow + 56px heading (gap 16), then the 16/24 grey lead 22px below. */
function CenterHead({ eyebrow, title, lead, leadWidth }: { eyebrow: string; title: ReactNode; lead: ReactNode; leadWidth: number }) {
  const t = useT();
  return (
    <div className="flex w-full flex-col items-center gap-[22px]">
      <Reveal enter={60}>
        <div className="flex flex-col items-center gap-4">
          <BscEyebrow label={eyebrow} />
          <BscHeading>{typeof title === "string" ? t(title) : title}</BscHeading>
        </div>
      </Reveal>
      <Reveal enter={40}>
        <p className="text-center text-[16px] leading-[24px] text-[var(--cmd-text-secondary)]" style={{ width: leadWidth }}>
          {typeof lead === "string" ? t(lead) : lead}
        </p>
      </Reveal>
    </div>
  );
}

/* ================================================================== */
/* 01.1 Competitors research (Figma 225:14578)                         */
/* ================================================================== */

/** One website screenshot slice. `crop` repeats Figma's image-fill crop (percent of the slice); none = object-cover. */
type Shot = {
  src: string;
  top: number;
  h: number;
  w?: number | string;
  r?: string;
  crop?: { h: number; top?: number; left?: number; w?: number };
};

type Competitor = {
  name: string;
  text: string;
  left: number;
  top: number;
  width: number;
  /** Image stack size; the copy sits above (Vietcombank) or below it. */
  stackW: number;
  stackH: number;
  textFirst?: boolean;
  shots: Shot[];
  /** Figma "Rectangle 23523": a #fcfcfc patch over the VPS scrollbar. */
  patch?: boolean;
};

const R12 = "12px";

const COMPETITORS: Competitor[] = [
  {
    name: "VPBank Securities",
    text: "VPBank Securities is a competitor that exemplifies the specific design needs of an international securities firm. It has portals, large blocks, and prioritizes presenting information to investors and corporate clients.",
    left: 0,
    top: 0,
    width: 521.981,
    stackW: 521,
    stackH: 569.666,
    shots: [
      { src: "vpb1", top: 0, h: 221.907, r: R12, crop: { h: 109.11 } },
      { src: "vpb2", top: 221.91, h: 147.417, r: R12, crop: { h: 135.79 } },
      { src: "vpb3", top: 369.32, h: 200.342, r: R12 },
    ],
  },
  {
    name: "Vietcombank Securities",
    text: "Vietcombank Securities is a leading financial group in Vietnam. Their design language provides a lot of information about the group, shows class and position, and focuses a lot on vision and mission.",
    left: 581.67,
    top: 63,
    width: 522.33,
    stackW: 521,
    stackH: 713.367,
    textFirst: true,
    shots: [
      { src: "vcb1", top: 0, h: 242.255, w: 520.451, r: R12 },
      { src: "vcb2", top: 219.89, h: 185.464, w: 520.451, r: R12 },
      { src: "vcb3", top: 368.68, h: 185.738, w: 521, r: R12, crop: { h: 100.89, top: -0.89 } },
      { src: "vcb4", top: 530.49, h: 182.876, w: 521, r: R12, crop: { h: 102.62, top: -2.62, left: -0.08, w: 100.16 } },
    ],
  },
  {
    name: "VPS Securities",
    text: "VPS is one of the leading securities companies in Vietnam. VPS's web design style is modern, minimalist, using blue and white tones, creating a professional and trustworthy feeling. The interface is intuitive, focusing on user experience with a clear layout, many charts, visual data and convenient trading features.",
    left: 0,
    top: 857.67,
    width: 522.33,
    stackW: 522.33,
    stackH: 700.43,
    patch: true,
    shots: [
      { src: "vps1", top: 0, h: 242.255, w: "99.89%", r: R12 },
      { src: "vcb3", top: 368.68, h: 185.738, w: "100%", r: R12, crop: { h: 100.89, top: -0.89 } },
      { src: "vps3", top: 480.24, h: 220.191, w: "100%", r: "0 0 12px 12px", crop: { h: 113.26, top: 0.09, left: -0.39, w: 100.84 } },
      { src: "vps4", top: 244.15, h: 236.093, w: "99.89%", crop: { h: 105.18, top: -0.34 } },
    ],
  },
  {
    name: "Vietcap Securities",
    text: "Vietcap website has a luxurious, professional design style with black, gold and white tones. The interface is modern, streamlined, focusing on user experience with logical layout, high-quality images and intuitive investment information.",
    left: 582.02,
    top: 1064.37,
    width: 521.981,
    stackW: 521,
    stackH: 569.666,
    shots: [
      { src: "vcap1", top: 0, h: 221.907, r: R12, crop: { h: 111.97, top: -0.93 } },
      { src: "vcap2", top: 221.91, h: 147.417, crop: { h: 147.72, top: -11.62 } },
      { src: "vcap3", top: 359.67, h: 209.992, crop: { h: 104.4, top: 4.73 } },
    ],
  },
];

function ShotStack({ c }: { c: Competitor }) {
  const t = useT();
  return (
    <div className="bres-stack wd-hover relative shrink-0" style={{ width: c.stackW, height: c.stackH }}>
      {c.shots.map((s, i) => {
        const img: CSSProperties = s.crop
          ? { height: `${s.crop.h}%`, top: `${s.crop.top ?? 0}%`, left: `${s.crop.left ?? 0}%`, width: `${s.crop.w ?? 100}%` }
          : { inset: 0, width: "100%", height: "100%", objectFit: "cover" };
        return (
          <div
            key={i}
            className="bres-shot absolute left-0 overflow-hidden"
            style={{ top: s.top, height: s.h, width: s.w ?? 521, borderRadius: s.r ?? 0 }}
          >
            <img src={`${A}/${s.src}.webp`} alt={i === 0 ? t("{name} website", { name: c.name }) : ""} className="absolute block max-w-none" style={img} />
          </div>
        );
      })}
      {c.patch ? <div aria-hidden className="absolute bg-[#fcfcfc]" style={{ left: 497.699, top: 326.372, width: 24.631, height: 101.124 }} /> : null}
    </div>
  );
}

function CompetitorCopy({ c }: { c: Competitor }) {
  const t = useT();
  return (
    <div className={`flex w-[508px] shrink-0 flex-col items-start gap-3 leading-[1.5] ${sappBeVietnam.className}`}>
      <p className="w-full text-[24px] font-bold text-[#2a5caa]">{c.name}</p>
      <p className="w-full text-[16px] text-[#1b1b1b]">{t(c.text)}</p>
    </div>
  );
}

function CompetitorsResearch() {
  return (
    <section id="wd-competitors" className="relative flex w-full flex-col items-center gap-12 px-[156px] pt-[100px]">
      <CenterHead
        eyebrow="RESEARCH  ·  01.1"
        title="Competitors research"
        lead="Four leading Vietnamese securities firms — what their websites prioritise, and the visual language each uses to earn trust."
        leadWidth={522}
      />
      <div className="relative h-[1810.034px] w-[1104px] shrink-0">
        {COMPETITORS.map((c) => (
          <div key={c.name} className="absolute" style={{ left: c.left, top: c.top, width: c.width }}>
            <Reveal enter={60}>
              <div className="flex flex-col items-start gap-8">
                {c.textFirst ? <CompetitorCopy c={c} /> : null}
                <ShotStack c={c} />
                {c.textFirst ? null : <CompetitorCopy c={c} />}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 01.2 Solution (Figma 223:13537)                                     */
/* ================================================================== */

function Solution() {
  const t = useT();
  return (
    <section id="wd-solution" className="relative flex w-full flex-col items-start px-[156px] pt-[140px]">
      <div className="flex w-full items-center justify-between px-20">
        <Reveal className="shrink-0" enter={60}>
          <div className="flex w-[559px] flex-col items-start gap-6">
            <BscEyebrow label="RESEARCH  ·  01.2" />
            <BscHeading>{t("Solution")}</BscHeading>
            <p className="w-full text-[16px] leading-[24px] text-[var(--cmd-text-primary)]">
              {t("Rounded-corner blocks and BSC's gradient brand colour create a luxurious highlight, while light blue keeps the website calm and comfortable to read.")}
            </p>
            <p className="w-full text-[16px] leading-[24px] text-[var(--cmd-text-primary)]">
              {t("3D illustrations and bright imagery bring out the youthfulness of the renewed BSC brand.")}
            </p>
          </div>
        </Reveal>
        <Reveal className="shrink-0" enter={60}>
          {/* Figma "Group 1": MacBook Pro 16 mockup; the screen holds the full BSC homepage, scrolled on hover. */}
          <div className="bres-mac wd-hover relative h-[392.144px] w-[684.362px]">
            <img src={`${A}/mac-shadow.png`} alt="" aria-hidden className="absolute block max-w-none" style={{ left: 0, top: 387.867, width: 684.362, height: 4.276 }} />
            <img src={`${A}/macbook.webp`} alt="" aria-hidden className="absolute block max-w-none" style={{ left: 11.973, top: 0, width: 660.414, height: 390.718 }} />
            <img src={`${A}/mac-logo.png`} alt="" aria-hidden className="absolute block max-w-none" style={{ left: 323.578, top: 357.935, width: 37.062, height: 4.989 }} />
            <img src={`${A}/mac-camera.png`} alt="" aria-hidden className="absolute block max-w-none" style={{ left: 340.542, top: 6.556, width: 3.136, height: 3.136 }} />
            <div className="absolute overflow-hidden rounded-[3.435px]" style={{ left: 77.094, top: 13.704, width: 536.752, height: 337.468 }}>
              <img
                src={`${A}/bsc-site.webp`}
                alt={t("Redesigned BSC website homepage")}
                className="bres-site absolute left-0 block w-full max-w-none"
                style={{ top: "-0.01%", height: "517.46%" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Phase 02 band (Figma 223:13632)                                     */
/* ================================================================== */

/* Figma "Glow": 632px white disc at 18% with a 70px Gaussian blur, re-expressed as a radial gradient (no CSS blur).
   Element = the blur's 912px bounds; stops follow the blurred disc's falloff. */
const GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.171) 43.9%, rgba(255,255,255,0.151) 54%, rgba(255,255,255,0.09) 69.3%, rgba(255,255,255,0.029) 84.6%, rgba(255,255,255,0.011) 93.4%, rgba(255,255,255,0) 100%)";

/* Figma "Dot Grid": #b37a00 dots (2.1×2) on a 25.23×24 grid at 40%, multiplied onto the band. */
const DOT_GRID: CSSProperties = {
  opacity: 0.4,
  backgroundImage: "radial-gradient(circle at 1.05px 1px, #b37a00 0.75px, transparent 1.15px)",
  backgroundSize: "25.2308px 24px",
};

function PhaseSystem() {
  const t = useT();
  return (
    <section id="wd-phase-system" className="relative h-[511px] w-full">
      <Reveal className="absolute top-[99.886px] left-[116px] h-[400px] w-[1640px]" enter={80}>
        <div className="relative size-full overflow-clip rounded-[40px] bg-[#ffb81c]" style={{ boxShadow: "12px 12px 0 0 #b37a00" }}>
          <div aria-hidden className="pointer-events-none absolute" style={{ left: 1025, top: -136.114, width: 912, height: 912, backgroundImage: GLOW }} />
          <div aria-hidden className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply" style={DOT_GRID} />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap text-white">02</p>
          <div className="absolute top-[calc(50%-0.11px)] left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px] text-white">
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {num}", { num: "02" })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t("Design System phase")}</p>
            <p className="w-[860px] text-[20px] leading-[28px]">
              {t("From structure to system: wireframe every template, then lock the BSC colours, type and icons into one website style guide.")}
            </p>
            <div className="flex items-start gap-2">
              {["02.1  Wireframing", "02.2  UI kit"].map((c) => (
                <span
                  key={c}
                  className="wd-hover flex items-center rounded-full bg-white px-3 py-1.5 text-[16px] leading-[24px] tracking-[-0.2px] whitespace-pre text-[#14203f]"
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
/* 02.1 Wireframing (Figma 223:13577)                                  */
/* ================================================================== */

type Wire = { n: number; w: number; h: number; fit?: "contain"; crop?: number };

/** Three rows of five page wireframes (Figma 231:103962 / 103968 / 103974), 214px wide, top-aligned. */
const WIRE_ROWS: Wire[][] = [
  [
    { n: 1, w: 214, h: 783.445 },
    { n: 2, w: 214.16, h: 724.957 },
    { n: 3, w: 214, h: 653.801 },
    { n: 4, w: 214, h: 659.629 },
    { n: 5, w: 214, h: 561.476, fit: "contain" },
  ],
  [
    { n: 6, w: 214, h: 587.244 },
    { n: 7, w: 214, h: 395.322 },
    { n: 8, w: 214, h: 417.15 },
    { n: 9, w: 214, h: 299.07 },
    { n: 10, w: 214, h: 342.4 },
  ],
  [
    { n: 11, w: 214, h: 596.802 },
    { n: 12, w: 214, h: 379.137 },
    { n: 13, w: 214, h: 511.626 },
    { n: 14, w: 214, h: 494.904, crop: 104.89 },
    { n: 15, w: 214, h: 315.286 },
  ],
];

function Wireframing() {
  const t = useT();
  const board = useRevealChildren<HTMLDivElement>("[data-rv]", 40);
  return (
    <section id="wd-wireframing" className="relative flex w-full flex-col items-center gap-12 px-[156px] pt-[100px]">
      {/* Figma 231:104005: 3D line drawing at 20%, mirrored, left edge. */}
      <div aria-hidden className="pointer-events-none absolute top-[1286.254px] left-0 h-[335px] w-[292px] -scale-x-100 opacity-20">
        <img src={`${A}/wire-deco.svg`} alt="" className="bres-deco block size-full max-w-none" />
      </div>
      <CenterHead
        eyebrow="IDEATION  ·  02.1"
        title="Wireframing"
        lead="Page wireframes mapped every template — home, services, trading platforms, brokerage and financial reports — before any pixel of UI."
        leadWidth={760}
      />
      <Reveal className="shrink-0" enter={60}>
        <div
          ref={board}
          className="relative flex items-start rounded-[22.489px] p-[18.741px]"
          style={{
            /* Figma 3px #fdb525 inside stroke, kept out of layout as in Figma. */
            boxShadow: "inset 0 0 0 3px #fdb525",
            backgroundImage:
              "linear-gradient(263.62deg, rgb(27,70,141) 37.819%, rgb(37,45,105) 68.931%), linear-gradient(90deg, #fff 0%, #fff 100%)",
          }}
        >
          <div className="flex flex-col items-start gap-[18.741px]">
            {WIRE_ROWS.map((row, r) => (
              <div key={r} className={`flex items-start gap-4 ${r === 0 ? "w-full justify-center" : ""}`}>
                {row.map((wf) => (
                  <div key={wf.n} data-rv className="shrink-0">
                    <div className="wd-hover relative overflow-hidden" style={{ width: wf.w, height: wf.h }}>
                      <img
                        src={`${A}/wire-${wf.n}.webp`}
                        alt={t("BSC page wireframe {n}", { n: wf.n })}
                        className="absolute left-0 top-0 block w-full max-w-none"
                        style={
                          wf.crop
                            ? { height: `${wf.crop}%` }
                            : { height: "100%", objectFit: wf.fit ?? "cover" }
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */

/** 01.1 Competitors research, 01.2 Solution, Phase 02 band, 02.1 Wireframing. */
export function BscResearch() {
  return (
    <>
      <CompetitorsResearch />
      <Solution />
      <PhaseSystem />
      <Wireframing />
    </>
  );
}
