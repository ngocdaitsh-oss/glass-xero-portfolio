"use client";

import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";

/** Figma "Eyebrow" pill: white surface, 7px dot (Thực Vị Thiên red by default), JetBrains Mono 18/26. */
export function ThucEyebrow({ label, dot = "var(--brand-thuc)" }: { label: string; dot?: string }) {
  const t = useT();
  return (
    <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <span className="size-[7px] shrink-0 rounded-full" style={{ background: dot }} />
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{t(label)}</span>
    </span>
  );
}

/** Figma "Wrk/H2": Open Sans Bold 56/60, Thực Vị Thiên red. */
export function ThucHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap text-[var(--brand-thuc)] ${className}`}>{children}</h2>
  );
}

/** Eyebrow + title + optional lead, as in every Thực Vị Thiên section "Head". */
export function ThucSectionHead({
  eyebrow,
  title,
  lead,
  dot,
  leadWidth = 900,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dot?: string;
  leadWidth?: number;
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-start gap-4">
        <ThucEyebrow label={eyebrow} dot={dot} />
        <ThucHeading>{typeof title === "string" ? t(title) : title}</ThucHeading>
      </div>
      {lead ? (
        <p className="text-[20px] leading-[30px] text-[var(--cmd-text-primary)]" style={{ width: leadWidth }}>
          {typeof lead === "string" ? t(lead) : lead}
        </p>
      ) : null}
    </div>
  );
}
