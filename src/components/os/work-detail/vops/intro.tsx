"use client";
/* eslint-disable @next/next/no-img-element -- static Figma exports, sized exactly; next/image adds nothing here. */

import "./vops-intro.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { useLang, useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { sappBeVietnam } from "../sapp/fonts";
import { VopsEyebrow, VopsHeading } from "./parts";

const A = "/figma/vops/intro";
const RED = "#ee0033";
const MONO = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap";

/** Group "Intro": hero, process highlight, vision, sitemap (Figma 272:14591 → 275:14856). */
export function VopsIntro() {
  return (
    <>
      <Reveal>
        <VopsHero />
      </Reveal>
      <Reveal>
        <VopsOverview />
      </Reveal>
      <Reveal>
        <VopsVision />
      </Reveal>
      <Reveal>
        <VopsModules />
      </Reveal>
    </>
  );
}

/* ───────────────────────── Hero (272:14591) ───────────────────────── */

const HERO_FACTS: { label: string; lines: string[] }[] = [
  { label: "Position:", lines: ["Product Designer", "Design System Designer"] },
  { label: "Target:", lines: ["All Viettel Group", "employees"] },
  { label: "Platform:", lines: ["iOS, Android,", "Web, Desktop"] },
  { label: "Status:", lines: ["Live · Iterating"] },
];

