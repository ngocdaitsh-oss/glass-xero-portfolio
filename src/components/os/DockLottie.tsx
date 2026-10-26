"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AnimationItem } from "lottie-web";
import type { AppId } from "@/lib/apps";

/** GenBI motion pack: one 96-frame @60fps Lottie per OS icon (frame 192px = icon 128px, so the frame is 1.5× the icon). */
const SLUG: Partial<Record<AppId, string>> = {
  projects: "layer-project",
  mail: "mail",
  terminal: "terminal-ai",
  notes: "note",
  linkedin: "linkedin",
  photos: "photos",
  // "ai-workflow": the pack has no AI icon (its "App Project" is the whack-a-mole grid), so it uses AI_MOTION below.
};

/** Frame the hover holds on (the icon peak pose). */
const POSE: Record<string, { hold: number }> = {
  "layer-project": { hold: 26 },
  mail: { hold: 22 },
  "terminal-ai": { hold: 30 },
  note: { hold: 52 },
  linkedin: { hold: 24 },
  photos: { hold: 48 },
};
const easeOut = (t: number) => 1 - (1 - t) ** 2;

type LottieLib = typeof import("lottie-web").default;
let lib: Promise<LottieLib> | null = null;
const data = new Map<string, Promise<object>>();

function loadLib() {
  // lottie_light: no expression engine (the pack uses none), ~40% smaller.
  lib ??= import("lottie-web/build/player/lottie_light").then((m) => m.default);
  return lib;
}

function loadData(slug: string) {
  let entry = data.get(slug);
  if (!entry) {
    entry = fetch(`/lottie/os/${slug}.json`).then((r) => r.json());
    data.set(slug, entry);
  }
  return entry;
}

/** Fetches the player and every icon file while the browser is idle, so the first hover plays instantly. */
export function warmDockLottie() {
  const run = () => {
    void loadLib();
    Object.values(SLUG).forEach((slug) => slug && void loadData(slug));
  };
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2000);
}

/** AI Workflow icon: a springy pop up to a peak; releasing plays it backwards. */
const AI_POP: Keyframe[] = [
  { transform: "translateY(0) scale(1) rotate(0deg)" },
  { transform: "translateY(2px) scale(0.92, 1.06) rotate(0deg)", offset: 0.22 },
  { transform: "translateY(-9px) scale(1.14) rotate(-10deg)" },
];

type Driver = {
  /** Plays toward the hold pose (forward) or back to rest (reverse) from wherever it is now. */
  go(forward: boolean): void;
  destroy(): void;
};

/** Builds the Lottie driver for one icon; the player is parked on frame 0, which matches the static icon. */
async function createLottie(slug: string, container: HTMLElement): Promise<Driver> {
  const [lottie, animationData] = await Promise.all([loadLib(), loadData(slug)]);
  const a: AnimationItem = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: false,
    autoplay: false,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
  });
  a.goToAndStop(0, true);
  const { hold } = POSE[slug] ?? { hold: 48 };
  let raf = 0;
  let frame = 0;
  return {
    // Eased sweep from the current frame to a target, so direction changes never jump.
    go: (forward) => {
      cancelAnimationFrame(raf);
      const from = frame;
      const to = forward ? hold : 0;
      const ms = Math.max(80, (Math.abs(to - from) / 60) * 1000 * (forward ? 1 : 0.75));
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / ms);
        frame = from + (to - from) * easeOut(p);
        a.goToAndStop(frame, true);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    },
    destroy: () => {
      cancelAnimationFrame(raf);
      a.destroy();
    },
  };
}

/**
 * Icon hover motion. Hovering plays the animation up to its hold pose and
 * keeps it there; leaving rewinds it from wherever it is back to the resting
 * icon. Either direction can interrupt the other mid-way without a jump.
 *
 * Lottie icons are built while the browser is idle and then replace the static
 * icon for good (frame 0 is the resting icon), so hovering never swaps layers.
 */
export function DockLottie({ app, hovered, children }: { app: AppId; hovered: boolean; children: ReactNode }) {
  const slug = SLUG[app];
  const isAi = app === "ai-workflow";
  const box = useRef<HTMLSpanElement>(null);
  const still = useRef<HTMLSpanElement>(null);
  const driver = useRef<Driver | null>(null);
  const want = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!slug || !box.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const container = box.current;
    const build = () =>
      void createLottie(slug, container).then((d) => {
        if (!alive) return d.destroy();
        driver.current = d;
        setReady(true);
        if (want.current) d.go(true);
      });
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback(build, { timeout: 3000 }) : setTimeout(build, 1500);
    return () => {
      alive = false;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
      driver.current?.destroy();
      driver.current = null;
    };
  }, [slug]);

  useEffect(() => {
    want.current = hovered;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isAi && !driver.current && still.current) {
      const anim = still.current.animate(AI_POP, { duration: 360, easing: "cubic-bezier(0.34, 1.4, 0.5, 1)", fill: "both" });
      anim.pause();
      driver.current = {
        go: (forward) => {
          anim.playbackRate = forward ? 1 : -1;
          anim.play();
        },
        destroy: () => anim.cancel(),
      };
    }
    driver.current?.go(hovered);
  }, [hovered, isAi]);

  useEffect(
    () => () => {
      if (isAi) driver.current?.destroy();
    },
    [isAi],
  );

  return (
    <span className="relative block size-full">
      <span ref={still} className="block size-full" style={slug ? { opacity: ready ? 0 : 1 } : { willChange: isAi ? "transform" : undefined }}>
        {children}
      </span>
      {slug ? (
        <span ref={box} aria-hidden className="pointer-events-none absolute -inset-1/4" style={{ opacity: ready ? 1 : 0 }} />
      ) : null}
    </span>
  );
}
