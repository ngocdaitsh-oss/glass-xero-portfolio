"use client";

import "./vops-system-b.css";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { sappRoboto } from "../sapp/fonts";
import { VopsEyebrow, VopsHeading } from "./parts";

/*
 * vOps · Design system, part B (Figma 278:15091 → 279:15092):
 * System architecture, Token architecture, Colour, Typography, Spacing/layout/grid, Elevation/radius/motion.
 * Figma sections have no bottom padding of their own (fixed heights), so each section is pt-100 only.
 */

const ASSET = "/figma/vops/system-b";
const ROBOTO = "font-[family-name:var(--font-sapp-roboto)]";
const CARD = "wd-hover rounded-[24px] bg-white shadow-[var(--vb-card-soft)]";
const SECTION = "vb-ease relative flex w-full flex-col items-start gap-10 px-[156px] pt-[100px]";

/* Shared pieces ------------------------------------------------------------ */

/** Section head: eyebrow + 56/60 red heading, then the 20/30 lead 24px below (Figma "Frame 21447697xx"). */
function Head({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  const t = useT();
  return (
    <Reveal className="w-full">
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-4">
          <VopsEyebrow label={t(eyebrow)} />
          <VopsHeading>{typeof title === "string" ? t(title) : title}</VopsHeading>
        </div>
        <p className="w-[900px] text-[20px] leading-[1.5] text-[#4b4f58]">{typeof children === "string" ? t(children) : children}</p>
      </div>
    </Reveal>
  );
}

/** Grey mono token pill (Figma "Token"). */
function Token({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`vb-token flex w-fit shrink-0 items-start rounded-[8px] bg-[#f3f4f6] px-2.5 py-1.5 font-mono text-[14px] leading-5 whitespace-nowrap text-[#374151] ${className}`}>
      {children}
    </span>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  const t = useT();
  return <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[#14141a]">{typeof children === "string" ? t(children) : children}</p>;
}

/* ========================================================================== */
/* System architecture (Figma 278:15091)                                      */
/* ========================================================================== */

const LAYERS: { n: string; name: string; desc: string; bg: string; ink: string; indent: number; pad: number }[] = [
  { n: "05", name: "Applications", desc: "vERP · GenBI · vOffice · vOps · SSO · vLXP · App Store · …", bg: "#14141a", ink: "#ffffff", indent: 0, pad: 32 },
  { n: "04", name: "Templates", desc: "Login · Dashboard · List view · Detail view · Settings", bg: "#56000b", ink: "#ffffff", indent: 40, pad: 60 },
  { n: "03", name: "Patterns", desc: "Form layout · Data grid · Navigation bar · Dashboard shell", bg: "#97001c", ink: "#ffffff", indent: 80, pad: 88 },
  { n: "02", name: "Components", desc: "62 shipped · 24 in progress — Button, Input, Table, Modal, Chart, Tree org-chart…", bg: "#ee0033", ink: "#ffffff", indent: 160, pad: 116 },
  { n: "01", name: "Foundations", desc: "Color · Typography · Spacing · Layout & grid · Elevation · Illustration · Motion", bg: "#fed7df", ink: "#56000b", indent: 220, pad: 144 },
];

/* Elbow arrows between layers, positioned inside the Layers card as in Figma (285:14856–9). */
const ARCH_ARROWS: { src: string; left: number; top: number; w: number }[] = [
  { src: "arch-arrow-1.svg", left: 209.64, top: 393, w: 40.364 },
  { src: "arch-arrow-2.svg", left: 129.64, top: 305, w: 60.364 },
  { src: "arch-arrow-3.svg", left: 89.64, top: 217, w: 20.364 },
  { src: "arch-arrow-3.svg", left: 49.64, top: 129, w: 20.364 },
];

function SystemArchitecture() {
  const t = useT();
  return (
    <section id="wd-architecture" className={SECTION}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.3" title="System architecture">
        Five layers, from raw decisions to shipped products. Each layer only consumes the one below it.
      </Head>
      <Reveal className="w-full">
        <div className={`vb-arch ${CARD} relative flex w-full flex-col items-start gap-3 p-10`}>
          {LAYERS.map((l) => (
            <Reveal key={l.n} enter={40} className="w-full">
              <div className="w-full" style={{ paddingLeft: l.indent }}>
                <div
                  className="vb-layer flex w-full items-center gap-7 rounded-[16px] py-[22px] pr-8 whitespace-nowrap"
                  style={{ background: l.bg, color: l.ink, paddingLeft: l.pad }}
                >
                  <p className="vb-layer-n font-mono text-[14px] leading-5 font-bold">{l.n}</p>
                  <div className="flex w-[240px] shrink-0 items-start">
                    <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px]">{t(l.name)}</p>
                  </div>
                  <p className="text-base leading-6 tracking-[-0.2px]">{t(l.desc)}</p>
                </div>
              </div>
            </Reveal>
          ))}
          {ARCH_ARROWS.map((a) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${a.left}-${a.top}`}
              alt=""
              src={`${ASSET}/${a.src}`}
              className="vb-arch-arrow pointer-events-none absolute block max-w-none"
              style={{ left: a.left, top: a.top, width: a.w, height: 47 }}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ========================================================================== */
/* Token architecture (Figma 278:15125)                                       */
/* ========================================================================== */

type Tier = { eyebrow: string; title: string; chip: string; desc: string; tokens: string[]; colors?: string[] };

const TIERS: Tier[] = [
  {
    eyebrow: "TIER 1 · PRIMITIVE",
    title: "_🎨 Tokens/Colors",
    chip: "158 values",
    desc: "The raw palette: 13 colour ramps. Never bound directly in UI.",
    tokens: ["Red/Primary", "Red-600", "Gray-900", "GreenLeaf-500", "Blue-Info"],
    colors: ["#ee0033", "#c80029", "#2c2f32", "#75c044", "#2d96ff"],
  },
  {
    eyebrow: "TIER 2 · SEMANTIC",
    title: "🌮 Color — Light / Dark",
    chip: "302 tokens",
    desc: "Named by intent: text, icon, border, background, interaction, chart.",
    tokens: ["Color/text/default", "Color/border/focused", "Color/background/primary/bold", "Color/background/success/bold", "Color/interaction/hovered"],
  },
  {
    eyebrow: "TIER 3 · COMPONENT",
    title: "🌮 Component Color",
    chip: "376 tokens",
    desc: "Scoped to one component, so state changes never leak elsewhere.",
    tokens: ["button/primary/bg", "input/border/focused", "tag/success/bg", "table/row/hovered", "toast/info/bg"],
  },
];

const COLLECTIONS: [string, string, string, string][] = [
  ["_🎨 Tokens/Colors", "158", "—", "Primitive palette (hidden from publishing)"],
  ["🌮 Color", "302", "Light · Dark", "Semantic colour by intent"],
  ["🌮 Component Color", "376", "Light · Dark", "Component-scoped colour"],
  ["🌮 Spacing", "28", "—", "Spacing, padding and radius scale"],
  ["🌮 Typography", "68", "—", "Family, size, line-height, weight"],
  ["🌮 Responsive", "3", "5 breakpoints", "Layout values from 320 to 1767+"],
];
const COL_W = [340, 140, 300, 700];

function TokenArchitecture() {
  const tr = useT();
  return (
    <section id="wd-tokens" className={SECTION}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.4" title="Token architecture">
        Three tiers of Figma variables. Products never touch primitives — they speak in semantic and component tokens, so Light/Dark and future rebrands are a mode switch, not a redesign.
      </Head>

      {/* Row 278:15133 */}
      <div className="vb-tiers flex w-full items-stretch">
        {TIERS.map((t, i) => (
          <Fragment key={t.eyebrow}>
            {i > 0 ? (
              <div className="relative h-10 w-20 shrink-0 self-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={`${ASSET}/tier-arrow.svg`} className="vb-tier-arrow absolute inset-0 block size-full max-w-none" />
              </div>
            ) : null}
            <Reveal className="flex min-w-px flex-1">
              <div className={`${CARD} flex w-full flex-col items-start gap-3.5 p-8`}>
                <p className="font-mono text-[14px] leading-5 whitespace-nowrap text-[#9ca3af]">{tr(t.eyebrow)}</p>
                <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[#14141a]">{t.title}</p>
                <span className="vb-chip flex rounded-full bg-[#f3f4f6] px-3.5 py-1.5 text-[14px] leading-5 font-semibold whitespace-nowrap text-[#374151]">{tr(t.chip)}</span>
                <p className="w-[412px] text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-primary)]">{tr(t.desc)}</p>
                {t.tokens.map((tok, k) => (
                  <Reveal key={tok} enter={60}>
                    {t.colors ? (
                      <div className="vb-tok flex items-center gap-2.5">
                        <span className="vb-tok-sw size-6 shrink-0 rounded-[6px]" style={{ background: t.colors[k] }} />
                        <Token>{tok}</Token>
                      </div>
                    ) : (
                      <div className="vb-tok">
                        <Token>{tok}</Token>
                      </div>
                    )}
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </Fragment>
        ))}
      </div>

      {/* Variable collections 278:15196 */}
      <Reveal className="w-full">
        <div className={`${CARD} flex w-full flex-col items-start p-10`}>
          <CardTitle>Variable collections</CardTitle>
          <div className="h-4 w-px shrink-0" />
          <div className="flex w-full items-start rounded-[12px] bg-[#fff4f6] py-3">
            {["Collection", "Variables", "Modes", "Purpose"].map((h, i) => (
              <div key={h} className="flex shrink-0 items-start px-4" style={{ width: COL_W[i] }}>
                <p className="text-[14px] leading-5 font-semibold whitespace-nowrap text-[#b30026]">{tr(h)}</p>
              </div>
            ))}
          </div>
          {COLLECTIONS.map((row) => (
            <Reveal key={row[0]} enter={40} className="w-full">
              <div className="vb-tr relative flex w-full items-start py-3.5">
                {row.map((cell, i) => (
                  <div key={i} className="relative flex shrink-0 items-start px-4" style={{ width: COL_W[i] }}>
                    {i === 0 ? (
                      <p className="font-mono text-base leading-[1.4] whitespace-nowrap text-[#14141a]">{cell}</p>
                    ) : (
                      <p className="text-base leading-6 tracking-[-0.2px] whitespace-nowrap text-[var(--cmd-text-primary)]">{tr(cell)}</p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ========================================================================== */
/* Colour (Figma 278:15262)                                                   */
/* ========================================================================== */

const RAMPS: [string, string[]][] = [
  ["Red · Primary", ["#FFF7F9", "#FED7DF", "#FF859F", "#FF466F", "#FF1F4F", "#EE0033", "#C80029", "#97001C", "#740013", "#56000B"]],
  ["Gray", ["#FAFBFB", "#F3F4F5", "#E8E9EA", "#DCDEE0", "#A9ADB2", "#8C9198", "#6F767E", "#43474C", "#2C2F32", "#000000"]],
  ["RedOrange", ["#F8AB9E", "#F69788", "#F58473", "#F37053", "#F15B40", "#EF4323", "#D93E27", "#C53827", "#B23225", "#9E2C21"]],
  ["Orange", ["#FDC689", "#FBB273", "#F89E5D", "#F68C47", "#F17933", "#F26724", "#DA5F27", "#C85728", "#B44E26", "#A04523"]],
  ["DarkYellow", ["#FFE293", "#FFDD7E", "#FFD869", "#FFD44F", "#FFCF31", "#FFCC09", "#E7B921", "#D3A92A", "#BB982F", "#A8882F"]],
  ["Green", ["#D1E39B", "#C6DE89", "#BBD876", "#BCD85F", "#B1D34A", "#A5CE3A", "#96BD3D", "#88AC3E", "#7A9B3D", "#6B8B3B"]],
  ["DeepGreen", ["#B1DED3", "#A6D8C0", "#8ECFAE", "#82CA9C", "#76C58C", "#6CC17C", "#60B070", "#58A166", "#4C925C", "#438353"]],
  ["GreenMint", ["#E1F4FD", "#C9E9E6", "#B1DED3", "#99D4C0", "#7FCBAE", "#64C29D", "#5BB18F", "#50A284", "#499478", "#3F846B"]],
];

const SEMANTIC = [
  { name: "Success", hex: "#75C044", use: "Done, approved, synced" },
  { name: "Info", hex: "#2D96FF", use: "Hints, neutral info, AI tips" },
  { name: "Warning", hex: "#F89521", use: "Due soon, missing info" },
  { name: "Error", hex: "#ED1B2F", use: "Invalid input, rejected, offline" },
];

const DO_DONT = [
  { kind: "do", ring: "#16a34a", ink: "#166534", button: "Color/background/primary/bold", title: "✓  Do — bind semantic tokens", body: "Fills use Color/background/primary/bold so Dark mode and rebrands follow automatically." },
  { kind: "dont", ring: "#ee0033", ink: "#b30026", button: "#EE0033", title: "✕  Don't — paste hex values", body: "#EE0033 pasted into a frame breaks in Dark mode and can't be audited." },
];

function Swatch({ hex }: { hex: string }) {
  return (
    <div className="vb-sw flex w-[124px] shrink-0 flex-col items-start gap-1">
      <span className="vb-sw-chip h-12 w-[124px] rounded-[10px]" style={{ background: hex, "--sw": hex } as CSSProperties} />
      <span className="vb-sw-hex font-mono text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{hex}</span>
    </div>
  );
}

function Colour() {
  const t = useT();
  return (
    /* Figma's section is 1766 tall; the Do/Don't row hangs 4px past it. */
    <section id="wd-colour" className={SECTION} style={{ height: 1766 }}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.5" title="Colors">
        Viettel red leads, with ten accent ramps for charts and categories, and four semantic sets — every colour defined for Light and Dark.
      </Head>

      {/* Palette 278:15270 */}
      <Reveal className="w-full">
        <div className={`${CARD} flex w-full flex-col items-start gap-6 p-10`}>
          <p className="text-[30px] leading-9 font-semibold tracking-[-0.6px] whitespace-nowrap text-[var(--cmd-text-primary)]">{t("Colors Accent")}</p>
          <div className="flex w-full flex-col items-start gap-2.5">
            {RAMPS.map(([name, hexes]) => (
              <Reveal key={name} enter={40} className="w-full">
                <div className="vb-ramp flex w-full items-center gap-2">
                  <div className="flex w-[180px] shrink-0 items-start">
                    <p className="vb-ramp-name text-base leading-[1.5] font-semibold whitespace-nowrap text-[#14141a]">{name}</p>
                  </div>
                  {hexes.map((h, i) => (
                    <Swatch key={`${name}-${i}`} hex={h} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Semantic sets 278:15535 */}
      <div className="flex w-full items-stretch gap-5">
        {SEMANTIC.map((s) => (
          <Reveal key={s.name} className="flex w-[375px] shrink-0">
            <div className={`vb-sem ${CARD} flex w-full flex-col items-start overflow-clip`}>
              <div className="vb-sem-band h-24 w-full shrink-0" style={{ background: s.hex }} />
              <div className="flex w-full flex-col items-start gap-2 p-6">
                <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[#14141a]">{s.name}</p>
                <Token>{s.hex}</Token>
                <p className="w-[327px] text-base leading-6 tracking-[-0.2px] text-[#4b5563]">{t(s.use)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Do / Don't 278:15564 */}
      <div className="flex w-full items-stretch gap-5">
        {DO_DONT.map((d) => (
          <Reveal key={d.kind} className="flex w-[770px] shrink-0">
            <div className={`vb-dd ${CARD} flex w-full flex-col items-start overflow-clip border-[3px] border-solid`} style={{ borderColor: d.ring }}>
              <div className="flex h-[200px] w-full shrink-0 items-center justify-center bg-[#f7f7f8]">
                <span className="vb-dd-btn flex items-start rounded-[10px] bg-[#ee0033] px-6 py-3 font-mono text-[14px] leading-5 whitespace-nowrap text-white">{d.button}</span>
              </div>
              <div className="h-1 w-full shrink-0" style={{ background: d.ring }} />
              <div className="flex w-full flex-col items-start gap-1.5 p-6">
                <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-pre" style={{ color: d.ink }}>
                  {t(d.title)}
                </p>
                <p className="w-[722px] text-base leading-6 tracking-[-0.2px] text-[#4b5563]">{t(d.body)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Typography (Figma 279:14856)                                               */
/* ========================================================================== */

const ALPHABET = "AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY  aăâbcdđeêghiklmnoôơpqrstuưvxy  0123456789";

const TYPE_SCALE: { name: string; meta: string; size: number; lh: number; roboto?: boolean }[] = [
  { name: "Heading / XXL", meta: "32 / 36 · BeauSans Bold", size: 32, lh: 36 },
  { name: "Heading / XL", meta: "28 / 32 · BeauSans Bold", size: 28, lh: 32 },
  { name: "Heading / L", meta: "24 / 28 · BeauSans Bold", size: 24, lh: 28 },
  { name: "Title / L", meta: "20 / 28 · BeauSans SemiBold", size: 20, lh: 28 },
  { name: "Title / M", meta: "18 / 26 · BeauSans SemiBold", size: 18, lh: 26 },
  { name: "Body / L", meta: "16 / 24 · Roboto Regular", size: 16, lh: 24, roboto: true },
  { name: "Body / M", meta: "14 / 20 · Roboto Regular", size: 14, lh: 20, roboto: true },
];

function Typography() {
  const tr = useT();
  /* The two family cards are the same height in Figma (no taller column beside them), so nothing follows the scroll here. */
  return (
    <section id="wd-typography" className={`${SECTION} ${sappRoboto.variable}`}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.6" title="Typography">
        Two families: FS PF BeauSans Pro gives headings, titles and metrics the Viettel voice; Roboto carries long Vietnamese body text and dense tables.
      </Head>

      {/* Row 279:14864 */}
      <div className="flex w-full items-stretch gap-5">
        <Reveal className="flex w-[770px] shrink-0">
          <div className="vb-spec wd-hover flex w-full flex-col items-start gap-2 rounded-[24px] bg-[#14141a] p-10">
            <p className="vb-aa text-[140px] leading-[1.15] font-bold whitespace-nowrap text-[#ee0033]">Aa</p>
            <p className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap text-white">FS PF BeauSans Pro</p>
            <p className="text-[18px] leading-7 font-semibold tracking-[-0.2px] whitespace-nowrap text-[#d1d5db]">{tr("Heading · Title · Metric")}</p>
            <p className="font-mono text-[14px] leading-5 whitespace-nowrap text-[#9ca3af]">{tr("Weights: Book · SemiBold · Bold")}</p>
            <p className="w-[690px] text-base leading-6 tracking-[-0.2px] whitespace-pre-wrap text-[#e5e7eb]">{ALPHABET}</p>
            <p className="w-[690px] text-[14px] leading-5 text-[#9ca3af]">{tr("Shown in a fallback face here — the library uses FS PF BeauSans Pro.")}</p>
          </div>
        </Reveal>
        <Reveal className="flex w-[770px] shrink-0">
          <div className={`vb-spec ${CARD} flex h-[413px] w-full flex-col items-start gap-2 p-10`}>
            <p className={`vb-aa text-[140px] leading-[1.15] font-bold whitespace-nowrap text-[#14141a] ${ROBOTO}`}>Aa</p>
            <p className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap text-[#14141a]">Roboto</p>
            <p className="text-[18px] leading-7 font-semibold tracking-[-0.2px] whitespace-nowrap text-[#4b5563]">{tr("Body · Label · Data")}</p>
            <p className="font-mono text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{tr("Weights: Regular · Medium · SemiBold · Bold")}</p>
            <p className={`w-[690px] text-base leading-[1.5] whitespace-pre-wrap text-[#374151] ${ROBOTO}`}>{ALPHABET}</p>
          </div>
        </Reveal>
      </div>

      {/* Type scale 279:14878 */}
      <Reveal className="w-full">
        <div className={`${CARD} flex w-full flex-col items-start p-10`}>
          <CardTitle>Type scale</CardTitle>
          <div className="h-3 w-px shrink-0" />
          {TYPE_SCALE.map((t) => (
            <Reveal key={t.name} enter={40} className="w-full">
              <div className="vb-type flex w-full items-center gap-6 py-4 whitespace-nowrap">
                <div className="relative flex w-[320px] shrink-0 flex-col items-start gap-0.5">
                  <p className="text-base leading-[1.5] font-semibold text-[#14141a]">{t.name}</p>
                  <p className="font-mono text-[14px] leading-5 text-[#6b7280]">{t.meta}</p>
                </div>
                <p
                  className={`vb-type-sample relative text-[#14141a] ${t.roboto ? `${ROBOTO} font-normal` : "font-bold"}`}
                  style={{ fontSize: t.size, lineHeight: `${t.lh}px` }}
                >
                  Đăng ký nghỉ phép năm T10/2026
                </p>
              </div>
            </Reveal>
          ))}
          <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{tr("Also: Body / S 12 and Body / XS 10 for dense data in product UI — never used on this page.")}</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ========================================================================== */
/* Spacing, layout & grid (Figma 279:14917)                                   */
/* ========================================================================== */

const SPACING: [string, string][] = [
  ["space/0.5", "2px"],
  ["space/1", "4px"],
  ["space/2", "8px"],
  ["space/3", "12px"],
  ["space/4", "16px"],
  ["space/5", "20px"],
  ["space/6", "24px"],
  ["space/8", "32px"],
  ["space/10", "40px"],
  ["space/12", "48px"],
  ["space/16", "64px"],
  ["space/20", "80px"],
];

const BREAKPOINTS: { name: string; range: string; cols: number; w: number; note?: string }[] = [
  { name: "Mobile", range: "320 – 767", cols: 4, w: 180, note: "4 columns · 16 margin" },
  { name: "Tablet", range: "768 – 1023", cols: 8, w: 320, note: "8 columns · 24 margin" },
  { name: "Laptop", range: "1024 – 1439", cols: 12, w: 440, note: "12 columns · 32 margin" },
  { name: "Desktop", range: "1440 – 1766", cols: 12, w: 540, note: "12 columns · 48 margin" },
  { name: "Full HD", range: "1767+", cols: 12, w: 600 },
];

function Spacing() {
  const t = useT();
  return (
    /* Figma 996 tall: 16px below the cards. */
    <section id="wd-spacing" className={`${SECTION} pb-4`}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.7" title="Spacing, layout & grid">
        An 8-point system with 12 steps, and a responsive grid across five breakpoints — from a 320px phone to a Full HD wall display.
      </Head>
      <div className="flex w-full items-stretch gap-5">
        {/* Spacing 279:14926 */}
        <Reveal className="flex w-[650px] shrink-0">
          <div className={`${CARD} flex w-full flex-col items-start gap-3 p-10`}>
            <CardTitle>Spacing scale</CardTitle>
            {SPACING.map(([name, px]) => (
              <Reveal key={name} enter={40}>
                <div className="vb-space flex items-center gap-3.5">
                  <div className="flex w-[150px] shrink-0 items-start">
                    <Token>{name}</Token>
                  </div>
                  <div className="flex w-14 shrink-0 items-start">
                    <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{px}</p>
                  </div>
                  <span className="vb-bar h-3.5 shrink-0 rounded-[4px] bg-[#ff859f]" style={{ width: parseFloat(px) * 4.2 }} />
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Breakpoints 279:15012 */}
        <Reveal className="flex min-w-px flex-1">
          <div className={`${CARD} flex w-full flex-col items-start gap-[18px] p-10`}>
            <CardTitle>{t("Breakpoints & columns")}</CardTitle>
            {BREAKPOINTS.map((b) => (
              <Fragment key={b.name}>
                <Reveal enter={40}>
                  <div className="vb-bp flex items-center gap-4">
                    <div className="flex w-[140px] shrink-0 flex-col items-start gap-0.5 whitespace-nowrap">
                      <p className="text-base leading-[1.5] font-semibold text-[#14141a]">{b.name}</p>
                      <p className="font-mono text-[14px] leading-5 text-[#6b7280]">{b.range}</p>
                    </div>
                    <div className="flex h-11 shrink-0 items-start gap-1 rounded-[8px] bg-[#fff4f6] px-2 py-1.5" style={{ width: b.w }}>
                      {Array.from({ length: b.cols }, (_, i) => (
                        <span key={i} className="vb-col h-8 min-w-px flex-1 rounded-[3px] bg-[#ff859f]" style={{ "--i": i } as CSSProperties} />
                      ))}
                    </div>
                  </div>
                </Reveal>
                {b.note ? <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{t(b.note)}</p> : null}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Elevation, radius & motion (Figma 279:15092)                               */
/* ========================================================================== */

/* Figma drop shadows (blur = 2 × the codegen drop-shadow radius), with a deeper hover state. */
const ELEVATION: { token: string; use: string; e: string; eh: string }[] = [
  { token: "shadow/level-1", use: "Card at rest", e: "0 2px 7px rgba(0,0,0,0.05)", eh: "0 8px 16px rgba(0,0,0,0.08)" },
  { token: "shadow/level-2", use: "Hover · dropdown", e: "0 4px 14px rgba(0,0,0,0.08)", eh: "0 12px 24px rgba(0,0,0,0.12)" },
  { token: "shadow/level-3", use: "Sticky header · popover", e: "0 6px 21px rgba(0,0,0,0.1)", eh: "0 16px 32px rgba(0,0,0,0.15)" },
  { token: "shadow/level-4", use: "Bottom sheet · drawer", e: "0 8px 28px rgba(0,0,0,0.13)", eh: "0 20px 40px rgba(0,0,0,0.18)" },
  { token: "shadow/level-5", use: "Modal · dialog", e: "0 10px 35px rgba(0,0,0,0.16)", eh: "0 24px 48px rgba(0,0,0,0.22)" },
];

/* [token, label, radius, hover radius] */
const RADII: [string, string, number, number][] = [
  ["radius/none", "0px", 0, 14],
  ["radius/xs", "4px", 4, 18],
  ["radius/sm", "8px", 8, 22],
  ["radius/md", "12px", 12, 26],
  ["radius/lg", "16px", 16, 30],
  ["radius/full", "9999", 38, 8],
];

const MOTION: { token: string; dur: string; ease: string; use: string; ms: number; css: string }[] = [
  { token: "motion/fast", dur: "100ms", ease: "ease-out", use: "Hover, toggle, checkbox", ms: 100, css: "ease-out" },
  { token: "motion/base", dur: "200ms", ease: "standard", use: "Dropdown, tooltip, tabs", ms: 200, css: "cubic-bezier(0.2, 0, 0, 1)" },
  { token: "motion/slow", dur: "300ms", ease: "emphasized", use: "Bottom sheet, drawer, modal", ms: 300, css: "cubic-bezier(0.3, 0, 0, 1.3)" },
  { token: "motion/stream", dur: "40ms / token", ease: "linear", use: "GenHub text streaming", ms: 480, css: "linear" },
];

function Elevation() {
  const t = useT();
  return (
    <section id="wd-elevation" className={SECTION}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.8" title="Elevation, radius & motion">
        Depth is used sparingly — five shadow levels mapped to purpose — and motion is being standardised as tokens.
      </Head>

      {/* Elevation levels 279:15100 */}
      <div className="flex w-full items-stretch gap-5">
        {ELEVATION.map((e) => (
          <Reveal key={e.token} className="flex w-[296px] shrink-0">
            <div
              className="vb-elev flex h-[110px] w-full flex-col items-start justify-end gap-1.5 rounded-[20px] bg-white p-6"
              style={{ "--e": e.e, "--e-hover": e.eh } as CSSProperties}
            >
              <Token>{e.token}</Token>
              <p className="text-base leading-[1.5] font-semibold whitespace-nowrap text-[#14141a]">{t(e.use)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="flex w-full items-stretch gap-5">
        {/* Radius 279:15122 */}
        <Reveal className="flex w-[770px] shrink-0">
          <div className={`${CARD} flex w-full flex-col items-start gap-[18px] p-10`}>
            <CardTitle>Radius</CardTitle>
            <div className="flex items-end gap-[22px]">
              {RADII.map(([name, label, r, rh]) => (
                <Reveal key={name} enter={40}>
                  <div className="vb-radius-item flex flex-col items-center gap-2">
                    <span className="vb-radius size-[76px] shrink-0 bg-[#fed7df]" style={{ "--r": `${r}px`, "--r-hover": `${rh}px` } as CSSProperties} />
                    <Token>{name}</Token>
                    <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Motion 279:15155 */}
        <Reveal className="flex w-[770px] shrink-0">
          <div className={`${CARD} flex w-full flex-col items-start gap-3.5 p-10`}>
            <CardTitle>Motion · being standardised</CardTitle>
            {MOTION.map((m) => (
              <Reveal key={m.token} enter={40}>
                {/* Hover plays the row's own duration and easing. */}
                <div className="vb-motion flex items-center gap-3.5" style={{ "--d": `${m.ms}ms`, "--ease": m.css } as CSSProperties}>
                  <div className="flex w-[170px] shrink-0 items-start">
                    <Token>{m.token}</Token>
                  </div>
                  <div className="flex w-[120px] shrink-0 items-start">
                    <p className="text-base leading-[1.5] font-semibold whitespace-nowrap text-[#14141a]">{t(m.dur)}</p>
                  </div>
                  <div className="flex w-[110px] shrink-0 items-start">
                    <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{m.ease}</p>
                  </div>
                  <p className="text-base leading-6 tracking-[-0.2px] whitespace-nowrap text-[#4b5563]">{t(m.use)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */

export function VopsSystemB() {
  return (
    <>
      <SystemArchitecture />
      <TokenArchitecture />
      <Colour />
      <Typography />
      <Spacing />
      <Elevation />
    </>
  );
}
