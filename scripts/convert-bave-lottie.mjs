import { readFile } from "node:fs/promises";
import sharp from "sharp";

const source = process.argv[2];
const output = process.argv[3];
if (!source || !output) throw new Error("Usage: node scripts/convert-bave-lottie.mjs <input.json> <output.webp>");

const animation = JSON.parse(await readFile(source, "utf8"));
const width = animation.w;
const height = animation.h;
const delay = Math.round(1000 / animation.fr);
const assets = animation.assets
  .filter((asset) => asset.p?.startsWith("data:image/webp;base64,"))
  .sort((a, b) => Number(a.id.split("_").at(-1)) - Number(b.id.split("_").at(-1)));

if (!width || !height || assets.length !== animation.op - animation.ip) {
  throw new Error(`Unexpected frame sequence: ${width}x${height}, ${assets.length} assets, ${animation.op - animation.ip} frames`);
}

const frames = [];
for (const asset of assets) {
  const encoded = asset.p.slice(asset.p.indexOf(",") + 1);
  const { data, info } = await sharp(Buffer.from(encoded, "base64")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== width || info.height !== height || info.channels !== 4) {
    throw new Error(`Invalid frame ${asset.id}: ${info.width}x${info.height}x${info.channels}`);
  }
  frames.push(data);
}

await sharp(Buffer.concat(frames), {
  raw: { width, height: height * frames.length, channels: 4, pageHeight: height },
}).webp({
  quality: 82,
  alphaQuality: 100,
  effort: 4,
  loop: 0,
  delay: Array(frames.length).fill(delay),
  smartSubsample: true,
}).toFile(output);

console.log(`Created ${output}: ${frames.length} frames, ${width}x${height}, ${delay}ms/frame`);
