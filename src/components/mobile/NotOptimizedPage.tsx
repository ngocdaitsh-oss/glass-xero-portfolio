/* eslint-disable @next/next/no-img-element -- Figma SVG exports keep their own size. */
"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { Glyph, M, StatusBar } from "./parts";

const A = `${M}/not-optimized`;

/**
 * Figma "Mobile — Work Detail (Not optimized)" (418:30331 / light 418:30379):
 * case studies have no phone layout, so a phone gets this notice over the
 * lightly frosted wallpaper instead of a shrunken desktop page.
 */
export function NotOptimizedPage({ onBack }: { onBack: () => void }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers: a hidden textarea + execCommand.
      const area = document.createElement("textarea");
      area.value = url;
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="relative min-h-[100dvh]">
      {/* Rectangle 34624656: a 1% white veil with a 12px (dark) / 6px (light) backdrop blur over the still wallpaper. */}
      <div aria-hidden className="m-not-optimized-veil pointer-events-none fixed inset-0" />
      <StatusBar />
      <div className="m-col">
        <div className="mx-auto flex w-[326px] flex-col items-center gap-4 pt-[137px] pb-16 text-center">
          <span className="relative size-24 shrink-0">
            {/* The export carries its drop shadow, so it overhangs the 96px box as in Figma (-2.08% / -27.08%). */}
            <img src={`${A}/icon.svg`} alt="" className="absolute inset-[-2.08%_-2.08%_-27.08%_-2.08%] block size-auto max-w-none" />
          </span>
          <span aria-hidden className="h-1" />
          <h1 className="text-fg w-full text-[26px] leading-[1.25] font-bold">{t("Sorry, this page isn't mobile friendly")}</h1>
          <p className="text-fg-secondary w-full text-base leading-[1.4]">
            {t("Case studies are packed with diagrams, flows and design-system specs. For the best experience, open this page on a tablet or desktop.")}
          </p>
          <span aria-hidden className="h-2" />
          <button
            type="button"
            onClick={onBack}
            className="m-press flex h-[52px] w-full items-center justify-center gap-2 rounded-[26px] bg-[var(--azure-600)] text-base leading-[1.4] font-semibold text-white"
          >
            <img src={`${A}/chevron-left.svg`} alt="" className="size-5" />
            {t("Back to Works")}
          </button>
          <button
            type="button"
            onClick={copy}
            className="m-bar m-sheen m-edge m-shadow m-press text-fg flex h-[52px] w-full items-center justify-center gap-2 rounded-[26px] text-base leading-[1.4] font-semibold"
          >
            <Glyph src={`${A}/external-link.svg`} size={20} />
            <span aria-live="polite">{copied ? t("Link copied") : t("Copy link to open on desktop")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
