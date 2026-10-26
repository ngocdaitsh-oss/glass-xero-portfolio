import type { ReactNode } from "react";

/** Figma "Eyebrow" pill: white surface, 7px dot (vOps red by default), JetBrains Mono 18/26. */
export function VopsEyebrow({ label, dot = "var(--brand-vops)" }: { label: string; dot?: string }) {
  return (
    <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <span className="size-[7px] shrink-0 rounded-full" style={{ background: dot }} />
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">{label}</span>
    </span>
  );
}

/** Figma "Wrk/H2": Open Sans Bold 56/60, vOps red. */
export function VopsHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap text-[var(--brand-vops)] ${className}`}>{children}</h2>
  );
}

/** Eyebrow + title + optional lead, as in every vOps section "Head". */
export function VopsSectionHead({
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
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-start gap-4">
        <VopsEyebrow label={eyebrow} dot={dot} />
        <VopsHeading>{title}</VopsHeading>
      </div>
      {lead ? (
        <p className="text-[20px] leading-[30px] text-[var(--cmd-text-primary)]" style={{ width: leadWidth }}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
