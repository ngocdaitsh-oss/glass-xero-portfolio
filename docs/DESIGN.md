# Glass Xero OS — design reference

Source: Figma file `jgHw7tWMTuA3rrvK7DFWtY`, section **Desktop** (`350:17115`).
Every screen is a 1920×1080 frame. Dark Glass is the default theme; each screen
has a Light Glass twin.

## Screens

| Screen | Dark node | Light node | Main element (node, position, size) | Status |
| --- | --- | --- | --- | --- |
| Desktop (home) | `4:2` | `129:5907` | Date & Weather flyout + Control Center open | **Built** (dark + light) |
| About Me | `44:2165` | `129:5917` | About Me Window `44:2672` · 371,150 · 1040×720 | **Built** |
| Context Menu | `53:2069` | `129:5926` | Context Menu `53:2541` 762,382 · Cursor Submenu `53:2588` | **Built** |
| Mail (Compose) | `88:3143` | `129:5944` | Compose Window `89:3609` · 570,203 · 780×689 | **Built** |
| AI Terminal | `78:2493` | `129:5936` | AI Terminal Window `78:2893` · 500,230 · 920×620 | **Built** |
| My Notes | `140:7340` | `140:7881` | Notes Window `140:7593` · 460,150 · 1000×724 | **Built** |
| My Photos | `140:7889` | `140:8514` | Photos Window `140:8142` · 460,170 · 1000×660 | **Built** |
| My Photos · Preview | `323:186886` | `323:187303` | Photos Window · Preview `323:187011` · 320,118 · 1280×780 | **Built** |
| AI Workflow | — | `107:3794` (section `379:25312`) | Web App window `107:3798` · 24,82 · 1872× visible | **Built** (document is light in both OS themes) |
| Works | `120:3659` (list `123:5116`) | `120:4754` (list `123:5570`) | Works window `120:3663` · 24,82 · 1872× visible | **Built** (grid + list, dark + light) |
| Work Detail · bave | — | `155:9360` (section `379:25314`) | Work Detail web app `190:21448` · 1872×29276 + Progress Tracker `155:10534` | **Built** (dark from Command tokens, light from Figma) |
| Work Detail · vOps | — | `272:14583` | Document column "Main" `272:14590` · 1872×38117 | **Built** (light only; sections in `work-detail/vops/*`, one group file each) |
| Work Detail · BSC | — | `223:13353` | Document column "Main" `223:13360` · 1872×20838 | **Built** (light only; sections in `work-detail/bsc/*`, one group file each) |
| Work Detail · Thực Vị Thiên | — | `332:15789` | Document column "Main" `332:15796` · 1872×15511 | **Built** (light only; `work-detail/thuc/*`) |
| Work Detail · 98rum | — | `343:90404` | Document column "Main" `343:90411` · 1872×14067 | **Built** (light only; `work-detail/rum/*`) |

Every screen shares: Wallpaper (+ Vignette / Vignette — Light), **Intro — Tuan Ngoc**
(184,231 · 776×628), **Top Bar** (12,10 · 1896×56) and **Dock** (650,982 · 621×80).
On window screens the Control Center sits at top 66 instead of 82.

## Prototype / interactions

- **Bar Button** (`32:1200`) — Ghost / Tinted. "While hovering → Hover": Ghost gets
  `overlay-strong`; Tinted gets `overlay-strong` + `0 2px 10px rgba(33,115,214,.4)` glow.
- **Clock & Weather** (`32:1221`, open state `37:1397`) — click opens the
  **Date & Weather Panel** (`37:1396`) flyout. Hover variant via "While hovering".
- **Tray — Control Center** — toggles the **Control Center** (`26:1318`).
  Variable `control-center/open`.
- **Theme Toggle** (`128:5878`) — Moon in Dark Glass, Sun in Light Glass. Click swaps
  the "Color + Theme" / "Command" variable modes.
- **Dock Item** (`17:173`) — hover = magnify 56→68 + lift + tooltip with the app
  name (Smart Animate, gentle spring). States: Idle (no indicator), Running
  (5px dot), Focused (14px pill).
