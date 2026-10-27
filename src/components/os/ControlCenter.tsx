"use client";

import Image from "next/image";
import { play, seek, setVolume, togglePlay, TRACKS, usePlayer } from "@/lib/player";
import { useT } from "@/lib/i18n";
import { GlassEdge, Icon } from "./primitives";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function Slider({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const t = useT();
  label = t(label);
  return (
    <label className="flex w-full flex-col items-start gap-1.5">
      <span className="text-fg-tertiary text-base leading-6 font-semibold">{label}</span>
      <span className="bg-track relative h-[26px] w-full overflow-clip rounded-[13px]">
        <span
          className="bg-inverse absolute inset-y-0 left-0 rounded-[13px] transition-[width] duration-75"
          style={{ width: `max(26px, ${value}%)` }}
        />
        <span className="absolute top-1.5 left-[9px]">
          <Icon src={icon} size={14} />
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 size-full opacity-0"
        />
      </span>
    </label>
  );
}

function SectionHeader({ title, size = "large" }: { title: string; size?: "large" | "small" }) {
  const t = useT();
  title = t(title);
  return (
    <div className="relative flex w-full items-center justify-between font-semibold whitespace-nowrap">
      <p className={size === "large" ? "text-fg text-[17px] leading-6" : "text-fg text-base leading-6"}>{title}</p>
    </div>
  );
}

/** Figma "Icon/Bar Chart" on the playing row, drawn as bars so it can dance while the track plays. */
function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span aria-hidden className={`eq text-accent ${playing ? "is-playing" : ""}`}>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function PlaybackGlyph({ playing }: { playing: boolean }) {
  return playing ? (
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="4" y="3" width="3.5" height="12" rx="1.5" fill="#0a0a0a" />
      <rect x="10.5" y="3" width="3.5" height="12" rx="1.5" fill="#0a0a0a" />
    </svg>
  ) : (
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5.25 3.95c0-.86.94-1.39 1.68-.95l7.2 4.3a1.98 1.98 0 0 1 0 3.4l-7.2 4.3a1.1 1.1 0 0 1-1.68-.95V3.95Z" fill="#0a0a0a" />
    </svg>
  );
}

export function ControlCenter({
  className = "",
  brightness,
  onBrightness,
}: {
  className?: string;
  brightness: number;
  onBrightness: (value: number) => void;
}) {
  const { current, elapsed, playing, volume, durations } = usePlayer();
  const track = TRACKS[current];
  const duration = durations[current] || track.duration;
  const tr = useT();

  return (
    <aside
      aria-label={tr("Control Center")}
      className={`shadow-panel relative flex w-[348px] flex-col items-start gap-3 overflow-clip rounded-3xl p-4 ${className}`}
    >
      <div aria-hidden className="glass glass-flyout-soft pointer-events-none absolute inset-0 rounded-3xl" />

      <SectionHeader title="Control Center" />

      <div className="bg-overlay-subtle relative flex w-full flex-col items-start gap-2.5 overflow-clip rounded-2xl p-3">
        <Slider label="Display" icon="/figma/brightness.svg" value={brightness} onChange={onBrightness} />
        <Slider label="Sound" icon="/figma/volume-sm.svg" value={volume} onChange={setVolume} />
      </div>

      <div className="bg-overlay relative flex w-full flex-col items-start gap-3 overflow-clip rounded-2xl p-3">
        <div className="flex w-full items-center gap-3">
          <span className="relative size-14 shrink-0">
            <Image
              key={track.cover}
              src={track.cover}
              alt={tr("{title} cover", { title: track.title })}
              width={56}
              height={56}
              className={`cc-art size-14 rounded-xl object-cover ${playing ? "is-playing" : ""}`}
            />
          </span>
          <div key={track.title} className="cc-meta flex min-w-px flex-1 flex-col items-start gap-0.5 overflow-clip whitespace-nowrap">
            <p className="text-fg text-base leading-6 font-semibold">{track.title}</p>
            <p className="text-fg-tertiary text-sm leading-5">{track.artist}</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-1">
          <span className="group/seek bg-track relative h-1 w-full rounded-sm">
            <span
              className="bg-inverse absolute inset-y-0 left-0 rounded-sm transition-[width] duration-300 ease-linear"
              style={{ width: `${Math.min(100, (elapsed / duration) * 100)}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration}
              value={Math.min(elapsed, duration)}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label={tr("Seek")}
              className="absolute -inset-y-2 inset-x-0 h-5 w-full opacity-0"
            />
          </span>
          <div className="text-fg-tertiary flex w-full justify-between font-mono text-sm leading-[22px]">
            <span>{fmt(elapsed)}</span>
            <span>-{fmt(Math.max(0, duration - elapsed))}</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-7">
          <button type="button" aria-label={tr("Previous track")} onClick={() => play(current - 1)} className="transition-opacity hover:opacity-70">
            <Icon src="/figma/skip-back.svg" size={24} />
          </button>
          <button
            type="button"
            aria-label={tr(playing ? "Pause" : "Play")}
            onClick={togglePlay}
            className="relative flex size-10 items-center justify-center overflow-clip rounded-full bg-white shadow-sm transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            <PlaybackGlyph playing={playing} />
          </button>
          <button type="button" aria-label={tr("Next track")} onClick={() => play(current + 1)} className="transition-opacity hover:opacity-70">
            <Icon src="/figma/skip-forward.svg" size={24} />
          </button>
        </div>

        <div className="bg-divider h-px w-full" />

        <SectionHeader title="Up Next" size="small" />

        <ul className="flex w-full flex-col items-start gap-0.5">
          {TRACKS.map((t, i) => {
            const isCurrent = i === current;
            return (
              <li key={t.title} className="w-full">
                <button
                  type="button"
                  onClick={() => (isCurrent ? togglePlay() : play(i))}
                  aria-current={isCurrent || undefined}
                  className={`flex w-full items-center gap-2.5 overflow-clip rounded-xl py-1.5 pr-2.5 pl-2 text-left transition-colors duration-200 ${
                    isCurrent ? "bg-overlay" : "hover:bg-overlay-subtle"
                  }`}
                >
                  <Image src={t.cover} alt="" width={36} height={36} className="size-9 shrink-0 rounded-lg object-cover" />
                  <span className="flex min-w-px flex-1 flex-col items-start overflow-clip whitespace-nowrap">
                    <span className={`text-base leading-6 font-semibold transition-colors duration-200 ${isCurrent ? "text-accent" : "text-fg"}`}>
                      {t.title}
                    </span>
                    <span className="text-fg-tertiary text-sm leading-5">{t.artist}</span>
                  </span>
                  {isCurrent ? (
                    <Equalizer playing={playing} />
                  ) : (
                    <span className="text-fg-tertiary font-mono text-sm leading-[22px]">{fmt(durations[i] || t.duration)}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <GlassEdge />
    </aside>
  );
}
