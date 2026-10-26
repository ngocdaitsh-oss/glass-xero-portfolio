"use client";

import { useEffect, useRef } from "react";
import { motionActive } from "@/lib/motion";

type Spec = { duration: number; fps: number; vertex: string; fragment: string };

/**
 * Vignette live wallpaper: the still image warped by a looping WebGL shader
 * (uPhase runs 0 → 2π once per `duration`). Sits over the static wallpaper
 * image, which stays as the fallback, and only renders while its theme is
 * showing and the tab is visible, capped at the file's own fps.
 */
export function LiveWallpaper({ name, theme, className }: { name: string; theme: "dark" | "light"; className: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = el.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    let raf = 0;
    let alive = true;

    void Promise.all([
      fetch(`/wallpaper/${name}.json`).then((r) => r.json() as Promise<Spec>),
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = `/wallpaper/${name}.webp`;
      }),
    ]).then(([spec, img]) => {
      if (!alive) return;
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, spec.vertex));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, spec.fragment));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog, "aPosition");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform1i(gl.getUniformLocation(prog, "uImage"), 0);
      const phase = gl.getUniformLocation(prog, "uPhase");

      el.width = img.width;
      el.height = img.height;
      gl.viewport(0, 0, img.width, img.height);

      const frameMs = 1000 / spec.fps;
      let last = -Infinity;
      let shown = false;
      let elapsed = performance.now();
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        const showing = document.documentElement.dataset.theme === "light" ? theme === "light" : theme === "dark";
        if (!showing || document.hidden || now - last < frameMs) return;
        const step = Math.min(now - last, frameMs * 2);
        last = now;
        // Every redraw makes each backdrop-blurred glass surface above re-blur (a full
        // window-sized blur per frame — 40 ms frames on a weak GPU), so the shader holds
        // still during big transitions (lib/motion) and while any window is on screen
        // (Desktop sets data-covered on the stage). Time only advances while it draws,
        // so it picks up where it stopped instead of jumping.
        if (shown && (motionActive() || document.querySelector("[data-desktop-stage][data-covered]"))) return;
        elapsed += step;
        gl.uniform1f(phase, ((elapsed / 1000 / spec.duration) % 1) * Math.PI * 2);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!shown) {
          shown = true;
          el.style.opacity = "1";
        }
      };
      raf = requestAnimationFrame(tick);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [name, theme]);

  return (
    <div aria-hidden className={`${className} pointer-events-none absolute inset-0`}>
      <canvas ref={canvas} className="size-full object-cover transition-opacity duration-500" style={{ opacity: 0 }} />
    </div>
  );
}
