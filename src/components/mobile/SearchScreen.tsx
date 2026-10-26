"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AppId } from "@/lib/apps";
import { useT } from "@/lib/i18n";
import { rankSearch, SEARCH_APP_KEYWORDS, SEARCH_PAGES, SEARCH_SUGGESTED, SEARCH_WORKS } from "@/lib/search";
import { AppGlyph, GRID } from "./Home";
import { Glyph, HomeIndicator, ListRow, M, StatusBar } from "./parts";

const LIST = "m-window m-edge m-shadow-lg flex flex-col rounded-[18px] px-4 py-1";

/** Mobile — Search (430:30640): blurred home behind a search panel; the field filters every section. */
export function SearchScreen({
  onClose,
  onOpen,
  onOpenWork,
}: {
  onClose: () => void;
  onOpen: (app: AppId, el: HTMLElement | null) => void;
  onOpenWork: (id: string) => void;
}) {
  const t = useT();
  const [query, setQuery] = useState("");
  const [leaving, setLeaving] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const close = (then?: () => void) => {
    if (leaving) return;
    setLeaving(true);
    input.current?.blur();
    window.setTimeout(() => {
      onClose();
      then?.();
    }, 200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const q = query.trim().toLowerCase();
  const apps = useMemo(
    () =>
      q
        ? rankSearch(
            q,
            GRID.filter((app) => app.id !== "linkedin"),
            (app) => [app.label, t(app.label), ...(SEARCH_APP_KEYWORDS[app.id] ?? [])],
          ).map((app) => app.id)
        : SEARCH_SUGGESTED,
    [q, t],
  );
  const works = rankSearch(q, SEARCH_WORKS, (work) => [work.title, work.meta, t(work.title), t(work.meta), ...(work.keywords ?? [])]);
  const pages = rankSearch(q, SEARCH_PAGES, (page) => [page.title, page.meta, t(page.title), t(page.meta), ...(page.keywords ?? [])]);
  const empty = !apps.length && !works.length && !pages.length;

  return (
    <div className="m-overlay fixed inset-0 z-[85] overflow-y-auto overscroll-contain" role="dialog" aria-label={t("Search")}>
      <div aria-hidden className={`m-window m-blur fixed inset-0 ${leaving ? "m-fade-out" : "m-fade-in"}`} />
      <div className={`relative min-h-full ${leaving ? "m-search-out" : "m-search-in"}`}>
        <StatusBar />
        <div className="m-col flex flex-col gap-6 px-4 pt-2 pb-16">
          <div className="flex items-center gap-3">
            <label className="bg-overlay flex min-h-[42px] min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2.5">
              <Glyph src={`${M}/search-18.svg`} size={18} className="text-fg-tertiary" />
              <input
                ref={input}
                type="search"
                enterKeyHint="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Search apps, works, pages")}
                aria-label={t("Search apps, works, pages")}
                className="text-fg placeholder:text-fg-tertiary min-w-0 flex-1 bg-transparent text-base leading-[normal] outline-none [&::-webkit-search-cancel-button]:hidden"
              />
            </label>
            <button type="button" onClick={() => close()} className="text-fg min-h-11 shrink-0 text-sm leading-[normal]">
              {t("Cancel")}
            </button>
          </div>

          {apps.length ? (
            <section className="flex flex-col gap-2">
              <p className="text-fg-tertiary font-mono text-sm leading-[normal]">{t(q ? "APPS" : "SUGGESTIONS")}</p>
              <div className="m-window m-edge m-shadow-lg flex flex-wrap items-start justify-start gap-x-4 gap-y-4 rounded-[18px] px-2 py-4">
                {apps.map((id) => (
                  <button
                    key={id}
                    type="button"
                    data-m-icon={`search:${id}`}
                    onClick={(e) => close(() => onOpen(id, e.currentTarget.isConnected ? e.currentTarget : null))}
                    className="m-press flex w-20 shrink-0 flex-col items-center gap-1.5"
                  >
                    <AppGlyph id={id} />
                    <span className="text-fg text-sm leading-[normal] whitespace-nowrap">{t(GRID.find((app) => app.id === id)?.label ?? id)}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {works.length ? (
            <section className="flex flex-col gap-2">
              <p className="text-fg-tertiary font-mono text-sm leading-[normal]">{t("WORKS")}</p>
              <div className={LIST}>
                {works.map((work) => (
                  <ListRow key={work.id} title={work.title} subtitle={t(work.meta)} chevron onClick={() => close(() => onOpenWork(work.id))} />
                ))}
              </div>
            </section>
          ) : null}

          {pages.length ? (
            <section className="flex flex-col gap-2">
              <p className="text-fg-tertiary font-mono text-sm leading-[normal]">{t("PAGES")}</p>
              <div className={LIST}>
                {pages.map((page) => (
                  <ListRow key={page.app} title={t(page.title)} subtitle={t(page.meta)} chevron onClick={() => close(() => onOpen(page.app, null))} />
                ))}
              </div>
            </section>
          ) : null}

          {empty ? <p className="text-fg-secondary py-6 text-center text-base leading-[normal]">{t("No results for “{q}”", { q: query.trim() })}</p> : null}
        </div>
        <HomeIndicator fixed />
      </div>
    </div>
  );
}
