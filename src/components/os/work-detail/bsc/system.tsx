"use client";
/* eslint-disable @next/next/no-img-element -- static Figma exports, sized exactly; next/image adds nothing here. */

import "./bsc-system.css";
import type { CSSProperties, ReactNode } from "react";
import { Barlow } from "next/font/google";
import { useRevealChildren } from "../../reveal";
import { sappBeVietnam, sappInter, sappJakarta, sappRoboto } from "../sapp/fonts";
import { BscEyebrow, BscHeading } from "./parts";
import { useT } from "@/lib/i18n";

/*
 * BSC · UI Kit (223:13691) + Phase 03 band (223:14093)  → <BscSystem />
 * Post Design Outcome (223:14718) + Real-time Experience (226:14407) + Case End (223:14887) → <BscOutro />
 */

const A = "/figma/bsc/system";

/** Barlow Bold: the specimen face in the Typography card (the other specimen fonts come from sapp/fonts). */
const barlow = Barlow({ subsets: ["latin"], weight: ["700"], display: "swap" });

const MONO = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre";

/** Section head: eyebrow + 56px heading (gap 16), then the 16/24 grey lead (gap 22). */
function Head({ eyebrow, title, lead, leadWidth, center = false }: { eyebrow: string; title: string; lead: string; leadWidth: number; center?: boolean }) {
  const t = useT();
  return (
    <div data-rv className={`flex flex-col ${center ? "items-center gap-4" : "items-start gap-[22px]"}`}>
      <div className={`flex flex-col gap-4 ${center ? "items-center" : "items-start"}`}>
        <BscEyebrow label={eyebrow} />
        <BscHeading>{t(title)}</BscHeading>
      </div>
      <p className={`text-[16px] leading-[24px] text-[var(--cmd-text-secondary)] ${center ? "text-center" : ""}`} style={{ width: leadWidth }}>
        {t(lead)}
      </p>
    </div>
  );
}

/**
 * The style-guide cards are scaled instances in Figma (690 wide). Their contents are laid out at the
 * component's natural size and zoomed down as one block, exactly as the instance is. CSS zoom (not a
 * transform) so the small specimen text is laid out and rasterised at its final size and stays crisp.
 */
function Scaled({ width, height, natural, children, className = "" }: { width: number; height: number; natural: number; children: ReactNode; className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width, height }}>
      <div className="absolute top-0 left-0" style={{ width: natural, zoom: width / natural }}>
        {children}
      </div>
    </div>
  );
}

/* ================================================================== */
/* UI Kit (223:13691)                                                   */
/* ================================================================== */

const FACTS: [string, string][] = [
  ["3", "Brand colours"],
  ["4", "Brand gradients"],
  ["Barlow", "Typeface · 5 heading levels"],
  ["2", "Icon sets · light & dark"],
];

/* ---------- Colour palette (228:15832): 1062.36 natural → 690 ---------- */

type Swatch = { name: string; hex: string; fill: string; dark: boolean; img?: string };

const BG = (fill: string): CSSProperties => (fill.includes("gradient") ? { backgroundImage: fill } : { background: fill });

/** Steps 800 → 50; `darkUntil` = how many of them carry a white "AAA". */
function ramp(prefix: string, hexes: string[], darkUntil = 5): Swatch[] {
  const steps = ["800", "700", "600", "500", "400", "300", "200", "100", "50"];
  return hexes.map((hex, i) => ({ name: `${prefix}/${steps[i]}`, hex, fill: hex, dark: i < darkUntil }));
}

