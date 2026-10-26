"use client";

import { useMemo, type ReactNode } from "react";
import type { Work } from "@/lib/works";
import { CaseFooter, CaseStudyShell, RelatedProjects, type TrackItem } from "./shell";
import { ColorPalette } from "./generated/ColorPalette";
import { DesignAnatomy } from "./generated/DesignAnatomy";
import { IconsPack } from "./generated/IconsPack";
import { UiForLaunch } from "./generated/UiForLaunch";
import { Reveal, useRevealChildren } from "../reveal";
import { SectionHead } from "./parts";
import { BaveUserFlow } from "./bave/BaveUserFlow";
import { BaveWireframing } from "./bave/BaveWireframing";
import "./bave.css";
import { useLang, useT } from "@/lib/i18n";
import {
  AverageEndUser,
  ButtonsChips,
  CaseEnd,
  DeskResearch,
  DesignProcess,
  DevelopingSolution,
  Hero,
  InitialProblem,
  OurVision,
  PhaseBand,
  ProcessHighlight,
  SheetFrame,
  Typography,
  UserJourney,
  UserSurveys,
} from "./sections";


/** Figma "Progress Tracker — bave": 15 stops, grouped by phase. */
const TRACK: TrackItem[] = [
  { id: "wd-overview", label: "Overview" },
  { id: "wd-vision", label: "Our Vision" },
  { id: "wd-process", label: "Design Process" },
  { id: "wd-problem", label: "Initial Problem", group: "01 · RESEARCH" },
  { id: "wd-desk", label: "Desk Research" },
  { id: "wd-surveys", label: "User Surveys" },
  { id: "wd-persona", label: "Average End-user" },
  { id: "wd-journey", label: "User Journey" },
  { id: "wd-solution", label: "Developing Solution" },
  { id: "wd-flow", label: "User Flow", group: "02 · DESIGN SYSTEM" },
  { id: "wd-wireframing", label: "Wireframing" },
  { id: "wd-system", label: "Design System" },
  { id: "wd-anatomy", label: "Design Anatomy" },
  { id: "wd-launch", label: "UI For Launch", group: "03 · UI DESIGN" },
  { id: "wd-related", label: "Related Projects" },
];

const DARK_ZONES = ["wd-overview-hero", "wd-related", "wd-footer"];

const SHEET_SCALE = 722 / 1072;

function ScaledSheet({ height, children }: { height: number; children: ReactNode }) {
  return (
    <div
      className="absolute top-0 left-0 origin-top-left"
      style={{ width: 1072, height: height / SHEET_SCALE, transform: `scale(${SHEET_SCALE})` }}
    >
      {children}
    </div>
  );
}

