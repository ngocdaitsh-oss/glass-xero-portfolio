"use client";

import { useMemo, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { Work } from "@/lib/works";
import { CaseFooter, CaseStudyShell, RelatedProjects, type TrackItem } from "../shell";
import { RumBrand } from "./brand";
import { RumApplications } from "./applications";
import "./rum.css";

/** Progress tracker stops; each id is a <section id> in one of the group files. */
const TRACK: TrackItem[] = [
  { id: "wd-overview", label: "Overview" },
  { id: "wd-vision", label: "Our Vision" },
  { id: "wd-naming", label: "Naming & key visual", group: "01 · BRAND IDENTITY" },
  { id: "wd-logo-structure", label: "Logo structure" },
  { id: "wd-character", label: "Brand character" },
  { id: "wd-colour", label: "Colour palette", group: "02 · VISUAL SYSTEM" },
  { id: "wd-typography", label: "Typography" },
  { id: "wd-stationery", label: "Stationery", group: "03 · APPLICATIONS" },
  { id: "wd-billboard", label: "Billboard" },
  { id: "wd-bus-shelter", label: "Bus shelter" },
  { id: "wd-related", label: "Related Projects" },
];

const DARK_ZONES = ["wd-related", "wd-footer"];

/** Case study: 98rum (Figma 343:90404, document column "Main" 343:90411). */
export function RumDetail({
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
      <div className="rum-detail">
        <RumBrand />
        <RumApplications />
        <RelatedProjects ids={["thuc"]} onBack={onBack} renderCard={renderCard} />
        <CaseFooter />
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lang re-renders translated children
    [onBack, renderCard, lang],
  );

  return (
    <CaseStudyShell open={open} onBack={onBack} category="Graphic" title="98rum" track={TRACK} darkZones={DARK_ZONES}>
      {sections}
    </CaseStudyShell>
  );
}
