"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";

const MONO_LABEL = "font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-nowrap text-[#4b4f58]";
const DURATION = 1600;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Figma "Metrics" (643:29420): three percentages over 6px bars. When the block's
 * reveal fires (`is-in` on this element), one rAF loop counts every number up
 * and scales every bar (transform only) in lockstep.
 */
export function PersonaMetrics({ metrics }: { metrics: [string, number][] }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const nums = [...host.querySelectorAll<HTMLElement>("[data-num]")];
    const bars = [...host.querySelectorAll<HTMLElement>(".bv-fill")];
    let raf = 0;
    const paint = (p: number) => {
      nums.forEach((el, i) => {
        el.textContent = `${Math.round(metrics[i][1] * p)}%`;
      });
      bars.forEach((el) => {
        el.style.transform = `scaleX(${p})`;
      });
    };
    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        paint(1);
        return;
      }
      const start = performance.now() + 250;
      const step = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / DURATION));
        paint(ease(t));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    if (host.classList.contains("is-in") || !host.closest(".reveal-root")) {
      run();
      return () => cancelAnimationFrame(raf);
    }
    paint(0);
    const mo = new MutationObserver(() => {
      if (!host.classList.contains("is-in")) return;
      mo.disconnect();
      run();
    });
    mo.observe(host, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [metrics]);

  return (
    <div ref={ref} data-rv className="flex w-full flex-col">
      <p className={MONO_LABEL}>{t("EMOTIONAL STATE")}</p>
      <div className="mt-4 flex w-full items-start">
        {metrics.map(([label, value], i) => (
          <div key={label} className={`flex min-w-0 flex-1 flex-col gap-1.5 ${i ? "border-l border-[rgba(10,10,15,0.08)] px-7" : "pr-7"}`}>
            <p data-num className="text-[44px] leading-[50px] font-semibold tracking-[-1.1px] whitespace-nowrap text-[#0a0a0a]">
              {value}%
            </p>
            <p className="text-base leading-6 whitespace-nowrap text-[#4b4f58]">{t(label)}</p>
            <div className="relative h-1.5 w-full overflow-hidden rounded-[2px] bg-[#e9ebf0]">
              <div className="absolute inset-y-0 left-0" style={{ width: `${value}%` }}>
                <div className="bv-fill size-full rounded-full bg-[#02c3ea]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
