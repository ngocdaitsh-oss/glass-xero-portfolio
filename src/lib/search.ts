import type { AppId } from "./apps";

type Searchable = { title: string; meta: string; keywords?: string[] };

const WORK_KEYWORDS = ["work", "works", "project", "projects", "portfolio", "case study", "case studies", "dự án"];

/** Search content shared by the mobile overlay and the desktop/tablet Search window. */
export const SEARCH_WORKS: (Searchable & { id: string })[] = [
  { id: "sapp", title: "SAPP LMS", meta: "UI/UX · Web app", keywords: [...WORK_KEYWORDS, "lms", "education", "learning"] },
  { id: "bave", title: "Bave", meta: "UI/UX · Mobile app", keywords: [...WORK_KEYWORDS, "automotive", "car", "mobile"] },
  { id: "bsc", title: "BSC", meta: "UI/UX · Web app", keywords: [...WORK_KEYWORDS, "finance", "stock", "web"] },
  { id: "vops", title: "vOps", meta: "UI/UX · Web app", keywords: [...WORK_KEYWORDS, "viettel", "workplace", "design system"] },
  { id: "thuc", title: "Thực Vị Thiên", meta: "Graphic design", keywords: [...WORK_KEYWORDS, "branding", "food", "graphic"] },
  { id: "rum", title: "98rum", meta: "Graphic design", keywords: [...WORK_KEYWORDS, "branding", "fashion", "graphic"] },
];

export const SEARCH_PAGES: (Searchable & { app: AppId })[] = [
  { app: "about", title: "About me", meta: "Experience, skills, contact", keywords: ["profile", "bio", "experience", "skills", "contact", "giới thiệu", "kinh nghiệm", "kỹ năng"] },
  { app: "ai-workflow", title: "AI Workflow", meta: "How I design with AI", keywords: ["ai", "workflow", "process", "design process", "quy trình", "trí tuệ nhân tạo"] },
  { app: "terminal", title: "AI Terminal", meta: "Ask Xero AI", keywords: ["terminal", "assistant", "chat", "ask", "hỏi"] },
  { app: "mail", title: "Mail", meta: "Leave an email", keywords: ["mail", "email", "message", "contact", "liên hệ"] },
];

export const SEARCH_SUGGESTED: AppId[] = ["projects", "mail", "ai-workflow", "terminal"];

export const SEARCH_APP_KEYWORDS: Partial<Record<AppId, string[]>> = {
  projects: WORK_KEYWORDS,
  mail: ["mail", "email", "message", "contact", "liên hệ"],
  "ai-workflow": ["ai", "workflow", "process", "design process", "quy trình"],
  notes: ["note", "notes", "my notes", "ghi chú"],
  terminal: ["terminal", "ai terminal", "assistant", "chat", "ask", "hỏi"],
  photos: ["photo", "photos", "image", "gallery", "ảnh"],
  about: ["about", "about me", "profile", "bio", "experience", "skills", "giới thiệu", "kinh nghiệm"],
};

/** Accent-insensitive, word-aware relevance score. Exact words beat phrases; weak substrings do not match. */
export function searchScore(query: string, texts: string[]) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const q = normalize(query);
  if (!q) return 1;
  const queryWords = q.split(" ");
  let best = 0;

  for (const raw of texts) {
    const value = normalize(raw);
    if (!value) continue;
    const words = value.split(" ");
    if (value === q) best = Math.max(best, 120);
    if (words.includes(q)) best = Math.max(best, 100);
    if (value.startsWith(`${q} `) || value.endsWith(` ${q}`) || value.includes(` ${q} `)) best = Math.max(best, 90);
    if (queryWords.every((word) => words.includes(word))) best = Math.max(best, 80);
    if (q.length >= 3 && words.some((word) => word.startsWith(q) && word.length - q.length <= 3)) best = Math.max(best, 55);
  }
  return best;
}

export function rankSearch<T>(query: string, items: T[], fields: (item: T) => string[]) {
  return items
    .map((item, index) => ({ item, index, score: searchScore(query, fields(item)) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item);
}
