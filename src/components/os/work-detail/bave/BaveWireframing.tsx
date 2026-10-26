/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import { useRef } from "react";
import { useStickyCopy } from "@/lib/sticky";
import { useT } from "@/lib/i18n";
import { SectionHead } from "../parts";

/**
 * Figma "Section — Wireframing" (190:22365). Three flows, each a 40px-padded frame
 * with a 400px copy column beside a white "Paper" holding the wireframe export
 * (Flow A 190:22373, B 190:22380, C 190:22389), 48px apart.
 *
 * Scroll: the AI Workflow "StickyStory" mechanism (`useStickyCopy`). Every flow keeps
 * its own wireframe; while a flow scrolls past, its copy holds 16px under the top of
 * the view and slides down its paper until the copy's end meets the paper's bottom,
 * then leaves with it and the next flow's copy and paper come up.
 */

const FLOWS = [
  {
    kicker: "FLOW A",
    title: "Finding, exploring & deciding",
    body: "Homepage → Searching → Search result → Service detail. Categories surface services based on the user’s location.",
    img: "/figma/wd/wire-a.png",
    h: 1065,
    chip: false,
  },
  {
    kicker: "FLOW B",
    title: "Booking & personal details",
    body: "Booking info → Payment methods → Order confirm. One screen per decision keeps booking to a single tap.",
    img: "/figma/wd/wire-b.png",
    h: 692,
    chip: true,
  },
  {
    kicker: "FLOW C",
    title: "Profile & order management",
    body: "User profile → Car info & manage → Booking manage. Everything a returning user checks.",
    img: "/figma/wd/wire-c.png",
    h: 663,
    chip: true,
  },
] as const;

export function BaveWireframing() {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);
  useStickyCopy(root, ".work-detail", 16, [FLOWS.length]);

  return (
    <section id="wd-wireframing" className="flex flex-col gap-12 px-[156px] pt-40">
      <SectionHead
        eyebrow={t("IDEATION  ·  02.2")}
        phase="system"
        title={t("Wireframing")}
        lead={t("My first pass at the research and goals: low-fidelity screens that showed how the app could work with every core function in place.")}
      />
      <div ref={root} className="flex flex-col gap-12">
        {FLOWS.map((f) => (
          <div key={f.kicker} className="p-10">
            <article data-story className="flex items-start gap-12">
              <div data-copy className="w-[400px] shrink-0">
                <div data-rv className="flex flex-col gap-4">
                  <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap text-[var(--cmd-accent)]">{t(f.kicker)}</p>
                  <p className="text-[30px] leading-9 font-semibold tracking-[-0.6px] text-[var(--cmd-text-primary)]">{t(f.title)}</p>
                  <p className="text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-secondary)]">{t(f.body)}</p>
                  {f.chip ? (
                    <span className="w-fit rounded-full bg-[var(--cmd-surface-2)] px-3 py-1.5 text-sm leading-5 whitespace-nowrap text-[var(--cmd-text-primary)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
                      {t("{n} screens", { n: 3 })}
                    </span>
                  ) : null}
                </div>
              </div>
              <div data-rv className="wd-hover min-w-0 flex-1 rounded-[20px] bg-white p-5 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
                <div className="relative w-full overflow-hidden" style={{ height: f.h }}>
                  <img src={f.img} alt={t("{title} wireframes", { title: t(f.title) })} className="absolute inset-0 size-full max-w-none object-cover" />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
