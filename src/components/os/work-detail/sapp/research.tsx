"use client";

import "./research.css";
import { sappBeVietnam } from "./fonts";
import { useLang, useT } from "@/lib/i18n";
import { useCallback, useState, type CSSProperties } from "react";
import { SappEyebrow, SappHeading, SappSectionHead } from "./parts";

const vietnam = sappBeVietnam;

const A = "/figma/sapp/research";

/* ================================================================== */
/* Proto-persona (Figma 247:14767)                                     */
/* ================================================================== */

/** Hero cluster bubbles (247:14776): positions inside the 510×622 group. */
const BUBBLES = [
  {
    // CMA Student — 247:14777
    label: "CMA Student",
    left: 295,
    top: 141,
    size: 215,
    color: "#ff5ec6",
    clear: "rgba(255,94,198,0)",
    img: `${A}/cma.webp`,
    imgBox: { left: -3.12, top: 6.89, width: 218.48, height: 218.48 },
    chip: { left: 48.23, top: 188.26, px: 10.513, py: 6.571, r: 5.257, fs: 14.274, ls: 0.1427, sh: "0 2.628px 3.943px rgba(0,0,0,0.08)" },
  },
  {
    // ACCA Student — 247:14783
    label: "ACCA Student",
    left: 0,
    top: 0,
    size: 282,
    color: "#00d354",
    clear: "rgba(0,211,84,0)",
    img: `${A}/acca.webp`,
    imgBox: { left: -29.07, top: 17, width: 314, height: 313 },
    chip: { left: -32, top: 208.61, px: 14.432, py: 9.02, r: 7.216, fs: 19.594, ls: 0.1959, sh: "0 3.608px 5.412px rgba(0,0,0,0.08)" },
  },
  {
    // CFA Student — 247:14789
    label: "CFA Student",
    left: 26,
    top: 327,
    size: 295,
    color: "#6161ff",
    clear: "rgba(97,97,255,0)",
    img: `${A}/cfa.webp`,
    imgBox: { left: -9.73, top: 0.25, width: 315, height: 315 },
    chip: { left: 173.98, top: 222.1, px: 13.643, py: 8.527, r: 6.822, fs: 18.524, ls: 0.1852, sh: "0 3.411px 5.116px rgba(0,0,0,0.08)" },
  },
] as const;

type Persona = {
  name: string;
  age: string;
  job: string;
  target: string;
  desc: string;
  needs: string[];
  pains: string[];
  color: string;
  clear: string;
  soft: string;
  needsInk: string;
  img: string;
  imgLeft: number;
  imgTop: number;
};