function VopsHero() {
  const t = useT();
  return (
    <section id="wd-overview-hero" className="relative p-8">
      <div className="relative h-[850px] w-[1808px]">
        {/* Cover art — vOps (272:15626) */}
        <div className="absolute inset-0 overflow-hidden rounded-[50px] bg-[#e50030]">
          <div
            className="absolute top-[-83px] left-0 h-[1017px] w-[1808px] overflow-hidden"
            style={{ backgroundImage: "linear-gradient(222.0165deg, rgb(238, 0, 51) 30.365%, rgb(136, 0, 29) 100%)" }}
          >
            <img src={`${A}/cover-bg.svg`} alt="" aria-hidden className="absolute inset-0 block size-full max-w-none" />
            <img
              src={`${A}/cover-glow.webp`}
              alt=""
              aria-hidden
              className="absolute block max-w-none"
              style={{ left: 904, top: 108.76, width: 904, height: 908.237 }}
            />
            <img src={`${A}/hero-title.png`} alt={t("vOps — Viettel Digital Workplace")} className="absolute block max-w-none" style={{ left: 151.61, top: 353.13, width: 828, height: 223 }} />
            <img
              src={`${A}/cover-lines.svg`}
              alt=""
              aria-hidden
              className="absolute block max-w-none"
              style={{ left: 978.39, top: -26.37, width: 863.98, height: 1187.91 }}
            />
          </div>
          {/* vOps_iconLogo at 80% */}
          <img
            src={`${A}/cover-mark.svg`}
            alt=""
            aria-hidden
            className="absolute block max-w-none opacity-80"
            style={{ left: 729 + 137.285, top: -83 - 12.242 + 54.914, width: 768.797, height: 936.198 }}
          />
        </div>
        {/* Facts card (272:14618): 36% white over a pre-blurred crop of the cover (no runtime backdrop-filter). */}
        <div
          className={`wd-hover absolute flex w-[846px] items-start justify-between rounded-[24px] px-8 py-6 text-white shadow-[0_4.178px_17.34px_0_rgba(0,0,0,0.15)] ${sappBeVietnam.className}`}
          style={{
            left: 481,
            top: 610.05,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.36), rgba(255,255,255,0.36)), url(${A}/facts-backdrop.webp)`,
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
      </div>
    </section>
  );
}

/* ──────────────────── Process Highlight (272:14681 · Bento v2 640:29483) ──────────────────── */

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
        <img src={`${A}/figma-glyph.svg`} alt="Figma" className="absolute inset-[-4.01%_-12.01%_-12.03%_-12.02%] block size-auto max-w-none" />
      </div>
    </div>
  );
}

function VopsOverview() {
  const t = useT();
  return (
    <section id="wd-overview" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <div className="flex flex-col items-start gap-4">
        <VopsEyebrow label={t("PROCESS HIGHLIGHT")} />
        <VopsHeading>{t("Overview")}</VopsHeading>
      </div>
      <div className="flex w-full flex-col items-start gap-14 pb-2">
        <div className="flex w-full items-start">
          <Statement
            className="pr-14"
            kicker="01 — CHALLENGE"
            dot="#b8bcc6"
            title="One workplace for 15+ systems"
            body="Tens of thousands of employees ran their day across separate tools for chat, mail, e-documents, HR forms and admin requests — each with its own UI, its own rules and its own learning curve."
          />
          <div className="flex w-16 shrink-0 flex-col items-center gap-3 self-stretch">
            <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-solid border-[rgba(10,10,15,0.08)] bg-white shadow-[0_4px_14px_0_rgba(10,10,15,0.08)]">
              <img src={`${A}/ov-arrow.svg`} alt="" className="block size-6" />
            </div>
            <div className="min-h-px w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
          </div>
          <Statement
            className="pl-14"
            kicker="02 — OPPORTUNITY"
            dot={RED}
            title="An AI front door, one design system"
            body="One digital workplace where GenHub surfaces what needs attention today, 27+ mini apps handle everyday requests, and VIC makes every product feel like the same company."
          />
        </div>
        <div className="wd-hover relative flex w-full items-start overflow-hidden rounded-[28px] bg-white shadow-[0_12px_32px_-4px_rgba(15,23,41,0.06),0_1px_3px_0_rgba(15,23,41,0.04)]">
          <div className={OV_COL}>
            <p className={OV_LABEL}>{t("TIMELINE")}</p>
            <div className="flex w-full flex-col items-start gap-1">
              <p className="w-full text-[26px] leading-[34px] font-semibold tracking-[-0.52px] text-[var(--cmd-text-primary)]">2024</p>
              <p className="w-full text-[20px] leading-[30px] tracking-[-0.1px] text-[var(--cmd-text-secondary)]">{t("→ Present")}</p>
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("DISCIPLINES")}</p>
            <div className={OV_LIST}>
              {["Product Design", "Design System", "UX Research"].map((d) => (
                <p key={d} className="w-full">
                  {t(d)}
                </p>
              ))}
            </div>
          </div>
          <div className={`${OV_COL} ${OV_RULE}`}>
            <p className={OV_LABEL}>{t("RESPONSIBILITIES")}</p>
            <div className={OV_LIST}>
              {["GenHub Discovery", "Mini apps", "VIC library"].map((d) => (
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
              <img src={`${A}/tool-lottie.png`} alt="LottieFiles" className="block size-14 shrink-0 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Our Vision (272:14726) ───────────────────────── */

type Piece = {
  f: string;
  x: number;
  y: number;
  w: number;
  h: number;
  blend?: "multiply" | "screen";
  /** Rotated/skewed inner layer: [rotateDeg, skewXDeg, innerW, innerH]. */
  rot?: [number, number, number, number];
  /** Vector stroke overflow (inset in %): [vertical, horizontal]. */
  bleed?: [number, number];
};

/* Mascot "Layer 1" (282:15074), positions inside the 538.8×360 "Logo — vOps" box. */
const BODY: Piece[] = [
  { f: "614bf", x: 36.71, y: 154.85, w: 67.685, h: 98.35 },
  { f: "a99f9", x: 36.71, y: 154.85, w: 67.685, h: 98.35, blend: "multiply" },
  { f: "74177", x: 57.94, y: 197.83, w: 20.358, h: 47.545, blend: "multiply" },
  { f: "9f351", x: 46.66, y: 208.79, w: 13.364, h: 30.078, blend: "screen" },
  { f: "32343", x: 60.91, y: 163.9, w: 19.168, h: 15.715, blend: "screen" },
  { f: "a0d2d", x: 116.68, y: 25.31, w: 289.846, h: 295.235 },
  { f: "3e509", x: 116.68, y: 25.31, w: 289.846, h: 295.235, blend: "multiply" },
  { f: "c88a5", x: 312.82, y: 51.85, w: 10.142, h: 33.517 },
  { f: "a17a4", x: 123.1, y: 177.73, w: 277.042, h: 136.508, blend: "multiply" },
  { f: "e0bf6", x: 157.57, y: 140.49, w: 208.34, h: 109.941 },
  { f: "8a1f5", x: 153.32, y: 140.56, w: 216.027, h: 117.489, blend: "screen" },
  { f: "c0496", x: 153.74, y: 136.68, w: 216.027, h: 117.489, blend: "multiply" },
  { f: "e4be5", x: 184.38, y: 159.48, w: 60.314, h: 66.844, rot: [-84.34, 0.19, 61.96, 54.453] },
  { f: "79239", x: 167.27, y: 31.09, w: 154.375, h: 81.398, blend: "screen" },
  { f: "e98c7", x: 146.89, y: 49.29, w: 149.905, h: 99.383, blend: "screen" },
  { f: "0c1f8", x: 328.41, y: 106.92, w: 42.841, h: 29.339, blend: "screen" },
  { f: "1b84b", x: 287.1, y: 183.28, w: 45.336, h: 34.028, bleed: [4.44, 3.33] },
];

/* Waving hand "Group 1000004683" (282:15113). */
const HAND: Piece[] = [
  { f: "a5688", x: 390.36, y: 224.99, w: 65.531, h: 64.623, rot: [-27.84, 1.12, 47.644, 48.389] },
  { f: "24ad1", x: 390.36, y: 224.99, w: 65.531, h: 64.623, blend: "multiply", rot: [-27.84, 1.12, 47.644, 48.389] },
  { f: "b76ac", x: 400.62, y: 224.69, w: 99.636, h: 105.464, rot: [-28.3, 0.28, 67.908, 83.379] },
  { f: "6950f", x: 400.62, y: 224.69, w: 99.636, h: 105.464, blend: "multiply", rot: [-28.3, 0.28, 67.908, 83.379] },
  { f: "97f57", x: 447.32, y: 246.77, w: 32.442, h: 47.369, blend: "screen", rot: [-30.98, -4.33, 14.474, 44.649] },
  { f: "caaf8", x: 444.14, y: 244.82, w: 35.112, h: 53.08, blend: "screen", rot: [-22.98, 1.02, 15.377, 51.531] },
];

function MascotPiece({ p }: { p: Piece }) {
  const src = `${A}/vision/${p.f}.svg`;
  const box: CSSProperties = { left: p.x, top: p.y, width: p.w, height: p.h, mixBlendMode: p.blend };
  if (p.rot) {
    const [r, s, w, h] = p.rot;
    return (
      <div className="absolute flex items-center justify-center" style={box}>
        <div className="relative flex-none" style={{ width: w, height: h, transform: `rotate(${r}deg) skewX(${s}deg)` }}>
          <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>
    );
  }
  if (p.bleed) {
    const [v, hz] = p.bleed;
    return (
      <div className="absolute" style={box}>
        <img src={src} alt="" className="absolute block max-w-none" style={{ inset: `-${v}% -${hz}%` }} />
      </div>
    );
  }
  return (
    <div className="absolute" style={box}>
      <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
    </div>
  );
}

function VopsMascot() {
  const t = useT();
  return (
    <div className="relative h-[360px] w-[538.8px] shrink-0" role="img" aria-label={t("vOps mascot waving")}>
      <div className="vin-bob absolute inset-0">
        <div className="vin-squash absolute inset-0">
          {BODY.map((p) => (
            <MascotPiece key={p.f} p={p} />
          ))}
          <div className="vin-wave absolute inset-0">
            {HAND.map((p) => (
              <MascotPiece key={p.f} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VopsVision() {
  const t = useT();
  const lang = useLang();
  return (
    <section id="wd-vision" className="relative flex flex-col items-start px-[156px] pt-40">
      <div className="relative flex w-full items-center justify-between pl-20">
        <VopsMascot />
        <div className="flex shrink-0 flex-col items-start gap-10">
          <VopsEyebrow label={t("BACKGROUND  ·  PRODUCT VISION")} />
          <p className="w-[797px] text-[44px] leading-[56px] tracking-[-1.1px] text-[#8a8f98]">
            {lang === "vi" ? (
              <>
                {"vOps là nơi làm việc số của Viettel — "}
                <span className="text-[#0a0a0a]">{"chat, danh bạ, hộp thư, tài liệu, lịch và mọi yêu cầu nội bộ gói gọn trong một ứng dụng, "}</span>
                với GenHub AI là cửa ngõ đầu tiên cho mọi nhân viên.
              </>
            ) : (
              <>
                {"vOps is Viettel's digital workplace — "}
                <span className="text-[#0a0a0a]">{"chat, contacts, inbox, documents, calendar and every internal request in one app, "}</span>
                with GenHub AI as the front door for every employee.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── One app, six modules (275:14856) ───────────────────────── */

type SNode = {
  x: number;
  y: number;
  w: number;
  bg: string;
  /** 2px ring (Figma inner shadow spread). */
  ring?: string;
  icon: string;
  kicker: string;
  /** Kicker in vOps red. */
  hot?: boolean;
  title: string;
  count?: string;
  countRed?: boolean;
  desc?: string;
  /** "tree": vertical list with tick connectors; "wrap": flowing pills. */
  list?: "tree" | "wrap";
  /** Items starting with "*" are highlighted (pink pill, red semibold). */
  items?: string[];
  pillBg?: string;
};

const RAIL = "#f0f1f4";
const SCREEN = "#f7f7f8";
const HOT_BG = "#fff4f6";
const GROUP_RING = "#f3c2cc";

const RAIL_X = [53, 299, 545, 791, 1037, 1283];

const NODES: SNode[] = [
  { x: 640, y: 100, w: 280, bg: RAIL, icon: "globe", kicker: "ROOT", title: "vOps · Web", desc: "Viettel Digital Workplace — SSO sign-in" },
  {
    x: 1010,
    y: 100,
    w: 300,
    bg: SCREEN,
    icon: "user",
    kicker: "GLOBAL",
    title: "Account & settings",
    count: "4",
    list: "wrap",
    items: ["Profile", "Configure menu", "Light / Dark", "Sign out"],
  },
  ...(
    [
      ["message", "RAIL", "Chat", ["All · Unread", "Teams", "Channels", "New conversation"]],
      ["users", "RAIL", "Contacts", ["Group directory", "Units & departments", "Search people"]],
      ["grid", "RAIL · HOME", "Discover", ["*Activity feed", "*Mini-app catalogue", "Search"]],
      ["inbox", "RAIL", "Inbox", ["Email", "Incoming documents", "Notifications"]],
      ["file-text", "RAIL", "Documents", ["My documents", "E-signing", "Shared with me"]],
      ["calendar", "RAIL", "Calendar", ["Month · Week · Day", "Meetings", "Room booking"]],
    ] as const
  ).map(([icon, kicker, title, items], i): SNode => {
    const home = title === "Discover";
    return {
      x: RAIL_X[i],
      y: 306,
      w: 224,
      bg: home ? HOT_BG : RAIL,
      ring: home ? RED : undefined,
      hot: home,
      icon,
      kicker,
      title,
      count: String(items.length),
      list: "tree",
      items: [...items],
    };
  }),
  ...(
    [
      ["message", "Chat room", ["Messages & mentions", "Photo & video", "Pinned messages", "Group info"]],
      ["user", "Profile", ["Contact info", "Unit", "Start a chat"]],
      ["bell", "Activity feed", ["Tabs · HR · Admin · Work", "Card actions", "Notifications"]],
      ["mail", "Email detail", ["Reply · Forward", "Attachments", "Archive"]],
      ["file-text", "Document viewer", ["Sign", "Comment", "Share"]],
      ["calendar", "Event detail", ["Join", "Remind me", "Attendees"]],
    ] as const
  ).map(
    ([icon, title, items], i): SNode => ({
      x: RAIL_X[i],
      y: 640,
      w: 224,
      bg: SCREEN,
      icon,
      kicker: "SCREEN",
      title,
      count: String(items.length),
      list: "tree",
      items: [...items],
    }),
  ),
  {
    x: 640,
    y: 960,
    w: 280,
    bg: HOT_BG,
    ring: RED,
    hot: true,
    icon: "grid",
    kicker: "HUB",
    title: "App catalogue",
    count: "4",
    desc: "27+ self-service apps, grouped by owner",
    list: "tree",
    items: ["*HR · 12", "*Admin · 10", "*Utilities · 5", "*Media"],
  },
  {
    x: 53,
    y: 1300,
    w: 360,
    bg: "#fff",
    ring: GROUP_RING,
    hot: true,
    icon: "users-red",
    kicker: "MINI-APP GROUP",
    title: "HR",
    count: "12",
    countRed: true,
    list: "wrap",
    pillBg: HOT_BG,
    items: [
      "Personal info",
      "My income",
      "Check-in / out",
      "Time off",
      "Duty roster",
      "Assets",
      "Tax deductions",
      "Social insurance payment",
      "Social insurance book",
      "Health insurance",
      "Resignation",
      "Relatives' health insurance",
    ],
  },
  {
    x: 433,
    y: 1300,
    w: 360,
    bg: "#fff",
    ring: GROUP_RING,
    hot: true,
    icon: "briefcase",
    kicker: "MINI-APP GROUP",
    title: "Admin",
    count: "10",
    countRed: true,
    list: "wrap",
    pillBg: HOT_BG,
    items: [
      "Meals",
      "Car booking",
      "Medical",
      "IT support",
      "Vehicle transfer",
      "Food inspection",
      "Vehicle maintenance",
      "Discipline & conduct",
      "Admin inspection",
      "Goods in / out",
    ],
  },
  {
    x: 813,
    y: 1300,
    w: 330,
    bg: "#fff",
    ring: GROUP_RING,
    hot: true,
    icon: "settings",
    kicker: "MINI-APP GROUP",
    title: "Utilities",
    count: "5",
    countRed: true,
    list: "wrap",
    pillBg: HOT_BG,
    items: ["Mail groups", "Conference check-in", "Delegation checklist", "Travel abroad", "SKYT"],
  },
  { x: 1163, y: 1300, w: 344, bg: "#fff", ring: GROUP_RING, hot: true, icon: "volume", kicker: "MINI-APP GROUP", title: "Media", desc: "Internal news and announcements" },
];

const T14 = "text-[14px] leading-5 whitespace-nowrap";

function SitemapNode({ n }: { n: SNode }) {
  const tr = useT();
  const inner = n.w - 32;
  return (
    <div
      className="vin-node absolute flex flex-col items-start gap-[14px] rounded-[18px] p-4"
      style={{ left: n.x, top: n.y, width: n.w, background: n.bg, boxShadow: n.ring ? `0 0 0 2px ${n.ring}` : undefined }}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center justify-center rounded-[10px] bg-white p-2">
            <img src={`${A}/icons/${n.icon}.svg`} alt="" className="block size-5" />
          </div>
          <div className="flex flex-col items-start whitespace-nowrap">
            <p className="text-[14px] leading-5" style={{ color: n.hot ? RED : "#8a8f98" }}>
              {tr(n.kicker)}
            </p>
            <p className="text-[18px] leading-[1.4] font-semibold text-[#0a0a0a]">{tr(n.title)}</p>
          </div>
        </div>
        {n.count ? (
          <div className="flex shrink-0 items-start rounded-full px-2 py-px" style={{ background: n.countRed ? "#ffe8ec" : "#fff" }}>
            <p className={T14} style={{ color: n.countRed ? "#b30026" : "#8a8f98" }}>
              {n.count}
            </p>
          </div>
        ) : null}
      </div>
      {n.desc ? (
        <p className="text-[14px] leading-5 text-[#8a8f98]" style={{ width: inner }}>
          {tr(n.desc)}
        </p>
      ) : null}
      {n.list === "tree" && n.items ? (
        <div className="relative flex w-full flex-col items-start gap-1">
          <div className="absolute top-0 left-[7px] w-px bg-[#c4c7cd]" style={{ height: (n.items.length - 1) * 36 + 16 }} />
          {n.items.map((raw) => {
            const hot = raw.startsWith("*");
            const t = hot ? raw.slice(1) : raw;
            return (
              <div key={t} className="flex w-full items-start">
                <div className="relative h-8 w-5 shrink-0">
                  <div className="absolute top-4 left-[7px] h-px w-[11px] bg-[#c4c7cd]" />
                </div>
                <div className="flex min-w-px flex-1 items-start rounded-[8px] px-2.5 py-1.5" style={{ background: hot ? "#ffd6de" : "#fff" }}>
                  <p className={hot ? `${T14} font-semibold` : T14} style={{ color: hot ? RED : "#4b4f58" }}>
                    {tr(t)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {n.list === "wrap" && n.items ? (
        <div className="flex flex-wrap content-start items-start gap-1.5" style={{ width: inner }}>
          {n.items.map((t) => (
            <div key={t} className="flex shrink-0 items-start rounded-[8px] px-2.5 py-1.5" style={{ background: n.pillBg ?? "#fff" }}>
              <p className={`${T14} text-[#4b4f58]`}>{tr(t)}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Chevron arrowhead whose tip sits at (x, y), pointing down. */
const head = (x: number, y: number, k: number) => `M${x - k} ${y - k}L${x} ${y}L${x + k} ${y - k}`;

/** Connectors (Figma "Link" / "Link — home path" vectors), drawn under the nodes. */
function SitemapLinks() {
  const grey = [
    "M920 140.5H1010",
    "M165 262.5H1395",
    ...[165, 411, 903, 1149, 1395].map((x) => `M${x + 0.5} 262V306`),
    "M165.5 537V640",
    ...[411, 903, 1149, 1395].map((x) => `M${x + 0.5} 501V640`),
  ];
  const greyHeads = [[165.5, 640] as const, ...[411, 903, 1149, 1395].map((x) => [x + 0.5, 640] as const)];
  const red = [
    "M780 231V254A8 8 0 0 1 772 262H665A8 8 0 0 0 657 270V306",
    "M657 501V640",
    "M749 501V513A8 8 0 0 0 757 521H772A8 8 0 0 1 780 529V960",
    "M780 1245V1260",
    "M233 1260H1335",
    ...[233, 613, 978, 1335].map((x) => `M${x} 1260V1300`),
  ];
  const redHeads = [[657, 306], [657, 640], [780, 960], ...[233, 613, 978, 1335].map((x) => [x, 1300])] as [number, number][];
  return (
    <svg className="pointer-events-none absolute top-0 left-0" width={W0} height={H0} viewBox={`0 0 ${W0} ${H0}`} fill="none" aria-hidden>
      <g stroke="#8a8f98" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
        {grey.map((d) => (
          <path key={d} d={d} />
        ))}
        {greyHeads.map(([x, y]) => (
          <path key={`h${x}`} d={head(x, y, 3.18)} />
        ))}
      </g>
      <g stroke={RED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {red.map((d) => (
          <path key={d} d={d} />
        ))}
        {redHeads.map(([x, y]) => (
          <path key={`h${x}-${y}`} d={head(x, y, 6.36)} />
        ))}
      </g>
    </svg>
  );
}

/** The diagram layer: 1560×1622, Figma canvas coordinates. */
function SitemapDiagram() {
  const t = useT();
  return (
    <div className="relative" style={{ width: W0, height: H0 }}>
      <SitemapLinks />
      {NODES.map((n) => (
        <SitemapNode key={`${n.title}-${n.y}`} n={n} />
      ))}
      {/* Fan-out badge */}
      <div className="absolute flex items-start rounded-full bg-[#0a0a0a] px-2.5 py-0.5" style={{ left: 735.5, top: 219 }}>
        <p className={`${T14} text-white`}>{t("6 modules")}</p>
      </div>
    </div>
  );
}

function SitemapLegend() {
  const t = useT();
  const keys: { label: string; mark: CSSProperties }[] = [
    { label: "Home path", mark: { width: 18, height: 2, background: RED } },
    { label: "Navigation", mark: { width: 18, height: 1, background: "#8a8f98" } },
    { label: "Rail module", mark: { width: 12, height: 12, borderRadius: 4, background: "#e9ebf0" } },
    { label: "Screen", mark: { width: 12, height: 12, borderRadius: 4, background: "#f7f7f8" } },
    { label: "Mini-app group", mark: { width: 12, height: 12, borderRadius: 4, background: "#ffd6de" } },
  ];
  return (
    <div className="flex items-center gap-[18px] rounded-full bg-[var(--cmd-surface-2)] px-3.5 py-2">
      {keys.map((k) => (
        <div key={k.label} className="flex items-center gap-2">
          <span className="block shrink-0" style={k.mark} />
          <p className={`${T14} text-[#4b4f58]`}>{t(k.label)}</p>
        </div>
      ))}
    </div>
  );
}

/* Viewer: same behaviour as the SAPP user flow (inline zoom-out, full-view popup with pan / zoom). */
const W0 = 1560;
const H0 = 1622;
const MIN_Z = 0.5;
const MAX_Z = 3;
const STEP = 0.25;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, Math.round(z * 100) / 100));
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="block">
      <path d={d} fill="#4B4F58" />
    </svg>
  );
}

