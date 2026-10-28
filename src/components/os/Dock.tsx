"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { dockApps, type AppId } from "@/lib/apps";
import { useT } from "@/lib/i18n";
import { DockLottie, warmDockLottie } from "./DockLottie";
import { GlassEdge, Icon, InsetGlyph } from "./primitives";

type DockState = "idle" | "running" | "focused";

const SPRING = "cubic-bezier(0.34, 1.35, 0.5, 1)";

function DockItem({
  name,
  app,
  state,
  href,
  scale,
  onClick,
  children,
}: {
  name: string;
  app: AppId;
  state: DockState;
  href?: string;
  scale: number;
  onClick?: () => void;
  children: ReactNode;
}) {
  const lifted = (scale - 1) * 10;
  const t = useT();
  name = t(name);
  const [hovered, setHovered] = useState(false);
  const body = (
    <>
      <span
        className="relative block size-14 origin-bottom"
        style={{
          transform: `translateY(${-lifted}px) scale(${scale})`,
          transition: `transform 320ms ${SPRING}`,
        }}
      >
        <span className="absolute inset-0 block">
          <DockLottie app={app} hovered={hovered}>
            {children}
          </DockLottie>
        </span>
      </span>
      <span
        className={`bg-inverse h-1 rounded-[2px] transition-[width,opacity] duration-200 ${
          state === "focused" ? "w-3.5" : state === "running" ? "w-[5px]" : "w-[5px] opacity-0"
        }`}
      />
      <span
        role="tooltip"
        className="shadow-soft pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 flex -translate-x-1/2 overflow-clip rounded-lg px-2.5 py-[5px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <span aria-hidden className="glass glass-tooltip absolute inset-0 rounded-lg" />
        <span className="text-fg relative text-base leading-6 font-semibold whitespace-nowrap">{name}</span>
        <GlassEdge />
      </span>
    </>
  );

  const cls = "group relative z-10 flex shrink-0 flex-col items-center gap-1 outline-none";
  const style = { zIndex: Math.round(scale * 10) };
  const hoverProps = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={name} data-dock-app={app} className={cls} style={style} {...hoverProps}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" aria-label={name} data-dock-app={app} onClick={onClick} className={cls} style={style} {...hoverProps}>
      {body}
    </button>
  );
}

type DockProps = {
  hidden?: boolean;
  running: AppId[];
  focused: AppId | null;
  onOpenApp: (app: AppId) => void;
};

const APPS: { id: AppId; name: string; href?: string }[] = [
  { id: "about", name: "About Me" },
  ...dockApps.map((app) => ({ id: app.id, name: app.dockName, href: app.href })),
];

export function Dock({ hidden = false, running, focused, onOpenApp }: DockProps) {
  const nav = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const [scales, setScales] = useState<Record<string, number>>({});
  const t = useT();
  useEffect(() => {
    warmDockLottie();
  }, []);
  const stateOf = (id: AppId): DockState =>
    focused === id ? "focused" : running.includes(id) ? "running" : "idle";

  const magnify = (clientX: number | null) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const root = nav.current;
      if (!root || clientX == null) {
        setScales({});
        return;
      }
      const next: Record<string, number> = {};
      root.querySelectorAll<HTMLElement>("[data-dock-app]").forEach((item) => {
        const box = item.getBoundingClientRect();
        const dist = Math.abs(clientX - (box.left + box.width / 2));
        const reach = Math.max(0, 1 - dist / 120);
        next[item.dataset.dockApp ?? ""] = 1 + reach * reach * 0.28;
      });
      setScales(next);
    });
  };

  return (
    <div
      data-dock-slide
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className="pointer-events-none absolute inset-x-0 bottom-[18px] z-[80] flex justify-center tablet:bottom-[14px]"
      style={{
        transform: hidden ? "translateY(150px)" : "none",
        opacity: hidden ? 0 : 1,
        transition: hidden
          ? "transform 420ms cubic-bezier(0.4, 0, 1, 1), opacity 320ms ease 100ms"
          : "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
      }}
    >
    {/* Tablet (Figma 359:91348): the dock instance at 1.08× — gaps 24 / 16, pt 10, centred items, 14px from the bottom. */}
    <nav
      ref={nav}
      aria-label={t("Dock")}
      onMouseMove={(e) => magnify(e.clientX)}
      onMouseLeave={() => magnify(null)}
      className="reference-dock boot-dock pointer-events-auto relative flex items-end gap-5 rounded-[22px] px-3.5 pt-3 pb-1.5 shadow-[0_24px_60px_var(--effect-shadow)] tablet:items-center tablet:gap-6 tablet:pt-2.5 tablet:[zoom:1.08]"
    >
      <span aria-hidden className="reference-dock-surface pointer-events-none absolute inset-0 rounded-[22px]" />

      <DockItem name="About Me" app="about" state={stateOf("about")} scale={scales.about ?? 1} onClick={() => onOpenApp("about")}>
        <span className="absolute inset-0 overflow-clip rounded-[18px] bg-[#202124] shadow-[0_6px_14px_var(--effect-shadow),inset_0_0_0_1px_rgba(255,255,255,0.24)]">
          <span className="absolute top-[11px] left-[11px]">
            <Icon src="/figma/dock-xero-glyph.svg" size={34} />
          </span>
        </span>
      </DockItem>

      <span className="relative z-10 mb-3 block h-[43px] w-px bg-[var(--dock-divider)] tablet:mb-0" />

      <div className="boot-dock-items flex items-end gap-3 tablet:gap-4">
        {APPS.filter((app) => app.id !== "about").map((app) => {
          const def = dockApps.find((item) => item.id === app.id);
          if (!def) return null;
          return (
            <DockItem
              key={app.id}
              name={app.name}
              app={app.id}
              state={stateOf(app.id)}
              href={app.href}
              scale={scales[app.id] ?? 1}
              onClick={() => onOpenApp(app.id)}
            >
              <InsetGlyph src={def.dockIcon} inset={def.inset} />
            </DockItem>
          );
        })}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)]"
      />
    </nav>
    </div>
  );
}
