"use client";

import { useMemo, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { Work } from "@/lib/works";
import { CaseFooter, CaseStudyShell, RelatedProjects, type TrackItem } from "../shell";
import { ThucBrand } from "./brand";
import { ThucApplications } from "./applications";
import "./thuc.css";

/** Progress tracker stops; each id is a <section id> in one of the group files. */
const TRACK: TrackItem[] = [
  { id: "wd-overview", label: "Overview" },
  { id: "wd-vision", label: "Our Vision" },
  { id: "wd-positioning", label: "Positioning", group: "01 · BRAND IDENTITY" },
  { id: "wd-logo", label: "The logo" },
  { id: "wd-logo-versions", label: "Logo versions" },
  { id: "wd-pattern", label: "Graphic pattern", group: "02 · VISUAL SYSTEM" },
  { id: "wd-colour", label: "Colour palette" },
  { id: "wd-menu", label: "Menu & stationery", group: "03 · APPLICATIONS" },
  { id: "wd-packaging", label: "Packaging" },
  { id: "wd-posters", label: "Posters" },
  { id: "wd-social", label: "Social media" },
  { id: "wd-related", label: "Related Projects" },
];

const DARK_ZONES = ["wd-overview-hero", "wd-related", "wd-footer"];

/** Case study: Thực Vị Thiên (Figma 332:15789, document column "Main" 332:15796). */
export function ThucDetail({
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
      <div className="thuc-detail">
        <ThucBrand />
        <ThucApplications />
        <RelatedProjects ids={["rum"]} onBack={onBack} renderCard={renderCard} />
        <CaseFooter />
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lang re-renders translated children
    [onBack, renderCard, lang],
  );

  return (
    <CaseStudyShell open={open} onBack={onBack} category="Graphic" title="Thực Vị Thiên" track={TRACK} darkZones={DARK_ZONES}>
      {sections}
    </CaseStudyShell>
  );
}
