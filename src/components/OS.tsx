"use client";

import { useEffect } from "react";
import { useLayoutMode } from "@/lib/layout-mode";
import { Desktop } from "@/components/os/Desktop";
import { MobileOS } from "@/components/mobile/MobileOS";
import type { InternalAppId, WorkSlug } from "@/lib/app-route";

/** Desktop and tablet share the scaled OS stage; phones (< 768) get the iOS shell. */
export function OS({ initialApp = null, initialWork = null }: { initialApp?: InternalAppId | null; initialWork?: WorkSlug | null }) {
  // Re-apply the pre-paint attributes in case a hydration recovery reset <html> (see layout.tsx).
  useEffect(() => {
    (window as Window & { __xeroInit?: () => void }).__xeroInit?.();
  }, []);
  return useLayoutMode() === "mobile" ? (
    <MobileOS initialApp={initialApp} initialWork={initialWork} />
  ) : (
    <Desktop initialApp={initialApp} initialWork={initialWork} />
  );
}
