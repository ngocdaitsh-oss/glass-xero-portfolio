/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
import type { CSSProperties, ReactNode } from "react";
import { PersonaMetrics } from "./bave/Metrics";
import { useLang, useT } from "@/lib/i18n";
import { Card, Eyebrow, Heading, OffsetCard, PhoneMock, SectionHead, type Phase } from "./parts";
import { HeroFit } from "./shell";

export function Hero() {
  const t = useT();
  return (
    <section id="wd-overview-hero" className="p-8">
      <HeroFit className="overflow-hidden rounded-[50px]">
        <img src="/figma/wd/hero-bg.png" alt="" className="absolute top-[-8.91%] left-0 h-[127.06%] w-full max-w-none" />
        <img data-rv src="/figma/wd/hero-logo.svg" alt="bave" className="absolute top-[232.78px] left-1/2 h-[154.383px] w-[474.722px] -translate-x-1/2" />
        <img data-rv src="/figma/wd/hero-tagline.svg" alt={t("Driving connected")} className="absolute top-[423.82px] left-1/2 h-[25.41px] w-[474.722px] -translate-x-1/2" />
        <div data-rv className="absolute top-[610px] left-1/2 flex w-[846px] -translate-x-1/2 justify-between rounded-[24px] bg-[rgba(0,134,163,0.5)] px-8 py-6 text-white shadow-[0_4.178px_17.34px_0_rgba(0,0,0,0.15)] ">
          {[
            ["Position:", ["Product Designer", "Graphic Designer"]],
            ["Target:", ["Partners, age range", "from 18-45"]],
            ["Platform:", ["Mobile App, Website"]],
            ["Status:", ["Designing", "Developing"]],
          ].map(([label, lines]) => (
            <div key={label as string} className="flex flex-col gap-2 whitespace-nowrap">
              <p className="text-2xl leading-8 font-bold">{t(label as string)}</p>
              <div className="text-base leading-6">
                {(lines as string[]).map((line) => (
                  <p key={line}>{t(line)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </HeroFit>
    </section>
  );
}

const MONO_LABEL = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap text-[#4b4f58]";

/** Figma "Bento v2" (640:29380): challenge → opportunity row, then one white facts card in three columns. */
export function ProcessHighlight() {
  const t = useT();
  const sides = [
    {
      dot: "/figma/wd/v2/ov-dot-gray.svg",
      kicker: "01 — CHALLENGE",
      title: "Design an e‑commerce app for car services",
      body: "Real-world booking experience, car services and promotions — with quick, low-friction functionality.",
      pad: "pr-14",
    },
    {
      dot: "/figma/wd/v2/ov-dot-blue.svg",
      kicker: "02 — OPPORTUNITY",
      title: "One app, many garage brands",
      body: "Link multiple garage brands in a single product to grow engagement and hit business goals for both sides.",
      pad: "pl-14",
    },
  ];
  const lists: [string, string[]][] = [
    ["DISCIPLINES", ["User Experience Design", "User Interface Design"]],
    ["RESPONSIBILITIES", ["UX Research", "Sketching", "UI Design", "Data Research", "Prototyping"]],
  ];
  const side = (s: (typeof sides)[number]) => (
    <div key={s.kicker} data-rv className={`flex min-w-0 flex-1 flex-col gap-5 py-2 ${s.pad}`}>
      <div className="flex items-center gap-2.5">
        <img src={s.dot} alt="" width={8} height={8} />
        <p className={MONO_LABEL}>{t(s.kicker)}</p>
      </div>
      <p className="text-[36px] leading-[44px] font-semibold tracking-[-0.72px] text-[#0a0a0a]">{t(s.title)}</p>
      <p className="text-[22px] leading-[34px] tracking-[-0.11px] text-[#4b4f58]">{t(s.body)}</p>
    </div>
  );
  return (
    <section id="wd-overview" className="flex flex-col gap-10 px-[156px] pt-[100px]">
      <div data-rv className="flex flex-col gap-4">
        <Eyebrow label={t("PROCESS HIGHLIGHT")} />
        <Heading>{t("Overview")}</Heading>
      </div>
      <div className="flex flex-col gap-14 pb-2">
        <div className="flex items-start">
          {side(sides[0])}
          <div aria-hidden data-rv className="flex w-16 shrink-0 flex-col items-center gap-3 self-stretch">
            <span className="w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[rgba(10,10,15,0.08)] bg-white shadow-[0_4px_14px_0_rgba(10,10,15,0.08)]">
              <img src="/figma/wd/v2/ov-arrow-right.svg" alt="" width={24} height={24} />
            </span>
            <span className="w-px flex-1 bg-[rgba(10,10,15,0.1)]" />
          </div>
          {side(sides[1])}
        </div>
        <div data-rv className="wd-hover flex overflow-hidden rounded-[28px] bg-white shadow-[6px_6px_0_0_var(--wd-research-back),inset_0_1px_0_0_var(--cmd-edge)]">
          {lists.map(([label, items], i) => (
            <div key={label} className={`flex min-w-0 flex-1 flex-col gap-5 self-stretch px-9 pt-8 pb-9 ${i ? "border-l border-[rgba(10,10,15,0.08)]" : ""}`}>
              <p className={MONO_LABEL}>{t(label)}</p>
              <div className="flex flex-col gap-1.5 text-[20px] leading-[30px] tracking-[-0.1px] text-[#0a0a0a]">
                {items.map((item) => (
                  <p key={item}>{t(item)}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="flex min-w-0 flex-1 flex-col gap-5 self-stretch border-l border-[rgba(10,10,15,0.08)] px-9 pt-8 pb-9">
            <p className={MONO_LABEL}>{t("TOOLS USING")}</p>
            <div className="flex gap-2.5">
              {(
                [
                  ["/figma/wd/v2/ov-tool-figma.png", "Figma"],
                  ["/figma/wd/v2/ov-tool-ai.png", "Illustrator"],
                  ["/figma/wd/v2/ov-tool-ps.png", "Photoshop"],
                ] as const
              ).map(([src, alt]) => (
                <span key={alt} className="relative block size-14 shrink-0">
                  {/* Exported with its drop and inner shadows: 88×88 around the 56px tile. */}
                  <img src={src} alt={alt} width={88} height={88} className="absolute top-[-12px] left-[-16px] size-[88px] max-w-none" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OurVision() {
  const t = useT();
  return (
    <section id="wd-vision" className="relative h-[576px] px-[156px] pt-40">
      {/* Figma Vector 7: runs past the section into the next one, so the section does not clip it. */}
      <div aria-hidden className="pointer-events-none absolute top-[-104px] left-[-24px] flex h-[981.362px] w-[2187.198px] items-center justify-center">
        <div className="flex-none rotate-[179deg] -scale-y-100">
          <div className="relative h-[943.716px] w-[2171.101px]">
            <div className="absolute inset-[-0.42%_0_-0.26%_-0.15%]">
              <img src="/figma/wd/vision-line.svg" alt="" className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-[416px] items-center justify-between">
        <div data-rv className="flex w-[797px] flex-col gap-10">
          <Eyebrow label={t("BACKGROUND · OUR VISION")} />
          <p className="text-[44px] leading-[56px] tracking-[-1.1px] text-[var(--cmd-text-primary)]">
            <span className="text-[var(--cmd-text-muted)]">
              {t("Garage brands have more resources than regular garages — better service, less visibility.")}{" "}
            </span>
            {t("Bave gives them a fair stage: new customers, engaging media, points-based incentives and a real automotive community.")}
          </p>
        </div>
        <span data-rv className="block h-[172px] w-[526px] shrink-0">
          <span className="theme-light-only">
            <img src="/figma/wd/vision-logo.svg" alt="bave" className="block h-[172px] w-[526px]" />
          </span>
          <span className="theme-dark-only">
            <img src="/figma/wd/vision-logo-on-dark.svg" alt="bave" className="block h-[172px] w-[526px]" />
          </span>
        </span>
      </div>
    </section>
  );
}

const SPRINT = [
  ["01", "Research", ["Identifying Problems", "Desk Research", "Competitor Analysis", "User Surveys"]],
  ["02", "Synthesis", ["Persona", "User Journey"]],
  ["03", "Ideation", ["Developing a Solution", "Moodboard", "Low Fidelity", "Mid Fidelity", "High Fidelity", "Major Improvements"]],
  ["04", "Final Designs", ["Design System", "UI Design"]],
  ["05", "Research", ["Identifying Problems", "Desk Research", "Competitor Analysis", "User Surveys"]],
] as const;

const SPRINT_COLS: [number, number][] = [
  [0, 290],
  [290, 303.5],
  [593.5, 312.5],
  [906, 334],
  [1240, 243],
];

export function DesignProcess() {
  const t = useT();
  // The light sprint is a Figma PNG with English baked in; Vietnamese uses the live cards instead.
  const live = useLang() === "vi";
  return (
    <section id="wd-process" className="flex flex-col items-center gap-12 px-[156px] pt-40">
      <div data-rv className="flex w-[670px] flex-col items-center gap-[22px] text-center">
        <h2 className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">
          <span className="text-[var(--brand-bave)]">{t("Design Sprint")}</span>{" "}
          <span className="text-[var(--cmd-text-muted)]">{t("Process")}</span>
        </h2>
        <p className="text-[20px] leading-7 text-[var(--cmd-text-secondary)]">
          {t("Every work detail follows the same arc — research the problem, build the system, then design the UI that ships.")}
        </p>
      </div>
      {/* The Figma export (190:21563) cut into five columns at the card edges (0 / 290 / 593.5 / 906 / 1240):
          each card enters with its outgoing arrow, one after another. */}
      <div role="img" aria-label={t("Design sprint: 01 Research, 02 Synthesis, 03 Ideation, 04 Final Designs, 05 Research")} className={`${live ? "hidden" : "theme-light-only"} relative h-[299px] w-[1483px]`}>
        {SPRINT_COLS.map(([x, w]) => (
          <div key={x} data-rv className="absolute top-0 h-[299px] overflow-hidden" style={{ left: x, width: w }}>
            <img src="/figma/wd/sprint.png" alt="" width={1483} height={299} className="absolute top-0 h-[299px] w-[1483px] max-w-none" style={{ left: -x }} />
          </div>
        ))}
      </div>
      <div className={`${live ? "" : "theme-dark-only"} relative h-[299px] w-[1483px]`}>
        <div className="flex h-full justify-between">
          {SPRINT.map(([n, title, items]) => (
            <div
              key={n + title}
              className="relative h-[299px] w-[243px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,var(--wd-sprint-top),var(--wd-sprint-bottom))] px-5 pt-5"
            >
              <div aria-hidden className="absolute -top-[73px] left-[24px] size-[260px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, var(--brand-bave) 0%, transparent 70%)" }} />
              <p className="relative text-[40px] leading-[48px] font-bold text-[var(--brand-bave)]">{n}</p>
              <p className="relative mt-4 text-xl leading-[30px] font-bold text-[var(--cmd-text-primary)]">{t(title)}</p>
              <ul className="relative mt-2 list-disc pl-5 text-[15px] leading-6 text-[var(--cmd-text-secondary)]">
                {items.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            aria-hidden
            className="absolute top-[41px] flex h-3 items-center text-[var(--brand-bave)]"
            style={{ left: 106 + index * 310, width: 204 }}
          >
            <span className="size-3 shrink-0 rounded-full border-2 border-current bg-[var(--cmd-bg)]" />
            <span className="h-0.5 flex-1 bg-current" />
            <svg width="10" height="12" viewBox="0 0 10 12" className="shrink-0">
              <path d="M0 1 L9 6 L0 11 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </section>
  );
}

export function PhaseBand({
  id,
  number,
  title,
  lead,
  steps,
  tone,
}: {
  id: string;
  number: string;
  title: string;
  lead: string;
  steps: string[];
  tone: "research" | "system" | "ui";
}) {
  const t = useT();
  /**
   * Figma phase tokens (190:21622 / 190:21930 / 190:22459). The glow is the Figma
   * blurred ellipse baked to a bitmap (no CSS blur); `dot` is the deep-tone grid
   * pre-multiplied over the band (Figma: 30% multiply), so no blend mode is needed.
   */
  const colors = {
    research: { band: "#1ec8f0", back: "#0a7fa3", dot: "rgb(21,170,214)", glow: "/figma/wd/v2/phase1-glow.webp", glowBox: { right: -456, top: -306, size: 1273 } },
    system: { band: "#5b6bff", back: "#2c34b5", dot: "rgb(68,81,233)", glow: "/figma/wd/v2/phase2-glow.webp", glowBox: { right: -297, top: -136.11, size: 912 } },
    ui: { band: "#ff5fa8", back: "#b8236b", dot: "rgb(234,70,139)", glow: "/figma/wd/v2/phase3-glow.webp", glowBox: { right: 1640 - 929 - 902, top: -168.93, size: 902 } },
  }[tone];
  return (
    <section id={id} className="px-[116px] pt-[100px]">
      <div
        className="relative h-[400px] overflow-hidden rounded-[40px]"
        style={{ background: colors.band, boxShadow: `8px 8px 0 0 ${colors.back}` }}
      >
        <img
          src={colors.glow}
          alt=""
          aria-hidden
          className="pointer-events-none absolute max-w-none"
          style={{ right: colors.glowBox.right, top: colors.glowBox.top, width: colors.glowBox.size, height: colors.glowBox.size }}
        />
        <div
          aria-hidden
          className="absolute inset-[0_1.41%_3.5%_0]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.05px 1px, ${colors.dot} 1px, transparent 1.25px)`,
            backgroundSize: "25.23px 24px",
          }}
        />
        <p data-rv className="absolute top-[202px] left-12 text-[180px] leading-[168px] font-bold whitespace-nowrap text-white">{number}</p>
        <div data-rv className="absolute top-1/2 left-[520px] flex -translate-y-1/2 flex-col items-start gap-[18px] text-white">
          <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap">{t("PHASE {n}", { n: number })}</p>
          <p className="text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap">{title}</p>
          <p className="w-[860px] text-[20px] leading-7">{lead}</p>
          <div className="flex w-[900px] flex-wrap content-start gap-2">
            {steps.map((step) => (
              <span key={step} className="wd-hover rounded-full bg-white px-3 py-1.5 text-base leading-6 tracking-[-0.2px] whitespace-pre text-[#0b0d12]">
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InitialProblem() {
  const t = useT();
  // Figma 190:21654…: 32px brand icons on a bare 40px tile (the first sits at the top of its tile).
  const needs = [
    ["/figma/wd/v2/problem-icon-cursor.svg", "Fast", "Book in a few taps", "items-start"],
    ["/figma/wd/v2/problem-icon-pin.svg", "Convenient", "Garages near home", "items-center"],
    ["/figma/wd/v2/problem-icon-star.svg", "Value for money", "Deals & rewards", "items-center"],
  ];
  return (
    <section id="wd-problem" className="relative px-[156px] pt-[140px]">
      <div aria-hidden className="pointer-events-none absolute top-[220px] left-[-254px] flex h-[1505px] w-[2492px] items-center justify-center">
        <div className="relative h-[1174.391px] w-[2345.46px] rotate-[-8.42deg]">
          <img src="/figma/wd/v2/problem-dash.svg" alt="" className="absolute inset-[-0.34%_0_-0.29%_-0.17%] size-full max-w-none" />
        </div>
      </div>
      <div className="relative flex items-center justify-between px-20">
        <div className="flex w-[683px] flex-col gap-6">
          <div data-rv className="flex flex-col gap-6">
            <Eyebrow label={t("RESEARCH  ·  01.1")} />
            <Heading>{t("Initial problem")}</Heading>
          </div>
          <p data-rv className="text-base leading-6 text-[var(--cmd-text-primary)]">
            {t("As a company founder and car user, my director saw a strong desire among car owners for fast, convenient and value-for-money services — yet the options were lacking. Even garages with good service lacked the marketing they deserved. We set out to solve this with e‑commerce.")}
          </p>
          <div className="flex flex-col gap-3">
            {needs.map(([icon, title, sub, align]) => (
              <Card key={title} className="flex w-full items-start gap-4 rounded-[20px] px-5 py-[18px]">
                <span className={`flex size-10 shrink-0 justify-center rounded-xl ${align}`}>
                  <img src={icon} alt="" width={32} height={32} />
                </span>
                <span className="flex flex-col gap-0.5 whitespace-nowrap">
                  <span className="text-2xl leading-8 font-semibold tracking-[-0.24px] text-[var(--cmd-text-primary)]">{t(title)}</span>
                  <span className="text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(sub)}</span>
                </span>
              </Card>
            ))}
          </div>
        </div>
        <div className="relative h-[602px] w-[475px]">
          <div data-rv className="absolute top-0 left-0">
            <PhoneMock screen="/figma/wd/phone-screen-welcome.png" mask="/figma/wd/phone-mask-a.svg" width={297.6} height={602.4} />
          </div>
          <div data-rv className="absolute top-[96.23px] left-[225.78px]">
            <PhoneMock screen="/figma/wd/phone-screen-home.png" mask="/figma/wd/phone-mask-b.svg" width={249.2} height={506.1} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeskResearch() {
  const t = useT();
  const cards = [
    {
      icon: "/figma/wd/icon-user.svg",
      title: "User’s pain points",
      bullet: "/figma/wd/bullet-red.svg",
      items: [
        "They have to search for services themselves",
        "They can’t easily compare services or which facility is better",
        "They can’t find garages around their home",
        "No extra benefits or incentives for using the service",
      ],
    },
    {
      icon: "/figma/wd/icon-briefcase.svg",
      title: "Brand’s target",
      bullet: "/figma/wd/bullet-blue.svg",
      items: [
        "An immature market — even without direct competition",
        "Hard to bring the brand to newcomers",
        "Hard to plan and coordinate functions across garages",
      ],
    },
  ];
  const stats = [
    ["/figma/wd/stat-1.svg", 355, "86%", "Consumers are willing to use the service if there are discounts and it is convenient to order."],
    ["/figma/wd/stat-2.svg", 355, "80%", "Customers are more likely to be loyal to one garage or have that garage be close to their home location."],
    ["/figma/wd/stat-3.svg", 324, "86%", "Consumers will support a garage if it has a loyalty program that rewards members."],
  ] as const;
  return (
    <section id="wd-desk" className="px-[156px] pt-40">
      <div className="flex flex-col items-center gap-12 px-20">
        <div className="flex w-full flex-col gap-12">
          <SectionHead
            eyebrow={t("RESEARCH  ·  01.2")}
            title={t("Desk research")}
            lead={t("Before designing, we looked at articles and Google Search data to frame the problem from both the user and the brand perspective.")}
          />
          <div className="flex gap-5">
            {cards.map((card) => (
              <Card key={card.title} className="flex flex-1 flex-col gap-5 self-stretch rounded-[28px] px-8 pt-[30px] pb-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--cmd-surface-2)]">
                    <img src={card.icon} alt="" width={20} height={20} />
                  </span>
                  <p className="text-2xl leading-8 font-semibold tracking-[-0.24px] text-[var(--cmd-text-primary)]">{t(card.title)}</p>
                </div>
                <ul className="flex flex-col gap-4">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-3.5 text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">
                      <img src={card.bullet} alt="" width={6} height={6} />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[46px]">
          {stats.map(([ring, size, value, body]) => (
            <div key={body} data-rv className="relative" style={{ width: size, height: size }}>
              <img src={ring} alt="" className="absolute inset-0 size-full" />
              <div
                className="absolute flex w-[270px] flex-col items-center gap-2 text-center"
                style={{ left: size === 355 ? 42.18 : 27.18, top: size === 355 ? 65.62 : 50.3 }}
              >
                <p className="text-[80px] leading-[1.4] font-semibold tracking-[-3.2px] text-[#02c3ea]">{value}</p>
                <p className="text-[18px] leading-[26px] text-[var(--wd-ink)]">{t(body)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-3xl bg-[#02c3ea] px-2 py-1 text-[18px] leading-[26px] whitespace-nowrap text-white">{children}</span>
  );
}

export function UserSurveys() {
  const t = useT();
  // Figma empathy map (190:21755): Says, Does / Feels, Thinks — 28px brand icons with no tile fill.
  const quads: { icon: string; title: string; tag: string; quote?: string; lines?: string[] }[] = [
    { icon: "/figma/wd/v2/survey-icon-forum.svg", title: "Says", tag: "Person’s Quote", quote: "“The app should be simple and convenient. I’d like a colorful, easy-to-use application.”" },
    { icon: "/figma/wd/v2/survey-icon-hand.svg", title: "Does", tag: "Behaviors", lines: ["Orders online when short on time", "Compares prices to find the cheapest", "Opens the app only when the car has a problem"] },
    { icon: "/figma/wd/v2/survey-icon-eye.svg", title: "Feels", tag: "Emotional", lines: ["Give up fast if they can’t find the right service", "Want low price but high value", "Want interesting services, not boring ones"] },
    { icon: "/figma/wd/v2/survey-icon-sparkles.svg", title: "Thinks", tag: "What user's think", lines: ["Worried about the connection between them and garage services", "Ordering online is more convenient — no time to go out", "Don’t want boring, outdated apps"] },
  ];
  // [text, emoji, text top, emoji top (39.7px box, centred where Figma's rotated frame centres it), rotation]
  const feelings: [string, string, number, number, number][] = [
    ["It was easy", "/figma/wd/emoji-1.png", 36.18, 22.45, 26.27],
    ["It is like a story, lead me from A to B then C", "/figma/wd/emoji-2.png", 104.3, 102.44, -19.75],
    ["It is really convenient", "/figma/wd/emoji-3.png", 194.18, 179.14, 11.05],
    ["Wow! That is fast", "/figma/wd/emoji-4.png", 258.15, 250.29, 0],
    ["Easy to understand", "/figma/wd/emoji-5.png", 322.12, 321.21, -10.19],
    ["Good experience! Nice design", "/figma/wd/emoji-6.png", 386.1, 394.67, 7.88],
  ];
  return (
    <section id="wd-surveys" className="px-[156px] pt-[100px]">
      <div className="flex w-[1560px] flex-col gap-12 px-20">
        <SectionHead
          eyebrow={t("RESEARCH  ·  01.3")}
          title={t("User surveys")}
          lead={t("The product was new, so we learned from e‑commerce players improving online shopping — “follow in the footsteps of giants” — then mapped what users say, think, feel and do.")}
        />
        <div className="grid grid-cols-2 gap-5">
          {quads.map((q) => (
            <OffsetCard key={q.title} className="flex flex-col gap-3.5 rounded-[28px] px-8 pt-[30px] pb-8">
              <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <img src={q.icon} alt="" width={28} height={28} />
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-2xl leading-8 font-semibold tracking-[-0.24px] whitespace-nowrap text-[var(--cmd-text-primary)]">{t(q.title)}</span>
                  <Pill>{t(q.tag)}</Pill>
                </span>
              </div>
              {q.quote ? (
                <p className="text-[20px] leading-7 text-[var(--cmd-text-primary)]">{t(q.quote)}</p>
              ) : (
                q.lines?.map((line) => (
                  <p key={line} className="text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[var(--cmd-text-secondary)]">
                    {t(line)}
                  </p>
                ))
              )}
            </OffsetCard>
          ))}
        </div>
        <div className="flex items-start gap-[51px] text-[var(--wd-ink)]">
          <div data-rv className="flex w-[373px] flex-col gap-3 leading-[1.5]">
            <p className="text-2xl leading-[1.5] font-bold tracking-[0.24px]">{t("Feeling Map")}</p>
            <p className="text-base">
              {t("Affinity mapping is a process of grouping and clustering ideas into similar themes into categories. Affinity mapping is the simply the process of creating an affinity map or diagram. That allows the designers to easily extract the insights from the organized data and act on them")}
            </p>
          </div>
          <div className="flex gap-5">
            <div data-rv className="flex w-[202px] flex-col gap-[17px]">
              <p className="text-[18px] leading-[1.5] font-bold">{t("User Actions")}</p>
              <div className="flex flex-col gap-9 rounded-3xl bg-[var(--wd-feel-bg)] p-4 text-base leading-[1.5]">
                {/* Figma sets each action as two lines (an empty second line where it is short); the last is one line. */}
                {[["Onboarding &", "Signup"], ["Select &", "Buy product"], ["Payment"], ["Verify"], ["Manage order"]].map((lines) => (
                  <p key={lines[0]} className="min-h-12">
                    {lines.map((line) => (
                      <span key={line} className="block">
                        {t(line)}
                      </span>
                    ))}
                  </p>
                ))}
                <p>{t("Manage profile")}</p>
              </div>
            </div>
            <div data-rv className="bv-draw flex h-[520px] w-[421px] flex-col gap-[17px]">
              <p className="text-[18px] leading-[1.5] font-bold">{t("Feeling")}</p>
              <div className="relative h-[476px] w-[418px] overflow-hidden rounded-3xl bg-[var(--wd-feel-bg)]">
                {/* The dashed path draws top → bottom; each emoji and its line pop in as it passes. */}
                <div className="bv-wipe bv-wipe-y absolute top-[-9.82px] left-1 h-[432px] w-[146px]">
                  <div className="absolute inset-0">
                    <img src="/figma/wd/feeling-path.svg" alt="" className="absolute inset-[-0.29%_-0.52%_-0.29%_-0.85%] size-full max-w-none" />
                  </div>
                </div>
                {feelings.map(([text, emoji, textTop, emojiTop, rotate]) => {
                  const d = { "--d": `${250 + Math.round((emojiTop / 432) * 1400)}ms` } as CSSProperties;
                  return (
                    <div key={text}>
                      <span className="bv-pop absolute size-[39.7px]" style={{ left: 64.82, top: emojiTop, ...d }}>
                        <img src={emoji} alt="" className="size-full" style={{ transform: `rotate(${rotate}deg)` }} />
                      </span>
                      <p className="bv-pop absolute left-[205.03px] w-[215.853px] text-base leading-[1.5]" style={{ top: textTop, ...d }}>
                        {t(text)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Figma "Persona v2" (643:29399): round portrait, open profile column, frustration quote and three metrics. */
export function AverageEndUser() {
  const t = useT();
  const metrics: [string, number][] = [
    ["Satisfaction", 72],
    ["Content", 60],
    ["Engagement", 86],
  ];
  return (
    <section id="wd-persona" className="flex flex-col gap-12 px-[236px] pt-[100px]">
      <SectionHead
        eyebrow={t("SYNTHESIS  ·  01.4")}
        title={t("Average end‑user")}
        lead={t("Without resources for deep research on every driver, we synthesized everything into one virtual end‑user — his preferences, pain points and behaviors focus the whole design.")}
      />
      <div className="flex w-full items-start gap-24 overflow-hidden pr-3 pb-3">
        <div data-rv className="relative size-[312.41px] shrink-0 overflow-hidden rounded-full bg-[#dff2ff]">
          <img
            src="/figma/wd/v2/persona-dude.webp"
            alt={t("Persona illustration")}
            className="absolute top-[48.67px] left-[76.02px] h-[615.849px] w-[182.83px] max-w-none object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <div data-rv className="flex items-center gap-2.5">
            <img src="/figma/wd/v2/ov-dot-blue.svg" alt="" width={8} height={8} />
            <p className={MONO_LABEL}>{t("PERSONA · AGE 36")}</p>
          </div>
          <p data-rv className="mt-4 text-[48px] leading-[56px] font-semibold tracking-[-1.2px] text-[#0a0a0a]">{t("An Incredible Average Dude")}</p>
          <p data-rv className="mt-4 text-[22px] leading-[34px] tracking-[-0.11px] text-[#4b4f58]">
            {t("A simple man with a wife and two children, an average-paying job and a car — his loyal friend. Between work and family he’s busy, so taking care of the car is a real problem.")}
          </p>
          <div data-rv className="mt-10 flex w-full gap-6">
            <span aria-hidden className="w-[3px] shrink-0 self-stretch rounded-[2px] bg-[#e5484d]" />
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
              <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap text-[#e5484d]">{t("HIS FRUSTRATION")}</p>
              <p className="text-[28px] leading-[38px] font-semibold tracking-[-0.42px] text-[#0a0a0a]">
                {t("“Looking for the best place to protect his car — without wasting time searching.”")}
              </p>
            </div>
          </div>
          <span aria-hidden className="mt-10 h-px w-full bg-[rgba(10,10,15,0.1)]" />
          <div className="mt-6 w-full">
            <PersonaMetrics metrics={metrics} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function UserJourney() {
  const t = useT();
  const stages = [
    ["Starting", "Decides to find some time to find a service"],
    ["Trying", "Exploring and finding interesting option, maybe trying to see how to app works"],
    ["Comparing", "Looking back and ford to comparing the serivice (price, location,...)"],
    ["Deciding", "Decide should they trust this and try for the 1st time"],
    ["Booking", "Happy with the service and booking"],
  ];
  const dots: [number, number][] = [[102, 53.6], [440, 82], [772, 42.6], [1115, 96], [1452, 0]];
  const quotes: [string, string, number, number][] = [
    ["/figma/wd/journey-e1.png", "“It’s time to put in some effort”", 28.6, 113.8],
    ["/figma/wd/journey-e2.png", "“How am i going to use this app?”", 366.1, 142.3],
    ["/figma/wd/journey-e3.png", "“The services here are competitive.”", 698.7, 102.9],
    ["/figma/wd/journey-e4.png", "“But there are so many choices, how to sort now?”", 1041.3, 156.3],
    ["/figma/wd/journey-e5.png", "“Great, now I have service!”", 1378.3, 60.5],
  ];
  return (
    <section id="wd-journey" className="flex flex-col gap-12 px-[156px] pt-20">
      <div className="px-20">
        <SectionHead
          eyebrow={t("SYNTHESIS  ·  01.5")}
          title={t("User journey")}
          lead={t("How our average user moves through his situation — the ups and downs of emotion as he starts using the service.")}
        />
      </div>
      <div className="flex flex-col gap-8 text-[var(--wd-ink)]">
        <div data-rv className="flex items-center gap-8 px-20">
          <div className="relative size-[192.4px] shrink-0 overflow-hidden rounded-full bg-[var(--wd-feel-bg)]">
            <img src="/figma/wd/journey-dude.png" alt="" className="absolute top-[30px] left-[46.8px] h-[379.3px] w-[112.6px] max-w-none object-cover" />
          </div>
          <div className="flex w-[766px] flex-col gap-6">
            <p className="text-2xl leading-[1.5] font-bold tracking-[0.24px]">{t("An Incredible Average Dude")}</p>
            <p className="text-base leading-[1.5]">
              <span className="font-bold">{t("Situation:")}</span>{" "}
              {t("He wants to choose a service with cheap price and high-quality garage near his home so as not to waste time.")}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative -mb-5 flex justify-between text-center leading-[1.5]">
            {stages.map(([title, body]) => (
              <div key={title} data-rv className="flex w-[192.4px] flex-col items-center gap-4">
                <p className="text-2xl leading-[1.5] font-bold tracking-[0.24px]">{t(title)}</p>
                <p className="text-base">{t(body)}</p>
              </div>
            ))}
          </div>
          <div data-rv className="bv-draw relative h-[279.33px] w-full">
            {/* Figma Vector 9 (190:21908): 1469×127 frame at y 13.87, path inset -3.15% / -0.27% / 16.93%. */}
            {/* The curve draws left → right; each stop's dot, emoji and quote pop in as it passes. */}
            <div className="bv-wipe bv-wipe-x pointer-events-none absolute" style={{ left: -3.97, top: 9.86, width: 1477.06, height: 109.68 }}>
              <div className="absolute inset-0">
                <img src="/figma/wd/v2/journey-curve.svg" alt="" width={1477} height={110} className="absolute inset-0 size-full max-w-none" />
              </div>
            </div>
            {dots.map(([left, top]) => (
              <img
                key={left}
                src="/figma/wd/journey-dot.svg"
                alt=""
                className="bv-pop absolute size-7"
                style={{ left, top, "--d": `${250 + Math.round((left / 1477) * 1400)}ms` } as CSSProperties}
              />
            ))}
            {quotes.map(([emoji, text, left, top]) => (
              <div
                key={text}
                className="bv-pop absolute flex w-[181.7px] flex-col items-center gap-3"
                style={{ left, top, "--d": `${400 + Math.round(((left + 90) / 1477) * 1400)}ms` } as CSSProperties}
              >
                <img src={emoji} alt="" className="size-12" />
                <p className="text-center text-sm leading-[1.5]">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DevelopingSolution() {
  const t = useT();
  const goals = [
    ["/figma/wd/goal-explore.png", "Exploration", "Make it easy for new customers to discover the app."],
    ["/figma/wd/goal-nav.png", "Navigation", "An easy flow for booking and searching for services."],
    ["/figma/wd/goal-visual.png", "Visualization", "Visual content users are most likely to engage with."],
    ["/figma/wd/goal-loyal.png", "Loyalty", "Incentivize customers to come back with rewards."],
  ];
  return (
    <section id="wd-solution" className="px-[156px] pt-[100px]">
      <div className="flex flex-col gap-12 px-20">
        <SectionHead
          eyebrow={t("IDEATION  ·  01.6")}
          title={t("Developing solution")}
          lead={t("Garage brands open social spaces inside Bave to offer their best — with management, uploads, quality reporting and revenue tools. A 50/50 relationship: fair competition and satisfied users.")}
        />
        <div className="flex gap-5">
          {goals.map(([img, title, body]) => (
            <Card key={title} className="flex h-[380px] min-w-0 flex-1 flex-col gap-3.5 rounded-[28px] p-6 text-center">
              <div className="relative h-[190px]">
                <img src={img} alt="" className="absolute top-5 left-[calc(50%+0.5px)] size-[150px] -translate-x-1/2 object-contain" />
              </div>
              <p className="text-[30px] leading-9 font-semibold tracking-[-0.6px] text-[var(--cmd-text-primary)]">{t(title)}</p>
              <p className="text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(body)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SheetFrame({ title, height, children }: { title: string; height: number; children: ReactNode }) {
  return (
    <div data-rv className="wd-hover flex flex-col gap-[18px] rounded-[28px] bg-[var(--cmd-surface-1)] p-6 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <div className="flex items-center justify-between">
        <p className="text-2xl leading-8 font-semibold tracking-[-0.24px] text-[var(--cmd-text-primary)]">{title}</p>
        <p className="text-sm leading-5 text-[var(--cmd-text-muted)]">bave UI kit</p>
      </div>
      <div className="relative w-[722px] overflow-hidden rounded-2xl" style={{ height }}>
        {children}
      </div>
    </div>
  );
}

export function Typography() {
  const heads: [string, string, string][] = [
    ["H1", "32px", "44"],
    ["H2", "28px", "40"],
    ["H3", "24px", "36"],
    ["H4", "20px", "28"],
    ["H5", "18px", "24"],
  ];
  const body: [string, string, string, number][] = [
    ["Large", "18 / 27", "Extra Large", 18],
    ["Medium", "16 / 24", "Extra Large", 16],
    ["Small", "14 / 22", "Extra Large", 14],
    ["Extra Small", "12 / 20", "Extra Large", 12],
  ];
  return (
    <div className="absolute inset-0 bg-[#f9fafb]">
      <div className="absolute top-10 left-10 flex w-[992px] flex-col gap-6 text-[#303030]">
        <p className="text-2xl leading-[1.5] font-bold tracking-[0.24px] text-[#1b1b1b]">Typography</p>
        <div className="flex w-[741px] flex-col gap-4 leading-[1.5]">
          <p className="text-[18px] font-bold">Typeface - SF Pro</p>
          <p className="text-base tracking-[0.16px]">
            Simple, modern and multi-style sans serif font can display with long body text and express the innovation and agility spirit. Solid font creates a sense of safety, trusty of a commitment and team-work organisation. It also works well with corporate font.
          </p>
        </div>
        <p className="text-[18px] leading-[1.5] font-bold tracking-[0.18px]">Heading</p>
        <div className="flex gap-2">
          {heads.map(([h, size, lh]) => (
            <div key={h} className="flex h-[265px] w-[192px] flex-col justify-between rounded-[2px] bg-white p-4 shadow-[0_36px_60px_0_rgba(0,0,0,0.1)]">
              <div className="flex flex-col gap-2 text-base leading-6 tracking-[-0.08px]">
                <p>Typeface: SF Pro</p>
                <p>Weight: Bold</p>
                <p>Size: {size}</p>
                <p>Lineheight: {lh}</p>
                <p>Tracking: 0%</p>
              </div>
              <p className="font-bold" style={{ fontSize: parseInt(size, 10), lineHeight: `${lh}px` }}>
                {h}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[18px] leading-[1.5] font-bold tracking-[0.18px]">Body</p>
        <div className="flex w-[991px] flex-col gap-6 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between text-[18px] leading-[1.5] font-bold tracking-[0.18px]">
            <p className="w-[256px]">Style</p>
            <p>Size/line height</p>
            <p className="w-[57px] text-center">Font</p>
            <p className="w-[210px]">Weight</p>
          </div>
          {body.map(([name, size, mid, px]) => (
            <div key={name} className="flex items-center justify-between" style={{ fontSize: px, lineHeight: 1.5 }}>
              <div className="flex w-[256px] flex-col">
                <p className="font-bold">Body/{name}/Bold</p>
                <p className="font-medium">Body/{mid}/Medium</p>
                <p>Body/{name}/Regular</p>
              </div>
              <p className="w-[145px] text-center">{size}</p>
              <p className="w-[57px] text-center">SF Pro</p>
              <div className="flex w-[210px] flex-col">
                <p>Regular</p>
                <p>Bold</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ButtonsChips() {
  const groups: [string, string, string, string][][] = [
    [
      ["Primary Button", "bg-[#03c2ed] text-white", "Default", ""],
      ["Primary Button", "bg-[#03a5c9] text-white", "Focus", ""],
      ["Primary Button", "bg-[#ccc] text-white", "Disable", ""],
    ],
    [
      ["Secondary Button", "bg-[#1d353f] text-white", "Default", ""],
      ["Secondary Button", "bg-[#142126] text-white", "Focus", ""],
      ["Secondary Button", "border border-[#ccc] bg-white text-[rgba(204,204,204,0.8)]", "Disable", ""],
    ],
  ];
  const chips = ["Khuyến mãi", "Rửa xe trọn gói", "Thay lốp bánh xe", "Nâng cấp phụ tùng", "Gara có chỗ hút thuốc", "Thanh toán bằng thẻ B-Card"];
  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute top-10 left-10 flex flex-col gap-14 text-[#212121]">
        <div className="flex w-[620px] flex-col gap-6">
          <p className="text-2xl leading-[1.5] font-bold tracking-[0.24px] text-[#1b1b1b]">Standard Buttons</p>
          <p className="text-base leading-[1.5]">All buttons use the same reskinned material UI button (primary & secondary) show to the left</p>
          <div className="flex flex-col gap-4">
            {groups.map((group, i) => (
              <div key={i} className="flex gap-2.5 rounded-[5px] border border-dashed border-[#9747ff] px-4 py-5">
                {group.map(([label, cls, state]) => (
                  <div key={state} className="flex flex-col items-center gap-2">
                    <span className={`rounded-[54px] px-4 py-2 text-sm leading-[22px] font-bold whitespace-nowrap ${cls}`}>{label}</span>
                    <span className="text-sm leading-[1.5] font-medium">{state}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[620px] flex-col gap-6">
          <p className="text-2xl leading-[1.5] font-bold tracking-[0.24px] text-[#1b1b1b]">Tag & Chips</p>
          <p className="text-base leading-[1.5]">Interest tags with selected item in color. Help sort, make selections, filter content, or trigger actions.</p>
          <div className="flex flex-wrap gap-2 rounded-[5px] border border-dashed border-[#9747ff] px-4 py-5">
            {chips.map((chip, i) => (
              <span key={chip} className={`rounded-lg px-2 py-1 text-xs leading-5 font-medium text-white ${i === 1 ? "bg-[#03c2ed]" : "bg-[#ccc]"}`}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Figma "Case End" (190:22944): pt 100 / pb 80, rule + mark, 28px gap, 44/56 quote. */
export function CaseEnd() {
  const t = useT();
  return (
    <section className="flex flex-col items-center gap-7 px-[156px] pt-[100px] pb-20">
      <div data-rv className="flex w-full items-center gap-5">
        <span className="h-px flex-1 bg-[var(--cmd-text-muted)]" />
        <span className="flex items-center gap-2.5 font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">
          <span className="size-3 rounded-full bg-[var(--brand-bave)]" />
          {t("END OF CASE STUDY  ·  BAVE  ·  2023")}
        </span>
        <span className="h-px flex-1 bg-[var(--cmd-text-muted)]" />
      </div>
      <p data-rv className="text-center text-[44px] leading-[56px] tracking-[-1.1px] whitespace-nowrap text-[var(--cmd-text-primary)]">
        {t("Thanks for reading — here is what I built next.")}
      </p>
    </section>
  );
}

export type { Phase };
