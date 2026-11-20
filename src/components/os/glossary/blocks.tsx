"use client";

import { Blk, T } from "./edit";
import { Checks, Eyebrow, Icon, Tile, type IconName } from "./ui";

/*
 * Composite blocks shared by the glossary articles (Figma 2011:28710): step cards, input → output pair,
 * labelled pair cards (mistakes, good / not good), related-term grid.
 */

/** Numbered step cards with an "Đầu ra" chip (Cách áp dụng, 2025:29104), without phase grouping. */
export function Steps({ steps }: { steps: [string, string, string][] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map(([title, body, out], i) => (
        <Blk key={title} label="bước" className="g-card flex gap-6 rounded-[24px] bg-[var(--w-card)] p-7">
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-full font-mono text-[16px] leading-6 ${i === 0 ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-well)] text-[var(--d-accent)]"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <T as="h4" className="text-[22px] leading-[30px] font-semibold tracking-[-0.5px]">
              {title}
            </T>
            <T as="p" className="text-[17px] leading-[26px] tracking-[-0.2px] text-[var(--w-secondary)]">
              {body}
            </T>
            <span className="mt-2 flex items-center gap-2.5 self-start rounded-[10px] bg-[var(--d-well)] px-3 py-1.5">
              <Icon name="login" size={14} className="text-[var(--w-muted)]" />
              <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--w-muted)]">ĐẦU RA</span>
              <T className="text-[15px] leading-[22px] font-semibold">{out}</T>
            </span>
          </div>
        </Blk>
      ))}
    </div>
  );
}

/** Đầu vào → Đầu ra pair (2016:28925). */
export function InOutCards({ inputs, outputs }: { inputs: string[]; outputs: string[] }) {
  return (
    <div className="flex items-center gap-4">
      <Blk label="thẻ" className="g-card flex flex-1 flex-col gap-6 self-stretch rounded-[24px] bg-[var(--w-card)] p-8">
        <div className="flex items-center gap-3">
          <Tile icon="file" size={40} iconSize={20} />
          <Eyebrow className="text-[var(--d-accent)]">Đầu vào cần chuẩn bị</Eyebrow>
        </div>
        <Checks items={inputs} mark="•" />
      </Blk>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--d-fill)] text-[20px] text-white">→</span>
      <Blk label="thẻ" className="flex flex-1 flex-col gap-6 self-stretch rounded-[24px] bg-[var(--d-ink)] p-8 text-[var(--d-ink-fg)]">
        <div className="flex items-center gap-3">
          <Tile icon="list-search" size={40} iconSize={20} tone="ink" />
          <Eyebrow className="text-[var(--d-ink-accent)]">Đầu ra sau khi áp dụng</Eyebrow>
        </div>
        <Checks items={outputs} mark="•" markClass="text-[var(--d-ink-accent)]" />
      </Blk>
    </div>
  );
}

/**
 * Card with a title and two labelled notes, red then accent (Lỗi thường gặp, 2025:29493). Also used for
 * "chưa tốt / tốt hơn" pairs; `first` / `second` rename the two labels.
 */
export function PairCards({
  items,
  first = "Vì sao sai",
  second = "Cách khắc phục",
  icon = "alert",
}: {
  items: [string, string, string][];
  first?: string;
  second?: string;
  icon?: IconName | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map(([title, a, b]) => (
        <Blk key={title} label="thẻ" className="g-card flex flex-col gap-4 rounded-[24px] bg-[var(--w-card)] p-7">
          <div className="flex items-start gap-3.5">
            {icon ? <Tile icon={icon} size={36} iconSize={18} radius={10} tone="bad" /> : null}
            <T as="h4" className={`min-w-0 flex-1 text-[20px] leading-7 font-semibold tracking-[-0.4px] ${icon ? "pt-1" : ""}`}>
              {title}
            </T>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-[var(--d-bad)] pl-4">
            <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-bad)] uppercase">{first}</span>
            <T as="p" className="text-[16px] leading-6 text-[var(--w-secondary)]">
              {a}
            </T>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-[var(--d-accent)] pl-4">
            <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-accent)] uppercase">{second}</span>
            <T as="p" className="text-[16px] leading-6">
              {b}
            </T>
          </div>
        </Blk>
      ))}
    </div>
  );
}

/** Related-term cards (2017:29078). */
export function RelatedCards({ items }: { items: [string, string, string][] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(([en, vi, why]) => (
        <Blk key={en} label="thẻ" className="g-card flex min-h-[170px] flex-col gap-2 rounded-[24px] bg-[var(--w-card)] p-7">
          <T as="h4" className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">
            {en}
          </T>
          <T className="text-[15px] leading-[22px] text-[var(--w-muted)]">{vi}</T>
          <T as="p" className="mt-1 text-[17px] leading-[26px] tracking-[-0.2px] text-[var(--w-secondary)]">
            {why}
          </T>
        </Blk>
      ))}
    </div>
  );
}
