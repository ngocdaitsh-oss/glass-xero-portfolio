/* eslint-disable @next/next/no-img-element -- Figma exports keep their own width and height. */
"use client";

import { createContext, useContext, useEffect, useRef, useState, type RefObject } from "react";
import type { Work } from "@/lib/works";

/*
 * Project covers and client logos, shared by the desktop Works window
 * (WorksWindow, its case-study cards) and the mobile Works page.
 */

/** Thumbnail videos: muted, looping, inline. The still poster shows until the first frame is ready. */
export const COVER_VIDEO: Partial<Record<Work["cover"], { src: string; type: string; poster: string; fit: "cover" | "contain" }>> = {
  sapp: { src: "/video/sapp.mp4", type: "video/mp4", poster: "/figma/works/sapp-poster.png", fit: "cover" },
  bave: { src: "/video/bave-thumbnail.mp4", type: "video/mp4", poster: "/figma/works/bave-poster.png", fit: "cover" },
  bsc: { src: "/video/bsc-thumbnail.mp4", type: "video/mp4", poster: "/figma/works/bsc-thumbnail-poster.webp", fit: "cover" },
  // 16:9 with a background that changes per scene: show the whole frame instead of cropping it.
  vops: { src: "/video/vops.mp4", type: "video/mp4", poster: "/figma/works/vops-mockup.png", fit: "contain" },
};

/** Videos only play while their list is on screen (not under the case-study drawer, not in the pre-rendered hidden copy). */
export const PlayContext = createContext(true);

/**
 * Lazy covers (mobile): the video is not fetched until it nears the viewport,
 * and it only plays while it is on screen. The desktop keeps eager covers.
 */
export const LazyCoverContext = createContext(false);

/** Whether the element is within one screen of the viewport (getBoundingClientRect: safe under CSS zoom). */
function useNearViewport(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const h = window.innerHeight;
      setNear(box.height > 0 && box.bottom > -h * 0.25 && box.top < h * 1.25);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [ref, enabled]);
  return near;
}

function CoverVideo({ id }: { id: Work["cover"] }) {
  const media = COVER_VIDEO[id];
  const ref = useRef<HTMLVideoElement>(null);
  const lazy = useContext(LazyCoverContext);
  const near = useNearViewport(ref, lazy);
  const [seen, setSeen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const playing = useContext(PlayContext) && (!lazy || near) && !reducedMotion;
  if (lazy && near && !seen) setSeen(true);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) void v.play().catch(() => undefined);
    else v.pause();
  }, [playing]);
  if (!media) return null;
  return (
    <div className="relative h-full w-full">
    <video
      ref={ref}
      className={media.fit === "contain" ? "absolute top-1/2 left-0 aspect-video w-full -translate-y-1/2 rounded-xl object-cover" : "h-full w-full object-cover"}
      poster={media.poster}
      autoPlay={!lazy}
      loop
      muted
      playsInline
      preload={lazy && !seen ? "none" : "auto"}
      disablePictureInPicture
      aria-hidden
    >
      <source src={media.src} type={media.type} />
    </video>
    </div>
  );
}

