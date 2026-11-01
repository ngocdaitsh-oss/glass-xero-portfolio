"use client";

import "./vops-system-b.css";
import { type CSSProperties, type ReactNode } from "react";
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

function Sticker({ children, tone = "mint", className = "" }: { children: ReactNode; tone?: "mint" | "orange" | "blue" | "pink"; className?: string }) {
  const tones = { mint: "bg-[#7be0d2] text-[#134f4a]", orange: "bg-[#ffb34f] text-[#684100]", blue: "bg-[#586ee8] text-white", pink: "bg-[#ed46cd] text-white" };
  return <span className={`vb-sticker absolute z-10 rounded-[10px] px-5 py-2 text-[18px] leading-6 font-semibold shadow-[0_8px_18px_rgba(15,23,41,.16)] ${tones[tone]} ${className}`}>{children}</span>;
}

function SelectionFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`vb-selection relative ${className}`}>{children}</div>;
}

function VariableTable({ title, rows, width = 520 }: { title: string; rows: [string, string][]; width?: number }) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(26,33,77,.08)]" style={{ width }}>
      <div className="flex items-center gap-3 px-6 py-4">
        <p className="text-[18px] font-semibold text-[#14182b]">{title}</p>
        <div className="min-w-0 flex-1 rounded-[8px] bg-[#f3f4f6] px-3 py-2 text-[14px] text-[#9aa0a8]">Search</div>
      </div>
      <div className="grid grid-cols-[1fr_128px] border-y border-[#ecedf2] px-6 py-4 text-[16px] font-semibold text-[#14182b]"><span>Name</span><span>Value</span></div>
      {rows.map(([name, value]) => (
        <div key={name} className="grid grid-cols-[1fr_128px] items-center border-b border-[#ecedf2] px-6 py-[13px]">
          <div className="flex items-center gap-2.5"><span className="rounded-[5px] bg-[#eef0f8] px-1.5 py-0.5 font-mono text-[13px] text-[#4a5578]">#</span><span className="font-mono text-[15px] text-[#14182b]">{name}</span></div>
          <span className="text-[16px] text-[#14182b]">{value}</span>
        </div>
      ))}
      <p className="px-6 py-3 text-[15px] text-[#374151]">＋ Create variable</p>
    </div>
  );
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

const COLLECTIONS: [string, string, string, string][] = [
  ["_🎨 Tokens/Colors", "158", "—", "Primitive palette (hidden from publishing)"],
  ["🌮 Color", "302", "Light · Dark", "Semantic colour by intent"],
  ["🌮 Component Color", "376", "Light · Dark", "Component-scoped colour"],
  ["🌮 Spacing", "28", "—", "Spacing, padding and radius scale"],
  ["🌮 Typography", "68", "—", "Family, size, line-height, weight"],
  ["🌮 Responsive", "3", "5 breakpoints", "Layout values from 320 to 1767+"],
];
const COL_W = [340, 140, 300, 700];

const WIRING_COLUMNS = [
  { eyebrow: "TIER 1 · PRIMITIVE", title: "_🎨 Tokens/Colors", chip: "158 values", desc: "The raw palette: 13 colour ramps. Never bound directly in UI.", x: 44, w: 300 },
  { eyebrow: "TIER 2 · SEMANTIC", title: "🌮 Color — Light / Dark", chip: "302 tokens", desc: "Named by intent: text, icon, border, background, interaction, chart.", x: 440, w: 340 },
  { eyebrow: "TIER 3 · COMPONENT", title: "🌮 Component Color", chip: "376 tokens", desc: "Scoped to one component, so state changes never leak elsewhere.", x: 880, w: 300 },
  { eyebrow: "RENDERED", title: "In the product", desc: "Every wire ends in a component state a user actually sees.", x: 1244, w: 272 },
];

const PRIMITIVE_TOKENS = [
  ["Red/Primary", "#ee0033"], ["Red-600", "#c80029"], ["Gray-900", "#2c2f32"], ["GreenLeaf-500", "#75c044"], ["Blue-Info", "#2d96ff"],
] as const;
const SEMANTIC_TOKENS = ["Color/text/default", "Color/border/focused", "Color/background/primary/bold", "Color/background/success/bold", "Color/interaction/hovered"];
const COMPONENT_TOKENS = ["button/primary/bg", "input/border/focused", "tag/success/bg", "table/row/hovered", "toast/info/bg"];