const MINUS = "M16.25 9.375C16.5952 9.375 16.875 9.65482 16.875 10C16.875 10.3452 16.5952 10.625 16.25 10.625H3.75C3.40482 10.625 3.125 10.3452 3.125 10C3.125 9.65482 3.40482 9.375 3.75 9.375H16.25Z";
const PLUS =
  "M10 3.125C10.3452 3.125 10.625 3.40482 10.625 3.75V9.375H16.25C16.5952 9.375 16.875 9.65482 16.875 10C16.875 10.3452 16.5952 10.625 16.25 10.625H10.625V16.25C10.625 16.5952 10.3452 16.875 10 16.875C9.65482 16.875 9.375 16.5952 9.375 16.25V10.625H3.75C3.40482 10.625 3.125 10.3452 3.125 10C3.125 9.65482 3.40482 9.375 3.75 9.375H9.375V3.75C9.375 3.40482 9.65482 3.125 10 3.125Z";
const MAXIMIZE =
  "M8.084 10.867C8.37382 10.5771 8.84323 10.5771 9.13305 10.867C9.42286 11.1568 9.42286 11.6262 9.13305 11.916L4.36977 16.6793H8.1447C8.55456 16.6793 8.88664 17.0113 8.88664 17.4212C8.88664 17.8311 8.55456 18.1631 8.1447 18.1631H2.57879C2.16893 18.1631 1.83685 17.8311 1.83685 17.4212V11.8553C1.83685 11.4454 2.16893 11.1134 2.57879 11.1134C2.98865 11.1134 3.32073 11.4454 3.32073 11.8553V15.6302L8.084 10.867ZM18.1631 8.1447C18.1631 8.55456 17.8311 8.88664 17.4212 8.88664C17.0113 8.88664 16.6793 8.55456 16.6793 8.1447V4.36977L11.916 9.13305C11.6262 9.42286 11.1568 9.42286 10.867 9.13305C10.5771 8.84323 10.5771 8.37382 10.867 8.084L15.6302 3.32073H11.8553C11.4454 3.32073 11.1134 2.98865 11.1134 2.57879C11.1134 2.16893 11.4454 1.83685 11.8553 1.83685H17.4212C17.8311 1.83685 18.1631 2.16893 18.1631 2.57879V8.1447Z";
