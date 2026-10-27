"use client";

import { useEffect } from "react";
import { playUISound, type UISound } from "@/lib/ui-sound";

function soundFor(target: Element): UISound {
  const control = target.closest<HTMLElement>(
    "[data-sound],[data-open-app],[data-dock-app],[data-m-icon],button,a,[role='button'],input,select,summary",
  );
  const forced = control?.dataset.sound as UISound | undefined;
  if (forced) return forced;
  if (control?.matches("[data-open-app],[data-dock-app],[data-m-icon]")) return "pop";

  const label = `${control?.getAttribute("aria-label") ?? ""} ${control?.getAttribute("title") ?? ""}`.toLowerCase();
  if (/language|ngôn ngữ|theme|appearance|giao diện|light mode|dark mode/.test(label)) return "toggle";
  if (/close|back|home|minimize|đóng|quay lại|thu nhỏ/.test(label)) return "close";
  if (control?.tagName === "A") return "open";
  return "tick";
}

export function InteractionSounds() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      playUISound(soundFor(target));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