/** "Component 12" variants (217:13939 / 217:14003 / 217:14067), content verbatim from Figma. */
const PERSONAS: Persona[] = [
  {
    name: "CFA Student",
    age: "22-30",
    job: "Sinh viên",
    target: "Có định hướng học và thi CFA",
    desc: "CFA candidates tend to engage in long-term self-study, dedicating significant time to reading materials and taking quizzes. They often tackle complex tests and review their results repeatedly to improve.",
    needs: [
      "Tóm tắt nội dung trọng tâm, dễ hiểu",
      "Lộ trình học cá nhân hóa theo thời gian biểu",
      "Dashboard theo dõi tiến độ và cảnh báo chậm",
      "Học linh hoạt trên nhiều thiết bị, truy cập nhanh",
      "Bài luyện tập sát đề, giải thích chi tiết",
    ],
    pains: [
      "Quá nhiều tài liệu, khó biết bắt đầu từ đâu",
      "Thiếu định hướng khi chưa có nền tảng CFA",
      "Khó cân bằng thời gian giữa học và công việc",
      "Thiếu động lực nếu không có nhắc nhở/kèm cặp",
    ],
    color: "#00d354",
    clear: "rgba(0,211,84,0)",
    soft: "#deffeb",
    needsInk: "#000000",
    img: `${A}/acca.webp`,
    imgLeft: -20.29,
    imgTop: 11.87,
  },
  {
    name: "ACCA Student",
    age: "22-27",
    job: "Sinh viên",
    target: "Nâng cao kỹ năng ACCA",
    desc: "ACCA students require a study foundation featuring a clear roadmap, personalized support, and easy-to-understand materials to overcome challenges related to self-study, English proficiency, and complex subject matter.",
    needs: [
      "Học được trên cả mobile và desktop",
      "Tài liệu và bài tập tập trung, dễ tìm",
      "Có giải thích từ vựng chuyên ngành (Anh–Việt)",
      "Học theo lộ trình rõ ràng",
    ],
    pains: [
      "Học mobile không ổn định khi làm test",
      "Khó tiếp cận kiến thức chuyên sâu, dạng exam",
      "Thiếu hỗ trợ từ vựng và tài liệu",
      "Khó tìm nội dung học phù hợp",
      "Nội dung chưa được tổ chức rõ ràng",
    ],
    color: "#ff5ec6",
    clear: "rgba(255,94,198,0)",
    soft: "#ffe5f6",
    needsInk: "#000000",
    img: `${A}/cma.webp`,
    imgLeft: -20.29,
    imgTop: -3,
  },
  {
    name: "CMA Student",
    age: "25-35",
    job: "Người đi làm",
    target: "Muốn chuyển hướng hoặc thăng tiến",
    desc: "CMA students acquire knowledge through videos, materials, and real-world scenarios, combining theory with practical application. The learning process integrates intensive practice and essay-based assessments to maximize effectiveness.",
    needs: [
      "Lộ trình học cá nhân hóa theo lịch làm việc",
      "Case study, bài tập tình huống gần với công việc thực tế",
      "Nội dung rõ ràng, dễ tra cứu",
    ],
    pains: [
      "Khó tiếp cận nội dung chuyên sâu nhưng thực tế",
      "Thiếu bước hướng dẫn cụ thể khi bài toán khó",
      "Thường xuyên thiếu thời gian vì lịch bận",
      "Muốn biết cần tập trung phần nào để đạt kết quả tốt",
    ],
    color: "#6161ff",
    clear: "rgba(97,97,255,0)",
    soft: "#ddddff",
    needsInk: "#000000",
    img: `${A}/cfa.webp`,
    imgLeft: -10,
    imgTop: 0,
  },
];

function Bullet() {
  return (
    <svg width="14" height="19" viewBox="0 0 14 19" fill="none" aria-hidden className="shrink-0">
      <path
        d="M10.9611 9.26351C12.3048 10.0313 12.3048 11.9687 10.9611 12.7365L2.99228 17.2901C1.65896 18.052 0 17.0893 0 15.5536L0 6.44636C0 4.91071 1.65897 3.94798 2.99228 4.70987L10.9611 9.26351Z"
        fill="#3D3D3D"
      />
    </svg>
  );
}

