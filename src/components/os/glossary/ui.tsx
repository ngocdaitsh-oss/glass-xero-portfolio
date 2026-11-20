"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Blk, T, useEdit } from "./edit";

/*
 * Building blocks of "Desktop — Glossary Detail · A/B Testing" (Figma 2011:28710): Glossary/Section Header,
 * Glossary/Info Card, Glossary/Callout, Glossary/Stat Card, tables, flows. Sizes are the frame's; colours
 * come from the Works tokens (--w-*) plus the detail tokens in globals.css (--d-*), so both themes work.
 */

/* ── Icons ─────────────────────────────────────────────────────────────── */

/** Outline icons exported from the Figma icon set (public/figma/glossary). */
const FILE_ICONS = [
  "target",
  "component",
  "check-circle",
  "ban",
  "list",
  "sigma",
  "shield-alert",
  "login",
  "briefcase",
  "alert",
  "arrows",
  "clipboard-check",
  "book",
  "link",
  "flask",
  "play-circle",
  "split",
  "bar-chart",
  "analytics",
  "lightbulb",
  "check",
  "users",
  "binoculars",
] as const;

/** A few glyphs the frame uses that are not in the exported set, drawn in the same 1.5px outline style. */
const INLINE: Record<string, ReactNode> = {
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
      <path d="M12 13l3.5-4" />
    </>
  ),
  hourglass: <path d="M6.5 3h11M6.5 21h11M7.5 3c0 5 9 5 9 9s-9 4-9 9M16.5 3c0 5-9 5-9 9s9 4 9 9" />,
  filter: <path d="M4 5h16l-6.2 7.6V19l-3.6-1.8v-4.6L4 5Z" />,
  file: (
    <>
      <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  "list-search": (
    <>
      <path d="M4 6h10M4 11h7M4 16h5" />
      <circle cx="16.5" cy="15.5" r="3.5" />
      <path d="M19 18l2 2" />
    </>
  ),
  rotate: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4.5v4h4" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v4a2.5 2.5 0 0 1-2.5 2.5H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 9.5v-4Z" />
      <path d="M19 9.5a2 2 0 0 1 1 1.7v4.3a2 2 0 0 1-2 2h-.5V20l-3-2.5H11a2 2 0 0 1-2-2" />
    </>
  ),
  dots: (
    <>
      <circle cx="8.5" cy="15.5" r="1.6" />
      <circle cx="15.5" cy="8.5" r="1.6" />
    </>
  ),
  x: <path d="M7 7l10 10M17 7 7 17" />,
  pencil: (
    <>
      <path d="M15.5 4.5l4 4L9 19H5v-4L15.5 4.5Z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
};

export type IconName = (typeof FILE_ICONS)[number] | keyof typeof INLINE;

/** File icons are drawn as a mask, so they take the text colour like the inline ones. */
export function Icon({ name, size, className }: { name: IconName; size: number; className?: string }) {
  if ((FILE_ICONS as readonly string[]).includes(name)) {
    const url = `url(/figma/glossary/${name}.svg)`;
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 bg-current ${className ?? ""}`}
        style={{ width: size, height: size, maskImage: url, WebkitMaskImage: url, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }}
      />
    );
  }
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className ?? ""}`}>
      {INLINE[name]}
    </svg>
  );
}

/** Icon Tile: tinted square holding an icon. */
export function Tile({
  icon,
  size = 44,
  iconSize = 22,
  radius = 12,
  tone = "soft",
}: {
  icon: IconName;
  size?: number;
  iconSize?: number;
  radius?: number;
  tone?: "soft" | "solid" | "fill" | "ink" | "warn" | "bad";
}) {
  const tones = {
    soft: "bg-[var(--d-soft)] text-[var(--d-accent)]",
    solid: "bg-[var(--d-fill)] text-white",
    fill: "bg-[var(--d-fill-tile)] text-white",
    ink: "bg-[var(--d-ink-tile)] text-[var(--d-ink-fg)]",
    warn: "bg-[var(--d-warn-tile)] text-[var(--d-warn-title)]",
    bad: "bg-[var(--d-bad-soft)] text-[var(--d-bad)]",
  };
  return (
    <span className={`flex shrink-0 items-center justify-center ${tones[tone]}`} style={{ width: size, height: size, borderRadius: radius }}>
      <Icon name={icon} size={iconSize} />
    </span>
  );
}

