# SAPP case study — section build brief (shared by all section agents)

Project: `C:\Users\Ngoc Trinh\OneDrive\Desktop\Proto\glass-xero-portfolio` (Next.js 16, React 19, Tailwind v4, TypeScript). Dev server already runs on http://localhost:4317 — never start/stop it and NEVER run `npm run build` (it kills the dev server). You may run `npx tsc --noEmit` and `npm run lint`.

Figma file key `jgHw7tWMTuA3rrvK7DFWtY`. Page frame "Work Detail · SAPP LMS (Light) · v2" `247:14573`; the document column is `247:14580` (1872 px wide, light theme only). Use the Figma MCP tools (`create_session` first with that file key, then `get_metadata`, `get_design_context`, `get_screenshot`, `get_variable_defs`). The local skill `figma-to-code` describes the pixel-perfect method; follow its spirit: copy measured sizes, type, colors, radii, shadows, positions. Never invent layout.

## Where your code goes
- Write ONLY your assigned file in `src/components/os/work-detail/sapp/` (it currently holds placeholder components — keep every exported name and the exact `id` on each section root) and assets in `public/figma/sapp/<your-group>/`. If you need keyframes or CSS that Tailwind can't express, create `src/components/os/work-detail/sapp/<your-group>.css` and `import "./<your-group>.css";` at the top of your file. Do not edit any other file (no globals.css, no SappDetail.tsx, no parts.tsx).
- Each section root is a `<section id="…">` spanning the full 1872 px column with the padding Figma gives it (usually `px-[156px]` or `px-[236px]`, `pt-[100px]`/`pt-[140px]`/`pt-40`).
- Shared helpers: `import { SappEyebrow, SappHeading, SappSectionHead } from "./parts";` (eyebrow pill, 56/60 bold brand heading, head block). `import { Reveal } from "../../reveal";` wraps blocks that should fade up on scroll.
- Tokens available (scope `.sapp-detail` + `.work-detail`): `--cmd-surface-1 #fff`, `--cmd-surface-2 #f0f1f4`, `--cmd-surface-3 #e9ebf0`, `--cmd-text-primary #0a0a0a`, `--cmd-text-secondary #4b4f58`, `--cmd-text-muted #8a8f98`, `--cmd-edge`, `--cmd-accent #3d6fe8`, `--brand-sapp #f5a300`, `--sapp-brand-500 #ffb700`, `--sapp-back rgba(255,183,0,.45)` (offset-shadow color), `--sapp-{research|system|ui|test}-{solid|deep|ink}`, `--sapp-card-soft` (Card/Soft shadow). Figma codegen gives dark fallbacks like `var(--cmd-surface-1,#141414)`: the page is LIGHT, use the token or the light value.
- Images: download every asset with `curl -L` into `public/figma/sapp/<group>/` and reference `/figma/sapp/<group>/…`. Never ship figma.com URLs. Mockups/screens that are raster in Figma stay raster; export complex vector illustrations as one SVG/PNG rather than rebuilding them node by node when that is what Figma has.

## Hard requirements from the user
1. Every absolutely-positioned background layer in the Figma section (glows, blobs, dashed lines, dot grids, gradient shapes, decorative vectors, images behind content) must be present, positioned as in Figma. Do not drop decoration.
2. Every white box / card gets a hover effect: add `className="wd-hover"` (already defined: lifts on hover) to the card element. Offset-shadow cards keep their shadow as `box-shadow`.
3. Performance rules (the site was laggy): NO CSS `filter: blur()` / `drop-shadow()` / `backdrop-filter` anywhere you write. Replace blurred glows with `radial-gradient(...)` backgrounds or the exported bitmap, drop-shadows with `box-shadow`. Animate only `transform` and `opacity`. Scroll listeners must be rAF-throttled. Interaction state belongs in the smallest component possible.
4. Scale: the window renders this column at CSS zoom 1 at 1920 px wide, so use the Figma px values directly.

## Verify before you finish
Screenshot your sections and compare them to `get_screenshot` of the same Figma node:
`node "C:/Users/NGOCTR~1/AppData/Local/Temp/claude/C--Users-Ngoc-Trinh-OneDrive-Desktop-Proto/1f69aa4b-950d-4a36-8b85-fe3c411e6cdd/scratchpad/shot/shotsapp.js" <sectionId> <out.png> <yourGroupName> [offsetY] [height≤1000]`
(writes a PNG of that slice of the live page; run from any folder; use your group name so profiles don't collide; put outputs in your own scratch folder). Fix differences, iterate until it matches. Run `npx tsc --noEmit` and `npm run lint` (must be clean for your file).

## Report back
List what you built per section, every interaction, any Figma part you could not reproduce exactly and why, and the asset folder size.