const CLOSE =
  "M15.4419 4.55806C15.686 4.80214 15.686 5.19786 15.4419 5.44194L10.8839 10L15.4419 14.5581C15.686 14.8021 15.686 15.1979 15.4419 15.4419C15.1979 15.686 14.8021 15.686 14.5581 15.4419L10 10.8839L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L9.11612 10L4.55806 5.44194C4.31398 5.19786 4.31398 4.80214 4.55806 4.55806C4.80214 4.31398 5.19786 4.31398 5.44194 4.55806L10 9.11612L14.5581 4.55806C14.8021 4.31398 15.1979 4.31398 15.4419 4.55806Z";

/** Figma "Zoom Control" (297:15268). */
function ZoomPill({
  pct,
  onOut,
  onIn,
  onFit,
  outDisabled,
  inDisabled,
  fitLabel,
}: {
  pct: number;
  onOut: () => void;
  onIn: () => void;
  onFit: () => void;
  outDisabled?: boolean;
  inDisabled?: boolean;
  fitLabel: string;
}) {
  const t = useT();
  return (
    <div className="relative flex items-center gap-0.5 rounded-full bg-[var(--cmd-surface-2)] p-1 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <button type="button" aria-label={t("Zoom out")} title={t("Zoom out")} disabled={outDisabled} onClick={onOut} className="vin-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <Icon d={MINUS} />
      </button>
      <span aria-live="polite" className="flex h-9 w-14 shrink-0 items-center justify-center text-[14px] leading-5 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)] tabular-nums">
        {Math.round(pct)}%
      </span>
      <button type="button" aria-label={t("Zoom in")} title={t("Zoom in")} disabled={inDisabled} onClick={onIn} className="vin-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-3)]">
        <Icon d={PLUS} />
      </button>
      <span aria-hidden className="h-5 w-px shrink-0 bg-[var(--cmd-text-muted)]" />
      <button type="button" aria-label={fitLabel} title={fitLabel} onClick={onFit} className="vin-zbtn flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full">
        <Icon d={MAXIMIZE} />
      </button>
    </div>
  );
}