function WireToken({ children, x, y, color }: { children: ReactNode; x: number; y: number; color?: string }) {
  return (
    <div className="vb-wire-token absolute z-[2] flex items-center gap-2 rounded-[10px] bg-[#262b42] px-3 py-2 font-mono text-[14px] leading-5 text-[#e6e9f5]" style={{ left: x, top: y }}>
      {color ? <span className="size-5 shrink-0 rounded-[6px]" style={{ background: color }} /> : null}{children}
    </div>
  );
}

function TokenWiringBoard() {
  const t = useT();
  return (
    <Reveal className="w-full">
      <div className="vb-wireboard relative h-[660px] w-full overflow-hidden rounded-[32px] bg-[linear-gradient(132deg,#22222c_7%,#24242d_90%)]">
        {WIRING_COLUMNS.map((c) => (
          <div key={c.eyebrow} className="absolute top-11" style={{ left: c.x, width: c.w }}>
            <p className="font-mono text-[14px] leading-[18px] text-[#ff859f]">{c.eyebrow}</p>
            <p className="mt-2 text-[24px] leading-[33px] font-semibold text-white">{c.title}</p>
            {c.chip ? <span className="mt-3 inline-flex rounded-[10px] bg-[#ee0033] px-3 py-2 font-mono text-[14px] leading-[18px] text-white">{c.chip}</span> : null}
            <p className="mt-4 text-[16px] leading-[22px] text-[#b8bdd2]">{t(c.desc)}</p>
          </div>
        ))}

        <svg className="pointer-events-none absolute inset-0 z-[1] size-full" viewBox="0 0 1560 660" fill="none" aria-hidden>
          <path d="M184 322 C300 322 322 446 440 446" stroke="#ee0033" strokeWidth="2" />
          <path d="M151 384 C270 384 320 384 440 384" stroke="#ff85a0" strokeWidth="2" />
          <path d="M160 446 C292 446 310 322 440 322" stroke="#f8f8fb" strokeWidth="2" />
          <path d="M160 446 C300 446 306 570 440 570" stroke="#f8f8fb" strokeWidth="2" />
          <path d="M202 508 C310 508 332 508 440 508" stroke="#75c044" strokeWidth="2" />
          <path d="M708 446 C790 446 800 322 880 322" stroke="#ee0033" strokeWidth="2" />
          <path d="M632 384 C735 384 770 384 880 384" stroke="#ff85a0" strokeWidth="2" />
          <path d="M708 508 C790 508 800 446 880 446" stroke="#75c044" strokeWidth="2" />
          <path d="M674 570 C770 570 790 508 880 508" stroke="#f8f8fb" strokeWidth="2" />
          <path d="M1047 322 H1244" stroke="#ee0033" strokeWidth="2" /><path d="M1052 384 H1244" stroke="#ff85a0" strokeWidth="2" />
          <path d="M1022 446 H1244" stroke="#75c044" strokeWidth="2" /><path d="M1032 508 H1244" stroke="#f8f8fb" strokeWidth="2" />
          <path d="M998 570 H1244" stroke="#2d96ff" strokeWidth="2" />
          {[[440,322,"#9aa0a8"],[440,384,"#ff85a0"],[440,446,"#ee0033"],[440,508,"#75c044"],[440,570,"#fff"],[880,322,"#ee0033"],[880,384,"#ff85a0"],[880,446,"#75c044"],[880,508,"#fff"],[1244,322,"#ee0033"],[1244,384,"#ff85a0"],[1244,446,"#75c044"],[1244,508,"#fff"],[1244,570,"#2d96ff"]].map(([cx,cy,fill],i)=><circle key={i} cx={cx} cy={cy} r="5" fill={String(fill)} />)}
        </svg>

        {PRIMITIVE_TOKENS.map(([name, color], i) => <WireToken key={name} x={44} y={304 + i * 62} color={color}>{name}</WireToken>)}
        {SEMANTIC_TOKENS.map((name, i) => <WireToken key={name} x={440} y={304 + i * 62}>{name}</WireToken>)}
        {COMPONENT_TOKENS.map((name, i) => <WireToken key={name} x={880} y={304 + i * 62}>{name}</WireToken>)}

        <div className="absolute left-[1244px] top-[304px] z-[2] flex h-9 w-[120px] items-center justify-center rounded-[10px] bg-[#ee0033] text-[14px] font-semibold text-white">Button</div>
        <div className="absolute left-[1244px] top-[366px] z-[2] h-9 w-[220px] rounded-[9px] border-2 border-[#ee0033] bg-white px-3 py-2 text-[14px] text-[#9aa0a8]">Tìm đồng nghiệp...</div>
        <div className="absolute left-[1244px] top-[428px] z-[2] rounded-full bg-[#31572b] px-4 py-2 text-[14px] font-semibold text-[#9be35d]">Approved</div>
        <div className="absolute left-[1244px] top-[490px] z-[2] w-[272px] rounded-[8px] bg-[#494f69] px-3 py-2 text-[14px] text-[#f5f6fa]">Đơn nghỉ phép T10</div>
        <div className="absolute left-[1244px] top-[552px] z-[2] w-[272px] rounded-[8px] bg-[#284d73] px-3 py-2 text-[14px] text-[#bcd8f5]">GenHub đã có bản tóm tắt</div>
      </div>
    </Reveal>
  );
}