export function Cover({ id }: { id: Work["cover"] }) {
  if (COVER_VIDEO[id]) return <CoverVideo id={id} />;
  if (id === "thuc") {
    return (
      <div className="flex h-full items-center justify-center">
        <img src="/figma/works/thuc-mark.svg" alt="" className="theme-dark-only h-[58%] w-auto" />
        <img src="/figma/works/thuc-mark-light.svg" alt="" className="theme-light-only h-[58%] w-auto" />
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center">
      <img src="/figma/works/rum-mark.svg" alt="" className="h-[42%] w-auto" />
    </div>
  );
}

/** `height` overrides the logo height class (mobile list rows use smaller marks). */
export function Logo({ kind, row = false, height: size }: { kind: Work["logo"]; row?: boolean; height?: string }) {
  const height = size ?? (row && kind === "bave" ? "h-[19px]" : "h-7");
  if (kind === "sapp") {
    return (
      <span className={`relative block shrink-0 ${height} w-[57px]`}>
        <img src="/figma/works/sapp-icon.png" alt="" className="absolute inset-0 size-full object-contain" />
        <span
          aria-hidden
          className="absolute inset-0 bg-[var(--w-text)]"
          style={{
            WebkitMask: "url(/figma/works/sapp-tint.png) center / 100% 100% no-repeat",
            mask: "url(/figma/works/sapp-tint.png) center / 100% 100% no-repeat",
          }}
        />
      </span>
    );
  }
  if (kind === "freelance") {
    return <span className="text-[14px] leading-5 font-semibold">Freelancing</span>;
  }
  if (kind === "bave") {
    return <BaveLogo className={`${height} w-auto shrink-0 text-[var(--w-text)]`} />;
  }
  const src = kind === "bsc" ? "/figma/works/bsc-logo.svg" : kind === "vops" ? "/figma/works/vops-logo.svg" : "/figma/works/thuc-logo.png";
  return <img src={src} alt="" className={`logo-ink ${height} w-auto shrink-0`} />;
}

function BaveLogo({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 85.8983 27.9998" className={className} aria-hidden>
      <path d="M75.0205 27.9975C72.8691 27.9975 70.766 27.3581 68.9772 26.16C67.1883 24.9621 65.794 23.2593 64.9707 21.2671C64.1474 19.2749 63.932 17.0828 64.3518 14.9678C64.7715 12.853 65.8075 10.9103 67.3288 9.38553C68.85 7.86076 70.7883 6.82239 72.8983 6.40172C75.0085 5.98104 77.1956 6.19693 79.1833 7.02213C81.1709 7.84732 82.8698 9.24474 84.0651 11.0377C85.2603 12.8306 85.8983 14.9385 85.8983 17.0949C85.8983 17.5218 85.7291 17.9312 85.4279 18.233C85.1268 18.5349 84.7183 18.7044 84.2923 18.7044H74.3176C73.8918 18.7044 73.4832 18.5349 73.1821 18.233C72.8808 17.9312 72.7117 17.5218 72.7117 17.0949C72.7117 16.668 72.8808 16.2585 73.1821 15.9567C73.4832 15.6549 73.8918 15.4852 74.3176 15.4852H82.5168C82.1621 13.8257 81.2691 12.3305 79.9772 11.2332C78.6854 10.1359 77.0673 9.4982 75.3758 9.41966C73.6842 9.34112 72.0144 9.82615 70.6267 10.799C69.2392 11.772 68.2122 13.1779 67.7059 14.7976C67.1995 16.4172 67.2425 18.1592 67.8281 19.7517C68.4137 21.3442 69.5088 22.6977 70.9426 23.6007C72.3765 24.5036 74.0683 24.9054 75.7539 24.7431C77.4395 24.5808 79.024 23.8638 80.2602 22.7038C80.5724 22.4197 80.9835 22.27 81.4047 22.287C81.826 22.3042 82.2237 22.4865 82.5119 22.795C82.8002 23.1035 82.9558 23.5131 82.9453 23.9355C82.9348 24.358 82.759 24.7593 82.4557 25.053C80.4422 26.9482 77.7827 28.0015 75.0205 27.9975Z" fill="currentColor" />
      <path d="M54.5909 27.9998C54.2927 27.9997 54.0005 27.9165 53.7469 27.7595C53.4931 27.6024 53.2881 27.3777 53.1545 27.1106L43.8827 8.52446C43.7884 8.33537 43.7322 8.1295 43.7173 7.91863C43.7023 7.70777 43.7289 7.49602 43.7957 7.29547C43.8624 7.09492 43.9679 6.90951 44.1061 6.7498C44.2442 6.59011 44.4125 6.45926 44.6011 6.36472C44.7899 6.2702 44.9952 6.21385 45.2056 6.19888C45.4159 6.1839 45.6273 6.21061 45.8274 6.27747C46.0275 6.34434 46.2124 6.45005 46.3718 6.58857C46.5311 6.7271 46.6617 6.89572 46.756 7.08481L54.5934 22.7916L62.4308 7.08481C62.6213 6.70293 62.9554 6.41251 63.3594 6.27747C63.7635 6.14244 64.2046 6.17381 64.5857 6.36472C64.9667 6.55564 65.2564 6.89043 65.3911 7.29547C65.5259 7.7005 65.4945 8.14257 65.3041 8.52446L56.0322 27.1106C55.8984 27.3785 55.6925 27.6037 55.4379 27.7609C55.1833 27.9179 54.89 28.0007 54.5909 27.9998Z" fill="currentColor" />
      <path d="M34.1626 21.1598C36.4017 21.1598 38.2168 19.3405 38.2168 17.0963C38.2168 14.852 36.4017 13.0327 34.1626 13.0327C31.9235 13.0327 30.1084 14.852 30.1084 17.0963C30.1084 19.3405 31.9235 21.1598 34.1626 21.1598Z" fill="#00B7BF" />
      <path d="M34.1644 6.19336C31.2795 6.19336 28.5126 7.34205 26.4727 9.38669C24.4326 11.4313 23.2866 14.2045 23.2866 17.096C23.2866 19.9875 24.4326 22.7607 26.4727 24.8053C28.5126 26.85 31.2795 27.9987 34.1644 27.9987H43.4362C43.8621 27.9987 44.2706 27.8291 44.5718 27.5272C44.873 27.2253 45.0422 26.8159 45.0422 26.389V17.096C45.0389 14.2054 43.8918 11.4342 41.8525 9.39028C39.8133 7.34635 37.0484 6.19664 34.1644 6.19336ZM26.4985 17.096C26.4985 15.5764 26.9481 14.0909 27.7904 12.8274C28.6328 11.5638 29.83 10.579 31.2308 9.99744C32.6315 9.4159 34.1729 9.26376 35.6599 9.56022C37.147 9.85669 38.5129 10.5884 39.585 11.663C40.6571 12.7375 41.3872 14.1066 41.683 15.597C41.9787 17.0874 41.8269 18.6323 41.2468 20.0363C40.6666 21.4403 39.684 22.6403 38.4233 23.4845C37.1627 24.3288 35.6806 24.7794 34.1644 24.7794C32.1319 24.7772 30.1834 23.967 28.7463 22.5266C27.3091 21.0861 26.5007 19.1331 26.4985 17.096Z" fill="currentColor" />
      <path d="M10.8778 6.19338C8.00339 6.19216 5.24613 7.33476 3.21187 9.3701V1.6096C3.21187 1.18271 3.04267 0.773306 2.74149 0.471446C2.44032 0.169587 2.03185 0 1.60593 0C1.18001 0 0.771527 0.169587 0.470356 0.471446C0.169185 0.773306 0 1.18271 0 1.6096V17.096C0 19.2523 0.637964 21.3603 1.83323 23.1532C3.02849 24.9461 4.72737 26.3436 6.71502 27.1687C8.70267 27.9939 10.8898 28.2098 12.9999 27.7892C15.11 27.3685 17.0483 26.3301 18.5695 24.8053C20.0908 23.2806 21.1268 21.3379 21.5465 19.223C21.9662 17.1081 21.7507 14.9159 20.9275 12.9237C20.1042 10.9316 18.7099 9.2288 16.9211 8.0308C15.1322 6.83281 13.0292 6.19338 10.8778 6.19338ZM10.8778 24.7789C9.36159 24.7789 7.87947 24.3283 6.61881 23.4841C5.35816 22.6397 4.3756 21.4398 3.79539 20.0359C3.21517 18.6319 3.06337 17.087 3.35916 15.5966C3.65496 14.106 4.38507 12.7371 5.45715 11.6625C6.52925 10.588 7.89517 9.85619 9.38222 9.55972C10.8692 9.26326 12.4106 9.41542 13.8113 9.99696C15.2122 10.5785 16.4094 11.5633 17.2517 12.8268C18.0941 14.0904 18.5437 15.5758 18.5437 17.0955C18.5416 19.1326 17.7332 21.0859 16.2961 22.5264C14.8589 23.9669 12.9103 24.7767 10.8778 24.7789Z" fill="currentColor" />
    </svg>
  );
}