const BRAND: Swatch[] = [
  { name: "Brand color", hex: "#295CA9", fill: "#295ca9", dark: true },
  { name: "Brand color", hex: "#FFB81C", fill: "#ffb81c", dark: false },
  { name: "Brand color", hex: "#009E87", fill: "#009e87", dark: true },
];
const GRADIENTS: Swatch[] = [
  { name: "Gradient - 1", hex: "#1C478C → #262E69", fill: "#1c478c", dark: true, img: `${A}/gradient-1.png` },
  { name: "Gradient - 2", hex: "#1C478C → #262E69", fill: "linear-gradient(252.73deg, rgb(27,70,141) 38.006%, rgb(37,45,105) 69.159%)", dark: true },
  { name: "Gradient - 3", hex: "#E5F0FF → #FFFFFF", fill: "linear-gradient(180deg, #e5f0ff 14.141%, #ffffff 67.677%)", dark: false },
  { name: "Gradient - 4", hex: "#E5F0FF → #FFFFFF", fill: "linear-gradient(180deg, #e5f0ff 40.31%, #ffffff 89.922%)", dark: false },
];
const PRIMARY = ramp("Primary", ["#02193A", "#042A63", "#16448A", "#295CA9", "#5890E3", "#82B2FB", "#B2D0FC", "#D7E7FF", "#E8F1FF"], 6);
const FUNCTIONAL: [string, Swatch[]][] = [
  ["Neutral", ramp("Neutral", ["#333333", "#4D4D4D", "#666666", "#CCCCCC", "#D9D9D9", "#EAEAEA", "#EFEFEF", "#F5F5F5", "#FFFFFF"])],
  ["Success", ramp("Success", ["#006630", "#009947", "#00CC5F", "#00DE68", "#33FF92", "#66FFAD", "#99FFC9", "#CCFFE4", "#E5FFF1"])],
  ["Warning / Rating", ramp("Warning", ["#B29500", "#CEAD00", "#DFBB00", "#FFD500", "#FFDD33", "#FFE666", "#FFEE99", "#FFF6CC", "#FFFBE5"])],
  ["Sales / Error", ramp("Sales", ["#660000", "#990000", "#CC0000", "#FF0000", "#FF3333", "#FF6666", "#FF9999", "#FFCCCC", "#FFE5E5"])],
  ["Contact", ramp("Contact", ["#003F66", "#005E99", "#007ECC", "#22AAFF", "#33B1FF", "#66C4FF", "#99D8FF", "#CCEBFF", "#E5F5FF"])],
];

function SwatchChip({ s, last }: { s: Swatch; last: boolean }) {
  return (
    <div className={`bsys-swatch flex shrink-0 flex-col items-start gap-[9.4px] rounded-[4.2px] bg-white p-[5.22px] ${sappJakarta.className}`} style={{ marginRight: last ? 0 : -14 }}>
      <div className="relative h-[66.9px] w-[107.6px] shrink-0 overflow-hidden rounded-[4.2px]" style={BG(s.fill)}>
        {s.img ? <img alt="" src={s.img} className="absolute inset-0 size-full max-w-none object-cover" /> : null}
      </div>
      <div className="flex flex-col items-start gap-[2px] whitespace-nowrap">
        <p className="text-[12.53px] leading-[21.55px] font-bold text-[#404041]">{s.name}</p>
        <p className="text-[10.45px] leading-[13.86px] text-[#7e7e7e]">{s.hex}</p>
      </div>
      <p className="absolute top-[28.2px] left-[11.5px] text-[12.53px] leading-[20.9px] font-bold whitespace-nowrap" style={{ color: s.dark ? "#ffffff" : "#000000" }}>
        AAA
      </p>
    </div>
  );
}

function Ramp({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div className="flex shrink-0 flex-col items-start gap-3">
      <p className={`text-[18px] leading-[27.71px] font-bold whitespace-nowrap text-[#252525] ${sappRoboto.className}`}>{title}</p>
      <div className="flex items-start">
        {swatches.map((s, i) => (
          <SwatchChip key={s.name + i} s={s} last={i === swatches.length - 1} />
        ))}
      </div>
    </div>
  );
}

const SG_BG = (deg: number) => `linear-gradient(${deg}deg, rgb(37,45,105) 0%, rgb(28,71,140) 83.333%)`;
const SG_TITLE = `text-[24px] font-bold whitespace-nowrap text-white ${sappBeVietnam.className}`;

function ColorPalette() {
  return (
    <Scaled width={690} height={970.656} natural={1062.36}>
      <div className="flex flex-col items-start gap-6 rounded-[24px] p-10" style={{ backgroundImage: SG_BG(125.41) }}>
        <p className={`${SG_TITLE} leading-[35.41px]`}>Color Pallete</p>
        <div className="wd-hover flex flex-col items-start gap-6 rounded-[12px] bg-white p-4">
          <div className="flex items-start gap-12">
            <Ramp title="Brand Color" swatches={BRAND} />
            <Ramp title="Gradient" swatches={GRADIENTS} />
          </div>
          <Ramp title="Primary" swatches={PRIMARY} />
        </div>
        <div className="wd-hover flex flex-col items-start gap-6 rounded-[12px] bg-white p-4">
          {FUNCTIONAL.map(([t, s]) => (
            <Ramp key={t} title={t} swatches={s} />
          ))}
        </div>
      </div>
    </Scaled>
  );
}

/* ---------- Typography (228:16227): 1172 natural → 690 ---------- */

