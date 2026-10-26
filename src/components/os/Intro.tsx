"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from "react";
import { desktopGrid, type AppDefinition, type AppId } from "@/lib/apps";
import { useT } from "@/lib/i18n";
import { DockLottie } from "./DockLottie";
import { Icon, InsetGlyph } from "./primitives";

type IconPos = { x: number; y: number };

function deskScale() {
  const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--desk-scale"));
  return Number.isFinite(value) && value > 0 ? value : 1;
}

/** The icon layer: the stage, or a zoomed copy of it on tablet (icons there are 0.8× like the Intro). */
function iconLayer() {
  return (document.querySelector("[data-icon-layer]") ?? document.querySelector("[data-desktop-stage]")) as HTMLElement | null;
}

function measureDefaults(grid: HTMLElement | null) {
  const stage = iconLayer();
  if (!stage || !grid) return null;
  const stageBox = stage.getBoundingClientRect();
  const zoom = stageBox.width / stage.clientWidth || deskScale();
  const next: Record<string, IconPos> = {};
  grid.querySelectorAll<HTMLElement>("[data-desk-icon]").forEach((el) => {
    const box = el.getBoundingClientRect();
    const id = el.dataset.deskIcon;
    if (!id) return;
    next[id] = { x: (box.left - stageBox.left) / zoom, y: (box.top - stageBox.top) / zoom };
  });
  return Object.keys(next).length ? next : null;
}

export function DesktopIcons({
  gridRef,
  onOpenApp,
}: {
  gridRef: RefObject<HTMLDivElement | null>;
  onOpenApp: (id: AppId) => void;
}) {
  const [positions, setPositions] = useState<Record<string, IconPos> | null>(null);
  const [glide, setGlide] = useState(false);
  /** Icons the visitor dragged keep their spot; the rest follow the Intro grid when the stage resizes. */
  const moved = useRef(new Set<string>());

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>("[data-desktop-stage]");
    if (!stage) return;
    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = measureDefaults(gridRef.current);
        if (!next) return;
        setPositions((current) => {
          if (!current) return next;
          const merged = { ...current };
          for (const id of Object.keys(next)) if (!moved.current.has(id)) merged[id] = next[id];
          return merged;
        });
      });
    });
    observer.observe(stage);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [gridRef]);

  useLayoutEffect(() => {
    if (positions) return;
    setPositions(measureDefaults(gridRef.current));
  }, [gridRef, positions]);

  useEffect(() => {
    let timer = 0;
    const onRearrange = () => {
      setGlide(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const next = measureDefaults(gridRef.current);
          if (next) {
            moved.current.clear();
            setPositions(next);
          }
          window.clearTimeout(timer);
          timer = window.setTimeout(() => setGlide(false), 820);
        });
      });
    };
    window.addEventListener("xero-rearrange", onRearrange);
    return () => {
      window.removeEventListener("xero-rearrange", onRearrange);
      window.clearTimeout(timer);
    };
  }, [gridRef]);

  const move = (id: string, x: number, y: number) => {
    const stage = iconLayer();
    const w = stage?.clientWidth ?? 1920;
    const h = stage?.clientHeight ?? 1080;
    moved.current.add(id);
    setPositions((current) =>
      current
        ? { ...current, [id]: { x: Math.min(Math.max(0, x), w - 100), y: Math.min(Math.max(0, y), h - 128) } }
        : current,
    );
  };

  return (
    <div data-icon-layer className="tablet-home pointer-events-none absolute inset-0 z-[12] tablet:[zoom:0.8]">
      {desktopGrid.map((app, index) =>
        positions?.[app.id] ? (
          <DraggableIcon
            key={app.id}
            app={app}
            pos={positions[app.id]}
            index={index}
            glide={glide}
            onMove={move}
            onOpen={onOpenApp}
          />
        ) : null,
      )}
    </div>
  );
}

function stagePoint(clientX: number, clientY: number) {
  const stage = iconLayer();
  if (!stage) return null;
  const box = stage.getBoundingClientRect();
  const zoom = box.width / stage.clientWidth || deskScale();
  return { x: (clientX - box.left) / zoom, y: (clientY - box.top) / zoom };
}

