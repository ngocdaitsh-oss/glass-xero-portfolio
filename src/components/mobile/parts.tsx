"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { MaskIcon } from "@/components/os/AppWindow";

/*
 * iOS building blocks from the mobile Figma section (353:16502), all at 390
 * design px. Monochrome icons are white exports painted with currentColor
 * (MaskIcon) so they read in both themes.
 */

export const M = "/figma/mobile";

export function Glyph({ src, size, className = "", style }: { src: string; size: number; className?: string; style?: CSSProperties }) {
  return <MaskIcon src={src} size={size} className={className} style={style} />;
}

/** 16px breathing room plus the real device notch inset, without drawing a simulated iOS status bar. */
export function StatusBar() {
  return <div className="m-safe-top h-4 shrink-0" aria-hidden />;
}

/** Compatibility slot retained for page call sites; the simulated iOS home indicator is intentionally hidden. */
export function HomeIndicator({ onHome, fixed = false }: { onHome?: () => void; fixed?: boolean }) {
  void onHome;
  void fixed;
  return null;
}

/** Round glass button of the nav bar (Action 1 / 2, 44×44): glass-bar fill, sheen, edge. */
export function GlassButton({ icon, label, onClick, href, iconSize = 20 }: { icon: string; label: string; onClick?: (el: HTMLElement) => void; href?: string; iconSize?: number }) {
  const cls = "m-bar m-sheen m-edge m-shadow m-press text-fg relative flex size-11 shrink-0 items-center justify-center rounded-[22px]";
  const body = <Glyph src={icon} size={iconSize} />;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={cls}>
        {body}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={(e) => onClick?.(e.currentTarget)} className={cls}>
      {body}
    </button>
  );
}

export type NavAction = { icon: string; label: string; onClick?: (el: HTMLElement) => void; href?: string };

/**
 * iOS/Nav Bar/Large (366:21844, 104 tall: back + actions, 34px title) and
 * iOS/Nav Bar/Inline (366:21858, 48 tall: back, centred 17px title, actions).
 */
export function NavBar({
  variant,
  title,
  back,
  actions = [],
  trailing,
}: {
  variant: "large" | "inline";
  title: string;
  back?: { label: string; onClick: () => void };
  actions?: NavAction[];
  /** Custom control in the actions slot (Works: the grid / list toggle). */
  trailing?: ReactNode;
}) {
  const backButton = back ? (
    <button
      type="button"
      onClick={back.onClick}
      className="m-bar m-sheen m-edge m-shadow m-press text-fg flex h-11 shrink-0 items-center gap-0.5 rounded-[22px] pr-3.5 pl-2"
    >
      <Glyph src={`${M}/chevron-left.svg`} size={22} />
      <span className="text-[17px] leading-[normal] whitespace-nowrap">{back.label}</span>
    </button>
  ) : null;
  const actionRow = trailing ?? (
    <div className="flex items-center justify-end gap-2.5">
      {actions.map((action) => (
        <GlassButton key={action.label} {...action} />
      ))}
    </div>
  );
  if (variant === "inline") {
    return (
      <div className="relative z-10 px-4 pb-1">
        <div className="relative flex h-11 items-center justify-between">
          {backButton ?? <span />}
          <h1 className="text-fg pointer-events-none absolute left-1/2 max-w-[150px] -translate-x-1/2 truncate text-[17px] leading-[normal] font-semibold whitespace-nowrap">
            {title}
          </h1>
          {actionRow}
        </div>
      </div>
    );
  }
  return (
    <div className="relative z-10 flex flex-col gap-1.5 px-4 pb-2">
      <div className="flex h-11 items-center justify-between">
        {backButton}
        <div className="flex min-w-0 flex-1 justify-end">{actionRow}</div>
      </div>
      <h1 className="text-fg truncate text-[34px] leading-[normal] font-bold">{title}</h1>
    </div>
  );
}

/**
 * Compact iOS bar that pins to the top once the page nav bar has scrolled
 * away: solid page colour behind the status bar and an inline title row.
 */
