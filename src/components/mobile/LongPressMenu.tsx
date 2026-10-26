"use client";

import { useEffect, useRef, useState } from "react";
import type { AppId } from "@/lib/apps";
import { applyLang, currentLang, useT } from "@/lib/i18n";
import { applyTheme, currentTheme } from "@/lib/theme";
import { mobileZoom } from "@/lib/layout-mode";
import { AppGlyph, GRID, type Press } from "./Home";
import { Glyph, M } from "./parts";

type Item = { label: string; icon: string; run: (at: { x: number; y: number }) => void; gapAfter?: boolean };

const MENU_W = 250;
const MENU_H = 294;

/**
 * Mobile — Home · Long-press (367:22169): the home screen blurs behind a
 * glass-window scrim, the pressed icon lifts (1.08×) and the iOS context
 * menu opens next to it. Rows are wired like the desktop context menu.
 */
export function LongPressMenu({
  press,
  onClose,
  onOpen,
}: {
  press: Press;
  onClose: () => void;
  onOpen: (app: AppId) => void;
}) {
  const t = useT();
  const [leaving, setLeaving] = useState(false);
  /** The finger that opened the menu is still down: its release must not count as a tap on the scrim or a row. */
  const armed = useRef(false);
  const zoom = typeof window === "undefined" ? 1 : mobileZoom();
  const vw = typeof window === "undefined" ? 390 : window.innerWidth / zoom;
  const vh = typeof window === "undefined" ? 844 : window.innerHeight / zoom;

  const close = (then?: () => void) => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      onClose();
      then?.();
    }, 180);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const items: Item[] = [
    { label: "Refresh", icon: `${M}/refresh-18.svg`, run: () => close(() => window.location.reload()) },
    {
      label: "Appearance",
      icon: `${M}/moon-18.svg`,
      gapAfter: true,
      run: (at) => close(() => applyTheme(currentTheme() === "dark" ? "light" : "dark", at)),
    },
    { label: "Open AI Terminal", icon: `${M}/terminal-18.svg`, run: () => close(() => onOpen("terminal")) },
    { label: "Leave an email", icon: `${M}/mail-18.svg`, run: () => close(() => onOpen("mail")) },
    { label: "View my works", icon: "/figma/menu/paint-roller.svg", run: () => close(() => onOpen("projects")) },
    { label: "Change language", icon: `${M}/globe-18.svg`, run: (at) => close(() => applyLang(currentLang() === "en" ? "vi" : "en", at)) },
  ];

  // Design px (the overlay lives inside the zoomed shell).
  const icon = press.rect
    ? { left: press.rect.left / zoom - 12, top: press.rect.top / zoom, height: 81 }
    : null;
  const lifted = icon ? icon.height * 1.08 : 0;
  let left: number;
  let top: number;
  let origin: string;
  if (icon) {
    left = Math.min(Math.max(16, icon.left), vw - 16 - MENU_W);
    const below = icon.top + lifted + 10;
    const fitsBelow = below + MENU_H <= vh - 42;
    top = fitsBelow ? below : Math.max(16, icon.top - 10 - MENU_H);
    origin = `${icon.left + 40 - left}px ${fitsBelow ? 0 : MENU_H}px`;
  } else {
    const x = press.x / zoom;
    const y = press.y / zoom;
    left = Math.min(Math.max(16, x - MENU_W / 2), vw - 16 - MENU_W);
    top = Math.min(Math.max(62, y), vh - 42 - MENU_H);
    origin = `${x - left}px ${y - top}px`;
  }
  const label = press.app ? GRID.find((app) => app.id === press.app)?.label : undefined;

  return (
    <div className="m-overlay fixed inset-0 z-[90]" role="presentation">
      <button
        type="button"
        aria-label={t("Close")}
        onPointerDown={() => (armed.current = true)}
        onClick={(e) => (armed.current || e.detail === 0) && close()}
        className={`m-window m-blur absolute inset-0 block ${leaving ? "m-fade-out" : "m-fade-in"}`}
      />
      {icon && press.app ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute flex w-20 flex-col items-center gap-1.5 ${leaving ? "m-fade-out" : ""}`}
          style={{ left: icon.left, top: icon.top }}
        >
          <div className="m-lift-in flex flex-col items-center gap-1.5" style={{ transformOrigin: "0 0" }}>
            <AppGlyph id={press.app} />
            {label ? <span className="text-fg text-sm leading-[normal] whitespace-nowrap">{t(label)}</span> : null}
          </div>
        </div>
      ) : null}
      <div
        role="menu"
        aria-label={t("Desktop")}
        className={`m-window m-blur-20 m-edge m-shadow-lg absolute flex flex-col rounded-[18px] py-1.5 ${leaving ? "m-menu-out" : "m-menu-in"}`}
        style={{ left, top, width: MENU_W, ["--m-menu-origin" as string]: origin }}
      >
        {items.map((item) => (
          <div key={item.label}>
            <button
              type="button"
              role="menuitem"
              onPointerDown={() => (armed.current = true)}
              onClick={(e) => (armed.current || e.detail === 0) && item.run({ x: e.clientX, y: e.clientY })}
              className="text-fg flex min-h-[46px] w-full items-center px-4 py-3 text-left active:bg-overlay-strong"
            >
              <span className="min-w-0 flex-1 text-base leading-[normal]">{t(item.label)}</span>
              <Glyph src={item.icon} size={18} />
            </button>
            {item.gapAfter ? <span aria-hidden className="bg-overlay block h-1.5 w-full" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
