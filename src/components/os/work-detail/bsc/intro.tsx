"use client";
/* eslint-disable @next/next/no-img-element -- static Figma exports, sized exactly; next/image adds nothing here. */

import "./bsc-intro.css";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "../../reveal";
import { sappBeVietnam } from "../sapp/fonts";
import { BscEyebrow, BscHeading } from "./parts";
import { useT } from "@/lib/i18n";

const A = "/figma/bsc/intro";
const BLUE = "#295ca9";
const MONO = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap";

/** Group "Intro": hero, process highlight, vision, Phase 01 band (Figma 223:13361 → 223:13521). */
export function BscIntro() {
  return (
    <>
      <Reveal>
        <BscHero />
      </Reveal>
      <Reveal>
        <BscOverview />
      </Reveal>
      <Reveal>
        <BscVision />
      </Reveal>
      <BscPhaseBand
        id="wd-phase-research"
        num="01"
        title="Research phase"
        text="Before pixels: how do Vietnam's leading securities firms present themselves online — and where can BSC stand apart?"
        chips={["01.1  Competitors research", "01.2  Solution"]}
      />
    </>
  );
}

/* ───────────────────────── Hero (223:13361) ───────────────────────── */

const HERO_FACTS: { label: string; lines: string[] }[] = [
  { label: "Position:", lines: ["UI Designer", "Graphic Designer"] },
  { label: "Target:", lines: ["Partners, age range", "from 30-54"] },
  { label: "Platform:", lines: ["Mobile,", "Website"] },
  { label: "Status:", lines: ["Launched"] },
];

/** Outline-art pieces: [file, box inset, img inset (vector stroke bleed)]. */
type Line = [string, string, string];

/* Right building (231:103824): 268.733×266.315, clipped, 20% opacity. */
const DECO_RIGHT: Line[] = [
  ["g0", "15.75% 13.04% 63.85% 32.7%", "-1.84% -0.69%"],
  ["g1", "2.35% 67.29% 63.85% 10.18%", "-1.11% -1.65%"],
  ["g2", "22.29% -34.85% 53.46% 118.04%", "-0.58% -0.83%"],
  ["g3", "0 -34.85% 66.75% 10.18%", "-1.13% -0.3%"],
  ["g4", "15.75% -18.04% 56.96% 86.96%", "-1.38% -1.2%"],
  ["g5", "20.47% 33.15% 53.14% 40.82%", "-1.42% -1.43%"],
  ["g6", "36.52% -12.35% 42.57% 83.94%", "-1.8% -1.31%"],
  ["g7", "52.84% 16.06% 42.45% 41.09%", "-7.97% -0.87%"],
  ["g8", "20.36% -12.35% 47.04% 40.82%", "-1.15% -0.52%"],
  ["g9", "52.77% -38.75% 0.21% 0", "-0.8% -0.27%"],
  ["g10", "39.75% -38.75% 20.46% 0", "-0.94% -0.27%"],
];

/* Left building (231:103795): 365.4×325.496, clipped, 20% opacity. g20 is the rotated edge drawn separately. */
const DECO_LEFT: Line[] = [
  ["g11", "19.56% 40.96% 73.6% 16.84%", "-1.68% -0.24%"],
  ["g12", "19.56% 83.15% 35.8% -20.24%", "-0.69% -0.74%"],
  ["g13", "40.09% 120.18% 35.8% -52.91%", "-0.48% -0.31%"],
  ["g14", "3.28% 40.95% 57.57% -52.85%", "-0.78% -0.24%"],
  ["g15", "42.45% 76.41% 35.7% -9.22%", "-1.41% -0.83%"],
  ["g16", "42.53% 70.21% 31.83% 23.54%", "-1.2% -4.38%"],
  ["g17", "24.52% 33.18% 49.31% 66.76%", "-0.44% -165.34%"],
  ["g18", "24.52% 2.01% -2.95% 29.73%", "-0.39% -0.4%"],
  ["g19", "62.63% 2.05% -24.73% 29.68%", "-0.49% -0.4%"],
  ["g21", "24.4% 40.97% 33.29% -9.16%", "-0.73% -0.4%"],
  ["g22", "48.65% 40.99% 11.52% 29.71%", "-0.77% -0.93%"],
  ["g23", "73.53% 70.24% -22.49% 29.68%", "-0.24% -120.53%"],
];

function Deco({ lines, style, children }: { lines: Line[]; style: CSSProperties; children?: ReactNode }) {
  return (
    <div aria-hidden className="pointer-events-none absolute overflow-clip opacity-20" style={style}>
      {lines.map(([f, box, bleed]) => (
        <div key={f} className="absolute" style={{ inset: box }}>
          <img src={`${A}/hero/${f}.svg`} alt="" className="absolute block max-w-none" style={{ inset: bleed }} />
        </div>
      ))}
      {children}
    </div>
  );
}

