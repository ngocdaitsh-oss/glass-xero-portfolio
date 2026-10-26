"use client";

import { useMemo, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { Work } from "@/lib/works";
import { CaseFooter, CaseStudyShell, RelatedProjects, type TrackItem } from "../shell";
import { VopsIntro } from "./intro";
import { VopsResearch } from "./research";
import { VopsSystemA } from "./system-a";
import { VopsSystemB } from "./system-b";
import { VopsUiA } from "./ui-a";
import { VopsUiB } from "./ui-b";
import "./vops.css";

/** Progress tracker stops; each id is a <section id> in one of the group files. */
const TRACK: TrackItem[] = [
  { id: "wd-overview", label: "Overview" },
  { id: "wd-vision", label: "Our Vision" },
  { id: "wd-modules", label: "One app, six modules" },
  { id: "wd-research-plan", label: "Research plan", group: "01 · RESEARCH" },
  { id: "wd-survey", label: "Survey highlights" },
  { id: "wd-personas", label: "Personas" },
  { id: "wd-journey", label: "Journey map" },
  { id: "wd-synthesis", label: "Synthesis" },
  { id: "wd-principles", label: "Principles", group: "02 · DESIGN SYSTEM" },
  { id: "wd-tokens", label: "Token architecture" },
  { id: "wd-colour", label: "Colour" },
  { id: "wd-typography", label: "Typography" },
  { id: "wd-components", label: "Component library" },
  { id: "wd-vops-layer", label: "The vOps layer" },
  { id: "wd-flows", label: "User flows", group: "03 · UI DESIGN" },
  { id: "wd-discovery", label: "Discovery" },
  { id: "wd-miniapps", label: "Mini-apps" },
  { id: "wd-chat", label: "Chat" },
  { id: "wd-related", label: "Related Projects" },
];

const DARK_ZONES = ["wd-overview-hero", "wd-related", "wd-footer"];

/** Case study: vOps (Figma 272:14583, document column "Main" 272:14590). */
export function VopsDetail({
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
      <div className="vops-detail">
        <VopsIntro />
        <VopsResearch />
        <VopsSystemA />
        <VopsSystemB />
        <VopsUiA />
        <VopsUiB />
        <RelatedProjects ids={["sapp", "bave"]} onBack={onBack} renderCard={renderCard} />
        <CaseFooter />
      </div>
    ),
    // `lang` re-renders the translated tree when the language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBack, renderCard, lang],
  );

  return (
    <CaseStudyShell open={open} onBack={onBack} category="UI/UX" title="vOps" track={TRACK} darkZones={DARK_ZONES}>
      {sections}
    </CaseStudyShell>
  );
}
