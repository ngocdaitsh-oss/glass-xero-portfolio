"use client";

import { useRef, useState } from "react";
import { useT } from "@/lib/i18n";

/**
 * Compose state shared by the desktop Mail window and the mobile Mail page:
 * the same fields, defaults, topic chips and attachment list.
 */

export const TOPICS = ["Job opportunity", "Freelance project", "Collaboration", "Just saying hi"];

export const DEFAULT_SUBJECT = "Let’s work together";
export const DEFAULT_MESSAGE =
  "Hi Ngoc,\n\nI came across your portfolio and really liked your LMS redesign case study. We’re looking for a product designer to join our team — would you be open to a short call next week?\n\nBest,";

export type Attachment = { id: string; name: string; size: number };

export type SendStatus = "idle" | "sending" | "sent" | "error" | "too-large";

/** Files travel inside the JSON body, so keep them under the host's request limit. */
const MAX_ATTACHMENTS = 4 * 1024 * 1024;

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/** Status line under the editor; null while idle. */
export const SEND_NOTE: Record<Exclude<SendStatus, "idle">, string> = {
  sending: "Sending…",
  sent: "Message sent — thank you!",
  error: "Couldn’t send. Please try again or email ngocdaitsh@gmail.com.",
  "too-large": "Attachments are over 4 MB.",
};

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function useCompose() {
  const t = useT();
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState(() => t(DEFAULT_SUBJECT));
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState(() => t(DEFAULT_MESSAGE));
  const [files, setFiles] = useState<Attachment[]>([]);

  const [status, setStatus] = useState<SendStatus>("idle");
  const raw = useRef(new Map<string, File>());

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    const added = Array.from(list).map((file) => {
      const id = crypto.randomUUID();
      raw.current.set(id, file);
      return { id, name: file.name, size: file.size };
    });
    setFiles((current) => [...current, ...added]);
  };

  const removeFile = (id: string) => {
    raw.current.delete(id);
    setFiles((current) => current.filter((item) => item.id !== id));
  };

  /** Posts the draft to /api/mail, which forwards it to Tuan Ngoc's inbox. Resolves true when sent. */
  const send = async () => {
    if (status === "sending") return false;
    if (files.reduce((n, f) => n + f.size, 0) > MAX_ATTACHMENTS) {
      setStatus("too-large");
      return false;
    }
    setStatus("sending");
    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({ name: f.name, content: await toBase64(raw.current.get(f.id)!) })),
      );
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, subject, topic, message, files: attachments }),
      });
      setStatus(res.ok ? "sent" : res.status === 413 ? "too-large" : "error");
      return res.ok;
    } catch {
      setStatus("error");
      return false;
    }
  };

  /** Back to the starting draft (mobile toolbar "reset"). */
  const reset = () => {
    setFrom("");
    setSubject(t(DEFAULT_SUBJECT));
    setTopic(TOPICS[0]);
    setMessage(t(DEFAULT_MESSAGE));
    setFiles([]);
    raw.current.clear();
    setStatus("idle");
  };

  return { status, send, from, setFrom, subject, setSubject, topic, setTopic, message, setMessage, files, addFiles, removeFile, reset };
}