- Desktop icons, menu items, dock items, "More about me" are links that open the
  matching window screen (Mail, Notes, Photos, Terminal, About Me…).
- Wallpaper click dismisses flyouts. Right-click opens the **Context Menu**:
  Rearrange closes it and Refresh performs a full page reload; Personalize cursor / Appearance choose Light or
  Dark, Open AI Terminal and Leave an email open those windows. Ctrl+Alt+T also
  opens the terminal.
- **About Me** (logo, dock Xero, "More about me") opens the profile window.
  Overview, Experience and Skills switch the right pane. Download CV saves a text CV.
- **Window controls** (all apps, `src/components/os/window-manager.tsx`): Minimize
  hides the window and keeps it running in the dock (click the dock item to bring
  it back). Maximize fills the desktop below the top bar; the same button restores.
  Close quits the app. Drag the title bar to move a restored window; double-click
  it to toggle maximize. Several apps can be open; clicking one brings it to the
  front. Works and AI Workflow open maximized and fit their content proportionally
  when restored.
- **Mail**, **AI Terminal**, **My Notes** and **My Photos** open from their icons,
  the dock, and the menu. Notes filter by folder and search. Photos open a preview.
  Close or Esc returns to the desktop. The dock stays visible on these screens.
- **Project** (menu, desktop icon "My Project", dock "Layer Project") opens the Works
  index. Category chips scroll to UI/UX and Graphic. The view toggle switches grid
  and list. Back to top returns to the header. "Next app · AI Workflow" opens the
  AI Workflow document. Close or Esc returns to the desktop.
- **Work Detail** opens from the bave card or row in Works. Back, the forward arrow
  and the "Works" / "UI/UX" crumbs return to the index. The Progress Tracker on the
  right shows 15 stops grouped by phase, expands on hover ("On this page 01/15") and
  scrolls to a section on click. Related projects "All works" also returns to the
  index. Large sections are generated from Figma into
  `src/components/os/work-detail/generated/`. The other five case studies are not built yet.
- **AI Workflow** (menu, desktop icon, dock) opens the light document window and hides
  the dock, date flyout, and control center. Close (or Esc) returns to the desktop
  and restores those panels. The sidebar scrolls to Workflow map (`107:3939`),
  Phase 1 (`107:4010`), Phase 2 (`107:4141`), and Phase 3 (`107:4262`). Overview
  and the footer "Back to top" return to the hero (`107:3835`). The active
  section follows the scroll position.
- **Cursor** (`31:1599`) — 17 types × Light/Dark on a 32px grid; Pointer hotspot at (11.4, 6.6).

## Components (Figma node → code)

| Figma component | Node | Code |
| --- | --- | --- |
| Top Bar | `26:740` | `src/components/os/TopBar.tsx` |
| Bar Button | `32:1200` | `BarButton` in `TopBar.tsx` |
| Theme Toggle | `128:5878` | `TopBar.tsx` (Moon only for now) |
| Date & Weather Panel | `37:1396` | `src/components/os/DateWeatherPanel.tsx` |
| Calendar Day (Weekday/Default/Today/Muted) | `26:541` | `CalendarDay` |
| Forecast Row | `37:1263` | `ForecastRow` |
| Control Center | `26:1318` | `src/components/os/ControlCenter.tsx` |
| Section Header (Large/Small) | `26:592` | `SectionHeader` |
| Slider | `16:217` | `Slider` |
| Now Playing | `26:646` | `ControlCenter.tsx` |
| Track Row | `40:1439` | Up Next list in `ControlCenter.tsx` |
| Dock | `26:1077` | `src/components/os/Dock.tsx` |
| Dock Item | `17:173` | `DockItem` |
| App Icon/Logo (56px squircle) | `28:1679` | Xero item in `Dock.tsx` |
| Avatar | `26:608` | `Intro.tsx` |
| Button (Primary / Secondary / Inverse) | `16:144` | not used yet |
| AIW/Window Title Bar | `102:3679` | `AiWorkflowWindow.tsx` |
| AI Workflow document | `107:3798` | `AiWorkflowWindow.tsx` |

