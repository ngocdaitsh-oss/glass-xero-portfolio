"use client";

export type UISound = "tick" | "pop" | "toggle" | "close" | "open";

let audio: AudioContext | null = null;

function context() {
  audio ??= new AudioContext();
  if (audio.state === "suspended") void audio.resume();
  return audio;
}

function voice(
  ctx: AudioContext,
  start: number,
  from: number,
  to: number,
  duration: number,
  volume: number,
  type: OscillatorType,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, to), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

export function playUISound(kind: UISound) {
  try {
    const ctx = context();
    const now = ctx.currentTime;
    if (kind === "pop") {
      voice(ctx, now, 190, 92, 0.115, 0.11, "sine");
      voice(ctx, now + 0.008, 540, 260, 0.072, 0.038, "triangle");
    } else if (kind === "toggle") {
      voice(ctx, now, 320, 680, 0.095, 0.052, "sine");
      voice(ctx, now + 0.032, 610, 760, 0.06, 0.026, "triangle");
    } else if (kind === "close") {
      voice(ctx, now, 260, 105, 0.105, 0.072, "sine");
    } else if (kind === "open") {
      voice(ctx, now, 430, 620, 0.082, 0.042, "triangle");
      voice(ctx, now + 0.028, 650, 820, 0.065, 0.024, "sine");
    } else {
      voice(ctx, now, 780, 610, 0.045, 0.034, "triangle");
    }
  } catch {
    // Audio feedback is progressive enhancement; interaction must still work.
  }
}
