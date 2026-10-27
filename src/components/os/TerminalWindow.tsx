"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppWindow, MaskIcon } from "./AppWindow";
import { useT } from "@/lib/i18n";
import { answer, askAI, isCommand, QUICK_PROMPTS, type Tone } from "@/lib/terminal";
import { ThinkingDots } from "@/components/terminal/ThinkingDots";
import { AnimatedAnswer } from "@/components/terminal/AnimatedAnswer";

type T = ReturnType<typeof useT>;

const GRADIENT = "linear-gradient(135deg, var(--azure-300) 0%, var(--azure-600) 71.429%)";
const QUICK = QUICK_PROMPTS;
const TONE: Record<Tone, string> = { user: "term-user", cyan: "term-cyan", pink: "term-pink" };

type Turn = { id: number; question: string; ai?: string | null; loading?: boolean };

function Timeline({ rows, t }: { rows: [string, string, string][]; t: T }) {
  return (
    <div className="text-fg-secondary flex w-full flex-col gap-1 text-base leading-6 whitespace-pre-wrap">
      {rows.map(([when, color, text]) => (
        <p key={when + text}>
          <span className={color}>{t(when).padEnd(12, " ")}</span>
          <AnimatedAnswer text={t(text)} />
        </p>
      ))}
    </div>
  );
}

function reply(raw: string, t: T): ReactNode {
  const result = answer(raw);
  if (result.kind === "timeline") return <Timeline t={t} rows={result.rows.map((row) => [row.when, TONE[row.tone], row.text])} />;
  return <p className="text-fg text-base leading-6"><AnimatedAnswer text={t(result.text)} /></p>;
}

export function TerminalWindow() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const t = useT();
  const output = useRef<HTMLDivElement>(null);

  useEffect(() => {
    output.current?.scrollTo({ top: output.current.scrollHeight });
  }, [turns]);

  const nextId = useRef(0);

  const ask = (value: string) => {
    const question = value.trim();
    if (!question) return;
    const id = nextId.current++;
    const local = isCommand(question);
    setTurns((prev) => [...prev, { id, question, loading: !local }]);
    setDraft("");
    if (local) return;
    askAI(question, (ai) => {
      setTurns((prev) => prev.map((turn) => (turn.id === id ? { ...turn, loading: false, ai } : turn)));
    }).then((ai) => {
      setTurns((prev) => prev.map((turn) => (turn.id === id ? { ...turn, loading: false, ai } : turn)));
    });
  };

  return (
    <AppWindow title="AI Terminal — xero-ai" referenceDark>
      <div className="flex h-full flex-col gap-4 px-6 py-5">
        <div ref={output} className="os-scroll bg-desktop flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto rounded-2xl px-5 py-[18px]">
          <div className="bg-overlay-subtle flex w-fit items-center gap-2.5 rounded-xl py-2.5 pr-3.5 pl-3">
            <span className="flex size-7 items-center justify-center rounded-lg" style={{ backgroundImage: GRADIENT }}>
              <MaskIcon src="/figma/term/sparkles-16.svg" size={16} className="text-fg" />
            </span>
            <span className="flex flex-col leading-5 whitespace-nowrap">
              <span className="text-[13px] font-semibold">Xero AI Terminal</span>
              <span className="text-fg-tertiary text-sm leading-5">{t("Ask me anything about Tuan Ngoc · type /help for commands")}</span>
            </span>
          </div>

          {turns.map((turn) => (
            <div key={turn.id} className="flex flex-col gap-3">
              <p className="text-base leading-6">
                <span className="text-accent">{"› "}</span>
                <span className="text-fg">{turn.question}</span>
              </p>
              <div className="flex w-full items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-xl" style={{ backgroundImage: GRADIENT }}>
                  <MaskIcon src="/figma/term/sparkles-14.svg" size={14} className="text-fg" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-2">{turn.loading ? (
                    <ThinkingDots label={t("AI is thinking")} />
                  ) : turn.ai ? (
                    <p className="text-fg text-base leading-6 whitespace-pre-wrap"><AnimatedAnswer text={turn.ai} /></p>
                  ) : (
                    reply(turn.question, t)
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-fg-secondary text-sm leading-[22px] whitespace-nowrap">{t("Quick prompt:")}</span>
          {QUICK.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => ask(cmd)}
              className="bg-overlay-subtle text-fg-secondary hover:bg-overlay rounded-[20px] px-3 py-[5px] text-sm leading-[22px] font-semibold"
            >
              {cmd}
            </button>
          ))}
        </div>

        <form
          className="bg-overlay flex w-full items-center gap-3 rounded-2xl py-2 pr-2 pl-4"
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
        >
          <MaskIcon src="/figma/term/terminal.svg" size={24} className="text-icon-secondary" />
          <div className="relative min-w-0 flex-1">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label={t("Ask Xero AI")}
              className="text-fg w-full bg-transparent text-base leading-6 outline-none"
              style={{ caretColor: "transparent", color: "transparent" }}
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-base leading-6">
              {draft ? (
                <span className="text-fg whitespace-pre">{draft}</span>
              ) : null}
              <span className="term-caret mx-px" />
              {draft ? null : (
                <span className="text-fg-tertiary truncate">{t("Ask Xero AI about projects, skills or experience…")}</span>
              )}
            </span>
          </div>
          <button
            type="submit"
            aria-label={t("Send")}
            className="hover-lift flex size-9 items-center justify-center rounded-xl hover:brightness-110"
            style={{ backgroundImage: GRADIENT }}
          >
            <MaskIcon src="/figma/term/send.svg" size={24} className="text-fg" />
          </button>
        </form>
      </div>
    </AppWindow>
  );
}
