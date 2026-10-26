"use client";

import { useMemo, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { Work } from "@/lib/works";
import { CaseFooter, CaseStudyShell, RelatedProjects, type TrackItem } from "../shell";
import { BscIntro } from "./intro";
import { BscResearch } from "./research";
import { BscLaunch } from "./launch";
import { BscOutro, BscSystem } from "./system";
import "./bsc.css";

/** Progress tracker stops; each id is a <section id> in one of the group files. */
const TRACK: TrackItem[] = [
  { id: "wd-overview", label: "Overview" },
  { id: "wd-vision", label: "Our Vision" },
  { id: "wd-competitors", label: "Competitors Research", group: "01 · RESEARCH" },
  { id: "wd-solution", label: "Solution" },
  { id: "wd-wireframing", label: "Wireframing", group: "02 · DESIGN SYSTEM" },
  { id: "wd-uikit", label: "UI Kit" },
  { id: "wd-launch", label: "UI For Launch", group: "03 · UI DESIGN" },
  { id: "wd-outcome", label: "Post Design Outcome" },
  { id: "wd-realtime", label: "Real-time Experience" },
  { id: "wd-related", label: "Related Projects" },
];

const DARK_ZONES = ["wd-overview-hero", "wd-related", "wd-footer"];

/** Case study: BSC (Figma 223:13353, document column "Main" 223:13360). */
export function BscDetail({
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
      <div className="bsc-detail">
        <BscIntro />
        <BscResearch />
        <BscSystem />
        <BscLaunch />
        <BscOutro />
        <RelatedProjects ids={["vops", "sapp"]} onBack={onBack} renderCard={renderCard} />
        <CaseFooter />
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lang re-renders translated children
    [onBack, renderCard, lang],
  );

  return (
    <CaseStudyShell open={open} onBack={onBack} category="UI/UX" title="BSC" track={TRACK} darkZones={DARK_ZONES}>
      {sections}
    </CaseStudyShell>
  );
}