/* ── Typography helpers ───────────────────────────────────────────────── */

/** Mono eyebrow (JetBrains Mono 16/24, +0.4). */
export function Eyebrow({ children, className, size = 16 }: { children: ReactNode; className?: string; size?: 13 | 14 | 16 }) {
  const lh = { 13: "leading-[18px]", 14: "leading-5", 16: "leading-6" }[size];
  return (
    <T className={`block font-mono tracking-[0.4px] uppercase ${lh} ${className ?? "text-[var(--w-muted)]"}`} style={{ fontSize: size }}>
      {children}
    </T>
  );
}

/** Body paragraph, 20/32 secondary (Prose). */
export function P({ children, strong, className }: { children: ReactNode; strong?: boolean; className?: string }) {
  return (
    <Blk label="đoạn văn" className={className}>
      <T as="p" className={`text-[20px] leading-8 tracking-[-0.3px] ${strong ? "font-semibold text-[var(--w-text)]" : "text-[var(--w-secondary)]"}`}>
        {children}
      </T>
    </Blk>
  );
}

/* ── Section scaffolding ──────────────────────────────────────────────── */

export type SectionDef = { id: string; title: string; icon: IconName };

/** Glossary/Section Header: 64px icon tile, "NN / total" and a 48px bold title in accent. */
export function Section({ def, n, total, intro, children }: { def: SectionDef; n: number; total: number; intro?: string; children: ReactNode }) {
  return (
    <Blk as="section" k={`sec:${def.id}`} label="mục" className="flex flex-col gap-10">
      <div id={`g-${def.id}`} data-g-section={def.id} className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <Tile icon={def.icon} size={64} iconSize={30} radius={18} />
          <div className="flex min-w-0 flex-1 flex-col gap-1 text-[var(--d-accent)]">
            <span className="font-mono text-[16px] leading-6 tracking-[0.4px]">
              {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <T as="h2" k={`title:${def.id}`} className="text-[48px] leading-[56px] font-bold tracking-[-2.5px]">
              {def.title}
            </T>
          </div>
        </div>
        {intro ? (
          <T as="p" className="text-[20px] leading-8 tracking-[-0.3px] text-[var(--w-secondary)]">
            {intro}
          </T>
        ) : null}
      </div>
      {children}
    </Blk>
  );
}

/** Subhead inside a long section: 40px tile + 30px title. */
export function Subhead({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <Blk label="tiêu đề phụ" className="flex items-center gap-3.5 pt-6">
      <Tile icon={icon} size={40} iconSize={20} />
      <T as="h3" className="text-[30px] leading-[38px] font-bold tracking-[-1px]">
        {children}
      </T>
    </Blk>
  );
}

/* ── Cards ─────────────────────────────────────────────────────────────── */

/** Glossary/Info Card: tile + number, 22px title, 17px body. `tone` picks white, accent fill or ink. */
export function InfoCard({
  icon,
  n,
  title,
  body,
  tone = "card",
  minH,
  className,
}: {
  icon?: IconName;
  n?: number;
  title?: ReactNode;
  body?: ReactNode;
  tone?: "card" | "fill" | "ink";
  minH?: number;
  className?: string;
}) {
  const bg = { card: "bg-[var(--w-card)]", fill: "bg-[var(--d-fill)] text-white", ink: "bg-[var(--d-ink)] text-[var(--d-ink-fg)]" }[tone];
  const sub = { card: "text-[var(--w-secondary)]", fill: "text-[var(--d-fill-sub)]", ink: "text-[var(--d-ink-sub)]" }[tone];
  const num = { card: "text-[var(--d-accent)]", fill: "text-[var(--d-fill-sub)]", ink: "text-[var(--d-ink-sub)]" }[tone];
  return (
    <Blk label="thẻ" className={`g-card flex flex-col gap-3.5 rounded-[24px] p-7 ${bg} ${className ?? ""}`} style={minH ? { minHeight: minH } : undefined}>
      {icon || n ? (
        <div className="flex items-center justify-between pb-1.5">
          {icon ? <Tile icon={icon} tone={tone === "card" ? "soft" : tone === "fill" ? "fill" : "ink"} /> : <span />}
          {n ? <span className={`font-mono text-[14px] leading-5 tracking-[0.4px] ${num}`}>{String(n).padStart(2, "0")}</span> : null}
        </div>
      ) : null}
      {title ? (
        <T as="h4" className="text-[22px] leading-[30px] font-semibold tracking-[-0.5px]">
          {title}
        </T>
      ) : null}
      {body ? (
        <T as="p" className={`text-[17px] leading-[26px] tracking-[-0.2px] ${sub}`}>
          {body}
        </T>
      ) : null}
    </Blk>
  );
}

/** Glossary/Callout. `scenario` is the warm note; `good` / `bad` are the reading pair; `note` is neutral. */
export function Callout({ tone = "scenario", title, children, icon }: { tone?: "scenario" | "good" | "bad" | "note"; title?: ReactNode; children: ReactNode; icon?: IconName }) {
  const t = {
    scenario: { bg: "bg-[var(--d-warn)]", tile: "bg-[var(--d-warn-tile)] text-[var(--d-warn-title)]", title: "text-[var(--d-warn-title)]", icon: "lightbulb" as IconName },
    good: { bg: "bg-[var(--d-soft)]", tile: "bg-[var(--d-fill)] text-white", title: "text-[var(--d-accent)]", icon: "check" as IconName },
    bad: { bg: "bg-[var(--d-bad-soft)]", tile: "bg-[var(--d-bad)] text-white", title: "text-[var(--d-bad)]", icon: "x" as IconName },
    note: { bg: "bg-[var(--w-card)]", tile: "bg-[var(--d-soft)] text-[var(--d-accent)]", title: "text-[var(--w-text)]", icon: "lightbulb" as IconName },
  }[tone];
  return (
    <Blk label="ghi chú" className={`flex flex-1 items-start gap-[18px] rounded-[20px] py-6 pr-7 pl-6 ${t.bg}`}>
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${t.tile}`}>
        <Icon name={icon ?? t.icon} size={20} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {title ? (
          <T as="h4" className={`text-[19px] leading-7 font-bold tracking-[-0.4px] ${t.title}`}>
            {title}
          </T>
        ) : null}
        <T as="p" className="text-[17px] leading-[27px] tracking-[-0.2px] text-[var(--d-callout-body)]">
          {children}
        </T>
      </div>
    </Blk>
  );
}

/** Glossary/Stat Card: big number, mono label, note. */
export function Stat({ value, label, note, fill }: { value: string; label: string; note: string; fill?: boolean }) {
  return (
    <Blk label="số liệu" className={`flex flex-1 flex-col gap-1 rounded-[24px] p-7 ${fill ? "bg-[var(--d-fill)] text-white" : "bg-[var(--w-card)]"}`}>
      <T className="block text-[44px] leading-[52px] font-bold tracking-[-1.8px]">{value}</T>
      <T className={`mt-1 block font-mono text-[14px] leading-5 tracking-[1.2px] uppercase ${fill ? "text-[var(--d-fill-sub)]" : "text-[var(--w-muted)]"}`}>{label}</T>
      <T as="p" className={`mt-2 text-[17px] leading-[26px] tracking-[-0.2px] ${fill ? "text-[var(--d-fill-sub)]" : "text-[var(--w-secondary)]"}`}>
        {note}
      </T>
    </Blk>
  );
}

/* ── Tables ────────────────────────────────────────────────────────────── */

type Cell = ReactNode;
export type Row = { cells: Cell[]; icon?: IconName; highlight?: boolean };

/**
 * Table: well-coloured mono header, rows split by hairlines. `widths` fixes leading columns (the rest share
 * the space). The first column is the row's label (18px semibold); others are 17px secondary.
 */
export function Table({ head, rows, widths = [], firstStrong = true }: { head: string[]; rows: Row[]; widths?: (number | undefined)[]; firstStrong?: boolean }) {
  const hasIcons = rows.some((r) => r.icon);
  const colStyle = (i: number): CSSProperties => (widths[i] ? { width: widths[i], flex: "none" } : { flex: "1 1 0", minWidth: 0 });
  return (
    <Blk label="bảng" className="g-card overflow-hidden rounded-[24px] bg-[var(--w-card)]">
      <div className="flex bg-[var(--d-well)]">
        {head.map((h, i) => (
          <div key={i} className={`py-4 ${i === 0 && hasIcons ? "pr-6 pl-[74px]" : "px-6"}`} style={colStyle(i)}>
            <Eyebrow size={14} className="text-[var(--w-secondary)]">
              {h}
            </Eyebrow>
          </div>
        ))}
      </div>
      {rows.map((r, ri) => (
        <Blk key={ri} label="hàng" className={`flex border-t border-[var(--d-line)] ${r.highlight ? "bg-[var(--d-soft)]" : ""}`}>
          {r.cells.map((c, ci) => (
            <div key={ci} className={`flex gap-3.5 px-6 py-[22px] ${ci === 0 ? "items-start" : ""}`} style={colStyle(ci)}>
              {ci === 0 && r.icon ? <Tile icon={r.icon} size={36} iconSize={18} radius={10} /> : null}
              {typeof c === "string" ? (
                <T
                  as="p"
                  className={
                    ci === 0 && firstStrong
                      ? `min-w-0 flex-1 text-[18px] leading-[26px] font-semibold tracking-[-0.3px] ${r.highlight ? "text-[var(--d-accent)]" : ""}`
                      : "min-w-0 flex-1 text-[17px] leading-[26px] tracking-[-0.1px] text-[var(--w-secondary)]"
                  }
                >
                  {c}
                </T>
              ) : (
                c
              )}
            </div>
          ))}
        </Blk>
      ))}
    </Blk>
  );
}

/* ── Lists ─────────────────────────────────────────────────────────────── */

/** Check list inside a card: accent ✓ then 17px text. */
export function Checks({ items, mark = "✓", markClass = "text-[var(--d-accent)]" }: { items: ReactNode[]; mark?: string; markClass?: string }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((it, i) => (
        <Blk as="li" key={i} label="mục" className="flex gap-3.5">
          <span aria-hidden className={`w-4 shrink-0 text-[17px] leading-[26px] ${markClass}`}>
            {mark}
          </span>
          <T className="min-w-0 flex-1 text-[17px] leading-[26px] tracking-[-0.2px]">{it}</T>
        </Blk>
      ))}
    </ul>
  );
}

/** Flow node chip (Sơ đồ quy trình / Thiết kế test / Kết hợp thường gặp). */
export function Node({ title, sub, on, soft, className }: { title: string; sub?: string; on?: boolean; soft?: boolean; className?: string }) {
  return (
    <span
      className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-3.5 text-center ${
        on ? "bg-[var(--d-fill)] text-white" : soft ? "bg-[var(--d-soft)] text-[var(--d-accent-strong)]" : "bg-[var(--d-well)]"
      } ${className ?? ""}`}
    >
      <T className="text-[17px] leading-6 font-semibold tracking-[-0.2px]">{title}</T>
      {sub ? <T className={`text-[14px] leading-5 ${on ? "text-[var(--d-fill-sub)]" : "text-[var(--w-secondary)]"}`}>{sub}</T> : null}
    </span>
  );
}

