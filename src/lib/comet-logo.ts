/**
 * GenBI "N" logo loader — comet trace (ported from GenBI-motion/logo-loading).
 *
 * A comet runs along the pen stroke of the glyph, speeding up toward the end,
 * and a new one starts every `period` seconds; the logo breathes on a 2-loop
 * cycle so every frame at t and t+cycle is identical. It is drawn on a canvas
 * because the comet tail needs a continuous per-pixel colour ramp.
 * `finish()` lets the last comet run out, lights the logo fully and then calls
 * `onFinished`.
 */

// Glyph outline from Figma (node 14969:82783 "Glyph", box 278.016 × 278.016)
const GLYPH =
  "M269.418 203.273C256.584 180.989 236.417 163.377 212.583 152.954C214.05 145.766 215.516 138.218 216.616 130.67C219.183 115.934 221.383 99.0408 216.983 82.148C211.116 61.3016 195.349 45.1277 176.282 41.1741C160.882 37.9393 144.015 42.6118 130.081 53.7538C119.081 62.7393 111.381 74.2408 105.148 84.3046C96.7142 97.9626 89.014 111.98 81.6806 126.716V37.5799H46.8465V227.713H80.5805L80.9472 225.557C93.0474 182.067 111.014 140.374 134.848 101.557C139.615 93.6495 145.115 85.3828 152.082 79.9915C157.582 75.6785 164.182 73.5219 168.949 74.2408C174.816 75.319 181.049 82.5075 183.249 90.7741C185.816 101.197 184.349 113.418 182.516 125.279C181.416 131.748 180.316 138.218 178.849 144.687C174.449 144.328 170.049 144.687 165.649 145.406C147.682 147.922 131.548 157.267 122.381 170.925C111.381 187.458 111.748 209.383 122.748 224.479C130.815 235.261 143.648 241.731 157.582 241.731C165.649 241.731 172.982 239.574 179.582 235.261C193.883 225.916 198.649 209.383 201.216 200.757C202.683 196.084 203.783 191.412 204.883 186.74C219.183 194.287 231.283 205.789 239.35 219.806L247.784 234.542L278.218 217.65L269.418 203.273ZM159.782 207.586C157.582 209.024 152.815 207.945 150.615 205.07C147.682 201.476 148.049 194.647 151.349 189.974C155.015 184.583 161.982 180.629 170.049 179.551C170.416 179.551 170.416 179.551 170.782 179.551C169.682 183.864 168.582 188.177 167.482 192.131C166.016 196.803 163.449 205.07 159.782 207.586Z";
// Pen path in writing order; starts and ends outside the glyph so the comet head enters and leaves smoothly.
const SKEL =
  "M64.3 12L64.3 224L110 110C128 72 150 56 174 57C198 58 204 80 201 105C199 125 196 140 193 155C190 182 184 222 158 225C140 227 130 208 134 192C138 170 150 162 166 162C182 162 196 162 208 168L288 247";
const BOX = 278.016;
const SIZE = 200; // css px of the logo

const CFG = {
  period: 1.4,
  trail: 0.5,
  accel: 0.35,
  base: 0.12,
  breath: { cycles: 2, base: 0.42, scale: 0.94, glow: [0.06, 0.42] as const },
  brush: 24,
  head: [255, 255, 255] as const,
  tail: [110, 170, 255] as const,
};

/** The earliest the loader may be told it is done: the first comet always runs its full course (finish() waits for it). */
export const COMET_MIN_SECONDS = 0.2;

type Vec3 = readonly [number, number, number];

const toLin = (c: number) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const toSrgb = (c: number) => 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

