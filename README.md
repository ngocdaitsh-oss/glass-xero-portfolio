# Tuan Ngoc — Glass Xero OS portfolio

Continuing this repo in a new session: read [`docs/HANDOFF.md`](docs/HANDOFF.md) first, then [`docs/DESIGN.md`](docs/DESIGN.md).

A personal portfolio for Tuan Ngoc (UI/UX & Product Designer) styled as a glass desktop
operating system: top bar with app menu and live clock, a date & weather flyout, a
control center with a working music player, desktop app icons and a magnifying dock.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4, implemented from the
Figma file "Desktop" section. See [`docs/DESIGN.md`](docs/DESIGN.md) for the screen list,
component map, prototype interactions, icon inventory and tokens.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:4317.

```bash
npm run lint      # ESLint
npm run build     # production build
npm start         # serve the build on port 4317
```

## What works today

- Desktop home screen in Dark Glass and Light Glass. The moon/sun button in the
  top bar swaps the theme and remembers the choice. The 1920×1080 layout scales
  down to fit smaller windows.
- Live clock and calendar in the Asia/Ho_Chi_Minh time zone; month navigation.
- Date & Weather flyout toggled from the top-bar clock (Esc or a click on the wallpaper closes it).
  Weather values are static sample data.
- Control Center toggled from the tray: draggable Display/Sound sliders, play/pause,
  previous/next and a clickable Up Next list with a ticking progress bar.
- Dock hover: magnify 56→68, lift and name tooltip.
- Selected works, opened from Project in the menu, the My Project icon, or the
  Layer Project dock item. Grid and list views, category jumps, back to top, and a
  shortcut into AI Workflow. Close or Esc returns to the desktop.
- AI Workflow, opened from the menu, the desktop icon, or the dock. The window is
  the light document from the Figma prototype: a sticky "On this page" list scrolls
  to each phase, "Back to top" returns to the hero, and Close or Esc returns to the
  desktop. The dock and flyouts stay hidden while the document is open.

## Also on the desktop

Right-click the wallpaper for the context menu. About Me, Mail, AI Terminal, My Notes
and My Photos open from their icons, the dock, or the top-bar menu. Each window
follows Dark Glass and Light Glass. Close or Esc returns to the desktop.

Every window can be minimized to the dock, maximized and restored, or closed.
Drag a restored window by its title bar; double-click the title bar to maximize.

## Structure

```
src/app/                 layout, global tokens (globals.css), page
src/components/os/       TopBar, DateWeatherPanel, ControlCenter, Dock, Intro, Desktop, AiWorkflowWindow, WorksWindow
src/lib/apps.ts          app registry shared by desktop icons, dock and menu
src/lib/use-now.ts       live clock helpers
public/figma/            icons, wallpaper, avatar and covers exported from Figma
docs/DESIGN.md           design reference
```
