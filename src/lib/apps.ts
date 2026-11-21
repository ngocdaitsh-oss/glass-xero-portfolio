export type AppId =
  | "about"
  | "projects"
  | "mail"
  | "terminal"
  | "ai-workflow"
  | "notes"
  | "linkedin"
  | "photos"
  | "glossary";

export type AppDefinition = {
  id: AppId;
  /** Label under the desktop icon. */
  desktopLabel: string;
  /** Dock tooltip name. */
  dockName: string;
  desktopIcon: string;
  dockIcon: string;
  /** Glyph inset inside the 64px OS Icon frame, copied from Figma. */
  inset: string;
  href?: string;
};

export const LINKEDIN_URL = "https://www.linkedin.com/in/tuan-ngoc-trinh-164a40320/?isSelfProfile=true";

/** Hover icon set (frame 0 of each hover Lottie, cropped to its 256px glyph box out of the 448px frame). */
const ICON_INSET = "8%";

export const apps: Record<Exclude<AppId, "about">, AppDefinition> = {
  projects: {
    id: "projects",
    desktopLabel: "My Project",
    dockName: "My Project",
    desktopIcon: "/figma/os-icons/folder.png",
    dockIcon: "/figma/os-icons/folder.png",
    inset: ICON_INSET,
  },
  mail: {
    id: "mail",
    desktopLabel: "Leave an Mail",
    dockName: "Mail",
    desktopIcon: "/figma/os-icons/mail.png",
    dockIcon: "/figma/os-icons/mail.png",
    inset: ICON_INSET,
  },
  "ai-workflow": {
    id: "ai-workflow",
    desktopLabel: "AI Workflow",
    dockName: "AI Workflow",
    desktopIcon: "/figma/os-icons/ai.png",
    dockIcon: "/figma/os-icons/ai.png",
    inset: ICON_INSET,
  },
  notes: {
    id: "notes",
    desktopLabel: "My Note",
    dockName: "Note",
    desktopIcon: "/figma/os-icons/note.png",
    dockIcon: "/figma/os-icons/note.png",
    inset: ICON_INSET,
  },
  terminal: {
    id: "terminal",
    desktopLabel: "Ask Terminal",
    dockName: "Terminal AI",
    desktopIcon: "/figma/os-icons/terminal.png",
    dockIcon: "/figma/os-icons/terminal.png",
    inset: ICON_INSET,
  },
  linkedin: {
    id: "linkedin",
    desktopLabel: "Linkedin",
    dockName: "LinkedIn",
    desktopIcon: "/figma/os-icons/linkedin.png",
    dockIcon: "/figma/os-icons/linkedin.png",
    inset: ICON_INSET,
    href: LINKEDIN_URL,
  },
  // Figma "OS Icon/UX Glossary" (yal6CdLdWWhvDCKXPsJcuE 2033:30224): the 46×52 book at (9, 6) in the 64px frame.
  glossary: {
    id: "glossary",
    desktopLabel: "UX Glossary",
    dockName: "UX Glossary",
    desktopIcon: "/figma/os-icons/glossary.png",
    dockIcon: "/figma/os-icons/glossary.png",
    inset: ICON_INSET,
  },
  photos: {
    id: "photos",
    desktopLabel: "My Photos",
    dockName: "Photos",
    desktopIcon: "/figma/os-photos.svg",
    dockIcon: "/figma/dock-photos.svg",
    inset: "5.69% 7.84% 9.38% 9.38%",
  },
};

/** Kept in the project, but not shown on the desktop or dock. */
export const HIDDEN_APPS = new Set<AppId>(["photos"]);

/** Order of the icon grid in the "Intro — Tuan Ngoc" block. */
export const desktopGrid = [
  apps.projects,
  apps.mail,
  apps["ai-workflow"],
  apps.notes,
  apps.terminal,
  apps.linkedin,
  apps.glossary,
  apps.photos,
].filter((app) => !HIDDEN_APPS.has(app.id));

/** Order of the dock items to the right of the divider. */
export const dockApps = [
  apps.projects,
  apps.mail,
  apps.terminal,
  apps["ai-workflow"],
  apps.notes,
  apps.glossary,
  apps.linkedin,
  apps.photos,
].filter((app) => !HIDDEN_APPS.has(app.id));

export const menuItems: { label: string; app: AppId }[] = [
  { label: "About me", app: "about" },
  { label: "Project", app: "projects" },
  { label: "AI Workflow", app: "ai-workflow" },
  { label: "My notes", app: "notes" },
  { label: "AI Terminal", app: "terminal" },
];