const LEVELS: { h: string; size: number; lh: number }[] = [
  { h: "H1", size: 40, lh: 54 },
  { h: "H2", size: 32, lh: 46 },
  { h: "H3", size: 24, lh: 36 },
  { h: "H4", size: 18, lh: 26 },
  { h: "H5", size: 16, lh: 24 },
];
const BODY_ROWS: { name: string; size: number; lh: number }[] = [
  { name: "Large", size: 18, lh: 27 },
  { name: "Medium", size: 16, lh: 24 },
  { name: "Small", size: 14, lh: 22 },
  { name: "Extra Small", size: 12, lh: 20 },
];
const COLS = [256, 145, 133, 210];

function Typography() {
  const sub = `text-[18px] leading-[1.5] font-bold whitespace-nowrap text-white ${sappBeVietnam.className}`;
  return (
    <Scaled width={690} height={642.121} natural={1172}>
      <div className="flex flex-col items-start gap-6 rounded-[24px] p-10" style={{ backgroundImage: SG_BG(137.06) }}>
        <p className={`${SG_TITLE} leading-[1.5]`}>Typography</p>
        <div className="flex flex-col items-start gap-4 text-white">
          <p className={sub}>Typeface - Barlow</p>
          <p className={`w-[741px] text-[16px] leading-[1.5] ${sappBeVietnam.className}`}>
            Simple, modern and multi-style sans serif font can display with long body text and express the innovation and agility spirit. Solid font creates a sense of safety, trusty of a commitment and team-work organisation. It also works well with corporate font.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <p className={sub}>Heading</p>
          <div className="flex items-start gap-2 whitespace-nowrap text-[#303030]">
            {LEVELS.map((l) => (
              <div key={l.h} className="wd-hover flex h-[265px] w-[212px] shrink-0 flex-col items-start justify-between rounded-[8px] bg-white p-3">
                {/* Figma's spec rows sit 33.48 apart (25.48 line boxes + gap 8), not the 32 the 24px leading implies. */}
                <div className={`flex flex-col items-start gap-2 text-[16px] leading-[25.48px] ${sappInter.className}`}>
                  {[
                    ["Typeface:", "Barlow"],
                    ["Weight:", "Bold"],
                    ["Size:", `${l.size}px`],
                    ["Lineheight:", String(l.lh)],
                    ["Tracking:", "0%"],
                  ].map(([k, v]) => (
                    <p key={k} className="flex gap-1">
                      <span>{k}</span>
                      <span>{v}</span>
                    </p>
                  ))}
                </div>
                <p className={`font-bold ${barlow.className}`} style={{ fontSize: l.size, lineHeight: `${l.lh}px` }}>
                  {l.h}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <p className={sub}>Body</p>
          <div className="wd-hover flex flex-col items-start gap-6 rounded-[12px] bg-white p-4 text-[#303030]">
            <div className={`flex items-center gap-[105px] text-[18px] leading-[1.5] font-bold ${sappBeVietnam.className}`}>
              {["Style", "Size/line height", "Font", "Weight"].map((t, i) => (
                <p key={t} className="shrink-0" style={{ width: COLS[i] }}>
                  {t}
                </p>
              ))}
            </div>
            {BODY_ROWS.map((r) => (
              <div key={r.name} className={`flex items-center gap-[105px] ${sappInter.className}`} style={{ fontSize: r.size, lineHeight: `${r.lh}px` }}>
                <div className="shrink-0" style={{ width: COLS[0] }}>
                  <p className="font-bold">Body/{r.name}/Bold</p>
                  <p>Body/{r.name}/Medium</p>
                  <p>Body/{r.name}/Regular</p>
                </div>
                <p className="shrink-0" style={{ width: COLS[1] }}>
                  {r.size} / {r.lh}
                </p>
                <p className="shrink-0" style={{ width: COLS[2] }}>
                  Helvetica Neue
                </p>
                <div className="shrink-0" style={{ width: COLS[3] }}>
                  <p>Regular</p>
                  <p>Bold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scaled>
  );
}

/* ---------- Icons pack (228:16353): 720 natural → 690 ---------- */

/** Box insets (top right bottom left, % of the 640×240 "Icon sets" frame), in Figma row order. */
const ICONS_LIGHT = [
  "24.73% 93.2% 66.01% 2.85%", "24.35% 83.39% 65.32% 12.73%", "24.93% 73.54% 65.84% 22.29%", "24.4% 63.89% 65.05% 32.16%", "24.29% 54.17% 65.51% 42.01%",
  "43.19% 93.08% 45.76% 2.88%", "43.34% 83.34% 46.55% 12.52%", "43.23% 73.6% 45.64% 22.35%", "42.88% 64.11% 45.64% 32.4%", "43.7% 54.04% 46.42% 41.88%",
  "62.33% 93.39% 26.93% 3.04%", "63.13% 83.31% 27.26% 12.51%", "62.89% 73.56% 27.01% 22.68%", "62.62% 63.95% 27.23% 32.25%", "63.11% 54.03% 27.21% 41.87%",
  "82.51% 93.14% 8.36% 2.79%", "81.34% 83.36% 7.8% 12.56%", "82.43% 73.47% 8.88% 22.22%", "81.19% 64.25% 7.81% 32.54%", "81.34% 54.22% 7.8% 42.06%",
];
const ICONS_DARK = [
  "24.61% 41.88% 65.5% 54.08%", "24.17% 32.37% 65.09% 64.06%", "24.97% 22.29% 65.42% 73.54%", "24.73% 12.54% 65.17% 83.7%", "24.47% 2.92% 65.39% 93.27%",
  "44.03% 41.88% 46.29% 54.02%", "44.36% 32.11% 46.51% 63.81%", "43.19% 22.34% 45.95% 73.59%", "43.03% 13% 45.96% 83.79%", "44.27% 2.68% 47.04% 93.02%",
  "62.27% 42.06% 26.87% 54.22%", "62.89% 32.17% 27.86% 63.87%", "62.5% 22.36% 27.16% 73.76%", "63.1% 12.52% 27.68% 83.32%", "62.56% 2.86% 26.89% 93.18%",
  "81.52% 42.01% 8.27% 54.17%", "81.35% 32.05% 7.6% 63.91%", "81.5% 22.31% 8.39% 73.55%", "81.38% 12.58% 7.48% 83.38%", "81.04% 3.08% 7.48% 93.43%",
];

function Abs({ src, inset, className = "" }: { src: string; inset: string; className?: string }) {
  return (
    <div className={`absolute ${className}`} style={{ inset }}>
      <img alt="" src={src} className="absolute inset-0 block size-full max-w-none" />
    </div>
  );
}

function IconsPack() {
  const I = `${A}/icons`;
  return (
    <Scaled width={690} height={433.667} natural={720}>
      <div className="flex flex-col items-start gap-6 overflow-clip rounded-[24px] p-10" style={{ backgroundImage: SG_BG(147.85) }}>
        <p className={`${SG_TITLE} leading-[1.5]`}>{"BSC's Icons Pack"}</p>
        <p className={`w-[640px] text-[16px] leading-[1.5] text-white ${sappBeVietnam.className}`}>
          The icon is used with the parameters and rules as shown in the image shown next to ensure the modernity and youthfulness of the application.
        </p>
        <div className="relative h-[240px] w-[640px] shrink-0">
          {/* Light-background set: white panel + its title, 5×4 icons */}
          <div className="wd-hover absolute" style={{ inset: "0 51.25% 0.35% 0" }}>
            <img alt="" src={`${I}/panel-light.svg`} className="absolute inset-0 block size-full max-w-none" />
          </div>
          <Abs src={`${I}/panel-light-text.svg`} inset="9% 56.58% 84.42% 2.67%" className="pointer-events-none" />
          {ICONS_LIGHT.map((inset, i) => (
            <Abs key={inset} src={`${I}/icon-l-${String(i + 1).padStart(2, "0")}.svg`} inset={inset} className="bsys-icon" />
          ))}
          {/* Dark-background set: gradient panel with a gold hairline, its title, 5×4 icons */}
          <Abs src={`${I}/panel-dark-1.svg`} inset="0.21% 0.08% 0.56% 51.33%" />
          <Abs src={`${I}/panel-dark-2.svg`} inset="0.21% 0.08% 0.56% 51.33%" />
          <div className="absolute" style={{ inset: "0.21% 0.08% 0.56% 51.33%" }}>
            <img alt="" src={`${I}/panel-dark-3.svg`} className="absolute block max-w-none" style={{ inset: "-0.21% -0.16%", width: "100.32%", height: "100.42%" }} />
          </div>
          <Abs src={`${I}/panel-dark-text.svg`} inset="9.1% 5.19% 84.42% 53.92%" className="pointer-events-none" />
          {ICONS_DARK.map((inset, i) => (
            <Abs key={inset} src={`${I}/icon-d-${String(i + 1).padStart(2, "0")}.svg`} inset={inset} className="bsys-icon" />
          ))}
        </div>
      </div>
    </Scaled>
  );
}

function UiKit() {
  const t = useT();
  return (
    <section id="wd-uikit" className="flex w-[1872px] flex-col items-start gap-12 px-[236px] pt-[100px]">
      <Head
        eyebrow="FINAL DESIGN  ·  02.2"
        title="UI kit"
        lead="The BSC website style guide: brand and gradient colours, six functional ramps, the Barlow type scale and icon sets for light and dark backgrounds."
        leadWidth={760}
      />
      <div className="flex w-full items-start gap-5">
        {FACTS.map(([v, l]) => (
          <div key={l} data-rv className="min-w-px flex-1">
            <div className="bsys-card wd-hover flex flex-col items-start gap-1.5 rounded-[24px] bg-[var(--cmd-surface-1)] p-7">
              <p className="text-[48px] leading-[52px] font-semibold tracking-[-1.44px] whitespace-nowrap text-[var(--cmd-text-primary)]">{v}</p>
              <p className="text-[16px] leading-[24px] tracking-[-0.2px] whitespace-nowrap text-[var(--cmd-text-muted)]">{t(l)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full items-start gap-5">
        <div data-rv>
          <ColorPalette />
        </div>
        <div className="flex flex-col items-start gap-5">
          <div data-rv>
            <Typography />
          </div>
          <div data-rv>
            <IconsPack />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Phase 03 band (223:14093)                                            */
/* ================================================================== */

/*
 * Built locally rather than with intro.tsx's BscPhaseBand: that component's glow gradient is
 * tuned for the Phase 01 disc (blur 190, fixed 380px bleed); Phase 03 has an r 311 disc under a
 * 70px blur at (1159, -19.06). Re-expressed as a radial gradient over the blur's reach
 * (r 311 + 3σ = 521) — no CSS blur. Dot grid: #17397a dots, multiply (from the SVG export).
 */
const P3_GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.17) 38.4%, rgba(255,255,255,0.145) 48%, rgba(255,255,255,0.09) 59.7%, rgba(255,255,255,0.036) 71%, rgba(255,255,255,0.011) 80.6%, rgba(255,255,255,0) 100%)";

function PhaseUi() {
  const t = useT();
  return (
    <section id="wd-phase-ui" className="relative h-[500px] w-[1872px]">
      <div data-rv className="absolute left-[116px] h-[400px] w-[1640px]" style={{ top: 100.07 }}>
        <div className="relative size-full overflow-clip rounded-[40px] bg-[#2e63c9]" style={{ boxShadow: "12px 12px 0 0 #17397a" }}>
          <div aria-hidden className="pointer-events-none absolute" style={{ left: 949, top: -229.06, width: 1042, height: 1042, backgroundImage: P3_GLOW }} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply"
            style={{ backgroundImage: "radial-gradient(circle at 1.05px 1px, #17397a 0.75px, transparent 1.15px)", backgroundSize: "25.2308px 24px" }}
          />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap text-white">03</p>
          <div className="absolute left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px] text-white" style={{ top: "calc(50% + 0.07px)" }}>
            <p className={MONO}>{t("PHASE {num}", { num: "03" })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t("UI Design phase")}</p>
            <p className="w-[860px] text-[20px] leading-[28px]">
              {t("The launch: six page families — from the homepage and mega menu to trading platforms, brokerage, finance services and reports.")}
            </p>
            <div className="flex items-start gap-2">
              {["03.1  UI for launch", "03.2  Real-time experience"].map((c) => (
                <span key={c} className="wd-hover flex items-center rounded-full bg-white px-3 py-1.5 text-[16px] leading-[24px] tracking-[-0.2px] whitespace-pre text-[#14203f]">
                  {t(c)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BscSystem() {
  const ref = useRevealChildren<HTMLDivElement>("[data-rv]", 40);
  return (
    <div ref={ref} className="bsc-system flex flex-col">
      <UiKit />
      <PhaseUi />
    </div>
  );
}

/* ================================================================== */
/* Post Design Outcome (223:14718)                                      */
/* ================================================================== */

const TAKEAWAYS = [
  "It is always important to understand who your target audience is",
  "Taking inspiration from other case studies is okay",
  "How time-consuming the wireframing process is",
  "A deeper understanding of physical components",
];

/** "Group 1" (231:105323): MacBook Pro 16 frame, floor shadow, logo, camera and the page screenshot. */
function Laptop() {
  const t = useT();
  return (
    <div data-rv className="bsys-mac relative h-[418.292px] w-[730px] shrink-0">
      <img alt="" src={`${A}/mac-shadow.webp`} className="absolute top-[413.73px] left-0 block h-[4.562px] w-[730px] max-w-none" />
      <img alt="" src={`${A}/macbook.webp`} className="absolute top-0 left-[12.77px] block h-[416.774px] w-[704.455px] max-w-none" />
      <img alt="" src={`${A}/mac-logo.png`} className="absolute top-[381.8px] left-[345.16px] block h-[5.322px] w-[39.534px] max-w-none" />
      <img alt="" src={`${A}/mac-camera.png`} className="absolute top-[6.99px] left-[363.25px] block size-[3.345px] max-w-none" />
      <div className="bsys-screen absolute top-[14.62px] left-[82.24px] h-[359.974px] w-[572.549px] overflow-hidden rounded-[2.502px]">
        <img alt={t("BSC website — account opening page")} src={`${A}/screen.webp`} className="absolute top-0 left-0 block h-[347.33%] w-full max-w-none" />
      </div>
    </div>
  );
}

function Outcome() {
  const t = useT();
  return (
    <section id="wd-outcome" className="flex w-[1872px] flex-col items-start pt-[100px] pr-[156px] pl-[236px]">
      <div className="flex w-full items-end justify-between">
        <div className="flex w-[601px] shrink-0 flex-col items-start gap-8">
          <Head
            eyebrow="REFLECTIONS  ·  04.1"
            title="Post design outcome"
            lead="The project shipped in three months. Four lessons I carry into every case study since."
            leadWidth={554}
          />
          <div data-rv className="w-full">
            <div className="bsys-card wd-hover flex w-full flex-col items-start gap-5 rounded-[28px] bg-[var(--cmd-surface-1)] p-8">
              <p className="text-[24px] leading-[32px] font-semibold tracking-[-0.24px] whitespace-nowrap text-[var(--brand-bsc)]">{t("My key takeaways")}</p>
              {TAKEAWAYS.map((item) => (
                <div key={item} className="bsys-row flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-bsc)]">
                    <img alt="" src={`${A}/check.svg`} className="block size-4" />
                  </span>
                  <p className="w-[480px] text-[16px] leading-[24px] tracking-[-0.2px] text-[var(--cmd-text-primary)]">{t(item)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Laptop />
      </div>
    </section>
  );
}

/* ================================================================== */
/* Real-time Experience (226:14407)                                     */
/* ================================================================== */

function Realtime() {
  return (
    <section id="wd-realtime" className="flex w-[1872px] flex-col items-center justify-center gap-8 px-[156px] pt-[100px]">
      <Head
        center
        eyebrow="FINAL DESIGNS  ·  03.2"
        title="Real-time experience"
        lead="This website is live. To experience it in action, visit the link below."
        leadWidth={760}
      />
      <div data-rv>
        <a
          href="https://www.bsc.com.vn/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="bsys-btn flex items-center gap-2 rounded-full bg-[var(--brand-bsc)] px-6 py-3.5"
        >
          <span className="text-[14px] leading-[20px] font-semibold whitespace-nowrap text-white">bsc.com.vn/en</span>
          <img alt="" src={`${A}/external.svg`} className="block size-6 shrink-0" />
        </a>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Case End (223:14887)                                                 */
/* ================================================================== */

function CaseEnd() {
  const t = useT();
  return (
    <section id="wd-case-end" className="flex w-[1872px] flex-col items-center gap-7 px-[156px] pt-[100px] pb-20">
      <div data-rv className="flex w-full items-center gap-5 overflow-hidden">
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="size-3 shrink-0 rounded-full bg-[var(--brand-bsc)]" />
          <p className={`${MONO} text-[var(--cmd-text-secondary)]`}>{t("END OF CASE STUDY  ·  BSC  ·  2023")}</p>
        </div>
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
      </div>
      <p data-rv className="text-center text-[44px] leading-[56px] tracking-[-1.1px] whitespace-nowrap text-[var(--cmd-text-primary)]">
        {t("Thanks for reading — here is what I built next.")}
      </p>
    </section>
  );
}

export function BscOutro() {
  const ref = useRevealChildren<HTMLDivElement>("[data-rv]", 40);
  return (
    <div ref={ref} className="bsc-outro flex flex-col">
      <Outcome />
      <Realtime />
      <CaseEnd />
    </div>
  );
}
