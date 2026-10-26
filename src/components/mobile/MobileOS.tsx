"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { LINKEDIN_URL, type AppId } from "@/lib/apps";
import { mobileZoom } from "@/lib/layout-mode";
import {
  appFromPathname,
  appPath,
  workFromPathname,
  workFromSlug,
  workPath,
  type InternalAppId,
  type WorkSlug,
} from "@/lib/app-route";
import { BootScreen } from "@/components/os/BootScreen";
import { DETAIL_READY } from "@/components/os/work-detail/WorkDetail";
import { warmDockLottie } from "@/components/os/DockLottie";
import { AboutPage } from "./AboutPage";
import { AiwPage } from "./AiwPage";
import { NotOptimizedPage } from "./NotOptimizedPage";
import { Home, type Press } from "./Home";
import { LongPressMenu } from "./LongPressMenu";
import { MailPage } from "./MailPage";
import { NotesPage } from "./NotesPage";
import { PhotosPage } from "./PhotosPage";
import { SearchScreen } from "./SearchScreen";
import { TerminalPage } from "./TerminalPage";
import { WorksPage } from "./WorksPage";

type PageApp = Exclude<AppId, "linkedin">;
/** `detail`: a case study (Works). `fromWorks`: opened from the Works page, which sits under it in history. */
type Screen = { app: PageApp; detail?: string; fromWorks?: boolean };
type MState = { mApp?: PageApp; mDetail?: string; mScroll?: number } | null;

type ViewTransitionLike = { ready: Promise<void>; finished: Promise<void> };
type VTDocument = Document & { startViewTransition?: (cb: () => void) => ViewTransitionLike };

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Rotating a phone crosses into tablet and back; the boot screen only plays once per page load. */
let booted = false;

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** iOS push / pop between the Works list and a case study: the new screen slides in over the old. */
function slide(dir: "push" | "pop", update: () => void) {
  if (!canViewTransition()) {
    update();
    return;
  }
  const root = document.documentElement;
  root.classList.add(`m-vt-${dir}`);
  const transition = (document as VTDocument).startViewTransition!(() => flushSync(update));
  transition.finished.finally(() => root.classList.remove(`m-vt-${dir}`));
}

function canViewTransition() {
  return Boolean((document as VTDocument).startViewTransition) && !reduceMotion();
}

/** The app icon (its 56px art) a page opens from and closes back into. */
function iconRect(key: string | null) {
  if (!key) return null;
  const icon = document.querySelector<HTMLElement>(`[data-m-icon="${key}"]`);
  if (!icon) return null;
  const box = (icon.querySelector<HTMLElement>("[data-m-glyph]") ?? icon).getBoundingClientRect();
  return box.width ? box : null;
}

/** Transform that maps the full-screen page snapshot onto the icon's box. */
function toIcon(icon: DOMRect, page: DOMRect) {
  return `translate(${icon.left - page.left}px, ${icon.top - page.top}px) scale(${icon.width / page.width}, ${icon.height / page.height})`;
}

/**
 * Mobile shell (data-layout="mobile", < 768 wide): Figma "Mobile — Glass Xero
 * OS" (353:16502). A 390-wide iOS layout zoomed by --m-zoom; pages flow and
 * the document scrolls. Apps open with an iOS zoom from their icon and close
 * back into it (View Transition snapshots, transform + opacity only).
 */
