"use client";
/* eslint-disable @next/next/no-img-element -- Figma exports keep their measured size; large photos lazy-load. */

import "./thuc-applications.css";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { Reveal, useRevealChildren } from "../../reveal";
import { ThucEyebrow, ThucHeading } from "./parts";

/*
 * Thực Vị Thiên — Phase 02 (Visual system) and Phase 03 (Applications), Figma 332:16053 → 332:16510:
 * Phase 02 band · Graphic pattern · Colour palette · Phase 03 band · Menu & stationery ·
 * Packaging · Posters · Social media · Case End.
 */

const A = "/figma/thuc/applications";
const LEAD = "text-[20px] leading-[28px] text-[var(--cmd-text-secondary)]";
const H4 = "text-[20px] leading-[28px] font-semibold tracking-[-0.4px] whitespace-nowrap text-[var(--cmd-text-primary)]";
const BODY = "text-[16px] leading-[24px] tracking-[-0.2px]";
const MONO_S = "font-mono text-[14px] leading-[22px]";
const SECTION = "relative flex w-[1872px] flex-col items-start px-[156px] pt-[100px]";

/* ================================================================== */
/* Shared bits                                                          */
/* ================================================================== */

/** Section head: eyebrow + 56px red heading, then the 20/28 grey lead 24px below. */
function Head({ eyebrow, title, lead, leadWidth = 900 }: { eyebrow: string; title: string; lead?: string; leadWidth?: number }) {
  const t = useT();
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <Reveal enter={60}>
        <div className="flex flex-col items-start gap-4">
          <ThucEyebrow label={eyebrow} />
          <ThucHeading>{t(title)}</ThucHeading>
        </div>
      </Reveal>
      {lead ? (
        <Reveal enter={40}>
          <p className={LEAD} style={{ width: leadWidth }}>
            {t(lead)}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Raster photo: lazy, clipped to its radius, settles from a slight zoom on entry and zooms slowly on hover. */
function Photo({ src, w, h, radius, alt }: { src: string; w: number | string; h: number; radius: number; alt: string }) {
  const t = useT();
  return (
    <div className="ta-photo relative shrink-0 overflow-clip" style={{ width: w, height: h, borderRadius: radius }}>
      <img src={src} alt={t(alt)} loading="lazy" decoding="async" draggable={false} className="ta-photo-img absolute inset-0 size-full object-cover" />
    </div>
  );
}

/* ================================================================== */
/* Phase bands (332:16053 / 332:16145)                                 */
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
  ink: string;
  numOpacity?: number;
  dotColor: string;
  dotOpacity: number;
  glow: { left: number; top: number; size: number };
};

function PhaseBand({ id, num, title, text, chips, height, top, copyShift, solid, shadow, ink, numOpacity = 1, dotColor, dotOpacity, glow }: BandProps) {
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
        <div className="ta-band relative size-full overflow-clip rounded-[40px]" style={{ background: solid, boxShadow: `12px 12px 0 0 ${shadow}` }}>
          <div
            aria-hidden
            className="ta-band-glow pointer-events-none absolute"
            style={{ left: glow.left, top: glow.top, width: glow.size, height: glow.size, backgroundImage: GLOW }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-[0_1.41%_3.5%_0] mix-blend-multiply" style={dots} />
          <p className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap" style={{ color: ink, opacity: numOpacity }}>
            {num}
          </p>
          <div
            className="absolute left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px]"
            style={{ color: ink, top: `calc(50% + ${copyShift}px)` }}
          >
            <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {n}", { n: num })}</p>
            <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{t(title)}</p>
            <p className="w-[860px] text-[20px] leading-[28px]">{t(text)}</p>
            <div className="flex items-start gap-2">
              {chips.map((c) => (
                <span key={c} className={`wd-hover flex items-center rounded-full bg-white px-3 py-1.5 whitespace-pre text-[#2f2f2f] ${BODY}`}>
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
      text="Pattern and colour rules so every touchpoint reads as Thực Vị Thiên — with or without the logo."
      chips={["02.1  Graphic pattern", "02.2  Colour palette"]}
      height={511}
      top={99.89}
      copyShift={-0.11}
      solid="#2f2f2f"
      shadow="#151515"
      ink="#ffffff"
      dotColor="#151515"
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
      text="The identity at work: menus, stationery, takeaway packaging, posters and social media."
      chips={["03.1  Menu & stationery", "03.2  Packaging", "03.3  Posters", "03.4  Social media"]}
      height={500}
      top={100.07}
      copyShift={0.07}
      solid="#d8dbd8"
      shadow="#a3a8a3"
      ink="#2f2f2f"
      numOpacity={0.9}
      dotColor="#a3a8a3"
      dotOpacity={1}
      glow={{ left: 949, top: -229.06, size: 1042 }}
    />
  );
}

/* ================================================================== */
/* 02.1 Graphic pattern (339:16058)                                    */
/* ================================================================== */

const USES = [
  {
    title: "Vertical, with text",
    body: "Framed by the outer rectangle and set upright beside headlines — the default on menus and business cards.",
    mark: <img src={`${A}/pat-sign-v.svg`} alt="" className="ta-use-mark absolute" style={{ left: 39, top: 12, width: 50.31, height: 104 }} />,
  },
  {
    title: "Horizontal, with text",
    body: "Turned on its side to run along banners, takeaway sleeves and chopstick wrappers.",
    mark: (
      <span className="ta-use-mark absolute flex items-center justify-center" style={{ left: 12, top: 38.69, width: 104, height: 50.31 }}>
        <img src={`${A}/pat-sign-v.svg`} alt="" className="block max-w-none -rotate-90" style={{ width: 50.31, height: 104 }} />
      </span>
    ),
  },
  {
    title: "Wordless",
    body: "Without the rectangle the three characters work alone — the usual choice for posters and advertising.",
    mark: <img src={`${A}/pat-chars-s.svg`} alt="" className="ta-use-mark absolute" style={{ left: 44, top: -6, width: 39.88, height: 140 }} />,
  },
];

function Pattern() {
  const t = useT();
  return (
    <section id="wd-pattern" className={`${SECTION} gap-10`} style={{ height: 976 }}>
      <Head
        eyebrow="VISUAL SYSTEM  ·  02.1"
        title="The signboard motif"
        lead="The identity motif is a so-called signboard, used on posters, business cards and other promotional materials."
      />
      <div className="flex w-full items-center gap-12">
        <Reveal className="shrink-0">
          <div className="ta-panel relative h-[640px] w-[760px] overflow-clip rounded-[32px] bg-[var(--brand-thuc)]">
            <img
              src={`${A}/pat-chars-big.svg`}
              alt=""
              className="ta-panel-chars pointer-events-none absolute"
              style={{ left: 543.64, top: -130, width: 256.36, height: 900 }}
            />
            <img
              src={`${A}/pat-sign-big.svg`}
              alt={t("Thực Vị Thiên signboard motif")}
              className="ta-panel-sign absolute"
              style={{ left: 199, top: 70, width: 241.88, height: 500 }}
            />
          </div>
        </Reveal>
        <div className="flex min-w-px flex-1 flex-col items-start">
          {USES.map((u, i) => (
            <div key={u.title} className="w-full">
              {i > 0 ? <div className="h-px w-full bg-[rgba(20,20,26,0.1)]" /> : null}
              <Reveal enter={40}>
                <div className="ta-use flex w-full items-center gap-7 py-7">
                  <div className="ta-use-tile relative size-32 shrink-0 overflow-clip rounded-[20px] bg-[#f1f1ef]">{u.mark}</div>
                  <div className="flex min-w-px flex-1 flex-col items-start gap-1.5">
                    <p className={H4}>{t(u.title)}</p>
                    <p className={`w-full text-[var(--cmd-text-secondary)] ${BODY}`}>{t(u.body)}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 02.2 Colour palette (339:16096)                                     */
/* ================================================================== */

type Code = { k: string; shown: string; copy: string };
type SwatchDef = { name: string; role: string; bg: string; ink: string; soft: string; codesInk: string; chars: string; width: number; codes: Code[] };

const SWATCHES: SwatchDef[] = [
  {
    name: "Dark Red",
    role: "PRIMARY — SIGNAGE, MENUS, POSTERS",
    bg: "#cc242b",
    ink: "#ffffff",
    soft: "rgba(255,255,255,0.75)",
    codesInk: "rgba(255,255,255,0.85)",
    chars: "col-chars-w.svg",
    width: 728,
    codes: [
      { k: "HEX", shown: "HEX  #CC242B", copy: "#CC242B" },
      { k: "RGB", shown: "RGB  204  36  43", copy: "rgb(204, 36, 43)" },
      { k: "CMYK", shown: "CMYK  14  100  96  0", copy: "C14 M100 Y96 K0" },
    ],
  },
  {
    name: "Light Black",
    role: "TYPE AND PACKAGING",
    bg: "#2f2f2f",
    ink: "#ffffff",
    soft: "rgba(255,255,255,0.75)",
    codesInk: "rgba(255,255,255,0.85)",
    chars: "col-chars-w.svg",
    width: 396,
    codes: [
      { k: "HEX", shown: "HEX  #2F2F2F", copy: "#2F2F2F" },
      { k: "RGB", shown: "RGB  47  47  47", copy: "rgb(47, 47, 47)" },
      { k: "CMYK", shown: "CMYK  70  64  63  62", copy: "C70 M64 Y63 K62" },
    ],
  },
  {
    name: "Light Grey",
    role: "PAPER AND INSIDE PAGES",
    bg: "#d8dbd8",
    ink: "#2f2f2f",
    soft: "rgba(47,47,47,0.75)",
    codesInk: "rgba(47,47,47,0.85)",
    chars: "col-chars-d.svg",
    width: 396,
    codes: [
      { k: "HEX", shown: "HEX  #D8DBD8", copy: "#D8DBD8" },
      { k: "RGB", shown: "RGB  216  219  216", copy: "rgb(216, 219, 216)" },
      { k: "CMYK", shown: "CMYK  7  5  5  0", copy: "C7 M5 Y5 K0" },
    ],
  },
];

/** One colour card. Each code line is a button: hover shows a quiet "Copy" hint, click copies the value. */
function Swatch({ s }: { s: SwatchDef }) {
  const t = useT();
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = (c: Code) => {
    void navigator.clipboard?.writeText(c.copy).catch(() => {});
    setCopied(c.k);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="shrink-0" style={{ width: s.width }}>
    <Reveal enter={60}>
      <div
        className="ta-sw wd-hover relative flex h-[460px] w-full flex-col items-start justify-end gap-3.5 overflow-clip rounded-[28px] p-8"
        style={{ background: s.bg, "--sw-ink": s.ink } as CSSProperties}
      >
        <img
          src={`${A}/${s.chars}`}
          alt=""
          className="ta-sw-chars pointer-events-none absolute"
          style={{ right: -71.78, top: -60, width: 159.51, height: 560 }}
        />
        <p className={`relative whitespace-nowrap ${MONO_S}`} style={{ color: s.soft }}>
          {t(s.role)}
        </p>
        <p className="relative text-[24px] leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap" style={{ color: s.ink }}>
          {t(s.name)}
        </p>
        <div className="relative flex flex-col items-start gap-1">
          {s.codes.map((c) => (
            <button
              key={c.k}
              type="button"
              onClick={() => copy(c)}
              className={`ta-code flex items-center gap-3 whitespace-pre ${MONO_S}`}
              style={{ color: s.codesInk }}
              aria-label={t("Copy {v}", { v: c.copy })}
            >
              <span className="ta-code-v">{c.shown}</span>
              <span className={`ta-code-hint ${copied === c.k ? "is-on" : ""}`} style={{ color: s.soft }}>
                {copied === c.k ? t("Copied") : t("Copy")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Reveal>
    </div>
  );
}

function Colour() {
  return (
    <section id="wd-colour" className={`${SECTION} gap-10`} style={{ height: 768 }}>
      <Head
        eyebrow="VISUAL SYSTEM  ·  02.2"
        title="Updated colour palette"
        lead="A more modern and classic direction, built on Thực Vị Thiên's existing brand identity."
      />
      {/* Figma flex 2:1:1 with 32px padding resolves to 728 / 396 / 396. */}
      <div className="flex w-full items-start gap-5">
        {SWATCHES.map((s) => (
          <Swatch key={s.name} s={s} />
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 03.1 Menu & stationery (340:16066)                                  */
/* ================================================================== */

const NOTES = [
  { n: "01", title: "Cover", body: "The logo sits centred; the signboard characters bleed off the bottom edge as a quiet watermark." },
  { n: "02", title: "Inside page", body: "Dishes are grouped by course in a ruled list, with 土維天 set vertically in the top corner." },
  { n: "03", title: "One grid", body: "Cover and inside share margins and type sizes, so the menu reads as one object." },
];

function Menu() {
  const t = useT();
  return (
    <section id="wd-menu" className={`${SECTION} gap-10`} style={{ height: 1013 }}>
      <Head
        eyebrow="APPLICATIONS  ·  03.1"
        title="Menu & stationery"
        lead="The menu carries the identity end to end — a Dark Red cover and a calm Light Grey inside page."
      />
      <div className="flex w-full items-start gap-6">
        <Reveal className="shrink-0">
          <Photo src={`${A}/menu-cover.webp`} w={500} h={705} radius={24} alt="Thực Vị Thiên menu cover in Dark Red" />
        </Reveal>
        <Reveal className="shrink-0">
          <Photo src={`${A}/menu-inside.webp`} w={497} h={704} radius={24} alt="Thực Vị Thiên menu inside page in Light Grey" />
        </Reveal>
        <div className="flex min-w-px flex-1 flex-col items-start gap-9 pt-6 pl-6">
          {NOTES.map((n) => (
            <Reveal key={n.n} enter={40}>
              <div className="ta-note flex flex-col items-start gap-1.5">
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <p className={`ta-note-n ${MONO_S} text-[var(--brand-thuc)]`}>{n.n}</p>
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
/* 03.2 Packaging (340:16093)                                          */
/* ================================================================== */

const ITEMS = ["Serving board", "Takeaway box", "Paper bag", "Business card", "Chopstick sleeve", "Napkin"];

function Packaging() {
  const t = useT();
  return (
    <section id="wd-packaging" className={`${SECTION} gap-8`} style={{ height: 1472 }}>
      <Head
        eyebrow="APPLICATIONS  ·  03.2"
        title="Takeaway & packaging"
        lead="Red, black and white pieces that read as one family on a table — or on a delivery bike."
      />
      <Reveal className="w-full">
        <Photo src={`${A}/flatlay.webp`} w="100%" h={1100} radius={32} alt="Flat lay of Thực Vị Thiên takeaway packaging and stationery" />
      </Reveal>
      <Reveal enter={20}>
        <div className="flex items-start gap-2.5">
          {ITEMS.map((it) => (
            <span key={it} className={`wd-hover flex items-start rounded-full bg-white px-4 py-2 whitespace-nowrap text-[var(--cmd-text-secondary)] ${BODY}`}>
              {t(it)}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* 03.3 Posters (340:16115)                                            */
/* ================================================================== */

function Posters() {
  return (
    <section id="wd-posters" className={`${SECTION} gap-10`} style={{ height: 1440 }}>
      <Head
        eyebrow="APPLICATIONS  ·  03.3"
        title="Taste the flavor of the East"
        lead="Two poster variants — Light Grey and Dark Red — frame the dishes inside the signboard outline."
        leadWidth={719}
      />
      <Reveal className="w-full">
        <Photo src={`${A}/posters.webp`} w="100%" h={1104} radius={32} alt="Thực Vị Thiên posters in Light Grey and Dark Red" />
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* 03.4 Social media (340:16124)                                       */
/* ================================================================== */

function Social() {
  const t = useT();
  return (
    <section id="wd-social" className={`${SECTION} gap-10`} style={{ height: 1091 }}>
      <Head eyebrow="APPLICATIONS  ·  03.4" title="Social media" />
      <div className="flex w-full items-center gap-20">
        <Reveal className="shrink-0">
          <Photo src={`${A}/social.webp`} w={700} h={835} radius={32} alt="Nine-tile Thực Vị Thiên social media grid" />
        </Reveal>
        <div className="flex min-w-px flex-1 flex-col items-start gap-8">
          <Reveal enter={40}>
            <p className="text-[44px] leading-[56px] font-bold tracking-[-1.1px] whitespace-pre text-[var(--brand-thuc)]">{t("TASTE THE FLAVOR\nOF THE EAST")}</p>
          </Reveal>
          <Reveal enter={40}>
            <p className={`w-[620px] ${LEAD}`}>
              {t("A nine-tile grid alternates logo, food and slogan tiles in the three brand colours. Seen as a whole profile, the feed becomes one big signboard.")}
            </p>
          </Reveal>
          <Reveal enter={20}>
            <img src={`${A}/social-logo.svg`} alt={t("Thực Vị Thiên logo")} className="ta-social-logo block" style={{ width: 180, height: 180.51 }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Case End (332:16510)                                                 */
/* ================================================================== */

function CaseEnd() {
  const t = useT();
  const ref = useRevealChildren<HTMLElement>("[data-rv]", 40);
  return (
    <section ref={ref} id="wd-case-end" className="flex w-[1872px] flex-col items-center gap-7 px-[156px] pt-[100px] pb-20">
      <div data-rv className="flex w-full items-center gap-5 overflow-clip">
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="size-3 shrink-0 rounded-full bg-[var(--brand-thuc)]" />
          <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">
            {t("END OF CASE STUDY  ·  THỰC VỊ THIÊN  ·  2022")}
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

/** Phase 02 band → Case End (Figma 332:16053 → 332:16510). */
export function ThucApplications(): ReactNode {
  return (
    <>
      <PhaseVisual />
      <Pattern />
      <Colour />
      <PhaseApps />
      <Menu />
      <Packaging />
      <Posters />
      <Social />
      <CaseEnd />
    </>
  );
}
