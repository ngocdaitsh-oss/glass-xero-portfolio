/* eslint-disable @next/next/no-img-element -- Figma exports keep their own root size. */
"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AppWindow, MaskIcon } from "./AppWindow";
import { useT } from "@/lib/i18n";
import { JOBS, SKILL_GROUPS } from "@/lib/about";

const TABS = ["Overview", "Experience", "Skills"] as const;
type Tab = (typeof TABS)[number];

const GRADIENT = "linear-gradient(135deg, var(--azure-300) 0%, var(--azure-600) 71.429%)";

const SOFTWARE = [
  { name: "Figma", logo: "figma", ring: "/figma/about/ring-figma.svg" },
  { name: "Photoshop", logo: "/figma/about/logo-photoshop.svg", ring: "/figma/about/ring-progress.svg" },
  { name: "InDesign", logo: "/figma/about/logo-indesign.svg", ring: "/figma/about/ring-progress.svg" },
  { name: "Illustrator", logo: "/figma/about/logo-illustrator.svg", ring: "/figma/about/ring-progress.svg" },
  { name: "After Effects", logo: "/figma/about/logo-after-effects.svg", ring: "/figma/about/ring-progress.svg" },
];

export function AboutWindow() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [dir, setDir] = useState<"left" | "right">("right");
  const scroller = useRef<HTMLDivElement>(null);

  const pick = (next: Tab) => {
    if (next === tab) return;
    setDir(TABS.indexOf(next) > TABS.indexOf(tab) ? "right" : "left");
    setTab(next);
    scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppWindow title="About Me">
      <div className="flex h-full">
        <Profile />
        <div ref={scroller} className="os-scroll flex min-w-0 flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto px-7 pt-6 pb-7">
          <Tabs tab={tab} onPick={pick} />
          <div key={tab} className={`about-pane flex flex-col gap-6 about-pane-${dir}`}>
            {tab === "Overview" && <Overview />}
            {tab === "Experience" && <Experience />}
            {tab === "Skills" && <Skills />}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

/** Figma "Tab Item" segmented control; the gradient pill slides to the picked tab. */
function Tabs({ tab, onPick }: { tab: Tab; onPick: (tab: Tab) => void }) {
  const refs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const t = useT();

  useLayoutEffect(() => {
    const el = refs.current[tab];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [tab]);

  return (
    <div role="tablist" className="bg-overlay-subtle relative flex w-fit shrink-0 gap-1 rounded-[14px] p-1">
      {pill && (
        <span
          aria-hidden
          className="absolute top-1 bottom-1 rounded-[10px] shadow-[0_4px_12px_rgba(33,115,214,0.35)] transition-[left,width] duration-[420ms] ease-[cubic-bezier(0.34,1.2,0.5,1)]"
          style={{ left: pill.left, width: pill.width, backgroundImage: GRADIENT }}
        />
      )}
      {TABS.map((item) => {
        const on = tab === item;
        return (
          <button
            key={item}
            ref={(el) => {
              refs.current[item] = el;
            }}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onPick(item)}
            className={`relative rounded-[10px] px-4 py-[7px] text-sm leading-[22px] font-semibold whitespace-nowrap transition-colors duration-300 ${
              on ? "text-white" : "text-fg-secondary hover:bg-overlay"
            }`}
          >
            {t(item)}
          </button>
        );
      })}
    </div>
  );
}

function Profile() {
  const t = useT();
  return (
    <aside className="os-scroll bg-overlay-subtle flex h-full w-[350px] shrink-0 flex-col gap-3.5 overflow-y-auto p-6">
      <div className="flex items-start gap-3.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2.5">
              <img src="/figma/about/wave.png" alt="" width={24} height={24} className="size-6 object-cover" />
              <span className="text-xl leading-7 font-medium whitespace-nowrap">{t("Hello, I’m")}</span>
            </div>
            <p className="text-[32px] leading-10 font-bold tracking-[-0.5px] whitespace-nowrap">Tuan Ngoc</p>
          </div>
          <p className="text-fg-tertiary text-[13px] leading-5 font-semibold whitespace-nowrap">UI/UX Designer</p>
        </div>
        <span className="size-[76px] shrink-0 overflow-hidden rounded-full">
          <img
            src="/figma/about/avatar-about-2026.png"
            alt="Tuan Ngoc"
            width={76}
            height={76}
            className="size-full scale-[2.15] object-cover object-[50%_32%]"
          />
        </span>
      </div>

      <p className="bg-overlay text-fg-secondary flex w-fit items-center gap-1.5 rounded-[20px] py-1.5 pr-3 pl-2.5 text-sm leading-5 font-semibold whitespace-nowrap">
        <img src="/figma/about/status.svg" alt="" width={8} height={8} />
        {t("Product Designer")} @Viettel IT Center
      </p>

      <div className="flex flex-col gap-2">
        <Contact icon="/figma/about/phone.svg" label={t("Phone")} value="+84 913 674 939" />
        <Contact icon="/figma/about/mail.svg" label="Email" value="ngocdaitsh@gmail.com" />
        <Contact icon="/figma/about/globe.svg" label={t("Adress")} value={t("Hanoi")} />
      </div>

      <a
        href="/cv/TrinhTuanNgoc-CV-2027.pdf"
        download="TrinhTuanNgoc-CV-2027.pdf"
        className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl py-[9px] pr-3.5 pl-4 text-base leading-6 font-semibold text-white shadow-[0_6px_16px_0_rgba(33,115,214,0.5)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_10px_22px_0_rgba(33,115,214,0.55)] active:translate-y-0"
        style={{ backgroundImage: GRADIENT }}
      >
        {t("Download CV")}
        <img src="/figma/about/download.svg" alt="" width={24} height={24} />
      </a>

      <span className="bg-divider h-px w-full shrink-0" />
      <p className="text-fg-tertiary text-sm leading-5 font-semibold">{t("SOFTWARE")}</p>
      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {SOFTWARE.map((tool) => (
          <div key={tool.name} className="flex flex-col items-center gap-1.5">
            <span className="relative block size-12">
              <img src="/figma/about/ring-track.svg" alt="" className="theme-dark-only absolute inset-0 size-12" />
              <img src="/figma/about/ring-track-light.svg" alt="" className="theme-light-only absolute inset-0 size-12" />
              <span className="absolute inset-[0.15%_0_0_0]">
                <img src={tool.ring} alt="" className="block size-full max-w-none" />
              </span>
              <ToolLogo logo={tool.logo} />
            </span>
            <span className="text-sm leading-[22px] font-semibold whitespace-nowrap">{tool.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ToolLogo({ logo }: { logo: string }) {
  if (logo === "figma") {
    return (
      <span className="absolute top-3 left-3 size-6 rounded-lg drop-shadow-[0_10px_12px_rgba(3,5,15,0.45)]">
        <span className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2c3445] to-[#1c2230]" />
        <span className="absolute inset-[17.19%_28.41%_17.71%_28.13%]">
          <span className="absolute inset-[-4.68%_-14.02%_-14.04%_-14.02%]">
            <img src="/figma/about/logo-figma-glyph.svg" alt="" className="block size-full max-w-none" />
          </span>
        </span>
        <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0_-10px_18px_0_rgba(3,5,15,0.35),inset_0_2px_2px_0_rgba(255,255,255,0.08),inset_0_-3px_2px_0_rgba(255,255,255,0.22)]" />
      </span>
    );
  }
  return (
    <span className="absolute top-3 left-3 size-6">
      <span className="absolute inset-[-10.94%_-18.75%_-26.56%_-18.75%]">
        <img src={logo} alt="" className="block size-full max-w-none" />
      </span>
    </span>
  );
}

function Contact({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-overlay-subtle flex items-center gap-2.5 rounded-xl px-2 py-1.5">
      <span className="bg-overlay-strong text-fg flex size-[30px] shrink-0 items-center justify-center rounded-[9px]">
        <MaskIcon src={icon} size={16} />
      </span>
      <span className="flex flex-col gap-1 whitespace-nowrap">
        <span className="text-fg-tertiary text-sm leading-5">{label}</span>
        <span className="text-base leading-6 font-semibold">{value}</span>
      </span>
    </div>
  );
}

function Overview() {
  const t = useT();
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-accent text-sm leading-5 font-semibold">{t("ABOUT ME")}</p>
        <h3 className="text-2xl leading-8 font-bold">{t("I like to create Differences")}</h3>
        <p className="text-fg-secondary text-base leading-6">
          {t("I think myself as a quirky person (but in a positive way), I do things that other people don’t do but it’s a creative and unconventional way.")}
        </p>
        <p className="text-fg-secondary text-base leading-6">
          {t("I completed my bachelor’s degree in graphic design at Greenwich University, Vietnam. I also have certain professional experience, having worked in jobs such as Graphic Designer, UI/UX designer. My goal is to try to contribute values to the business, thereby affirming my abilities, learning and developing my professional skills.")}
        </p>
      </div>
      <div className="flex gap-3">
        {[
          ["4", "Years of experience"],
          ["3", "Companies"],
          ["6", "Design tools"],
        ].map(([n, label]) => (
          <div key={label} className="about-card bg-overlay flex flex-1 flex-col rounded-2xl p-4 whitespace-nowrap">
            <p className="text-[32px] leading-10 font-bold tracking-[-0.5px]">{n}</p>
            <p className="text-fg-tertiary text-sm leading-[22px] font-semibold">{t(label)}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Highlight icon="/figma/about/briefcase.svg" kicker={t("CURRENTLY")} title={t("Product Designer")} meta={<>@Viettel IT Center<br />{t("August 2026 – Now")}</>} />
        <Highlight icon="/figma/about/grad-cap.svg" kicker={t("EDUCATION")} title={t("Bachelor of Graphic Design")} meta={t("@Greenwich University, Vietnam")} />
      </div>
    </>
  );
}

function Highlight({ icon, kicker, title, meta }: { icon: string; kicker: string; title: string; meta: ReactNode }) {
  return (
    <div className="about-card bg-overlay flex flex-1 items-start gap-3 self-stretch rounded-2xl p-3.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundImage: GRADIENT }}>
        <img src={icon} alt="" width={20} height={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-fg-tertiary text-sm leading-[22px]">{kicker}</span>
        <span className="flex flex-col gap-1 font-semibold">
          <span className="text-base leading-6">{title}</span>
          <span className="text-fg-tertiary text-sm leading-[22px]">{meta}</span>
        </span>
      </span>
    </div>
  );
}

function Experience() {
  const t = useT();
  return (
    <>
      <h3 className="text-2xl leading-8 font-bold">{t("Work Experience")}</h3>
      <ol className="flex w-full flex-col">
        {JOBS.map((job, index) => (
          <li key={job.year} className="flex w-full items-stretch">
            <div className="flex w-[165px] shrink-0 flex-col">
              <span
                className={`text-[32px] leading-10 font-bold tracking-[-0.5px] ${job.muted ? "text-fg-secondary" : ""}`}
              >
                {job.year}
              </span>
              <span className="text-fg-tertiary text-sm leading-5">{t(job.span)}</span>
            </div>
            <div className="ml-8 flex min-w-0 flex-1 gap-[18px]">
              <div className="flex flex-col items-center gap-1.5 self-stretch pt-3">
                <img
                  src={job.active ? "/figma/about/dot-active.svg" : "/figma/about/dot-past.svg"}
                  alt=""
                  width={12}
                  height={12}
                  className={job.active ? "" : "theme-dark-only"}
                />
                {!job.active && <span className="theme-light-only bg-fg-disabled size-3 rounded-full" />}
                {index < JOBS.length - 1 && <span className="bg-divider min-h-px w-0.5 flex-1" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1.5 pb-6">
                <span className="text-base leading-6 font-semibold">{t(job.role)}</span>
                <span className="text-accent text-sm leading-[22px] font-semibold">{job.company}</span>
                <p className="text-fg-secondary text-base leading-6">{t(job.body)}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Skills() {
  const t = useT();
  return (
    <>
      {SKILL_GROUPS.map((group) => (
        <section key={group.title} className="flex w-full flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <MaskIcon src={group.icon} size={24} className="text-icon-accent" />
            <h3 className="text-base leading-6 font-semibold">{t(group.title)}</h3>
            <span className="text-fg-tertiary text-base leading-6">{group.items.length}</span>
          </div>
          <div className="grid w-full grid-cols-3 items-stretch gap-3">
            {group.items.map(([name, body]) => (
              <SkillCard key={name} name={t(name)}>
                {t(body)}
              </SkillCard>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function SkillCard({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="about-card bg-overlay flex h-full min-w-0 flex-col gap-2 rounded-2xl p-3.5">
      <p className="text-base leading-6 font-semibold">{name}</p>
      <p className="text-fg-tertiary text-base leading-6">{children}</p>
    </div>
  );
}
