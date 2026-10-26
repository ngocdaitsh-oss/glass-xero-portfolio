"use client";

import { useEffect, useState } from "react";
import type { AppId } from "@/lib/apps";
import { useT } from "@/lib/i18n";
import { mobileZoom } from "@/lib/layout-mode";
import { AiWorkflowWindow } from "@/components/os/AiWorkflowWindow";
import { EmbedContext, WindowProvider, type WindowState } from "@/components/os/window-manager";
import { WorksWindow } from "@/components/os/WorksWindow";
import { NavBar, StatusBar } from "./parts";

/** Width the desktop window is laid out at before it is zoomed down to the phone (the 1440 desktop minimum). */
const VIRTUAL_WIDTH = 1440;

/**
 * Case studies (and the old AI Workflow / Works embeds) have no mobile design yet. They
 * open full screen under an iOS inline nav bar, and the desktop window is laid
 * out at 1440 px and zoomed to the phone width as one piece (its own fit zoom
 * still applies inside). It is small, but nothing reflows or overflows.
 */
export function EmbedPage({
  app,
  detail,
  fromWorks = false,
  onHome,
  onOpen,
}: {
  app: "projects" | "ai-workflow";
  detail?: string;
  /** Opened from the mobile Works page: Back (nav bar or the case study's own back) returns to it. */
  fromWorks?: boolean;
  onHome: () => void;
  onOpen: (app: AppId) => void;
}) {
  const t = useT();
  const [box, setBox] = useState<{ k: number; mz: number; top: number; h: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector<HTMLElement>("[data-embed-nav]");
      const top = nav ? nav.getBoundingClientRect().bottom : 0;
      const k = window.innerWidth / VIRTUAL_WIDTH;
      setBox({ k, mz: mobileZoom(), top, h: (window.innerHeight - top) / k });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const state: WindowState = { id: app, geo: { x: 0, y: 0, w: VIRTUAL_WIDTH, h: box?.h ?? 900 }, minimized: false, maximized: true };
  const title = app === "projects" ? t("Works") : t("AI Workflow");

  return (
    <>
      <div data-embed-nav className="relative z-10">
        <StatusBar />
        <div className="m-col">
          <NavBar
            variant="inline"
            title={title}
            back={{ label: fromWorks ? t("Works") : t("Home"), onClick: onHome }}
          />
        </div>
      </div>
      <div className="m-embed" style={{ height: "calc(100dvh / var(--m-zoom, 1) - 64px - env(safe-area-inset-top) / var(--m-zoom, 1))" }}>
        {box ? (
          <div
            className="fixed left-0 overflow-hidden"
            // CSS zoom also scales the element's own top, so it is given in window px.
            style={{ top: box.top / box.k, width: VIRTUAL_WIDTH, height: box.h, zoom: box.k / box.mz }}
          >
            <EmbedContext.Provider value>
              <WindowProvider
                value={{
                  state,
                  focused: true,
                  z: 1,
                  close: onHome,
                  minimize: onHome,
                  toggleMaximize: () => undefined,
                  focus: () => undefined,
                  setGeometry: () => undefined,
                  setLeaving: () => undefined,
                }}
              >
                {app === "projects" ? (
                  <WorksWindow onOpenAi={() => onOpen("ai-workflow")} initialDetail={detail} onExitDetail={fromWorks ? onHome : undefined} />
                ) : (
                  <AiWorkflowWindow onNext={() => onOpen("projects")} />
                )}
              </WindowProvider>
            </EmbedContext.Provider>
          </div>
        ) : null}
      </div>
    </>
  );
}
