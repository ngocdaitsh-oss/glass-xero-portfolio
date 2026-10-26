"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { answer, askAI, isCommand, QUICK_PROMPTS, type Tone } from "@/lib/terminal";
import { ThinkingDots } from "@/components/terminal/ThinkingDots";
import { Chip, Glyph, M, NavBar, Page } from "./parts";

const TONE: Record<Tone, string> = { user: "var(--m-success)", cyan: "var(--m-warning)", pink: "var(--m-danger)" };

/** The conversation already on screen in Figma (369:21892). */
const SEED_ROWS: { when: string; tone: Tone; text: string }[] = [
  { when: "2025 → now", tone: "user", text: "Product Designer @ SAPP Academy — LMS redesign, UX research" },
  { when: "2024", tone: "cyan", text: "UI/UX Designer @ Bave Global Tech" },
  { when: "2023", tone: "pink", text: "UI/UX Designer @ Wecan Group — websites for BSC, Smart Invest" },
];

type Turn = { id: number; question: string; ai?: string | null; loading?: boolean };

function Rows({ rows }: { rows: { when: string; tone: Tone; text: string }[] }) {
  const t = useT();
  return (
    <>
      {rows.map((row) => (
        <div key={row.when + row.text} className="flex flex-col items-start gap-0.5 font-mono text-sm leading-[normal]">
          <p className="leading-[normal] whitespace-nowrap" style={{ color: TONE[row.tone] }}>
            {t(row.when)}
          </p>
          <p className="text-fg leading-[1.5]">{t(row.text)}</p>
        </div>
      ))}
    </>
  );
}

/** Mobile — AI Terminal (369:21858): the desktop terminal's answers (lib/terminal) in the iOS card. */
export function TerminalPage({ onHome }: { onHome: () => void }) {
  const t = useT();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const end = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!turns.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    end.current?.scrollIntoView({ block: "end", behavior: reduce ? "auto" : "smooth" });
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
    <Page
      onHome={onHome}
      bottomSpace={92}
      nav={
        <NavBar
          variant="inline"
          title="xero-ai"
          back={{ label: t("Home"), onClick: onHome }}
          actions={[
            { icon: `${M}/refresh-20.svg`, label: t("Clear"), onClick: () => setTurns([]) },
          ]}
        />
      }
      toolbar={
        <div className="m-bottom">
          <form
            className="m-col px-4"
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
          >
            <div className="m-bar m-blur m-edge m-shadow flex items-center gap-2.5 rounded-full py-1.5 pr-1.5 pl-[18px]">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                enterKeyHint="send"
                aria-label={t("Ask Xero AI")}
                placeholder={t("Ask Xero AI about projects…")}
                className="text-fg placeholder:text-fg-tertiary min-h-10 min-w-0 flex-1 bg-transparent text-base leading-[normal] outline-none"
              />
              <button type="submit" aria-label={t("Send")} className="m-press flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--m-accent)] text-white">
                <Glyph src={`${M}/send-18.svg`} size={18} />
              </button>
            </div>
          </form>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="m-window m-sheen m-edge m-shadow m-selectable flex flex-col items-start gap-3.5 rounded-[20px] p-4">
          <p className="font-mono text-sm leading-[1.5] text-[var(--m-success)]">liveuser@xero ~ $ xero-ai --profile tuan-ngoc</p>
          <div className="bg-overlay flex items-center gap-2.5 rounded-xl py-2.5 pr-3 pl-2.5">
            <span className="flex size-[30px] shrink-0 items-center justify-center rounded-lg bg-[var(--m-accent)] text-white">
              <Glyph src={`${M}/sparkles.svg`} size={16} />
            </span>
            <span className="flex flex-col leading-[normal] whitespace-nowrap">
              <span className="text-fg text-[15px] font-semibold leading-[normal]">Xero AI Terminal</span>
              <span className="text-fg-secondary text-sm leading-[normal]">{t("Ask me anything · /help")}</span>
            </span>
          </div>
          <p className="text-fg-secondary font-mono text-sm leading-[1.5]">› {t("Who is Tuan Ngoc and what does he do right now?")}</p>
          <p className="text-fg text-base leading-[1.5]">{t("Tuan Ngoc is a UI/UX & Product Designer and a Graphic Design graduate of Greenwich University, Vietnam.")}</p>
          <Rows rows={SEED_ROWS} />
          <p className="text-fg-secondary text-base leading-[1.5]">
            {t("Strengths: user research, usability testing, design systems and cross-functional work in Agile Scrum teams.")}
          </p>
          {turns.map((turn) => {
            const result = turn.loading || turn.ai ? null : answer(turn.question);
            return (
              <Fragment key={turn.id}>
                <p className="text-fg-secondary font-mono text-sm leading-[1.5] break-words">› {turn.question}</p>
                {turn.loading ? (
                  <ThinkingDots label={t("AI is thinking")} />
                ) : turn.ai ? (
                  <p className="text-fg text-base leading-[1.5] whitespace-pre-wrap">{turn.ai}</p>
                ) : result?.kind === "timeline" ? (
                  <Rows rows={result.rows} />
                ) : (
                  <p className="text-fg text-base leading-[1.5]">{t(result?.text ?? "")}</p>
                )}
              </Fragment>
            );
          })}
          <p className="text-fg flex items-center font-mono text-sm leading-[1.5]">
            ›&nbsp;
            <span className="inline-block h-[17px] w-2 animate-[term-blink_1.06s_steps(1,end)_infinite] bg-current" />
            <span ref={end} className="scroll-mb-[140px]" />
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((cmd) => (
            <Chip key={cmd} label={cmd} onClick={() => ask(cmd)} />
          ))}
        </div>
      </div>
    </Page>
  );
}
