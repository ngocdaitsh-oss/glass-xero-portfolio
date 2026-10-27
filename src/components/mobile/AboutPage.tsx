/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import { useState } from "react";
import { LINKEDIN_URL } from "@/lib/apps";
import { JOBS, SKILL_GROUPS } from "@/lib/about";
import { useT } from "@/lib/i18n";
import { Card, Chip, IconTile, Label, ListCard, ListRow, M, NavBar, Page, Segmented, Toolbar } from "./parts";

type Tab = "Overview" | "Experience" | "Skills";
const TABS: Tab[] = ["Overview", "Experience", "Skills"];
const SOFTWARE = ["Figma", "Photoshop", "InDesign", "Illustrator", "After Effects"];
const CV = "/cv/TrinhTuanNgoc-CV.pdf";

/** Mobile — About Me · Overview / Experience / Skills (367:22285, 375:194815, 375:195037). The segmented control switches them. */
export function AboutPage({ onHome, onMail }: { onHome: () => void; onMail: () => void }) {
  const t = useT();
  const [tab, setTab] = useState<Tab>("Overview");
  const [dir, setDir] = useState<"left" | "right">("right");

  const pick = (next: Tab) => {
    if (next === tab) return;
    setDir(TABS.indexOf(next) > TABS.indexOf(tab) ? "right" : "left");
    setTab(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <Page
      onHome={onHome}
      nav={
        <NavBar
          variant="large"
          title={t("About Me")}
          back={{ label: t("Home"), onClick: onHome }}
        />
      }
      toolbar={
        <Toolbar
          primary={{ icon: `${M}/download-18.svg`, label: t("Download CV"), href: CV, download: "TrinhTuanNgoc-CV.pdf" }}
          buttons={[
            { icon: `${M}/phone.svg`, label: t("Call"), href: "tel:+84913674939" },
            { icon: `${M}/mail-24.svg`, label: t("Leave an email"), onClick: onMail },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-4">
        <Segmented items={TABS.map((id) => ({ id, label: t(id) }))} value={tab} onChange={pick} />
        <div key={tab} className={`about-pane about-pane-${dir} flex flex-col gap-4`}>
          {tab === "Overview" && <Overview onMail={onMail} />}
          {tab === "Experience" && <Experience />}
          {tab === "Skills" && <Skills />}
        </div>
      </div>
    </Page>
  );
}

function Overview({ onMail }: { onMail: () => void }) {
  const t = useT();
  return (
    <>
      <Card className="flex items-center gap-3.5 p-4">
        <span className="size-[60px] shrink-0 overflow-hidden rounded-full">
          <img
            src="/figma/about/avatar-about-2026.png"
            alt="Tuan Ngoc"
            width={60}
            height={60}
            className="size-full scale-[2.15] object-cover object-[50%_32%]"
          />
        </span>
        <div className="flex min-w-0 flex-col items-start gap-1 leading-[normal]">
          <p className="text-fg text-xl font-bold whitespace-nowrap leading-[normal]">Tuan Ngoc</p>
          <p className="text-fg-secondary text-sm whitespace-nowrap italic leading-[normal]">UI/UX Designer</p>
          <p className="bg-overlay text-fg flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm whitespace-nowrap leading-[normal]">
            <span className="size-[7px] shrink-0 rounded-full bg-[var(--m-success)]" />
            <span>{t("Product Designer")} @Viettel IT Center</span>
          </p>
        </div>
      </Card>
      <Card className="flex flex-col gap-2 p-4">
        <Label>{t("ABOUT ME")}</Label>
        <p className="text-fg text-xl leading-[1.3] font-semibold">{t("Turning complex problems into clear product experiences")}</p>
        <p className="text-fg-secondary m-selectable text-base leading-[1.5]">
          {t("I’m a Product Designer with a background in Graphic Design, focused on understanding people, simplifying complex workflows, and shaping digital products that are useful, intuitive, and scalable.")}
        </p>
        <p className="text-fg-secondary m-selectable text-base leading-[1.5]">
          {t("My experience spans enterprise workplace tools at Viettel, learning products at SAPP Academy, automotive services at Bave, and financial websites at Wecan Group. I work across user research, information architecture, prototyping, usability testing, UI design, and design systems—collaborating closely with Product Managers, Business Analysts, Engineers, and QA to turn insight into measurable product improvements.")}
        </p>
      </Card>
      <div className="flex gap-2">
        {[
          ["3+", "Years"],
          ["4", "Companies"],
          ["6", "Tools"],
        ].map(([n, label]) => (
          <Card key={label} className="flex min-w-0 flex-1 flex-col items-start gap-1 p-4 leading-[normal]">
            <p className="text-fg text-[28px] font-medium whitespace-nowrap leading-[normal]">{n}</p>
            <p className="text-fg-secondary truncate text-sm leading-[normal]">{t(label)}</p>
          </Card>
        ))}
      </div>
      <Label className="w-full">{t("TIMELINE")}</Label>
      <ListCard>
        {[
          <ListRow key="job" icon={`${M}/briefcase.svg`} title={t("Product Designer")} subtitle={`@Viettel IT Center · ${t("Aug 2026 — Now")}`} subtitleClass="text-[var(--m-muted)]" />,
          <ListRow key="edu" icon={`${M}/grad-cap.svg`} title={t("Bachelor of Graphic Design")} subtitle={t("Greenwich University, Vietnam")} subtitleClass="text-[var(--m-muted)]" />,
        ]}
      </ListCard>
      <Label className="w-full">{t("CONTACT")}</Label>
      <ListCard>
        {[
          <ListRow key="mail" icon={`${M}/mail.svg`} title="Email" subtitle="ngocdaitsh@gmail.com" chevron onClick={onMail} />,
          <ListRow key="addr" icon={`${M}/map-pin.svg`} title={t("Address")} subtitle={t("Hà Nội, Vietnam")} />,
          <ListRow key="in" icon={`${M}/globe.svg`} title="LinkedIn" subtitle={t("View profile")} chevron href={LINKEDIN_URL} />,
        ]}
      </ListCard>
      <Label className="w-full">{t("SOFTWARE")}</Label>
      <div className="flex flex-wrap gap-2">
        {SOFTWARE.map((name) => (
          <Chip key={name} label={name} />
        ))}
      </div>
    </>
  );
}

function Experience() {
  const t = useT();
  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-fg text-xl leading-[normal] font-semibold whitespace-nowrap">{t("Work Experience")}</h2>
        <span className="bg-overlay text-fg-secondary rounded-full px-[9px] py-0.5 text-sm leading-[normal] font-semibold">{JOBS.length}</span>
      </div>
      <ol className="flex w-full flex-col">
        {JOBS.map((job, index) => {
          const last = index === JOBS.length - 1;
          return (
            <li key={job.year} className={`flex w-full items-start gap-3.5 ${last ? "pb-3" : ""}`}>
              <div className="flex shrink-0 flex-col items-center self-stretch">
                <span className="h-[22px] w-0.5" />
                <span className="size-3.5 rounded-full" style={{ background: job.active ? "var(--m-success)" : "var(--m-accent)" }} />
                {last ? null : <span className="bg-divider min-h-px w-0.5 flex-1" />}
              </div>
              <div className={`min-w-0 flex-1 ${last ? "" : "pb-3.5"}`}>
                <Card className="flex flex-col items-start gap-1.5 p-4">
                  <p className="flex items-center gap-2 text-sm leading-[normal]">
                    <span className="font-mono" style={{ color: job.active ? "var(--m-success)" : "var(--text-accent)" }}>
                      {job.year}
                    </span>
                    <span className="text-fg-tertiary whitespace-pre">·  {t(job.mobileSpan)}</span>
                  </p>
                  <p className="text-fg text-lg leading-[normal] font-semibold">{t(job.role)}</p>
                  <p className="text-accent text-sm leading-[normal]">{job.company}</p>
                  <p className="text-fg-secondary m-selectable text-sm leading-[1.5]">{t(job.mobileBody)}</p>
                  {job.active ? (
                    <span className="bg-overlay text-fg flex items-center gap-1.5 rounded-full py-[3px] pr-2.5 pl-2 text-sm leading-[normal] font-semibold">
                      <span className="size-[7px] rounded-full bg-[var(--m-success)]" />
                      {t("Current role")}
                    </span>
                  ) : null}
                </Card>
              </div>
            </li>
          );
        })}
      </ol>
      <Label>{t("EDUCATION")}</Label>
      <ListCard>
        {[<ListRow key="edu" icon={`${M}/grad-cap.svg`} title={t("Bachelor of Graphic Design")} subtitle={t("@Greenwich University, Vietnam")} />]}
      </ListCard>
    </>
  );
}

function Skills() {
  const t = useT();
  return (
    <>
      {SKILL_GROUPS.map((group) => (
        <section key={group.title} className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <IconTile src={group.icon} radius={9} />
            <h2 className="text-fg text-xl leading-[normal] font-semibold whitespace-nowrap">{t(group.title)}</h2>
            <span className="bg-overlay text-fg-secondary rounded-full px-[9px] py-0.5 text-sm leading-[normal] font-semibold">{group.items.length}</span>
          </div>
          <ListCard>
            {group.items.map(([name, , short]) => (
              <div key={name} className="flex flex-col items-start gap-1 py-[13px]">
                <p className="text-fg text-base leading-[normal] font-semibold">{t(name)}</p>
                <p className="text-fg-secondary m-selectable text-sm leading-[1.45]">{t(short)}</p>
              </div>
            ))}
          </ListCard>
        </section>
      ))}
      <Label>{t("SOFTWARE")}</Label>
      <div className="flex flex-wrap gap-2">
        {SOFTWARE.map((name) => (
          <Chip key={name} label={name} />
        ))}
      </div>
    </>
  );
}
