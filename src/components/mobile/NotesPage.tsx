"use client";

import { useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { NOTES } from "@/lib/notes";
import { NoteContent } from "@/components/notes/NoteContent";
import { Card, Glyph, ListCard, ListRow, M, NavBar, Page, Toolbar } from "./parts";

/** Mobile — My Notes (369:21930): the pinned LMS usability-test note; search finds the others. */
export function NotesPage({
  onHome,
  onOpenApp,
  onMore,
}: {
  onHome: () => void;
  onOpenApp: (app: "mail" | "photos") => void;
  onMore: (el: HTMLElement) => void;
}) {
  const t = useT();
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(NOTES[0].id);
  const [done, setDone] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const note = NOTES.find((item) => item.id === current) ?? NOTES[0];
  const q = query.trim().toLowerCase();
  const results = q ? NOTES.filter((item) => [item.title, item.summary].some((text) => text.toLowerCase().includes(q) || t(text).toLowerCase().includes(q))) : [];

  return (
    <Page
      onHome={onHome}
      nav={
        <NavBar
          variant="large"
          title={t(note.folder)}
          back={{ label: t("Folders"), onClick: onHome }}
          actions={[
            { icon: `${M}/search-20.svg`, label: t("Search notes"), onClick: () => search.current?.focus() },
            { icon: `${M}/more-20.svg`, label: t("More"), onClick: onMore },
          ]}
        />
      }
      toolbar={
        <Toolbar
          buttons={[
            { icon: `${M}/check-24.svg`, label: t("Mark as reviewed"), onClick: () => setDone((v) => !v), pressed: done },
            { icon: `${M}/image-24.svg`, label: t("My Photos"), onClick: () => onOpenApp("photos") },
            { icon: `${M}/attach-24.svg`, label: t("Leave an email"), onClick: () => onOpenApp("mail") },
          ]}
          trailing={
            <button
              type="button"
              aria-label={t("New message")}
              onClick={() => onOpenApp("mail")}
              className="m-press flex size-12 shrink-0 items-center justify-center rounded-3xl bg-[var(--m-accent)] text-white"
            >
              <Glyph src={`${M}/plus.svg`} size={22} />
            </button>
          }
        />
      }
    >
      <div className="flex flex-col gap-4">
        <label className="bg-overlay flex min-h-[42px] items-center gap-2 rounded-xl px-3 py-2.5">
          <Glyph src={`${M}/search-18.svg`} size={18} className="text-fg-tertiary" />
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search notes")}
            aria-label={t("Search notes")}
            className="text-fg placeholder:text-fg-tertiary min-w-0 flex-1 bg-transparent text-base leading-[normal] outline-none [&::-webkit-search-cancel-button]:hidden"
          />
        </label>

        {!q ? (
          <div className="os-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label={t("My Notes")}>
            {NOTES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === note.id}
                onClick={() => setCurrent(item.id)}
                className={`m-press shrink-0 rounded-full px-3 py-2 font-mono text-sm leading-[normal] font-semibold ${
                  item.id === note.id ? "bg-[var(--m-accent)] text-white" : "bg-overlay text-fg-secondary"
                }`}
              >
                {t(item.when)}
              </button>
            ))}
          </div>
        ) : null}

        {q ? (
          results.length ? (
            <ListCard>
              {results.map((item) => (
                <ListRow
                  key={item.id}
                  title={t(item.title)}
                  subtitle={`${t(item.when)} · ${t(item.summary)}`}
                  chevron
                  onClick={() => {
                    setCurrent(item.id);
                    setQuery("");
                    window.scrollTo({ top: 0 });
                  }}
                />
              ))}
            </ListCard>
          ) : (
            <p className="text-fg-secondary py-4 text-center text-base leading-[normal]">{t("No notes match “{q}”", { q: query.trim() })}</p>
          )
        ) : (
          <Card key={note.id} className="notes-pane m-selectable flex flex-col items-start gap-3 p-4">
            <p className="text-fg-tertiary font-mono text-sm leading-[normal]">{t(note.when)}</p>
            <h2 className="text-fg text-[22px] leading-[1.25] font-semibold">{t(note.title)}</h2>
            <p className="text-fg-tertiary text-sm leading-[1.4]">{t(note.summary)}</p>
            <NoteContent markdown={note.body} mobile />
          </Card>
        )}
      </div>
    </Page>
  );
}
