"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { Work } from "@/lib/works";

// Each case study is its own chunk: together they were 1.4 MB of JS that nobody needs up front.
const BaveDetail = dynamic(() => import("./BaveDetail").then((m) => m.BaveDetail));
const BscDetail = dynamic(() => import("./bsc/BscDetail").then((m) => m.BscDetail));
const ThucDetail = dynamic(() => import("./thuc/ThucDetail").then((m) => m.ThucDetail));
const RumDetail = dynamic(() => import("./rum/RumDetail").then((m) => m.RumDetail));
const SappDetail = dynamic(() => import("./sapp/SappDetail").then((m) => m.SappDetail));
const VopsDetail = dynamic(() => import("./vops/VopsDetail").then((m) => m.VopsDetail));

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
