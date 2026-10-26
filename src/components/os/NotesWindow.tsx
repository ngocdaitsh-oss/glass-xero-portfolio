"use client";

import { useMemo, useState } from "react";
import { AppWindow, MaskIcon } from "./AppWindow";
import { useWindow } from "./window-manager";
import { useT } from "@/lib/i18n";
import { FOLDER_ICON, FOLDERS, NOTES, type Note } from "@/lib/notes";
import { NoteContent } from "@/components/notes/NoteContent";

/** Figma "Notes Window" (140:7593): 248 folders · 290 note list · editor. */
export function NotesWindow() {
  const [folder, setFolder] = useState("All notes");
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(NOTES[0].id);
  const t = useT();

  const visible = useMemo(
    () =>
      NOTES.filter((note) => (folder === "All notes" || note.folder === folder) && (note.title.toLowerCase().includes(query.toLowerCase()) || t(note.title).toLowerCase().includes(query.toLowerCase()))),
    [folder, query, t],
  );
  const note = visible.find((item) => item.id === current) ?? visible[0];
  const { state } = useWindow();
  const wide = state.maximized;
  const pinned = visible.filter((item) => item.pinned);
  const earlier = visible.filter((item) => !item.pinned);

  const noteButton = (item: Note, index: number) => {
    const on = current === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setCurrent(item.id)}
        style={{ animationDelay: `${index * 40}ms` }}
        className={`notes-item flex w-full flex-col gap-2 rounded-xl px-3 py-2.5 text-left whitespace-nowrap transition-colors duration-200 ${
          on ? "bg-overlay-strong" : "hover:bg-overlay"
        }`}
      >
        <span className="w-full truncate text-base leading-6">{t(item.title)}</span>
        <span className="flex w-full gap-2 text-sm leading-[22px]">
          <span className={`shrink-0 font-semibold ${item.pinned ? "text-accent" : "text-fg-secondary"}`}>{t(item.when)}</span>
          <span className="text-fg-tertiary min-w-0 flex-1 truncate">{t(item.summary)}</span>
        </span>
      </button>
    );
  };

  return (
    <AppWindow title="My Notes" referenceDark>
      <div className="flex h-full">
        <aside
          className={`bg-overlay-subtle os-scroll flex shrink-0 flex-col gap-1 overflow-y-auto px-3 py-4 ${wide ? "w-[20%] min-w-[248px] max-w-[320px]" : "w-[248px]"}`}
        >
          <p className="text-fg-tertiary pb-1.5 pl-2.5 text-sm leading-5 font-semibold">{t("FOLDERS")}</p>
          {FOLDERS.map((item) => {
            const on = folder === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setFolder(item.name)}
                className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left text-base leading-6 transition-colors duration-200 ${
                  on ? "bg-overlay-strong text-fg" : "text-fg-secondary hover:bg-overlay hover:text-fg"
                }`}
              >
                <MaskIcon src={FOLDER_ICON[item.name]} size={20} className={on ? "text-icon-accent" : "text-icon-secondary"} />
                <span className="min-w-0 flex-1 truncate">{t(item.name)}</span>
                <span className="text-fg-tertiary">{item.count}</span>
              </button>
            );
          })}
        </aside>
        <span className="bg-divider w-px shrink-0" />
        <div className={`flex shrink-0 flex-col gap-1 px-3 pt-3.5 pb-3 ${wide ? "w-[28%] min-w-[290px] max-w-[440px]" : "w-[290px]"}`}>
          <label className="bg-overlay focus-within:bg-overlay-strong flex items-center gap-2 rounded-[10px] px-3 py-2 transition-colors">
            <MaskIcon src="/figma/notes/search.svg" size={16} className="text-icon-secondary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search notes")}
              aria-label={t("Search notes")}
              className="placeholder:text-fg-tertiary w-full bg-transparent text-sm leading-[22px] font-semibold outline-none placeholder:font-semibold"
            />
          </label>
          <div key={folder + query} className="os-scroll -mx-1 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-1">
            {pinned.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-fg-tertiary pt-3 pb-1 pl-2.5 text-sm leading-5 font-semibold">{t("PINNED")}</p>
                {pinned.map(noteButton)}
              </div>
            )}
            {earlier.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-fg-tertiary pt-3 pb-1 pl-2.5 text-sm leading-5 font-semibold">{t("EARLIER")}</p>
                {earlier.map((item, index) => noteButton(item, index + pinned.length))}
              </div>
            )}
            {visible.length === 0 && <p className="text-fg-tertiary px-2.5 py-4 text-sm leading-5">{t("No notes in this folder.")}</p>}
          </div>
        </div>
        <span className="bg-divider w-px shrink-0" />
        <article key={note?.id ?? "none"} className="notes-pane os-scroll flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto px-9 pt-3.5 pb-5">
          {note ? <NoteBody note={note} /> : <p className="text-fg-tertiary">{t("Select a note.")}</p>}
        </article>
      </div>
    </AppWindow>
  );
}

function NoteBody({ note }: { note: Note }) {
  const t = useT();
  return (
    <>
      <p className="text-fg-tertiary text-center font-mono text-sm leading-5">{t(note.when)}</p>
      <h3 className="text-2xl leading-8 font-bold">{t(note.title)}</h3>
      <p className="text-fg-tertiary text-sm leading-5">{t(note.summary)}</p>
      <NoteContent markdown={note.body} />
    </>
  );
}
