"use client";
/* eslint-disable @next/next/no-img-element -- static Figma exports, sized exactly; next/image adds nothing here. */

import "./thuc-brand.css";
import { useState, type CSSProperties, type ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { sappBeVietnam } from "../sapp/fonts";
import { ThucEyebrow, ThucHeading } from "./parts";
import { HeroFit } from "../shell";

const A = "/figma/thuc/brand";
const RED = "#cc242b";
const MONO = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap";
const BODY = "text-[16px] leading-[24px] tracking-[-0.2px]";
const H4 = "text-[20px] leading-[28px] font-semibold tracking-[-0.4px]";
/** Figma "Card/Soft". */
const CARD_SOFT = "0 12px 32px -4px rgba(15,23,41,0.06), 0 1px 3px 0 rgba(15,23,41,0.04)";

/** Group "Brand": hero, process highlight, vision, Phase 01 band, positioning, the logo, logo versions (Figma 332:15797 → 337:16127). */
export function ThucBrand() {
  return (
    <>
      <Reveal>
        <ThucHero />
      </Reveal>
      <ThucOverview />
      <ThucVision />
      <ThucPhaseBand
        id="wd-phase-brand"
        num="01"
        title="Brand identity"
        text="Repositioning a dim-sum franchise: a logo drawn from Chinese rooftops and shop signs, and versions for every surface."
        chips={["01.1  Positioning", "01.2  The logo", "01.3  Logo versions"]}
      />
      <ThucPositioning />
      <ThucLogo />
      <ThucLogoVersions />
    </>
  );
}

/* ───────────────────────── Shared head (eyebrow + H2, lead 24px below) ───────────────────────── */

function Head({ eyebrow, title, lead, leadWidth = 900 }: { eyebrow: string; title: string; lead: string; leadWidth?: number }) {
  const t = useT();
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <ThucEyebrow label={eyebrow} />
          <ThucHeading>{t(title)}</ThucHeading>
        </div>
      </Reveal>
      <Reveal enter={40}>
        <p className="text-[20px] leading-[28px] text-[var(--cmd-text-secondary)]" style={{ width: leadWidth }}>
          {t(lead)}
        </p>
      </Reveal>
    </div>
  );
}

/* ───────────────────────── Hero (332:15797) ───────────────────────── */

const HERO_FACTS: { label: string; lines: string[] }[] = [
  { label: "Position:", lines: ["Graphic Designer"] },
  { label: "Target:", lines: ["Partners, age range", "from 30-54"] },
  { label: "Platform:", lines: ["Branding,", "Publishing"] },
  { label: "Status:", lines: ["Launching"] },
];

function ThucHero() {
  const t = useT();
  return (
    <section id="wd-overview-hero" className="relative p-8">
      <HeroFit>
        {/* IMG/hero_bg (332:15799): photo + 45% near-black wash */}
        <div className="absolute inset-0 overflow-hidden rounded-[50px]">
          <img src={`${A}/hero-bg.webp`} alt="" aria-hidden className="absolute inset-0 block size-full max-w-none object-cover" />
          <div className="absolute inset-0 bg-[rgba(13,8,8,0.45)]" />
        </div>
        <img
          src={`${A}/tvt-logo.svg`}
          alt={t("Thực Vị Thiên")}
          className="tb-hero-logo absolute block max-w-none"
          style={{ left: 759, top: 185, width: 290, height: 291 }}
        />
        {/* Facts (332:15824): 80% #3f3f3f over a pre-blurred crop of the photo (no runtime backdrop-filter). */}
        <div
          className={`wd-hover absolute flex w-[846px] items-start justify-between rounded-[24px] px-8 py-6 text-white ${sappBeVietnam.className}`}
          style={{
            left: 481,
            top: 610,
            backgroundImage: `linear-gradient(rgba(63,63,63,0.8), rgba(63,63,63,0.8)), url(${A}/facts-backdrop.webp)`,
            backgroundSize: "100% 100%",
          }}
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
      </HeroFit>
    </section>
  );
}

