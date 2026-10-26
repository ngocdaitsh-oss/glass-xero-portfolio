/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import "./vops-ui-a.css";
import type { CSSProperties, ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { VopsEyebrow, VopsHeading } from "./parts";
import { VopsUserFlows } from "./ui-a-flow";

const A = "/figma/vops/ui-a";
const L = `${A}/lib`;

/** Figma "Card/Soft". */
const CARD_SOFT = "0 12px 32px -4px rgba(15,23,41,0.06), 0 1px 3px 0 rgba(15,23,41,0.04)";
const INK = "#14141a";
const H3 = "text-[24px] leading-[32px] font-semibold tracking-[-0.24px] whitespace-nowrap";
const MONO14 = "font-mono text-[14px] leading-5 whitespace-nowrap";

/* ================================================================== */
/* Shared bits                                                          */
/* ================================================================== */

/** Section head: eyebrow + 56px heading, then the grey 20px lead (`gap` 40 as section siblings, 24 inside a block). */
function Head({ eyebrow, title, lead, leadWidth = 900, leading = "1.5", gap = 40 }: { eyebrow: string; title: ReactNode; lead: ReactNode; leadWidth?: number; leading?: string; gap?: number }) {
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
        <p className="text-[20px] text-[#4b4f58]" style={{ width: leadWidth, lineHeight: leading }}>
          {typeof lead === "string" ? t(lead) : lead}
        </p>
      </Reveal>
    </div>
  );
}

/** White Card/Soft card (24 radius) with the house hover lift. */
function Card({ className = "", style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`wd-hover relative rounded-[24px] bg-white ${className}`} style={{ boxShadow: CARD_SOFT, ...style }}>
      {children}
    </div>
  );
}

