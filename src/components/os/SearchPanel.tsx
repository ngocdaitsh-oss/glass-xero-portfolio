/* eslint-disable @next/next/no-img-element -- existing OS icon exports keep their native art. */
"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { apps, type AppId } from "@/lib/apps";
import { useT } from "@/lib/i18n";
import { rankSearch, SEARCH_APP_KEYWORDS, SEARCH_PAGES, SEARCH_SUGGESTED, SEARCH_WORKS } from "@/lib/search";
import { MaskIcon } from "./AppWindow";
import { GlassEdge } from "./primitives";

const SEARCH_APPS: { id: AppId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "mail", label: "Mail" },
  { id: "ai-workflow", label: "AI Workflow" },
  { id: "notes", label: "Notes" },
  { id: "terminal", label: "Terminal" },
  { id: "photos", label: "Photos" },
  { id: "about", label: "About me" },
];

export function SearchPanel({
  open,
  onClose,
  onOpenApp,
  onOpenWork,
}: {
  open: boolean;
  onClose: () => void;
  onOpenApp: (app: AppId) => void;
  onOpenWork: (id: string) => void;
}) {
  const t = useT();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visibleApps = useMemo(
    () =>
      q
        ? rankSearch(q, SEARCH_APPS, (app) => [app.label, t(app.label), ...(SEARCH_APP_KEYWORDS[app.id] ?? [])]).map((app) => app.id)
        : SEARCH_SUGGESTED,
    [q, t],
  );
  const works = rankSearch(q, SEARCH_WORKS, (work) => [work.title, work.meta, t(work.title), t(work.meta), ...(work.keywords ?? [])]);
  const pages = rankSearch(q, SEARCH_PAGES, (page) => [page.title, page.meta, t(page.title), t(page.meta), ...(page.keywords ?? [])]);
  const empty = !visibleApps.length && !works.length && !pages.length;

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => input.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const openApp = (app: AppId) => {
    onClose();
    onOpenApp(app);
  };

  const openWork = (id: string) => {
    onClose();
    onOpenWork(id);
  };

  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={`absolute inset-0 z-[45] flex items-center justify-center px-6 py-16 transition-[opacity,background-color,backdrop-filter] duration-200 ${
        open
          ? "bg-black/35 opacity-100 backdrop-blur-[10px]"
          : "pointer-events-none bg-black/0 opacity-0 backdrop-blur-none"
      }`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={t("Search")}
        style={{ transform: open ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 12px, 0) scale(0.97)" }}
        className={`glass glass-panel shadow-panel text-fg relative flex max-h-[min(720px,calc(100%-32px))] w-[860px] max-w-full origin-center flex-col overflow-hidden rounded-[22px] select-text transition-[opacity,transform] duration-[220ms] ${
          open
            ? "opacity-100 ease-[cubic-bezier(0,0,0.2,1)]"
            : "opacity-0 ease-[cubic-bezier(0.4,0,1,1)]"
        }`}
      >
        <div className="os-scroll min-h-0 flex-1 overflow-y-auto p-6">
          <label className="bg-overlay border-divider focus-within:border-[var(--azure-300)] focus-within:ring-[3px] focus-within:ring-[rgba(33,115,214,0.18)] flex h-12 items-center gap-3 rounded-[14px] border px-4 transition-[border-color,box-shadow]">
            <MaskIcon src="/figma/search.svg" size={22} className="text-icon-secondary" />
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Search apps, works, pages")}
              aria-label={t("Search apps, works, pages")}
              className="text-fg placeholder:text-fg-tertiary min-w-0 flex-1 bg-transparent text-base leading-6 outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-fg-tertiary hover:bg-overlay-strong hover:text-fg flex size-7 items-center justify-center rounded-lg"
                aria-label={t("Clear")}
              >
                <MaskIcon src="/figma/window/close.svg" size={16} />
              </button>
            ) : null}
          </label>

          {visibleApps.length ? (
            <SearchSection title={t(q ? "APPS" : "SUGGESTIONS")} className="mt-6">
              <div className="bg-overlay grid grid-cols-4 gap-3 rounded-2xl p-3 tablet:grid-cols-3">
                {visibleApps.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => openApp(id)}
                    className="hover:bg-overlay-strong focus-visible:ring-[var(--azure-300)] flex min-w-0 items-center gap-3 rounded-xl p-3 text-left outline-none transition-colors duration-150 focus-visible:ring-2"
                  >
                    <SearchAppIcon id={id} />
                    <span className="truncate text-sm leading-[22px] font-semibold">
                      {t(SEARCH_APPS.find((app) => app.id === id)?.label ?? id)}
                    </span>
                  </button>
                ))}
              </div>
            </SearchSection>
          ) : null}

          <div className="mt-6 grid grid-cols-2 items-start gap-5 tablet:gap-4">
            {works.length ? (
              <SearchSection title={t("WORKS")}>
                <div className="bg-overlay overflow-hidden rounded-2xl p-2">
                  {works.map((work) => (
                    <SearchRow key={work.id} title={work.title} meta={t(work.meta)} onClick={() => openWork(work.id)} />
                  ))}
                </div>
              </SearchSection>
            ) : null}

            {pages.length ? (
              <SearchSection title={t("PAGES")}>
                <div className="bg-overlay overflow-hidden rounded-2xl p-2">
                  {pages.map((page) => (
                    <SearchRow key={page.app} title={t(page.title)} meta={t(page.meta)} onClick={() => openApp(page.app)} />
                  ))}
                </div>
              </SearchSection>
            ) : null}
          </div>

          {empty ? (
            <p className="text-fg-secondary py-16 text-center text-base leading-6">
              {t("No results for “{q}”", { q: query.trim() })}
            </p>
          ) : null}
        </div>
        <GlassEdge />
      </section>
    </div>
  );
}

function SearchSection({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`min-w-0 ${className}`}>
      <p className="text-fg-tertiary mb-2 font-mono text-xs leading-5 tracking-[0.08em]">{title}</p>
      {children}
    </section>
  );
}

function SearchRow({ title, meta, onClick }: { title: string; meta: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-overlay-strong focus-visible:ring-[var(--azure-300)] flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left outline-none transition-colors duration-150 focus-visible:ring-2"
    >
      <span className="min-w-0 flex-1">
        <span className="text-fg block truncate text-sm leading-[22px] font-semibold">{title}</span>
        <span className="text-fg-tertiary block truncate text-xs leading-5">{meta}</span>
      </span>
      <MaskIcon src="/figma/chevron-right-sm.svg" size={18} className="text-icon-secondary" />
    </button>
  );
}

function SearchAppIcon({ id }: { id: AppId }) {
  if (id === "about") {
    return (
      <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-b from-[#8cc4ff] to-[#1a5bb0] shadow-[0_6px_14px_var(--effect-shadow)]">
        <img src="/figma/mobile/logo.svg" alt="" className="size-8" />
      </span>
    );
  }
  const definition = apps[id as Exclude<AppId, "about">];
  return <img src={definition.desktopIcon} alt="" className="size-12 shrink-0 object-contain" />;
}
