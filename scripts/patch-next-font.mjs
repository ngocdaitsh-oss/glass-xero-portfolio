// Runs on `npm install` (postinstall). Google Fonts sometimes serves a font file from an
// extensionless URL (https://fonts.gstatic.com/l/font?kit=...). next/font's Google loader reads
// the file type from the URL extension only, so `next build` crashes with
// "Cannot read properties of null (reading '1')" — at random, on whichever font gets such a URL.
// This makes the loader fall back to the file's own signature. Safe to run more than once;
// if a future Next.js changes the line, it only warns.
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let file;
try {
  file = require.resolve("next/dist/compiled/@next/font/dist/google/loader.js");
} catch {
  process.exit(0);
}

const before = "const ext = /\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1];";
const after =
  "const ext = (/\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl) || [])[1] || " +
  "({ wOF2: 'woff2', wOFF: 'woff', OTTO: 'otf' }[fontFileBuffer.subarray(0, 4).toString('latin1')] || 'ttf'); /* patched: extensionless URL */";

const source = fs.readFileSync(file, "utf8");
if (source.includes("patched: extensionless URL")) process.exit(0);
if (!source.includes(before)) {
  console.warn("[patch-next-font] loader line not found; skipped (check whether Next.js fixed it).");
  process.exit(0);
}
fs.writeFileSync(file, source.replace(before, after));
console.log("[patch-next-font] next/font Google loader patched for extensionless font URLs.");
