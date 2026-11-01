"use client";

import "./system.css";
import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";
import { useStickyCopy } from "@/lib/sticky";
import { useT } from "@/lib/i18n";
import { sappBeVietnam, sappJakarta, sappRoboto } from "./fonts";
import { Reveal } from "../../reveal";
import { SappHeading } from "./parts";
import { SappDsCursorTag, SappDsSticker, SappSelectionOutline } from "./decor";

/* Fonts used only inside the LMS design-system specimens (Figma: Roboto, Plus Jakarta Sans, Be Vietnam). */
const roboto = sappRoboto;
const jakarta = sappJakarta;
const beVietnam = sappBeVietnam;

const FONT_VARS = `${roboto.variable} ${jakarta.variable} ${beVietnam.variable}`;
const ROBOTO = "font-[family-name:var(--font-sapp-roboto)]";
const BEVN = "font-[family-name:var(--font-sapp-bvp)]";
const ASSET = "/figma/sapp/system";

/* Shared pieces ------------------------------------------------------------ */

/** Eyebrow pill with the accent (#3D6FE8) dot used by the 02.x sections. */
function Eyebrow({ label }: { label: string }) {
  return (
    <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <span className="size-[7px] shrink-0 rounded-full bg-[var(--cmd-accent)]" />
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{label}</span>
    </span>
  );
}

