"use client";

import { useSyncExternalStore, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { menuItems, type AppId } from "@/lib/apps";
import { applyTheme, currentTheme as getTheme, subscribeTheme } from "@/lib/theme";
import { applyLang, currentLang, useLang, useT } from "@/lib/i18n";
import { DESIGN_TIME, periodLabel, shortDate, useNow, zonedParts } from "@/lib/use-now";
import { GlassEdge, Icon } from "./primitives";

type BarButtonProps = {
  children: ReactNode;
  variant?: "ghost" | "tinted";
  active?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  label?: string;
  title?: string;
  className?: string;
  popupToggle?: boolean;
  /** Marks a button that opens this app (pointer-down stages its pre-rendered window). */
  openApp?: string;
};

/** Figma "Bar Button": Ghost / Tinted, with a While-hovering → Hover state. */
export function BarButton({
  children,
  variant = "ghost",
  active = false,
  onClick,
  label,
  className = "",
  popupToggle = false,
  title,
  openApp,
}: BarButtonProps) {
  const base =
    "relative flex h-8 shrink-0 items-center gap-1.5 overflow-clip rounded-lg px-2 text-base leading-6 font-normal outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--azure-300)]";
  const tone =
    variant === "tinted"
      ? "bg-overlay hover:bg-overlay-strong"
      : active
        ? "bg-overlay-strong"
        : "bg-transparent hover:bg-overlay";
  return (
    <button
      type="button"
      aria-label={label}
      title={title}
      aria-pressed={active || undefined}
      data-popup-toggle={popupToggle ? "" : undefined}
      data-open-app={openApp}
      onClick={onClick}
      className={`${base} ${tone} ${className}`}
    >
      {children}
    </button>
  );
}

type TopBarProps = {
  searchOpen: boolean;
  dateOpen: boolean;
  controlCenterOpen: boolean;
  onToggleSearch: () => void;
  onToggleDate: () => void;
  onToggleControlCenter: () => void;
  onOpenApp: (app: AppId) => void;
  onLogo: () => void;
};

export function TopBar({
  searchOpen,
  dateOpen,
  controlCenterOpen,
  onToggleSearch,
  onToggleDate,
  onToggleControlCenter,
  onOpenApp,
  onLogo,
}: TopBarProps) {
  const now = useNow();
  const t = now ? zonedParts(now) : DESIGN_TIME;
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark" as const);
  const lang = useLang();
  const tr = useT();

  const toggleLang = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    applyLang(currentLang() === "vi" ? "en" : "vi", { x: box.left + box.width / 2, y: box.top + box.height / 2 });
  };

  const toggleTheme = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    applyTheme(getTheme() === "light" ? "dark" : "light", {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    });
  };

  return (
    <header className="reference-topbar boot-top shadow-soft absolute inset-x-3 top-2.5 z-50 h-14 overflow-clip tablet:h-[52px] rounded-[14px] backdrop-blur-[16px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[14px]">
        <div className="reference-topbar-surface absolute inset-0 rounded-[14px]" />
      </div>

      <div className="absolute top-1/2 left-2.5 flex -translate-y-1/2 items-center gap-2.5">
        <BarButton variant="tinted" label="Glass Xero" onClick={onLogo}>
          <Icon src="/figma/logo.svg" size={24} />
        </BarButton>
        <nav aria-label="Apps" className="flex items-center gap-2 tablet:gap-0">
          {menuItems.map((item) => (
            <BarButton key={item.label} openApp={item.app} onClick={() => onOpenApp(item.app)}>
              <span className="text-fg text-base leading-6 font-normal whitespace-nowrap">{tr(item.label)}</span>
            </BarButton>
          ))}
        </nav>
      </div>

      <button
        type="button"
        onClick={onToggleDate}
        data-popup-toggle=""
        aria-expanded={dateOpen}
        aria-label={tr("Date, time and weather")}
        className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3.5 overflow-clip rounded-lg px-2.5 py-1 transition-colors duration-150 outline-none hover:bg-[var(--overlay-hover)] focus-visible:ring-2 focus-visible:ring-[var(--azure-300)] tablet:hidden ${
          dateOpen ? "bg-overlay-strong" : ""
        }`}
      >
        <span className="text-fg-secondary text-base leading-6 whitespace-nowrap">
          {shortDate(t, lang)}
        </span>
        <span className="text-fg text-base leading-6 font-semibold whitespace-nowrap tabular-nums">
          {t.hour12}:{t.minute} {periodLabel(t, lang)}
        </span>
        <Icon src="/figma/dot.svg" size={4} />
        <span className="flex items-center gap-1.5">
          <Icon src="/figma/weather-sun.svg" size={24} />
          <span className="text-fg text-base leading-6 whitespace-pre">{tr("26°C  Sunny")}</span>
        </span>
      </button>

      <div className="absolute top-1/2 right-[5px] flex -translate-y-1/2 items-center gap-0.5 tablet:right-2">
        <BarButton label={tr("Search")} active={searchOpen} popupToggle onClick={onToggleSearch}>
          <Icon src="/figma/search.svg" size={24} />
        </BarButton>
        <BarButton
          label={lang === "vi" ? "Ngôn ngữ: Tiếng Việt — chuyển sang English" : "Language: English — switch to Tiếng Việt"}
          title={lang === "vi" ? "English" : "Tiếng Việt"}
          onClick={toggleLang}
        >
          <Icon src="/figma/globe.svg" size={24} />
        </BarButton>
        <button
          type="button"
          aria-label={tr(theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}
          aria-pressed={theme === "light"}
          title={tr(theme === "dark" ? "Light Glass" : "Dark Glass")}
          onClick={toggleTheme}
          className="flex h-7 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 outline-none hover:bg-overlay-strong focus-visible:ring-2 focus-visible:ring-[var(--azure-300)]"
        >
          <Icon src="/figma/moon.svg" size={20} />
        </button>
        <BarButton
          label={tr("Control Center")}
          active={controlCenterOpen}
          popupToggle
          onClick={onToggleControlCenter}
        >
          <Icon src="/figma/control-center.svg" size={24} />
        </BarButton>
      </div>

      <GlassEdge />
    </header>
  );
}
