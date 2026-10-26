/* eslint-disable @next/next/no-img-element -- cursor glyphs and the accent check keep their Figma colors. */
"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import type { AppId } from "@/lib/apps";
import { applyLang, lastPointer as langPointer, useLang, useT } from "@/lib/i18n";
import { applyTheme, currentTheme, subscribeTheme } from "@/lib/theme";
import { useLayoutMode } from "@/lib/layout-mode";
import { GlassEdge } from "./primitives";
import { MaskIcon } from "./AppWindow";

type Row = {
  label: string;
  icon: string;
  shortcut?: string;
  app?: AppId;
  action?: "close" | "reload" | "rearrange" | "cursor" | "appearance" | "language";
};

const ROWS: Row[] = [
  { label: "Rearrange items", icon: "/figma/menu/grid.svg", action: "rearrange" },
  { label: "Refresh", icon: "/figma/menu/refresh.svg", shortcut: "F5", action: "reload" },
  { label: "Personalize cursor", icon: "/figma/menu/cursor.svg", action: "cursor" },
  { label: "Open AI Terminal", icon: "/figma/menu/terminal.svg", app: "terminal" },
  { label: "Leave an email", icon: "/figma/menu/mail.svg", app: "mail" },
  { label: "View my works", icon: "/figma/menu/paint-roller.svg", app: "projects" },
  { label: "Change language", icon: "/figma/menu/globe.svg", action: "language" },
  { label: "Appearance", icon: "/figma/menu/moon.svg", action: "appearance" },
];

const themeNow = currentTheme;

function setTheme(theme: "light" | "dark") {
  applyTheme(theme, lastPointer);
}

/** Where the menu row was clicked, so the theme circle grows from there. */
let lastPointer: { x: number; y: number } | undefined;
if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", (e) => (lastPointer = { x: e.clientX, y: e.clientY }), true);
}

