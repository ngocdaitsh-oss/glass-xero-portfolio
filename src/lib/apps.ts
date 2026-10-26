export type AppId =
  | "about"
  | "projects"
  | "mail"
  | "terminal"
  | "ai-workflow"
  | "notes"
  | "linkedin"
  | "photos";

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

export const apps: Record<Exclude<AppId, "about">, AppDefinition> = {
  projects: {
    id: "projects",
    desktopLabel: "My Project",
    dockName: "My Project",
    desktopIcon: "/figma/os-layer-project.svg",
    dockIcon: "/figma/dock-layer-project.svg",
    inset: "8.59% 7.03% 10.52% 14.99%",
  },
  mail: {
    id: "mail",
    desktopLabel: "Leave an Mail",
    dockName: "Mail",
    desktopIcon: "/figma/os-mail.svg",
    dockIcon: "/figma/dock-mail.svg",
    inset: "13.25% 9.37% 7.81% 9.38%",
  },
  "ai-workflow": {
    id: "ai-workflow",
    desktopLabel: "AI Workflow",
    dockName: "AI Workflow",
    desktopIcon: "/figma/os-ai.svg",
    dockIcon: "/figma/dock-ai.svg",
    inset: "9.38%",
  },
  notes: {
    id: "notes",
    desktopLabel: "My Note",
    dockName: "Note",
    desktopIcon: "/figma/os-note.svg",
    dockIcon: "/figma/dock-note.svg",
    inset: "6.25% 3.72% 9.38% 9.38%",
  },
  terminal: {
    id: "terminal",
    desktopLabel: "Ask Terminal",
    dockName: "Terminal AI",
    desktopIcon: "/figma/os-terminal-ai.svg",
    dockIcon: "/figma/dock-terminal-ai.svg",
    inset: "6.25% 2.34% 7.81% 7.81%",
  },
  linkedin: {
    id: "linkedin",
    desktopLabel: "Linkedin",
    dockName: "LinkedIn",
    desktopIcon: "/figma/os-linkedin.svg",
    dockIcon: "/figma/dock-linkedin.svg",
    inset: "9.38%",
    href: LINKEDIN_URL,
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
  apps.photos,
].filter((app) => !HIDDEN_APPS.has(app.id));

/** Order of the dock items to the right of the divider. */
export const dockApps = [
  apps.projects,
  apps.mail,
  apps.terminal,
  apps["ai-workflow"],
  apps.notes,
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
