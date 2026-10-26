import type { ReactNode } from "react";

/** Phase accent used by the eyebrow dot and phase bands. */
export type SappPhase = "brand" | "research" | "system" | "ui" | "test";

const DOT: Record<SappPhase, string> = {
  brand: "var(--brand-sapp)",
  research: "var(--sapp-research-solid)",
  system: "var(--sapp-system-solid)",
  ui: "var(--sapp-ui-deep)",
  test: "var(--sapp-test-solid)",
};

/** Figma "Eyebrow" pill: white surface, 7px dot, JetBrains Mono 18/26. */
export function SappEyebrow({ label, phase = "brand" }: { label: string; phase?: SappPhase }) {
  return (
    <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <span className="size-[7px] shrink-0 rounded-full" style={{ background: DOT[phase] }} />
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{label}</span>
    </span>
  );
}

/** Figma "Wrk/H2": Open Sans Bold 56/60, brand orange. */
export function SappHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap text-[var(--brand-sapp)] ${className}`}>{children}</h2>
  );
}

/** Eyebrow + title + optional lead, as in every SAPP section "Head". */
export function SappSectionHead({
  eyebrow,
  title,
  lead,
  phase = "brand",
  align = "left",
  leadWidth = 760,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  phase?: SappPhase;
  align?: "left" | "center";
  leadWidth?: number;
}) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-[22px] ${center ? "items-center text-center" : "items-start"}`}>
      <div className={`flex flex-col gap-4 ${center ? "items-center" : "items-start"}`}>
        <SappEyebrow label={eyebrow} phase={phase} />
        <SappHeading>{title}</SappHeading>
      </div>
      {lead ? (
        <p className="text-base leading-6 text-[var(--cmd-text-primary)]" style={{ width: leadWidth }}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
