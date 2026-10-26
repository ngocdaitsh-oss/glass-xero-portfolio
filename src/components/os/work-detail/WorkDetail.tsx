"use client";

import type { ReactNode } from "react";
import type { Work } from "@/lib/works";
import { BaveDetail } from "./BaveDetail";
import { BscDetail } from "./bsc/BscDetail";
import { ThucDetail } from "./thuc/ThucDetail";
import { RumDetail } from "./rum/RumDetail";
import { SappDetail } from "./sapp/SappDetail";
import { VopsDetail } from "./vops/VopsDetail";

/** Case studies that have a built detail page. */
export const DETAIL_READY = new Set(["bave", "sapp", "vops", "bsc", "thuc", "rum"]);

/** Routes a work id to its case study. All share the CaseStudyShell chrome. */
export function WorkDetail({
  id,
  open = true,
  onBack,
  renderCard,
}: {
  id: string;
  open?: boolean;
  onBack: () => void;
  renderCard: (work: Work) => ReactNode;
}) {
  if (id === "rum") return <RumDetail open={open} onBack={onBack} renderCard={renderCard} />;
  if (id === "thuc") return <ThucDetail open={open} onBack={onBack} renderCard={renderCard} />;
  if (id === "bsc") return <BscDetail open={open} onBack={onBack} renderCard={renderCard} />;
  if (id === "vops") return <VopsDetail open={open} onBack={onBack} renderCard={renderCard} />;
  if (id === "sapp") return <SappDetail open={open} onBack={onBack} renderCard={renderCard} />;
  return <BaveDetail open={open} onBack={onBack} renderCard={renderCard} />;
}
