"use client";

import { useEffect, useRef, useState } from "react";
import { COMET_MIN_SECONDS, createCometLogo } from "@/lib/comet-logo";

/** Longest the boot screen waits for assets before it lets go anyway. */
const MAX_WAIT_MS = 9000;
/** The overlay fades over this long; the desktop starts entering at the same moment. */
const EXIT_MS = 620;

/** Resolves once fonts and the images the first screen needs are decoded. */
function assetsReady() {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>("img.wallpaper, .desktop-intro img")).map((img) =>
    img.complete ? img.decode().catch(() => undefined) : new Promise<void>((resolve) => {
      img.addEventListener("load", () => resolve(), { once: true });
      img.addEventListener("error", () => resolve(), { once: true });
    }),
  );
  return Promise.all([document.fonts?.ready, ...images]).then(() => undefined);
}

/**
 * Loading screen: the comet-trace N logo loops until the app is ready AND at
 * least one full logo loop has played. Then the last comet runs out, the logo
 * lights up, and the screen dissolves into the desktop (`onExit` starts the
 * desktop's entrance, `onGone` removes this overlay).
 */
export function BootScreen({ onExit, onGone }: { onExit: () => void; onGone: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);
  const exit = useRef(onExit);
  const gone = useRef(onGone);
  useEffect(() => {
    exit.current = onExit;
    gone.current = onGone;
  });

  useEffect(() => {
    if (!canvas.current || !logo.current || !glow.current) return;
    let ready = false;
    let requested = false;
    let timers: number[] = [];
    const loader = createCometLogo({
      canvas: canvas.current,
      logo: logo.current,
      glow: glow.current,
      onFinished: () => {
        setLeaving(true);
        exit.current();
        timers.push(window.setTimeout(() => gone.current(), EXIT_MS + 60));
      },
    });
    const started = performance.now();
    const hardStop = window.setTimeout(() => (ready = true), MAX_WAIT_MS);
    void assetsReady().then(() => (ready = true));
    // Finish once the app is ready; the first comet still runs its full course before the screen lets go.
    const poll = window.setInterval(() => {
      if (requested) return;
      if (ready && loader.elapsed() >= COMET_MIN_SECONDS && performance.now() - started > 300) {
        requested = true;
        loader.finish();
      }
    }, 80);
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(hardStop);
      timers.forEach(window.clearTimeout);
      timers = [];
      loader.destroy();
    };
  }, []);

  return (
    <div className={`boot-screen ${leaving ? "is-leaving" : ""}`} role="status" aria-label="Loading">
      <div aria-hidden className="boot-grain" />
      <div ref={glow} aria-hidden className="hidden" />
      <div ref={logo} className="boot-logo">
        <canvas ref={canvas} aria-hidden />
      </div>
    </div>
  );
}