export const Arrow = ({ size = 24 }: { size?: number }) => (
  <span aria-hidden className="shrink-0 leading-7 text-[var(--w-muted)]" style={{ fontSize: size }}>
    →
  </span>
);

/** Checklist column with real checkboxes; ticks are deliberately not saved (the article says so). */
export function ChecklistColumn({ icon, title, items }: { icon: IconName; title: string; items: string[] }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const { editing } = useEdit();
  // While editing, clicks place the caret instead of ticking the box.
  const Row = editing ? "div" : "label";
  return (
    <Blk label="cột" className="g-card flex flex-1 flex-col rounded-[24px] bg-[var(--w-card)] p-7">
      <div className="flex items-center gap-3 pb-5">
        <Tile icon={icon} size={32} iconSize={16} radius={9} />
        <Eyebrow size={14} className="flex-1 text-[var(--d-accent)]">
          {title}
        </Eyebrow>
        <span className="font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-muted)]">
          {done.size}/{items.length}
        </span>
      </div>
      {items.map((it, i) => (
        <Blk key={i} label="mục" className="border-t border-[var(--d-line)]">
          <Row className={`flex items-start gap-3 py-4 ${editing ? "" : "cursor-pointer"}`}>
            <input
              type="checkbox"
              checked={done.has(i)}
              onChange={() =>
                setDone((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
              className="g-check mt-0.5 shrink-0"
            />
            <T className={`text-[17px] leading-[26px] tracking-[-0.2px] transition-colors ${done.has(i) ? "text-[var(--w-muted)] line-through" : ""}`}>{it}</T>
          </Row>
        </Blk>
      ))}
    </Blk>
  );
}
