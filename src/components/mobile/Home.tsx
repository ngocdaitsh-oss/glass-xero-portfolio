/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import { apps, LINKEDIN_URL, type AppId } from "@/lib/apps";
import { applyLang, currentLang, useLang, useT } from "@/lib/i18n";
import { applyTheme, currentTheme, subscribeTheme } from "@/lib/theme";
import { togglePlay, TRACKS, usePlayer } from "@/lib/player";
import { DESIGN_TIME, useNow, zonedParts } from "@/lib/use-now";
import { DockLottie } from "@/components/os/DockLottie";
import { InsetGlyph } from "@/components/os/primitives";
import { GlassButton, Glyph, M, StatusBar } from "./parts";

/** Home screen apps in the Figma App Grid order (367:21895). */
export const GRID: { id: AppId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "mail", label: "Mail" },
  { id: "ai-workflow", label: "AI Workflow" },
  { id: "notes", label: "Notes" },
  { id: "terminal", label: "Terminal" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "photos", label: "Photos" },
  { id: "about", label: "About me" },
];

/**
 * Hidden from the home grid for now (round 2). The pages still exist; remove an id here to bring its icon back.
 * The Profile widget still opens About.
 */
export const HIDDEN_ON_HOME = new Set<AppId>(["photos", "notes", "about"]);

const center = (el: HTMLElement) => {
  const box = el.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
};

export const LONG_PRESS_MS = 500;
const SLOP = 8;

export type Press = { app?: AppId; rect?: DOMRect; key?: string; x: number; y: number };

/**
 * Long-press (500ms, cancelled by > 8px movement) for icons and the home
 * background. The click that ends a long-press is swallowed.
 */
