"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useLayoutMode } from "@/lib/layout-mode";
import { Desktop } from "@/components/os/Desktop";
import { watchFrames } from "@/lib/perf";
import type { InternalAppId, WorkSlug } from "@/lib/app-route";

const loadMobile = () => import("@/components/mobile/MobileOS").then((m) => m.MobileOS);
// Phones start fetching their shell right away; desktops never download it.
if (typeof window !== "undefined" && window.innerWidth < 768) void loadMobile();
const MobileOS = dynamic(loadMobile, { ssr: false });

/** Desktop and tablet share the scaled OS stage; phones (< 768) get the iOS shell. */
export function OS({ initialApp = null, initialWork = null }: { initialApp?: InternalAppId | null; initialWork?: WorkSlug | null }) {
  // Re-apply the pre-paint attributes in case a hydration recovery reset <html> (see layout.tsx).
  useEffect(() => {
    (window as Window & { __xeroInit?: () => void }).__xeroInit?.();
    // Give boot time to finish first: its long tasks say nothing about steady-state frames.
    let stop: () => void = () => undefined;
    const timer = window.setTimeout(() => {
      stop = watchFrames();
    }, 9000);
    return () => {
      window.clearTimeout(timer);
      stop();
    };
  }, []);
  return useLayoutMode() === "mobile" ? (
    <MobileOS initialApp={initialApp} initialWork={initialWork} />
  ) : (
    <Desktop initialApp={initialApp} initialWork={initialWork} />
  );
}