export function StickyNavBar({
  title,
  back,
  trailing,
  background,
  threshold = 64,
}: {
  title: string;
  back?: { label: string; onClick: () => void };
  trailing?: ReactNode;
  /** Solid fill, the page background colour. */
  background: string;
  /** Scroll distance (document px) after which the bar shows. */
  threshold?: number;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShown(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className="fixed inset-x-0 top-0 z-40 transition-[opacity,transform] duration-200 ease-out"
      style={{ background, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(-8px)", pointerEvents: shown ? "auto" : "none", boxShadow: "0 1px 0 rgba(0, 0, 0, 0.06)" }}
    >
      <div className="m-col">
        <StatusBar />
        <NavBar variant="inline" title={title} back={back} trailing={trailing} />
      </div>
    </div>
  );
}

export type ToolButton = { icon: string; label: string; onClick?: (el: HTMLElement) => void; href?: string; pressed?: boolean };

/** Mobile toolbar: accent primary pill + a glass group of 44px buttons. */
export function Toolbar({
  primary,
  buttons,
  trailing,
  center = false,
}: {
  primary?: { icon: string; label: string; onClick?: () => void; href?: string; download?: string; type?: "submit"; form?: string };
  buttons: ToolButton[];
  trailing?: ReactNode;
  center?: boolean;
}) {
  const primaryCls = "m-press flex h-12 shrink-0 items-center gap-2 rounded-3xl bg-[var(--m-accent)] pr-5 pl-4 text-white";
  const primaryBody = primary ? (
    <>
      <Glyph src={primary.icon} size={18} />
      <span className="text-base leading-[normal] font-semibold whitespace-nowrap">{primary.label}</span>
    </>
  ) : null;
  return (
    <div className="m-bottom">
      <div className={`m-col flex items-center px-4 ${center ? "justify-center" : "justify-between"}`}>
        {primary ? (
          primary.href ? (
            <a href={primary.href} download={primary.download} className={primaryCls}>
              {primaryBody}
            </a>
          ) : (
            <button type={primary.type ?? "button"} form={primary.form} onClick={primary.onClick} className={primaryCls}>
              {primaryBody}
            </button>
          )
        ) : null}
        <div className="m-bar m-blur m-edge m-shadow flex items-center gap-1 rounded-[26px] p-1">
          {buttons.map((button) => {
            const cls = `text-fg flex size-11 items-center justify-center rounded-[22px] transition-colors duration-200 active:bg-overlay-strong ${button.pressed ? "bg-overlay-strong" : ""}`;
            const body = <Glyph src={button.icon} size={24} />;
            return button.href ? (
              <a key={button.label} href={button.href} aria-label={button.label} className={cls}>
                {body}
              </a>
            ) : (
              <button key={button.label} type="button" aria-label={button.label} aria-pressed={button.pressed} onClick={(e) => button.onClick?.(e.currentTarget)} className={cls}>
                {body}
              </button>
            );
          })}
        </div>
        {trailing}
      </div>
    </div>
  );
}

/** iOS/Segmented Control (366:21915): the selected segment's pill slides (transform). */
export function Segmented<T extends string>({ items, value, onChange }: { items: { id: T; label: string }[]; value: T; onChange: (id: T) => void }) {
  const index = Math.max(0, items.findIndex((item) => item.id === value));
  return (
    <div role="tablist" className="bg-overlay relative flex w-full gap-0.5 rounded-xl p-[3px]">
      <span
        aria-hidden
        className="m-seg-pill bg-overlay-strong absolute top-[3px] bottom-[3px] left-[3px] rounded-[10px]"
        style={{ width: `calc((100% - 6px - ${(items.length - 1) * 2}px) / ${items.length})`, transform: `translateX(calc(${index} * (100% + 2px)))` }}
      />
      {items.map((item) => {
        const on = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(item.id)}
            className={`text-fg relative flex min-w-0 flex-1 items-center before:absolute before:inset-x-0 before:-inset-y-[5.5px] before:content-[''] justify-center rounded-[10px] px-2.5 py-[7px] text-sm leading-[normal] whitespace-nowrap ${on ? "font-semibold" : ""}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/** iOS/Chip (366:21896): accent when selected, white 50% otherwise. */
export function Chip({ label, selected = false, onClick }: { label: string; selected?: boolean; onClick?: () => void }) {
  const cls = `flex shrink-0 items-start rounded-full px-3.5 py-[7px] text-sm leading-[normal] whitespace-nowrap ${
    selected ? "bg-[var(--m-accent)] font-semibold text-white" : "text-fg bg-[var(--m-chip)]"
  }`;
  if (!onClick) return <span className={cls}>{label}</span>;
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`${cls} m-press relative before:absolute before:-inset-y-[6px] before:inset-x-0 before:content-['']`}>
      {label}
    </button>
  );
}

/** Glass card: surface/glass-panel, 20px radius, Glass/Soft shadow and edge. No blur: it scrolls. */
export function Card({ className = "", children, sheen = false, as = "div" }: { className?: string; children: ReactNode; sheen?: boolean; as?: "div" | "section" }) {
  const Tag = as;
  return <Tag className={`m-panel m-edge m-shadow relative rounded-[20px] ${sheen ? "m-sheen" : ""} ${className}`}>{children}</Tag>;
}

/** Mono section label (JetBrains Mono 14, tertiary). */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-fg-tertiary font-mono text-sm leading-[normal] whitespace-nowrap ${className}`}>{children}</p>;
}

/** 1px divider inside a card. */
export function Divider() {
  return <span aria-hidden className="bg-divider block h-px w-full shrink-0" />;
}

/** Accent icon tile of iOS/List Row (32×32, radius 8, white 18px glyph). */
export function IconTile({ src, radius = 8 }: { src: string; radius?: number }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center bg-[var(--m-accent)] text-white" style={{ borderRadius: radius }}>
      <Glyph src={src} size={18} />
    </span>
  );
}

/** iOS/List Row (366:21887): optional icon tile, title + subtitle or trailing value, optional chevron. */
export function ListRow({
  icon,
  title,
  subtitle,
  subtitleClass = "text-fg-secondary",
  value,
  chevron = false,
  onClick,
  href,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  subtitleClass?: string;
  value?: string;
  chevron?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const body = (
    <>
      {icon ? <IconTile src={icon} /> : null}
      <span className="flex min-w-0 flex-1 flex-col items-start gap-px leading-[normal]">
        <span className="text-fg w-full truncate text-left text-base leading-[normal]">{title}</span>
        {subtitle ? <span className={`w-full truncate text-left text-sm ${subtitleClass} leading-[normal]`}>{subtitle}</span> : null}
      </span>
      {value ? <span className="text-fg-secondary shrink-0 text-[15px] leading-[normal] whitespace-nowrap">{value}</span> : null}
      {chevron ? <Glyph src={`${M}/chevron-right.svg`} size={16} className="text-fg-secondary" /> : null}
    </>
  );
  const cls = "flex w-full items-center gap-3 py-[11px]";
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`${cls} active:opacity-70`}>
        {body}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${cls} active:opacity-70`}>
        {body}
      </button>
    );
  }
  return <div className={cls}>{body}</div>;
}

/** Rows separated by dividers inside a card with 16px side and 4px vertical padding. */
export function ListCard({ children, className = "" }: { children: ReactNode[]; className?: string }) {
  const rows = children.filter(Boolean);
  return (
    <Card className={`flex flex-col px-4 py-1 ${className}`}>
      {rows.map((row, index) => (
        <div key={index} className="w-full">
          {index ? <Divider /> : null}
          {row}
        </div>
      ))}
    </Card>
  );
}

/** Page frame: real-device safe inset, nav bar, content, and room for the fixed toolbar. */
export function Page({
  nav,
  children,
  toolbar,
  onHome,
  bottomSpace = 88,
  scrim = false,
}: {
  nav: ReactNode;
  children: ReactNode;
  toolbar?: ReactNode;
  onHome: () => void;
  bottomSpace?: number;
  scrim?: boolean;
}) {
  return (
    <>
      {scrim ? <div aria-hidden className="m-window pointer-events-none fixed inset-0 z-0" /> : null}
      <div className="m-page-body relative">
        <StatusBar />
        <div className="m-col">
          {nav}
          <div className="px-4 pt-3" style={{ paddingBottom: `calc(${bottomSpace}px + env(safe-area-inset-bottom) / var(--m-zoom, 1))` }}>
            {children}
          </div>
        </div>
      </div>
      {toolbar}
      <HomeIndicator onHome={onHome} />
    </>
  );
}
