"use client";
/* eslint-disable @next/next/no-img-element -- static Figma exports, sized exactly; next/image adds nothing here. */

import "./rum-brand.css";
import type { CSSProperties, ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { sappBeVietnam } from "../sapp/fonts";
import { RumEyebrow, RumHeading } from "./parts";
import { HeroFit } from "../shell";

const A = "/figma/rum/brand";
const INK = "#111224";
const MONO =
  "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap";
const BODY = "text-[16px] leading-[24px] tracking-[-0.2px]";
const H4 = "text-[20px] leading-[28px] font-semibold tracking-[-0.4px]";
const MONO_S = "font-mono text-[14px] leading-[22px] whitespace-nowrap";
const iv = (i: number) => ({ "--i": i }) as CSSProperties;

/** Group "Brand": hero, process highlight, vision, Phase 01 band, naming, logo structure, brand character (Figma 343:90412 → 346:16553). */
export function RumBrand() {
  return (
    <>
      <Reveal>
        <RumHero />
      </Reveal>
      <RumOverview />
      <RumVision />
      <RumPhaseBand
        id="wd-phase-brand"
        num="01"
        title="Brand identity"
        text="Naming the brand, building the logo on a grid and giving it a mascot."
        chips={[
          "01.1  Naming & key visual",
          "01.2  Logo structure",
          "01.3  Brand character",
        ]}
      />
      <RumNaming />
      <RumLogoStructure />
      <RumCharacter />
    </>
  );
}

/* ───────────────────────── Shared head (eyebrow + H2, 40px, lead) ───────────────────────── */

function Head({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  const t = useT();
  return (
    <>
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <RumEyebrow label={eyebrow} />
          <RumHeading>{t(title)}</RumHeading>
        </div>
      </Reveal>
      <Reveal enter={40}>
        <p className="w-[900px] text-[20px] leading-[28px] text-[var(--cmd-text-secondary)]">
          {t(lead)}
        </p>
      </Reveal>
    </>
  );
}

/** "Brand/98rum Logo" vector (the instance's frame runs 0.03% past its right edge). */
function Logo({
  w,
  h,
  className = "",
  alt = "",
}: {
  w: number;
  h: number;
  className?: string;
  alt?: string;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: w, height: h }}
    >
      <img
        src={`${A}/logo.svg`}
        alt={alt}
        className="absolute block h-full max-w-none"
        style={{ left: 0, top: 0, width: "100.03%" }}
      />
    </div>
  );
}

/** "Brand/Cap'n Rum" vector (inset 0.17% 0.09% 0.13% -0.13%). */
function CapnRum({ w, h, alt = "" }: { w: number; h: number; alt?: string }) {
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <img
        src={`${A}/capn-rum.svg`}
        alt={alt}
        className="absolute block max-w-none"
        style={{
          left: "-0.13%",
          top: "0.17%",
          width: "100.04%",
          height: "99.7%",
        }}
      />
    </div>
  );
}

/* ───────────────────────── Hero (343:90412) ───────────────────────── */

const HERO_FACTS: { label: string; lines: string[] }[] = [
  { label: "Position:", lines: ["Graphic Designer"] },
  { label: "Target:", lines: ["Young people", "around 18–27"] },
  { label: "Platform:", lines: ["Branding,", "Publishing"] },
  { label: "Status:", lines: ["Launching"] },
];

