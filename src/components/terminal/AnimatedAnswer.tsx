"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const readReducedMotion = () => window.matchMedia(reducedQuery).matches;
const readReducedMotionServer = () => false;

/** Reveals terminal output at a readable pace, while still accepting streamed text. */
export function AnimatedAnswer({ text, className = "" }: { text: string; className?: string }) {
  const target = useRef(text);
  const [visible, setVisible] = useState(0);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, readReducedMotionServer);

  useEffect(() => {
    target.current = text;
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setVisible((current) => {
        const remaining = target.current.length - current;
        if (remaining <= 0) return current;
        return Math.min(target.current.length, current + Math.max(1, Math.ceil(remaining / 18)));
      });
    }, 24);
    return () => window.clearInterval(timer);
  }, [text, reduceMotion]);

  const shown = reduceMotion ? text.length : Math.min(visible, text.length);
  const done = shown >= text.length;
  return (
    <span className={className}>
      {text.slice(0, shown)}
      {!done ? <span aria-hidden className="term-answer-caret" /> : null}
    </span>
  );
}
