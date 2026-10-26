/* eslint-disable @next/next/no-img-element -- Figma SVG exports carry their own root size and are served as-is. */
import type { CSSProperties } from "react";

/**
 * Light Glass recolors the monochrome icons (Dark Glass exports are white).
 * Colorful OS icons have no entry and stay as they are in both themes.
 */
const LIGHT_ICONS: Record<string, string> = {
  "/figma/logo.svg": "/figma/light/logo.svg",
  "/figma/search.svg": "/figma/light/search.svg",
  "/figma/globe.svg": "/figma/light/globe.svg",
  "/figma/wifi.svg": "/figma/light/wifi.svg",
  "/figma/tablet/wifi.svg": "/figma/tablet/wifi-light.svg",
  "/figma/volume.svg": "/figma/light/volume.svg",
  "/figma/control-center.svg": "/figma/light/control-center.svg",
  "/figma/moon.svg": "/figma/light/sun.svg",
  "/figma/dot.svg": "/figma/light/dot.svg",
  "/figma/weather-sun.svg": "/figma/light/weather-sun.svg",
  "/figma/weather-sun-lg.svg": "/figma/light/weather-sun-lg.svg",
  "/figma/map-pin.svg": "/figma/light/map-pin.svg",
  "/figma/partly-cloudy.svg": "/figma/light/partly-cloudy.svg",
  "/figma/cloud-rain.svg": "/figma/light/cloud-rain.svg",
  "/figma/chevron-left.svg": "/figma/light/chevron-left.svg",
  "/figma/chevron-right-sm.svg": "/figma/light/chevron-right-sm.svg",
  "/figma/chevron-down.svg": "/figma/light/chevron-down.svg",
  "/figma/chevron-right.svg": "/figma/light/chevron-right.svg",
  "/figma/eyebrow-hello.svg": "/figma/light/eyebrow.svg",
  "/figma/brightness.svg": "/figma/light/brightness.svg",
  "/figma/volume-sm.svg": "/figma/light/volume-sm.svg",
  "/figma/pause.svg": "/figma/light/pause.svg",
  "/figma/skip-back.svg": "/figma/light/skip-back.svg",
  "/figma/skip-forward.svg": "/figma/light/skip-forward.svg",
  "/figma/playing.svg": "/figma/light/playing.svg",
};

function ThemedImg({ src, alt, className }: { src: string; alt: string; className: string }) {
  const light = LIGHT_ICONS[src];
  if (!light) return <img alt={alt} src={src} className={className} />;
  return (
    <>
      <img alt={alt} src={src} className={`theme-dark-only ${className}`} />
      <img alt="" src={light} className={`theme-light-only ${className}`} />
    </>
  );
}

type IconProps = {
  src: string;
  size: number;
  className?: string;
  alt?: string;
};

export function Icon({ src, size, className = "", alt = "" }: IconProps) {
  return (
    <span
      className={`relative block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <ThemedImg src={src} alt={alt} className="absolute inset-0 block size-full max-w-none" />
    </span>
  );
}

/** Vector placed inside its frame with the exact inset the Figma component uses. */
export function InsetGlyph({ src, inset }: { src: string; inset: string }) {
  return (
    <span className="absolute" style={{ inset } as CSSProperties}>
      <ThemedImg src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
    </span>
  );
}

export function GlassEdge() {
  return (
    <span
      aria-hidden
      className="glass-edge pointer-events-none absolute inset-0 rounded-[inherit]"
    />
  );
}
