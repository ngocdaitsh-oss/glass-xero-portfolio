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
function WindowControlGlyph({
  kind,
  size,
}: {
  kind: "minimize" | "maximize" | "restore" | "close";
  size: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      {kind === "minimize" && (
        <path d="M4 8.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
      {kind === "maximize" && (
        <rect x="3.75" y="3.75" width="8.5" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      )}
      {kind === "restore" && (
        <>
          <path d="M6 3.75h5.25c.55 0 1 .45 1 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3.75" y="5.75" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
      {kind === "close" && (
        <path d="M4.5 4.5l7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function WindowControls({
  buttonClassName,
  iconSize = 18,
  iconClassName = "",
}: {
  buttonClassName: string;
  iconSize?: number;
  iconClassName?: string;
}) {
  const { state, minimize, toggleMaximize, close } = useWindow();
  const t = useT();
  const buttons = [
    { label: "Minimize", kind: "minimize" as const, onClick: minimize },
    {
      label: state.maximized ? "Restore" : "Maximize",
      kind: state.maximized ? ("restore" as const) : ("maximize" as const),
      onClick: toggleMaximize,
    },
    { label: "Close", kind: "close" as const, onClick: close },
  ];
  return (
    <span className="flex items-center gap-0.5">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          aria-label={t(b.label)}
          title={t(b.label)}
          onClick={b.onClick}
          className={`flex items-center justify-center rounded-lg transition-[background-color,color,transform] duration-150 active:scale-95 ${buttonClassName} ${
            b.label === "Close" ? "hover:!bg-[#e5484d] hover:!text-white" : ""
          }`}
        >
          <span className={`flex items-center justify-center ${iconClassName}`}>
            <WindowControlGlyph kind={b.kind} size={iconSize} />
          </span>
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
            buttonClassName={`${referenceDark ? "reference-window-control" : "hover:bg-overlay-strong"} text-icon-secondary hover:text-fg h-8 w-8`}
          />
        </span>
        <span className="bg-divider absolute inset-x-0 bottom-0 h-px" />
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <GlassEdge />
    </WindowShell>
  );
}