function oklab([r, g, b]: Vec3): Vec3 {
  r = toLin(r);
  g = toLin(g);
  b = toLin(b);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function fromOklab([L, a, b]: Vec3): Vec3 {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

export type CometLogo = {
  /** Seconds the loader has been running. */
  elapsed(): number;
  /** The load is done: finish the running comet, light the logo, then call onFinished. */
  finish(): void;
  destroy(): void;
};

export function createCometLogo(opts: {
  canvas: HTMLCanvasElement;
  logo: HTMLElement;
  glow: HTMLElement;
  onFinished: () => void;
}): CometLogo {
  const { canvas: cv, logo: logoEl, glow: glowEl } = opts;
  const ctx = cv.getContext("2d");
  if (!ctx) return { elapsed: () => 0, finish: () => opts.onFinished(), destroy: () => undefined };

  const DPR = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  const N = Math.round(SIZE * DPR);
  const K = N / BOX;
  cv.width = cv.height = N;

  // ---- per-pixel "position along the stroke" field (built once) ----
  const off = document.createElement("canvas");
  off.width = off.height = N;
  const octx = off.getContext("2d")!;
  octx.scale(K, K);
  octx.fillStyle = "#fff";
  octx.fill(new Path2D(GLYPH));
  const cov = octx.getImageData(0, 0, N, N).data;

  const svgNS = "http://www.w3.org/2000/svg";
  const sv = document.createElementNS(svgNS, "svg");
  sv.setAttribute("style", "position:absolute;width:0;height:0");
  const sk = document.createElementNS(svgNS, "path");
  sk.setAttribute("d", SKEL);
  sv.appendChild(sk);
  document.body.appendChild(sv);
  const LEN = sk.getTotalLength();
  const stepLen = 0.5 / K;
  const STEPS = Math.ceil(LEN / stepLen);
  const R = CFG.brush * K;
  const R2 = R * R;
  const GAP = 3 / STEPS;
  const MAXI = 3;
  const cnt = new Uint8Array(N * N);
  const A = new Float32Array(N * N * MAXI);
  const B = new Float32Array(N * N * MAXI);
  for (let i = 0; i <= STEPS; i++) {
    const s = i / STEPS;
    const pt = sk.getPointAtLength(s * LEN);
    const cx = pt.x * K;
    const cy = pt.y * K;
    const x0 = Math.max(0, Math.floor(cx - R));
    const x1 = Math.min(N - 1, Math.ceil(cx + R));
    const y0 = Math.max(0, Math.floor(cy - R));
    const y1 = Math.min(N - 1, Math.ceil(cy + R));
    for (let y = y0; y <= y1; y++) {
      const dy = y + 0.5 - cy;
      for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - cx;
        if (dx * dx + dy * dy > R2) continue;
        const p = y * N + x;
        if (!cov[p * 4 + 3]) continue;
        const c = cnt[p];
        const o = p * MAXI;
        if (c && s - B[o + c - 1] <= GAP) B[o + c - 1] = s;
        else if (c < MAXI) {
          A[o + c] = s;
          B[o + c] = s;
          cnt[p] = c + 1;
        }
      }
    }
  }
  sv.remove();

  const idx: number[] = [];
  for (let p = 0; p < N * N; p++) if (cov[p * 4 + 3]) idx.push(p);
  const IDX = Int32Array.from(idx);
  const M = IDX.length;
  const COV = new Float32Array(M);
  const DITH = new Float32Array(M);
  for (let q = 0; q < M; q++) {
    COV[q] = cov[IDX[q] * 4 + 3] / 255;
    DITH[q] = Math.random();
  }

  // ---- lookup tables ----
  const TL = 2048;
  const TR = new Float32Array(TL + 1);
  for (let i = 0; i <= TL; i++) TR[i] = Math.pow(1 - i / TL, 1.8);
  const HEAD = oklab(CFG.head);
  const TAIL = oklab(CFG.tail);
  const CL = 1024;
  const LR = new Float32Array(CL + 1);
  const LG = new Float32Array(CL + 1);
  const LB = new Float32Array(CL + 1);
  const LA = new Float32Array(CL + 1);
  const CC: Vec3[] = [];
  for (let i = 0; i <= CL; i++) {
    const t = Math.pow(i / CL, 0.6);
    CC.push(fromOklab([TAIL[0] + (HEAD[0] - TAIL[0]) * t, TAIL[1] + (HEAD[1] - TAIL[1]) * t, TAIL[2] + (HEAD[2] - TAIL[2]) * t]));
  }
  let lutBase = -1;
  const buildLut = (base: number) => {
    for (let i = 0; i <= CL; i++) {
      const v = i / CL;
      const c = CC[i];
      const a = v + base * (1 - v);
      LA[i] = a;
      for (let k = 0; k < 3; k++) {
        const pm = c[k] * v + 255 * base * (1 - v);
        (k === 0 ? LR : k === 1 ? LG : LB)[i] = a ? pm / a : 0;
      }
    }
    lutBase = base;
  };

  // ---- time ----
  const TAU = Math.PI * 2;
  const EASE = (u: number) => (1 + CFG.trail) * (CFG.accel * u + (1 - CFG.accel) * u * u);
  const U1 = (() => {
    const a = 1 - CFG.accel;
    const b = CFG.accel;
    const c = -1 / (1 + CFG.trail);
    return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  })();
  const LIFE = CFG.period / U1;
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const baseMin = REDUCED ? 1 : CFG.base;
  const breathBase = REDUCED ? 1 : CFG.breath.base;

  const img = ctx.createImageData(N, N);
  const D = img.data;
  let vt = 0;
  let last: number | null = null;
  let doneAt: number | null = null;
  let completeAt: number | null = null;
  let finished = false;
  let raf = 0;
  let alive = true;

  const heads = (t: number) => {
    if (REDUCED) return [] as number[];
    const T = CFG.period;
    const out: number[] = [];
    let nMax = Math.floor(t / T);
    if (doneAt !== null) nMax = Math.min(nMax, Math.floor(doneAt / T));
    for (let n = Math.max(0, Math.floor((t - LIFE) / T)); n <= nMax; n++) {
      const u = (t - n * T) / LIFE;
      if (u >= 0 && u < 1) out.push(EASE(u));
    }
    return out;
  };
  const breathAt = (t: number) => (REDUCED ? 1 : 0.5 - 0.5 * Math.cos((TAU * t) / (CFG.period * CFG.breath.cycles)));

  const draw = (t: number) => {
    let br = breathAt(t);
    if (doneAt !== null) br += (1 - br) * ease((t - doneAt) / 0.4);
    let base = baseMin + (breathBase - baseMin) * br;
    if (doneAt !== null) {
      const nLast = Math.floor(doneAt / CFG.period);
      if (completeAt === null && t - nLast * CFG.period >= CFG.period) completeAt = t;
      if (completeAt !== null) {
        base += (1 - base) * ease((t - completeAt) / 0.4);
        if (t - completeAt > 0.5 && !finished) {
          finished = true;
          opts.onFinished();
        }
      }
    }
    const sc = CFG.breath.scale + (1 - CFG.breath.scale) * br;
    const gl = CFG.breath.glow;
    logoEl.style.transform = `scale(${sc.toFixed(4)})`;
    glowEl.style.opacity = (gl[0] + (gl[1] - gl[0]) * br).toFixed(3);
    glowEl.style.transform = `scale(${(0.85 + 0.2 * br).toFixed(4)})`;
    if (base !== lutBase) buildLut(base);

    const H = heads(t);
    const nh = H.length;
    const Lt = CFG.trail;
    const tk = TL / Lt;
    const rk = STEPS / 3;
    for (let q = 0; q < M; q++) {
      const p = IDX[q];
      const c = cnt[p];
      const o = p * MAXI;
      let best = 0;
      for (let h = 0; h < nh; h++) {
        const hv = H[h];
        for (let j = 0; j < c; j++) {
          const a = A[o + j];
          if (hv < a) continue;
          const b = B[o + j];
          const d = hv < b ? 0 : hv - b;
          if (d >= Lt) continue;
          let v = TR[(d * tk) | 0];
          const r = (hv - a) * rk;
          if (r < 1) v *= r;
          if (v > best) best = v;
        }
      }
      const li = (best * CL + 0.5) | 0;
      const w = p * 4;
      D[w] = LR[li];
      D[w + 1] = LG[li];
      D[w + 2] = LB[li];
      D[w + 3] = LA[li] * COV[q] * 255 + DITH[q];
    }
    ctx.putImageData(img, 0, 0);
  };

  const frame = (now: number) => {
    if (!alive) return;
    if (last !== null) vt += Math.min(0.1, (now - last) / 1000);
    last = now;
    draw(vt);
    raf = requestAnimationFrame(frame);
  };
  buildLut(baseMin);
  raf = requestAnimationFrame(frame);

  return {
    elapsed: () => vt,
    finish: () => {
      if (doneAt === null) doneAt = vt;
    },
    destroy: () => {
      alive = false;
      cancelAnimationFrame(raf);
    },
  };
}
