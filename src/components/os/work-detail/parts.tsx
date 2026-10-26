/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
import type { CSSProperties, ReactNode } from "react";

export type Phase = "research" | "system" | "next";

const DOTS: Record<Phase, string> = {
  research: "/figma/wd/dot.svg",
  system: "/figma/wd/dot-system.svg",
  next: "/figma/wd/dot-next.svg",
};

export function Eyebrow({ label, phase = "research" }: { label: string; phase?: Phase }) {
  return (
    <span className="relative flex w-fit items-center gap-2.5 rounded-full bg-[var(--cmd-surface-1)] py-[7px] pr-3.5 pl-3 shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      <img src={DOTS[phase]} alt="" width={7} height={7} />
      <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">
        {label}
      </span>
    </span>
  );
}

export function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[56px] leading-[60px] font-bold tracking-[-1.96px] whitespace-nowrap text-[var(--brand-bave)] ${className}`}>
      {children}
    </h2>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  phase,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  phase?: Phase;
}) {
  return (
    <div className="flex flex-col gap-[22px]">
      <div data-rv className="flex flex-col gap-4">
        <Eyebrow label={eyebrow} phase={phase} />
        <Heading>{title}</Heading>
      </div>
      {lead ? <p data-rv className="w-[760px] text-base leading-6 text-[var(--cmd-text-secondary)]">{lead}</p> : null}
    </div>
  );
}

/** Card with the case-study offset shadow in the phase color. */
export function OffsetCard({
  phase = "research",
  className = "",
  style,
  children,
}: {
  phase?: Phase;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      data-rv
      className={`wd-hover relative bg-[var(--cmd-surface-1)] ${className}`}
      style={{ boxShadow: `inset 0 1px 0 0 var(--cmd-edge), 6px 6px 0 0 var(--wd-${phase}-back)`, ...style }}
    >
      {children}
    </div>
  );
}

/** Plain white card (no offset shadow) — Figma's newer bave cards. */
export function Card({ className = "", children }: { className?: string; reveal?: boolean; children: ReactNode }) {
  return (
    <div data-rv className={`wd-hover relative bg-[var(--cmd-surface-1)] shadow-[inset_0_1px_0_0_var(--cmd-edge)] ${className}`}>
      {children}
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--cmd-surface-2)] px-3 py-1.5 text-base leading-6 tracking-[-0.2px] whitespace-nowrap text-[var(--cmd-text-secondary)] shadow-[inset_0_1px_0_0_var(--cmd-edge)]">
      {children}
    </span>
  );
}

export function PhoneMock({
  screen,
  mask,
  width,
  height,
}: {
  screen: string;
  mask: string;
  width: number;
  height: number;
}) {
  return (
    <div className="relative shrink-0" style={{ width, height }}>
      <div
        className="absolute inset-[2.37%_5.37%_2.36%_5.6%]"
        style={{
          WebkitMask: `url(${mask}) 0 0 / 100% 100% no-repeat`,
          mask: `url(${mask}) 0 0 / 100% 100% no-repeat`,
        }}
      >
        <img src={screen} alt="" className="absolute inset-0 size-full object-cover" />
      </div>
      <img src="/figma/wd/phone-frame.png" alt="" className="absolute inset-0 size-full object-cover" />
    </div>
  );
}
