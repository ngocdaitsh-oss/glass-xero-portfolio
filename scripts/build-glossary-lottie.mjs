// Builds public/lottie/os/glossary.json: the hover animation for the UX Glossary OS icon
// (Figma yal6CdLdWWhvDCKXPsJcuE, node 2033:30224), in the same format as the GenBI pack in
// public/lottie/os: 192×192 comp, 60 fps, 96 frames, the 64px icon drawn at 2× by a Root null,
// frame 0 and frame 96 identical to the static icon, a peak pose held on hover (frame 26).
//
// Motion (pack vocabulary: a squash on the whole icon, then one story beat per part):
//   0–22  the book squashes and springs back (as Mail / Note)
//   8–20  the cover swings open on its spine and the pages slide out from behind it
//   8–24  "Aa" pops up (the glossary entry being looked up) and settles a little larger
//   6–28  the two text lines redraw left to right, one after the other (as Note)
//   58–80 everything returns to the static icon; 84–92 a small settling squash
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const OX = 9; // Group UX sits at (9, 6) inside the 64px icon
const OY = 6;

/* ---------- SVG path (absolute M L H V C Z) → Lottie bezier ---------- */
function toBezier(d) {
  const tokens = d.match(/[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  const shapes = [];
  let cur = null;
  let x = 0;
  let y = 0;
  let i = 0;
  const num = () => parseFloat(tokens[i++]);
  const close = () => {
    if (!cur) return;
    // A closing segment that lands on the start point is implied by c: true.
    const [sx, sy] = cur.v[0];
    const last = cur.v.length - 1;
    if (last > 0 && Math.abs(cur.v[last][0] - sx) < 1e-6 && Math.abs(cur.v[last][1] - sy) < 1e-6) {
      cur.i[0] = cur.i[last];
      cur.v.pop();
      cur.i.pop();
      cur.o.pop();
    }
    shapes.push({ ...cur, c: true });
    cur = null;
  };
  const lineTo = (nx, ny) => {
    cur.v.push([nx + OX, ny + OY]);
    cur.i.push([0, 0]);
    cur.o.push([0, 0]);
    x = nx;
    y = ny;
  };
  let cmd = "";
  while (i < tokens.length) {
    if (/[MLHVCZ]/i.test(tokens[i])) {
      cmd = tokens[i++];
      if (cmd !== cmd.toUpperCase()) throw new Error(`relative command ${cmd} not supported`);
    }
    if (cmd === "Z") {
      close();
      continue;
    }
    if (cmd === "M") {
      close();
      x = num();
      y = num();
      cur = { v: [[x + OX, y + OY]], i: [[0, 0]], o: [[0, 0]] };
      cmd = "L";
    } else if (cmd === "L") lineTo(num(), num());
    else if (cmd === "H") lineTo(num(), y);
    else if (cmd === "V") lineTo(x, num());
    else if (cmd === "C") {
      const [x1, y1, x2, y2, nx, ny] = [num(), num(), num(), num(), num(), num()];
      const last = cur.v.length - 1;
      cur.o[last] = [x1 - x, y1 - y];
      cur.v.push([nx + OX, ny + OY]);
      cur.i.push([x2 - nx, y2 - ny]);
      cur.o.push([0, 0]);
      x = nx;
      y = ny;
    }
  }
  close();
  return shapes;
}

/* ---------- Lottie helpers ---------- */
const EASE = { o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } };
const ease = (n) => ({ o: { x: Array(n).fill(0.42), y: Array(n).fill(0) }, i: { x: Array(n).fill(0.58), y: Array(n).fill(1) } });
const anim = (keys) => {
  const n = Array.isArray(keys[0][1]) ? keys[0][1].length : 1;
  return {
    a: 1,
    k: keys.map(([t, s], idx) => (idx === keys.length - 1 ? { t, s: [].concat(s) } : { t, s: [].concat(s), ...(n === 1 ? EASE : ease(n)) })),
  };
};
const stat = (k) => ({ a: 0, k });
const tr = { ty: "tr", p: stat([0, 0]), a: stat([0, 0]), s: stat([100, 100]), r: stat(0), o: stat(100), sk: stat(0), sa: stat(0), nm: "Transform" };

const hex = (h) => [1, 3, 5].map((k) => +(parseInt(h.slice(k, k + 2), 16) / 255).toFixed(4));
const solid = (h, opacity = 100) => ({ ty: "fl", c: stat([...hex(h), 1]), o: stat(opacity), r: 1, bm: 0, nm: "Fill", hd: false });
const gradient = (from, to, s, e) => ({
  ty: "gf",
  o: stat(100),
  r: 1,
  bm: 0,
  g: { p: 2, k: stat([0, ...hex(from), 1, ...hex(to)]) },
  s: stat([s[0] + OX, s[1] + OY]),
  e: stat([e[0] + OX, e[1] + OY]),
  t: 1,
  nm: "Gradient",
  hd: false,
});
const group = (nm, d, fill) => ({
  ty: "gr",
  nm,
  it: [...toBezier(d).map((k, n) => ({ ty: "sh", d: 1, ks: stat(k), nm: `Path ${n + 1}`, hd: false })), fill, tr],
  np: 2,
  cix: 2,
  bm: 0,
  ix: 1,
  hd: false,
});

let ind = 0;
const ks = (o = {}) => ({ o: stat(100), r: stat(0), p: stat([0, 0, 0]), a: stat([0, 0, 0]), s: stat([100, 100, 100]), ...o });
const nullLayer = (nm, k, parent) => ({ ddd: 0, ind: ++ind, ty: 3, nm, ks: ks(k), ao: 0, ip: 0, op: 96, st: 0, bm: 0, ...(parent ? { parent } : {}) });
const shapeLayer = (nm, shapes, parent, k) => ({ ddd: 0, ind: ++ind, ty: 4, nm, ks: ks(k), ao: 0, shapes, ip: 0, op: 96, st: 0, bm: 0, parent });

/* ---------- Geometry (from the Figma SVG export) ---------- */
const P = {
  pages: "M3 12C3 7.58172 6.58172 4 11 4H38C42.4183 4 46 7.58172 46 12V44C46 48.4183 42.4183 52 38 52H11C6.58172 52 3 48.4183 3 44V12Z",
  cover: "M0 8C0 3.58172 3.58172 0 8 0H34C38.4183 0 42 3.58172 42 8V40C42 44.4183 38.4183 48 34 48H8C3.58172 48 0 44.4183 0 40V8Z",
  spine: "M0 8C0 3.58172 3.58172 0 8 0H9V48H8C3.58172 48 0 44.4183 0 40V8Z",
  glint: "M9 0H10.5V48H9V0Z",
  A: "M22.9565 23L22.0767 20.1113H17.6523L16.7725 23H14L18.2832 10.8145H21.4292L25.729 23H22.9565ZM21.4624 17.9531L20.5825 15.1309C20.5272 14.9427 20.4525 14.702 20.3584 14.4087C20.2699 14.1099 20.1785 13.8083 20.0845 13.5039C19.9959 13.194 19.924 12.9256 19.8687 12.6987C19.8133 12.9256 19.7358 13.2078 19.6362 13.5454C19.5422 13.8774 19.4508 14.1929 19.3623 14.4917C19.2738 14.7905 19.2101 15.0036 19.1714 15.1309L18.2998 17.9531H21.4624Z",
  a: "M30.5272 13.5288C31.7723 13.5288 32.7269 13.8 33.391 14.3423C34.055 14.8846 34.3871 15.7091 34.3871 16.8159V23H32.619L32.1292 21.7383H32.0628C31.7972 22.0703 31.526 22.3415 31.2494 22.5518C30.9727 22.762 30.6545 22.917 30.2948 23.0166C29.9351 23.1162 29.4979 23.166 28.9832 23.166C28.4354 23.166 27.9429 23.0609 27.5057 22.8506C27.0741 22.6403 26.7337 22.3193 26.4847 21.8877C26.2357 21.4505 26.1112 20.8971 26.1112 20.2275C26.1112 19.2425 26.457 18.5176 27.1488 18.0527C27.8405 17.5824 28.8781 17.3223 30.2616 17.2725L31.8719 17.2227V16.8159C31.8719 16.3289 31.7446 15.972 31.4901 15.7451C31.2355 15.5182 30.8814 15.4048 30.4276 15.4048C29.9793 15.4048 29.5394 15.4684 29.1078 15.5957C28.6761 15.723 28.2445 15.8835 27.8128 16.0771L26.9745 14.3672C27.467 14.1071 28.0176 13.9023 28.6263 13.7529C29.2406 13.6035 29.8742 13.5288 30.5272 13.5288ZM31.8719 18.7002L30.8924 18.7334C30.0734 18.7555 29.5034 18.9022 29.1825 19.1733C28.867 19.4445 28.7093 19.8014 28.7093 20.2441C28.7093 20.6315 28.8228 20.9082 29.0496 21.0742C29.2765 21.2347 29.5726 21.3149 29.9378 21.3149C30.4802 21.3149 30.9367 21.1545 31.3075 20.8335C31.6838 20.5125 31.8719 20.056 31.8719 19.4639V18.7002Z",
  line1: "M14 32C14 30.8954 14.8954 30 16 30H28C29.1046 30 30 30.8954 30 32C30 33.1046 29.1046 34 28 34H16C14.8954 34 14 33.1046 14 32Z",
  line2: "M14 39C14 37.8954 14.8954 37 16 37H22C23.1046 37 24 37.8954 24 39C24 40.1046 23.1046 41 22 41H16C14.8954 41 14 40.1046 14 39Z",
};

/* ---------- Layers (Lottie draws index 1 on top, so build top → bottom) ---------- */
const BASE = [32, 58, 0]; // squash pivot: the icon's bottom centre (as Note)
const SPINE = [OX, OY + 24, 0]; // cover hinge: the spine's outer edge, mid-height
const LETTERS = [OX + 24, OY + 17, 0]; // centre of "Aa"
const LINE = [OX + 14, 0, 0]; // lines grow from their left end

const root = nullLayer("Root", { p: stat([32, 32, 0]), s: stat([200, 200, 100]) });
const icon = nullLayer(
  "Icon",
  {
    p: stat(BASE),
    a: stat(BASE),
    s: anim([
      [0, [100, 100, 100]],
      [6, [106, 94, 100]],
      [14, [97, 103, 100]],
      [22, [100, 100, 100]],
      [84, [100, 100, 100]],
      [88, [103, 97, 100]],
      [92, [100, 100, 100]],
    ]),
  },
  root.ind,
);
// The front of the book: cover, spine, letters and lines all ride the hinge together.
const front = nullLayer(
  "Front",
  {
    p: stat(SPINE),
    a: stat(SPINE),
    s: anim([
      [0, [100, 100, 100]],
      [8, [100, 100, 100]],
      [16, [86, 100, 100]],
      [20, [90, 100, 100]],
      [60, [90, 100, 100]],
      [72, [100, 100, 100]],
    ]),
    r: anim([
      [0, [0]],
      [8, [0]],
      [16, [-5]],
      [20, [-3]],
      [60, [-3]],
      [72, [0]],
    ]),
  },
  icon.ind,
);

const line2 = shapeLayer("Line 2", [group("Line 2", P.line2, solid("#ffffff", 60))], front.ind, {
  p: stat(LINE),
  a: stat(LINE),
  s: anim([
    [0, [100, 100, 100]],
    [6, [0, 100, 100]],
    [14, [0, 100, 100]],
    [28, [100, 100, 100]],
  ]),
});
const line1 = shapeLayer("Line 1", [group("Line 1", P.line1, solid("#ffffff", 60))], front.ind, {
  p: stat(LINE),
  a: stat(LINE),
  s: anim([
    [0, [100, 100, 100]],
    [6, [0, 100, 100]],
    [8, [0, 100, 100]],
    [22, [100, 100, 100]],
  ]),
});
const letters = shapeLayer("Letters", [group("A", P.A, solid("#ffffff")), group("a", P.a, solid("#ffffff"))], front.ind, {
  p: anim([
    [0, LETTERS],
    [8, LETTERS],
    [18, [LETTERS[0], LETTERS[1] - 3, 0]],
    [24, [LETTERS[0], LETTERS[1] - 1, 0]],
    [58, [LETTERS[0], LETTERS[1] - 1, 0]],
    [70, LETTERS],
  ]),
  a: stat(LETTERS),
  s: anim([
    [0, [100, 100, 100]],
    [8, [100, 100, 100]],
    [18, [122, 122, 100]],
    [24, [112, 112, 100]],
    [58, [112, 112, 100]],
    [70, [100, 100, 100]],
  ]),
});
const glint = shapeLayer("Spine Glint", [group("Spine Glint", P.glint, solid("#ffffff", 35))], front.ind);
const spine = shapeLayer("Spine", [group("Spine", P.spine, gradient("#5B4BE8", "#2F2391", [0, 0], [17.3887, 3.26038]))], front.ind);
const cover = shapeLayer("Cover", [group("Cover", P.cover, gradient("#8E7CFF", "#3D6BF5", [0, 0], [47.5752, 41.6283]))], front.ind);
// The pages slide out from behind the opening cover.
const pages = shapeLayer("Pages", [group("Pages", P.pages, gradient("#E3F1FF", "#9FCBFF", [3, 4], [50.7111, 46.7412]))], icon.ind, {
  p: anim([
    [0, [0, 0, 0]],
    [8, [0, 0, 0]],
    [16, [2.5, 0, 0]],
    [20, [2, 0, 0]],
    [60, [2, 0, 0]],
    [72, [0, 0, 0]],
  ]),
});

const order = [line2, line1, letters, glint, spine, cover, front, pages, icon, root];
const out = { v: "5.9.0", fr: 60, ip: 0, op: 96, w: 192, h: 192, nm: "UX Glossary", ddd: 0, assets: [], layers: order, markers: [] };
const file = fileURLToPath(new URL("../public/lottie/os/glossary.json", import.meta.url));
fs.writeFileSync(file, JSON.stringify(out));
console.log(`wrote ${file} (${fs.statSync(file).size} bytes)`);