function BscHero() {
  const t = useT();
  return (
    <section id="wd-overview-hero" className="relative p-8">
      <div className="relative h-[850.5px] w-[1808px]">
        {/* IMG/hero_bg (223:13363) */}
        <img src={`${A}/hero/bg.png`} alt="" aria-hidden className="absolute top-0 left-0 block h-[850px] w-[1808px] max-w-none rounded-[50px] object-cover" />
        {/* BSC logo (231:103862) */}
        <img
          src={`${A}/hero/logo.svg`}
          alt={t("BSC — BIDV Securities JSC")}
          className="absolute block max-w-none"
          style={{ left: 697, top: 224 - 2.223, width: 414 + 2.277, height: 247 + 2.223 }}
        />
        {/* Facts card (231:103848): Figma blurs the backdrop 3px; the art behind is a smooth gradient, so the 80% fill alone matches (no runtime backdrop-filter). */}
        <div
          className={`wd-hover absolute flex w-[846px] items-start justify-between rounded-[24px] bg-[rgba(64,79,154,0.8)] px-8 py-6 text-white shadow-[0_4.178px_17.34px_0_rgba(0,0,0,0.15)] ${sappBeVietnam.className}`}
          style={{ left: 481, top: 610.05 }}
        >
          {HERO_FACTS.map((f) => (
            <div key={f.label} className="flex shrink-0 flex-col items-start gap-2 whitespace-nowrap">
              <p className="text-[24px] leading-[1.5] font-bold">{t(f.label)}</p>
              <div className="text-base leading-[1.5] font-medium">
                {f.lines.map((l) => (
                  <p key={l}>{t(l)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Deco lines={DECO_RIGHT} style={{ left: 1539, top: 246.9, width: 268.733, height: 266.315 }} />
        <Deco lines={DECO_LEFT} style={{ left: 0, top: 525, width: 365.4, height: 325.496 }}>
          {/* 231:103814: a 137.76×0.88 edge turned upright (rotate -89.93°, mirrored), centred at (108.71, 219.5). */}
          <img
            src={`${A}/hero/g20.svg`}
            alt=""
            className="absolute block max-w-none"
            style={{ left: 108.71 - 68.878, top: 219.5 - 0.442, width: 137.756, height: 0.8835, transform: "rotate(-89.93deg) scaleX(-1)" }}
          />
        </Deco>
      </div>
    </section>
  );
}

/* ──────────────────── Process Highlight (223:13378 · Bento v2 640:29430) ──────────────────── */

const OV_LABEL = `${MONO} text-[#4b4f58]`;
const OV_LIST = "flex w-full flex-col items-start gap-1.5 text-[20px] leading-[30px] tracking-[-0.1px] text-[#0a0a0a]";
const OV_COL = "flex min-w-px flex-1 flex-col items-start gap-5 self-stretch px-9 pt-8 pb-9";
const OV_RULE = "border-l border-solid border-[rgba(10,10,15,0.08)]";

function Statement({ kicker, dot, title, body, className }: { kicker: string; dot: string; title: string; body: string; className: string }) {
  const t = useT();
  return (
    <div className={`flex min-w-px flex-1 flex-col items-start gap-5 py-2 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="size-2 shrink-0 rounded-full" style={{ background: dot }} />
        <p className={OV_LABEL}>{t(kicker)}</p>
      </div>
      <p className="w-full text-[36px] leading-[44px] font-semibold tracking-[-0.72px] text-[#0a0a0a]">{t(title)}</p>
      <p className="w-full text-[22px] leading-[34px] tracking-[-0.11px] text-[#4b4f58]">{t(body)}</p>
    </div>
  );
}

/** Logo/Figma (86:2824) at 56px: dark 3D tile. */
function FigmaTile() {
  return (
    <div
      className="relative size-14 shrink-0 rounded-[14px] bg-gradient-to-b from-[#2c3445] to-[#1c2230]"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(3,5,15,0.15), inset 0 -3.75px 6.75px 0 rgba(3,5,15,0.35), inset 0 0.75px 0.75px 0 rgba(255,255,255,0.08), inset 0 -1.125px 0.75px 0 rgba(255,255,255,0.22)",
      }}
    >
      <div className="absolute inset-[17.19%_28.41%_17.71%_28.13%]">
        <img src={`${A}/ov/figma-glyph.svg`} alt="Figma" className="absolute inset-[-4.01%_-12.01%_-12.03%_-12.02%] block size-auto max-w-none" />
      </div>
    </div>
  );
}

/** Logo/Illustrator, Logo/Photoshop: the export carries its own shadow, so it bleeds past the 56px box. */
function ToolTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-14 shrink-0">
      <img src={src} alt={alt} className="absolute inset-[-21.43%_-28.57%_-35.71%_-28.57%] block max-w-none" />
    </div>
  );
}

function BscOverview() {
  const t = useT();
  return (
    <section id="wd-overview" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <div className="flex flex-col items-start gap-4">
        <BscEyebrow label="PROCESS HIGHLIGHT" />
        <BscHeading>{t("Overview")}</BscHeading>
      </div>
      <div className="flex w-full flex-col items-start gap-14 pb-2">
        <div className="bov-row flex w-full items-start">
          <Statement
            className="pr-14"
            kicker="01 — CHALLENGE"
            dot="#b8bcc6"
            title="A financial website for a new BSC"
            body="Individual-first design no longer fit: most retail users trade on their phones, so BSC needed a new homepage built around its corporate audience."
          />
          <div className="flex w-16 shrink-0 flex-col items-center gap-3 self-stretch">
            <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
            <div className="bov-arrow flex size-14 shrink-0 items-center justify-center rounded-full border border-solid border-[rgba(10,10,15,0.08)] bg-white shadow-[0_4px_14px_0_rgba(10,10,15,0.08)]">
              <img src={`${A}/ov/arrow.svg`} alt="" className="block size-6" />
            </div>
            <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
          </div>
          <Statement
            className="pl-14"
            kicker="02 — OPPORTUNITY"
            dot={BLUE}
            title="Refreshed brand, profiles & stock data"
            body="Create a unique website with refreshed branding elements, company profiles and stock statistics."
          />
        </div>
        <div className="wd-hover relative flex w-full items-start overflow-hidden rounded-[28px] bg-white shadow-[6px_6px_0_0_rgba(110,155,230,0.38),inset_0_1px_0_0_var(--cmd-edge)]">
          <div className={OV_COL}>
            <p className={OV_LABEL}>{t("TIMELINE")}</p>
            <div className="flex w-full flex-col items-start gap-1">
              <p className="w-full text-[26px] leading-[34px] font-semibold tracking-[-0.52px] text-[#0a0a0a]">{t("October 2023")}</p>
              <p className="w-full text-[20px] leading-[30px] tracking-[-0.1px] text-[#4b4f58]">{t("→ Dec 2023")}</p>
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("DISCIPLINES")}</p>
            <div className={OV_LIST}>
              {["User Experience Design", "User Interface Design"].map((d) => (
                <p key={d} className="w-full">
                  {t(d)}
                </p>
              ))}
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("RESPONSIBILITIES")}</p>
            <div className={OV_LIST}>
              {["UX Research", "Sketching", "UI Design"].map((d) => (
                <p key={d} className="w-full">
                  {t(d)}
                </p>
              ))}
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("TOOLS USING")}</p>
            <div className="flex items-start gap-2.5">
              <FigmaTile />
              <ToolTile src={`${A}/ov/illustrator.svg`} alt="Adobe Illustrator" />
              <ToolTile src={`${A}/ov/photoshop.svg`} alt="Adobe Photoshop" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Our Vision (223:13429) ───────────────────────── */

function BscVision() {
  const t = useT();
  return (
    <section id="wd-vision" className="relative flex flex-col items-start px-[156px] pt-40">
      {/* Brand-mark shards (231:105338): 50% opacity, top-right, running 169px past the section. */}
      <div aria-hidden className="pointer-events-none absolute overflow-clip opacity-50" style={{ left: 1237, top: -0.5, width: 635, height: 689 }}>
        <img src={`${A}/vision/deco-a.svg`} alt="" className="absolute block max-w-none" style={{ inset: "16.27% 19.56% 38.6% 31.42%" }} />
        <img src={`${A}/vision/deco-b.svg`} alt="" className="absolute block max-w-none" style={{ inset: "-6.25% 19.57% 64.39% 0" }} />
        <img src={`${A}/vision/deco-c.svg`} alt="" className="absolute block max-w-none" style={{ inset: "16.27% -8.46% -0.09% 59.43%" }} />
      </div>
      <div className="relative flex w-full items-center justify-between pl-20">
        <img src={`${A}/vision/logo.svg`} alt={t("BSC — BIDV Securities JSC")} className="block h-[281px] w-[449px] shrink-0" />
        <div className="flex shrink-0 flex-col items-start gap-10">
          <BscEyebrow label="BACKGROUND  ·  PRODUCT VISION" />
          <p className="w-[797px] text-[44px] leading-[56px] tracking-[-1.1px] text-[#8a8f98]">
            {t("BSC is one of the largest securities companies in Vietnam. ")}
            <span className="text-[#0a0a0a]">
              {t("Since 2023 it has re-oriented from individual customers to corporate clients and institutions — so the old website no longer fit.")}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Phase band (Figma 223:13521; reusable for Phase 02 / 03)            */
/* ================================================================== */

/* Blurred 18% white disc (blur 190) re-expressed as a radial gradient — no CSS blur. Tuned for the 513px disc. */
const GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.108) 0%, rgba(255,255,255,0.098) 20%, rgba(255,255,255,0.075) 40%, rgba(255,255,255,0.04) 63%, rgba(255,255,255,0.012) 85%, rgba(255,255,255,0) 100%)";
/** Figma layer-blur 190 spreads 2σ = 380px past the disc on every side. */
const GLOW_BLEED = 380;

export type BscPhaseBandProps = {
  /** Section id (e.g. "wd-phase-research"). */
  id: string;
  /** "01" — drawn as the 180px phase number and in the "PHASE 01" label. */
  num: string;
  title: string;
  text: ReactNode;
  chips: string[];
  /** Band fill (Figma `phase/bsc-research-solid`, #00a488 on phase 01). */
  solid?: string;
  /** 12px offset shadow and dot-grid colour (Figma `phase/bsc-research-deep`, #006b59 on phase 01). */
  deep?: string;
  /** Number, label, title and description colour. */
  ink?: string;
  /** Chip label colour / chip fill (Figma `phase/bsc-chip-ink` #14203f on white). */
  chipInk?: string;
  chipBg?: string;
  /** Dot grid opacity (30% multiply in Figma). */
  dotOpacity?: number;
  /** Section height (Figma: 572 on phase 01, 511 on 02, 500 on 03). */
  height?: number;
  /** Band top inside the section (181.5 / 99.89 / 100.07). */
  bandTop?: number;
  /** Figma "Glow" ellipse inside the band: x, y, diameter. false hides it. */
  glow?: { x: number; y: number; d: number } | false;
  /** Copy column offset from the band's left edge, and the Steps row width. */
  copyLeft?: number;
  stepsWidth?: number;
};

/** Figma "Phase 0X — … phase": 1640×400 band, 12px offset shadow, glow, dot grid, number, copy and step chips. */
export function BscPhaseBand({
  id,
  num,
  title,
  text,
  chips,
  solid = "#00a488",
  deep = "#006b59",
  ink = "#ffffff",
  chipInk = "#14203f",
  chipBg = "#ffffff",
  dotOpacity = 0.3,
  height = 572,
  bandTop = 181.5,
  glow = { x: 1203, y: 74, d: 513 },
  copyLeft = 520,
  stepsWidth = 900,
}: BscPhaseBandProps) {
  const t = useT();
  const dotGrid: CSSProperties = {
    opacity: dotOpacity,
    backgroundImage: `radial-gradient(circle at 1.05px 1px, ${deep} 0.75px, transparent 1.15px)`,
    backgroundSize: "25.2308px 24px",
  };
  return (
    <section id={id} className="relative w-full" style={{ height }}>
      <div className="absolute left-[116px] h-[400px] w-[1640px]" style={{ top: bandTop }}>
        <Reveal className="size-full" enter={80}>
          <div className="relative size-full overflow-clip rounded-[40px]" style={{ background: solid, boxShadow: `12px 12px 0 0 ${deep}` }}>
          {glow ? (
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                left: glow.x - GLOW_BLEED,
                top: glow.y - GLOW_BLEED,
                width: glow.d + GLOW_BLEED * 2,
                height: glow.d + GLOW_BLEED * 2,
                backgroundImage: GLOW,
              }}
            />
          ) : null}
          <div aria-hidden className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply" style={dotGrid} />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap" style={{ color: ink }}>
            {num}
          </p>
          <div className="absolute top-1/2 flex -translate-y-1/2 flex-col items-start gap-[18px]" style={{ left: copyLeft, color: ink }}>
            <p className={MONO}>{t("PHASE {num}", { num })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t(title)}</p>
            <p className="w-[860px] text-[20px] leading-[28px]">{typeof text === "string" ? t(text) : text}</p>
            <div className="flex flex-wrap content-start items-start gap-2" style={{ width: stepsWidth }}>
              {chips.map((c) => (
                <span
                  key={c}
                  className="wd-hover flex items-center rounded-full px-3 py-1.5 text-[16px] leading-[24px] tracking-[-0.2px] whitespace-pre"
                  style={{ color: chipInk, background: chipBg }}
                >
                  {t(c)}
                </span>
              ))}
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