function DesignSystem() {
  const t = useT();
  const facts = [
    ["SF Pro", "Typeface · 5 heading levels"],
    ["6", "Color ramps"],
    ["24px", "Icon grid · 1px stroke"],
    ["2", "Button styles · 3 states"],
  ];
  return (
    <section id="wd-system" className="flex flex-col gap-12 px-[156px] pt-[100px]">
      <SectionHead
        eyebrow={t("FINAL DESIGN  ·  02.3")}
        phase="system"
        title={t("Design system")}
        lead={t("With the steps iterated and refined, I built a style guide that kept white space, balance and consistency in check — and gave developers every spec they needed.")}
      />
      <div className="flex gap-5">
        {facts.map(([value, label]) => (
          <div
            key={label}
            data-rv
            className="wd-hover flex h-[138px] flex-1 flex-col gap-1.5 rounded-[24px] bg-[var(--cmd-surface-1)] p-7 shadow-[inset_0_1px_0_0_var(--cmd-edge)]"
          >
            <p className="text-[44px] leading-[52px] font-semibold tracking-[-1px] text-[var(--cmd-text-primary)]">{value}</p>
            <p className="text-base leading-6 text-[var(--cmd-text-secondary)]">{t(label)}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <SheetFrame title={t("Color palette")} height={994.6}>
            <ScaledSheet height={994.6}>
              <ColorPalette />
            </ScaledSheet>
          </SheetFrame>
          <SheetFrame title={t("Buttons & chips")} height={765.3}>
            <ButtonsChips />
          </SheetFrame>
        </div>
        <div className="flex flex-col gap-5">
          <SheetFrame title={t("Typography")} height={732.8}>
            <ScaledSheet height={732.8}>
              <Typography />
            </ScaledSheet>
          </SheetFrame>
          <SheetFrame title={t("Icons pack")} height={918}>
            <ScaledSheet height={918}>
              <IconsPack />
            </ScaledSheet>
          </SheetFrame>
        </div>
      </div>
    </section>
  );
}


/**
 * Scroll-in entrance for every element marked `data-rv` (heads, leads, cards, phones,
 * stats, generated blocks), on top of the per-section <Reveal> — the SAPP pattern:
 * blocks fade up one after another as they cross the fold, 90ms apart per batch.
 */
function BaveReveal({ children }: { children: ReactNode }) {
  const ref = useRevealChildren<HTMLDivElement>("[data-rv]", 40);
  return (
    <div ref={ref} className="bave-detail">
      {children}
    </div>
  );
}

export function BaveDetail({
  open = true,
  onBack,
  renderCard,
}: {
  open?: boolean;
  onBack: () => void;
  renderCard: (work: Work) => ReactNode;
}) {
  const t = useT();
  const lang = useLang();
  const sections = useMemo(
    () => (
      <>
                <Reveal>
                  <Hero />
                </Reveal>
                <Reveal>
                  <ProcessHighlight />
                </Reveal>
                <Reveal>
                  <OurVision />
                </Reveal>
                <Reveal>
                  <DesignProcess />
                </Reveal>
                <Reveal>
                  <PhaseBand
                    id="wd-phase-1"
                    number="01"
                    tone="research"
                    title={t("Research phase")}
                    lead={t("Before pixels: who are car owners, what frustrates them, and what would make garages worth trusting online?")}
                    steps={["01.1  Initial problem", "01.2  Desk research", "01.3  User surveys", "01.4  Average end-user", "01.5  User journey", "01.6  Developing solution"].map((s) => t(s))}
                  />
                </Reveal>
                <Reveal>
                  <InitialProblem />
                </Reveal>
                <Reveal>
                  <DeskResearch />
                </Reveal>
                <Reveal>
                  <UserSurveys />
                </Reveal>
                <Reveal>
                  <AverageEndUser />
                </Reveal>
                <Reveal>
                  <UserJourney />
                </Reveal>
                <Reveal>
                  <DevelopingSolution />
                </Reveal>
                <Reveal>
                  <PhaseBand
                    id="wd-phase-2"
                    number="02"
                    tone="system"
                    title={t("Design System phase")}
                    lead={t("From insight to structure: map every flow, sketch it in low fidelity, then lock the visual language into a reusable system.")}
                    steps={["02.1  User flow", "02.2  Wireframing", "02.3  Design system", "02.4  Design anatomy"].map((s) => t(s))}
                  />
                </Reveal>
                <Reveal>
                  <BaveUserFlow />
                </Reveal>
                <Reveal>
                  <BaveWireframing />
                </Reveal>
                <Reveal>
                  <DesignSystem />
                </Reveal>
                <Reveal>
                  <div id="wd-anatomy">
                    <DesignAnatomy />
                  </div>
                </Reveal>
                <Reveal>
                  <PhaseBand
                    id="wd-phase-3"
                    number="03"
                    tone="ui"
                    title={t("UI Design phase")}
                    lead={t("The pilot release: eight flows designed on top of the system, from the first launch screen to the loyalty program.")}
                    steps={["03.1  UI for launch", "03.2  Related projects"].map((s) => t(s))}
                  />
                </Reveal>
                <Reveal>
                  <div id="wd-launch">
                    <UiForLaunch />
                  </div>
                </Reveal>
                <Reveal>
                  <CaseEnd />
                </Reveal>
                <Reveal>
                  <RelatedProjects ids={["sapp", "bsc"]} onBack={onBack} renderCard={renderCard} />
                </Reveal>
                <CaseFooter variant="bave" />
          </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `lang` rebuilds the translated tree.
    [onBack, renderCard, lang, t],
  );

  return (
    <CaseStudyShell
      open={open}
      onBack={onBack}
      category="UI/UX"
      title="BAVE — Car Service Booking"
      track={TRACK}
      darkZones={DARK_ZONES}
    >
      <BaveReveal>{sections}</BaveReveal>
    </CaseStudyShell>
  );
}