## Icons

OS Icon Set (gradient, 64px frames; dock uses 56px wrappers `77:2787…77:2835`):

| Icon | Node | Desktop asset | Dock asset |
| --- | --- | --- | --- |
| OS Icon/Layer Project | `74:3074` | `os-layer-project.svg` | `dock-layer-project.svg` |
| OS Icon/Mail | `74:3086` | `os-mail.svg` | `dock-mail.svg` |
| OS Icon/AI | `91:3327` | `os-ai.svg` | `dock-ai.svg` |
| OS Icon/Note | `74:3108` | `os-note.svg` | `dock-note.svg` |
| OS Icon/Terminal AI | `74:3096` | `os-terminal-ai.svg` | `dock-terminal-ai.svg` |
| OS Icon/LinkedIn | `74:3124` | `os-linkedin.svg` | `dock-linkedin.svg` |
| OS Icon/Photos | `74:3132` | `os-photos.svg` | `dock-photos.svg` |

Glyph insets inside the frame are in `src/lib/apps.ts`.

UI icons (white fill, Dark Glass exports — Light Glass needs dark exports):

| Icon | Node | Asset |
| --- | --- | --- |
| Icon/Logo | `77:2528` | `logo.svg`, `dock-xero-glyph.svg` |
| Icon/Search | `74:2946` | `search.svg` |
| Icon/Globe | `74:2654` | `globe.svg` |
| Icon/Volume | `74:2755` | `volume.svg`, `volume-sm.svg` |
| Icon/Moon | `74:2821` | `moon.svg` |
| Icon/Sun | `74:2814` | — (needed for Light Glass) |
| Icon/Control Center | `84:2669` | `control-center.svg` |
| Icon/Partly Cloudy | `74:2828` | `partly-cloudy.svg`, `weather-sun.svg` |
| Icon/Cloud Rain | `74:2835` | `cloud-rain.svg` |
| Icon/Map Pin | `74:2915` | `map-pin.svg` |
| Icon/Chevron Left / Right / Down | `74:2953` / `74:2960` / `74:2967` | `chevron-left.svg`, `chevron-right(-sm).svg`, `chevron-down.svg` |
| Icon/Skip Back / Pause / Skip Forward | `74:2741` / `74:2734` / `74:2748` | `skip-back.svg`, `pause.svg`, `skip-forward.svg` |
| Icon/Play Circle | `74:2727` | `play-circle.svg` (paused state) |
| Icon/Bar Chart | `74:2922` | `playing.svg` |
| Icon/Power | `74:2717` | — |
| Cursor · Pointer | `31:1397` | `cursor-pointer.svg` (CSS cursor) |

All assets live in `public/figma/`.

## Tokens

Defined in `src/app/globals.css` (`:root` = Dark Glass, `[data-theme="light"]` = Light Glass)
and exposed to Tailwind as `text-fg`, `text-fg-secondary`, `text-fg-tertiary`,
`text-fg-disabled`, `text-accent`, `bg-overlay-subtle`, `bg-overlay`,
`bg-overlay-strong`, `bg-track`, `bg-inverse`, `bg-divider`, `bg-glass-bar`, `bg-desktop`.

Effects: `.glass` (gradient sheen + tinted blur; tune with `--glass-alpha`,
`--glass-blur`), `GlassEdge` (1px inner hairline + top highlight), `.shadow-panel`
(Glass/Panel `0 24 60`), `.shadow-soft` (Glass/Soft `0 8 24`).

Type: Open Sans (Display/Large 56/64 bold −1, Display/Subtitle 24/32 semibold,
Body 16/24, Body/Medium 14/22 semibold, Headline 14/20 semibold, Caption 12/20,
Callout 12/18 semibold, Title/Small 17/24 semibold) and JetBrains Mono (Mono/Micro 10/14 medium).
