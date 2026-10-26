"use client";

import type { CSSProperties, ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { GlassEdge } from "./primitives";
import { useTitleBarDrag, useWindow, WindowShell } from "./window-manager";

/**
 * Paints a monochrome Figma SVG in the current text color, so the white
 * Dark Glass exports also read on Light Glass.
 */
export function MaskIcon({
  src,
  size,
  className = "",
  style,
}: {
  src: string;
  size: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width: size,
        height: size,
        WebkitMask: `url(${src}) center / contain no-repeat`,
        mask: `url(${src}) center / contain no-repeat`,
        ...style,
      }}
    />
  );
}

/** Minimize / maximize-restore / close, wired to the window manager. */
export function WindowControls({
  buttonClassName,
  iconSize = 20,
  iconClassName = "",
}: {
  buttonClassName: string;
  iconSize?: number;
  iconClassName?: string;
}) {
  const { state, minimize, toggleMaximize, close } = useWindow();
  const t = useT();
  const buttons = [
    { label: "Minimize", src: "/figma/window/minus.svg", onClick: minimize },
    {
      label: state.maximized ? "Restore" : "Maximize",
      src: "/figma/window/maximize.svg",
      onClick: toggleMaximize,
    },
    { label: "Close", src: "/figma/window/close.svg", onClick: close },
  ];
  return (
    <span className="flex gap-0.5">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          aria-label={t(b.label)}
          title={t(b.label)}
          onClick={b.onClick}
          className={`flex items-center justify-center rounded-lg transition-colors ${buttonClassName} ${
            b.label === "Close" ? "hover:!bg-[#e5484d] hover:!text-white" : ""
          }`}
        >
          <MaskIcon
            src={b.src}
            size={iconSize}
            className={`${iconClassName}`}
          />
        </button>
      ))}
    </span>
  );
}

/** Figma "Window Title Bar" (16:180) on a Glass/Panel window. */
export function AppWindow({
  title,
  children,
  referenceDark = false,
}: {
  title: string;
  children: ReactNode;
  referenceDark?: boolean;
}) {
  const drag = useTitleBarDrag();
  const t = useT();
  return (
    <WindowShell
      label={t(title)}
      className={
        referenceDark
          ? "reference-app-window text-fg shadow-panel rounded-[14px] select-text"
          : "glass glass-panel text-fg shadow-panel rounded-[22px] select-text"
      }
    >
      <header {...drag} className={`${referenceDark ? "reference-titlebar" : "bg-overlay-subtle"} relative h-11 shrink-0 select-none`}>
        <h2 className="pointer-events-none absolute top-1/2 left-1/2 w-[400px] max-w-[calc(100%-220px)] -translate-x-1/2 -translate-y-1/2 truncate text-center text-base leading-6">
          {t(title)}
        </h2>
        <span className="absolute top-1/2 right-3 -translate-y-1/2">
          <WindowControls
            buttonClassName={`${referenceDark ? "reference-window-control" : "hover:bg-overlay-strong"} text-icon-secondary hover:text-fg h-[26px] w-[30px]`}
            iconSize={referenceDark ? 18 : 20}
          />
        </span>
        <span className="bg-divider absolute inset-x-0 bottom-0 h-px" />
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <GlassEdge />
    </WindowShell>
  );
}
