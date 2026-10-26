"use client";
/* eslint-disable @next/next/no-img-element -- Figma exports keep their measured size; large photos lazy-load. */

import "./rum-applications.css";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal, useRevealChildren } from "../../reveal";
import { sappBeVietnam } from "../sapp/fonts";
import { RumEyebrow, RumHeading } from "./parts";

/*
 * 98rum — Phase 02 (Visual system) and Phase 03 (Applications), Figma 343:90606 → 343:90781:
 * Phase 02 band · Colour palette · Typography · Phase 03 band · Stationery · Billboard ·
 * Bus shelter · Case End.
 */

const A = "/figma/rum/applications";
const BVP = sappBeVietnam.className;
const LEAD = "text-[20px] leading-[28px] text-[var(--cmd-text-secondary)]";
const H4 = "text-[20px] leading-[28px] font-semibold tracking-[-0.4px] whitespace-nowrap text-[var(--cmd-text-primary)]";
const BODY = "text-[16px] leading-[24px] tracking-[-0.2px]";
const MONO_S = "font-mono text-[14px] leading-[22px]";
const SECTION = "relative flex w-[1872px] flex-col items-start gap-10 px-[156px] pt-[100px]";
const NAVY = "#111224";

/* ================================================================== */
/* Shared bits                                                          */
/* ================================================================== */