function DraggableIcon({
  app,
  pos,
  index,
  glide,
  onMove,
  onOpen,
}: {
  app: AppDefinition;
  pos: IconPos;
  index: number;
  glide: boolean;
  onMove: (id: string, x: number, y: number) => void;
  onOpen: (id: AppId) => void;
}) {
  const t = useT();
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverProps = {
    onPointerEnter: (e: ReactPointerEvent<HTMLElement>) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    const local = stagePoint(e.clientX, e.clientY);
    if (!local) return;
    const origin = {
      px: e.clientX,
      py: e.clientY,
      ox: local.x - pos.x,
      oy: local.y - pos.y,
      moved: false,
    };
    setDragging(true);
    const move = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - origin.px, ev.clientY - origin.py) > 3) origin.moved = true;
      const point = stagePoint(ev.clientX, ev.clientY);
      if (!point) return;
      onMove(app.id, point.x - origin.ox, point.y - origin.oy);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      setDragging(false);
      if (origin.moved) return;
      if (app.href) window.open(app.href, "_blank", "noopener,noreferrer");
      else onOpen(app.id);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const body = (
    <>
      <span className="relative block size-[100px] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.5,1)] group-hover:-translate-y-1 group-active:scale-95">
        <DockLottie app={app.id} hovered={hovered}>
          <InsetGlyph src={app.desktopIcon} inset={app.inset} />
        </DockLottie>
      </span>
      <span className="desktop-label text-fg w-[100px] text-center text-sm leading-[22px] font-semibold [text-shadow:0_1px_6px_rgba(3,10,31,0.45)]">
        {t(app.desktopLabel)}
      </span>
    </>
  );
  const cls = `boot-icon group pointer-events-auto absolute flex w-[100px] touch-none flex-col items-center gap-1 rounded-2xl outline-none ${
    dragging ? "z-30 cursor-[var(--c-move)]" : "cursor-[var(--c-pointer)]"
  }`;
  const style = {
    ["--bi" as string]: index,
    left: pos.x,
    top: pos.y,
    transition: !glide || dragging
      ? "none"
      : `left 560ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 36}ms, top 560ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 36}ms`,
  };

  if (app.href) {
    return (
      <a
        href={app.href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        style={style}
        draggable={false}
        onPointerDown={onPointerDown}
        onClick={(e) => e.preventDefault()}
        {...hoverProps}
      >
        {body}
      </a>
    );
  }
  return (
    <button type="button" data-open-app={app.id} className={cls} style={style} onPointerDown={onPointerDown} {...hoverProps}>
      {body}
    </button>
  );
}

export function Intro({
  onOpenApp,
  gridRef,
}: {
  onOpenApp: (id: AppId) => void;
  gridRef: RefObject<HTMLDivElement | null>;
}) {
  const t = useT();
  return (
    <section
      aria-labelledby="intro-name"
      className="desktop-intro relative flex w-[776px] max-w-full items-start gap-6 tablet:[zoom:0.8]"
    >
      <Image
        src="/figma/avatar-2026.png"
        alt={t("Portrait of Tuan Ngoc")}
        width={100}
        height={100}
        className="boot-item size-[100px] shrink-0 overflow-clip rounded-full" style={{ ["--bi" as string]: 0 }}
        preload
      />

      <div className="flex w-[623px] min-w-0 flex-col items-start gap-12 tablet:w-[585px]">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col items-start gap-0.5">
                <div className="boot-item flex items-center gap-2.5" style={{ ["--bi" as string]: 1 }}>
                  <Image src="/figma/wave-hand.png" alt="" width={24} height={24} className="wave-hand size-6 object-cover" />
                  <span className="text-fg text-xl leading-7 font-medium whitespace-nowrap">{t("Hello, I’m")}</span>
                </div>
                <h1
                  id="intro-name"
                  className="boot-item text-fg text-[56px] leading-[64px] font-bold tracking-[-1px] whitespace-nowrap"
                  style={{ ["--bi" as string]: 2 }}
                >
                  Tuan Ngoc
                </h1>
              </div>
              <p className="boot-item text-fg-tertiary text-xl leading-7 font-semibold tracking-[-0.4px]" style={{ ["--bi" as string]: 3 }}>
                {t("UI/UX & Product Designer")}
              </p>
            </div>
            <p className="desktop-intro-description boot-item text-fg-secondary w-[544px] max-w-full text-base leading-6" style={{ ["--bi" as string]: 4 }}>
              {t("I like to create differences. I think of myself as a quirky person — in a positive way — who does things other people don’t, in creative and unconventional ways. A Graphic Design graduate of Greenwich University, Vietnam, now designing products people enjoy using.")}
            </p>
          </div>

          <button
            type="button"
            data-open-app="about"
            onClick={(e) => {
              e.stopPropagation();
              onOpenApp("about");
            }}
            style={{ ["--bi" as string]: 5 }}
            className="boot-item group flex h-[41.8px] items-center gap-[6.6px] rounded-xl py-[9.9px] pr-[2.2px] pl-[4.4px] transition-[background-color,padding] duration-200 outline-none hover:bg-overlay hover:pr-2.5 hover:pl-2.5 focus-visible:ring-2 focus-visible:ring-[var(--azure-300)]"
          >
            <span className="text-accent text-[17.6px] leading-[26.4px] font-semibold whitespace-nowrap">
              {t("More about me")}
            </span>
            <Icon
              src="/figma/chevron-right.svg"
              size={26.4}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        <div ref={gridRef} aria-hidden className="grid grid-cols-[repeat(4,100px)] gap-x-12 gap-y-10">
          {desktopGrid.map((app) => (
            <div key={app.id} data-desk-icon={app.id} className="h-[126px] w-[100px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
