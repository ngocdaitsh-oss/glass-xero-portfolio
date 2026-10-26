/**
 * Xero AI Terminal answers, shared by the desktop window (TerminalWindow) and
 * the mobile page (components/mobile/TerminalPage). Each surface renders the
 * same answer with its own type and color.
 */

/** Timeline row tone: the desktop maps these to its term-* colors, mobile to status colors. */
export type Tone = "user" | "cyan" | "pink";

export type Answer =
  | { kind: "text"; text: string }
  | { kind: "timeline"; rows: { when: string; tone: Tone; text: string }[] };

export const QUICK_PROMPTS = ["/experience", "/skills", "/portfolio", "/contact"];

/** Free-form questions go to Gemini via /api/chat; slash commands stay local. Null means fall back to answer(). */
export function isCommand(raw: string) {
  const q = raw.trim().toLowerCase();
  return q.startsWith("/") || q === "help";
}

export async function askAI(question: string, onText?: (text: string) => void): Promise<string | null> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });
    if (!res.ok || !res.body) return null;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let value = "";
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      value += decoder.decode(chunk.value, { stream: true });
      if (value) onText?.(value);
    }
    value += decoder.decode();
    const finalText = value.trim();
    if (!finalText) return null;
    onText?.(finalText);
    return finalText;
  } catch {
    return null;
  }
}

export function answer(raw: string): Answer {
  const q = raw.trim().toLowerCase();
  const text = (value: string): Answer => ({ kind: "text", text: value });
  if (q === "/help" || q === "help") {
    return text("Try /experience, /skills, /portfolio or /contact — or ask in your own words.");
  }
  if (q.includes("experience") || q.includes("job") || q.includes("work") || q.includes("kinh nghiệm") || q.includes("công việc")) {
    return {
      kind: "timeline",
      rows: [
        { when: "2026 → now", tone: "user", text: "Product Designer @ Viettel IT Center" },
        { when: "2025", tone: "user", text: "Product Designer @ SAPP Academy — LMS redesign" },
        { when: "2024", tone: "cyan", text: "UI/UX Designer @ Bave Global Tech" },
        { when: "2023", tone: "pink", text: "UI/UX Designer @ Wecan Group — BSC, Smart Invest, CMC Telecom, FPT IS" },
      ],
    };
  }
  if (q.includes("skill") || q.includes("tool") || q.includes("kỹ năng") || q.includes("công cụ")) {
    return text("User research, usability testing, heuristic evaluation, information architecture and design systems. Tools: Figma, Photoshop, InDesign, Illustrator, After Effects.");
  }
  if (q.includes("portfolio") || q.includes("project") || q.includes("dự án")) {
    return text("Selected work: SAPP LMS, bave, BSC, vOps, Thực Vị Thiên and 98rum. Open Project in the top bar for every case study.");
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("liên hệ") || q.includes("điện thoại")) {
    return text("Email ngocdaitsh@gmail.com · Phone +84 913 674 939 · Hanoi, Vietnam.");
  }
  return text("Tuan Ngoc is a UI/UX & Product Designer in Hanoi, now at Viettel IT Center. Ask about experience, skills, portfolio or contact.");
}
