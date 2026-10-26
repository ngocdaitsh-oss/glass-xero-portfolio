"use client";

import { useMemo, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { Work } from "@/lib/works";
import { Reveal } from "../../reveal";
import { CaseFooter, CaseStudyShell, RelatedProjects, type TrackItem } from "../shell";
import { SappAnatomy, SappComponentLibrary } from "./components";
import {
  SappDesignProcess,
  SappHero,
  SappInitialProblem,
  SappPhaseResearch,
  SappPhaseSystem,
  SappPhaseTesting,
  SappPhaseUi,
  SappProcessHighlight,
  SappVision,
} from "./intro";
import { SappUiForLaunch } from "./launch";
import { SappHeuristic, SappPersona } from "./research";
import { SappDesignSolution, SappUserFlow } from "./solution";
import { SappDesignSystem, SappFoundations } from "./system";
import { SappCaseEnd, SappUsabilityTesting } from "./testing";

/** Figma "Progress Tracker — SAPP LMS" (214:13300): 14 stops in five groups. */
const TRACK: TrackItem[] = [
  { id: "wd-overview", label: "Overview" },
  { id: "wd-vision", label: "Our Vision" },
  { id: "wd-process", label: "Design Process" },
  { id: "wd-problem", label: "Initial Problem", group: "01 · RESEARCH" },
  { id: "wd-persona", label: "Proto-persona" },
  { id: "wd-heuristic", label: "Heuristic Evaluation" },
  { id: "wd-solution", label: "Design Solution", group: "02 · DESIGN SYSTEM" },
  { id: "wd-flow", label: "User Flow" },
  { id: "wd-system", label: "Design System" },
  { id: "wd-anatomy", label: "Design Anatomy" },
  { id: "wd-launch", label: "UI For Launch", group: "03 · UI DESIGN" },
  { id: "wd-micro", label: "Micro Interaction" },
  { id: "wd-usability", label: "Usability Testing", group: "04 · TESTING" },
  { id: "wd-related", label: "Related Projects" },
];

const DARK_ZONES = ["wd-overview-hero", "wd-related", "wd-footer"];

/** Case study: SAPP LMS (Figma 247:14573). Sections live in ./sapp/*.tsx. */
export function SappDetail({
  open = true,
  onBack,
  renderCard,
}: {
  open?: boolean;
  onBack: () => void;
  renderCard: (work: Work) => ReactNode;
}) {
  const lang = useLang();
  const sections = useMemo(
    () => (
      <div className="sapp-detail">
        <Reveal><SappHero /></Reveal>
        <Reveal><SappProcessHighlight /></Reveal>
        <Reveal><SappVision /></Reveal>
        <Reveal><SappDesignProcess /></Reveal>
        <Reveal><SappPhaseResearch /></Reveal>
        <Reveal><SappInitialProblem /></Reveal>
        <Reveal><SappPersona /></Reveal>
        <Reveal><SappHeuristic /></Reveal>
        <Reveal><SappPhaseSystem /></Reveal>
        <Reveal><SappDesignSolution /></Reveal>
        <Reveal><SappUserFlow /></Reveal>
        <SappDesignSystem />
        <SappFoundations />
        <SappComponentLibrary />
        <Reveal><SappAnatomy /></Reveal>
        <Reveal><SappPhaseUi /></Reveal>
        <SappUiForLaunch />
        <Reveal><SappPhaseTesting /></Reveal>
        <SappUsabilityTesting />
        <Reveal><SappCaseEnd /></Reveal>
        <Reveal>
          <RelatedProjects ids={["bave", "vops"]} onBack={onBack} renderCard={renderCard} />
        </Reveal>
        <CaseFooter />
      </div>
    ),
    // `lang` rebuilds the memoised tree so translated sections re-render on language switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBack, renderCard, lang],
  );

  return (
    <CaseStudyShell open={open} onBack={onBack} category="UI/UX" title="SAPP — LMS Redesign" track={TRACK} darkZones={DARK_ZONES}>
      {sections}
    </CaseStudyShell>
  );
}
