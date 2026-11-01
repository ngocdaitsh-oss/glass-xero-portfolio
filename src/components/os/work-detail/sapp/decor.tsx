"use client";

import type { CSSProperties } from "react";

type StickerTone = "yellow" | "mint" | "violet" | "orange";

const STICKER_TONES: Record<StickerTone, { background: string; color: string }> = {
  yellow: { background: "#ffc233", color: "#1f2937" },
  mint: { background: "#8fe3dc", color: "#14514d" },
  violet: { background: "#5b6be0", color: "#ffffff" },
  orange: { background: "#ffb866", color: "#5a3200" },
};

export function SappDsSticker({
  label,
  tone,
  rotate = 0,
  className = "",
}: {
  label: string;
  tone: StickerTone;
  rotate?: number;
  className?: string;
}) {
  const palette = STICKER_TONES[tone];
  return (
    <div className={`pointer-events-none absolute z-[8] flex items-center justify-center ${className}`} aria-hidden>
      <div
        className="flex items-center rounded-[12px] px-5 py-2.5 shadow-[0_6px_7px_rgba(0,0,0,0.12)]"
        style={{ background: palette.background, color: palette.color, transform: `rotate(${rotate}deg)` }}
      >
        <span className="text-[20px] leading-normal font-semibold whitespace-nowrap">{label}</span>
      </div>
    </div>
  );
}

export function SappDsCursorTag({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute z-[9] h-16 w-[150px] ${className}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/figma/sapp/system/ds-cursor.svg" alt="" className="absolute top-0 left-0 h-[26px] w-6" />
      <span className="absolute top-6 left-[22px] rounded-lg bg-[#ec4fd0] px-3 py-1.5 text-[16px] leading-[22px] font-semibold whitespace-nowrap text-white">
        Tuan Ngoc
      </span>
    </div>
  );
}

export function SappSelectionOutline({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`pointer-events-none absolute z-[6] border-2 border-solid border-[#5b6be0] ${className}`} style={style} aria-hidden>
      {[
        "-top-2 -left-2",
        "-top-2 -right-2",
        "-bottom-2 -left-2",
        "-right-2 -bottom-2",
      ].map((position) => (
        <span key={position} className={`absolute size-4 bg-white shadow-[inset_0_0_0_2px_#5b6be0] ${position}`} />
      ))}
    </div>
  );
}