/** Touch-first device: there is no pointer to personalize. */
function coarseNow() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function subscribeCoarse(onChange: () => void) {
  const query = window.matchMedia("(pointer: coarse)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function cursorNow() {
  return document.documentElement.dataset.cursor === "light" ? "light" : "dark";
}

function subscribeCursor(onChange: () => void) {
  window.addEventListener("xero-cursor", onChange);
  return () => window.removeEventListener("xero-cursor", onChange);
}

function setCursor(cursor: "light" | "dark") {
  document.documentElement.dataset.cursor = cursor;
  localStorage.setItem("xero-cursor", cursor);
  window.dispatchEvent(new Event("xero-cursor"));
}

export function ContextMenu({
  x,
  y,
  onClose,
  onOpenApp,
  onRearrange,
}: {
  x: number;
  y: number;
  onClose: () => void;
  onOpenApp: (app: AppId) => void;
  onRearrange: () => void;
}) {
  const theme = useSyncExternalStore(subscribeTheme, themeNow, () => "dark" as const);
  const cursor = useSyncExternalStore(subscribeCursor, cursorNow, () => "dark" as const);
  const language = useLang();
  const t = useT();
  const tablet = useLayoutMode() === "tablet";
  const coarse = useSyncExternalStore(subscribeCoarse, coarseNow, () => false);
  // Tablet frames: dark (359:91891) drops "Personalize cursor", light (361:19850) keeps it — it is hidden only on touch-first devices.
  const rows = tablet && coarse ? ROWS.filter((row) => row.action !== "cursor") : ROWS;
  /** Submenu opened by tap (touch has no hover). */
  const [openSub, setOpenSub] = useState<Row["action"] | null>(null);
  // The stage is at least 1920×1080 design px and wider/taller on other aspect ratios.
  const stage = typeof document === "undefined" ? null : document.querySelector<HTMLElement>(".desktop-stage");
  const stageW = stage?.clientWidth ?? 1920;
  const stageH = stage?.clientHeight ?? 1080;
  // Tablet (Figma 359:91891): the same menu at 1.12× (311.36 wide), opened at the long-press point.
  const zoom = tablet ? 1.12 : 1;
  const left = tablet ? Math.min(Math.max(12, x), stageW - 311.36 - 12) : Math.min(Math.max(8, x), stageW - 520);
  const top = tablet ? Math.min(Math.max(74, y), stageH - (rows.length < ROWS.length ? 353.64 : 413.12) - 12) : Math.min(Math.max(70, y), stageH - 400);
  const flip = tablet ? left > stageW - 311.36 - 6 * zoom - 240 * zoom - 12 : left > stageW - 278 - 250;

  return (
    <div
      role="menu"
      aria-label={t("Desktop")}
      className="glass glass-flyout text-fg shadow-panel absolute z-[70] flex w-[278px] flex-col gap-0.5 rounded-[14px] p-1.5"
      style={tablet ? { left: left / zoom, top: top / zoom, zoom } : { left, top }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {rows.map((row) => (
        <div key={row.label} className={`group relative ${openSub === row.action ? "is-open" : ""}`}>
          {row.action === "cursor" || row.app === "terminal" ? <Separator /> : null}
          <button
            type="button"
            role="menuitem"
            data-open-app={row.app}
            aria-haspopup={row.action === "cursor" || row.action === "appearance" || row.action === "language" ? "menu" : undefined}
            className="hover:bg-overlay-strong flex h-10 w-full items-center gap-2.5 rounded-[9px] px-2.5 text-left group-hover:bg-overlay-strong"
            onClick={() => {
              if (row.app) onOpenApp(row.app);
              else if (row.action === "rearrange") onRearrange();
              else if (row.action === "reload") window.location.reload();
              else if (row.action === "close") onClose();
              else if (tablet) setOpenSub((open) => (open === row.action ? null : row.action));
            }}
          >
            <MaskIcon src={row.icon} size={24} />
            <span className="min-w-0 flex-1 text-base leading-6 whitespace-nowrap">{t(row.label)}</span>
            {row.shortcut ? (
              <span className="text-fg-tertiary shrink-0 font-mono text-xs leading-5 whitespace-nowrap">{row.shortcut}</span>
            ) : null}
            {row.action === "cursor" || row.action === "appearance" || row.action === "language" ? (
              <MaskIcon src="/figma/menu/chevron.svg" size={16} className="text-fg-tertiary" />
            ) : null}
          </button>
          {row.action === "cursor" && (
            <Submenu title={t("CURSOR STYLE")} flip={flip}>
              <ThemeRow icon="/figma/menu/cursor-light.svg" label={t("Light")} checked={cursor === "light"} masked={false} onPick={() => { setCursor("light"); onClose(); }} />
              <ThemeRow icon="/figma/menu/cursor-dark.svg" label={t("Dark")} checked={cursor === "dark"} masked={false} onPick={() => { setCursor("dark"); onClose(); }} />
            </Submenu>
          )}
          {row.action === "language" && (
            <Submenu title={t("LANGUAGE")} flip={flip}>
              <ThemeRow icon="/figma/menu/globe.svg" label="Tiếng Việt" checked={language === "vi"} onPick={() => { applyLang("vi", langPointer); onClose(); }} />
              <ThemeRow icon="/figma/menu/globe.svg" label="English" checked={language === "en"} onPick={() => { applyLang("en", langPointer); onClose(); }} />
            </Submenu>
          )}
          {row.action === "appearance" && (
            <Submenu title={t("APPEARANCE")} flip={flip}>
              <ThemeRow icon="/figma/light/sun.svg" label={t("Light")} checked={theme === "light"} onPick={() => { setTheme("light"); onClose(); }} />
              <ThemeRow icon="/figma/menu/moon.svg" label={t("Dark")} checked={theme === "dark"} onPick={() => { setTheme("dark"); onClose(); }} />
            </Submenu>
          )}
        </div>
      ))}
      <GlassEdge />
    </div>
  );
}

function Separator() {
  return (
    <div className="px-2 py-1" aria-hidden>
      <div className="bg-divider h-px w-full" />
    </div>
  );
}

function Submenu({ title, flip, children }: { title: string; flip: boolean; children: ReactNode }) {
  return (
    <div
      role="menu"
      aria-label={title}
      className={`glass glass-flyout text-fg shadow-panel invisible absolute top-0 z-20 flex w-[240px] flex-col gap-0.5 rounded-[14px] p-1.5 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 group-[.is-open]:visible group-[.is-open]:opacity-100 ${
        flip ? "right-[calc(100%+6px)]" : "left-[calc(100%+6px)]"
      }`}
    >
      <span aria-hidden className={`absolute inset-y-0 w-3 ${flip ? "-right-3" : "-left-3"}`} />
      <p className="text-fg-tertiary px-2.5 pt-1.5 pb-1 text-xs leading-5 font-semibold tracking-[0.04em]">{title}</p>
      {children}
      <GlassEdge />
    </div>
  );
}

function ThemeRow({
  icon,
  label,
  checked,
  masked = true,
  onPick,
}: {
  icon: string;
  label: string;
  checked: boolean;
  masked?: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      onClick={onPick}
      className="hover:bg-overlay-strong flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-left"
    >
      {masked ? <MaskIcon src={icon} size={24} /> : <img src={icon} alt="" width={24} height={24} className="size-6 shrink-0 object-contain" />}
      <span className="min-w-0 flex-1 text-base leading-6">{label}</span>
      {checked ? <img src="/figma/menu/check.svg" alt="" width={16} height={16} className="size-4 shrink-0" /> : <span className="size-4 shrink-0" />}
    </button>
  );
}
