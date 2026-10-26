import type { AppId } from "@/lib/apps";

export type InternalAppId = Exclude<AppId, "linkedin">;

export const APP_PATHS: Record<InternalAppId, `/${string}`> = {
  about: "/about",
  projects: "/projects",
  mail: "/mail",
  terminal: "/terminal",
  "ai-workflow": "/ai-workflow",
  notes: "/notes",
  photos: "/photos",
};

const PATH_APPS = new Map<string, InternalAppId>(
  Object.entries(APP_PATHS).map(([app, path]) => [path, app as InternalAppId]),
);

export const APP_SLUGS = Object.values(APP_PATHS).map((path) => path.slice(1));

export const WORK_SLUGS = ["vops", "sapp", "bave", "bsc", "thuc", "rum"] as const;
export type WorkSlug = (typeof WORK_SLUGS)[number];
const WORK_SLUG_SET = new Set<string>(WORK_SLUGS);

export function appPath(app: InternalAppId) {
  return APP_PATHS[app];
}

export function appFromSlug(slug: string): InternalAppId | null {
  return PATH_APPS.get(`/${slug.toLowerCase()}`) ?? null;
}

export function appFromPathname(pathname: string): InternalAppId | null {
  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
  if (parts[0]?.toLowerCase() === "projects" && parts.length === 2 && workFromSlug(parts[1])) return "projects";
  const normalized = `/${parts.join("/")}`;
  return PATH_APPS.get(normalized.toLowerCase()) ?? null;
}

export function workFromSlug(slug: string): WorkSlug | null {
  const normalized = slug.toLowerCase();
  return WORK_SLUG_SET.has(normalized) ? (normalized as WorkSlug) : null;
}

export function workFromPathname(pathname: string): WorkSlug | null {
  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
  return parts[0]?.toLowerCase() === "projects" && parts.length === 2 ? workFromSlug(parts[1]) : null;
}

export function workPath(work: WorkSlug) {
  return `/projects/${work}` as const;
}
