import { NextResponse } from "next/server";

/** Every message lands here, whatever the visitor types. */
const TO = "ngocdaitsh@gmail.com";
const FROM = process.env.MAIL_FROM ?? "Portfolio <onboarding@resend.dev>";
const MAX_ATTACHMENT_CHARS = 5_600_000; // ≈ 4 MB of files once base64-encoded

/** Per-instance, best-effort limiter: 5 messages / 10 min per IP. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "not-configured" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ error: "rate-limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const from = str(body?.from, 200);
  const subject = str(body?.subject, 200) || "(no subject)";
  const topic = str(body?.topic, 80);
  const message = str(body?.message, 10_000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from) || !message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const files: { filename: string; content: string }[] = Array.isArray(body?.files)
    ? body.files
        .filter((f: { name?: unknown; content?: unknown }) => typeof f?.name === "string" && typeof f?.content === "string")
        .slice(0, 5)
        .map((f: { name: string; content: string }) => ({ filename: f.name.slice(0, 120), content: f.content }))
    : [];
  if (files.reduce((n, f) => n + f.content.length, 0) > MAX_ATTACHMENT_CHARS) {
    return NextResponse.json({ error: "too-large" }, { status: 413 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: from,
        subject: `[Portfolio${topic ? ` · ${topic}` : ""}] ${subject}`,
        text: `From: ${from}\nTopic: ${topic || "-"}\n\n${message}`,
        html: `<p><b>From:</b> ${esc(from)}<br><b>Topic:</b> ${esc(topic || "-")}</p><div style="white-space:pre-wrap">${esc(message)}</div>`,
        attachments: files.length ? files : undefined,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
