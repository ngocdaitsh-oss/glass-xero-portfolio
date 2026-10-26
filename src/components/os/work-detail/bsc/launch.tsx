"use client";

import "./bsc-launch.css";
import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { scrollToChild, useFrameThrottle } from "@/lib/scroll";
import { Reveal } from "../../reveal";
import { BscEyebrow, BscHeading } from "./parts";
import { useT } from "@/lib/i18n";

const A = "/figma/bsc/launch";

/** Raster image below the fold: always lazy + async decode. */
function Img({ src, className = "", style }: { src: string; className?: string; style?: CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      src={src}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none block max-w-none select-none ${className}`}
      style={style}
    />
  );
}

/* ================================================================== */
/* Head + Flow Index (223:14108 / 223:14115)                            */
/* ================================================================== */

const FLOW = ["01  Home page", "02  Mega menu", "03  Trading platform", "04  Stockbroker", "05  Finance service", "06  Financial report"];

function FlowIndex() {
  const t = useT();
  const go = (index: number) => (event: MouseEvent<HTMLButtonElement>) => {
    const root = event.currentTarget.closest(".work-detail.reveal-root");
    if (root instanceof HTMLElement) scrollToChild(root, document.getElementById(`wd-launch-${index + 1}`), 40);
  };
  return (
    <div className="flex w-full flex-wrap items-start gap-2">
      {FLOW.map((label, index) => (
        <button
          key={label}
          type="button"
          onClick={go(index)}
          className="bscl-chip wd-hover flex cursor-pointer items-center rounded-full bg-[var(--cmd-surface-1)] px-3 py-1.5 text-base leading-6 tracking-[-0.2px] whitespace-pre text-[var(--cmd-text-primary)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
        >
          {t(label)}
        </button>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Stages (223:14130): flex column, gap 140, py 40                      */
/* ================================================================== */

/** Stage "Copy": SemiBold 32/40 brand title + 16/24 secondary lead, centred, 720 wide. */
function StageCopy({ title, children }: { title: string; children: string }) {
  const t = useT();
  return (
    <Reveal className="flex flex-col items-center gap-3">
      <p className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap text-[var(--brand-bsc)]">{t(title)}</p>
      <p className="w-[720px] text-center text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(children)}</p>
    </Reveal>
  );
}

const STAGES = [
  {
    title: "Home Page",
    img: "ui-home",
    w: 1200,
    h: 1080,
    copy: "Simple, intuitive, not too complicated, yet it meets every interface requirement — investment opportunities, news, partners and quick account opening on one page.",
  },
  {
    title: "Mega Menu",
    img: "ui-mega",
    w: 1100,
    h: 710,
    copy: "A modern, intuitive menu with a white background, dark text and clearly illustrated icons. The neat layout and hierarchy make information easy to find, and the blue–yellow scheme reads professional and reliable.",
  },
  {
    title: "Trading Platform",
    img: "ui-trading",
    w: 1500,
    h: 365,
    copy: "An overview of BSC's stock investment utilities and applications — users quickly grasp what each platform provides and the benefits of using it.",
  },
  {
    title: "Stockbroker",
    img: "ui-broker",
    w: 1000,
    h: 1186,
    copy: "Information about BSC's reputable brokers in a minimalist style, with soft transitional colour effects and 3D financial images that keep it friendly without feeling constrained.",
  },
  {
    title: "Finance Service",
    img: "ui-finance",
    w: 1000,
    h: 1252,
    copy: "The 3D visual key continues across the website; combined with real photography it creates contrast and varies the layout, directly expressing what BSC wants to offer.",
  },
] as const;

/** Stages 01–05: copy above one raster composite (IMG/ui_*). */
function ImageStage({ index }: { index: number }) {
  const s = STAGES[index];
  return (
    <div id={`wd-launch-${index + 1}`} className="flex flex-col items-center gap-12">
      <StageCopy title={s.title}>{s.copy}</StageCopy>
      <Reveal className="bscl-shot" enter={80}>
        <div className="wd-hover relative" style={{ width: s.w, height: s.h }}>
          <Img src={`${A}/${s.img}.webp`} className="absolute inset-0 size-full object-cover" />
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Stage 06 — Financial Report: iPad Pro (Landscape) rows ---------- */

const SCREEN_H = 429;

/** Each screen's long page: Figma crop as height % and top % of the 571×429 screen. */
type Page = { src: string; h: number; top: number };
const ROW_1: Page[] = [
  { src: "report-0", h: 329.76, top: -106.07 },
  { src: "report-1", h: 294.98, top: -12.07 },
  { src: "report-2", h: 315.95, top: -35.74 },
  { src: "report-3", h: 400.57, top: -92.55 },
];
const ROW_2: Page[] = [
  // object-cover of the same 1142×3437 page: centred vertically.
  { src: "report-3", h: 400.57, top: -(400.57 - 100) / 2 },
  { src: "report-4", h: 367.37, top: -35.82 },
  { src: "report-5", h: 219.7, top: -12.38 },
];

const statusText = "absolute text-[6.271px] leading-[normal] font-semibold tracking-[-0.1254px] text-white";

/** Figma "Devices / Apple / iPad Pro (Landscape)" 594.873×451.903. */
function IPad({ page }: { page: Page }) {
  const h = (page.h * SCREEN_H) / 100;
  const top = (page.top * SCREEN_H) / 100;
  // Hover scrolls the page from its Figma crop down to its last screen.
  const dy = SCREEN_H - h - top;
  const vars = {
    "--bscl-dy": `${dy.toFixed(1)}px`,
    "--bscl-t": `${Math.max(1.2, Math.abs(dy) / 420).toFixed(2)}s`,
  } as CSSProperties;
  return (
    <Reveal className="bscl-ipad shrink-0" enter={60}>
      <div className="bscl-device relative h-[451.903px] w-[594.873px]" style={vars}>
        <div
          className="absolute top-[3.76px] left-[3.76px] h-[448.141px] w-[591.111px] rounded-[20.902px] border-[2.508px] border-solid border-[#d7d7d7]"
          style={{ backgroundImage: "linear-gradient(148.57deg, rgb(43, 43, 43) 5.448%, rgb(0, 0, 0) 54.636%)" }}
        />
        <div className="absolute top-[13.3px] left-[14px] h-[429px] w-[571px] overflow-hidden rounded-[14.213px]">
          <Img src={`${A}/${page.src}.webp`} className="bscl-page absolute left-0 w-full" style={{ top, height: h }} />
        </div>
        <div className="absolute top-[433.51px] left-[250.41px] h-[2.09px] w-[97.822px] rounded-[41.804px] bg-white" />
        <p className={`${statusText} top-[18.81px] left-[23.83px] w-[26.337px]`}>9:41 AM</p>
        <p className={`${statusText} top-[18.81px] left-[551.82px] w-[22.574px] -translate-x-1/2 text-center`}>100%</p>
        <Img src={`${A}/battery.svg`} className="absolute top-[20.2px] left-[562.4px] h-[4.738px] w-[10.17px]" />
        <Img src={`${A}/wifi.svg`} className="absolute top-[20.2px] left-[533.84px] h-[4.598px] w-[6.41px]" />
        {/* Screen Shine: white→clear (normal blend of white equals Figma's screen blend). */}
        <div
          className="pointer-events-none absolute top-[13.8px] left-[13.8px] h-[428.075px] w-[571.463px] rounded-[14.213px]"
          style={{ backgroundImage: "linear-gradient(160.86deg, rgba(255, 255, 255, 0.25) 0.675%, rgba(255, 255, 255, 0) 38.684%)" }}
        />
        {/* Hardware */}
        <div className="absolute top-0 left-[77.76px] h-[1.254px] w-[24.246px] rounded-t-[0.627px] bg-black opacity-50" />
        <div className="absolute top-0 left-[45.57px] h-[1.254px] w-[24.246px] rounded-t-[0.627px] bg-black opacity-50" />
        <div className="absolute top-[45.57px] left-0 h-[24.246px] w-[1.254px] rounded-l-[0.627px] bg-black opacity-50" />
        <Img src={`${A}/camera.svg`} className="absolute top-[225.32px] left-[6.27px] size-[5.016px]" />
      </div>
    </Reveal>
  );
}

/** Max sideways drift of each row, design px, as the stage crosses the viewport. */
const DRIFT = 70;

function ReportStage() {
  const host = useRef<HTMLDivElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);

  const update = useFrameThrottle(() => {
    const el = host.current;
    const root = el?.closest(".reveal-root");
    if (!el || !(root instanceof HTMLElement)) return;
    const port = root.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    if (box.bottom < port.top - 200 || box.top > port.bottom + 200 || port.height < 32) return;
    // 0 when the rows are centred in the scrollport (the Figma position), ±1 at the edges.
    const p = Math.max(-1, Math.min(1, (box.top + box.height / 2 - (port.top + port.height / 2)) / port.height));
    if (row1.current) row1.current.style.transform = `translate3d(${(p * DRIFT).toFixed(1)}px,0,0)`;
    if (row2.current) row2.current.style.transform = `translate3d(${(-p * DRIFT).toFixed(1)}px,0,0)`;
  });

  useEffect(() => {
    const root = host.current?.closest(".reveal-root");
    if (!(root instanceof HTMLElement)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <div id="wd-launch-6" className="flex flex-col items-center gap-12">
      <StageCopy title="Financial Report">
        {"Reports are presented as charts built on available code libraries so developers can edit and implement them easily — clear and beautiful without ignoring specialised financial detail."}
      </StageCopy>
      <div ref={host} className="relative h-[939.805px] w-[2499.493px] shrink-0">
        <div ref={row1} className="bscl-row absolute top-0 left-0 flex items-center gap-10">
          {ROW_1.map((page) => (
            <IPad key={page.src} page={page} />
          ))}
        </div>
        <div ref={row2} className="bscl-row absolute top-[487.9px] left-[317.44px] flex items-center gap-10">
          {ROW_2.map((page, i) => (
            <IPad key={`${page.src}-${i}`} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Section — UI For Launch (223:14107, 1872×7675)                       */
/* ================================================================== */

export function BscLaunch() {
  const t = useT();
  return (
    <section id="wd-launch" className="relative flex w-[1872px] flex-col items-start gap-10 overflow-x-clip px-[236px] pt-[140px]">
      <div className="flex w-full flex-col items-start gap-[22px]">
        <Reveal className="flex flex-col items-start gap-4">
          <BscEyebrow label={"FINAL DESIGNS  ·  03.1"} />
          <BscHeading>{t("UI for launch")}</BscHeading>
        </Reveal>
        <Reveal>
          <p className="w-[760px] text-[20px] leading-7 text-[var(--cmd-text-secondary)]">
            {t("Six page families built on the style guide — rounded blocks, BSC gradients and 3D imagery that keep a dense financial site friendly.")}
          </p>
        </Reveal>
      </div>
      <Reveal className="w-full">
        <FlowIndex />
      </Reveal>
      <div className="flex w-full flex-col items-center gap-[140px] py-10">
        {STAGES.map((s, index) => (
          <ImageStage key={s.title} index={index} />
        ))}
        <ReportStage />
      </div>
    </section>
  );
}