/** Section head: eyebrow + 56px heading; the lead (when given) sits 40px below as a section sibling. */
function Head({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  const t = useT();
  return (
    <>
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <RumEyebrow label={eyebrow} />
          <RumHeading>{t(title)}</RumHeading>
        </div>
      </Reveal>
      {lead ? (
        <Reveal enter={40}>
          <p className={`w-[900px] ${LEAD}`}>{t(lead)}</p>
        </Reveal>
      ) : null}
    </>
  );
}

/** Raster photo: lazy, clipped to its radius, settles from a slight zoom on entry and zooms slowly on hover. */
function Photo({ src, w, h, radius, alt }: { src: string; w: number; h: number; radius: number; alt: string }) {
  const t = useT();
  return (
    <div className="ra-photo relative shrink-0 overflow-clip" style={{ width: w, height: h, borderRadius: radius }}>
      <img src={src} alt={t(alt)} loading="lazy" decoding="async" draggable={false} className="ra-photo-img absolute inset-0 size-full object-cover" />
    </div>
  );
}

/* ================================================================== */
/* Phase bands (343:90606 / 343:90688)                                  */
/* ================================================================== */

/*
 * Glow: an 18% white disc under a 70px Gaussian blur, re-expressed as a radial gradient over
 * the blur's reach (r + 3σ) — no CSS blur. Phase 02: r 316 centred at (1481, 319.89);
 * Phase 03: r 311 centred at (1470, 291.94).
 */
const GLOW =
  "radial-gradient(circle closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.17) 38.4%, rgba(255,255,255,0.145) 48%, rgba(255,255,255,0.09) 59.7%, rgba(255,255,255,0.036) 71%, rgba(255,255,255,0.011) 80.6%, rgba(255,255,255,0) 100%)";

type BandProps = {
  id: string;
  num: string;
  title: string;
  text: string;
  chips: string[];
  /** Section height and band top as measured in Figma. */
  height: number;
  top: number;
  /** Copy block vertical offset from the band centre (Figma calc(50% ± n)). */
  copyShift: number;
  solid: string;
  shadow: string;
  numOpacity?: number;
  dotColor: string;
  dotOpacity: number;
  glow: { left: number; top: number; size: number };
};

function PhaseBand({ id, num, title, text, chips, height, top, copyShift, solid, shadow, numOpacity = 1, dotColor, dotOpacity, glow }: BandProps) {
  const t = useT();
  const dots: CSSProperties = {
    opacity: dotOpacity,
    backgroundImage: `radial-gradient(circle at 1.05px 1px, ${dotColor} 0.75px, transparent 1.15px)`,
    backgroundSize: "25.2308px 24px",
  };
  return (
    <section id={id} className="relative w-[1872px]" style={{ height }}>
      <div className="absolute left-[116px] h-[400px] w-[1640px]" style={{ top }}>
        <Reveal className="size-full" enter={80}>
          <div className="ra-band relative size-full overflow-clip rounded-[40px] text-white" style={{ background: solid, boxShadow: `12px 12px 0 0 ${shadow}` }}>
            <div
              aria-hidden
              className="ra-band-glow pointer-events-none absolute"
              style={{ left: glow.left, top: glow.top, width: glow.size, height: glow.size, backgroundImage: GLOW }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply" style={dots} />
            <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap" style={{ opacity: numOpacity }}>
              {num}
            </p>
            <div className="absolute left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px]" style={{ top: `calc(50% + ${copyShift}px)` }}>
              <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {n}", { n: num })}</p>
              <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t(title)}</p>
              <p className="w-[860px] text-[20px] leading-[28px]">{t(text)}</p>
              <div className="flex items-start gap-2">
                {chips.map((c) => (
                  <span key={c} className={`wd-hover flex items-center rounded-full bg-white px-3 py-1.5 whitespace-pre ${BODY}`} style={{ color: NAVY }}>
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

function PhaseVisual() {
  return (
    <PhaseBand
      id="wd-phase-visual"
      num="02"
      title="Visual system"
      text="Five colours with strict jobs, and one typeface family for everything."
      chips={["02.1  Colour palette", "02.2  Typography"]}
      height={511}
      top={99.89}
      copyShift={-0.11}
      solid="#ea7643"
      shadow="#b04e22"
      dotColor="#b04e22"
      dotOpacity={0.4}
      glow={{ left: 955, top: -206.11, size: 1052 }}
    />
  );
}

function PhaseApps() {
  return (
    <PhaseBand
      id="wd-phase-apps"
      num="03"
      title="Applications"
      text="The identity in the wild: business cards, a billboard and a bus-shelter campaign."
      chips={["03.1  Stationery", "03.2  Billboard", "03.3  Bus shelter"]}
      height={500}
      top={100.07}
      copyShift={0.07}
      solid={NAVY}
      shadow="#000000"
      numOpacity={0.9}
      dotColor="#000000"
      dotOpacity={1}
      glow={{ left: 949, top: -229.06, size: 1042 }}
    />
  );
}

/* ================================================================== */
/* 02.1 Colour palette (347:16533)                                      */
/* ================================================================== */

type Code = { k: string; shown: string; copy: string };
type SwatchDef = { role: string; hex: string; bg: string; dark: boolean; codes: Code[]; note: string };

const SWATCHES: SwatchDef[] = [
  {
    role: "BACKGROUND COLOUR",
    hex: "#F4D499",
    bg: "#f4d499",
    dark: false,
    codes: [
      { k: "RGB", shown: "RGB  244  212  153", copy: "rgb(244, 212, 153)" },
      { k: "CMYK", shown: "CMYK  4  16  44  0", copy: "C4 M16 Y44 K0" },
    ],
    note: "Main background for all advertising and product packaging — and nothing else.",
  },
  {
    role: "SECOND MAIN COLOUR",
    hex: "#EA7643",
    bg: "#ea7643",
    dark: true,
    codes: [
      { k: "RGB", shown: "RGB  234  118  67", copy: "rgb(234, 118, 67)" },
      { k: "CMYK", shown: "CMYK  4  66  82  0", copy: "C4 M66 Y82 K0" },
    ],
    note: "Background in certain cases and some packaging. On the logo, only the “rum” part — never 98, the outline or the hat.",
  },
  {
    role: "MAIN COLOUR",
    hex: "#00AEEF",
    bg: "#00aeef",
    dark: true,
    codes: [
      { k: "RGB", shown: "RGB  0  174  239", copy: "rgb(0, 174, 239)" },
      { k: "CMYK", shown: "CMYK  69  14  0  0", copy: "C69 M14 Y0 K0" },
    ],
    note: "Used most: backgrounds, typography, print and advertising. Never on “rum”, the outline or the hat.",
  },
  {
    role: "SUB COLOUR",
    hex: "#FCEE1D",
    bg: "#fcee1d",
    dark: false,
    codes: [
      { k: "RGB", shown: "RGB  252  238  29", copy: "rgb(252, 238, 29)" },
      { k: "CMYK", shown: "CMYK  5  0  94  0", copy: "C5 M0 Y94 K0" },
    ],
    note: "A rare secondary background. On the logo, only the pirate hat.",
  },
  {
    role: "OUTLINE COLOUR",
    hex: "#111224",
    bg: NAVY,
    dark: true,
    codes: [
      { k: "RGB", shown: "RGB  17  18  36", copy: "rgb(17, 18, 36)" },
      { k: "CMYK", shown: "CMYK  85  79  54  72", copy: "C85 M79 Y54 K72" },
    ],
    note: "Only for the logo outline and type. Never as a background or on other publications.",
  },
];

/** Ink in Figma: white on the saturated/dark cards, Outline navy on the pale ones. */
const ink = (dark: boolean, a: number) => (dark ? `rgba(255,255,255,${a})` : `rgba(17,18,36,${a})`);

/** One tall colour card. The hex and each code line are buttons: hover shows a quiet "Copy" hint, click copies. */
function Swatch({ s }: { s: SwatchDef }) {
  const t = useT();
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = (k: string, v: string) => {
    void navigator.clipboard?.writeText(v).catch(() => {});
    setCopied(k);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1400);
  };
  const hint = (k: string) => (
    <span className={`ra-code-hint font-mono text-[14px] leading-[22px] ${copied === k ? "is-on" : ""}`} style={{ color: ink(s.dark, 0.8) }}>
      {copied === k ? t("Copied") : t("Copy")}
    </span>
  );

  return (
    <div className="min-w-px flex-1">
      <Reveal enter={60}>
        <div className="ra-sw wd-hover relative flex h-[600px] w-full flex-col items-start gap-3.5 overflow-clip rounded-[28px] p-7" style={{ background: s.bg }}>
          <p className={`whitespace-nowrap ${MONO_S}`} style={{ color: ink(s.dark, 0.8) }}>
            {t(s.role)}
          </p>
          <button
            type="button"
            onClick={() => copy("HEX", s.hex)}
            className="ra-code flex items-center gap-3 whitespace-nowrap"
            aria-label={t("Copy {v}", { v: s.hex })}
          >
            <span className={`ra-code-v text-[32px] leading-none font-bold ${BVP}`} style={{ color: s.dark ? "#ffffff" : NAVY }}>
              {s.hex}
            </span>
            {hint("HEX")}
          </button>
          <div className="flex flex-col items-start gap-1">
            {s.codes.map((c) => (
              <button
                key={c.k}
                type="button"
                onClick={() => copy(c.k, c.copy)}
                className={`ra-code flex items-center gap-3 whitespace-pre ${MONO_S}`}
                style={{ color: ink(s.dark, 0.85) }}
                aria-label={t("Copy {v}", { v: c.copy })}
              >
                <span className="ra-code-v">{c.shown}</span>
                {hint(c.k)}
              </button>
            ))}
          </div>
          <div className="min-h-px w-2.5 flex-1" />
          <p className={`w-full ${BODY}`} style={{ color: ink(s.dark, 0.92) }}>
            {t(s.note)}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function Colour() {
  return (
    <section id="wd-colour" className={SECTION} style={{ height: 924 }}>
      <Head eyebrow="VISUAL SYSTEM  ·  02.1" title="Five colours, five jobs" lead="Each colour has a strict role — down to which part of the logo it may touch." />
      <div className="flex w-full items-start gap-4">
        {SWATCHES.map((s) => (
          <Swatch key={s.hex} s={s} />
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 02.2 Typography (347:16582)                                          */
/* ================================================================== */

const WEIGHTS = [
  { name: "Regular", use: "Body copy", w: "font-normal" },
  { name: "Medium", use: "Captions", w: "font-medium" },
  { name: "SemiBold", use: "Sub-heads", w: "font-semibold" },
  { name: "Bold", use: "Headlines", w: "font-bold" },
];

function Typography() {
  const t = useT();
  return (
    <section id="wd-typography" className={SECTION} style={{ height: 872 }}>
      <Head
        eyebrow="VISUAL SYSTEM  ·  02.2"
        title="Be Vietnam Pro"
        lead="One rounded, friendly sans-serif family covers headlines, body copy and the Vietnamese diacritics the brand needs."
      />
      <div className="flex w-full items-start gap-6">
        <Reveal className="shrink-0">
          <div className="ra-spec wd-hover flex h-[520px] w-[620px] flex-col items-start justify-between rounded-[32px] px-14 py-12" style={{ background: NAVY }}>
            <p className={`whitespace-pre text-[rgba(255,255,255,0.7)] ${MONO_S}`}>{"BE VIETNAM PRO  ·  BOLD"}</p>
            <p className={`ra-spec-aa text-[260px] leading-none font-bold whitespace-nowrap text-[#f4d499] ${BVP}`}>Aa</p>
            <p className={`text-[28px] leading-none font-medium whitespace-nowrap text-white ${BVP}`}>{t("Tiếng Việt có dấu đầy đủ")}</p>
          </div>
        </Reveal>
        <div className="flex min-w-px flex-1 flex-col items-start gap-6 self-stretch">
          <Reveal className="w-full min-h-px flex-1">
            <div className="ra-pangram wd-hover flex size-full flex-col items-start gap-3 rounded-[28px] bg-white px-10 py-9">
              <p className={`whitespace-nowrap text-[var(--cmd-text-secondary)] ${MONO_S}`}>{t("PANGRAM")}</p>
              <p className={`w-full text-[40px] leading-[1.15] font-bold ${BVP}`} style={{ color: NAVY }}>
                The quick brown fox jumps over the lazy dog
              </p>
              <p className={`w-full text-[26px] leading-[1.5] font-normal ${BVP}`} style={{ color: NAVY }}>
                a b c d e f g h i k l m n o p q r s t u v w x y z
              </p>
            </div>
          </Reveal>
          <div className="flex w-full items-start gap-4 whitespace-nowrap">
            {WEIGHTS.map((w) => (
              <div key={w.name} className="min-w-px flex-1">
                <Reveal enter={40}>
                  <div className="ra-weight wd-hover flex w-full flex-col items-start gap-2 rounded-[24px] bg-white p-6">
                    <p className={`ra-weight-ag text-[48px] leading-none text-[#00aeef] ${w.w} ${BVP}`}>Ag</p>
                    <p className={H4}>{t(w.name)}</p>
                    <p className={`text-[var(--cmd-text-secondary)] ${BODY}`}>{t(w.use)}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 03.1 Stationery (348:16533)                                          */
/* ================================================================== */

const NOTES = [
  { n: "01", title: "Front", body: "The full-colour logo on kraft or orange stock, nothing else." },
  { n: "02", title: "Back", body: "Name and contacts in Outline navy, with the mascot cropped by the card edge." },
  { n: "03", title: "Three stocks", body: "Kraft (Background), orange (Second main) and blue (Main) — mixed in one deck." },
];

function Stationery() {
  const t = useT();
  return (
    <section id="wd-stationery" className={SECTION} style={{ height: 1024 }}>
      <Head eyebrow="APPLICATIONS  ·  03.1" title="Business cards" lead="Kraft, orange and blue cards — each one with Cap'n Rum peeking over the edge." />
      <div className="flex w-full items-start gap-6">
        <Reveal className="shrink-0">
          <Photo src={`${A}/card-blue.webp`} w={418} h={700} radius={24} alt="98rum business card on blue stock" />
        </Reveal>
        <Reveal className="shrink-0">
          <Photo src={`${A}/cards.webp`} w={578} h={700} radius={24} alt="98rum business cards on kraft, orange and blue stock" />
        </Reveal>
        <div className="flex min-w-px flex-1 flex-col items-start gap-9 pt-6 pl-6">
          {NOTES.map((n) => (
            <Reveal key={n.n} enter={40}>
              <div className="ra-note flex flex-col items-start gap-1.5">
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <p className={`ra-note-n ${MONO_S} text-[var(--brand-rum)]`}>{n.n}</p>
                  <p className={H4}>{t(n.title)}</p>
                </div>
                <p className={`w-[440px] text-[var(--cmd-text-secondary)] ${BODY}`}>{t(n.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 03.2 Billboard (348:16560)                                           */
/* ================================================================== */

function Billboard() {
  return (
    <section id="wd-billboard" className={SECTION} style={{ height: 1349 }}>
      <Head
        eyebrow="APPLICATIONS  ·  03.2"
        title="Cap'n Rum need your support"
        lead="The launch campaign puts the mascot front and centre: a cheeky headline, one line of brand promise and the logo top-left."
      />
      <Reveal>
        <Photo src={`${A}/billboard.webp`} w={1558} h={997} radius={32} alt="98rum launch billboard with Cap'n Rum" />
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* 03.3 Bus shelter (348:16569)                                         */
/* ================================================================== */

function BusShelter() {
  const t = useT();
  return (
    <section id="wd-bus-shelter" className={SECTION} style={{ height: 1146 }}>
      <Head eyebrow="APPLICATIONS  ·  03.3" title="Come'n get your rum" />
      <div className="flex w-full items-center gap-20">
        <Reveal className="shrink-0">
          <Photo src={`${A}/bus-shelter.webp`} w={600} h={890} radius={32} alt="98rum portrait campaign poster in a bus shelter" />
        </Reveal>
        <div className="flex min-w-px flex-1 flex-col items-start gap-8">
          <Reveal enter={20}>
            <img src={`${A}/logo.svg`} alt={t("98rum logo")} className="ra-logo block" style={{ width: 360, height: 155.78 }} />
          </Reveal>
          <Reveal enter={40}>
            <p className={`text-[44px] leading-[1.05] font-bold tracking-[-0.88px] whitespace-pre ${BVP}`} style={{ color: NAVY }}>
              {"CAP'N RUM NEED YOUR SUPPORT.\nCOME'N GET YOUR RUM."}
            </p>
          </Reveal>
          <Reveal enter={40}>
            <p className={`w-[640px] ${LEAD}`}>
              {t(
                "The portrait version of the campaign re-stacks the same headline for street furniture. The tagline “Try a new kind of fashion vibe” and the badge “No crash. Nothing artificial” stay the same across every format.",
              )}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Case End (343:90781)                                                 */
/* ================================================================== */

function CaseEnd() {
  const t = useT();
  const ref = useRevealChildren<HTMLElement>("[data-rv]", 40);
  return (
    <section ref={ref} id="wd-case-end" className="flex w-[1872px] flex-col items-center gap-7 px-[156px] pt-[100px] pb-20">
      <div data-rv className="flex w-full items-center gap-5 overflow-clip">
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="size-3 shrink-0 rounded-full bg-[var(--brand-rum)]" />
          <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">
            {t("END OF CASE STUDY  ·  98RUM  ·  2023")}
          </p>
        </div>
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
      </div>
      <p data-rv className="text-center text-[44px] leading-[56px] tracking-[-1.1px] whitespace-nowrap text-[var(--cmd-text-primary)]">
        {t("Thanks for reading — here is what I built next.")}
      </p>
    </section>
  );
}

/* ================================================================== */

/** Phase 02 band → Case End (Figma 343:90606 → 343:90781). */
export function RumApplications(): ReactNode {
  return (
    <>
      <PhaseVisual />
      <Colour />
      <Typography />
      <PhaseApps />
      <Stationery />
      <Billboard />
      <BusShelter />
      <CaseEnd />
    </>
  );
}