function BlockHead({ title, children, tone = "primary" }: { title: string; children: ReactNode; tone?: "primary" | "subtle" }) {
  const t = useT();
  return (
    <div className="flex flex-col items-start gap-2.5">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap text-[#0a0a0a]">{t(title)}</h3>
      <p className={`w-[820px] text-base leading-6 tracking-[-0.2px] ${tone === "primary" ? "text-[var(--cmd-text-primary)]" : "text-[#4b5563]"}`}>{children}</p>
    </div>
  );
}

const CARD = "wd-hover rounded-[24px] bg-[var(--cmd-surface-1)] shadow-[var(--sapp-card-soft)]";

function Chip({ children, dark = false, grey = false }: { children: ReactNode; dark?: boolean; grey?: boolean }) {
  const tone = dark ? "bg-[#404041] text-white" : grey ? "bg-[#f6f6f6] text-[#374151]" : "bg-[#fff1cc] text-[#664a00]";
  return <span className={`sys-chip flex shrink-0 rounded-full px-3 py-1.5 text-[12px] leading-[18px] font-semibold whitespace-nowrap ${tone}`}>{children}</span>;
}

/** Swatch + mono token label (Token architecture rows). */
function TokenRow({ color, name }: { color: string; name: string }) {
  return (
    <div className="sys-tok flex items-center gap-2.5">
      <span className="sys-tok-sw size-6 shrink-0 rounded-[6px]" style={{ background: color }} />
      <span className="sys-tok-label rounded-[6px] bg-[#f6f6f6] px-2.5 py-[5px] font-mono text-[14px] leading-[22px] whitespace-nowrap text-[#374151]">{name}</span>
    </div>
  );
}

/* ========================================================================== */
/* Design system (Figma 247:14911)                                            */
/* ========================================================================== */

const FACTS = [
  { n: "5", label: "Variable collections" },
  { n: "167", label: "Colour tokens" },
  { n: "45", label: "Text styles" },
  { n: "46", label: "Components" },
];

const LAYERS = [
  {
    title: "Design language",
    icon: "icon-palette.svg",
    desc: "Foundations every component reads from — published as variables and styles.",
    chips: ["Colors", "Typography", "Spacing", "Border radius", "Effects", "Layout", "Iconography", "Cursor"],
  },
  {
    title: "Components · 46",
    icon: "icon-component.svg",
    desc: "Generic UI plus learning-specific parts, each with variants and documented props.",
    chips: ["Buttons", "Input", "Dropdown", "Date picker", "Calendar", "Modal", "Drawer", "Tab", "Tag", "Tooltip", "Card (course)", "Question type", "Progress", "Note Taker", "40+"],
  },
  {
    title: "Product modules",
    icon: "icon-graduation-cap.svg",
    desc: "Where the system meets real flows — each module has wireframes, hi-fi and its own parts.",
    chips: ["Exam", "Storyline", "Dashboard", "Note Taker"],
    dark: true,
  },
];

type Tier = { eyebrow: string; title: string; chip: string; desc: string; tokens: [string, string][]; inline?: boolean };

const TIERS: Tier[] = [
  {
    eyebrow: "TIER 1 · PRIMITIVE",
    title: "⚠️ Primative Color",
    chip: "68 raw values",
    inline: true,
    desc: "Brand, neutral, state, progress and divider ramps. Marked ⚠️ — never bound in screens.",
    tokens: [
      ["#ffb700", "Primary-500"],
      ["#29353c", "Secondary-600"],
      ["#f6f6f6", "Neutral-100"],
      ["#10b367", "Success-500"],
      ["#f80903", "Error-500"],
      ["#22aaff", "Info-500"],
    ],
  },
  {
    eyebrow: "TIER 2 · SEMANTIC",
    title: "Text · Background · Border · Icon",
    chip: "~80 intent tokens",
    desc: "Named by what they do, so designers pick by meaning instead of by colour.",
    tokens: [
      ["#1f2937", "Text/Default"],
      ["#4b5563", "Text/Subtle"],
      ["#ffb700", "Background/Brand/Default"],
      ["#fff1cc", "Background/Selected/Default"],
      ["#ffb700", "Border/Focused"],
      ["#22aaff", "Link/Default"],
    ],
  },
  {
    eyebrow: "TIER 3 · COMPONENT",
    title: "Component tokens",
    chip: "~20 scoped tokens",
    desc: "Owned by a single component — state changes never leak into other UI.",
    tokens: [
      ["#29353c", "Button/Primary/default"],
      ["#404041", "Button/Primary/hover"],
      ["#f6f6f6", "Button/Primary/disable"],
      ["#f80903", "Button/Alert/default"],
      ["#ffb700", "Icon button/active"],
      ["#e7fcf2", "Status tag/Success-50"],
    ],
  },
];

export function SappDesignSystem() {
  const t = useT();
  return (
    <section id="wd-system" className={`sys-ease ${FONT_VARS} relative flex w-full flex-col items-start gap-12 px-[236px] pt-[100px]`}>
      {/* Head 247:14912 */}
      <Reveal className="w-full">
        <div className="flex w-full flex-col items-start gap-[22px]">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow label={t("FINAL DESIGN  ·  02.3")} />
            <SappHeading>{t("Design system")}</SappHeading>
          </div>
          <p className="w-[760px] text-base leading-6 text-[var(--cmd-text-primary)]">
            {t("After defining the main flows, I applied the LMS Pro design system to every high-fidelity screen — keeping layout, spacing, typography, colours, components and interaction states consistent, and making the product easier to scale, review and hand off.")}
          </p>
          <div className={`flex w-full flex-col items-start gap-4 ${BEVN} text-[#1b1b1b]`}>
            <p className="text-[20px] leading-[1.5] font-bold whitespace-nowrap">{t("Full Design System")}</p>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-base leading-[1.5]">{t("You can checkout my full design system in this link:")}</p>
              <a
                href="https://www.figma.com/design/V7pBZ07ZggB1CTikT6lZhb/LMS-Design-System--Final-?node-id=414-16875&p=f&t=hAiICTXZ9nVMO44d-0"
                target="_blank"
                rel="noreferrer"
                className="sys-tok group flex items-center gap-1"
              >
                <span className="relative size-6 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={`${ASSET}/figma.svg`} className="absolute top-[7.81%] left-[21.88%] block h-[84.38%] w-[56.24%] max-w-none" />
                </span>
                <span className="text-base leading-[1.5] font-bold whitespace-nowrap text-[#007ce2] underline decoration-from-font underline-offset-2">LMS Design System</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* System facts 247:14926 */}
      <div className="flex w-full items-start gap-5">
        {FACTS.map((f) => (
          <Reveal key={f.label} className="min-w-px flex-1">
            <div className={`${CARD} flex flex-col items-start gap-1.5 p-7 whitespace-nowrap`}>
              <p className="text-[48px] leading-[52px] font-semibold tracking-[-1.44px] text-[var(--cmd-text-primary)]">{f.n}</p>
              <p className="text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-muted)]">{t(f.label)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* How the system is organised 248:15806 */}
      <div className="flex w-full flex-col items-start gap-7">
        <Reveal>
          <BlockHead title="How the system is organised">
            {t("The Figma library mirrors how LMS Pro is built: a design language at the base, 46 components in the middle, and product modules that compose them into real learning screens.")}
          </BlockHead>
        </Reveal>
        <div className="sys-row flex w-full items-stretch">
          {LAYERS.map((l, i) => (
            <Fragment key={l.title}>
              {i > 0 ? (
                <div className="flex w-[46px] shrink-0 items-center justify-center self-center">
                  <span className="sys-arrow text-[24px] leading-8 font-semibold tracking-[-0.7px] text-[#ffb700]">→</span>
                </div>
              ) : null}
              <Reveal className="flex w-[436px] shrink-0">
                <div
                  className={`wd-hover flex w-full flex-col items-start gap-[18px] rounded-[24px] p-8 shadow-[var(--sapp-card-soft)] ${l.dark ? "bg-[#29353c]" : "bg-[var(--cmd-surface-1)]"}`}
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" src={`${ASSET}/${l.icon}`} className="size-8 shrink-0" />
                    <p className={`text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap ${l.dark ? "text-white" : "text-[#0a0a0a]"}`}>{t(l.title)}</p>
                  </div>
                  <p className={`w-[372px] text-[14px] leading-5 ${l.dark ? "text-[#d1d5db]" : "text-[#4b5563]"}`}>{t(l.desc)}</p>
                  <div className="flex w-[372px] flex-wrap content-start items-start gap-2">
                    {l.chips.map((c) => (
                      <Chip key={c} dark={l.dark}>
                        {c}
                      </Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Token architecture 248:15896 */}
      <div className="flex w-full flex-col items-start gap-7">
        <Reveal>
          <BlockHead title="Token architecture">
            {t("Colours are layered in three tiers. Primitives are flagged ⚠️ so nobody binds them directly; screens use semantic tokens, and components get their own scoped tokens — so a brand or state change happens in one place.")}
          </BlockHead>
        </Reveal>
        <div className="sys-row flex w-full items-stretch">
          {TIERS.map((tier, i) => (
            <Fragment key={tier.eyebrow}>
              {i > 0 ? (
                <div className="relative h-10 w-20 shrink-0 self-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={`${ASSET}/arrow.svg`} className="sys-arrow absolute inset-0 block size-full max-w-none" />
                </div>
              ) : null}
              <Reveal className="flex min-w-px flex-1">
                <div className={`${CARD} flex w-full flex-col items-start gap-4 p-8`}>
                  <p className="font-mono text-[14px] leading-[22px] whitespace-nowrap text-[var(--cmd-text-secondary)]">{t(tier.eyebrow)}</p>
                  {tier.inline ? (
                    <div className="flex items-center gap-3.5">
                      <p className="text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[#0a0a0a]">{t(tier.title)}</p>
                      <Chip grey>{t(tier.chip)}</Chip>
                    </div>
                  ) : (
                    <>
                      <p className="w-full text-[24px] leading-8 font-semibold tracking-[-0.24px] text-[#0a0a0a]">{t(tier.title)}</p>
                      <Chip grey>{t(tier.chip)}</Chip>
                    </>
                  )}
                  <p className="w-[372px] text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-primary)]">{t(tier.desc)}</p>
                  {tier.tokens.map(([c, n]) => (
                    <Reveal key={n} enter={60}>
                      <TokenRow color={c} name={n} />
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>

      <SappDsSticker label="LMS Pro DS" tone="yellow" rotate={-4} className="top-[458px] left-[488px]" />
      <SappDsSticker label="System map" tone="mint" rotate={3} className="top-[592px] left-[1449px]" />
      <SappDsSticker label="Token tiers" tone="violet" rotate={-3} className="top-[1091px] left-[1460px]" />
    </section>
  );
}

/* ========================================================================== */
/* Foundations (Figma 249:15806)                                              */
/* ========================================================================== */

type Ramp = { name: string; hex: string[]; labels?: string[] };

const STEPS = ["800", "700", "600", "500", "400", "300", "200", "100", "50"];

const BRAND_RAMPS: Ramp[] = [
  { name: "Primary Shade", hex: ["#664A00", "#996E00", "#CC9300", "#FFB700", "#FFC633", "#FFD466", "#FFE399", "#FFF1CC", "#FFFBF2"] },
  { name: "Secondary Shade", hex: ["#0E1214", "#212B30", "#29353C", "#404041", "#5E5E5F", "#7B7B7C", "#99999A", "#B6B6B7", "#FFFFFF"], labels: ["#0E1214", "#212B30", "#29353C", "#404041", "#5E5E5F", "#7B7B7C", "#99999A", "#B6B6B7", "#FFFFF"] },
];

const STATE_RAMPS: Ramp[] = [
  { name: "Success", hex: ["#044526", "#05673A", "#078A4D", "#10B367", "#34BC7D", "#5FCC99", "#89DDB6", "#B4EDD2", "#E7FCF2"] },
  { name: "Warning", hex: ["#5C3400", "#8A4F00", "#B86900", "#E68200", "#EB9C33", "#F0B566", "#F5CD99", "#FAE6CC", "#FCF3E5"] },
  { name: "Error", hex: ["#4A0604", "#6F0806", "#940B08", "#F80903", "#C73B37", "#D56765", "#E29492", "#F0C0C0", "#FEEDED"] },
  { name: "Info", hex: ["#0E4466", "#146699", "#1B88CC", "#22AAFF", "#4EBBFF", "#7ACCFF", "#7ACCFF", "#D3EEFF", "#E9F6FF"] },
];

function CompactRamp({ ramp }: { ramp: Ramp }) {
  return (
    <div className="wd-hover flex h-[131px] w-[634px] flex-col items-start gap-3 overflow-hidden rounded-[18px] bg-white px-5 py-[18px] shadow-[0_8px_24px_rgba(26,33,77,0.07)]">
      <p className="text-[18px] leading-normal font-semibold whitespace-nowrap text-[#1f2937]">{ramp.name}</p>
      <div className="flex overflow-hidden rounded-[10px] font-mono text-[14px] leading-normal">
        {ramp.hex.map((hex, i) => {
          const value = Number.parseInt(hex.slice(1), 16);
          const red = (value >> 16) & 255;
          const green = (value >> 8) & 255;
          const blue = value & 255;
          const dark = red * 0.299 + green * 0.587 + blue * 0.114 < 145;
          return (
            <div
              key={`${ramp.name}-${STEPS[i]}`}
              className={`flex w-[66px] shrink-0 flex-col items-center gap-0.5 px-[5px] py-2.5 ${dark ? "text-white" : "text-[#1f2937]"}`}
              style={{ background: hex }}
            >
              <span>{STEPS[i]}</span>
              <span>{ramp.labels?.[i] ?? hex.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type RoleRow = { color: string; name: string; hint: string; ring?: boolean };
const ROLES: { title: string; icon: string; rows: RoleRow[] }[] = [
  {
    title: "Text",
    icon: "icon-text.svg",
    rows: [
      { color: "#1f2937", name: "Text/Default", hint: "Body, titles · #1F2937" },
      { color: "#4b5563", name: "Text/Subtle", hint: "Secondary copy · #4B5563" },
      { color: "#9ca3af", name: "Text/Subtlest", hint: "Hints, meta · #9CA3AF" },
      { color: "#ffb700", name: "Text/Brand", hint: "Highlights · #FFB700" },
    ],
  },
  {
    title: "Background",
    icon: "icon-background.svg",
    rows: [
      { color: "#ffffff", name: "Surface/white", hint: "Cards, page · #FFFFFF", ring: true },
      { color: "#f6f6f6", name: "Surface/grey", hint: "Sections · #F6F6F6" },
      { color: "#ffb700", name: "Brand/Default", hint: "Active, progress · #FFB700" },
      { color: "#fff1cc", name: "Selected/Default", hint: "Selected rows · #FFF1CC" },
    ],
  },
  {
    title: "Border",
    icon: "icon-border.svg",
    rows: [
      { color: "#d1d5db", name: "Border/Default", hint: "Dividers, cards · #D1D5DB" },
      { color: "#d1d5db", name: "Border/Input", hint: "Fields · #D1D5DB" },
      { color: "#ffb700", name: "Border/Focused", hint: "Focus ring · #FFB700" },
      { color: "#ffb700", name: "Border/Brand", hint: "Selected card · #FFB700" },
    ],
  },
  {
    title: "Status tag",
    icon: "icon-tag.svg",
    rows: [
      { color: "#10b367", name: "Success-50", hint: "Passed · Done · #E7FCF2" },
      { color: "#e68200", name: "Warning-50", hint: "Due soon · #FCF3E5" },
      { color: "#f80903", name: "Failed-50", hint: "Failed · Overdue · #FEEDED" },
      { color: "#22aaff", name: "Neutral-50", hint: "Information · #E9F6FF" },
    ],
  },
];

const TYPE_SCALE: { token: string; meta: string; size: number; lh: number; weight: number }[] = [
  { token: "Heading/H-64-80", meta: "64 / 80 · 400–700", size: 64, lh: 80, weight: 700 },
  { token: "Heading/H-48-64", meta: "48 / 64 · 400–700", size: 48, lh: 64, weight: 700 },
  { token: "Heading/H-40-56", meta: "40 / 56 · 400–700", size: 40, lh: 56, weight: 600 },
  { token: "Heading/H-32-40", meta: "32 / 46 · 400–700", size: 32, lh: 46, weight: 600 },
  { token: "Heading/H-24-30", meta: "24 / 32 · 400–700", size: 24, lh: 32, weight: 600 },
  { token: "Heading/H-20-25", meta: "20 / 28 · 400–700", size: 20, lh: 28, weight: 500 },
  { token: "Body/B-18-27", meta: "18 / 27 · 400–700", size: 18, lh: 27, weight: 400 },
  { token: "Body/B-16-24", meta: "16 / 24 · 400–700", size: 16, lh: 24, weight: 400 },
  { token: "Body/B-14-16.9", meta: "14 / 22 · 400–700", size: 14, lh: 22, weight: 400 },
  { token: "Body/B-12-20", meta: "12 / 20 · 400–700", size: 12, lh: 20, weight: 400 },
  { token: "Body/B-10-16", meta: "10 / 16 · 400–700", size: 10, lh: 16, weight: 500 },
];

const SPACING: [string, string, number][] = [
  ["spacing-xxs", "4px", 13.6],
  ["spacing-xs", "8px", 27.2],
  ["spacing-s", "12px", 40.8],
  ["spacing-m", "16px", 54.4],
  ["spacing-l", "24px", 81.6],
  ["spacing-xl", "32px", 108.8],
  ["spacing-xxl", "40px", 136],
  ["spacing-xxxl", "48px", 163.2],
  ["spacing-5xl", "64px", 217.6],
  ["spacing-6xl", "80px", 272],
];

/* [name, label, radius, hover radius] */
const RADII: [string, string, number, number][] = [
  ["none", "0px", 0, 12],
  ["xxs", "4px", 4, 16],
  ["xs", "8px", 8, 20],
  ["s", "12px", 12, 24],
  ["m", "16px", 16, 28],
  ["l", "24px", 24, 34],
  ["xl", "32px", 32, 8],
  ["full", "9999", 34, 4],
];

const ELEVATION: { token: string; use: string; spec: string; e: string; eh: string; lift?: string }[] = [
  { token: "Shadow/Small", use: "Cards at rest", spec: "0 4 20 · 5%", e: "0 4px 20px rgba(0,0,0,0.05)", eh: "0 10px 28px rgba(0,0,0,0.09)" },
  { token: "Shadow/Medium", use: "Dropdown · Popover", spec: "0 4 16 · 8%", e: "0 4px 16px rgba(0,0,0,0.08)", eh: "0 14px 30px rgba(0,0,0,0.13)" },
  { token: "Shadow/Large", use: "Modal · Drawer", spec: "0 4 24 · 12%", e: "0 4px 24px rgba(0,0,0,0.12)", eh: "0 22px 44px rgba(0,0,0,0.18)" },
  { token: "Inner/Inner Shadow", use: "Pressed · Inset field", spec: "0 1 2 · 15% inset", e: "inset 0 1px 2px rgba(0,0,0,0.15)", eh: "inset 0 3px 8px rgba(0,0,0,0.22)", lift: "2px" },
];

const BORDER_STATES = [
  { token: "Border Width/Default", use: "Input · Card", border: "inset 0 0 0 1px #d1d5db" },
  { token: "Border Width/Selected", use: "Chosen answer · Active card", border: "inset 0 0 0 1.5px #ffb700" },
  { token: "Border Width/Focused", use: "Keyboard focus", border: "inset 0 0 0 1px #d1d5db", ring: true },
];

export function SappFoundations() {
  const t = useT();
  const typeRoot = useRef<HTMLDivElement>(null);
  /* Typography: the dark Roboto card follows the scroll beside the type scale until both bottoms meet. */
  useStickyCopy(typeRoot, ".work-detail", 16);
  return (
    <section id="wd-foundations" className={`sys-ease ${FONT_VARS} relative flex w-full flex-col items-start gap-12 px-[236px] pt-[100px]`}>
      {/* Head 249:15807 */}
      <Reveal className="w-full">
        <div className="flex flex-col items-start gap-[22px]">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow label={t("FINAL DESIGN  ·  02.4")} />
            <SappHeading>{t("Foundations")}</SappHeading>
          </div>
          <p className="w-[760px] text-base leading-6 text-[var(--cmd-text-secondary)]">
            {t("Colour, type, spacing, radius and elevation — every value lives as a variable or style in the LMS library, so the same decision shows up identically in a course card, an exam screen and the dashboard.")}
          </p>
        </div>
      </Reveal>

      {/* Colour 249:15821 */}
      <div className="flex w-full flex-col items-start gap-7">
        <Reveal>
          <BlockHead title="Colour" tone="subtle">
            {t("A warm yellow brand for focus and progress, a charcoal secondary for actions, and four state ramps. Each ramp runs 50 → 800 so the same hue covers backgrounds, borders and text.")}
          </BlockHead>
        </Reveal>
        <div className="relative h-[978px] w-full overflow-hidden rounded-[32px]">
          <span className="pointer-events-none absolute top-[120px] left-[-179px] size-[520px] rounded-full bg-[rgba(255,194,51,0.2)] blur-[90px]" />
          <span className="pointer-events-none absolute top-[-40px] left-[900px] size-[460px] rounded-full bg-[rgba(143,227,220,0.25)] blur-[90px]" />
          <span className="pointer-events-none absolute top-[681px] left-[620px] size-[520px] rounded-full bg-[rgba(91,107,224,0.18)] blur-[100px]" />

          <div className="absolute top-14 left-7 z-[2] flex w-[634px] flex-col gap-4">
            {[...BRAND_RAMPS, ...STATE_RAMPS].map((ramp) => (
              <Reveal key={ramp.name} enter={50}>
                <CompactRamp ramp={ramp} />
              </Reveal>
            ))}
          </div>

          <div className="absolute top-16 left-[824px] z-[2] grid h-[850px] w-[552px] grid-cols-2 gap-5">
            {ROLES.map((role) => (
              <Reveal key={role.title} className="h-[415px] w-[266px]">
                <div className={`${CARD} flex size-full flex-col items-start justify-between p-7`}>
                  <div className="flex items-center justify-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" src={`${ASSET}/${role.icon}`} className="size-6 shrink-0" />
                    <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-[#0a0a0a]">{role.title}</p>
                  </div>
                  {role.rows.map((row) => (
                    <div key={row.name} className="sys-role flex items-center gap-3">
                      <span
                        className="sys-role-sw size-10 shrink-0 rounded-[10px]"
                        style={{ background: row.color, boxShadow: row.ring ? "inset 0 0 0 1px rgba(0,0,0,0.12)" : undefined }}
                      />
                      <div className="flex flex-col items-start gap-0.5 text-[14px] whitespace-nowrap">
                        <p className="font-mono leading-[22px] text-[#0a0a0a]">{row.name}</p>
                        <p className="sys-role-hint leading-5 text-[#6b7280]">{t(row.hint)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {[121.5, 268.5, 415.5, 562.5, 709.5, 856.5].map((top) => (
            <Fragment key={top}>
              <span className="absolute left-[657px] z-[3] size-2.5 rounded-full bg-[#5b6be0]" style={{ top: top - 5 }} />
              <span className="absolute left-[662px] z-[3] h-0 w-12 border-t-2 border-[#5b6be0]" style={{ top }} />
            </Fragment>
          ))}
          <span className="absolute top-[121.5px] left-[709px] z-[3] h-[735px] border-l-2 border-[#5b6be0]" />
          <span className="absolute top-[489px] left-[710px] z-[3] h-0 w-[90px] border-t-2 border-[#5b6be0]" />
          <span className="absolute top-[470px] left-[717.5px] z-[4] rounded-lg bg-[#5b6be0] px-3.5 py-2 text-[14px] leading-[22px] font-semibold text-white">Alias</span>

          <SappSelectionOutline style={{ left: 8, top: 32, width: 676, height: 914 }} />
          <SappSelectionOutline style={{ left: 800, top: 32, width: 600, height: 914 }} />
          <SappDsSticker label="Base colors" tone="mint" rotate={-3} className="top-0 left-9" />
          <SappDsSticker label="Semantic roles" tone="violet" rotate={4} className="top-0 left-[1180px]" />
          <SappDsCursorTag className="top-[904px] left-[716px]" />
        </div>
      </div>

      {/* Typography 249:15992 */}
      <div ref={typeRoot} className="flex w-full flex-col items-start gap-7">
        <Reveal>
          <BlockHead title="Typography" tone="subtle">
            {t("One family — Roboto — chosen for dense Vietnamese learning content and exam questions. 12 sizes × 4 weights give 45 named styles, from a 64px hero to 10px captions.")}
          </BlockHead>
        </Reveal>
        <div data-story className="relative flex w-full items-start gap-5">
          <Reveal className="w-[450px] shrink-0">
            <div data-copy className="will-change-transform">
            <div className="sys-spec wd-hover flex flex-col items-start gap-2 rounded-[24px] bg-[#29353c] p-10 shadow-[var(--sapp-card-soft)]">
              <p className={`sys-aa text-[140px] leading-[1.25] font-bold whitespace-nowrap text-[#ffb700] ${ROBOTO}`}>Aa</p>
              <p className={`text-[32px] leading-[1.25] font-bold whitespace-nowrap text-white ${ROBOTO}`}>Roboto</p>
              <p className="w-[370px] text-[14px] leading-5 text-[#d1d5db]">Regular 400 · Medium 500 · SemiBold 600 · Bold 700</p>
              <div className={`w-[370px] text-[15px] leading-[1.25] text-white ${ROBOTO}`}>
                <p>AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY</p>
                <p>aăâbcdđeêghiklmnoôơpqrstuưvxy</p>
                <p>0123456789 · ? ! % /</p>
              </div>
            </div>
            </div>
          </Reveal>
          <Reveal className="min-w-px flex-1">
            <div className={`${CARD} flex flex-col items-start p-8 whitespace-nowrap`}>
              {TYPE_SCALE.map((ts) => (
                <Reveal key={ts.token} enter={40} className="w-full">
                  <div className="sys-type flex w-full items-center gap-5 py-2.5">
                    <div className="relative flex w-[200px] shrink-0 flex-col items-start gap-0.5 text-[14px]">
                      <p className="font-mono leading-[22px] text-[#0a0a0a]">{ts.token}</p>
                      <p className="leading-5 text-[#6b7280]">{ts.meta}</p>
                    </div>
                    <p
                      className={`sys-type-sample relative text-[#1f2937] ${ROBOTO}`}
                      style={{ fontSize: ts.size, lineHeight: `${ts.lh}px`, fontWeight: ts.weight }}
                    >
                      Join with SAPP LMS
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <SappSelectionOutline style={{ left: 458, top: -14, width: 954, height: 866 }} />
          <SappDsSticker label="Roboto" tone="yellow" rotate={-4} className="top-[-34px] left-[1236px]" />
          <SappDsCursorTag className="top-[454px] left-[935px]" />
        </div>
      </div>

      {/* Spacing, radius & border 249:16062 */}
      <div className="flex w-full flex-col items-start gap-7">
        <Reveal>
          <BlockHead title="Spacing, radius & border" tone="subtle">
            {t("A 4-based number scale feeds both spacing and radius, so a 16px gap and a 16px corner come from the same token. Border widths encode state: 1 default, 1.5 selected, 2 focused.")}
          </BlockHead>
        </Reveal>
        <div className="relative flex w-full items-stretch gap-5">
          <Reveal className="flex w-[560px] shrink-0">
            <div className={`${CARD} flex w-full flex-col items-start gap-2.5 p-8`}>
              <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-[#0a0a0a]">{t("Number token → spacing")}</p>
              {SPACING.map(([name, px, w]) => (
                <Reveal key={name} enter={40}>
                  <div className="sys-space flex items-center gap-3.5">
                    <div className="flex w-[150px] shrink-0 items-start">
                      <span className="sys-tok-label rounded-[6px] bg-[#f6f6f6] px-2.5 py-[5px] font-mono text-[14px] leading-[22px] whitespace-nowrap text-[#374151]">{name}</span>
                    </div>
                    <div className="flex w-12 shrink-0 items-start">
                      <span className="text-[12px] leading-[18px] whitespace-nowrap text-[#6b7280]">{px}</span>
                    </div>
                    <span className="sys-bar h-4 shrink-0 rounded-[4px] bg-[#ffd466]" style={{ width: w }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <div className="flex min-w-px flex-1 flex-col items-start gap-5">
            <Reveal className="w-full">
              <div className={`${CARD} flex w-full flex-col items-start gap-[18px] p-8`}>
                <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-[#0a0a0a]">{t("Radius")}</p>
                <div className="flex items-end gap-[18px]">
                  {RADII.map(([name, label, r, rh]) => (
                    <Reveal key={name} enter={40}>
                      <div className="sys-radius-item flex flex-col items-center gap-2">
                        <span
                          className="sys-radius size-[68px] shrink-0 bg-[#fff1cc]"
                          style={{ "--r": `${r}px`, "--r-hover": `${rh}px` } as CSSProperties}
                        />
                        <p className="font-mono text-[14px] leading-[22px] whitespace-nowrap text-[#0a0a0a]">{name}</p>
                        <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{label}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal className="flex w-full flex-1">
              <div className={`${CARD} flex w-full flex-col items-start gap-[18px] p-8`}>
                <p className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap text-[#0a0a0a]">{t("Border width = state")}</p>
                <div className="flex w-[752px] items-start gap-6">
                  {BORDER_STATES.map((b) => (
                    <Reveal key={b.token} enter={40} className="min-w-px flex-1">
                      <div className="sys-bw-item relative flex flex-col items-start gap-2">
                        <div className="sys-bw flex h-12 w-[230px] shrink-0 items-center rounded-[10px] bg-white px-3.5" style={{ boxShadow: b.border }}>
                          <p className="text-[13px] leading-[1.5] whitespace-nowrap text-[#1f2937]">Answer A</p>
                        </div>
                        <p className="w-full font-mono text-[14px] leading-[22px] text-[#0a0a0a]">{b.token}</p>
                        <p className="text-[14px] leading-5 whitespace-nowrap text-[#6b7280]">{t(b.use)}</p>
                        {b.ring ? (
                          <span className="sys-ring pointer-events-none absolute top-[-1.94px] left-[-2px] h-[52px] w-[234px] rounded-[10px] shadow-[inset_0_0_0_2px_#ffb700]" />
                        ) : null}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <SappDsSticker label="Figma variables" tone="orange" rotate={4} className="top-[-24px] left-[-16px]" />
          <SappDsSticker label="Radius tokens" tone="violet" rotate={-3} className="top-[-24px] left-[1190px]" />
        </div>
      </div>

      {/* Elevation 249:16199 */}
      <div className="flex w-full flex-col items-start gap-7">
        <Reveal>
          <BlockHead title="Elevation" tone="subtle">
            {t("Four effect styles. Shadows stay soft and low so dense learning screens never feel heavy; the inner shadow marks pressed and inset fields.")}
          </BlockHead>
        </Reveal>
        <div className="relative flex w-full items-start gap-6">
          <div className="flex min-w-px flex-1 items-stretch gap-5">
            {ELEVATION.map((e) => (
              <Reveal key={e.token} className="flex min-w-px flex-1">
                <div className="wd-hover flex h-[252px] w-full flex-col items-center justify-center gap-2.5 rounded-[20px] bg-white p-7 text-center whitespace-nowrap shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                  <span
                    className="sys-elev size-24 shrink-0 rounded-[20px] bg-white"
                    style={{ "--e": e.e, "--e-hover": e.eh, "--lift": e.lift ?? "-8px" } as CSSProperties}
                  />
                  <p className="font-mono text-[14px] leading-[22px] text-[#0a0a0a]">{e.token}</p>
                  <p className="text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[#0a0a0a]">{t(e.use)}</p>
                  <p className="text-[14px] leading-5 text-[#6b7280]">{e.spec}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="w-80 shrink-0">
            <div className="flex w-full flex-col items-start gap-3 overflow-hidden rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(26,33,77,0.07)]">
              <p className="text-[16px] leading-normal font-semibold whitespace-nowrap text-[#1f2937]">Drop shadow · Shadow/Large</p>
              {[
                ["X", "0"],
                ["Y", "4"],
                ["Blur", "24"],
                ["Colour", "Black · 12%"],
              ].map(([label, value]) => (
                <div key={label} className="flex w-full items-start justify-between overflow-hidden text-[14px] leading-normal">
                  <span className="text-[#6b7280]">{label}</span>
                  <span className="rounded-lg bg-[#f3f4f6] px-2.5 py-[5px] font-mono text-[#1f2937]">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <SappDsSticker label="Effects" tone="mint" rotate={-4} className="top-[-30px] left-[1240px]" />
        </div>
      </div>
    </section>
  );
}