function TokenArchitecture() {
  const tr = useT();
  return (
    <section id="wd-tokens" className={SECTION}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.4" title="Token architecture">
        Three tiers of Figma variables. Products never touch primitives — they speak in semantic and component tokens, so Light/Dark and future rebrands are a mode switch, not a redesign.
      </Head>

      <TokenWiringBoard />

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
    <section id="wd-colour" className={SECTION} style={{ height: 1922 }}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.5" title="Colors">
        Viettel red leads, with ten accent ramps for charts and categories, and four semantic sets — every colour defined for Light and Dark.
      </Head>

      {/* Palette 278:15270 */}
      <SelectionFrame className="w-full">
        <Sticker className="-top-6 left-6 -rotate-2">Base colors</Sticker>
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
      </SelectionFrame>

      <div className="relative flex h-[72px] w-full items-center justify-center">
        <span className="h-full w-px bg-[#586ee8]" /><Sticker tone="blue" className="top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 text-[14px]">Alias</Sticker>
      </div>

      {/* Semantic sets 278:15535 */}
      <SelectionFrame className="w-full">
        <Sticker tone="blue" className="-top-7 right-6 rotate-2">Semantic colors</Sticker>
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
      </SelectionFrame>

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

const FONT_WEIGHTS = [
  ["Book", "BeauSans", "font-normal"], ["SemiBold", "BeauSans", "font-semibold"], ["Bold", "BeauSans", "font-bold"],
  ["Regular", "Roboto", `${ROBOTO} font-normal`], ["Medium", "Roboto", `${ROBOTO} font-medium`], ["SemiBold", "Roboto", `${ROBOTO} font-semibold`], ["Bold", "Roboto", `${ROBOTO} font-bold`],
] as const;

function Typography() {
  const tr = useT();
  /* The two family cards are the same height in Figma (no taller column beside them), so nothing follows the scroll here. */
  return (
    <section id="wd-typography" className={`${SECTION} ${sappRoboto.variable}`}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.6" title="Typography">
        Two families: FS PF BeauSans Pro gives headings, titles and metrics the Viettel voice; Roboto carries long Vietnamese body text and dense tables.
      </Head>

      {/* Row 279:14864 */}
      <div className="relative flex w-full items-stretch gap-5">
        <Sticker tone="orange" className="-top-5 left-6 rotate-2">BeauSans × Roboto</Sticker>
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

      <div className="relative flex w-full items-stretch gap-4">
        <Sticker className="-top-6 right-6 -rotate-2">Font weights</Sticker>
        {FONT_WEIGHTS.map(([name, family, weight], i) => (
          <Reveal key={`${family}-${name}`} enter={40} className="min-w-0 flex-1">
            <div className="flex h-[152px] flex-col items-center justify-center gap-1 rounded-[20px] bg-white shadow-[0_12px_32px_rgba(26,33,77,.06)]">
              <p className={`text-[44px] leading-[50px] text-[#14182b] ${weight}`}>Aa</p>
              <p className={`text-[16px] text-[#374151] ${i === 4 ? "font-medium" : i > 0 && i !== 3 ? "font-semibold" : ""}`}>{name}</p>
              <p className="font-mono text-[14px] text-[#6f767e]">{family}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Type scale 279:14878 */}
      <Reveal className="w-full">
        <div className={`${CARD} relative flex h-[690px] w-full flex-col items-start p-10`}>
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
          <div className="absolute top-8 right-8 h-[338px] w-[460px] overflow-hidden rounded-[20px] bg-white shadow-[0_12px_32px_rgba(26,33,77,.09)]">
            <div className="grid h-[50px] grid-cols-[248px_88px_84px] items-center px-5 text-[14px] font-semibold text-[#14182b]"><span>Style</span><span>Size</span><span>Line</span></div>
            {TYPE_SCALE.map((row, i) => <div key={row.name} className={`grid h-10 grid-cols-[248px_88px_84px] items-center px-5 text-[14px] ${i % 2 ? "bg-[#f5f6fa]" : ""}`}><span>{row.name}</span><span>{row.size}px</span><span>{row.lh}px</span></div>)}
          </div>
          {/* Exact transparent DS/Cursor Tag instance from Figma 726:28448. */}
          <div className="pointer-events-none absolute top-[326px] left-[948px] h-16 w-[150px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={`${ASSET}/cursor-pointer.svg`} className="absolute top-0 left-0 h-[26px] w-6" />
            <div className="absolute top-6 left-[22px] flex items-start overflow-hidden rounded-lg bg-[#ec4fd0] px-3 py-1.5">
              <p className="text-[16px] leading-[normal] font-semibold whitespace-nowrap text-white">Tuan Ngoc</p>
            </div>
          </div>
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

const GRID_SPECS = [
  { name: "Desktop", range: "1440 – 1766", cols: 12, margin: 48 },
  { name: "Laptop", range: "1024 – 1439", cols: 12, margin: 32 },
  { name: "Full HD", range: "1767+", cols: 12, margin: 32 },
  { name: "Tablet", range: "768 – 1023", cols: 8, margin: 24 },
  { name: "Mobile", range: "320 – 767", cols: 4, margin: 16 },
] as const;

function DeviceIcon({ mobile = false }: { mobile?: boolean }) {
  return <span className={`inline-block border-[3px] border-[#1d2439] ${mobile ? "h-8 w-5 rounded-[5px]" : "h-5 w-7 rounded-[4px]"}`} />;
}

function GridBars({ cols, margin, height = 90 }: { cols: number; margin: number; height?: number }) {
  return (
    <div className="flex w-full gap-2 rounded-[12px] bg-[#f1f2f6]" style={{ height, paddingLeft: margin, paddingRight: margin }}>
      {Array.from({ length: cols }, (_, i) => <span key={i} className="vb-col h-full min-w-0 flex-1 bg-[#ffd5de]" style={{ "--i": i } as CSSProperties} />)}
    </div>
  );
}

function GridCard({ spec, large = false }: { spec: (typeof GRID_SPECS)[number]; large?: boolean }) {
  return (
    <Reveal className="min-w-0 flex-1">
      <div className={`${CARD} flex h-full flex-col gap-5 p-7`}>
        <div className="flex items-start justify-between">
          <div><div className="flex items-center gap-3"><DeviceIcon /><p className="text-[24px] font-semibold text-[#1d2439]">{spec.name}</p></div><p className="mt-1 text-[16px] text-[#7d8491]">{spec.range} · {spec.cols} columns{spec.name !== "Full HD" ? ` · ${spec.margin} margin` : ""}</p></div>
          {large ? <p className="font-mono text-[14px] text-[#7d8491]">{spec.range}</p> : null}
        </div>
        <GridBars cols={spec.cols} margin={spec.margin} height={large ? 190 : 90} />
      </div>
    </Reveal>
  );
}

function DeviceGrid({ spec, width }: { spec: (typeof GRID_SPECS)[number]; width: number }) {
  const mobile = spec.name === "Mobile";
  return (
    <Reveal className="shrink-0" enter={50}>
      <div style={{ width }}>
        <div className="mb-4 flex items-center gap-3"><DeviceIcon mobile={mobile} /><div><p className="text-[24px] font-semibold text-[#1d2439]">{spec.name}</p><p className="text-[16px] text-[#7d8491]">{spec.range} · {spec.cols} columns · {spec.margin} margin</p></div></div>
        <div className="relative h-[510px] overflow-hidden rounded-t-[46px] border-x-[18px] border-t-[18px] border-[#c9cdd6] bg-white p-0">
          <GridBars cols={spec.cols} margin={spec.margin} height={492} />
          <div className="absolute top-8 left-1/2 w-[245px] -translate-x-1/2 rounded-[16px] bg-white p-5 shadow-[0_10px_25px_rgba(26,33,77,.12)]">
            <p className="mb-3 font-semibold text-[#1d2439]">Columns</p>{[["Count", spec.cols], ["Margin", spec.margin], ["Range", spec.range]].map(([k,v])=><div key={k} className="flex justify-between py-1 text-[14px]"><span className="text-[#8a919e]">{k}</span><span className="rounded bg-[#f3f4f6] px-2 font-mono text-[#3c4352]">{v}</span></div>)}
          </div>
          <span className="absolute right-5 bottom-5 rounded-[10px] bg-white px-4 py-2 text-[14px] text-[#4b5563] shadow-[0_6px_16px_rgba(26,33,77,.1)]">{spec.name} — {spec.cols} Columns</span>
        </div>
      </div>
    </Reveal>
  );
}

function SpacingTokens() {
  return (
    <SelectionFrame className="grid flex-1 grid-cols-4 gap-4 p-6">
      <Sticker tone="blue" className="-top-7 right-8 rotate-2">Spacing tokens</Sticker>
      {SPACING.map(([name, px]) => {
        const value = parseFloat(px);
        return <div key={name} className="flex flex-col gap-2"><Token className="!bg-[#eef1fb] !text-[#526083]">--{name}</Token><div className="relative h-[124px] overflow-hidden rounded-[8px] bg-white shadow-[0_8px_24px_rgba(26,33,77,.06)]"><span className="absolute inset-y-0 left-0 bg-[#ff7d9c]" style={{ width: Math.max(2, value) }} /><span className="absolute right-3 bottom-3 font-mono text-[13px] text-[#7d8491]">{px}</span></div></div>;
      })}
    </SelectionFrame>
  );
}

function Spacing() {
  return (
    <section id="wd-spacing" className={SECTION} style={{ height: 2565 }}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.7" title="Spacing, layout & grid">
        An 8-point system with 12 steps, and a responsive grid across five breakpoints — from a 320px phone to a Full HD wall display.
      </Head>
      <div className="flex w-full flex-col gap-14">
        <CardTitle>Breakpoints & columns</CardTitle>
        <div className="flex h-[300px] w-full"><GridCard spec={GRID_SPECS[0]} large /></div>
        <div className="flex h-[220px] w-full gap-6"><GridCard spec={GRID_SPECS[1]} /><GridCard spec={GRID_SPECS[2]} /></div>
        <div className="flex w-full items-end justify-between gap-14"><DeviceGrid spec={GRID_SPECS[3]} width={900} /><DeviceGrid spec={GRID_SPECS[4]} width={610} /></div>
        <div className="flex w-full items-start gap-6">
          <div className="relative shrink-0"><Sticker tone="orange" className="-top-7 -left-4 -rotate-6">Figma variable</Sticker><VariableTable title="Spacing scale" width={600} rows={SPACING.map(([name, value]) => [name, value.replace("px", "")])} /></div>
          <SpacingTokens />
        </div>
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
    <section id="wd-elevation" className={SECTION} style={{ height: 1498 }}>
      <Head eyebrow="DESIGN SYSTEM  ·  02.8" title="Elevation, radius & motion">
        Depth is used sparingly — five shadow levels mapped to purpose — and motion is being standardised as tokens.
      </Head>

      {/* Elevation levels 279:15100 */}
      <div className="flex h-[222px] w-full gap-5">
        <div className="grid min-w-0 flex-1 grid-cols-5 gap-4">
          {ELEVATION.map((e) => (
            <Reveal key={e.token} className="min-w-0">
              <div className="flex h-full flex-col items-center justify-end gap-3 rounded-[20px] bg-white p-7" style={{ boxShadow: "0 10px 30px rgba(26,33,77,.08)" }}>
                <span className="vb-elev size-[84px] rounded-[16px] bg-white" style={{ "--e": e.e, "--e-hover": e.eh, boxShadow: e.e } as CSSProperties} />
                <Token>{e.token}</Token>
                <p className="text-center text-base font-semibold whitespace-nowrap text-[#14141a]">{t(e.use)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex w-[300px] shrink-0 flex-col gap-3 rounded-[20px] bg-white p-5 shadow-[0_10px_30px_rgba(26,33,77,.08)]">
          <p className="text-[16px] font-semibold text-[#14182b]">Drop shadow · level-3</p>
          {[["Y","6"],["Blur","21"],["Spread","0"],["Colour","Black · 10%"]].map(([k,v])=><div key={k} className="flex items-center justify-between text-[14px]"><span className="text-[#8a919e]">{k}</span><span className="rounded-[8px] bg-[#f3f4f6] px-2.5 py-1 font-mono text-[#3c4352]">{v}</span></div>)}
        </div>
      </div>

      <div className="flex h-[560px] w-full items-end gap-8">
        <div className="relative shrink-0"><Sticker tone="orange" className="-top-7 -left-4 -rotate-3">Figma variable</Sticker><VariableTable title="Radius" width={640} rows={RADII.map(([name, label]) => [name, label.replace("px", "")])} /></div>
        <SelectionFrame className="grid h-[507px] min-w-0 flex-1 grid-cols-3 gap-6 p-7">
          <Sticker tone="blue" className="-top-7 left-1/2 -translate-x-1/2 rotate-2">Radius tokens</Sticker>
          {RADII.map(([name, label, r, rh]) => (
            <Reveal key={name} enter={40}>
              <div className="vb-radius-item flex h-full flex-col gap-3"><Token className="!bg-[#eef1fb] !text-[#526083]">--{name}</Token><span className="vb-radius min-h-0 flex-1 border-t-2 border-r-2 border-[#7f8eba] bg-[#eef0f8]" style={{ "--r": `${r}px`, "--r-hover": `${rh}px`, borderTopRightRadius: r === 38 ? 120 : r } as CSSProperties} /><p className="self-end rounded bg-white px-3 py-1 font-mono text-[13px] text-[#596171] shadow-sm">{label}</p></div>
            </Reveal>
          ))}
        </SelectionFrame>
      </div>

      <Reveal className="w-full">
        <div className={`${CARD} flex w-full flex-col items-start gap-3.5 p-10`}>
          <CardTitle>Motion · being standardised</CardTitle>
          {MOTION.map((m) => (
            <Reveal key={m.token} enter={40}>
              <div className="vb-motion flex items-center gap-3.5" style={{ "--d": `${m.ms}ms`, "--ease": m.css } as CSSProperties}>
                <div className="flex w-[170px] shrink-0 items-start"><Token>{m.token}</Token></div>
                <div className="flex w-[120px] shrink-0 items-start"><p className="text-base font-semibold whitespace-nowrap text-[#14141a]">{t(m.dur)}</p></div>
                <div className="flex w-[110px] shrink-0 items-start"><p className="text-[14px] whitespace-nowrap text-[#6b7280]">{m.ease}</p></div>
                <p className="text-base tracking-[-0.2px] whitespace-nowrap text-[#4b5563]">{t(m.use)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
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
