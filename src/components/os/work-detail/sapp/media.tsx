"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import type { AnimationItem } from "lottie-web";
import { useFrameThrottle } from "@/lib/scroll";

/**
 * Lazy looping media for the SAPP case study (Lottie icons, tour-guide clips).
 *
 * Visibility is measured with getBoundingClientRect against the `.work-detail`
 * scroller on (rAF-throttled) scroll: IntersectionObserver misreports inside the
 * zoomed column. "near" = within one scroller height of the viewport (start
 * loading); "in" = overlapping it (play). Anything else pauses.
 */
type Vis = "far" | "near" | "in";

function useScrollVisibility(ref: RefObject<HTMLElement | null>): Vis {
  const [vis, setVis] = useState<Vis>("far");
  const scrollerRef = useRef<HTMLElement | null>(null);
  const measure = useFrameThrottle(() => {
    const el = ref.current;
    const sc = scrollerRef.current;
    if (!el || !sc) return;
    const s = sc.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = s.height;
    const next: Vis =
      r.bottom > s.top && r.top < s.bottom ? "in" : r.bottom > s.top - pad && r.top < s.bottom + pad ? "near" : "far";
    setVis((v) => (v === next ? v : next));
  });
  useEffect(() => {
    const sc = (ref.current?.closest(".work-detail") as HTMLElement | null) ?? null;
    scrollerRef.current = sc;
    if (!sc) return;
    measure();
    sc.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      sc.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [ref, measure]);
  return vis;
}

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type LottieLib = typeof import("lottie-web").default;
let lib: Promise<LottieLib> | null = null;
const loadLib = () => (lib ??= import("lottie-web/build/player/lottie_light").then((m) => m.default));
const files = new Map<string, Promise<object>>();
const loadFile = (src: string) => {
  let f = files.get(src);
  if (!f) {
    f = fetch(src).then((r) => r.json());
    files.set(src, f);
  }
  return f;
};

/** Image-sequence Lottie: loads when near, loops while on screen, pauses off screen. */
export function SappLottie({ src, className, style }: { src: string; className?: string; style?: CSSProperties }) {
  const box = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);
  const vis = useScrollVisibility(box);
  const [ready, setReady] = useState(0);
  const wanted = vis !== "far";

  useEffect(() => {
    if (!wanted || anim.current) return;
    let alive = true;
    void Promise.all([loadLib(), loadFile(src)]).then(([lottie, data]) => {
      if (!alive || !box.current || anim.current) return;
      anim.current = lottie.loadAnimation({
        container: box.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        // lottie mutates its data; give every instance its own copy.
        animationData: JSON.parse(JSON.stringify(data)),
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      anim.current.addEventListener("DOMLoaded", () => alive && setReady((n) => n + 1));
    });
    return () => {
      alive = false;
    };
  }, [wanted, src]);

  useEffect(
    () => () => {
      anim.current?.destroy();
      anim.current = null;
    },
    [],
  );

  useEffect(() => {
    const a = anim.current;
    if (!a || !ready) return;
    if (vis === "in" && !reduceMotion()) a.play();
    else a.pause();
  }, [vis, ready]);

  return <div ref={box} aria-hidden className={className} style={style} />;
}

/** Muted looping clip: sets its source when near, plays while on screen, pauses off screen. */
export function SappLoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const vis = useScrollVisibility(ref);
  const [armed, setArmed] = useState(false);
  if (vis !== "far" && !armed) setArmed(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || !armed) return;
    if (vis === "in" && !reduceMotion()) void v.play().catch(() => {});
    else v.pause();
  }, [vis, armed]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      src={armed ? src : undefined}
      muted
      loop
      playsInline
      preload={armed ? "auto" : "none"}
      aria-hidden
      disablePictureInPicture
    />
  );
}