/* ──────────────────── Process Highlight (332:15887 · Bento v2 640:29533) ──────────────────── */

const OV_LABEL = `${MONO} text-[var(--cmd-text-secondary)]`;
const OV_LIST = "flex w-full flex-col items-start gap-1.5 text-[20px] leading-[30px] tracking-[-0.1px] text-[var(--cmd-text-primary)]";
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
      <p className="w-full text-[36px] leading-[44px] font-semibold tracking-[-0.72px] text-[var(--cmd-text-primary)]">{t(title)}</p>
      <p className="w-full text-[22px] leading-[34px] tracking-[-0.11px] text-[var(--cmd-text-secondary)]">{t(body)}</p>
    </div>
  );
}

/** Logo/Illustrator · Logo/Photoshop at 56px (vector export carries its own shadow bleed). */
function ToolTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tb-tool relative size-14 shrink-0">
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

function ThucOverview() {
  const t = useT();
  return (
    /* Figma fixes the section at 736px; the bento runs 100px past it into Our Vision's top padding. */
    <section id="wd-overview" className="relative flex h-[736px] flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <ThucEyebrow label="PROCESS HIGHLIGHT" />
          <ThucHeading>{t("Overview")}</ThucHeading>
        </div>
      </Reveal>
      <div className="flex w-full flex-col items-start gap-14 pb-2">
        <Reveal className="w-full" enter={40}>
          <div className="tb-ov-row flex w-full items-start">
            <Statement
              className="pr-14"
              kicker="01 — CHALLENGE"
              dot="#b8bcc6"
              title="Shake off the old dim-sum house"
              body="Dim Sum 8 began as a Taiwan–Shanghai franchise and looked like every traditional Chinese restaurant: greasy, noisy and dated. The new owners needed a rebrand."
            />
            <div className="flex w-16 shrink-0 flex-col items-center gap-3 self-stretch">
              <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-solid border-[rgba(10,10,15,0.08)] bg-white shadow-[0_4px_14px_0_rgba(10,10,15,0.08)]">
                <img src={`${A}/ov-arrow.svg`} alt="" className="tb-ov-arrow block size-6" />
              </div>
              <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
            </div>
            <Statement
              className="pl-14"
              kicker="02 — OPPORTUNITY"
              dot={RED}
              title="A fresh face for Taiwanese flavour"
              body="Rebuild the identity around Taiwanese culture — a bold, modern mark and one visual system from menus to posters."
            />
          </div>
        </Reveal>
        <Reveal className="w-full" enter={40}>
          <div
            className="wd-hover relative flex w-full items-start overflow-hidden rounded-[28px] bg-white"
            style={{
              boxShadow: "6px 6px 0 0 rgba(41,92,169,0.32), inset 0 1px 0 0 var(--cmd-edge)",
            }}
          >
            <div className={OV_COL}>
              <p className={OV_LABEL}>{t("TIMELINE")}</p>
              <p className="w-full text-[26px] leading-[34px] font-semibold tracking-[-0.52px] text-[var(--cmd-text-primary)]">2022</p>
            </div>
            <div className={`${OV_COL} ${OV_RULE}`}>
              <p className={OV_LABEL}>{t("DISCIPLINES")}</p>
              <div className={OV_LIST}>
                {["Brand identity", "Publishing design"].map((d) => (
                  <p key={d} className="w-full">
                    {t(d)}
                  </p>
                ))}
              </div>
            </div>
            <div className={`${OV_COL} ${OV_RULE}`}>
              <p className={OV_LABEL}>{t("RESPONSIBILITIES")}</p>
              <div className={OV_LIST}>
                {["Logo", "Graphic pattern", "Colour", "Stationery", "Posters"].map((d) => (
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

/* ───────────────────────── Our Vision (332:15932) ───────────────────────── */

function ThucVision() {
  const t = useT();
  return (
    <section id="wd-vision" className="relative flex flex-col items-start px-[236px] pt-40">
      {/* Decoration (342:16532): 土維天 signboard at 20%, clipped by the page's right edge. */}
      <div aria-hidden className="pointer-events-none absolute overflow-hidden opacity-20" style={{ left: 1744.61, top: 69, width: 127.39, height: 655 }}>
        <div className="tb-vis-deco absolute" style={{ left: 0, top: 0, width: 137.78, height: 655 }}>
          <div className="absolute flex flex-col items-start gap-[46.682px]" style={{ left: 69.06, top: 85.65 }}>
            <img src={`${A}/vd-g1.svg`} alt="" className="block max-w-none" style={{ width: 130.031, height: 127.804 }} />
            <img src={`${A}/vd-g2.svg`} alt="" className="block max-w-none" style={{ width: 136.874, height: 136.401 }} />
            <img src={`${A}/vd-g3.svg`} alt="" className="block max-w-none" style={{ width: 137.445, height: 126.085 }} />
          </div>
          {/* Frame vector: 655×275 drawn rotated 90° into a 275×655 box at x 0.28. */}
          <img
            src={`${A}/vd-frame.svg`}
            alt=""
            className="absolute block max-w-none"
            style={{
              left: 0.28 + 137.5 - 327.56,
              top: 327.56 - 137.5 - 0.09,
              width: 655.127,
              height: 274.997,
              transform: "rotate(90deg)",
            }}
          />
        </div>
      </div>
      <div className="relative flex w-full items-center justify-between pl-20">
        <Reveal enter={60}>
          <img src={`${A}/vision-logo.svg`} alt={t("Thực Vị Thiên")} className="tb-vis-logo block h-[380px] w-[378px] max-w-none" />
        </Reveal>
        <div className="flex shrink-0 flex-col items-start gap-10">
          <Reveal enter={60}>
            <ThucEyebrow label="BACKGROUND  ·  BRAND STORY" />
          </Reveal>
          <Reveal enter={40}>
            <p className="w-[797px] text-[44px] leading-[56px] tracking-[-1.1px] text-[#8a8f98]">
              {t("Taste the flavor of the East.")}{" "}
              <span className="text-[#0a0a0a]">
                {t(
                  "Thực Vị Thiên began as a Taiwan–Shanghai franchise wrapped in old Chinese-restaurant clichés. A new team took over to put Taiwanese culture first — and the brand had to follow.",
                )}
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Phase band (332:15980; reused by Phase 02 / 03) ───────────────────────── */

/* Blurred 18% white disc (r 256.5, blur 190) re-expressed as a radial gradient — no CSS blur. */
const GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.108) 0%, rgba(255,255,255,0.098) 20%, rgba(255,255,255,0.075) 40%, rgba(255,255,255,0.04) 63%, rgba(255,255,255,0.012) 85%, rgba(255,255,255,0) 100%)";

export type ThucPhaseBandProps = {
  /** Section id (e.g. "wd-phase-brand"). */
  id: string;
  /** "01" — drawn as the 180px phase number and in the "PHASE 01" label. */
  num: string;
  title: string;
  text: ReactNode;
  chips: string[];
  /** Band fill (Figma `phase/tvt-identity-solid`, #cc242b on phase 01). */
  solid?: string;
  /** 12px offset shadow colour (Figma `phase/tvt-identity-deep`, #8e1419 on phase 01). */
  shadow?: string;
  /** Number, label, title and description colour. */
  ink?: string;
  /** Chip label colour / chip fill (Figma `phase/tvt-chip-ink` #2f2f2f on white). */
  chipInk?: string;
  chipBg?: string;
  /** Dot grid (dots on a 25.23×24 grid, multiply). Phase 01: #8e1419 at 30%. */
  dotColor?: string;
  dotOpacity?: number;
  /** White glow at the right edge; false hides it. */
  glow?: boolean;
  /** Section height and band top inside it (Phase 01: 572 / 181.5). */
  height?: number;
  top?: number;
};

/** Figma "Phase 0X — …": 1640×400 band, offset shadow, glow, dot grid, number, copy and step chips. */
export function ThucPhaseBand({
  id,
  num,
  title,
  text,
  chips,
  solid = RED,
  shadow = "#8e1419",
  ink = "#ffffff",
  chipInk = "#2f2f2f",
  chipBg = "#ffffff",
  dotColor = "#8e1419",
  dotOpacity = 0.3,
  glow = true,
  height = 572,
  top = 181.5,
}: ThucPhaseBandProps) {
  const t = useT();
  const dotGrid: CSSProperties = {
    opacity: dotOpacity,
    backgroundImage: `radial-gradient(circle at 1.05px 1px, ${dotColor} 0.75px, transparent 1.15px)`,
    backgroundSize: "25.2308px 24px",
  };
  return (
    <section id={id} className="relative w-full" style={{ height }}>
      <div className="absolute left-[116px] h-[400px] w-[1640px]" style={{ top }}>
        <Reveal className="size-full" enter={80}>
          <div
            className="relative size-full overflow-clip rounded-[40px]"
            style={{
              background: solid,
              boxShadow: `12px 12px 0 0 ${shadow}`,
            }}
          >
            {glow ? (
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  left: 823,
                  top: -306,
                  width: 1273,
                  height: 1273,
                  backgroundImage: GLOW,
                }}
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
      </div>
    </section>
  );
}

/* ───────────────────────── 01.1 Positioning (337:16058) ───────────────────────── */

const SHIFT: [string, string][] = [
  ["A Taiwan–Shanghai franchise (Dim Sum 8)", "Thực Vị Thiên — Taiwanese culture first"],
  ["Traditional Chinese-restaurant clichés", "Chinese architecture, redrawn modern"],
  ["Greasy, noisy, dated", "Fresh, bold, clean"],
];

function ThucPositioning() {
  const t = useT();
  return (
    <section id="wd-positioning" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="BRAND IDENTITY  ·  01.1"
        title="From greasy & noisy to fresh"
        lead="For a modern restaurant, we wanted to get rid of the stereotype of eating at an old Chinese restaurant — greasy and noisy. Thực Vị Thiên needed a “fresh” look."
      />
      <Reveal className="w-full" enter={40}>
        <div className="wd-hover flex w-full flex-col items-start rounded-[28px] bg-white px-10 py-2" style={{ boxShadow: CARD_SOFT }}>
          <div className="flex w-full items-start gap-6 pt-6 pb-3 font-mono text-[14px] leading-[22px] text-[var(--cmd-text-secondary)]">
            <p className="w-[620px] shrink-0">{t("BEFORE")}</p>
            <p className="w-12 shrink-0" />
            <p className="w-[620px] shrink-0">{t("AFTER")}</p>
          </div>
          {SHIFT.map(([before, after], i) => (
            <div key={before} className="w-full">
              <div className="h-px w-full bg-[rgba(20,20,26,0.08)]" />
              <div
                className="tb-shift flex w-full items-center gap-6 py-[26px] text-[20px] leading-[28px] tracking-[-0.4px]"
                style={{ "--i": i } as CSSProperties}
              >
                <p className="w-[620px] shrink-0 text-[var(--cmd-text-secondary)]">{t(before)}</p>
                <p className="tb-shift-arrow w-12 shrink-0 text-center font-semibold text-[var(--brand-thuc)]">→</p>
                <p className="tb-shift-after w-[620px] shrink-0 font-semibold text-[var(--cmd-text-primary)]">{t(after)}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="flex w-full items-start gap-6">
        <Reveal className="min-w-px flex-1" enter={40}>
          <div className="tb-photo relative h-[600px] w-full overflow-hidden rounded-[24px]">
            <img
              src={`${A}/plates.webp`}
              alt={t("Black tableware and a red Thực Vị Thiên menu on a wooden table")}
              className="absolute inset-0 block size-full max-w-none object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="w-[520px] shrink-0" enter={40}>
          <div className="tb-photo relative h-[600px] w-[520px] overflow-hidden rounded-[24px]">
            <img
              src={`${A}/menu-black.webp`}
              alt={t("Gold Thực Vị Thiên logo foiled on a black menu cover")}
              className="absolute inset-0 block size-full max-w-none object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── 01.2 The logo (337:16089) ───────────────────────── */

type Callout = {
  n: number;
  title: string;
  text: string;
  top: number;
  /** Leader line from the dot on the logo (a) to the callout edge (b), stage coordinates. */
  a: [number, number];
  b: [number, number];
};

const CALLOUTS: Callout[] = [
  {
    n: 1,
    title: "Roof curves",
    text: "The flared strokes of T, H and Ê lift like the eaves of ancient Chinese rooftops.",
    top: 110,
    a: [441.4, 172.28],
    b: [812, 126],
  },
  {
    n: 2,
    title: "Signboard frame",
    text: "The rectangle around 土維天 is the restaurant sign hanging over the door.",
    top: 330,
    a: [612.95, 379.66],
    b: [812, 346],
  },
  {
    n: 3,
    title: "Simplified Chinese",
    text: "土維天 is set in a simplified Chinese typeface, so the bilingual mark reads at a glance.",
    top: 550,
    a: [516.6, 407.94],
    b: [812, 566],
  },
];

/** Dashed 1.5px leader (5.05 on / 5.05 off, half dash at each end, as Figma's outlined dashes). Wipes in from the callout end. */
function Leader({ c, i, state }: { c: Callout; i: number; state: "" | "is-on" | "is-dim" }) {
  const pad = 2;
  const x0 = Math.min(c.a[0], c.b[0]) - pad;
  const y0 = Math.min(c.a[1], c.b[1]) - pad;
  const w = Math.abs(c.b[0] - c.a[0]) + pad * 2;
  const h = Math.abs(c.b[1] - c.a[1]) + pad * 2;
  const ax = c.a[0] - x0;
  const ay = c.a[1] - y0;
  const bx = c.b[0] - x0;
  const by = c.b[1] - y0;
  return (
    <>
      <div
        aria-hidden
        className={`tb-lead pointer-events-none absolute ${state}`}
        style={{ left: x0, top: y0, width: w, height: h, "--i": i } as CSSProperties}
      >
        <div className="tb-wipe size-full overflow-hidden">
          <div className="tb-wipe-in size-full">
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block overflow-visible">
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke={RED} strokeWidth={1.5} strokeDasharray="5.05 5.05" strokeDashoffset={2.52} />
              <line className="tb-lead-solid" x1={ax} y1={ay} x2={bx} y2={by} stroke={RED} strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className={`tb-pin pointer-events-none absolute size-3 ${state}`}
        style={{ left: c.a[0] - 6, top: c.a[1] - 6, "--i": i } as CSSProperties}
      >
        <div className="tb-pin-in size-full rounded-full" style={{ background: RED }} />
      </div>
    </>
  );
}

function LogoStage() {
  const t = useT();
  const [active, setActive] = useState<number | null>(null);
  const stateOf = (n: number) => (active === null ? "" : active === n ? "is-on" : "is-dim");
  return (
    <div className="relative h-[760px] w-full overflow-clip rounded-[32px] bg-[#f1f1ef]">
      <img
        src={`${A}/logo-stage.svg`}
        alt={t("Thực Vị Thiên logo")}
        className="absolute block max-w-none"
        style={{ left: 150, top: 144, width: 470, height: 471.32 }}
      />
      {CALLOUTS.map((c, i) => (
        <Leader key={c.n} c={c} i={i} state={stateOf(c.n)} />
      ))}
      {CALLOUTS.map((c, i) => (
        <div
          key={c.n}
          className="tb-call absolute w-[340px]"
          style={{ left: 820, top: c.top, "--i": i } as CSSProperties}
          onPointerEnter={() => setActive(c.n)}
          onPointerLeave={() => setActive((v) => (v === c.n ? null : v))}
        >
          <div className={`tb-call-in flex flex-col items-start gap-2 ${stateOf(c.n)}`}>
            <div className="flex items-center gap-3">
              <span
                className="tb-call-n flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[14px] leading-[22px] text-white"
                style={{ background: RED }}
              >
                {c.n}
              </span>
              <p className={`${H4} whitespace-nowrap text-[var(--cmd-text-primary)]`}>{t(c.title)}</p>
            </div>
            <p className={`w-[340px] text-[var(--cmd-text-secondary)] ${BODY}`}>{t(c.text)}</p>
          </div>
        </div>
      ))}
      {/* Detail (337:16124) */}
      <div className="tb-call absolute" style={{ left: 1180, top: 48, "--i": 3 } as CSSProperties}>
        <div className="wd-hover flex flex-col items-start gap-3 rounded-[20px] bg-white p-4">
          <div className="relative h-[112px] w-[300px] overflow-hidden rounded-[12px] bg-[#f1f1ef]">
            <img src={`${A}/logo-detail.webp`} alt="" className="absolute inset-0 block size-full max-w-none object-contain" />
          </div>
          <p className="w-[300px] text-[14px] leading-[20px] text-[var(--cmd-text-secondary)]">{t("Reference: the curved rooflines of a Chinese pagoda")}</p>
        </div>
      </div>
    </div>
  );
}

function ThucLogo() {
  return (
    <section id="wd-logo" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="BRAND IDENTITY  ·  01.2"
        title="A roofline and a shop sign"
        lead="The logo is both traditional and modern: a re-designed bold typeface that borrows its shapes from Chinese architecture."
      />
      <Reveal className="w-full" enter={60}>
        <LogoStage />
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 01.3 Logo versions (337:16127) ───────────────────────── */

const VERSIONS = [
  {
    name: "On Dark Red",
    use: "Menus, signage, posters",
    bg: "#cc242b",
    logo: "ver-red.svg",
  },
  {
    name: "On Light Black",
    use: "Packaging, night signage",
    bg: "#2f2f2f",
    logo: "ver-black.svg",
  },
  {
    name: "On Light Grey",
    use: "Stationery, inside pages",
    bg: "#d8dbd8",
    logo: "ver-grey.svg",
  },
];

function ThucLogoVersions() {
  const t = useT();
  return (
    <section id="wd-logo-versions" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow="BRAND IDENTITY  ·  01.3"
        title="One mark, three grounds"
        lead="The mark is drawn in a single colour, so it switches cleanly between the three brand colours."
        leadWidth={758}
      />
      <div className="flex w-full items-start gap-6">
        {VERSIONS.map((v) => (
          <Reveal key={v.name} className="min-w-px flex-1" enter={40}>
            <div className="tb-ver flex w-full flex-col items-start gap-4">
              <div className="wd-hover relative h-[380px] w-full overflow-clip rounded-[24px]" style={{ background: v.bg }}>
                <img
                  src={`${A}/${v.logo}`}
                  alt={t("Thực Vị Thiên logo, {v}", { v: t(v.name) })}
                  className="tb-ver-logo absolute block max-w-none"
                  style={{
                    left: "calc(50% - 100px)",
                    top: "calc(50% + 0.28px - 100.281px)",
                    width: 200,
                    height: 200.562,
                  }}
                />
              </div>
              <div className="flex flex-col items-start gap-0.5 whitespace-nowrap">
                <p className={`${H4} text-[var(--cmd-text-primary)]`}>{t(v.name)}</p>
                <p className={`${BODY} text-[var(--cmd-text-secondary)]`}>{t(v.use)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