function RumHero() {
  const t = useT();
  return (
    <section id="wd-overview-hero" className="relative p-8">
      <HeroFit backdropStyle={{ backgroundColor: "#f4d499" }}>
        {/* IMG/hero_bg (343:90414): a flat sand fill in Figma, no photo. */}
        <div className="absolute inset-0 rounded-[50px] bg-[#f4d499]" />
        <div className="rb-hero-logo absolute" style={{ left: 644, top: 219 }}>
          <Logo w={520} h={225} alt="98rum" />
        </div>
        {/* Facts (343:90416): 60% white over the flat sand, so the 12px backdrop blur has nothing to blur. */}
        <div className="rb-hero-facts absolute" style={{ left: 481, top: 610 }}>
          <div
            className={`wd-hover flex w-[846px] items-start justify-between rounded-[24px] bg-[rgba(255,255,255,0.6)] px-8 py-6 ${sappBeVietnam.className}`}
            style={{ color: INK }}
          >
            {HERO_FACTS.map((f) => (
              <div
                key={f.label}
                className="flex shrink-0 flex-col items-start gap-2 whitespace-nowrap"
              >
                <p className="text-[24px] leading-[1.5] font-bold">
                  {t(f.label)}
                </p>
                <div className="text-base leading-[1.5] font-medium">
                  {f.lines.map((l) => (
                    <p key={l}>{t(l)}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="rb-hero-capn absolute"
          style={{ left: 1368, top: 440.92 }}
        >
          <div className="rb-capn-hover">
            <CapnRum
              w={400}
              h={399.076}
              alt={t("Cap'n Rum, the 98rum mascot")}
            />
          </div>
        </div>
      </HeroFit>
    </section>
  );
}

/* ──────────────────── Process Highlight (343:90429 · Bento v2 640:29580) ──────────────────── */

const OV_LABEL = `${MONO} text-[var(--cmd-text-secondary)]`;
const OV_LIST =
  "flex w-full flex-col items-start gap-1.5 text-[20px] leading-[30px] tracking-[-0.1px] text-[var(--cmd-text-primary)]";
const OV_COL =
  "flex min-w-px flex-1 flex-col items-start gap-5 self-stretch px-9 pt-8 pb-9";
const OV_RULE = "border-l border-solid border-[rgba(10,10,15,0.08)]";

function Statement({
  kicker,
  dot,
  title,
  body,
  className,
}: {
  kicker: string;
  dot: string;
  title: string;
  body: string;
  className: string;
}) {
  const t = useT();
  return (
    <div
      className={`flex min-w-px flex-1 flex-col items-start gap-5 py-2 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ background: dot }}
        />
        <p className={OV_LABEL}>{t(kicker)}</p>
      </div>
      <p className="w-full text-[36px] leading-[44px] font-semibold tracking-[-0.72px] text-[var(--cmd-text-primary)]">
        {t(title)}
      </p>
      <p className="w-full text-[22px] leading-[34px] tracking-[-0.11px] text-[var(--cmd-text-secondary)]">
        {t(body)}
      </p>
    </div>
  );
}

/** Logo/Illustrator · Logo/Photoshop at 56px (vector export carries its own shadow bleed). */
function ToolTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rb-tool relative size-14 shrink-0">
      <img
        src={src}
        alt={alt}
        className="absolute block max-w-none"
        style={{
          inset: "-21.43% -28.57% -35.71% -28.57%",
          width: "157.14%",
          height: "157.14%",
        }}
      />
    </div>
  );
}

function RumOverview() {
  const t = useT();
  return (
    /* Figma fixes the section at 736px; the bento runs 136px past it into Our Vision's top padding. */
    <section
      id="wd-overview"
      className="relative flex h-[736px] flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <RumEyebrow label="PROCESS HIGHLIGHT" />
          <RumHeading>{t("Overview")}</RumHeading>
        </div>
      </Reveal>
      <div className="flex w-full flex-col items-start gap-14 pb-2">
        <Reveal className="w-full" enter={40}>
          <div className="rb-ov-row flex w-full items-start">
            <Statement
              className="pr-14"
              kicker="01 — CHALLENGE"
              dot="#b8bcc6"
              title="Build a local brand from a blank page"
              body="No name, no logo, no voice. 98rum needed an identity that is comfortable, versatile indoors or out, and bright enough for young people."
            />
            <div className="flex w-16 shrink-0 flex-col items-center gap-3 self-stretch">
              <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-solid border-[rgba(10,10,15,0.08)] bg-white shadow-[0_4px_14px_0_rgba(10,10,15,0.08)]">
                <img
                  src={`${A}/ov-arrow.svg`}
                  alt=""
                  className="rb-ov-arrow block size-6"
                />
              </div>
              <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
            </div>
            <Statement
              className="pl-14"
              kicker="02 — OPPORTUNITY"
              dot="var(--brand-rum)"
              title="Turn the founder's story into a character"
              body="Born in '98, loves rum: a rum cup in a pirate hat became the logo, the mascot and the brand's playful voice."
            />
          </div>
        </Reveal>
        <Reveal className="w-full" enter={40}>
          <div
            className="wd-hover relative flex w-full items-start overflow-hidden rounded-[28px] bg-white"
            style={{
              boxShadow:
                "6px 6px 0 0 rgba(41,92,169,0.32), inset 0 1px 0 0 var(--cmd-edge)",
            }}
          >
            <div className={OV_COL}>
              <p className={OV_LABEL}>{t("TIMELINE")}</p>
              <p className="w-full text-[26px] leading-[34px] font-semibold tracking-[-0.52px] text-[var(--cmd-text-primary)]">
                2023
              </p>
            </div>
            <div className={`${OV_COL} ${OV_RULE}`}>
              <p className={OV_LABEL}>{t("DISCIPLINES")}</p>
              <div className={OV_LIST}>
                {["Naming", "Brand identity"].map((d) => (
                  <p key={d} className="w-full">
                    {t(d)}
                  </p>
                ))}
              </div>
            </div>
            <div className={`${OV_COL} ${OV_RULE}`}>
              <p className={OV_LABEL}>{t("RESPONSIBILITIES")}</p>
              <div className={OV_LIST}>
                {[
                  "Name",
                  "Logo",
                  "Mascot",
                  "Colour",
                  "Typography",
                  "Print & OOH",
                ].map((d) => (
                  <p key={d} className="w-full">
                    {t(d)}
                  </p>
                ))}
              </div>
            </div>
            <div className={`${OV_COL} ${OV_RULE}`}>
              <p className={OV_LABEL}>{t("TOOLS USING")}</p>
              <div className="flex items-start gap-2.5">
                <ToolTile src={`${A}/tool-ai.svg`} alt="Adobe Illustrator" />
                <ToolTile src={`${A}/tool-ps.svg`} alt="Adobe Photoshop" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Our Vision (343:90477) ───────────────────────── */

function RumVision() {
  const t = useT();
  return (
    <section
      id="wd-vision"
      className="relative flex flex-col items-start pt-40 pr-[156px] pl-[236px]"
    >
      <div className="relative flex w-full items-center justify-between">
        <Reveal enter={60}>
          <div className="rb-vis-logo relative h-[232px] w-[532px]">
            <img
              src={`${A}/vision-logo.svg`}
              alt="98rum"
              className="absolute top-0 left-0 block h-full max-w-none"
              style={{ width: "100.03%" }}
            />
          </div>
        </Reveal>
        <div className="flex shrink-0 flex-col items-start gap-10">
          <Reveal enter={60}>
            <RumEyebrow label="BACKGROUND  ·  BRAND STORY" />
          </Reveal>
          <Reveal enter={40}>
            <p className="w-[797px] text-[44px] leading-[56px] tracking-[-1.1px] text-[#8a8f98]">
              {t("Comfortable, versatile, youthful.")}{" "}
              <span className="text-[#0a0a0a]">
                {t(
                  "98rum is a local fashion brand you can wear indoors and out — and its name, logo and mascot were all built to speak to people aged 18–27.",
                )}
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Phase band (343:90491; reused by Phase 02 / 03) ───────────────────────── */

/* Blurred 18% white disc (r 256.5, blur 190 → 1273px box) re-expressed as a radial gradient — no CSS blur. */
const GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.108) 0%, rgba(255,255,255,0.098) 20%, rgba(255,255,255,0.075) 40%, rgba(255,255,255,0.04) 63%, rgba(255,255,255,0.012) 85%, rgba(255,255,255,0) 100%)";

export type RumPhaseBandProps = {
  /** Section id (e.g. "wd-phase-brand"). */
  id: string;
  /** "01" — drawn as the 180px phase number and in the "PHASE 01" label. */
  num: string;
  title: string;
  text: ReactNode;
  chips: string[];
  /** Band fill (Figma `phase/rum-identity-solid` #00aeef; system #ea7643; app #111224). */
  solid?: string;
  /** 12px offset shadow (Figma `phase/rum-identity-deep` #0077a8; system #b04e22; app #000000). */
  shadow?: string;
  /** Number, label, title and description colour. */
  ink?: string;
  /** Chip label colour / chip fill (Figma `phase/rum-chip-ink` #111224 on white). */
  chipInk?: string;
  chipBg?: string;
  /** Dot grid (dots on a 25.23×24 grid, multiply). Phase 01: #0077a8 at 30%. */
  dotColor?: string;
  dotOpacity?: number;
  /** Figma "Glow" ellipse inside the band: x, y and diameter (Phase 01: 1203 / 74 / 513). null hides it. */
  glow?: { x: number; y: number; d: number } | null;
  /** Section height and band top inside it (Phase 01: 572 / 181.5; Phase 02: 511 / 99.89; Phase 03: 500 / 100.07). */
  height?: number;
  top?: number;
};

/** Figma "Phase 0X — …": 1640×400 band, offset shadow, glow, dot grid, number, copy and step chips. */
export function RumPhaseBand({
  id,
  num,
  title,
  text,
  chips,
  solid = "#00aeef",
  shadow = "#0077a8",
  ink = "#ffffff",
  chipInk = INK,
  chipBg = "#ffffff",
  dotColor = "#0077a8",
  dotOpacity = 0.3,
  glow = { x: 1203, y: 74, d: 513 },
  height = 572,
  top = 181.5,
}: RumPhaseBandProps) {
  const t = useT();
  const dotGrid: CSSProperties = {
    opacity: dotOpacity,
    backgroundImage: `radial-gradient(circle at 1.05px 1px, ${dotColor} 0.75px, transparent 1.15px)`,
    backgroundSize: "25.2308px 24px",
  };
  /* The blur reaches 380px past a 513px disc (Figma export box 1273); scale that box with the disc. */
  const box = glow ? (glow.d * 1273) / 513 : 0;
  return (
    <section id={id} className="relative w-full" style={{ height }}>
      <div
        className="absolute left-[116px] h-[400px] w-[1640px]"
        style={{ top }}
      >
        <Reveal className="size-full" enter={80}>
          <div
            className="relative size-full overflow-clip rounded-[40px]"
            style={{ background: solid, boxShadow: `12px 12px 0 0 ${shadow}` }}
          >
            {glow ? (
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  left: glow.x + glow.d / 2 - box / 2,
                  top: glow.y + glow.d / 2 - box / 2,
                  width: box,
                  height: box,
                  backgroundImage: GLOW,
                }}
              />
            ) : null}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply"
              style={dotGrid}
            />
            <p
              className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap"
              style={{ color: ink }}
            >
              {num}
            </p>
            <div
              className="absolute top-1/2 left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px]"
              style={{ color: ink }}
            >
              <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">
                {t("PHASE {n}", { n: num })}
              </p>
              <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">
                {t(title)}
              </p>
              <p className="w-[860px] text-[20px] leading-[28px]">
                {typeof text === "string" ? t(text) : text}
              </p>
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
      </div>
    </section>
  );
}

/* ───────────────────────── 01.1 Naming & key visual (346:16416) ───────────────────────── */

const OP = `${sappBeVietnam.className} shrink-0 text-center text-[64px] leading-none font-bold tracking-[-1.92px] whitespace-nowrap`;

function Operator({
  sign,
  i,
  className = "",
}: {
  sign: string;
  i: number;
  className?: string;
}) {
  return (
    <p
      aria-hidden
      className={`${OP} ${className}`}
      style={{ ...iv(i), color: INK }}
    >
      {sign}
    </p>
  );
}

function WordTile({
  word,
  caption,
  bg,
  i,
}: {
  word: string;
  caption: string;
  bg: string;
  i: number;
}) {
  const t = useT();
  return (
    <div className="rb-eq min-w-px flex-1" style={iv(i)}>
      <div
        className="wd-hover flex h-[320px] w-full flex-col items-start justify-between rounded-[28px] p-10 whitespace-nowrap text-white"
        style={{ background: bg }}
      >
        <p
          className={`${sappBeVietnam.className} text-[140px] leading-none font-bold tracking-[-4.2px]`}
        >
          {word}
        </p>
        <p className={H4}>{t(caption)}</p>
      </div>
    </div>
  );
}

function RumNaming() {
  const t = useT();
  return (
    <section
      id="wd-naming"
      className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow="BRAND IDENTITY  ·  01.1"
        title="Born in '98, raised on rum"
        lead="The name comes from the founder — born in 1998, with a soft spot for rum. The logo idea started there too: a rum cup and a pirate hat, for a pirate-style fashion house with a bit of youthful chivalry."
      />
      <Reveal className="w-full reveal-fade" enter={80}>
        <div className="flex w-full items-center gap-6">
          <WordTile
            word="98"
            caption="The year the founder was born"
            bg="#00aeef"
            i={0}
          />
          <Operator sign="+" i={1} className="rb-eq-op" />
          <WordTile
            word="rum"
            caption="The drink they love"
            bg="#ea7643"
            i={2}
          />
          <Operator sign="=" i={3} className="rb-eq-op" />
          <div className="rb-eq w-[560px] shrink-0" style={iv(4)}>
            <div className="rb-lift-host wd-hover flex h-[320px] w-full flex-col items-center justify-center rounded-[28px] bg-[#f4d499] p-10">
              <div className="rb-eq-logo">
                <div className="rb-lift">
                  <Logo w={420} h={181.745} alt="98rum" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal className="w-full" enter={40}>
        <div className="rb-photo relative h-[764px] w-full overflow-hidden rounded-[32px]">
          <img
            src={`${A}/key-visual.webp`}
            alt={t(
              "98rum key visual: Cap'n Rum beside the headline “Cap'n Rum need your support. Come'n get your rum.”",
            )}
            className="absolute inset-0 block size-full max-w-none object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 01.2 Logo structure (346:16456) ───────────────────────── */

/** Grid stage lines: 19 verticals and 11 horizontals at 44px (= 1a), from (124, 38). */
const V_LINES = Array.from({ length: 19 }, (_, i) => 124 + i * 44);
const H_LINES = Array.from({ length: 11 }, (_, i) => 38 + i * 44);
const GRID_LINE = "rgba(0,174,239,0.18)";

function GridStage() {
  const t = useT();
  return (
    <div className="rb-lift-host wd-hover relative h-[560px] w-[1040px] shrink-0 overflow-clip rounded-[32px] bg-white">
      {V_LINES.map((x, i) => (
        <div
          key={`v${x}`}
          aria-hidden
          className="rb-gv absolute top-[38px] h-[440px] w-px"
          style={{ left: x, background: GRID_LINE, ...iv(i) }}
        />
      ))}
      {H_LINES.map((y, i) => (
        <div
          key={`h${y}`}
          aria-hidden
          className="rb-gh absolute left-[124px] h-px w-[792px]"
          style={{ top: y, background: GRID_LINE, ...iv(i) }}
        />
      ))}
      {/* Clear space (346:16496): the one dashed rule Figma draws on this stage. */}
      <div
        aria-hidden
        className="rb-clear absolute top-[38px] left-[124px] h-[440px] w-[792px] border-[1.5px] border-dashed border-[#ea7643]"
      />
      <div className="rb-grid-logo absolute" style={{ left: 212, top: 125 }}>
        <div className="rb-lift">
          <Logo
            w={616}
            h={266.56}
            alt={t("98rum logo on its construction grid")}
          />
        </div>
      </div>
      {/* Dimension markers: 14a across, 6a down, then the 2a clear-space tag. */}
      <img
        src={`${A}/dim-14a.svg`}
        alt=""
        aria-hidden
        className="rb-dim-x absolute block max-w-none"
        style={{
          left: 212 - 0.74,
          top: 420 - 5.52,
          width: 617.5,
          height: 11.046,
          ...iv(0),
        }}
      />
      <p
        className={`rb-dim-label absolute ${MONO_S}`}
        style={{ left: 506, top: 428, color: INK, ...iv(0) }}
      >
        14a
      </p>
      <img
        src={`${A}/dim-6a.svg`}
        alt=""
        aria-hidden
        className="rb-dim-y absolute block max-w-none"
        style={{
          left: 182 - 5.52,
          top: 126 - 0.74,
          width: 11.046,
          height: 265.5,
          ...iv(1),
        }}
      />
      <p
        className={`rb-dim-label absolute ${MONO_S}`}
        style={{ left: 150, top: 248, color: INK, ...iv(1) }}
      >
        6a
      </p>
      <div
        className="rb-dim-tag absolute flex items-start rounded-[8px] px-2.5 py-1.5"
        style={{ left: 778, top: -6, background: INK, ...iv(2) }}
      >
        <p className={`${MONO_S} text-white`}>{t("2a clear space")}</p>
      </div>
    </div>
  );
}

function MinSize() {
  const t = useT();
  return (
    <div className="rb-lift-host wd-hover flex h-[560px] min-w-px flex-1 flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-10">
      <div className="relative h-[170px] w-[300px] shrink-0">
        <div className="rb-min-logo absolute" style={{ left: 60, top: 60 }}>
          <div className="rb-lift">
            <Logo
              w={180}
              h={77.891}
              alt={t("98rum logo at its minimum size")}
            />
          </div>
        </div>
        <img
          src={`${A}/dim-35.svg`}
          alt=""
          aria-hidden
          className="rb-dim-x absolute block max-w-none"
          style={{
            left: 60 - 0.6,
            top: 30 - 4.42,
            width: 181.2,
            height: 8.837,
            ...iv(3),
          }}
        />
        <p
          className={`rb-dim-label absolute ${MONO_S}`}
          style={{ left: 124, top: 4, color: INK, ...iv(3) }}
        >
          35 mm
        </p>
        <img
          src={`${A}/dim-15.svg`}
          alt=""
          aria-hidden
          className="rb-dim-y absolute block max-w-none"
          style={{
            left: 256 - 4.42,
            top: 60 - 0.6,
            width: 8.837,
            height: 79.091,
            ...iv(4),
          }}
        />
        <p
          className={`rb-dim-label absolute ${MONO_S}`}
          style={{ left: 264, top: 88.95, color: INK, ...iv(4) }}
        >
          15 mm
        </p>
      </div>
      <p className={`${H4} whitespace-nowrap text-[var(--cmd-text-primary)]`}>
        {t("Minimum size")}
      </p>
      <p
        className={`w-[360px] text-center text-[var(--cmd-text-secondary)] ${BODY}`}
      >
        {t(
          "Below 35 mm wide the outline closes up and the skull on the hat disappears.",
        )}
      </p>
    </div>
  );
}

function RumLogoStructure() {
  return (
    <section
      id="wd-logo-structure"
      className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow="BRAND IDENTITY  ·  01.2"
        title="Built on a 14a grid"
        lead="Every part of the mark is measured in one unit, a. The logo is 14a wide and 6a tall, keeps 2a of clear space on every side, and never prints smaller than 35 × 15 mm."
      />
      <Reveal className="w-full" enter={80}>
        <div className="flex w-full items-start gap-6">
          <GridStage />
          <MinSize />
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 01.3 Brand character (346:16553) ───────────────────────── */

function Ingredient({
  label,
  i,
  children,
}: {
  label: string;
  i: number;
  children: ReactNode;
}) {
  const t = useT();
  return (
    <div
      className="rb-ing flex shrink-0 flex-col items-center gap-3.5"
      style={iv(i)}
    >
      <div className="rb-ing-box wd-hover relative size-[200px] shrink-0 overflow-clip rounded-[24px] bg-white">
        {children}
      </div>
      <p className={`${H4} whitespace-nowrap text-[var(--cmd-text-primary)]`}>
        {t(label)}
      </p>
    </div>
  );
}

function RumCharacter() {
  const t = useT();
  return (
    <section
      id="wd-character"
      className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow="BRAND IDENTITY  ·  01.3"
        title="Meet Cap'n Rum"
        lead="The brand's mascot, Cap'n Rum, is drawn in a fun cartoon style with bright, eye-catching colours, inspired by Disney animated films and comic books. He appears across the products — from clothing and packaging to advertising."
      />
      <Reveal className="w-full" enter={80}>
        <div className="flex w-full items-center justify-center gap-7 rounded-[32px] bg-[#fbf1de] px-16 py-12">
          <Ingredient label="Pirate hat" i={0}>
            <img
              src={`${A}/hat.webp`}
              alt={t("A black pirate hat")}
              className="rb-ing-img absolute block max-w-none object-contain"
              style={{ left: 10, top: 39, width: 180, height: 122 }}
            />
          </Ingredient>
          <Operator sign="+" i={1} className="rb-ing-op" />
          <Ingredient label="A glass of rum" i={2}>
            <img
              src={`${A}/glass.webp`}
              alt={t("A glass of rum on ice beside the bottle")}
              className="rb-ing-img absolute block max-w-none object-contain"
              style={{ left: 15, top: 15, width: 170, height: 170 }}
            />
          </Ingredient>
          <Operator sign="+" i={3} className="rb-ing-op" />
          <Ingredient label="Classic cartoon" i={4}>
            <div
              className="rb-ing-img absolute overflow-hidden"
              style={{
                left: "calc(50% - 0.61px - 67.5px)",
                top: 19,
                width: 135,
                height: 162,
              }}
            >
              <img
                src={`${A}/cartoon.webp`}
                alt={t("Classic cartoon characters")}
                className="absolute block max-w-none"
                style={{
                  left: "-17.52%",
                  top: "-4.08%",
                  width: "134.79%",
                  height: "111.5%",
                }}
              />
            </div>
          </Ingredient>
          <Operator sign="=" i={5} className="rb-ing-op" />
          <div className="rb-mascot shrink-0">
            <div className="rb-capn-hover">
              <CapnRum
                w={340.787}
                h={340}
                alt={t("Cap'n Rum, the 98rum mascot")}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
