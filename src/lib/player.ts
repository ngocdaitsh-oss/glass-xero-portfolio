"use client";

import { useSyncExternalStore } from "react";

export type Track = { title: string; artist: string; cover: string; src: string; duration: number };

/** Up Next in the Control Center. Durations are replaced by the files' own once their metadata loads. */
export const TRACKS: Track[] = [
  {
    title: "Too Many Nights",
    artist: "Metro Boomin, Don Toliver, Future",
    cover: "/figma/covers/too-many-nights.png",
    src: "/music/too-many-nights.mp3",
    duration: 200,
  },
  {
    title: "Wasted",
    artist: "Juice WRLD, ft. Lil Uzi Vert",
    cover: "/figma/covers/wasted.png",
    src: "/music/wasted.mp3",
    duration: 259,
  },
  {
    title: "The Way Life Goes",
    artist: "Lil Uzi Vert",
    cover: "/figma/covers/the-way-life-goes.png",
    src: "/music/the-way-life-goes.mp3",
    duration: 337,
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "/figma/covers/blinding-lights.png",
    src: "/music/blinding-lights.mp3",
    duration: 200,
  },
  {
    title: "Moonlight",
    artist: "XXXTENTACION",
    cover: "/figma/covers/moonlight.png",
    src: "/music/moonlight.mp3",
    duration: 135,
  },
];

export type PlayerState = {
  current: number;
  playing: boolean;
  elapsed: number;
  volume: number;
  durations: number[];
};

const SERVER: PlayerState = {
  current: 0,
  playing: false,
  elapsed: 0,
  volume: 50,
  durations: TRACKS.map((t) => t.duration),
};

let state: PlayerState = SERVER;
let audio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();

function set(patch: Partial<PlayerState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}

function ensureAudio() {
  if (audio || typeof window === "undefined") return audio;
  audio = new Audio(TRACKS[state.current].src);
  audio.preload = "metadata";
  audio.volume = state.volume / 100;
  audio.addEventListener("timeupdate", () => {
    if (!audio) return;
    const elapsed = Math.floor(audio.currentTime);
    if (elapsed !== state.elapsed) set({ elapsed });
  });
  audio.addEventListener("ended", () => play(state.current + 1));
  audio.addEventListener("play", () => set({ playing: true }));
  audio.addEventListener("pause", () => set({ playing: false }));

  // Real lengths for the Up Next column.
  TRACKS.forEach((track, index) => {
    const probe = new Audio();
    probe.preload = "metadata";
    probe.addEventListener("loadedmetadata", () => {
      if (!Number.isFinite(probe.duration)) return;
      const durations = [...state.durations];
      durations[index] = Math.round(probe.duration);
      set({ durations });
      probe.removeAttribute("src");
    });
    probe.src = track.src;
  });
  return audio;
}

export function play(index: number) {
  const el = ensureAudio();
  if (!el) return;
  const current = (index + TRACKS.length) % TRACKS.length;
  if (current !== state.current) {
    el.src = TRACKS[current].src;
    set({ current, elapsed: 0 });
  }
  void el.play().catch(() => set({ playing: false }));
}

export function togglePlay() {
  const el = ensureAudio();
  if (!el) return;
  if (el.paused) void el.play().catch(() => set({ playing: false }));
  else el.pause();
}

export function seek(seconds: number) {
  const el = ensureAudio();
  if (!el) return;
  el.currentTime = seconds;
  set({ elapsed: Math.floor(seconds) });
}

export function setVolume(volume: number) {
  const el = ensureAudio();
  if (el) el.volume = volume / 100;
  set({ volume });
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  ensureAudio();
  return () => listeners.delete(fn);
}

export function usePlayer() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER,
  );
}