export function useLongPress(onLong: (press: Press) => void) {
  const timer = useRef<{ id: number; x: number; y: number; t: number } | null>(null);
  const fired = useRef(false);
  const [pressing, setPressing] = useState<string | null>(null);

  const cancel = () => {
    if (timer.current) window.clearTimeout(timer.current.t);
    timer.current = null;
    setPressing(null);
  };

  const bind = (target: { app?: AppId; key?: string }) => ({
    onPointerDown: (e: ReactPointerEvent<HTMLElement>) => {
      if (e.button > 0 || !e.isPrimary) return;
      e.stopPropagation();
      fired.current = false;
      cancel();
      const el = e.currentTarget;
      const { clientX: x, clientY: y } = e;
      setPressing(target.key ?? "bg");
      timer.current = {
        id: e.pointerId,
        x,
        y,
        t: window.setTimeout(() => {
          timer.current = null;
          fired.current = true;
          setPressing(null);
          const icon = target.app ? el.querySelector<HTMLElement>("[data-m-glyph]") ?? el : null;
          onLong({ app: target.app, key: target.key, rect: icon?.getBoundingClientRect(), x, y });
        }, LONG_PRESS_MS),
      };
    },
    onPointerMove: (e: ReactPointerEvent<HTMLElement>) => {
      const p = timer.current;
      if (p && p.id === e.pointerId && Math.hypot(e.clientX - p.x, e.clientY - p.y) > SLOP) cancel();
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onPointerLeave: cancel,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  /** True once for the click that ends a long-press. */
  const swallow = () => {
    if (!fired.current) return false;
    fired.current = false;
    return true;
  };

  return { bind, swallow, pressing };
}

/** App icon art: the OS gradient glyph at its Figma inset, or the round Xero icon for About me. */
export function AppGlyph({ id, pressed = false }: { id: AppId; pressed?: boolean }) {
  if (id === "about") {
    return (
      <span data-m-glyph className="relative block size-14 shrink-0 overflow-clip rounded-full bg-gradient-to-b from-[#8cc4ff] to-[#1a5bb0] shadow-[0_6.857px_16px_0_var(--effect-shadow)]">
        <span className="absolute top-0 left-0 h-8 w-16 bg-gradient-to-b from-[rgba(255,255,255,0.32)] to-transparent" />
        <span className="absolute top-[14.86px] left-[14.86px] size-[34.286px] overflow-clip">
          <img src={`${M}/logo.svg`} alt="" className="absolute top-[calc(50%+0.57px)] left-[calc(50%-0.57px)] block size-[42.286px] max-w-none -translate-x-1/2 -translate-y-1/2" />
        </span>
      </span>
    );
  }
  const def = apps[id as Exclude<AppId, "about">];
  return (
    <span data-m-glyph className="relative block size-14 shrink-0">
      <DockLottie app={id} hovered={pressed}>
        <InsetGlyph src={def.dockIcon} inset={def.inset} />
      </DockLottie>
    </span>
  );
}

type IconProps = {
  id: AppId;
  label?: string;
  where: "grid" | "dock" | "search";
  onOpen: (id: AppId, el: HTMLElement) => void;
  longPress: ReturnType<typeof useLongPress>;
  index?: number;
};

/** iOS/App Icon (366:21902): 80 wide, 56px art, 6px gap, 14px label. */
export function AppIcon({ id, label, where, onOpen, longPress, index = 0 }: IconProps) {
  const t = useT();
  const key = `${where}:${id}`;
  const name = t(label ?? GRID.find((app) => app.id === id)?.label ?? id);
  const pressed = longPress.pressing === key;
  const body = (
    <>
      <span className={`m-press block ${pressed ? "scale-[0.94]" : ""}`}>
        <AppGlyph id={id} pressed={pressed} />
      </span>
      {label !== undefined ? <span className="text-fg text-center text-sm leading-[normal] whitespace-nowrap">{name}</span> : null}
    </>
  );
  const cls = `boot-icon flex w-20 shrink-0 flex-col items-center gap-1.5 outline-none ${label === undefined ? "py-0" : ""}`;
  const handlers = longPress.bind({ app: id, key });
  if (id === "linkedin") {
    return (
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={name}
        data-m-icon={key}
        className={cls}
        style={{ ["--bi" as string]: index }}
        {...handlers}
        onClick={(e) => {
          if (longPress.swallow()) e.preventDefault();
        }}
      >
        {body}
      </a>
    );
  }
  return (
    <button
      type="button"
      aria-label={name}
      data-m-icon={key}
      className={cls}
      style={{ ["--bi" as string]: index }}
      {...handlers}
      onClick={(e) => {
        if (longPress.swallow()) return;
        onOpen(id, e.currentTarget);
      }}
    >
      {body}
    </button>
  );
}

const WIDGET = "m-panel m-blur m-edge m-shadow relative rounded-3xl";

/** Widget — Profile (367:21874). Opens About me. */
function ProfileWidget({ onOpen }: { onOpen: (el: HTMLElement) => void }) {
  const t = useT();
  return (
    <button
      type="button"
      data-m-icon="widget:about"
      onClick={(e) => onOpen(e.currentTarget)}
      className={`${WIDGET} boot-item m-press flex w-full items-center gap-3.5 p-[18px] text-left`}
      style={{ ["--bi" as string]: 0 }}
    >
      <img src={`${M}/avatar-72-2026.png`} alt="" width={100} height={100} className="size-[100px] shrink-0 rounded-full" />
      <span className="flex min-w-0 flex-col items-start gap-0.5">
        <span className="flex h-[19.2px] items-center gap-2">
          <img src={`${M}/wave.png`} alt="" className="wave-hand size-[19.2px] object-cover" />
          <span className="text-fg text-base leading-[22.4px] font-medium whitespace-nowrap">{t("Hello, I’m")}</span>
        </span>
        <span className="text-fg text-[28px] leading-[normal] font-bold whitespace-nowrap">Tuan Ngoc</span>
        <span className="text-sm leading-[normal] font-semibold whitespace-nowrap text-[var(--m-role)] [[data-theme=light]_&]:underline [[data-theme=light]_&]:decoration-from-font">
          {t("UI/UX & Product Designer")}
        </span>
      </span>
    </button>
  );
}

const VI_DAYS = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];

/** Widget — Clock (367:21881): weekday, live time, weather, city. */
function ClockWidget() {
  const now = useNow();
  const lang = useLang();
  const t = useT();
  const p = now ? zonedParts(now) : DESIGN_TIME;
  const day = lang === "vi" ? VI_DAYS[new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay()] : p.weekday.toUpperCase();
  return (
    <div className={`${WIDGET} m-sheen boot-item flex aspect-square flex-col items-start gap-0.5 p-4`} style={{ ["--bi" as string]: 1 }}>
      <p className="text-accent text-sm leading-[normal] font-semibold whitespace-nowrap">{day}</p>
      <p className="text-fg text-[40px] leading-[normal] font-light whitespace-nowrap tabular-nums">
        {p.hour12}:{p.minute}
      </p>
      <span className="min-h-px flex-1" />
      <p className="text-fg flex items-center gap-1.5 text-base leading-[normal] font-semibold whitespace-pre">
        <Glyph src={`${M}/sun.svg`} size={20} />
        {t("26°  Sunny")}
      </p>
      <p className="text-fg-secondary text-sm leading-[normal] whitespace-nowrap">Hà Nội</p>
    </div>
  );
}

/** Widget — Now Playing (367:21890): the real player; tap plays / pauses. */
function NowPlayingWidget() {
  const { current, playing } = usePlayer();
  const track = TRACKS[current];
  const t = useT();
  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-pressed={playing}
      aria-label={t(playing ? "Pause {title}" : "Play {title}", { title: track.title })}
      className={`${WIDGET} m-sheen boot-item m-press flex aspect-square min-w-0 flex-col items-start gap-2 p-4 text-left`}
      style={{ ["--bi" as string]: 2 }}
    >
      <span className="relative size-16 shrink-0 overflow-clip rounded-xl bg-gradient-to-b from-[#ff8c99] via-[#594de5] via-55% to-[#0d1a59]">
        <Image key={track.cover} src={track.cover} alt="" width={64} height={64} className="cc-meta size-full rounded-xl object-cover" />
      </span>
      <span className="min-h-px flex-1" />
      <span key={track.title} className="cc-meta flex w-full min-w-0 flex-col gap-2">
        <span className="text-fg truncate text-base leading-[normal] font-semibold">{track.title}</span>
        <span className="text-fg-secondary truncate text-sm leading-[normal]">{track.artist}</span>
      </span>
    </button>
  );
}

/** Mobile — Home (367:21857). */
export function Home({
  onOpen,
  onLongPress,
  onSearch,
}: {
  onOpen: (id: AppId, el: HTMLElement) => void;
  onLongPress: (press: Press) => void;
  onSearch: (el: HTMLElement) => void;
}) {
  const t = useT();
  const longPress = useLongPress(onLongPress);
  const bg = longPress.bind({});
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "dark" as const);
  return (
    <div
      className="m-screen flex flex-col"
      {...bg}
      onClick={(e) => {
        if (longPress.swallow()) e.stopPropagation();
      }}
    >
      <div className="boot-top">
        <StatusBar />
      </div>
      <div className="m-col flex flex-1 flex-col">
        <div className="flex flex-col gap-4 px-4 pt-4">
          <ProfileWidget onOpen={(el) => onOpen("about", el)} />
          <div className="grid grid-cols-2 gap-4">
            <ClockWidget />
            <NowPlayingWidget />
          </div>
        </div>
        <nav aria-label={t("Apps")} className="mt-5 flex flex-wrap justify-between gap-x-[12.667px] gap-y-[18px] px-4">
          {GRID.filter((app) => !HIDDEN_ON_HOME.has(app.id)).map((app, index) => (
            <AppIcon key={app.id} id={app.id} label={app.label} where="grid" index={index} onOpen={onOpen} longPress={longPress} />
          ))}
        </nav>
        <span className="min-h-6 flex-1" />
        {/* Actions (674:30593): Search pill, language, appearance — 38px above the bottom edge. */}
        <div className="boot-item flex items-center justify-center gap-2.5 pb-[38px]" style={{ ["--bi" as string]: 4 }}>
          <button
            type="button"
            onClick={(e) => onSearch(e.currentTarget)}
            className="m-bar m-blur m-edge m-shadow m-press text-fg flex h-11 w-[121px] items-center gap-1.5 rounded-full py-2 pr-4 pl-3.5"
          >
            <Glyph src={`${M}/search-16.svg`} size={16} />
            <span className="text-base leading-[normal] font-semibold whitespace-nowrap">{t("Search")}</span>
          </button>
          <GlassButton icon={`${M}/globe-20.svg`} label={t("Change language")} onClick={(el) => applyLang(currentLang() === "en" ? "vi" : "en", center(el))} />
          <GlassButton
            icon={theme === "dark" ? `${M}/moon-20.svg` : `${M}/sun.svg`}
            label={t(theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}
            onClick={(el) => applyTheme(theme === "dark" ? "light" : "dark", center(el))}
          />
        </div>
        <div className="m-safe-bottom" />
      </div>
    </div>
  );
}
