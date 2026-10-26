"use client";

import Image from "next/image";
import { Activity, useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import type { AppId } from "@/lib/apps";
import { AboutWindow } from "./AboutWindow";
import { AiWorkflowWindow } from "./AiWorkflowWindow";
import { ContextMenu } from "./ContextMenu";
import { ControlCenter } from "./ControlCenter";
import { DateWeatherPanel } from "./DateWeatherPanel";
import { BootScreen } from "./BootScreen";
import { Dock } from "./Dock";
import { DesktopIcons, Intro } from "./Intro";
import { MailWindow } from "./MailWindow";
import { NotesWindow } from "./NotesWindow";
import { PhotosWindow } from "./PhotosWindow";
import { SearchPanel } from "./SearchPanel";
import { TerminalWindow } from "./TerminalWindow";
import { TopBar } from "./TopBar";
import { KEEP_ALIVE, pinFrame, prepareGlass, useWindowManager, WindowProvider } from "./window-manager";
import { motionActive } from "@/lib/motion";
import { WorksWindow } from "./WorksWindow";
import { LiveWallpaper } from "./LiveWallpaper";
import { HomeWidgets } from "./HomeWidgets";
import { useLayoutMode } from "@/lib/layout-mode";
import {
  appFromPathname,
  appPath,
  workFromPathname,
  workFromSlug,
  workPath,
  type InternalAppId,
  type WorkSlug,
} from "@/lib/app-route";

/** Long-press on the desktop (touch / pen) opens the context menu, as right-click does. */
const LONG_PRESS_MS = 500;
const LONG_PRESS_SLOP = 8;

export function Desktop({
  initialApp = null,
  initialWork = null,
}: {
  initialApp?: InternalAppId | null;
  initialWork?: WorkSlug | null;
}) {
  const iconGrid = useRef<HTMLDivElement>(null);
  const [brightness, setBrightness] = useState(100);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  // boot: loading screen on top, desktop held back · enter: desktop elements move into place · idle: normal
  const [phase, setPhase] = useState<"boot" | "enter" | "idle">("boot");
  const [bootVisible, setBootVisible] = useState(true);
  const wm = useWindowManager();
  const layout = useLayoutMode();
  const press = useRef<{ id: number; x: number; y: number; timer: number } | null>(null);
  /** The click that ends a long-press must not close the menu it just opened. */
  const swallowClick = useRef(false);
  const { open, close, closeAll, top } = wm;
  const [activeWork, setActiveWork] = useState<WorkSlug | null>(() =>
    initialWork ?? (typeof window === "undefined" ? null : workFromPathname(window.location.pathname)),
  );

  const setAppUrl = useCallback((app: InternalAppId | null, mode: "push" | "replace" = "push") => {
    if (app && appFromPathname(window.location.pathname) === app) return;
    const path = app === "projects" && activeWork ? workPath(activeWork) : app ? appPath(app) : "/";
    const state = { ...(window.history.state as object | null), xeroApp: app ?? undefined };
    if (mode === "replace") window.history.replaceState(state, "", path);
    else window.history.pushState(state, "", path);
  }, [activeWork]);

  const setWorkRoute = useCallback((next: string | null) => {
    const work = next ? workFromSlug(next) : null;
    setActiveWork(work);
    if (work) {
      const fromList = window.location.pathname === appPath("projects");
      const state = {
        ...(window.history.state as object | null),
        xeroApp: "projects",
        xeroWork: work,
        xeroFromProjects: fromList || Boolean((window.history.state as { xeroFromProjects?: boolean } | null)?.xeroFromProjects),
      };
      const method = workFromPathname(window.location.pathname) ? "replaceState" : "pushState";
      window.history[method](state, "", workPath(work));
      return;
    }
    const state = window.history.state as { xeroFromProjects?: boolean } | null;
    if (workFromPathname(window.location.pathname) && state?.xeroFromProjects) window.history.back();
    else window.history.replaceState({ ...(state as object | null), xeroApp: "projects", xeroWork: undefined }, "", appPath("projects"));
  }, []);

  const nextVisibleAfter = useCallback(
    (id: AppId) =>
      [...wm.windows]
        .reverse()
        .find((w) => w.id !== id && !w.minimized && !w.leaving && !w.exiting)?.id as InternalAppId | undefined,
    [wm.windows],
  );

  const closeApp = useCallback(
    (id: AppId) => {
      if (appFromPathname(window.location.pathname) === id) setAppUrl(nextVisibleAfter(id) ?? null, "replace");
      if (id === "projects") setActiveWork(null);
      close(id);
    },
    [close, nextVisibleAfter, setAppUrl],
  );

  const minimizeApp = useCallback(
    (id: AppId) => {
      if (appFromPathname(window.location.pathname) === id) setAppUrl(nextVisibleAfter(id) ?? null, "replace");
      wm.update(id, () => ({ minimized: true, leaving: false }));
    },
    [nextVisibleAfter, setAppUrl, wm],
  );

  const focusApp = useCallback(
    (id: AppId) => {
      wm.focus(id);
      if (id !== "linkedin") setAppUrl(id);
    },
    [setAppUrl, wm],
  );

  // A maximized window in front covers the desktop chrome, as on the Works and AI Workflow screens.
  const coversDesktop = Boolean(top?.maximized);
  // The dock steps aside while any app is on screen and slides back once the last one minimizes or closes.
  const dockHidden = wm.windows.some((w) => !w.minimized && !w.leaving && !w.exiting);

  const goHome = useCallback(() => {
    const busy = wm.windows.length > 0 || searchOpen || dateOpen || controlCenterOpen || menu;
    setSearchOpen(false);
    setDateOpen(false);
    setControlCenterOpen(false);
    setMenu(null);
    if (busy) {
      setActiveWork(null);
      setAppUrl(null, "replace");
      closeAll();
    }
    else {
      sessionStorage.setItem("xero-reset", "1");
      document.documentElement.classList.add("is-resetting");
      window.setTimeout(() => window.location.reload(), 320);
    }
  }, [wm.windows.length, searchOpen, dateOpen, controlCenterOpen, menu, closeAll, setAppUrl]);

  const openApp = useCallback(
    (app: AppId) => {
      setSearchOpen(false);
      setMenu(null);
      setDateOpen(false);
      if (app === "linkedin") return;
      setAppUrl(app);
      open(app);
    },
    [open, setAppUrl],
  );

  const openWorkFromSearch = useCallback(
    (id: string) => {
      openApp("projects");
      setWorkRoute(id);
    },
    [openApp, setWorkRoute],
  );

  // A route is the focused app. Direct links open it on arrival; browser Back/Forward
  // focuses the matching window, while `/` returns to the desktop.
  useEffect(() => {
    const routeApp = appFromPathname(window.location.pathname) ?? initialApp;
    const routeWork = workFromPathname(window.location.pathname) ?? initialWork;
    if (routeApp) {
      const path = routeWork ? workPath(routeWork) : appPath(routeApp);
      window.history.replaceState(
        { ...(window.history.state as object | null), xeroApp: routeApp, xeroWork: routeWork ?? undefined },
        "",
        path,
      );
      open(routeApp);
    } else if (window.location.pathname === "/") {
      window.history.replaceState({ ...(window.history.state as object | null), xeroApp: undefined }, "", "/");
    }

    const onPop = () => {
      const app = appFromPathname(window.location.pathname);
      const work = workFromPathname(window.location.pathname);
      setActiveWork(work);
      window.dispatchEvent(new CustomEvent("xero-work-route", { detail: { id: work } }));
      if (app) open(app);
      else {
        setActiveWork(null);
        closeAll();
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [closeAll, initialApp, initialWork, open]);

  // Decode both wallpapers up front so the first theme switch has nothing left to load or decode.
  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>("img.wallpaper").forEach((img) => {
      const run = () => void img.decode().catch(() => undefined);
      if (img.complete) run();
      else img.addEventListener("load", run, { once: true });
    });
  }, []);

  const menuAt = (target: HTMLElement, clientX: number, clientY: number) => {
    const rect = target.getBoundingClientRect();
    setMenu({
      x: ((clientX - rect.left) / rect.width) * target.clientWidth,
      y: ((clientY - rect.top) / rect.height) * target.clientHeight,
    });
    setDateOpen(false);
    setControlCenterOpen(false);
    setSearchOpen(false);
  };

  const cancelPress = () => {
    if (!press.current) return;
    window.clearTimeout(press.current.timer);
    press.current = null;
  };

  const datePanel = useRef<HTMLDivElement>(null);
  const controlPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dateOpen && !controlCenterOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-popup-toggle]")) return;
      if (datePanel.current?.contains(target)) return;
      if (controlPanel.current?.contains(target)) return;
      setDateOpen(false);
      setControlCenterOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [dateOpen, controlCenterOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        openApp("terminal");
        return;
      }
      if (e.key !== "Escape") return;
      if (searchOpen) setSearchOpen(false);
      else if (menu) setMenu(null);
      else if (dateOpen || controlCenterOpen) {
        setDateOpen(false);
        setControlCenterOpen(false);
      } else if (top) closeApp(top.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, menu, top, closeApp, openApp, dateOpen, controlCenterOpen]);

  // Stable elements: a Desktop re-render (any window state change) does not re-render
  // every window's tree, including the hidden pre-rendered ones.
  const apps = useMemo<Partial<Record<AppId, ReactNode>>>(
    () => ({
      about: <AboutWindow />,
      mail: <MailWindow />,
      terminal: <TerminalWindow />,
      notes: <NotesWindow />,
      photos: <PhotosWindow />,
      projects: <WorksWindow onOpenAi={() => openApp("ai-workflow")} initialDetail={activeWork ?? undefined} onDetailChange={setWorkRoute} />,
      "ai-workflow": <AiWorkflowWindow onNext={() => openApp("projects")} />,
    }),
    [activeWork, openApp, setWorkRoute],
  );

  // Pointer-down on anything that opens a light window stages its pre-rendered copy
  // (see window-manager KEEP_ALIVE): effects, style and layout run during the press.
  const { stage, unstage } = wm;
  useEffect(() => {
    let timer = 0;
    const appOf = (e: Event) =>
      (e.target as Element | null)?.closest?.<HTMLElement>("[data-dock-app],[data-open-app]")?.dataset;
    const onDown = (e: PointerEvent) => {
      const data = appOf(e);
      const app = (data?.openApp || data?.dockApp) as AppId | undefined;
      if (!app) return;
      window.clearTimeout(timer);
      stage(app);
      // A press that does not end in an open (a drag, a cancelled tap) drops the stage again.
      const drop = () => {
        timer = window.setTimeout(() => unstage(app), 900);
      };
      window.addEventListener("pointerup", drop, { once: true });
      window.addEventListener("pointercancel", drop, { once: true });
    };
    window.addEventListener("pointerdown", onDown, true);
    return () => {
      window.removeEventListener("pointerdown", onDown, true);
      window.clearTimeout(timer);
    };
  }, [stage, unstage]);

  // Once the desktop is idle, pre-render the light windows one per idle slot (never during a transition).
  const { prewarm } = wm;
  useEffect(() => {
    if (phase !== "idle") return;
    const queue: (AppId | "glass")[] = ["glass", ...KEEP_ALIVE];
    let id = 0;
    const idle = (fn: () => void) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(fn, { timeout: 4000 }) : (setTimeout(fn, 800) as unknown as number);
    const next = () => {
      if (motionActive()) {
        id = idle(next);
        return;
      }
      const app = queue.shift();
      if (!app) return;
      if (app === "glass") prepareGlass();
      else prewarm(app);
      id = idle(next);
    };
    id = idle(next);
    return () => ("cancelIdleCallback" in window ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, [phase, prewarm]);

  return (
    <main data-desktop-stage data-phase={phase} data-covered={dockHidden || undefined} onScroll={pinFrame} className="desktop-stage bg-desktop relative overflow-hidden select-none">
      <div
        className="absolute inset-0"
        onClick={() => {
          if (swallowClick.current) {
            swallowClick.current = false;
            return;
          }
          setDateOpen(false);
          setControlCenterOpen(false);
          setSearchOpen(false);
          setMenu(null);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          // A touch long-press already opened the menu (Android also fires contextmenu for it).
          if (swallowClick.current) return;
          menuAt(e.currentTarget, e.clientX, e.clientY);
        }}
        onPointerDown={(e) => {
          swallowClick.current = false;
          if (e.pointerType === "mouse" || !e.isPrimary) return;
          cancelPress();
          const target = e.currentTarget;
          const { clientX, clientY } = e;
          press.current = {
            id: e.pointerId,
            x: clientX,
            y: clientY,
            timer: window.setTimeout(() => {
              press.current = null;
              swallowClick.current = true;
              menuAt(target, clientX, clientY);
            }, LONG_PRESS_MS),
          };
        }}
        onPointerMove={(e) => {
          const p = press.current;
          if (p && p.id === e.pointerId && Math.hypot(e.clientX - p.x, e.clientY - p.y) > LONG_PRESS_SLOP) cancelPress();
        }}
        onPointerUp={cancelPress}
        onPointerCancel={cancelPress}
      >
        <Image
          src="/wallpaper/dark.webp"
          alt=""
          fill
          sizes="100vw"
          preload
          className="wallpaper wallpaper-dark pointer-events-none object-cover"
        />
        <Image
          src="/wallpaper/light.webp"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          className="wallpaper wallpaper-light pointer-events-none object-cover"
        />
        <LiveWallpaper name="dark" theme="dark" className="wallpaper wallpaper-dark" />
        <LiveWallpaper name="light" theme="light" className="wallpaper wallpaper-light" />
        <div className="tablet-home tablet-intro-wrap absolute top-[max(88px,calc(50%-309px))] left-[clamp(32px,9.6%,184px)] tablet:top-[max(86px,calc(50%-297px))] tablet:left-12">
          <Intro onOpenApp={openApp} gridRef={iconGrid} />
        </div>
      </div>
      <DesktopIcons gridRef={iconGrid} onOpenApp={openApp} />
      {layout === "tablet" ? <HomeWidgets /> : null}
      {brightness < 100 ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[58]"
          style={{ background: `rgba(0, 0, 0, ${((100 - brightness) / 100) * 0.78})` }}
        />
      ) : null}

      {wm.slots.map(({ state: w, index, key, hidden }) => (
        <Activity key={key} mode={hidden ? "hidden" : "visible"}>
        <WindowProvider
          value={{
            state: w,
            focused: top?.id === w.id,
            z: 20 + index,
            close: () => closeApp(w.id),
            minimize: () => minimizeApp(w.id),
            setLeaving: (leaving) => wm.update(w.id, () => ({ leaving })),
            toggleMaximize: () => wm.update(w.id, (s) => ({ maximized: !s.maximized })),
            focus: () => focusApp(w.id),
            setGeometry: (geo) => wm.update(w.id, () => ({ geo })),
          }}
        >
          {apps[w.id] ?? null}
        </WindowProvider>
        </Activity>
      ))}

      <SearchPanel
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenApp={openApp}
        onOpenWork={openWorkFromSearch}
      />

      <TopBar
        searchOpen={searchOpen}
        dateOpen={dateOpen}
        controlCenterOpen={controlCenterOpen}
        onToggleSearch={() => {
          setSearchOpen((open) => !open);
          setDateOpen(false);
          setControlCenterOpen(false);
          setMenu(null);
        }}
        onToggleDate={() => {
          setDateOpen((open) => !open);
          setControlCenterOpen(false);
          setSearchOpen(false);
        }}
        onToggleControlCenter={() => {
          setControlCenterOpen((open) => !open);
          setDateOpen(false);
          setSearchOpen(false);
        }}
        onOpenApp={openApp}
        onLogo={goHome}
      />

      <Panel
        open={dateOpen && !coversDesktop && layout === "desktop"}
        panelRef={datePanel}
        variant="date"
        className="absolute top-[62px] left-[calc(50%+0.5px)] z-[60] -translate-x-1/2 tablet:top-[58px]"
      >
        <DateWeatherPanel />
      </Panel>

      <Panel
        open={controlCenterOpen}
        panelRef={controlPanel}
        variant="cc"
        className="absolute top-[82px] right-3 z-[80] tablet:top-[78px]"
      >
        <ControlCenter brightness={brightness} onBrightness={setBrightness} />
      </Panel>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          onOpenApp={openApp}
          onRearrange={() => {
            setMenu(null);
            window.dispatchEvent(new Event("xero-rearrange"));
          }}
        />
      )}

      {bootVisible ? (
        <BootScreen
          onExit={() => {
            setPhase("enter");
            window.setTimeout(() => setPhase("idle"), 2600);
          }}
          onGone={() => setBootVisible(false)}
        />
      ) : null}

      <Dock hidden={dockHidden} running={wm.windows.map((w) => w.id)} focused={top?.id ?? null} onOpenApp={openApp} />
    </main>
  );
}

/** Keeps a panel mounted through its exit so open and close both animate. */
function Panel({
  open,
  className,
  children,
  panelRef,
  variant,
}: {
  open: boolean;
  className: string;
  children: ReactNode;
  panelRef?: RefObject<HTMLDivElement | null>;
  /** date: unfolds down out of the clock pill · cc: swings out of the tray button. */
  variant: "date" | "cc";
}) {
  const [phase, setPhase] = useState(open ? "in" : "off");
  const [seen, setSeen] = useState(open);

  if (open !== seen) {
    setSeen(open);
    setPhase(open ? "in" : "out");
  }

  useEffect(() => {
    if (phase !== "in" && phase !== "out") return;
    const timer = window.setTimeout(() => setPhase(phase === "in" ? "idle" : "off"), phase === "in" ? 760 : 220);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "off") return null;
  const motion = phase === "in" ? `pop-${variant}-in` : phase === "out" ? `pop-${variant}-out` : "";
  return (
    <div ref={panelRef} className={`${className} ${motion}`}>
      {children}
    </div>
  );
}
