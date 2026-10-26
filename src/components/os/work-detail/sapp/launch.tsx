"use client";

import "./launch.css";
import { sappBeVietnam, sappInter, sappRoboto } from "./fonts";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { scrollToChild } from "@/lib/scroll";
import { useLang, useT } from "@/lib/i18n";
import { Reveal } from "../../reveal";
import { SappLoopVideo } from "./media";
import { SappHeading } from "./parts";

const vietnam = sappBeVietnam;
const roboto = sappRoboto;
const inter = sappInter;

const A = "/figma/sapp/launch";

/** Raster image below the fold: always lazy + async decode. */
function Img({
  src,
  className = "",
  style,
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
}) {
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
/* Head + Flow Index (244:16493 / 244:16500)                            */
/* ================================================================== */

const FLOW = [
  "01  Sign in",
  "02  Tour guide",
  "03  Course flow",
  "04  Activity lesson",
  "05  Dashboard",
  "06  Test & question type",
  "07  Calendar",
];

function FlowIndex() {
  const t = useT();
  const go = (index: number) => (event: MouseEvent<HTMLButtonElement>) => {
    const root = event.currentTarget.closest(".work-detail.reveal-root");
    if (root instanceof HTMLElement)
      scrollToChild(
        root,
        document.getElementById(`wd-launch-${index + 1}`),
        40,
      );
  };
  return (
    <div className="flex w-[1400px] flex-wrap items-start gap-2">
      {FLOW.map((label, index) => (
        <button
          key={label}
          type="button"
          onClick={go(index)}
          className="launch-chip wd-hover flex cursor-pointer items-center rounded-full bg-[var(--cmd-surface-1)] px-3 py-1.5 text-base leading-6 tracking-[-0.2px] whitespace-pre text-[var(--cmd-text-primary)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
        >
          {t(label)}
        </button>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Showcase frame (244:16559, 1400×10529) — absolute, frame coords     */
/* ================================================================== */

/** Absolutely placed block that fades up on scroll. */
function Block({
  left,
  top,
  width,
  height,
  children,
  className = "",
}: {
  left: number;
  top: number;
  width?: number;
  height?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="absolute" style={{ left, top, width, height }}>
      <Reveal className={`relative size-full ${className}`}>{children}</Reveal>
    </div>
  );
}

/** Opaque decorative background (exported on the page colour #f7f7f7), section-wide. */
function Bg({
  name,
  left = -236,
  top,
  width = 1872,
  height,
}: {
  name: string;
  left?: number;
  top: number;
  width?: number;
  height: number;
}) {
  return (
    <Img
      src={`${A}/bg-${name}.jpg`}
      className="absolute"
      style={{ left, top, width, height }}
    />
  );
}

/** Be Vietnam Pro title row: 32 bold brand + icon. */
function VTitle({
  children,
  icon,
  gap = 16,
  center = false,
}: {
  children: ReactNode;
  icon?: ReactNode;
  gap?: number;
  center?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center ${center ? "justify-center" : ""}`}
      style={{ gap }}
    >
      <p className="text-[32px] leading-[1.5] font-bold tracking-[0.32px] whitespace-nowrap text-[#ffb700]">
        {children}
      </p>
      {icon}
    </div>
  );
}

const vBody = "text-base leading-[1.5] text-[#1b1b1b]";

/* ---------- Sign in (244:16578) ---------- */
function SignInShowcase() {
  const t = useT();
  return (
    <>
      <Block left={114} top={0} width={798} height={526}>
        <Img
          src={`${A}/signin-main.jpg`}
          className="wd-hover pointer-events-auto absolute top-0 left-0 rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)]"
          style={{ width: 651, height: 366 }}
        />
        <Img
          src={`${A}/signin-card.png`}
          className="wd-hover pointer-events-auto absolute"
          style={{ left: 465, top: 246, width: 333, height: 280 }}
        />
      </Block>
      <Block left={872} top={30} width={414}>
        <div className="flex flex-col gap-3">
          <VTitle
            icon={
              <span className="relative block h-[24.828px] w-12 shrink-0">
                <Img
                  src={`${A}/arrow.svg`}
                  className="absolute"
                  style={{
                    left: "-1.88%",
                    top: "-3.63%",
                    width: "103.76%",
                    height: "107.26%",
                  }}
                />
              </span>
            }
          >
            {t("Sign in Flow")}
          </VTitle>
          <p className={vBody}>
            {t("The login process enables users to access the LMS Pro system quickly and securely. Users enter their email and password to authenticate their accounts; if the information is valid, the system grants access to the platform so they can continue their learning.")}
          </p>
        </div>
      </Block>
    </>
  );
}

/* ---------- Tour guide (244:16587) ---------- */
const TOUR = [
  {
    title: "Search box",
    body: "The search box is located in the upper corner of the website. Simply enter the course name and press Enter to search.",
    prev: false,
    cta: "Next",
    dots: 1,
    tall: true,
  },
  {
    title: "Notification & Profile",
    body: "The lower section of the menu consists of notifications and your profile, which includes personal information, certificates, settings, and the option to log out.",
    prev: true,
    cta: "Next",
    dots: 2,
  },
  {
    title: "Courses",
    body: "This is a course you have enrolled in. It provides details about the class it belongs to, the remaining study days, a brief course description, as well as the status and progress you have made so far.",
    prev: true,
    cta: "Next",
    dots: 3,
  },
  {
    title: "Filter",
    body: "This is a course you have enrolled in. It provides details about the class it belongs to, the remaining study days, a brief course description, as well as the status and progress you have made so far.",
    prev: true,
    cta: "Finish",
    dots: 4,
    small: true,
  },
  {
    title: "Notification & Profile",
    body: "The lower section of the menu consists of notifications and your profile, which includes personal information, certificates, settings, and the option to log out.",
    prev: true,
    cta: "Next",
    dots: 2,
    small: true,
  },
];

/* Thumbnail clips (from the TourGuide*.json Lotties, re-encoded to 640×360 MP4), matched by card title. */
const TOUR_CLIP = ["start", "noti", "courses", "filter", "sidebar"];

function TourCard({ index }: { index: number }) {
  const card = TOUR[index];
  const dotsW = card.dots >= 3 ? 66 : 56;
  return (
    <div
      className={`wd-hover flex w-[315px] shrink-0 flex-col items-center justify-end gap-4 bg-white p-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] ${card.small ? "rounded-xl" : "rounded-2xl"}`}
      style={card.tall ? { height: 423 } : undefined}
    >
      <div
        className={`relative w-full overflow-hidden rounded-lg ${card.tall ? "min-h-px flex-1" : "h-[168px]"}`}
      >
        <SappLoopVideo
          src={`/video/sapp/tour/tour-${TOUR_CLIP[index]}.mp4`}
          poster={`/video/sapp/tour/tour-${TOUR_CLIP[index]}.webp`}
          className="absolute inset-0 size-full object-cover"
        />
        <span className="absolute inset-0 bg-[rgba(0,0,0,0.02)]" />
      </div>
      <div
        className={`${roboto.className} flex w-full flex-col items-center gap-3 text-[#1f2937]`}
      >
        <div className="flex w-full flex-col gap-3">
          <p className="text-[18px] leading-[27px] font-semibold">
            {card.title}
          </p>
          <p className="text-base leading-6">{card.body}</p>
        </div>
        <div
          className={`flex w-full items-center ${card.prev ? "justify-between" : "justify-end"}`}
        >
          {card.prev ? (
            <span className="text-sm leading-[22px] font-semibold underline">
              Previous
            </span>
          ) : null}
          <span className="flex w-[84px] items-center justify-center rounded-lg bg-[#29353c] px-4 py-2 text-sm leading-[22px] font-semibold text-white">
            {card.cta}
          </span>
        </div>
      </div>
      <Img
        src={`${A}/dots${card.dots}.svg`}
        style={{ width: dotsW, height: 6 }}
      />
    </div>
  );
}

function TourShowcase() {
  const t = useT();
  return (
    <>
      <Block left={169} top={626} width={1063}>
        <div className="mx-auto flex w-[414px] flex-col items-center gap-3 text-center">
          <VTitle center gap={8} icon={null}>
            <span className="inline-flex items-center gap-2">
              <Img src={`${A}/lightning.svg`} className="size-10" />
              {t("Tour Guide")}
            </span>
          </VTitle>
          <p className={vBody}>
            {t("The Tour Guide feature is designed to assist users who are new to LMS Pro upon their first login. The system displays step-by-step guidance, helping learners quickly understand key areas and course information.")}
          </p>
        </div>
      </Block>
      <Block left={169} top={870} width={1063}>
        <div className="flex w-full items-start gap-[59px]">
          <TourCard index={0} />
          <TourCard index={1} />
          <TourCard index={2} />
        </div>
      </Block>
      <Block left={356} top={1397} width={689}>
        <div className="flex items-start gap-[59px]">
          <TourCard index={3} />
          <TourCard index={4} />
        </div>
      </Block>
    </>
  );
}

/* ---------- Course flow (244:16949) ---------- */
function FlowChip({
  left,
  top,
  children,
}: {
  left: number;
  top: number;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={{ left, top }}>
      <div className="wd-hover flex items-center justify-center rounded-lg bg-white p-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.06)]">
        <p className="text-sm leading-[1.5] font-semibold tracking-[0.14px] whitespace-nowrap text-[#1b1b1b]">
          {children}
        </p>
      </div>
    </div>
  );
}

function CourseShowcase() {
  const t = useT();
  return (
    <>
      <Block left={60} top={1995} width={491}>
        <div className="flex flex-col gap-3">
          <VTitle
            icon={
              <Img src={`${A}/course-icon.svg`} className="h-9 w-10 shrink-0" />
            }
          >
            {t("Course Flow")}
          </VTitle>
          <div className={vBody}>
            <p>
              {t("This flow enables learners to manage all their courses in a single location. Here, users can view their course list, learning status, remaining time, completion progress, and relevant actions such as Activate, Begin, Resume, Review, or Extend.")}
            </p>
            <p>&#8203;</p>
            <p className="font-bold">{t("This flow follows 4 levels course:")}</p>
            <p>{t("Section → Sub-section → Unit → Activity")}</p>
          </div>
        </div>
      </Block>
      <Block left={-29} top={2118} width={1469} height={1242.5}>
        <Img src={`${A}/course-devices.png`} className="size-full" />
        <FlowChip left={468 + 29} top={2309 - 2118}>
          {t("Section → Sub-section")}
        </FlowChip>
        <FlowChip left={756 + 29} top={2726 - 2118}>
          {t("→ Unit")}
        </FlowChip>
      </Block>
    </>
  );
}

/* ---------- Activity lesson (244:16715 @ 15,3497.65) ---------- */
function ActivityTitle() {
  const t = useT();
  const y = "absolute bg-[#ffb700]";
  return (
    <div className="relative h-[83px] w-[380px]">
      <span className={y} style={{ left: 0, top: 0, width: 18, height: 16 }} />
      <span className={y} style={{ left: 0, top: 67, width: 18, height: 16 }} />
      <span
        className={y}
        style={{ left: 362, top: 0, width: 18, height: 16 }}
      />
      <span
        className={y}
        style={{ left: 362.67, top: 67.04, width: 15.962, height: 15.962 }}
      />
      <span className={y} style={{ left: 12, top: 5, width: 361, height: 6 }} />
      <span
        className={y}
        style={{ left: 12, top: 72, width: 361, height: 6 }}
      />
      <span
        className={y}
        style={{ left: 368, top: 11, width: 6, height: 66 }}
      />
      <span className={y} style={{ left: 6, top: 11, width: 6, height: 66 }} />
      <p className="absolute top-[17px] left-8 text-center text-[32px] leading-[1.5] font-bold tracking-[0.32px] whitespace-nowrap text-[#1b1b1b]">
        {t("Activity Lesson")}
      </p>
      <span className="absolute top-[11px] left-[291px] flex size-[60.761px] items-center justify-center">
        <Img src={`${A}/cap.svg`} className="size-[48.66px] rotate-[17deg]" />
      </span>
    </div>
  );
}

function ActivityShowcase() {
  const t = useT();
  return (
    <>
      <Block left={467.63} top={3498} width={491}>
        <div className="flex flex-col items-center gap-6">
          <ActivityTitle />
          <p className={`${vBody} text-center`}>
            {t("The Activity enables learners to delve into the content of each course. Users can navigate through sections, subsections, units, and activities to study lessons, watch videos, read content, take quizzes, or complete assigned tasks.")}
          </p>
        </div>
      </Block>
      <Block left={224.1} top={3734.5} width={981.5} height={900}>
        <Img src={`${A}/activity-ipad.png`} className="size-full" />
      </Block>
      <Block left={46.63} top={4629} width={1306} height={614}>
        <Img src={`${A}/activity-quiz.png`} className="size-full" />
      </Block>
    </>
  );
}

/* ---------- Dashboard (244:16677 @ -29,5384.65) ---------- */
type Label = {
  text: string;
  icon: string;
  box: [number, number, number, number];
  rot: number;
  iconBox: number;
  iconRot: number;
};

const LABELS: Label[] = [
  {
    text: "Dashboard for your exam preparation journey",
    icon: "ic-share",
    box: [291.93, -46.34, 511.38, 92.31],
    rot: 3.87,
    iconBox: 32.629,
    iconRot: 1.14,
  },
  {
    text: "Visualize learning performance by section",
    icon: "ic-clock",
    box: [-191.33, 249.9, 476.01, 90.42],
    rot: -3.93,
    iconBox: 32.595,
    iconRot: -1.08,
  },
  {
    text: "Help students identify improvement",
    icon: "ic-emoji",
    box: [-154.83, 408.37, 421.29, 67.73],
    rot: 1.31,
    iconBox: 36.133,
    iconRot: 7.98,
  },
  {
    text: "Comparison of weekly learning activities",
    icon: "ic-magic",
    box: [781.9, 136.5, 464.5, 87.7],
    rot: 3.87,
    iconBox: 32.674,
    iconRot: 1.22,
  },
  {
    text: "Tracking comprehensive learning progress",
    icon: "ic-cup",
    box: [771.2, 387.2, 484.6, 80.2],
    rot: -2.7,
    iconBox: 33.471,
    iconRot: 2.7,
  },
];

function DashLabel({ label }: { label: Label }) {
  const t = useT();
  const [x, y, w, h] = label.box;
  return (
    <div
      className="absolute"
      style={{
        left: x + w / 2,
        top: y + h / 2,
        transform: `translate(-50%, -50%) rotate(${label.rot}deg)`,
      }}
    >
      <div
        className={`${inter.className} wd-hover flex items-center justify-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-[0_6px_6px_0_rgba(192,225,255,0.4)]`}
      >
        <span
          className="flex shrink-0 items-center justify-center"
          style={{ width: label.iconBox, height: label.iconBox }}
        >
          <Img
            src={`${A}/${label.icon}.svg`}
            className="size-8"
            style={{ transform: `rotate(${label.iconRot}deg)` }}
          />
        </span>
        <p className="text-[20px] leading-[1.5] font-medium whitespace-nowrap text-black">
          {t(label.text)}
        </p>
      </div>
    </div>
  );
}

function DashboardShowcase() {
  const t = useT();
  return (
    <>
      <Block left={379} top={5385} width={630}>
        <div className="flex flex-col items-center gap-3">
          <VTitle
            center
            icon={
              <span className="flex h-[45.447px] w-[49.807px] shrink-0 items-center justify-center">
                <Img
                  src={`${A}/dash-icon.svg`}
                  className="h-[37.346px] w-[43px] rotate-[-11.96deg]"
                />
              </span>
            }
          >
            {t("Dashboard")}
          </VTitle>
          <p className={`${vBody} text-center`}>
            {t("The Dashboard allows learners to track an overview of their learning progress and performance across each course. Users can view the number of completed activities, weekly study time, progress by section, and learning results by topic.")}
          </p>
        </div>
      </Block>
      <Block left={162} top={5628} width={1064} height={594}>
        <Img
          src={`${A}/laptop-rect3.svg`}
          className="absolute"
          style={{ left: 101.08, top: 0, width: 861.9, height: 583.2 }}
        />
        <Img
          src={`${A}/laptop-rect4.svg`}
          className="absolute"
          style={{ left: 107.78, top: 5.46, width: 848.9, height: 554.5 }}
        />
        <div
          className="absolute bg-[#0f0f10]"
          style={{ left: 131.08, top: 40.39, width: 801.8, height: 492.4 }}
        >
          <Img
            src={`${A}/laptop-screen.jpg`}
            className="absolute"
            style={{ left: -10.9, top: -21.96, width: 824, height: 529.4 }}
          />
        </div>
        <Img
          src={`${A}/laptop-base.svg`}
          className="absolute"
          style={{ left: 0, top: 576.5, width: 1064, height: 17.53 }}
        />
        {LABELS.map((label) => (
          <DashLabel key={label.text} label={label} />
        ))}
      </Block>
    </>
  );
}

/* ---------- Test & question type (244:16782 @ 60,6501) ---------- */
const QUICK =
  "Giao diện mới cho phép bạn chọn đáp án nhanh, xem lại kết quả tức thì và theo dõi tiến độ làm bài ngay trong cùng một khung hiển thị — ";
const QUICK_BOLD = "nhanh, gọn và chính xác chỉ trong vài cú nhấp chuột.";

type QCard = {
  title: string;
  body?: string;
  short?: boolean;
  at: [number, number, number, number];
  bg: string;
  text: [number, number, number];
  art: {
    src: string;
    box: [number, number, number, number];
    className?: string;
  };
};

const QCARDS: QCard[] = [
  {
    title: "Multi Question Choice",
    body: "Giao diện mới cho phép học viên chọn đáp án nhanh, xem lại kết quả tức thì và theo dõi tiến độ làm bài ngay trong cùng một khung hiển thị — ",
    at: [0, 0, 819, 338],
    bg: "#e7faff",
    text: [50, 85, 294],
    art: { src: "q-multi.png", box: [421, 61, 361, 215] },
  },
  {
    title: "One Question Choice",
    at: [843, 0, 437, 707],
    bg: "#fff4d7",
    text: [33, 40, 371],
    art: {
      src: "q-one.png",
      box: [48, 221, 341, 451],
      className: "shadow-[0_4px_24px_0_rgba(18,101,153,0.1)]",
    },
  },
  {
    title: "Drag & Drop",
    at: [0, 362, 818, 345],
    bg: "#e3faef",
    text: [463, 89, 295],
    art: { src: "q-drag.png", box: [71, 73, 317, 200] },
  },
  {
    title: "Choose Question",
    at: [0, 731, 473, 714],
    bg: "#e5f9ff",
    text: [41.06, 48, 390.888],
    art: { src: "q-choose.png", box: [41, 305, 390, 370] },
  },
  {
    title: "True/ False Question",
    at: [497, 731, 783, 345],
    bg: "#ffecf6",
    text: [73.69, 89, 317.294],
    art: { src: "q-tf.png", box: [417.39, 56.98, 314.845, 176.93] },
  },
  {
    title: "Matching Question",
    short: true,
    at: [497, 1100, 379.5, 345],
    bg: "#edf1ff",
    text: [24, 24, 310],
    art: { src: "q-matching.png", box: [13.7, 159.7, 348, 184.5] },
  },
  {
    title: "Type Question",
    short: true,
    at: [900.5, 1100, 379.5, 345],
    bg: "#fff3d7",
    text: [24.5, 24, 310],
    art: { src: "q-type.png", box: [21.5, 134, 365, 189] },
  },
];

function QuestionCard({ card }: { card: QCard }) {
  const [x, y, w, h] = card.at;
  const [tx, ty, tw] = card.text;
  const [ax, ay, aw, ah] = card.art.box;
  return (
    <div className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      <div
        className={`${roboto.className} wd-hover relative size-full rounded-3xl text-[#29353c]`}
        style={{ background: card.bg }}
      >
        <div
          className="absolute flex flex-col gap-4"
          style={{ left: tx, top: ty, width: tw }}
        >
          <p className="text-[20px] leading-8 font-semibold">{card.title}</p>
          {card.short ? (
            <p className="text-base leading-6">
              Giao diện mới cho phép bạn chọn đáp án nhanh, xem lại kết quả tức
              thì và theo dõi.
            </p>
          ) : (
            <p className="text-base leading-6">
              {card.body ?? QUICK}
              <span className="font-bold">{QUICK_BOLD}</span>
            </p>
          )}
        </div>
        <Img
          src={`${A}/${card.art.src}`}
          className={`absolute ${card.art.className ?? ""}`}
          style={{ left: ax, top: ay, width: aw, height: ah }}
        />
      </div>
    </div>
  );
}

function TestsShowcase() {
  const t = useT();
  return (
    <>
      <Block left={60} top={6589} width={433}>
        <div className="flex flex-col gap-3">
          <VTitle
            icon={<Img src={`${A}/chat-q.svg`} className="size-12 shrink-0" />}
          >
            {t("Test & Question type")}
          </VTitle>
          <div className={vBody}>
            <p>
              {t("The Question Type feature supports various formats, such as single-choice, multiple-choice, true/false, fill-in-the-blank, word selection, drag-and-drop, matching, essay, and case study.")}
            </p>
            <p>&nbsp;</p>
            <p>
              {t("These question types enable a more comprehensive assessment of learner competence, covering everything from knowledge recall to analysis, situational problem-solving, and practical application.")}
            </p>
          </div>
        </div>
      </Block>
      <Block left={635} top={6501} width={714} height={456.5}>
        <Img src={`${A}/tests-ipad.png`} className="size-full" />
      </Block>
      {/* Question cards: three rows so each row fades in on its own. */}
      <Block left={60} top={7025} width={1280} height={707}>
        {QCARDS.slice(0, 3).map((card) => (
          <QuestionCard key={card.title} card={card} />
        ))}
      </Block>
      <Block left={60} top={7756} width={1280} height={714}>
        {QCARDS.slice(3).map((card) => (
          <QuestionCard
            key={card.title}
            card={{
              ...card,
              at: [card.at[0], card.at[1] - 731, card.at[2], card.at[3]],
            }}
          />
        ))}
      </Block>
    </>
  );
}

/* ---------- Calendar (244:16560 @ -260,8532) ---------- */
function CalendarShowcase() {
  const t = useT();
  const lang = useLang();
  return (
    <>
      <Block left={385} top={8590} width={630}>
        <div className="flex flex-col items-center gap-3">
          <VTitle
            center
            icon={
              <Img src={`${A}/cal-icon.svg`} className="size-12 shrink-0" />
            }
          >
            {t("Calendar")}
          </VTitle>
          {lang === "vi" ? (
            <div className={`${vBody} text-center`}>
              <p>
                Tính năng Lịch giúp học viên <b>theo dõi lịch học, ngày thi và các hoạt động quan trọng của khóa học</b> theo tuần hoặc theo tháng.
              </p>
              <p>&nbsp;</p>
              <p>
                Người dùng có thể <b>dễ dàng xem giờ học, hạn chót, hình thức học, nội dung buổi học và trạng thái hoàn thành</b>, từ đó{" "}
                <b>chủ động lên kế hoạch</b> học tập và <b>không bỏ lỡ</b> các mốc quan trọng.
              </p>
            </div>
          ) : (
          <div className={`${vBody} text-center`}>
            <p>
              The Calendar feature allows students to{" "}
              <b>
                track class schedules, exam dates, and key course activities
              </b>{" "}
              on a weekly or monthly basis.
            </p>
            <p>&nbsp;</p>
            <p>
              This feature enables users to{" "}
              <b>
                easily view class times, deadlines, learning formats, session
                content, and completion status
              </b>
              , helping them <b>proactively plan</b> their studies and{" "}
              <b>avoid missing</b> important milestones.
            </p>
          </div>
          )}
        </div>
      </Block>
      <Block left={168} top={8841} width={1064} height={677.5}>
        <Img src={`${A}/calendar.png`} className="size-full" />
      </Block>
    </>
  );
}

/* ---------- Micro Interaction (244:16899 @ -235,9586.65) ---------- */
type Petal = {
  svg: string;
  box: [number, number, number, number];
  inner: [number, number];
  rot: number;
  icon: string;
  iconAt: [number, number];
  dx: number;
  dy: number;
  delay: number;
};

const PETALS: Petal[] = [
  {
    svg: "petal1",
    box: [168.95, 0, 238.305, 288.1],
    inner: [238.305, 288.1],
    rot: 0,
    icon: "mi-trigger",
    iconAt: [254.11, 81.8],
    dx: 0,
    dy: -8,
    delay: 0,
  },
  {
    svg: "petal2",
    box: [0, 168.95, 288.989, 239.194],
    inner: [239.194, 288.989],
    rot: -90,
    icon: "mi-rules",
    iconAt: [79.83, 253.42],
    dx: -8,
    dy: 0,
    delay: 0.9,
  },
  {
    svg: "petal3",
    box: [287.9, 168.95, 288.1, 239.194],
    inner: [239.194, 288.1],
    rot: 90,
    icon: "mi-feedback",
    iconAt: [422.17, 252.53],
    dx: 8,
    dy: 0,
    delay: 1.8,
  },
  {
    svg: "petal4",
    box: [168.75, 288.1, 238.305, 288.989],
    inner: [238.305, 288.989],
    rot: 180,
    icon: "mi-loops",
    iconAt: [252.33, 425.92],
    dx: 0,
    dy: 8,
    delay: 2.7,
  },
];

function MicroFlower() {
  return (
    <div className="relative h-[577.089px] w-[576px]">
      {PETALS.map((p) => {
        const [x, y, w, h] = p.box;
        return (
          <div
            key={p.svg}
            className="mi-petal absolute"
            style={
              {
                left: x,
                top: y,
                width: w,
                height: h,
                "--mi-dx": `${p.dx}px`,
                "--mi-dy": `${p.dy}px`,
              } as CSSProperties
            }
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Img
                src={`${A}/${p.svg}.svg`}
                className="shrink-0"
                style={{
                  width: p.inner[0],
                  height: p.inner[1],
                  transform: p.rot ? `rotate(${p.rot}deg)` : undefined,
                }}
              />
            </div>
            <div
              className="mi-icon absolute size-[71.136px]"
              style={
                {
                  left: p.iconAt[0] - x,
                  top: p.iconAt[1] - y,
                  "--mi-delay": `${p.delay}s`,
                } as CSSProperties
              }
            >
              <Img src={`${A}/${p.icon}.png`} className="size-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MiFactor({
  icon,
  title,
  children,
  left,
  top,
  width,
}: {
  icon: string;
  title: string;
  children: ReactNode;
  left: number;
  top: number;
  width: number;
}) {
  const t = useT();
  return (
    <div
      className="absolute flex flex-col items-start gap-[19px] text-[#252525]"
      style={{ left, top, width }}
    >
      <div className="flex w-full items-center justify-center gap-2.5">
        <Img src={`${A}/${icon}.png`} className="size-8 shrink-0" />
        <p className="min-w-px flex-1 text-[20px] leading-[1.5] font-semibold">
          {t(title)}
        </p>
      </div>
      <div className="w-[340px] text-sm leading-[1.5]">{children}</div>
    </div>
  );
}

function MicroShowcase() {
  const t = useT();
  return (
    <div
      id="wd-micro"
      className="absolute"
      style={{ left: -235, top: 9586.65, width: 1871, height: 942 }}
    >
      <div
        className="absolute w-[630px]"
        style={{ left: 297 + 325, top: 30.35 }}
      >
        <Reveal className="flex flex-col items-start gap-8">
          <Img
            src={`${A}/micro-title.png`}
            style={{ width: 630, height: 78 }}
          />
          <p className={`${vBody} w-full text-center`}>
            {t("Micro Interaction follows four key factors that determine whether animation addresses user behavior, aiming to improve both the user experience and the product interface.")}
          </p>
        </Reveal>
      </div>
      <div
        className="absolute h-[577px] w-[1280px]"
        style={{ left: 297, top: 30.35 + 182 + 64 }}
      >
        <Reveal className={`${inter.className} relative size-full`}>
          <MiFactor
            icon="mi-trigger"
            title="Trigger"
            left={0}
            top={30}
            width={362}
          >
            {t("A trigger is the element that initiates an MI (Mistake, Interaction, Interaction). It's the first event that occurs, triggering a small interaction. Triggers are crucial because they not only initiate the action but also influence the user's emotions and the speed of the experience.")}
          </MiFactor>
          <MiFactor
            icon="mi-feedback"
            title="Feedback"
            left={935}
            top={30}
            width={345}
          >
            {t("Feedback is the visible, tangible aspect that users can see, hear, or feel when they perform an action. Without feedback, users would be constantly confused: “Did I click?”, “Do I need to click again?”, “Why isn’t anything happening?”.")}
          </MiFactor>
          <MiFactor
            icon="mi-rules"
            title="Rules"
            left={0}
            top={426}
            width={362}
          >
            {t("Rules aren't directly displayed on the interface, but they exist deep within the design. Without rules, or with poorly designed rules, micro-interactions can easily become inconsistent, confusing, unreliable, and even cause users to lose control.")}
          </MiFactor>
          <MiFactor
            icon="mi-loops"
            title="Loops & Modes"
            left={936}
            top={426}
            width={344}
          >
            <p>
              {t("In the structure of an MI, Loops & Modes are the “open-ended” parts, meaning they answer two important questions:")}
            </p>
            <ol className="list-decimal">
              <li className="ms-[21px] font-bold">
                {t("Will the response be repeated and how?")}
              </li>
              <li className="ms-[21px] font-bold">
                {t("Will the response need to change when the system or user switches to a different state?")}
              </li>
            </ol>
            <p>
              {t("This is what makes MI dynamic, adapting to context rather than being a fixed, one-time operation.")}
            </p>
          </MiFactor>
          <div className="absolute top-0 left-[352px]">
            <MicroFlower />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Showcase() {
  return (
    <div
      className={`${vietnam.className} relative h-[10529px] w-[1400px] shrink-0`}
    >
      {/* Decorative absolute backgrounds (frame coords; section x 0 = frame x -236). */}
      <Bg name="course" top={2159} height={1082} />
      <Bg name="activity" left={15} top={3979.1} width={1621} height={1145} />
      <Bg name="dashboard" top={5433.1} height={917} />
      <Bg name="calendar" top={8270.1} height={1317} />
      <Bg name="micro" left={-235} top={9587.1} width={1871} height={935} />

      {/* Flow index targets: top of each flow block (frame coords). */}
      <span id="wd-launch-1" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 0 }} />
      <span id="wd-launch-2" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 626 }} />
      <span id="wd-launch-3" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 1995 }} />
      <span id="wd-launch-4" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 3497.65 }} />
      <span id="wd-launch-5" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 5384.65 }} />
      <span id="wd-launch-6" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 6501 }} />
      <span id="wd-launch-7" aria-hidden className="pointer-events-none absolute left-0 h-px w-px" style={{ top: 8532 }} />
      <SignInShowcase />
      <TourShowcase />
      <CourseShowcase />
      <ActivityShowcase />
      <DashboardShowcase />
      <TestsShowcase />
      <CalendarShowcase />
      <MicroShowcase />
    </div>
  );
}

/* ================================================================== */
/* Section — UI For Launch (244:16492)                                 */
/* ================================================================== */

export function SappUiForLaunch() {
  const t = useT();
  return (
    <section
      id="wd-launch"
      className="relative flex h-[10979px] w-full flex-col items-start gap-10 overflow-hidden px-[236px] pt-[140px]"
    >
      <Reveal>
        <div className="flex flex-col items-start gap-[22px]">
          <div className="flex flex-col items-start gap-4">
            <span className="flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
              <span className="size-[7px] shrink-0 rounded-full bg-[#e0457b]" />
              <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">
                {t("FINAL DESIGNS  ·  03.1")}
              </span>
            </span>
            <SappHeading>{t("UI for launch")}</SappHeading>
          </div>
          <p className="w-[760px] text-[22px] leading-[34px] tracking-[-0.11px] text-[var(--cmd-text-secondary)]">
            {t("Seven flows that carry a learner from the first login to exam day — each built from the same components and states.")}
          </p>
        </div>
      </Reveal>
      <Reveal>
        <FlowIndex />
      </Reveal>
      <Showcase />
    </section>
  );
}
