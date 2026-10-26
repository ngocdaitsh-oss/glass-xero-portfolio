/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import "./components.css";
import { useState, type CSSProperties, type ReactNode } from "react";
import { sappBeVietnam, sappPtMono, sappRoboto } from "./fonts";
import { useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { SappLottie } from "./media";
import { SappHeading } from "./parts";

/* Library fonts used inside the SAPP specimens (Figma: Be Vietnam Pro, Roboto, PT Mono). */
const beVietnam = sappBeVietnam;
const roboto = sappRoboto;
const ptMono = sappPtMono;
const FONT_VARS = `${beVietnam.variable} ${roboto.variable} ${ptMono.variable}`;

const BVP = "font-[family-name:var(--font-sapp-bvp)]";
const ROBOTO = "font-[family-name:var(--font-sapp-roboto)]";
const MONO = "font-[family-name:var(--font-sapp-ptmono)] text-[14px] leading-[1.5] tracking-[0.14px] text-[#474747]";

const A = "/figma/sapp/components";

/* ------------------------------------------------------------------ shared */

/** Eyebrow pill (blue accent dot as in Figma 250:15809 / 247:15304). */
function Eyebrow({ label }: { label: string }) {
  return (
    <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <span className="size-[7px] shrink-0 rounded-full bg-[#3d6fe8]" />
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{label}</span>
    </span>
  );
}

/** Card title row: purple diamond glyph + Be Vietnam Pro bold title. */
function CardTitle({ title, size = 28, desc, width }: { title: string; size?: 24 | 28; desc: string; width?: number }) {
  const t = useT();
  return (
    <div className="flex flex-col items-start gap-4" style={width ? { width } : undefined}>
      <div className="flex w-full items-center gap-3">
        <img alt="" src={`${A}/diamond.svg`} className="size-6 shrink-0" />
        <p className={`${BVP} flex-1 leading-[1.5] font-bold text-[#1b1b1b]`} style={{ fontSize: size, letterSpacing: size / 100 }}>
          {t(title)}
        </p>
      </div>
      <p className={`${BVP} w-full text-[16px] leading-[1.5] text-[#1b1b1b]`}>{t(desc)}</p>
    </div>
  );
}

/** Dashed library card (#fafafa, 2px dashed #9f02fa, r24). Positioned absolutely in the block. */
function LibCard({
  x,
  y,
  w,
  h,
  className = "",
  style,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      <Reveal className="size-full" enter={80}>
        <div
          className={`cl-ease cl-card relative flex size-full flex-col rounded-[24px] outline-2 -outline-offset-2 outline-[#9f02fa] outline-dashed bg-[#fafafa] ${className}`}
          style={style}
        >
          {children}
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------- Banner toast */

type ToastKind = "information" | "error" | "neutral" | "success";

const TOAST: Record<ToastKind, { bg: string; edge: string; icon: string }> = {
  information: { bg: "#e9f6ff", edge: "#22aaff", icon: "info-circle.svg" },
  error: { bg: "#feeded", edge: "#f80903", icon: "info-circle-error.svg" },
  neutral: { bg: "#ffffff", edge: "#d1d5db", icon: "bolt.svg" },
  success: { bg: "#e7fcf2", edge: "#10b367", icon: "check-circle.svg" },
};

function BannerToast({ kind }: { kind: ToastKind }) {
  const t = TOAST[kind];
  return (
    <div className="flex w-[350.502px] flex-col items-center gap-3">
      <Reveal className="w-full" enter={60}>
        <div
          className={`cl-ease cl-toast ${ROBOTO} flex w-full items-start rounded-[11.445px] px-[17.167px] py-[11.445px]`}
          style={{ background: t.bg, outline: `0.715px solid ${t.edge}`, outlineOffset: -0.715 }}
        >
          <div className="flex flex-1 items-start gap-[17.167px]">
            <div className="flex flex-1 items-start gap-[11.445px]">
              <img alt="" src={`${A}/${t.icon}`} className="size-[22.89px] shrink-0" />
              <div className="flex flex-1 flex-col items-start gap-[11.445px]">
                <div className="flex w-full flex-col gap-[5.722px] text-[#1f2937]">
                  <p className="text-[14.306px] leading-[20.029px] font-semibold">Title in here</p>
                  <p className="text-[10.014px] leading-[15.737px]">
                    You completed course <span className="font-semibold">Performance Management Revision</span> on September 16, 2024
                  </p>
                </div>
                <div className="flex items-center gap-[11.445px]">
                  <span className="flex items-center justify-center rounded-[8.584px] bg-[#29353c] px-[11.445px] py-[5.722px] text-[10.01px] leading-[15.737px] font-semibold text-white">
                    Button
                  </span>
                  <span className="flex items-center gap-[5.722px] text-[10.014px] leading-[15.737px] font-semibold text-[#1f2937] underline">
                    Button
                    <img alt="" src={`${A}/arrow-right.svg`} className="size-[17.167px]" />
                  </span>
                </div>
              </div>
            </div>
            <img alt="" src={`${A}/close.svg`} className="size-[17.167px] shrink-0" />
          </div>
        </div>
      </Reveal>
      <p className={`${MONO} w-full text-center`}>appearance = {kind}</p>
    </div>
  );
}

function BannerToastCard() {
  return (
    <LibCard x={0} y={126} w={926.40625} h={577} className="items-start gap-10 px-10 pt-10 pb-12">
      <CardTitle
        title="Banner toast"
        width={650}
        desc="Banner toasts enable the system to quickly convey information such as general notifications, errors, success messages, supplementary details, or status updates."
      />
      <div className="relative flex w-full flex-col gap-8">
        <div className="flex w-full items-center justify-between">
          <BannerToast kind="information" />
          <BannerToast kind="error" />
        </div>
        <div className="flex w-full items-center justify-between">
          <BannerToast kind="neutral" />
          <BannerToast kind="success" />
        </div>
        {/* Pointer hovering the information toast (Figma 247:15009). */}
        <div className="pointer-events-none absolute top-[110px] left-[315px] flex h-[21.217px] w-[17.966px] items-center justify-center">
          <div className="relative h-[18.393px] w-[13.93px] -rotate-[14deg]">
            <img alt="" src={`${A}/pointer.svg`} className="absolute top-[-1.663px] left-[-2.87px] h-[24.136px] w-[19.671px] max-w-none" />
          </div>
        </div>
      </div>
    </LibCard>
  );
}

/* ----------------------------------------------------------------- Cursors */

function CursorsCard() {
  const cells = Array.from({ length: 12 }, (_, i) => i);
  return (
    <LibCard x={948.28125} y={126} w={451.71875} h={577} className="items-center gap-[68px] pt-8 pr-[35px] pb-[41px] pl-8">
      <CardTitle
        title="Cursors"
        size={24}
        width={346}
        desc="Cursors help simulate or indicate interactive affordances in prototypes, instructional materials, editor-like UIs, or areas where the type of user action needs to be clearly defined."
      />
      {/* 2x export of the cursor grid (247:15020), split into 12 hoverable cells. */}
      <div className="grid h-[264px] w-[317px] shrink-0 grid-cols-4 grid-rows-3">
        {cells.map((i) => (
          <Reveal key={i} enter={40}>
            <div
              className="cl-ease cl-cursor h-[88px] w-[79.25px]"
              style={{
                backgroundImage: `url(${A}/cursors-grid@2x.png)`,
                backgroundSize: "317px 264px",
                backgroundPosition: `${-(i % 4) * 79.25}px ${-Math.floor(i / 4) * 88}px`,
              }}
            />
          </Reveal>
        ))}
      </div>
    </LibCard>
  );
}

/* ----------------------------------------------------------------- Buttons */

type BtnKind = "primary" | "secondary" | "danger" | "tertiary";
type BtnSize = "large" | "medium" | "small";

const BTN_PAD: Record<BtnSize, string> = { large: "px-8 py-4", medium: "px-6 py-3", small: "px-4 py-2" };
const BTN_TEXT: Record<BtnSize, string> = { large: "text-[16px] leading-6", medium: "text-[16px] leading-6", small: "text-[14px] leading-[22px]" };
const BTN_TEXT_LG: Record<BtnSize, string> = { large: "text-[18px] leading-[27px]", medium: "text-[16px] leading-6", small: "text-[14px] leading-[22px]" };

function LibButton({ kind, size }: { kind: BtnKind; size: BtnSize }) {
  if (kind === "tertiary") {
    return (
      <span className={`cl-ease cl-btn-text ${ROBOTO} shrink-0 rounded-[8px] font-semibold whitespace-nowrap text-[#4b5563] ${BTN_TEXT_LG[size]}`}>
        CTA Button
      </span>
    );
  }
  const skin =
    kind === "primary"
      ? "bg-[#29353c] text-white"
      : kind === "danger"
        ? "bg-[#f80903] text-white"
        : "cl-btn-outline bg-[#f6f6f6] text-[#1f2937] shadow-[inset_0_0_0_1px_#9ca3af]";
  const text = kind === "danger" ? BTN_TEXT_LG[size] : BTN_TEXT[size];
  return (
    <span className={`cl-ease cl-btn ${ROBOTO} flex shrink-0 items-center justify-center rounded-[12px] font-semibold whitespace-nowrap ${BTN_PAD[size]} ${text} ${skin}`}>
      Button
    </span>
  );
}

function ButtonRow({ label, kind }: { label: string; kind: BtnKind }) {
  return (
    <div className="flex w-full items-center justify-between">
      <p className={`${MONO} whitespace-nowrap`}>{label}</p>
      <div className={`flex items-center ${kind === "tertiary" ? "gap-[47px]" : "gap-8"}`}>
        <LibButton kind={kind} size="large" />
        <LibButton kind={kind} size="medium" />
        <LibButton kind={kind} size="small" />
      </div>
    </div>
  );
}

function ButtonsCard() {
  return (
    <LibCard x={0} y={723} w={689.0625} h={607} className="items-start gap-14 px-10 pt-10 pb-[51px]">
      <CardTitle
        title="Buttons"
        width={550}
        desc="This component is used to trigger an action or event within the LMS. The button helps users understand the next action that will occur when they click it."
      />
      <div className="flex h-[331px] w-[550px] flex-col items-start justify-between">
        <ButtonRow label="appearance = primary" kind="primary" />
        <ButtonRow label="appearance = secondary" kind="secondary" />
        <ButtonRow label="appearance = error" kind="danger" />
        <ButtonRow label="appearance = tertiary" kind="tertiary" />
      </div>
    </LibCard>
  );
}

/* --------------------------------------------------------------- Variables */

const TOKEN_GRAD = "linear-gradient(180deg, #ffda80 0%, #ffb500 100%)";

function VariablesCard() {
  return (
    <LibCard x={0} y={1350} w={689.0625} h={473} className="items-start justify-between p-10">
      <CardTitle
        title="Variables"
        width={550}
        desc="Variables standardize the foundational values of the LMS Design System—such as color, spacing, radius, border, and sizing—utilizing a unified token system that is consistent, easy to update and scale, and minimizes hard-coding in the design."
      />
      <div className={`${BVP} flex w-[554px] flex-col items-start text-[58.116px] leading-[1.5] font-extrabold tracking-[0.5812px]`}>
        {["PRIMITIVE", "SEMANTIC TOKEN"].map((word, i) => (
          <Reveal key={word} enter={40} className={i === 0 ? "mb-[-8px]" : ""}>
            <p
              className="cl-ease cl-spec w-fit origin-left bg-clip-text text-transparent"
              style={{ backgroundImage: TOKEN_GRAD, WebkitBackgroundClip: "text" }}
            >
              {word}
            </p>
          </Reveal>
        ))}
      </div>
    </LibCard>
  );
}

/* ------------------------------------------------------------------- Input */

function InputCard() {
  return (
    <LibCard x={710.9375} y={723} w={689.0625} h={470} className="items-start gap-[70px] px-8 pt-8 pb-16">
      <CardTitle title="Input" size={24} width={571} desc="This component allows users to enter, edit, or view text-based data within an LMS form." />
      <div className={`${ROBOTO} relative h-[204px] w-[542px] shrink-0`}>
        <p className={`${MONO} absolute top-[13px] left-0 whitespace-nowrap`}>input field</p>
        <p className={`${MONO} absolute top-[91px] left-0 whitespace-nowrap`}>search field</p>
        <p className={`${MONO} absolute top-[170px] left-0 whitespace-nowrap`}>comment field</p>
        <div className="absolute top-0 left-[136px] flex w-[406px] flex-col items-end gap-8">
          {/* Input with floating label (247:15166) */}
          <Reveal className="w-full" enter={40}>
            <div className="cl-ease cl-field relative flex w-full items-center rounded-[12px] bg-white px-4 py-3">
              <div className="flex flex-1 items-center gap-2">
                <p className="flex-1 text-[14px] leading-[22px] text-[#9ca3af]">Input Text...</p>
                <img alt="" src={`${A}/eye.svg`} className="size-5 shrink-0" />
              </div>
              <div className="absolute top-[-11px] left-3 flex items-start gap-1 bg-white px-1">
                <p className="text-[12px] leading-5 whitespace-nowrap text-[#1f2937]">Label</p>
                <img alt="" src={`${A}/required.svg`} className="size-[6px]" />
              </div>
            </div>
          </Reveal>
          {/* Search field (247:15167) */}
          <Reveal className="w-full" enter={40}>
            <div className="cl-ease cl-field flex w-full items-center rounded-[12px] bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <img alt="" src={`${A}/magnifer.svg`} className="size-4 shrink-0" />
                <p className="text-[14px] leading-[22px] whitespace-nowrap text-[#9ca3af]">Enter name of course...</p>
              </div>
            </div>
          </Reveal>
          {/* Comment input (247:15168) */}
          <Reveal className="w-full" enter={40}>
            <div className="flex w-full items-start justify-center gap-3">
              <img alt="" src={`${A}/avatar.png`} width={40} height={40} className="size-10 shrink-0" />
              <div className="cl-ease cl-field flex flex-1 items-center rounded-[12px] bg-white px-3 py-2">
                <div className="flex flex-1 items-center gap-2">
                  <p className="flex-1 text-[14px] leading-[22px] text-[#9ca3af]">Write something...</p>
                  <div className="flex items-center gap-2">
                    <img alt="" src={`${A}/gallery.svg`} className="size-4 shrink-0" />
                    <span className="flex items-center rounded-[12px] bg-[#f6f6f6] p-2">
                      <img alt="" src={`${A}/send.svg`} className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </LibCard>
  );
}

/* ------------------------------------------------------------- Iconography */

/* Figma grid 247:15179 (4×3, row-major; glyph drawn at the Figma icon size, 52px, centred in the 87.25×84 tile) → Lottie in /lottie/sapp/icons (matched by glyph; the grid repeats a trophy and an archive box, so the remaining three files take those cells). */
const ICON_LOTTIES = [
  "EventTest", "CourseContent", "CourseActivation", "Calculator",
  "AddNote", "ExamInfo", "Attendance", "Dashboard",
  "ExamList", "Calendar", "EntranceTest", "BlinkStart",
];

function IconographyCard() {
  return (
    <LibCard x={710.9375} y={1225} w={689.0625} h={598} className="items-center gap-12 p-10">
      <CardTitle
        title="Iconography"
        width={550}
        desc="Iconography standardizes the icon system used in the LMS Design System, including icon size, grouping, and contextual usage. This helps designers select consistent icons for actions, navigation, status, and learning content."
      />
      <div className="grid h-[316px] w-[445px] shrink-0 grid-cols-4 grid-rows-3 gap-8">
        {ICON_LOTTIES.map((name) => (
          <Reveal key={name} enter={40}>
            <div className="cl-ease cl-icon relative h-[84px] w-[87.25px] rounded-[12px] bg-white">
              <SappLottie src={`/lottie/sapp/icons/${name}.json`} className="absolute" style={{ left: 17.625, top: 16, width: 52, height: 52 }} />
            </div>
          </Reveal>
        ))}
      </div>
    </LibCard>
  );
}

/* ------------------------------------------------------------ Slot content */

function SlotPoint({ title, body }: { title: string; body: string }) {
  const t = useT();
  return (
    <div className="flex w-full flex-col items-start gap-[13.2px]">
      <div className="flex w-full items-center gap-[8.8px]">
        <img alt="" src={`${A}/diamond.svg`} className="size-[26.4px] shrink-0" />
        <p className={`${BVP} flex-1 text-[19.8px] leading-[1.5] font-semibold text-[#1b1b1b]`}>{t(title)}</p>
      </div>
      <p className={`${BVP} w-full text-[17.6px] leading-[1.5] text-[#1b1b1b]`}>{t(body)}</p>
    </div>
  );
}

function SlotDemo() {
  return (
    <div className={`${ROBOTO} relative h-[629.09px] w-[519.2px] shrink-0`}>
      <div className="cl-ease cl-modal-sm absolute top-0 left-0 flex w-[261.8px] flex-col items-center gap-[18.7px] rounded-[10.2px] bg-white p-[18.7px]">
        <img alt="" src={`${A}/slot-mail-small.svg`} className="size-[41.14px]" />
        <div className="h-[90.2px] w-full bg-[#f2ddff]" />
        <div className="flex w-full flex-col items-center gap-[3.74px]">
          <span className="flex w-full items-center justify-center rounded-[5.1px] bg-[#29353c] px-[11.22px] py-[5.61px] text-[7.48px] leading-[11.22px] font-semibold text-white">
            Primary
          </span>
          <span className="flex w-full items-center justify-center rounded-[5.1px] bg-[#f6f6f6] px-[11.22px] py-[5.61px] text-[7.48px] leading-[11.22px] font-semibold text-[#1f2937] shadow-[inset_0_0_0_0.473px_#9ca3af]">
            Secondary
          </span>
          <span className="text-[6.6px] leading-[10.34px] font-semibold text-[#404041]">Tertiary</span>
        </div>
      </div>
      <div className="pointer-events-none absolute top-[119.9px] left-[231px] flex h-[154.582px] w-[141.252px] items-center justify-center">
        <img alt="" src={`${A}/slot-arrow.svg`} className="h-[126.61px] w-[104.39px] max-w-none rotate-[-19.9deg]" />
      </div>
      <div className="cl-ease cl-modal-lg absolute top-[310.2px] left-[183.7px] flex w-[335.5px] flex-col items-center gap-[23.98px] rounded-[13.1px] bg-white p-[23.98px]">
        <img alt="" src={`${A}/slot-mail.svg`} className="size-[52.69px]" />
        <div className="flex w-[287.54px] flex-col items-center gap-[19.14px]">
          <div className="flex w-full flex-col items-center gap-[4.84px] text-center text-[#404041]">
            <p className="w-full text-[11.99px] leading-[16.83px]">Please enter the code we sent to</p>
            <p className="w-full text-[14.41px] leading-[19.14px] font-semibold">ngoctt1@sapp.edu.vn</p>
          </div>
          <div className="flex w-full flex-col items-start gap-[4.84px]">
            <div className="flex w-full items-center gap-[7.15px]">
              {["1", "2", "3", "4", "5", "6"].map((d) => (
                <span
                  key={d}
                  className="flex h-[43.12px] min-w-px flex-1 items-center justify-center rounded-[4.4px] bg-white text-[14.41px] leading-[19.14px] font-medium text-[#c73b37] shadow-[inset_0_0_0_0.594px_#c73b37]"
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="flex w-full items-center justify-between text-[8.36px] leading-[13.2px] whitespace-nowrap">
              <p className="text-[#b90e0a]">Invaild OTP. Please try again!</p>
              <p className="font-semibold text-[#404041]">07 : 21</p>
            </div>
          </div>
        </div>
        <div className="flex w-[287.54px] flex-col items-center gap-[4.84px]">
          <span className="flex w-full items-center justify-center rounded-[6.5px] bg-[#29353c] px-[14.41px] py-[7.15px] text-[9.57px] leading-[14.41px] font-semibold text-white">
            Confirm
          </span>
          <span className="text-[8.36px] leading-[13.2px] font-semibold text-[#404041]">Cancel</span>
        </div>
      </div>
    </div>
  );
}

function SlotContentBlock() {
  const t = useT();
  return (
    <Reveal enter={100}>
      <div className="wd-hover flex w-full flex-col rounded-[28px] bg-[var(--cmd-surface-1)] p-6 shadow-[0_12px_16px_rgba(15,23,41,0.06),0_1px_1.5px_rgba(15,23,41,0.04)]">
        <div className="flex w-full flex-col items-center rounded-[16px]">
          <div className="flex w-[1289.2px] items-start justify-between rounded-[24px] bg-white px-6 py-11">
            <div className="flex w-[596.2px] flex-col items-start gap-[26.4px]">
              <div className="flex w-full flex-col items-start gap-[17.6px] text-[#1b1b1b]">
                <p className={`${BVP} w-full text-[35.2px] leading-[1.5] font-bold tracking-[0.352px]`}>{t("Slot content")}</p>
                <p className={`${BVP} w-full text-[17.6px] leading-[1.5]`}>
                  {t("Slot content is used to define replaceable content areas within components such as Modals, Drawers, Cards, or Panels. They allow components to maintain a consistent layout structure while keeping the internal content flexible based on the specific usage context.")}
                </p>
              </div>
              <SlotPoint title="Body slot" body="Used to hold the component's main content, such as text, forms, lists, tables, status information, or detailed details." />
              <SlotPoint title="Media slot" body="Used to hold images, thumbnails, illustrative icons, or content previews." />
              <SlotPoint title="Action slot" body="Used to contain buttons, links, or groups of actions directly related to the content within the component." />
            </div>
            <SlotDemo />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------- Section: Component library */

export function SappComponentLibrary() {
  const t = useT();
  return (
    <section id="wd-components" className={`${FONT_VARS} flex w-full flex-col items-start gap-12 px-[236px] pt-[100px] pb-[100px]`}>
      {/* Head (250:15807) */}
      <Reveal>
        <div className="flex w-[1400px] flex-col items-start gap-[22px]">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow label={t("FINAL DESIGN  ·  02.5")} />
            <SappHeading>{t("Component library")}</SappHeading>
          </div>
          <p className="w-[760px] text-[16px] leading-6 text-[var(--cmd-text-secondary)]">
            {t("46 components, each documented with variants, properties and usage. Generic UI covers most of the product; the learning-specific set is what makes LMS Pro feel like a place to study rather than a generic dashboard.")}
          </p>
          <div className="flex w-full flex-col items-start gap-4">
            <p className="text-[24px] leading-8 font-bold whitespace-nowrap text-[#1b1b1b]">{t("Full Design System")}</p>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-[16px] leading-6 text-[#1b1b1b]">{t("You can checkout my full design system in this link:")}</p>
              <a
                href="https://www.figma.com/design/V7pBZ07ZggB1CTikT6lZhb/LMS-Design-System--Final-?node-id=414-16875&p=f&t=hAiICTXZ9nVMO44d-0"
                target="_blank"
                rel="noreferrer"
                className="cl-ease group flex items-center gap-1 hover:translate-x-1"
              >
                <span className="relative size-6 shrink-0 overflow-hidden">
                  <img alt="" src={`${A}/figma.svg`} className="absolute inset-[7.81%_21.88%] block size-auto" />
                </span>
                <span className="text-[16px] leading-6 font-bold whitespace-nowrap text-[#007ce2] group-hover:underline">LMS Design System</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Block — Core components in use (250:15965) */}
      <div className="relative h-[1823px] w-[1400px]">
        <Reveal>
          <div className="flex w-[820px] flex-col items-start gap-2.5">
            <p className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap text-[#0a0a0a]">{t("Core components in use")}</p>
            <p className="w-[820px] text-[16px] leading-6 tracking-[-0.2px] text-[#4b5563]">
              {t("Banner toast, cursors, buttons, input, iconography and variables — rebuilt here as live components from the library.")}
            </p>
          </div>
        </Reveal>
        <BannerToastCard />
        <CursorsCard />
        <ButtonsCard />
        <InputCard />
        <IconographyCard />
        <VariablesCard />
      </div>

      {/* Block — Slot content (250:15969) */}
      <div className="w-[1400px]">
        <SlotContentBlock />
      </div>
    </section>
  );
}

/* ---------------------------------------------------- Section: Design anatomy */

type Spec = {
  id: string;
  title: string;
  icon?: "text";
  depend?: string;
  lines?: string[];
  style?: string;
  wide?: boolean;
};

const SPECS: Spec[] = [
  { id: "01", title: "Course Card", depend: "Card (Course)" },
  { id: "02", title: "Dropdown", depend: "Dropdown" },
  { id: "03", title: "Card Body", icon: "text", lines: ["Variable color: Text/ Black"], style: "Body / Medium/ 400" },
  {
    id: "04",
    title: "Sidebar",
    depend: "Navigation/ Minimum",
    lines: ["Background variable color: Background / Surface/ Grey", "Border Radius: 16", "Padding: 8px"],
  },
  { id: "06", title: "Header", depend: "Header", wide: true },
  {
    id: "07",
    title: "Button",
    depend: "Button/ Primary/ Medium",
    lines: ["Text color variable: Text/ Black", "Fill color variable: background/ button/ secondary", "Padding: 24px, 12px"],
    wide: true,
  },
  { id: "08", title: "Icon button", depend: "Icon button/ default/ small", wide: true },
];

/** Badge positions on the annotated screen (I247:15312;212:15632…15650). */
const MARKS: { id: string; x: number; y: number }[] = [
  { id: "01", x: 224.84, y: 73.89 },
  { id: "06", x: 169.23, y: 50.85 },
  { id: "02", x: 545.03, y: 159.69 },
  { id: "09", x: 545.03, y: 246.29 },
  { id: "04", x: 545.03, y: 429.82 },
  { id: "05", x: 18.27, y: 175.58 },
  { id: "03", x: 435.39, y: 81.04 },
  { id: "08", x: 369.44, y: 61.18 },
  { id: "07", x: 18.27, y: 257.42 },
  { id: "04", x: 18.27, y: 320.98 },
];

/** Leader lines (1.589px #ffb700). h = horizontal (x, y = right/bottom edge), v = vertical. */
const LINES: { id: string; dir: "h" | "v"; x: number; y: number; len: number }[] = [
  { id: "02", dir: "h", x: 460.81, y: 175.58, len: 85.011 },
  { id: "09", dir: "h", x: 452.86, y: 262.18, len: 92.956 },
  { id: "04", dir: "h", x: 508.48, y: 445.71, len: 37.341 },
  { id: "01", dir: "v", x: 239.94, y: 103.28, len: 81.039 },
  { id: "06", dir: "v", x: 184.32, y: 78.66, len: 65.149 },
  { id: "05", dir: "h", x: 47.67, y: 189.89, len: 47.67 },
  { id: "07", dir: "h", x: 47.67, y: 271.72, len: 39.725 },
  { id: "04", dir: "h", x: 47.67, y: 335.28, len: 47.67 },
  { id: "08", dir: "v", x: 413.93, y: 90.57, len: 60.382 },
];

const AN_TEXT = `${BVP} text-[11.12px] leading-[1.5] tracking-[0.1112px] text-[#1b1b1b]`;

function Badge({ id, size, className = "", style }: { id: string; size: number; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[84px] bg-[#ffb700] ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <p className={`${BVP} text-[11.12px] leading-[1.5] font-bold tracking-[0.1112px] whitespace-nowrap text-white`}>{id}</p>
    </div>
  );
}

function SpecIcon({ text }: { text?: boolean }) {
  if (text) return <img alt="" src={`${A}/anatomy-text-icon.svg`} className="size-[19.068px] shrink-0" />;
  return (
    <span className="relative size-[19.068px] shrink-0">
      <span className="absolute top-[1.61px] left-[1.59px] flex size-[15.843px] items-center justify-center">
        <span className="size-[11.202px] -rotate-45 border-[0.794px] border-solid border-[#9747ff]" />
      </span>
    </span>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-start rounded-[4px] border-[0.794px] border-dashed border-[#9747ff] px-[6.356px] py-[3.178px]">
      <span className={`${BVP} text-[11.12px] leading-[1.5] font-bold tracking-[0.1112px] whitespace-nowrap text-[#9747ff]`}>{children}</span>
    </span>
  );
}

function AnatomyBoard() {
  const t = useT();
  const [active, setActive] = useState<string | null>(null);
  const on = (id: string) => (active === id ? " is-on" : "");
  const enter = (id: string) => () => setActive(id);
  const leave = () => setActive(null);

  return (
    <div
      className={`absolute top-[30px] left-[30px] flex items-start gap-[95.34px] rounded-[24px] bg-white p-[31.78px]${active ? " an-dim" : ""}`}
    >
      {/* Specs list */}
      <div className="flex flex-col items-start gap-[12.712px]">
        {SPECS.map((s) => (
          <div
            key={s.id}
            className={`an-item flex cursor-default items-start gap-[12.712px]${on(s.id)}`}
            onPointerEnter={enter(s.id)}
            onPointerLeave={leave}
          >
            <Badge id={s.id} size={26.218} className={`an-badge cl-ease${on(s.id)}`} />
            <div className="flex flex-col items-start gap-[6.356px]" style={{ width: s.wide ? 245.5 : 168.434 }}>
              <div className="flex items-center gap-[6.356px]">
                <SpecIcon text={s.icon === "text"} />
                <p className={`${BVP} text-[12.71px] leading-[1.5] font-bold tracking-[0.1271px] whitespace-nowrap text-[#1b1b1b]`}>{s.title}</p>
              </div>
              {s.depend ? (
                <div className="flex items-center gap-[6.356px]">
                  <p className={`${AN_TEXT} whitespace-nowrap`}>{t("Depend on:")}</p>
                  <Chip>{s.depend}</Chip>
                </div>
              ) : null}
              {s.icon === "text" && s.lines ? <p className={`${AN_TEXT} w-full`}>{s.lines[0]}</p> : null}
              {s.style ? (
                <div className="flex items-center gap-[7.945px]">
                  <p className={`${AN_TEXT} whitespace-nowrap`}>{t("Text style:")}</p>
                  <span className="flex items-start rounded-[8px] bg-[#f3f9fa] px-[6.356px] py-[3.178px]">
                    <span className={`${BVP} text-[11.12px] leading-[1.5] font-bold tracking-[0.1112px] whitespace-nowrap text-[#9747ff]`}>{s.style}</span>
                  </span>
                </div>
              ) : null}
              {s.icon !== "text" && s.lines
                ? s.lines.map((l) => (
                    <p key={l} className={`${AN_TEXT} w-full`}>
                      {l}
                    </p>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>

      {/* Annotated screen */}
      <div className="relative h-[610.97px] w-[596.669px] shrink-0 rounded-[24px] bg-[#fafafa] shadow-[inset_0_0_0_1.589px_#ffb700]">
        <img
          alt={t("SAPP LMS course list screen")}
          src={`${A}/anatomy-screen.png`}
          className="pointer-events-none absolute top-[117.59px] left-[56.41px] h-[376.593px] w-[481.864px] max-w-none object-cover"
        />
        {LINES.map((l, i) => (
          <span
            key={`l${i}`}
            className={`an-mark pointer-events-none absolute bg-[#ffb700]${on(l.id)}`}
            style={
              l.dir === "h"
                ? { left: l.x, top: l.y - 1.589, width: l.len, height: 1.589 }
                : { left: l.x - 1.589, top: l.y, width: 1.589, height: l.len }
            }
          />
        ))}
        {MARKS.map((m, i) => (
          <Badge
            key={`m${i}`}
            id={m.id}
            size={29.396}
            className={`an-mark an-badge absolute cursor-default${on(m.id)}`}
            style={{ left: m.x, top: m.y }}
          />
        ))}
        {/* Invisible hit targets so the screen badges are hoverable too. */}
        {MARKS.map((m, i) => (
          <span
            key={`h${i}`}
            aria-hidden
            className="absolute rounded-full"
            style={{ left: m.x - 4, top: m.y - 4, width: 37.4, height: 37.4 }}
            onPointerEnter={enter(m.id)}
            onPointerLeave={leave}
          />
        ))}
        <div className="absolute top-[576.81px] left-[128.71px] flex items-center gap-[9.534px]">
          <img alt="" src={`${A}/anatomy-warning.svg`} className="h-[14.301px] w-[15.795px]" />
          <p className={`${BVP} text-[12.71px] leading-[1.5] font-medium whitespace-nowrap text-[#1b1b1b]`}>{t("These are only 1/5 of the general design anatomy")}</p>
        </div>
      </div>
    </div>
  );
}

export function SappAnatomy() {
  const t = useT();
  return (
    <section id="wd-anatomy" className={`${FONT_VARS} flex w-full flex-col items-start gap-12 px-[236px] pt-[100px]`}>
      {/* Head (247:15302) */}
      <div className="flex w-full flex-col items-start gap-[22px]">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow label={t("FINAL DESIGN  ·  02.4")} />
          <SappHeading>{t("Design anatomy")}</SappHeading>
        </div>
        <p className="w-[760px] text-[22px] leading-[34px] tracking-[-0.11px] text-[var(--cmd-text-secondary)]">
          {t("Every screen breaks down into tokens and components — here the course list screen, annotated with the exact spec for each part.")}
        </p>
      </div>

      {/* Anatomy (247:15309) */}
      <div className="relative flex w-full flex-col items-center rounded-[32px] px-12">
        {/* Ellipse glow (247:15310): blurred #6B4CFF @12% rebuilt as a radial gradient. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[20px] left-[100px] h-[960px] w-[1360px]"
          style={{
            background:
              "radial-gradient(ellipse 680px 480px at 50% 50%, rgba(107,76,255,0.12) 0%, rgba(107,76,255,0.105) 36%, rgba(107,76,255,0.05) 62%, rgba(107,76,255,0) 100%)",
          }}
        />
        <div className="wd-hover relative h-[748.318px] w-[1100px] shrink-0 rounded-[40px] bg-white shadow-[12px_12px_0_0_var(--sapp-back),0_24px_60px_0_var(--cmd-shadow)]">
          <AnatomyBoard />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_0_var(--cmd-edge)]" />
        </div>
      </div>
    </section>
  );
}