/** `nowrap` rows are fixed 392px / nowrap text in Figma (single line, may run past the padding); the rest wrap. */
function PersonaCard({
  title,
  items,
  color,
  soft,
  ink,
  bold,
  nowrap,
}: {
  title: string;
  items: string[];
  color: string;
  soft: string;
  ink: string;
  bold?: boolean;
  nowrap: (i: number) => boolean;
}) {
  const t = useT();
  return (
    <div
      className="wd-hover flex min-h-[284px] w-[391px] shrink-0 flex-col items-start gap-4 rounded-[24px] p-6"
      style={{ background: soft, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <p className={`w-full text-[20px] leading-[1.5] ${bold ? "font-bold" : "font-semibold"}`} style={{ color }}>
        {t(title)}
      </p>
      <ul className="flex w-full flex-col gap-4">
        {items.map((x, i) => (
          <li key={x} className="flex w-full items-start gap-3">
            <Bullet />
            <span className={`text-[14px] leading-[1.5] ${nowrap(i) ? "whitespace-nowrap" : "min-w-px flex-1"}`} style={{ color: ink }}>
              {t(x)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Motion = { index: number; prev: number | null; dir: 1 | -1 };

function paneClass(i: number, m: Motion) {
  if (i === m.index) return m.prev === null ? "rp-pane" : `rp-pane ${m.dir === 1 ? "is-in-next" : "is-in-prev"}`;
  if (i === m.prev) return `rp-pane ${m.dir === 1 ? "is-out-next" : "is-out-prev"}`;
  return "rp-pane is-idle";
}

function ArrowButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? t("Next persona") : t("Previous persona")}
      className="rp-btn flex shrink-0 cursor-pointer items-center rounded-full bg-white p-1.5"
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/arrow.svg`} alt="" width={24} height={24} className={`block size-6 ${dir === -1 ? "rotate-180" : ""}`} />
    </button>
  );
}

/** Figma "Component 12" (247:14796): persona switcher with three variants. */
function PersonaCarousel() {
  const t = useT();
  const [m, setM] = useState<Motion>({ index: 0, prev: null, dir: 1 });
  const n = PERSONAS.length;
  const go = useCallback((dir: 1 | -1) => setM((s) => ({ index: (s.index + dir + n) % n, prev: s.index, dir })), [n]);
  const jump = useCallback((i: number) => setM((s) => (i === s.index ? s : { index: i, prev: s.index, dir: i > s.index ? 1 : -1 })), []);
  const current = PERSONAS[m.index];

  return (
    <div
      className="flex w-full items-start gap-[50px]"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("Proto-personas")}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Avatar + controls */}
      <div className="flex w-[197px] shrink-0 flex-col items-center gap-3">
        <div className="rp-avatar relative grid size-[197px] overflow-hidden rounded-full">
          {PERSONAS.map((p, i) => (
            <div key={p.name} className={`${paneClass(i, m)} relative size-[197px]`} aria-hidden={i !== m.index}>
              <div className="absolute inset-0" style={{ background: p.color }} />
              <div className="absolute size-[218.482px]" style={{ left: p.imgLeft, top: p.imgTop }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={i === m.index ? t(p.name) : ""} className="absolute inset-0 size-full max-w-none object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${p.clear} 54.021%, ${p.color} 76.67%)` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ArrowButton dir={-1} onClick={() => go(-1)} />
          <div className="flex items-center gap-[5px]">
            {PERSONAS.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-label={t("Show {name}", { name: t(p.name) })}
                aria-current={i === m.index}
                onClick={() => jump(i)}
                className="rp-dot h-2 cursor-pointer rounded-full"
                style={{ width: i === m.index ? 39 : 8, background: i === m.index ? "#ffb700" : "#d9d9d9" }}
              />
            ))}
          </div>
          <ArrowButton dir={1} onClick={() => go(1)} />
        </div>
      </div>

      {/* Persona content */}
      <div className="grid w-[822px] shrink-0" aria-live="polite">
        {PERSONAS.map((p, i) => (
          <div key={p.name} className={`${paneClass(i, m)} flex flex-col items-start gap-10`} aria-hidden={i !== m.index}>
            <div className="flex w-[765.829px] flex-col items-start gap-8 text-[#1b1b1b]">
              <div className="flex w-full flex-col items-start gap-2">
                <p className="font-[family-name:var(--font-open-sans)] text-[24px] leading-[32px] font-bold">{t(p.name)}</p>
                <div className="flex w-[455px] flex-col items-start justify-center gap-2 text-[16px] leading-[1.5] whitespace-nowrap">
                  <p>
                    <span className="font-bold">{t("Age:")}</span> {p.age}
                  </p>
                  <p>
                    <span className="font-bold">{t("Job:")}</span> {p.job}
                  </p>
                  <p>
                    <span className="font-bold">{t("Target:")}</span> {p.target}
                  </p>
                </div>
              </div>
              <p className="w-full text-[16px] leading-[1.5]">{t(p.desc)}</p>
            </div>
            <div className="flex w-full items-center gap-10">
              <PersonaCard title="Nhu cầu" items={p.needs} color={p.color} soft={p.soft} ink={p.needsInk} nowrap={(j) => j === 0} />
              <PersonaCard title="Pain points" items={p.pains} color={p.color} soft={p.soft} ink="#1b1b1b" bold nowrap={(j) => j % 2 === 0} />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">{t("Showing {name}", { name: t(current.name) })}</span>
    </div>
  );
}

function Bubble({ b }: { b: (typeof BUBBLES)[number] }) {
  const t = useT();
  const c = b.chip;
  return (
    <div className="absolute" style={{ left: b.left, top: b.top, width: b.size, height: b.size }}>
      <div className="absolute inset-0 overflow-hidden rounded-full" style={{ background: b.color }}>
        <div className="absolute" style={b.imgBox}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.img} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${b.clear} 54.021%, ${b.color} 76.67%)` }} />
        </div>
      </div>
      <div
        className="wd-hover absolute flex items-center justify-center bg-white"
        style={{ left: c.left, top: c.top, padding: `${c.py}px ${c.px}px`, borderRadius: c.r, boxShadow: c.sh }}
      >
        <p className="text-center leading-[1.5] font-bold whitespace-nowrap text-[#3d3d3d]" style={{ fontSize: c.fs, letterSpacing: c.ls }}>
          {t(b.label)}
        </p>
      </div>
    </div>
  );
}

export function SappPersona() {
  const t = useT();
  const lang = useLang();
  return (
    <section id="wd-persona" className="relative flex w-full flex-col">
      {/* Section — Proto-persona (247:14768) */}
      <div className="flex h-[722px] w-full items-center justify-between px-[236px] pt-[100px]">
        <div className="flex w-[634px] shrink-0 flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-4">
            <SappEyebrow label={t("RESEARCH  ·  01.2")} />
            <SappHeading>Proto-persona</SappHeading>
          </div>
          {lang === "vi" ? (
            <div className="w-full text-[16px] leading-6 text-[#0a0a0a]">
              <p>
                Người dùng chính của <b>LMS Pro</b> là <b>học viên ACCA, CFA và CMA.</b> Phần lớn là sinh viên hoặc người đi làm, phải cân bằng
                giữa việc học, công việc và ôn thi.
              </p>
              <p aria-hidden>&nbsp;</p>
              <p>
                Họ cần <b>lộ trình học rõ ràng,</b> <b>truy cập</b> tài liệu khóa học dễ dàng,<b> theo dõi tiến độ, kết quả kiểm tra, lịch học và nhắc nhở.</b> LMS
                Pro giúp họ học tập có tổ chức, chủ động tự học và chuẩn bị hiệu quả hơn cho các kỳ thi chứng chỉ.
              </p>
            </div>
          ) : (
          <div className="w-full text-[16px] leading-6 text-[#0a0a0a]">
            <p>
              The main users of <b>LMS Pro</b> are <b>ACCA, CFA, and CMA learners.</b> They are mostly students or working professionals who need
              to balance study, work, and exam preparation.
            </p>
            <p aria-hidden>&nbsp;</p>
            <p>
              They need a <b>clear learning path,</b> <b>easy acces</b>s to course materials,<b> progress tracking, test results, schedules, and reminders.</b> LMS
              Pro helps them stay organized, learn independently, and prepare more effectively for their certification exams.
            </p>
          </div>
          )}
        </div>
        <div className={`${vietnam.className} relative h-[622px] w-[510px] shrink-0`}>
          {BUBBLES.map((b) => (
            <Bubble key={b.label} b={b} />
          ))}
        </div>
      </div>

      {/* Frame 2144769507 (247:14795) */}
      <div className={`${vietnam.className} mt-8 flex h-[556px] w-full flex-col items-start pl-[285px]`}>
        <PersonaCarousel />
      </div>
    </section>
  );
}

/* ================================================================== */
/* Heuristic evaluation (Figma 247:14797)                              */
/* ================================================================== */

/** Pastel blocks behind the cards (247:14806…14811), in group coordinates. */
const DECO = [
  { l: 386, t: 0, w: 222, h: 171, bg: "#fdf1e4" },
  { l: 1100, t: 36, w: 177, h: 166, bg: "#fff2f2" },
  { l: 1055, t: 816, w: 177, h: 176, bg: "#fff2f2" },
  { l: 449, t: 1295, w: 178, h: 180, bg: "#e9f6ff" },
  { l: 663, t: 1368, w: 392, h: 64, bg: "#fff2f2" },
  { l: 15, t: 418, w: 177, h: 177, bg: "#ebfffd" },
];

type Rule = {
  key: string;
  /** One line, or two lines split by a <br />. */
  title: string | readonly [string, string];
  desc: string;
  box: CSSProperties;
  pad: string;
  gap?: string;
  shadow?: boolean;
  /** Art layer: outer abs box, optional rotation/flip, optional crop of the bitmap. */
  art: {
    box: CSSProperties;
    inner?: { w: number; h: number; transform: string };
    crop?: CSSProperties;
    src: string;
  };
};

const RULES: Rule[] = [
  {
    key: "1",
    title: "1. Visibility of System Status",
    desc: "Keep users informed about what is happening through clear feedback.",
    box: { left: 0, top: 40, width: 222, height: 343, background: "#ebf4ff", borderRadius: 24 },
    pad: "pt-6 px-6",
    art: { box: { left: 74, top: 225, width: 100, height: 78 }, crop: { height: "180%", left: "-22.74%", top: "-46.4%", width: "140.19%" }, src: `${A}/h1.webp` },
  },
  {
    key: "6",
    title: "6. Recognition Rather Than Recall",
    desc: "Make options, actions, and information visible so users do not need to remember everything.",
    box: { left: 0, top: 630, width: 232, height: 343, background: "#edfff6", borderRadius: 24 },
    pad: "pt-6 px-6",
    art: { box: { left: -39, top: 253, width: 120, height: 120 }, src: `${A}/h6.webp` },
  },
  {
    key: "5",
    title: "5. Error Prevention",
    desc: "Prevent mistakes before they happen with clear guidance and constraints.",
    box: { left: 1055, top: 423, width: 222, height: 343, background: "#ebf4ff", borderRadius: 24 },
    pad: "pt-6 px-6",
    art: { box: { left: 73, top: 225, width: 143, height: 144 }, src: `${A}/h5.webp` },
  },
  {
    key: "2",
    title: ["2. Match Between System", "and Real World"],
    desc: "Use familiar language, concepts, and workflows that users understand.",
    box: { left: 259, top: 202, width: 355, height: 402, background: "#fff6fe", borderRadius: 24, justifyContent: "flex-end" },
    pad: "pt-[38px] pb-12 px-8",
    art: { box: { left: 89.5, top: 35, width: 174, height: 174 }, src: `${A}/h2.webp` },
  },
  {
    key: "3",
    title: "3. User Control and Freedom",
    desc: "Allow users to undo, cancel, go back, or exit easily.",
    box: { left: 666, top: 57, width: 394, height: 326, background: "#ffffff", borderRadius: 24 },
    pad: "pt-8 px-8",
    shadow: true,
    art: { box: { left: 143, top: 157, width: 145, height: 145 }, src: `${A}/h3.webp` },
  },
  {
    key: "4",
    title: "4. Consistency and Standards",
    desc: "Allow users to undo, cancel, go back, or exit easily.",
    box: { left: 666, top: 418, width: 341, height: 217, background: "#ffffff", borderRadius: 24 },
    pad: "pt-6 px-6",
    art: { box: { left: 170, top: 113, width: 152.7, height: 152.7 }, inner: { w: 122.62, h: 122.62, transform: "rotate(16.71deg)" }, src: `${A}/h4.webp` },
  },
  {
    key: "7",
    title: "7. Flexibility and Efficiency of Use",
    desc: "Support both new and experienced users with efficient interactions.",
    box: { left: 259, top: 636, width: 328, height: 407, background: "#ffffff", borderRadius: 24 },
    pad: "pt-[231px] px-8",
    shadow: true,
    art: {
      box: { left: 105.15, top: 21.88, width: 143.269, height: 179.36 },
      inner: { w: 115.488, h: 160.747, transform: "rotate(10.68deg)" },
      crop: { height: "129.61%", left: "-41.89%", top: "-14.56%", width: "180.41%" },
      src: `${A}/h7.webp`,
    },
  },
  {
    key: "9",
    title: "9. Help Users Recognize and Recover from Errors",
    desc: "Use clear error messages and provide actionable solutions.",
    box: { left: 232, top: 1073, width: 395, height: 176, background: "#ffe2e2", borderRadius: 16 },
    pad: "pt-7 px-6",
    gap: "gap-[14px]",
    art: { box: { left: -58, top: 124, width: 114.518, height: 111.639 }, inner: { w: 88, h: 82, transform: "rotate(154.83deg) scaleY(-1)" }, src: `${A}/h9.webp` },
  },
  {
    key: "10",
    title: "10. Help and Documentation",
    desc: "Provide guidance, instructions, or support when users need help.",
    box: { left: 663, top: 1036, width: 392, height: 301, background: "#fffee5", borderRadius: 16 },
    pad: "pt-8 pl-[31px] pr-8",
    art: { box: { left: 71, top: 141, width: 147.389, height: 147.389 }, inner: { w: 126.25, h: 126.25, transform: "rotate(10.64deg)" }, src: `${A}/h10.webp` },
  },
  {
    key: "8",
    title: ["8. Aesthetic and", "Minimalist Design"],
    desc: "Show only necessary information and avoid visual clutter.",
    box: { left: 627, top: 667, width: 380, height: 338, background: "#fbeafe", borderRadius: 24 },
    pad: "pt-8 px-8",
    art: { box: { left: 189, top: 168, width: 150, height: 155 }, crop: { height: "168.48%", left: "-30.34%", top: "-25.57%", width: "161.38%" }, src: `${A}/h8.webp` },
  },
];

function RuleArt({ art }: { art: Rule["art"] }) {
  const bitmap = art.crop ? (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={art.src} alt="" className="absolute max-w-none" style={art.crop} />
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={art.src} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
  );
  return (
    <div className="hx-art pointer-events-none absolute flex items-center justify-center" style={art.box}>
      {art.inner ? (
        <div className="relative flex-none" style={{ width: art.inner.w, height: art.inner.h, transform: art.inner.transform }}>
          {bitmap}
        </div>
      ) : (
        bitmap
      )}
    </div>
  );
}

function RuleCard({ r }: { r: Rule }) {
  const t = useT();
  return (
    <article
      className={`hx-card wd-hover absolute flex flex-col items-start border border-solid border-[#e2e2e2] ${r.gap ?? "gap-3"} ${r.pad}`}
      style={{ ...r.box, boxShadow: r.shadow ? "0 4px 6px rgba(0,0,0,0.05)" : undefined }}
    >
      <h3 className="relative w-full text-[20px] leading-[1.5] font-bold tracking-[0.2px] text-[#1b1b1b]">
        {typeof r.title === "string" ? (
          t(r.title)
        ) : (
          <>
            {t(r.title[0])}
            <br />
            {t(r.title[1])}
          </>
        )}
      </h3>
      <p className="hx-desc relative w-full text-[16px] leading-[1.5] text-[#1b1b1b]">{t(r.desc)}</p>
      <RuleArt art={r.art} />
    </article>
  );
}

export function SappHeuristic() {
  const t = useT();
  return (
    <section id="wd-heuristic" className="relative flex w-full flex-col items-center justify-center gap-12 px-[156px] pt-[100px]">
      <div className="flex w-full flex-col items-center">
        <SappSectionHead
          eyebrow={t("RESEARCH  ·  01.3")}
          title={t("Heuristic evaluation")}
          align="center"
          leadWidth={760}
          lead={t("I evaluated the LMS Pro experience against 10 common usability rules of Norman to find issues in navigation, content clarity, system feedback, consistency and error prevention — across course access, progress tracking, testing, schedules and notifications.")}
        />
      </div>
      {/* Group 1321316466 (247:14805) */}
      <div className={`${vietnam.className} hx-board relative h-[1475px] w-[1277px] shrink-0`}>
        {DECO.map((d) => (
          <div
            key={`${d.l}-${d.t}`}
            aria-hidden
            className="hx-deco absolute rounded-[16px]"
            style={{ left: d.l, top: d.t, width: d.w, height: d.h, background: d.bg }}
          />
        ))}
        {RULES.map((r) => (
          <RuleCard key={r.key} r={r} />
        ))}
      </div>
    </section>
  );
}