function Token({ children }: { children: ReactNode }) {
  return <span className={`flex items-start rounded-[8px] bg-[#f3f4f6] px-2.5 py-1.5 text-[#374151] ${MONO14}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* VIC specimens: the real component exports from Figma, composed from  */
/* their own SVG layers at the codegen insets (vector, sharp at any DPR) */
/* ------------------------------------------------------------------ */

type Mask = [src: string, pos: string, size: string];
type Piece = {
  /** SVG in /lib. */
  s: string;
  /** Layer box inset inside the specimen (CSS inset shorthand). */
  i?: string;
  /** Inset of the image inside the layer box (for strokes / shadows that overflow it). */
  p?: string;
  /** Alpha masks (clip-path groups in Figma), intersected. */
  m?: Mask[];
  multiply?: boolean;
};

function maskStyle(m: Mask[]): CSSProperties {
  const image = m.map(([s]) => `url(${L}/${s}.svg)`).join(", ");
  const pos = m.map(([, p]) => p).join(", ");
  const size = m.map(([, , z]) => z).join(", ");
  return {
    maskImage: image,
    maskPosition: pos,
    maskSize: size,
    maskRepeat: "no-repeat",
    maskMode: "alpha",
    maskComposite: "intersect",
    maskClip: "no-clip",
    WebkitMaskImage: image,
    WebkitMaskPosition: pos,
    WebkitMaskSize: size,
    WebkitMaskRepeat: "no-repeat",
  } as CSSProperties;
}

function Layer({ s, i = "0", p, m, multiply }: Piece) {
  return (
    <div className={`absolute ${multiply ? "mix-blend-multiply" : ""}`} style={{ inset: i, ...(m ? maskStyle(m) : null) }}>
      {p ? (
        <div className="absolute" style={{ inset: p }}>
          <img alt="" src={`${L}/${s}.svg`} className="block size-full max-w-none" />
        </div>
      ) : (
        <img alt="" src={`${L}/${s}.svg`} className="absolute inset-0 block size-full max-w-none" />
      )}
    </div>
  );
}

function Spec({ w, h, r, pieces, label, className = "", style }: { w: number; h: number; r?: number; pieces: Piece[]; label?: string; className?: string; style?: CSSProperties }) {
  const t = useT();
  return (
    <div role={label ? "img" : undefined} aria-label={label ? t(label) : undefined} className={`relative shrink-0 overflow-clip ${className}`} style={{ width: w, height: h, borderRadius: r, ...style }}>
      {pieces.map((pc, k) => (
        <Layer key={k} {...pc} />
      ))}
    </div>
  );
}

/** Button exports: solid fills carry a 1px bottom highlight (pad), ringed ones a 1px stroke. */
const PAD = "0 -2.7% -5% -2.7%";
const RING: Pick<Piece, "i" | "p"> = { i: "1.25% 0.68% 1.25% 0.67%", p: "-1.28% -0.68% -1.28% -0.69%" };
const SUBTLE_I = "31.92% 17.95% 39.56% 18.15%";

/* ================================================================== */
/* Iconography & illustration — Figma 280:14856                         */
/* ================================================================== */

function Iconography() {
  const t = useT();
  return (
    <section id="wd-iconography" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow={"DESIGN SYSTEM  ·  02.9"}
        title="Iconography & illustration"
        lead="420+ icons drawn as outline/filled pairs on a 24px grid, grouped by domain — plus an illustration set in Light and Dark."
      />
      <div className="flex w-full items-start gap-5">
        <Reveal className="self-stretch" enter={60}>
          <Card className="flex h-full w-[1000px] flex-col items-start justify-between p-8">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-start gap-2.5">
                <p className={H3} style={{ color: INK }}>
                  {t("Icon set")}
                </p>
                <span className="rounded-full bg-[#ffe8ec] px-3.5 py-1.5 text-[14px] leading-5 font-semibold whitespace-nowrap text-[#b30026]">Communication · 137</span>
                <span className="rounded-full bg-[#f3f4f6] px-3.5 py-1.5 text-[14px] leading-5 font-semibold whitespace-nowrap text-[#374151]">Arrows · 128</span>
              </div>
              <div className="flex flex-col items-start gap-4">
                <img src={`${A}/icons-comm.png`} alt={t("Communication icon set: outline and filled pairs")} width={936} height={259} className="uia-sheet block h-[259px] w-[936px] object-contain" />
                <img src={`${A}/icons-arrow.png`} alt={t("Arrow icon set: outline and filled pairs")} width={936} height={259} className="uia-sheet block h-[259px] w-[936px] object-contain" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <p className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
                {t("Sizes")}
              </p>
              <Token>icon/16</Token>
              <Token>icon/20</Token>
              <Token>icon/24</Token>
              <Token>icon/32</Token>
            </div>
          </Card>
        </Reveal>
        <Reveal className="self-stretch" enter={60}>
          <Card className="flex h-full w-[540px] flex-col items-start gap-4 p-8">
            <p className={H3} style={{ color: INK }}>
              {t("Illustration")}
            </p>
            <div className="uia-illus relative h-[560px] w-[476px] shrink-0 overflow-hidden rounded-[16px]">
              <img
                src={`${A}/illus.png`}
                alt={t("vOps illustration set: empty states, onboarding and success moments")}
                className="pointer-events-none absolute max-w-none"
                style={{ left: "8.61%", top: "-24.47%", width: "82.77%", height: "146.36%" }}
              />
            </div>
            <p className="w-[476px] text-[16px] leading-6 tracking-[-0.2px] text-[#4b5563]">{t("Empty states, onboarding and success moments across every product.")}</p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Component library — Figma 279:15193                                  */
/* ================================================================== */

function Caption({ name, count }: { name: string; count: string }) {
  const t = useT();
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <p className={MONO14} style={{ color: INK }}>
        ❖ {name}
      </p>
      <span className="rounded-full bg-white px-2.5 py-0.5 text-[14px] leading-[1.4] whitespace-nowrap text-[#6b7280]">{t(count)}</span>
    </div>
  );
}

/** One spec-sheet cell: caption + centred stage. `flex` is Figma's grow factor. */
function Cell({ name, count, flex, h, first, gap, children }: { name: string; count: string; flex: number; h: number; first?: boolean; gap?: number; children: ReactNode }) {
  return (
    <div
      className={`uia-cell flex min-w-px flex-col items-start bg-white px-7 py-6 ${first ? "" : "border-l border-[#c9c9c9]"}`}
      style={{ flex: `${flex} 0 0`, height: h }}
    >
      <Caption name={name} count={count} />
      <div className="uia-stage flex min-h-px w-full flex-1 flex-col items-center justify-center" style={{ gap }}>
        {children}
      </div>
    </div>
  );
}

const DASHED = "rounded-[16px] border-2 border-dashed border-[#bf00ff] p-6";

const SHEET_BTNS: { label: string; pieces: Piece[] }[] = [
  { label: "Primary button", pieces: [{ s: "btn-primary", p: PAD }] },
  { label: "Default button", pieces: [{ s: "btn-default", ...RING }] },
  { label: "Secondary button", pieces: [{ s: "btn-secondary", ...RING }] },
  { label: "Border button", pieces: [{ s: "btn-border", ...RING }] },
  { label: "Subtle button", pieces: [{ s: "btn-subtle", i: SUBTLE_I }] },
  { label: "Pill button", pieces: [{ s: "btn-pill", p: PAD }] },
];
const CHIPS = ["primary", "blue", "green", "orange", "red", "gray"];
const BADGES = ["primary", "green", "blue", "orange"];

const MOD_M = "554.333px 310.763px";
const MOD_S = "419.949px 176.379px";
const MODAL: Piece[] = [
  { s: "modal-overlay", m: [["modal-overlay-mask", "0 0", MOD_M]] },
  { s: "modal-shape", i: "21.62% 12.12%", m: [["modal-overlay-mask", "-67.191px -67.193px", MOD_M], ["modal-shape-mask", "0 0", MOD_S]] },
  { s: "modal-title", i: "30.33% 64.56% 63.83% 15.41%", m: [["modal-overlay-mask", "-85.41px -94.266px", MOD_M], ["modal-shape-mask", "-18.219px -27.072px", MOD_S]] },
  { s: "modal-icon", i: "29.9% 16.76% 65.03% 80.4%", m: [["modal-overlay-mask", "-445.676px -92.916px", MOD_M], ["modal-shape-mask", "-378.484px -25.723px", MOD_S]] },
  { s: "modal-body", i: "41.89% 12.12% 43.24% 12.12%", multiply: true, m: [["modal-overlay-mask", "-67.191px -130.184px", MOD_M], ["modal-shape-mask", "0 -62.99px", MOD_S]] },
  { s: "modal-footer", i: "56.76% 12.12% 21.62% 12.12%", m: [["modal-overlay-mask", "-67.191px -176.377px", MOD_M], ["modal-shape-mask", "0 -109.184px", MOD_S]] },
  { s: "modal-cancel", i: "64.78% 33.25% 31.71% 58.91%", m: [["modal-overlay-mask", "-326.574px -201.33px", MOD_M], ["modal-shape-mask", "-259.383px -134.137px", MOD_S]] },
  { s: "modal-confirm", i: "60.81% 15.15% 27.03% 70.64%", p: "0 -2.66% -5.55% -2.67%", m: [["modal-overlay-mask", "-391.602px -188.977px", MOD_M], ["modal-shape-mask", "-324.41px -121.783px", MOD_S]] },
];

const SH_M = "175.493px 380px";
const SH_S = "175.493px 190px";
const SHEET: Piece[] = [
  { s: "sheet-v3", i: "-33.99% -21.33% -9.85% -133.6%" },
  { s: "sheet-v4", i: "-1.91% -4.13% -1.91% -116.4%" },
  { s: "sheet-overlay", m: [["sheet-overlay-mask", "0 0", SH_M]] },
  { s: "sheet-shape", i: "50% 0 0 0", m: [["sheet-overlay-mask", "0 -190px", SH_M], ["sheet-shape-mask", "0 0", SH_S]] },
  { s: "sheet-title", i: "53.68% 43.94% 44.68% 44.22%", m: [["sheet-overlay-mask", "-77.602px -203.967px", SH_M], ["sheet-shape-mask", "-77.602px -13.967px", SH_S]] },
  { s: "sheet-input", i: "58.87% 4.27% 33.5% 4.27%", m: [["sheet-overlay-mask", "-7.488px -223.695px", SH_M], ["sheet-shape-mask", "-7.488px -33.695px", SH_S]] },
  { s: "sheet-bar", i: "88.92% 0 4.19% 0", m: [["sheet-overlay-mask", "0 -337.881px", SH_M], ["sheet-shape-mask", "0 -147.881px", SH_S]] },
  { s: "sheet-btn", i: "90.95% 52.27% 4.25% 4.4%", p: "-1.28% -0.31%", m: [["sheet-overlay-mask", "-7.723px -345.604px", SH_M], ["sheet-shape-mask", "-7.723px -155.604px", SH_S]] },
  { s: "sheet-primary", i: "90.89% 4.27% 4.19% 52.13%", p: "0 -1.22% -5% -1.23%", m: [["sheet-overlay-mask", "-91.492px -345.369px", SH_M], ["sheet-shape-mask", "-91.492px -155.369px", SH_S]] },
  { s: "sheet-home", i: "98.4% 27.2% 0.99% 34.4%", m: [["sheet-overlay-mask", "-60.367px -373.918px", SH_M], ["sheet-shape-mask", "-60.367px -183.918px", SH_S]] },
  { s: "sheet-grabber", i: "50.49% 45.2% 48.89% 45.2%", m: [["sheet-overlay-mask", "-79.32px -191.873px", SH_M]] },
];

const CHART: Piece[] = [
  { s: "chart-bg", i: "-4.2% -2.41% -110.7% -2.41%" },
  { s: "y1", i: "7.99% 88.63% 88.84% 3.95%" },
  { s: "y2", i: "17.16% 88.63% 79.67% 4.02%" },
  { s: "y3", i: "26.34% 88.63% 70.49% 4.04%" },
  { s: "y4", i: "35.51% 88.63% 61.32% 3.92%" },
  { s: "y5", i: "44.69% 88.63% 52.15% 3.97%" },
  { s: "y6", i: "53.86% 88.63% 42.97% 3.97%" },
  { s: "y7", i: "63.04% 88.62% 33.79% 3.95%" },
  { s: "y8", i: "72.21% 88.62% 24.62% 10.22%" },
  { s: "y-axis", i: "9.76% 86.63% 26.02% 13.22%" },
  { s: "plot-mask", i: "9.76% 3.73% 26.02% 13.37%" },
  { s: "grid-h", i: "9.76% 3.73% 26.02% 13.41%", p: "-0.21% 0" },
  { s: "grid-v", i: "9.76% 3.73% 26.02% 13.37%" },
  { s: "b1a", i: "35.45% 78.75% 26.02% 17.52%" },
  { s: "b1b", i: "41.87% 74.4% 26.02% 21.87%" },
  { s: "b1c", i: "57.47% 70.04% 26.02% 26.22%" },
  { s: "b2a", i: "29.94% 58.03% 26.02% 38.24%" },
  { s: "b2b", i: "36.36% 53.67% 26.02% 42.59%" },
  { s: "b2c", i: "51.96% 49.32% 26.02% 46.95%" },
  { s: "b3a", i: "23.52% 37.31% 26.02% 58.96%" },
  { s: "b3b", i: "39.12% 32.95% 26.02% 63.31%" },
  { s: "b3c", i: "47.38% 28.6% 26.02% 67.67%" },
  { s: "b4a", i: "16.18% 16.58% 26.02% 79.68%" },
  { s: "b4b", i: "26.27% 12.23% 26.02% 84.04%" },
  { s: "b4c", i: "49.21% 7.87% 26.02% 88.39%" },
  { s: "x1", i: "77.51% 73.64% 18.32% 20.73%" },
  { s: "x2", i: "77.51% 52.49% 18.32% 41.45%" },
  { s: "x3", i: "77.51% 31.84% 18.32% 62.17%" },
  { s: "x4", i: "77.51% 11.01% 18.32% 82.9%" },
  { s: "x-axis", i: "73.98% 3.73% 25.75% 13.37%" },
  { s: "leg1", i: "88.47% 54.71% 7.52% 37.01%" },
  { s: "leg2", i: "88.3% 40.33% 8.13% 49.3%" },
  { s: "leg3", i: "88.47% 27.51% 8.13% 63.61%" },
];

const TOAST_BASE: Piece[] = [
  { s: "toast-bg", i: "13.63% 4.27% 22.73% 4.27%" },
  { s: "toast-title", i: "37.5% 63.14% 48.69% 17.17%" },
  { s: "toast-action", i: "38.43% 7.79% 49.83% 81.73%" },
];
const TOASTS: { label: string; icon: Piece }[] = [
  { label: "Success toast", icon: { s: "toast-success", i: "35.98% 86.58% 45.08% 8.98%" } },
  { label: "Warning toast", icon: { s: "toast-warning", i: "36.45% 86.58% 46.03% 8.98%" } },
  { label: "Info toast", icon: { s: "toast-info", i: "35.98% 86.58% 45.08% 8.98%" } },
];

function SpecimenSheet() {
  return (
    <Reveal className="w-full" enter={60}>
      <div className="wd-hover flex w-full flex-col gap-px overflow-hidden rounded-[32px] bg-[#c9c9c9]">
        {/* Row 1 */}
        <div className="flex w-full items-start gap-0.5 bg-white">
          <Cell name="BUTTON" count="208 variants" flex={7} h={260} first>
            <div className={`flex flex-wrap content-start items-start justify-center gap-3.5 ${DASHED}`}>
              {SHEET_BTNS.map((b) => (
                <Spec key={b.label} w={74} h={40} pieces={b.pieces} label={b.label} className="uia-pop" />
              ))}
            </div>
          </Cell>
          <Cell name="CHIP & BADGE" count="336 + 112 variants" flex={5} h={260}>
            <div className={`flex flex-col items-center justify-center gap-3 ${DASHED}`}>
              <div className="flex flex-wrap content-start items-start justify-center gap-2.5">
                {CHIPS.map((c) => (
                  <Spec key={c} w={56.25} h={30} pieces={[{ s: `chip-${c}` }]} label={`${c} chip`} className="uia-pop" />
                ))}
              </div>
              <div className="flex flex-wrap content-start items-start justify-center gap-2.5">
                {BADGES.map((c) => (
                  <Spec key={c} w={41.25} h={30} pieces={[{ s: `badge-${c}` }]} label={`${c} badge`} className="uia-pop" />
                ))}
              </div>
            </div>
          </Cell>
        </div>
        {/* Row 2 */}
        <div className="flex w-full items-start gap-0.5 bg-white">
          <Cell name="INPUT & SELECT" count="140 + 210 variants" flex={4} h={380} first gap={14}>
            <Spec w={300} h={50} pieces={[{ s: "input" }]} label="Input, default" className="uia-pop" />
            <Spec w={300} h={50} pieces={[{ s: "input-focus", i: "1.24% 0.21% 1.26% 0.21%", p: "-1.28% -0.21%" }]} label="Input, focus" className="uia-pop" />
            <Spec
              w={300}
              h={50}
              label="Select"
              className="uia-pop"
              pieces={[
                { s: "select-field", i: "0 0.08% 0 0" },
                { s: "select-mask", i: "0 0.08% 0 0" },
                { s: "select-value", i: "32.5% 80.36% 37.11% 3.43%" },
                { s: "select-chevron", i: "43.75% 5.36% 41.66% 90.19%" },
              ]}
            />
          </Cell>
          <Cell name="TABS" count="underline · segment · pill" flex={4} h={380} gap={12}>
            <Spec
              w={446.667}
              h={52.409}
              label="Underline tabs"
              className="uia-pop"
              pieces={[
                { s: "tabs-divider", i: "97.72% 0 0.01% 0" },
                { s: "tabs-tab1", i: "30.89% 85.33% 0.01% 0" },
                { s: "tabs-tab2", i: "32.95% 52.46% 36.4% 30.99%" },
                { s: "tabs-tab3", i: "32.95% 19.29% 36.4% 66.18%" },
                { s: "tabs-tab4", i: "31.14% 2.45% 42.88% 85.42%" },
              ]}
            />
            <Spec
              w={446.667}
              h={59.903}
              label="Segment tabs"
              className="uia-pop"
              pieces={[
                { s: "seg-bg", i: "0 0 4.35% 0" },
                { s: "seg-1", i: "8.69% 74.85% 13.04% 1.17%", p: "-2.78% -2.43% -8.33% -2.43%" },
                { s: "seg-2", i: "34.17% 58.12% 41.01% 33.14%" },
                { s: "seg-3", i: "35.87% 32.26% 34.96% 56.54%" },
                { s: "seg-4", i: "36.24% 9.12% 41.01% 82.77%" },
              ]}
            />
          </Cell>
          <Cell name="TOAST" count="12 variants" flex={4} h={380}>
            {TOASTS.map((t, k) => (
              <Spec key={t.label} w={340} h={79.787} label={t.label} className="uia-pop" style={{ marginBottom: k < 2 ? -22 : 0 }} pieces={[TOAST_BASE[0], t.icon, TOAST_BASE[1], TOAST_BASE[2]]} />
            ))}
          </Cell>
        </div>
        {/* Row 3 */}
        <div className="flex w-full items-start gap-0.5 bg-white">
          <Cell name="MODAL DIALOG" count="5 sizes" flex={5} h={480} first>
            <Spec w={554.333} h={310.763} r={23.733} pieces={MODAL} label="Modal dialog, small" className="uia-pop" />
          </Cell>
          <Cell name="BOTTOM SHEET" count="short · long" flex={3} h={480}>
            <Spec w={175.493} h={380} r={13.587} pieces={SHEET} label="Bottom sheet, short" className="uia-pop" />
          </Cell>
          <Cell name="BAR CHART" count="6 of 17 chart types" flex={4} h={480}>
            <Spec w={446.667} h={256.33} pieces={CHART} label="Bar chart: vOps, vOffice and VSDS by quarter" className="uia-pop" />
          </Cell>
        </div>
      </div>
    </Reveal>
  );
}

function ComponentLibrary() {
  const t = useT();
  return (
    <section id="wd-components" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <div className="flex w-full flex-col items-start gap-6">
        <Head
          gap={24}
          eyebrow={"DESIGN SYSTEM  ·  02.10"}
          title="Component library"
          lead="62 components shipped and 24 in progress. A spec sheet of the core set — every specimen below is the real VIC component, not a redraw."
        />
        <Reveal className="w-full" enter={40}>
          <div className="flex w-full flex-col items-start gap-4">
            <p className="text-[24px] leading-8 font-bold whitespace-nowrap text-[#1b1b1b]">{t("Full Design System")}</p>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="w-full text-[16px] leading-6 text-[#1b1b1b]">{t("You can checkout my full design system in this link:")}</p>
              <div className="flex items-center gap-1">
                <span className="relative size-6 shrink-0 overflow-clip">
                  <img src={`${A}/figma.svg`} alt="" className="absolute block max-w-none" style={{ inset: "7.81% 21.88%", width: "56.24%", height: "84.38%" }} />
                </span>
                <a
                  href="https://www.figma.com/design/V7pBZ07ZggB1CTikT6lZhb/LMS-Design-System--Final-?node-id=414-16875&p=f&t=hAiICTXZ9nVMO44d-0"
                  target="_blank"
                  rel="noreferrer"
                  className="uia-link text-[16px] leading-6 font-bold whitespace-nowrap text-[#007ce2] underline decoration-solid"
                >
                  LMS Design System
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <SpecimenSheet />
    </section>
  );
}

/* ================================================================== */
/* Component deep dive — Button — Figma 280:14888                       */
/* ================================================================== */

const ANATOMY: [string, string][] = [
  ["Container", "Color/background/primary/bold · radius 8"],
  ["Label", "{children} · FS PF BeauSans Pro"],
  ["Height", "size = 18 · 32 · 36 · 40 · 44 · 48px"],
  ["Effect", "Inner highlight for depth"],
  ["Shape", "round · pill"],
];

const DIS: Piece[] = [{ s: "dis" }];
const STATES: { name: string; cells: Piece[][] }[] = [
  { name: "Primary", cells: [[{ s: "p-def", p: PAD }], [{ s: "p-hov", p: PAD }], [{ s: "p-press", p: "0 0 -7.5% 0" }], DIS] },
  { name: "Default", cells: [[{ s: "d-def", ...RING }], [{ s: "d-hov", p: "-2.5% -1.35%" }], [{ s: "d-press" }], DIS] },
  { name: "Secondary", cells: [[{ s: "s-def", ...RING }], [{ s: "s-hov", ...RING }], [{ s: "s-press" }], DIS] },
  { name: "Border", cells: [[{ s: "b-def", ...RING }], [{ s: "b-hov", ...RING }], [{ s: "b-press", ...RING }], [{ s: "b-dis" }]] },
  { name: "Subtle", cells: [[{ s: "u-def", i: SUBTLE_I }], [{ s: "u-hov" }], [{ s: "u-press" }], DIS] },
];
const STATE_NAMES = ["Default", "Hover", "Press", "Disabled"];

const SIZES: { label: string; w: number; h: number; s: string; p: string; mt: number }[] = [
  { label: "32px", w: 68, h: 32, s: "sz32", p: "0 -2.94% -6.25% -2.94%", mt: 8 },
  { label: "36px", w: 68, h: 36, s: "sz36", p: "0 -2.94% -5.56% -2.94%", mt: 6 },
  { label: "40px", w: 74, h: 40, s: "sz40", p: PAD, mt: 4 },
  { label: "44px", w: 74, h: 44, s: "sz44", p: "0 -2.7% -4.55% -2.7%", mt: 2 },
  { label: "48px", w: 80, h: 48, s: "sz48", p: "0 -2.5% -4.17% -2.5%", mt: 0 },
  { label: "pill", w: 74, h: 40, s: "sz-pill", p: PAD, mt: 4 },
];

const PROPS: [string, string, string][] = [
  ["appearance", "default · secondary · border · subtle · primary · link · text-only", "One primary per view"],
  ["shape", "round · pill", "Pill for floating CTAs"],
  ["state", "default · hover · press", "Pressed adds depth"],
  ["size", "18 · 32 · 36 · 40 · 44 · 48px", "44–48 on mobile"],
  ["isDisabled", "false · true", "Keeps label legible"],
  ["isLoading", "false", "Spinner replaces label"],
];
const COLS = [180, 180, 330, 210];

const P_DEF: Piece[] = [{ s: "p-def", p: PAD }];
const D_DEF: Piece[] = [{ s: "d-def", ...RING }];

function DoDont({ ok, pieces, title, text }: { ok: boolean; pieces: Piece[][]; title: string; text: string }) {
  const t = useT();
  const c = ok ? "#16a34a" : "#ee0033";
  return (
    <div
      className="wd-hover flex min-h-px w-full flex-1 flex-col items-start overflow-clip rounded-[24px] bg-white"
      style={{ border: `3px solid ${c}`, boxShadow: CARD_SOFT }}
    >
      <div className="flex h-[120px] w-full shrink-0 items-center justify-center gap-2.5 bg-[#f7f7f8]">
        {pieces.map((p, k) => (
          <Spec key={k} w={88.8} h={48} pieces={p} className="uia-pop" />
        ))}
      </div>
      <div className="h-[3px] w-full shrink-0" style={{ background: c }} />
      <div className="flex w-full flex-col items-start gap-1 px-6 py-5">
        <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-pre" style={{ color: ok ? "#166534" : "#b30026" }}>
          {t(title)}
        </p>
        <p className="w-[500px] text-[16px] leading-6 tracking-[-0.2px] text-[#4b5563]">{t(text)}</p>
      </div>
    </div>
  );
}

function ButtonDeepDive() {
  const tr = useT();
  return (
    <section id="wd-button" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow={"DESIGN SYSTEM  ·  02.11"}
        title="Component deep dive — Button"
        lead="How one component is specified end-to-end: anatomy, variants, states, sizes, properties and usage. Every VIC component follows this template."
      />
      {/* Row 1 — Figma lets the two cards run 42px past the 1560 column (662 + 20 + 920). */}
      <div className="flex w-full items-start gap-5">
        <Reveal className="self-stretch" enter={60}>
          <Card className="flex h-full w-[662px] flex-col items-start gap-5 p-10">
            <p className={H3} style={{ color: INK }}>
              {tr("Anatomy")}
            </p>
            <div className="flex h-[240px] w-[540px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-[#fff4f6]">
              <Spec w={177.6} h={96} pieces={[{ s: "an-btn", p: PAD }]} label="Primary button, size 48, shown at 2×" className="uia-pop" />
            </div>
            {ANATOMY.map(([name, token], k) => (
              <div key={name} className="uia-anat flex items-center gap-3.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#14141a] text-[14px] leading-[1.5] font-bold text-white">{k + 1}</span>
                <span className="flex w-[170px] items-start text-[16px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
                  {tr(name)}
                </span>
                <Token>{token}</Token>
              </div>
            ))}
          </Card>
        </Reveal>
        <Reveal className="self-stretch" enter={60}>
          <Card className="flex h-full w-[920px] shrink-0 flex-col items-start gap-4 p-10">
            <p className={H3} style={{ color: INK }}>
              {tr("Variants × states")}
            </p>
            <div className="flex items-start gap-3">
              <span className="w-[130px] shrink-0 text-[14px] leading-5">&#8203;</span>
              {STATE_NAMES.map((s) => (
                <span key={s} className={`w-40 shrink-0 text-[#8c9198] ${MONO14}`}>
                  {s}
                </span>
              ))}
            </div>
            {STATES.map((row) => (
              <div key={row.name} className="flex items-center gap-3">
                <span className="w-[130px] shrink-0 text-[16px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
                  {row.name}
                </span>
                {row.cells.map((pieces, k) => (
                  <div key={k} className="flex w-40 shrink-0 items-start py-1.5">
                    <Spec w={88.8} h={48} pieces={pieces} label={`${row.name} button, ${STATE_NAMES[k].toLowerCase()}`} className="uia-pop" />
                  </div>
                ))}
              </div>
            ))}
            <div className="flex items-center gap-4">
              <span className="w-[130px] shrink-0 text-[16px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
                {tr("Sizes")}
              </span>
              {SIZES.map((z) => (
                <div key={z.label} className="flex shrink-0 flex-col items-center gap-1.5">
                  <Spec w={z.w} h={z.h} pieces={[{ s: z.s, p: z.p }]} label={`Primary button, ${z.label}`} className="uia-pop" />
                  <span className={`text-[#8c9198] ${MONO14}`}>{z.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
      {/* Row 2 */}
      <div className="flex w-full items-stretch gap-5">
        <Reveal enter={60}>
          <Card className="flex w-[980px] flex-col items-start p-10">
            <p className={H3} style={{ color: INK }}>
              {tr("Component properties")}
            </p>
            <div className="h-3.5 w-px shrink-0 bg-white" />
            <div className="flex items-start rounded-[12px] bg-[#fff4f6] py-3">
              {["Property", "Type", "Values", "Note"].map((h, k) => (
                <span key={h} className="flex shrink-0 items-start px-3.5 text-[14px] leading-5 font-semibold whitespace-nowrap text-[#b30026]" style={{ width: COLS[k] }}>
                  {tr(h)}
                </span>
              ))}
            </div>
            {PROPS.map(([prop, values, note]) => (
              <div key={prop} className="uia-tr flex items-center rounded-[12px] py-3.5">
                <span className="flex shrink-0 items-start px-3.5" style={{ width: COLS[0] }}>
                  <span className={MONO14} style={{ color: INK }}>
                    {prop}
                  </span>
                </span>
                {["Variant", values, note].map((t, k) => (
                  <span key={k} className="flex shrink-0 items-start px-3.5" style={{ width: COLS[k + 1] }}>
                    <span className="text-[16px] leading-6 tracking-[-0.2px] text-[#4b5563]" style={{ width: COLS[k + 1] - 28 }}>
                      {k === 2 ? tr(t) : t}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </Card>
        </Reveal>
        <Reveal className="flex min-w-px flex-1" enter={60}>
          <div className="flex w-full flex-col items-start gap-5 self-stretch">
            <DoDont ok pieces={[P_DEF, D_DEF]} title={"✓  Do"} text="One primary action per view; secondary for the rest." />
            <DoDont ok={false} pieces={[P_DEF, P_DEF]} title={"✕  Don't"} text="Two primary buttons competing for attention." />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* The vOps layer on VIC — Figma 280:15219                              */
/* ================================================================== */

const STEPS_PATH: { n: string; color: string; title: string; text: string }[] = [
  { n: "01", color: "#14141a", title: "VIC core", text: "Foundations + 62 components, owned by the central design-system team." },
  { n: "02", color: "#ee0033", title: "vOps layer", text: "Mini-app kit + GenHub kit — the patterns VIC didn't have yet." },
  { n: "03", color: "#f472b6", title: "27+ mini apps · GenHub · Chat", text: "Built by different squads, all on the same kit." },
  { n: "04", color: "#16a34a", title: "Promoted back to VIC", text: "Patterns reused across squads move down into the core library." },
];

const ORANGE = "#f59e0b";
const GREEN = "#16a34a";

function Callout({ x, y, dot, name, note, leaderX, leaderY }: { x: number; y: number; dot: string; name: string; note: string; leaderX: number; leaderY: number }) {
  const t = useT();
  return (
    <>
      <div className="uia-callout absolute flex items-center gap-2 rounded-full bg-white py-[7px] pr-3.5 pl-3" style={{ left: x, top: y }}>
        <span className="size-2 shrink-0 rounded-full" style={{ background: dot }} />
        <span className="text-[14px] leading-[1.5] font-semibold whitespace-nowrap text-[var(--cmd-text-primary)]">{t(name)}</span>
        <span className="text-[14px] leading-[1.5] whitespace-nowrap text-[var(--cmd-text-secondary)]">{t(note)}</span>
      </div>
      <div className="absolute h-[27px] w-px bg-[rgba(20,20,26,0.35)]" style={{ left: leaderX, top: leaderY }} />
      <div className="absolute size-[7px] rounded-full bg-[#14141a]" style={{ left: leaderX - 3, top: leaderY + 23.5 }} />
    </>
  );
}

function VopsLayer() {
  const t = useT();
  return (
    <section id="wd-vops-layer" className="relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]">
      <Head
        eyebrow={"DESIGN SYSTEM  ·  02.13"}
        title="The vOps layer on VIC"
        lead="vOps needed patterns VIC didn't have yet — request cards, approval actions, status timelines. We built them as a product layer on top of VIC, then promoted the reusable ones back into the core library."
      />
      <div className="flex w-full items-start gap-14">
        <Reveal className="w-[420px] shrink-0" enter={60}>
          <div className="flex w-[420px] flex-col items-start">
            <p className="font-mono text-[14px] leading-[1.3] whitespace-nowrap text-[#6b7280]">{t("HOW A PATTERN TRAVELS")}</p>
            <div className="h-5 w-2.5 shrink-0" />
            <div className="h-px w-full bg-[rgba(20,20,26,0.1)]" />
            {STEPS_PATH.map((s) => (
              <div key={s.n} className="contents">
                <div className="uia-step flex w-full items-start gap-5 py-[22px]">
                  <span className="uia-step-num flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-[14px] leading-[1.3] text-white" style={{ background: s.color }}>
                    {s.n}
                  </span>
                  <div className="flex min-w-px flex-1 flex-col items-start gap-1 leading-[1.5]">
                    <p className="w-full text-[20px] font-semibold text-[var(--cmd-text-primary)]">{t(s.title)}</p>
                    <p className="w-full text-[16px] text-[var(--cmd-text-secondary)]">{t(s.text)}</p>
                  </div>
                </div>
                <div className="h-px w-full bg-[rgba(20,20,26,0.1)]" />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="min-w-px flex-1" enter={60}>
          <div className="relative h-[620px] w-[1084px] overflow-clip rounded-[32px] bg-[#ffe8ec]">
            {/* Grid: 1px white 70% lines every 56px (first at 56, none on the edges). */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-[56px] h-[620px] w-[1028px]"
              style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.7) 0 1px, transparent 1px)", backgroundSize: "56px 100%" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-[56px] left-0 h-[564px] w-[1084px]"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0 1px, transparent 1px)", backgroundSize: "100% 56px" }}
            />
            {/* Request card */}
            <div className="uia-spec absolute flex w-[408.75px] flex-col items-start gap-2.5 rounded-[17.5px] bg-white p-5" style={{ left: 64, top: 120 }}>
              <div className="flex items-start gap-2.5">
                <p className="text-[20px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
                  Annual leave
                </p>
                <span className="rounded-full bg-[#fff6e0] px-[17.5px] py-[7.5px] text-[17.5px] leading-[25px] font-semibold whitespace-nowrap text-[#8a5a00]">Pending</span>
              </div>
              <p className="text-[17.5px] leading-[25px] whitespace-nowrap text-[#6b7280]">Fri 24 Oct · 1 day</p>
            </div>
            <Callout x={92} y={58} dot={ORANGE} name="Request card" note="· vOps only" leaderX={110} leaderY={93} />
            {/* Approval card */}
            <div className="uia-spec absolute flex w-[425.1px] flex-col items-start gap-[13px] rounded-[18.2px] bg-white p-[20.8px]" style={{ left: 560, top: 104 }}>
              <p className="text-[20.8px] leading-[1.5] font-semibold whitespace-nowrap" style={{ color: INK }}>
                1-day leave request
              </p>
              <span className="rounded-full bg-[#e8f5e9] px-[18.2px] py-[7.8px] text-[18.2px] leading-[26px] font-semibold whitespace-nowrap text-[#166534]">Coverage 86%</span>
              <div className="flex items-start gap-[10.4px]">
                <span className="uia-btn flex h-[46.8px] items-center rounded-[13px] bg-white px-[23.4px] text-[18.2px] leading-[26px] font-semibold whitespace-nowrap" style={{ color: INK }}>
                  Reject
                </span>
                <span className="uia-btn flex h-[46.8px] items-center rounded-[13px] bg-[#ee0033] px-[23.4px] text-[18.2px] leading-[26px] font-semibold whitespace-nowrap text-white">Approve</span>
              </div>
            </div>
            <Callout x={588} y={42} dot={GREEN} name="Approval card" note="· Promoted to VIC" leaderX={606} leaderY={77} />
            {/* Status timeline */}
            <div className="uia-spec absolute flex flex-col items-start gap-[17.5px] rounded-[17.5px] bg-white px-[30px] py-[25px]" style={{ left: 64, top: 368 }}>
              {[
                { t: "Submitted · 08:12", done: true },
                { t: "Manager approved · 09:40", done: true },
                { t: "HR confirmation · waiting", done: false },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-[12.5px]">
                  <span className="size-[15px] shrink-0 rounded-[7.5px]" style={{ background: s.done ? "#75c044" : "#dcdee0" }} />
                  <p className={`text-[17.5px] leading-[25px] whitespace-nowrap ${s.done ? "font-semibold" : ""}`} style={{ color: s.done ? INK : "#8c9198" }}>
                    {s.t}
                  </p>
                </div>
              ))}
            </div>
            <Callout x={92} y={306} dot={GREEN} name="Status timeline" note="· Promoted to VIC" leaderX={110} leaderY={341} />
            {/* Answer bubble */}
            <div className="uia-spec absolute flex w-[408.75px] flex-col items-start gap-2.5 rounded-[17.5px] bg-white p-5" style={{ left: 560, top: 392 }}>
              <p className="text-[17.5px] leading-[25px] font-semibold whitespace-nowrap text-[#ee0033]">GenHub</p>
              <div className="h-2.5 w-[325px] rounded-[5px] bg-[#dcdee0]" />
              <div className="h-2.5 w-[275px] rounded-[5px] bg-[#dcdee0]" />
              <div className="flex items-start gap-[7.5px]">
                <span className="rounded-full bg-white px-[17.5px] py-[7.5px] text-[17.5px] leading-[25px] font-semibold whitespace-nowrap text-[#4b5563]">📄 Source</span>
                <span className="rounded-full bg-[#ecf6ff] px-[17.5px] py-[7.5px] text-[17.5px] leading-[25px] font-semibold whitespace-nowrap text-[#086acc]">
                  <span className="uia-caret">▍</span> streaming
                </span>
              </div>
            </div>
            <Callout x={588} y={330} dot={GREEN} name="Answer bubble" note="· Promoted to VIC" leaderX={606} leaderY={365} />
            {/* Legend */}
            <div className="absolute flex items-start gap-5" style={{ left: 64, top: 570.5 }}>
              <span className="flex items-center gap-2 text-[14px] leading-[1.5] whitespace-nowrap text-[var(--cmd-text-secondary)]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: ORANGE }} />
                {t("vOps only")}
              </span>
              <span className="flex items-center gap-2 text-[14px] leading-[1.5] whitespace-nowrap text-[var(--cmd-text-secondary)]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: GREEN }} />
                {t("Promoted to VIC")}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Phase 03 band — Figma 272:14939                                      */
/* ================================================================== */

/*
 * Built locally rather than with research.tsx's VopsPhaseBand: Phase 03 differs from the
 * Phase 01 layout that component hardcodes — 500px section (band top 100.07), copy block
 * at x 626 / 674 wide with no step chips, a smaller glow (r 311, blur 70 at 1159,-19) and
 * a navy (#17397a) offset shadow.
 *
 * Glow: an 18% white disc (r 311) under a 70px Gaussian blur, re-expressed as a radial
 * gradient over the blur's full reach (r 311 + 3σ = 521) — no CSS blur.
 */
const P3_GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.17) 38.4%, rgba(255,255,255,0.145) 48%, rgba(255,255,255,0.09) 59.7%, rgba(255,255,255,0.036) 71%, rgba(255,255,255,0.011) 80.6%, rgba(255,255,255,0) 100%)";

function PhaseUi() {
  const t = useT();
  return (
    <section id="wd-phase-ui" className="relative h-[500px] w-full">
      <Reveal className="absolute top-[100px] left-[116px] h-[400px] w-[1640px]" enter={80}>
        <div className="relative size-full overflow-clip rounded-[40px] bg-[#ee0033]" style={{ boxShadow: "12px 12px 0 0 #17397a" }}>
          <div aria-hidden className="pointer-events-none absolute" style={{ left: 949, top: -229.06, width: 1042, height: 1042, backgroundImage: P3_GLOW }} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply"
            style={{
              opacity: 0.18,
              backgroundImage: "radial-gradient(circle at 1.05px 1px, #000 0.75px, transparent 1.15px)",
              backgroundSize: "25.2308px 24px",
            }}
          />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap text-white">03</p>
          <div className="absolute left-[626px] flex w-[674px] -translate-y-1/2 flex-col items-start gap-[18px] text-white" style={{ top: "calc(50% - 0.07px)" }}>
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {n}", { n: "03" })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t("UI Design phase")}</p>
            <p className="w-full text-[20px] leading-[28px]">{t("The release: a Discovery feed that brings work to each employee, and 27+ mini apps that all speak VIC.")}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */

/** Iconography, Component library, Button deep dive, vOps layer, Phase 03 band, User flows. */
export function VopsUiA() {
  return (
    <>
      <Iconography />
      <ComponentLibrary />
      <ButtonDeepDive />
      <VopsLayer />
      <PhaseUi />
      <VopsUserFlows />
    </>
  );
}