type Rect = { x: number; y: number; w: number; h: number };
type Popup = { host: HTMLElement; fixed: boolean; zoom: number };

/** Rect of `el` in the unscaled coordinate space of `host` (the window may be CSS-scaled). */
function localRect(el: HTMLElement, host: HTMLElement, fixed: boolean): Rect {
  const r = el.getBoundingClientRect();
  if (fixed) return { x: r.left, y: r.top, w: r.width, h: r.height };
  const hr = host.getBoundingClientRect();
  const k = host.offsetWidth ? hr.width / host.offsetWidth : 1;
  return { x: (r.left - hr.left) / k, y: (r.top - hr.top) / k, w: r.width / k, h: r.height / k };
}

function VopsModules() {
  const t = useT();
  const clipRef = useRef<HTMLDivElement>(null);
  const [inline, setInline] = useState(1);
  const [popup, setPopup] = useState<Popup | null>(null);

  const open = useCallback((zoom: number) => {
    const clip = clipRef.current;
    if (!clip) return;
    const win = clip.closest<HTMLElement>("[data-window]");
    setPopup({ host: win ?? document.body, fixed: !win, zoom });
  }, []);

  const origin = useCallback((): Rect | null => {
    const clip = clipRef.current;
    if (!clip || !popup) return null;
    return localRect(clip, popup.host, popup.fixed);
  }, [popup]);

  const s = inline;
  const tx = (W0 - W0 * s) / 2;
  const ty = (H0 - H0 * s) / 2;

  return (
    <section id="wd-modules" className="relative flex flex-col items-start gap-10 px-[156px] pt-[100px]">
      <div className="flex flex-col items-start gap-4">
        <VopsEyebrow label={t("BACKGROUND  ·  ECOSYSTEM")} />
        <VopsHeading>{t("One app, six modules")}</VopsHeading>
      </div>
      <p className="w-[900px] text-[20px] leading-[1.5] text-[var(--cmd-text-secondary)]">
        {t("The vOps sitemap on the web: six modules on the left rail, a detail screen behind each, and Discover as home — where the catalogue opens into four groups of mini apps.")}
      </p>

      {/* Sitemap Canvas (297:14889) */}
      <div className="wd-hover relative h-[1622px] w-full shrink-0 rounded-[32px] bg-[var(--cmd-surface-1)] shadow-[6px_6px_0_0_rgba(103,152,255,0.32),inset_0_1px_0_0_var(--cmd-edge)]">
        <div
          ref={clipRef}
          role="button"
          tabIndex={0}
          aria-label={t("Open the vOps sitemap in full view")}
          onClick={() => open(1)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open(1);
            }
          }}
          className="absolute inset-0 cursor-zoom-in overflow-hidden rounded-[32px]"
        >
          <div
            className="absolute top-0 left-0"
            style={{ transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${s})`, transition: `transform 420ms ${EASE}` }}
          >
            <SitemapDiagram />
          </div>
        </div>
        <div className="pointer-events-none absolute top-7 left-1/2 flex w-[1500px] -translate-x-1/2 items-center justify-between">
          <SitemapLegend />
          <div className="pointer-events-auto">
            <ZoomPill
              pct={inline * 100}
              outDisabled={inline <= MIN_Z}
              onOut={() => setInline((z) => Math.max(MIN_Z, z - STEP))}
              onIn={() => open(1)}
              onFit={() => (inline < 1 ? setInline(1) : open(1))}
              fitLabel={inline < 1 ? t("Reset zoom") : t("Open full view")}
            />
          </div>
        </div>
      </div>

      {popup
        ? createPortal(<SitemapPopup fixed={popup.fixed} initialZoom={popup.zoom} getOrigin={origin} onClosed={() => setPopup(null)} />, popup.host)
        : null}
    </section>
  );
}

type View = { z: number; x: number; y: number };

/** The popup is portalled outside `.work-detail`, so it carries the light case-study tokens itself. */
const POPUP_TOKENS = {
  "--cmd-surface-1": "#ffffff",
  "--cmd-surface-2": "#f0f1f3",
  "--cmd-surface-3": "#e4e6ea",
  "--cmd-text-primary": "#0a0a0a",
  "--cmd-text-secondary": "#4b4f58",
  "--cmd-text-muted": "#8a8f98",
  "--cmd-edge": "rgba(10, 10, 10, 0.04)",
} as CSSProperties;

function SitemapPopup({
  fixed,
  initialZoom,
  getOrigin,
  onClosed,
}: {
  fixed: boolean;
  initialZoom: number;
  getOrigin: () => Rect | null;
  onClosed: () => void;
}) {
  const t = useT();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const portRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const geo = useRef({ w: 0, h: 0, fit: 1 });
  const drag = useRef<{ id: number; sx: number; sy: number; vx: number; vy: number } | null>(null);

  const [port, setPort] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View>({ z: clampZ(initialZoom), x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const fit = port.w && port.h ? Math.min((port.w - 64) / W0, (port.h - 64) / H0) : 0;

  useEffect(() => {
    geo.current = { w: port.w, h: port.h, fit };
  }, [port, fit]);

  const clampView = useCallback((v: View): View => {
    const { w, h, fit: f } = geo.current;
    const sc = f * v.z;
    const mx = Math.max(0, (W0 * sc - w) / 2 + 32);
    const my = Math.max(0, (H0 * sc - h) / 2 + 32);
    return { z: v.z, x: Math.min(mx, Math.max(-mx, v.x)), y: Math.min(my, Math.max(-my, v.y)) };
  }, []);

  /** Zoom to `z`, keeping the point (cx, cy) — relative to the viewport centre — still. */
  const zoomTo = useCallback(
    (z: number, cx = 0, cy = 0) => {
      setView((v) => {
        const z2 = clampZ(z);
        const k = z2 / v.z;
        return clampView({ z: z2, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      });
    },
    [clampView],
  );

  useEffect(() => {
    const el = portRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPort({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Open: overlay fades in, panel grows out of the in-page canvas.
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    closeRef.current?.focus({ preventScroll: true });
    if (reduced()) return;
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    const o = getOrigin();
    if (!o) return;
    const k = o.w / panel.offsetWidth;
    const from = `translate(${o.x - panel.offsetLeft}px, ${o.y - panel.offsetTop}px) scale(${k})`;
    panel.animate(
      [
        { transform: from, opacity: 0.4 },
        { transform: "none", opacity: 1 },
      ],
      { duration: 460, easing: EASE },
    );
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const o = getOrigin();
    if (!overlay || !panel || !o || reduced()) {
      onClosed();
      return;
    }
    const k = o.w / panel.offsetWidth;
    const to = `translate(${o.x - panel.offsetLeft}px, ${o.y - panel.offsetTop}px) scale(${k})`;
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease-in", fill: "forwards" });
    const a = panel.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: to, opacity: 0 },
      ],
      { duration: 340, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
    );
    a.onfinish = () => onClosed();
  }, [getOrigin, onClosed]);

  // Esc closes the popup only — captured before the desktop's Esc-closes-window handler.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      e.preventDefault();
      close();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [close]);

  // Wheel never reaches the page: ctrl/⌘ + wheel zooms at the cursor, plain wheel pans.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const el = portRef.current;
      if (!el || !el.contains(e.target as Node)) return;
      const r = el.getBoundingClientRect();
      const k = el.clientWidth ? r.width / el.clientWidth : 1;
      if (e.ctrlKey || e.metaKey) {
        const cx = (e.clientX - r.left) / k - el.clientWidth / 2;
        const cy = (e.clientY - r.top) / k - el.clientHeight / 2;
        setView((v) => {
          const z2 = clampZ(v.z * Math.exp(-e.deltaY * 0.0015));
          const f = z2 / v.z;
          return clampView({ z: z2, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f });
        });
      } else {
        setView((v) => clampView({ z: v.z, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    overlay.addEventListener("wheel", onWheel, { passive: false });
    return () => overlay.removeEventListener("wheel", onWheel);
  }, [clampView]);

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y };
    setDragging(true);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const r = e.currentTarget.getBoundingClientRect();
    const k = e.currentTarget.clientWidth ? r.width / e.currentTarget.clientWidth : 1;
    const nx = d.vx + (e.clientX - d.sx) / k;
    const ny = d.vy + (e.clientY - d.sy) / k;
    setView((v) => clampView({ z: v.z, x: nx, y: ny }));
  };
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
  };

  const sc = fit * view.z;
  const canPan = W0 * sc > port.w || H0 * sc > port.h;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("vOps sitemap")}
      className={`${fixed ? "fixed" : "absolute"} inset-0 z-[80] bg-[rgba(10,10,10,0.55)]`}
      style={POPUP_TOKENS}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        className="absolute inset-10 flex flex-col overflow-hidden rounded-[32px] bg-[var(--cmd-surface-1)] shadow-[0_30px_80px_-20px_rgba(10,10,10,0.45),inset_0_1px_0_0_var(--cmd-edge)]"
        style={{ transformOrigin: "0 0" }}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between gap-6 pr-5 pl-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="size-[7px] shrink-0 rounded-full" style={{ background: RED }} />
            <p className="text-[18px] leading-6 font-semibold whitespace-nowrap text-[var(--cmd-text-primary)]">{t("One app, six modules")}</p>
            <p className="text-[14px] leading-5 whitespace-nowrap text-[var(--cmd-text-muted)]">{t("Drag to pan · Ctrl / ⌘ + scroll to zoom")}</p>
          </div>
          <div className="flex items-center gap-3">
            <SitemapLegend />
            <ZoomPill
              pct={view.z * 100}
              outDisabled={view.z <= MIN_Z}
              inDisabled={view.z >= MAX_Z}
              onOut={() => zoomTo(view.z - STEP)}
              onIn={() => zoomTo(view.z + STEP)}
              onFit={() => setView({ z: 1, x: 0, y: 0 })}
              fitLabel={t("Fit to screen")}
            />
            <button
              ref={closeRef}
              type="button"
              aria-label={t("Close")}
              title={t("Close (Esc)")}
              onClick={close}
              className="vin-zbtn flex size-11 cursor-pointer items-center justify-center rounded-full bg-[var(--cmd-surface-2)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
            >
              <Icon d={CLOSE} />
            </button>
          </div>
        </div>
        <div
          ref={portRef}
          className={`relative mx-5 mb-5 min-h-0 flex-1 touch-none overflow-hidden rounded-[20px] bg-[var(--cmd-surface-1)] select-none ${
            canPan ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
          }`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onDoubleClick={() => zoomTo(view.z < 1.5 ? 2 : 1)}
        >
          {fit ? (
            <div
              className="pointer-events-none absolute top-1/2 left-1/2"
              style={{
                width: W0,
                height: H0,
                transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${sc})`,
                transition: dragging ? "none" : `transform 260ms ${EASE}`,
                willChange: dragging ? "transform" : undefined,
              }}
            >
              <SitemapDiagram />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