export function MobileOS({
  initialApp = null,
  initialWork = null,
}: {
  initialApp?: InternalAppId | null;
  initialWork?: WorkSlug | null;
}) {
  const [phase, setPhase] = useState<"boot" | "enter" | "idle">(() => (booted ? "idle" : "boot"));
  const [bootVisible, setBootVisible] = useState(() => !booted);
  const [screen, setScreen] = useState<Screen | null>(() => {
    const app = initialApp ?? (typeof window === "undefined" ? null : appFromPathname(window.location.pathname));
    const detail = initialWork ?? (typeof window === "undefined" ? null : workFromPathname(window.location.pathname));
    return app ? { app, detail: detail ?? undefined } : null;
  });
  const [menu, setMenu] = useState<Press | null>(null);
  const [search, setSearch] = useState(false);
  const source = useRef<string | null>(null);
  const busy = useRef(false);
  const screenRef = useRef(screen);
  useEffect(() => {
    screenRef.current = screen;
  });

  useEffect(() => {
    warmDockLottie();
  }, []);

  // Hydrate a direct app URL, and recover the current URL when rotating from
  // desktop/tablet into the mobile shell after client-side navigation.
  useEffect(() => {
    const app = appFromPathname(window.location.pathname) ?? initialApp;
    const detail = workFromPathname(window.location.pathname) ?? initialWork;
    if (!app) return;
    source.current = `grid:${app}`;
    const path = detail ? workPath(detail) : appPath(app);
    window.history.replaceState(
      { ...(window.history.state as object | null), mApp: app, mDetail: detail ?? undefined, mFromHome: Boolean((window.history.state as MState)?.mApp) },
      "",
      path,
    );
  }, [initialApp, initialWork]);

  const finish = (root: HTMLElement, cls: string) => {
    root.classList.remove("m-vt", cls);
    root.style.removeProperty("--m-origin");
    document.querySelector(".m-page")?.classList.remove("m-clip");
    busy.current = false;
  };

  const open = useCallback((app: AppId, el?: HTMLElement | null, detail?: string) => {
    if (app === "linkedin") {
      window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
      return;
    }
    if (busy.current) return;
    const work = app === "projects" && detail ? workFromSlug(detail) : null;
    const next: Screen = { app, detail: work ?? undefined };
    const path = work ? workPath(work) : appPath(app);
    // From one app to another (Notes → Mail, Photos → a case study): the new page replaces the old one.
    if (screenRef.current) {
      history.replaceState({ ...(history.state as object | null), mApp: app, mDetail: work ?? undefined }, "", path);
      setScreen(next);
      setMenu(null);
      window.scrollTo(0, 0);
      return;
    }
    const key = (el?.closest<HTMLElement>("[data-m-icon]") ?? el)?.dataset.mIcon ?? null;
    // Search results vanish with the panel, so a page opened from there closes into its home icon.
    source.current = key && !key.startsWith("search:") ? key : `grid:${app}`;
    const from = key ? iconRect(key) : null;
    history.pushState({ mApp: app, mDetail: work ?? undefined, mFromHome: true }, "", path);
    if (!canViewTransition()) {
      setScreen(next);
      setMenu(null);
      setSearch(false);
      window.scrollTo(0, 0);
      return;
    }
    busy.current = true;
    const root = document.documentElement;
    if (from) root.style.setProperty("--m-origin", `${from.left + from.width / 2}px ${from.top + from.height / 2}px`);
    root.classList.add("m-vt", "m-vt-open");
    const transition = (document as VTDocument).startViewTransition!(() => {
      flushSync(() => {
        setScreen(next);
        setMenu(null);
        setSearch(false);
      });
      window.scrollTo(0, 0);
      document.querySelector(".m-page")?.classList.add("m-clip");
    });
    transition.ready
      .then(() => {
        const page = document.querySelector(".m-page")?.getBoundingClientRect();
        if (!page) return;
        const frames: Keyframe[] = from
          ? [
              { transformOrigin: "0 0", transform: toIcon(from, page), opacity: 0 },
              { transformOrigin: "0 0", opacity: 1, offset: 0.3 },
              { transformOrigin: "0 0", transform: "none", opacity: 1 },
            ]
          : [
              { transformOrigin: "50% 40%", transform: "scale(0.9)", opacity: 0 },
              { transformOrigin: "50% 40%", transform: "none", opacity: 1 },
            ];
        document.documentElement.animate(frames, { duration: 480, easing: EASE, fill: "both", pseudoElement: "::view-transition-new(m-page)" });
      })
      .catch(() => undefined);
    transition.finished.finally(() => finish(root, "m-vt-open"));
  }, []);

  const close = useCallback(() => {
    if (!screenRef.current || busy.current) return;
    setMenu(null);
    const page = document.querySelector<HTMLElement>(".m-page");
    if (!canViewTransition() || !page) {
      setScreen(null);
      window.scrollTo(0, 0);
      return;
    }
    busy.current = true;
    // Freeze what is on screen into a viewport-sized page, so the snapshot is exactly what the visitor sees.
    page.style.setProperty("--m-scroll", `${window.scrollY / mobileZoom()}px`);
    page.classList.add("m-clip");
    window.scrollTo(0, 0);
    const box = page.getBoundingClientRect();
    const root = document.documentElement;
    root.classList.add("m-vt", "m-vt-close");
    let target: DOMRect | null = null;
    const transition = (document as VTDocument).startViewTransition!(() => {
      flushSync(() => setScreen(null));
      window.scrollTo(0, 0);
      target = iconRect(source.current);
      if (target) root.style.setProperty("--m-origin", `${target.left + target.width / 2}px ${target.top + target.height / 2}px`);
    });
    transition.ready
      .then(() => {
        const frames: Keyframe[] = target
          ? [
              { transformOrigin: "0 0", transform: "none", opacity: 1 },
              { transformOrigin: "0 0", opacity: 1, offset: 0.55 },
              { transformOrigin: "0 0", transform: toIcon(target, box), opacity: 0 },
            ]
          : [
              { transformOrigin: "50% 40%", transform: "none", opacity: 1 },
              { transformOrigin: "50% 40%", transform: "scale(0.9)", opacity: 0 },
            ];
        document.documentElement.animate(frames, { duration: 440, easing: EASE, fill: "both", pseudoElement: "::view-transition-old(m-page)" });
      })
      .catch(() => undefined);
    transition.finished.finally(() => {
      page.style.removeProperty("--m-scroll");
      finish(root, "m-vt-close");
    });
  }, []);

  /** Back / Home buttons: step back through history so the phone's own back gesture stays in sync. */
  const goHome = useCallback(() => {
    const state = history.state as (MState & { mFromHome?: boolean }) | null;
    if (state?.mFromHome) history.back();
    else {
      history.pushState({}, "", "/");
      close();
    }
  }, [close]);

  /** Works page → case study: a history entry of its own, so Back (button or gesture) returns to the list. */
  const openWork = useCallback((id: string) => {
    const work = workFromSlug(id);
    if (!work || !DETAIL_READY.has(work) || busy.current) return;
    history.replaceState({ ...(history.state as object), mScroll: window.scrollY }, "");
    history.pushState({ ...(history.state as object | null), mApp: "projects", mDetail: work }, "", workPath(work));
    slide("push", () => {
      setScreen({ app: "projects", detail: work, fromWorks: true });
      window.scrollTo(0, 0);
    });
  }, []);

  useEffect(() => {
    const onPop = () => {
      const state = history.state as MState;
      const routeApp = appFromPathname(window.location.pathname);
      const routeDetail = workFromPathname(window.location.pathname);
      if (routeApp) {
        // Forward from Home re-opens the app represented by the restored URL.
        if (!screenRef.current) {
          source.current = `grid:${routeApp}`;
          setScreen({ app: routeApp, detail: routeDetail ?? undefined });
          window.scrollTo(0, state?.mScroll ?? 0);
          return;
        }
        // Back from a case study to the Works page under it: show the list again where it was.
        const leavingDetail = Boolean(screenRef.current.detail) && !routeDetail;
        const show = () => {
          flushSync(() => setScreen({ app: routeApp, detail: routeDetail ?? undefined }));
          window.scrollTo(0, state?.mScroll ?? 0);
        };
        if (leavingDetail) slide("pop", show);
        else show();
        return;
      }
      close();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !menu && !search && screenRef.current) goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome, menu, search]);

  const moreAt = (el: HTMLElement) => {
    const box = el.getBoundingClientRect();
    setMenu({ x: box.left + box.width / 2, y: box.bottom + 8 });
  };

  const page = (s: Screen): ReactNode => {
    const openFrom = (app: AppId) => open(app);
    switch (s.app) {
      case "about":
        return <AboutPage onHome={goHome} onMail={() => open("mail")} />;
      case "mail":
        return <MailPage onHome={goHome} />;
      case "terminal":
        return <TerminalPage onHome={goHome} />;
      case "notes":
        return <NotesPage onHome={goHome} onOpenApp={openFrom} onMore={moreAt} />;
      case "photos":
        return <PhotosPage onHome={goHome} onSearch={() => setSearch(true)} onMore={moreAt} onOpenWork={(id) => open("projects", null, id)} />;
      case "ai-workflow":
        return <AiwPage onHome={goHome} />;
      case "projects":
        // Case studies have no phone layout: Figma's "not optimized" notice (418:30331) instead.
        return s.detail ? (
          <NotOptimizedPage key={s.detail} onBack={s.fromWorks ? goHome : () => open("projects")} />
        ) : (
          <WorksPage onHome={goHome} onOpenWork={openWork} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="m-root text-fg" data-phase={phase}>
      <div className="m-wall" aria-hidden>
        <Image src="/wallpaper/dark.webp" alt="" fill sizes="100vw" preload className="wallpaper wallpaper-dark object-cover" />
        <Image src="/wallpaper/light.webp" alt="" fill sizes="100vw" loading="eager" className="wallpaper wallpaper-light object-cover" />
      </div>

      <div hidden={Boolean(screen)} className="relative z-[1]">
        <Home onOpen={open} onLongPress={setMenu} onSearch={() => setSearch(true)} />
      </div>

      {screen ? (
        <main key={screen.app} className="m-page m-screen relative z-[1]" aria-label={screen.app}>
          {page(screen)}
        </main>
      ) : null}

      {search ? <SearchScreen onClose={() => setSearch(false)} onOpen={(app, el) => open(app, el)} onOpenWork={(id) => open("projects", null, id)} /> : null}

      {menu ? <LongPressMenu press={menu} onClose={() => setMenu(null)} onOpen={(app) => open(app)} /> : null}

      {bootVisible ? (
        <div className="m-boot">
          <BootScreen
            onExit={() => {
              booted = true;
              setPhase("enter");
              window.setTimeout(() => setPhase("idle"), 2600);
            }}
            onGone={() => setBootVisible(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
