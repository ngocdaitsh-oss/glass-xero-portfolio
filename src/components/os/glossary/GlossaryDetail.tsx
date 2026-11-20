/* eslint-disable @next/next/no-img-element -- Figma exports keep their own width and height. */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToChild, useFrameThrottle } from "@/lib/scroll";
import { GLOSSARY_FUNCTIONS } from "@/lib/glossary";
import { WindowControls } from "../AppWindow";
import { useFitZoom, useTitleBarDrag } from "../window-manager";
import { ARTICLES, ARTICLE_BY_SLUG } from "./articles";
import { Blk, EditProvider, htmlText, T, useArticleEdits } from "./edit";
import type { Article } from "./types";
import { Icon } from "./ui";

/*
 * Glossary detail — Figma 2011:28710 "Desktop — Glossary Detail · A/B Testing (Light)": breadcrumb title bar,
 * hero (eyebrows, title, definition + at-a-glance, term facts), then a 300px "Trên trang này" tracker beside the
 * 1188px article, and a back / next row. Copy comes from the article module; the Edit toggle in the title bar
 * turns the whole page into an editor (see ./edit).
 */

/** Articles that have a detail page, keyed by term name in the glossary list. */
export const GLOSSARY_ARTICLES: Record<string, string> = Object.fromEntries(ARTICLES.map((a) => [a.term, a.slug]));

export function GlossaryDetail({ slug, onBack, onOpen }: { slug: string; onBack: () => void; onOpen: (slug: string) => void }) {
  const article = ARTICLE_BY_SLUG[slug];
  const next = ARTICLES[ARTICLES.indexOf(article) + 1];
  const { sections, Body } = article;
  const drag = useTitleBarDrag();
  const scroller = useRef<HTMLDivElement>(null);
  const zoom = useFitZoom(scroller, 1872, true, 1.05);
  const edits = useArticleEdits(slug, article.version);
  const [active, setActive] = useState(sections[0].id);
  const [confirmReset, setConfirmReset] = useState(false);
  const fn = GLOSSARY_FUNCTIONS.find((f) => f.index === article.fn)!;

  const visible = sections.filter((s) => !edits.hidden.has(`sec:${s.id}`));
  const title = (id: string, fallback: string) => {
    const html = edits.text[`title:${id}`];
    return html === undefined ? fallback : htmlText(html) || fallback;
  };

  const sync = useCallback(() => {
    const root = scroller.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top;
    let current = "";
    for (const el of root.querySelectorAll<HTMLElement>("[data-g-section]")) {
      if (el.getBoundingClientRect().top - top <= 200) current = el.dataset.gSection ?? "";
    }
    // At the very bottom the last short sections can never reach the line; light the last one.
    if (root.scrollTop + root.clientHeight >= root.scrollHeight - 4) {
      const all = root.querySelectorAll<HTMLElement>("[data-g-section]");
      current = all[all.length - 1]?.dataset.gSection ?? current;
    }
    setActive(current || sections[0].id);
  }, [sections]);
  const onScroll = useFrameThrottle(sync);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    requestAnimationFrame(sync);
  }, [slug, sync]);

  const jump = useCallback((id: string) => {
    const root = scroller.current;
    const el = root?.querySelector<HTMLElement>(`#g-${id}`);
    if (root && el) scrollToChild(root, el, 32);
  }, []);

  // Escape leaves edit mode once nothing is focused for editing.
  useEffect(() => {
    if (!edits.editing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !(e.target as HTMLElement | null)?.closest?.("[contenteditable]")) edits.setEditing(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edits]);

  const n = visible.findIndex((s) => s.id === active) + 1;

  return (
    <EditProvider value={edits.ctx}>
      {/* WRK/Title Bar — Breadcrumb (147:9529): back / forward, centred crumbs, edit + window controls. */}
      <header {...drag} className="relative flex h-14 shrink-0 items-center justify-between bg-[var(--w-card)] py-2 pr-2.5 pl-3 select-none">
        <div className="flex w-[260px] items-center gap-1">
          <button
            type="button"
            aria-label="Quay lại UX Glossary"
            onClick={onBack}
            className="flex size-8 items-center justify-center rounded-lg bg-[var(--w-chip)] transition-[background-color,transform] duration-200 hover:-translate-x-0.5 hover:bg-[var(--w-toggle-on)]"
          >
            <img src="/figma/chevron-left.svg" alt="" className="theme-dark-only size-4" />
            <img src="/figma/light/chevron-left.svg" alt="" className="theme-light-only size-4" />
          </button>
          <span aria-hidden className="flex size-8 items-center justify-center opacity-40">
            <img src="/figma/chevron-right-sm.svg" alt="" className="theme-dark-only size-4" />
            <img src="/figma/light/chevron-right-sm.svg" alt="" className="theme-light-only size-4" />
          </span>
        </div>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 rounded-full bg-[var(--w-chip)] py-1 pr-2.5 pl-1.5 text-[16px] leading-6 tracking-[-0.2px]">
          <span className="pr-0.5 pl-1">
            <img src="/figma/logo.svg" alt="" className="theme-dark-only size-6" />
            <img src="/figma/light/logo.svg" alt="" className="theme-light-only size-6" />
          </span>
          <button type="button" onClick={onBack} className="rounded-md px-1.5 py-0.5 text-[var(--w-secondary)] transition-colors hover:text-[var(--w-text)]">
            Glossary
          </button>
          <span className="text-[var(--w-muted)]">›</span>
          <button type="button" onClick={onBack} className="rounded-md px-1.5 py-0.5 text-[var(--w-secondary)] transition-colors hover:text-[var(--w-text)]">
            {fn.name}
          </button>
          <span className="text-[var(--w-muted)]">›</span>
          <span className="px-1.5 py-0.5">{article.term}</span>
        </nav>
        <div className="flex w-[260px] items-center justify-end gap-2">
          <button
            type="button"
            aria-pressed={edits.editing}
            onClick={() => edits.setEditing(!edits.editing)}
            className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-[14px] leading-5 font-semibold transition-colors duration-200 ${
              edits.editing ? "bg-[var(--d-fill)] text-white" : "bg-[var(--w-chip)] text-[var(--w-secondary)] hover:text-[var(--w-text)]"
            }`}
          >
            <Icon name="pencil" size={16} />
            {edits.editing ? "Đang sửa" : "Sửa trang"}
          </button>
          <WindowControls buttonClassName="h-8 w-8 text-[var(--w-muted)] hover:bg-[var(--w-chip)]" />
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scroller}
          onScroll={onScroll}
          className={`os-scroll g-detail h-full overflow-y-auto ${edits.editing ? "is-editing" : ""}`}
          style={{ overflowX: "clip" }}
        >
          <div className="mx-auto w-[1872px] px-[156px] pt-[88px] pb-[120px]" style={{ zoom }}>
            <Hero article={article} fnLabel={`${String(fn.index).padStart(2, "0")} · ${fn.stage} — ${fn.name}`} />

            <div className="mt-[120px] flex items-start gap-[72px]">
              {/* Progress Tracker — Glossary · Expanded (2012:28886) */}
              <aside className="sticky top-8 w-[300px] shrink-0">
                <nav aria-label="Trên trang này" className="flex flex-col gap-0.5 rounded-[18px] bg-[var(--d-well)] px-2.5 py-3.5">
                  <div className="flex justify-between px-2 pb-1.5 text-[14px] leading-5">
                    <span className="font-semibold">Trên trang này</span>
                    <span className="text-[var(--w-muted)]">
                      {String(Math.max(1, n)).padStart(2, "0")}/{String(visible.length).padStart(2, "0")}
                    </span>
                  </div>
                  {visible.map((s) => {
                    const on = s.id === active;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-current={on ? "true" : undefined}
                        onClick={() => jump(s.id)}
                        className={`flex min-h-[38px] items-center gap-2.5 rounded-[10px] px-2.5 py-[7px] text-left transition-colors duration-200 ${
                          on ? "bg-[var(--d-well-on)]" : "hover:bg-[var(--d-well-on)]"
                        }`}
                      >
                        <span className={`h-[18px] w-[3px] shrink-0 rounded-sm transition-colors duration-200 ${on ? "bg-[var(--d-fill)]" : "bg-transparent"}`} />
                        <Icon name={s.icon} size={20} className={on ? "text-[var(--d-accent)]" : "text-[var(--w-muted)]"} />
                        <span
                          className={`min-w-0 flex-1 text-[15px] leading-[22px] tracking-[-0.2px] ${on ? "font-semibold text-[var(--w-text)]" : "text-[var(--w-secondary)]"}`}
                        >
                          {title(s.id, s.title)}
                        </span>
                      </button>
                    );
                  })}
                </nav>
                <button type="button" onClick={onBack} className="px-[18px] pt-5 text-[16px] leading-6 font-semibold tracking-[-0.2px] text-[var(--d-accent)] hover:underline">
                  ← Quay lại UX Glossary
                </button>
              </aside>

              <main className="min-w-0 flex-1">
                <Body />
                {/* Back (2017:29142) */}
                <div className="mt-[120px] flex items-end justify-between border-t border-[var(--d-line)] pt-10">
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex h-[52px] items-center gap-3 rounded-full bg-[var(--w-active-bg)] px-6 text-[18px] leading-7 font-semibold text-[var(--w-active-fg)] transition-transform duration-200 hover:-translate-x-0.5"
                  >
                    ← Quay lại UX Glossary
                  </button>
                  {/* Next term (2017:29146): only when the next term has its own article. */}
                  {next ? (
                    <button type="button" onClick={() => onOpen(next.slug)} className="group/next flex flex-col items-end gap-1 text-right">
                      <span className="font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-muted)]">THUẬT NGỮ TIẾP THEO</span>
                      <span className="text-[22px] leading-[30px] font-semibold tracking-[-0.4px] text-[var(--d-accent)] transition-transform duration-200 group-hover/next:translate-x-0.5">
                        {next.term} →
                      </span>
                    </button>
                  ) : null}
                </div>
              </main>
            </div>
          </div>
        </div>

        {edits.editing ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-[var(--d-ink)] py-2 pr-2 pl-5 text-[14px] leading-5 text-[var(--d-ink-fg)] shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
              <Icon name="pencil" size={16} />
              <span>
                Bấm vào chữ để sửa · nút <b>×</b> để xóa khối · tự lưu trên trình duyệt này
                {edits.changes ? ` · ${edits.changes} thay đổi` : ""}
              </span>
              {confirmReset ? (
                <span className="flex items-center gap-1.5">
                  <span className="text-[var(--d-ink-sub)]">Bỏ hết thay đổi?</span>
                  <button
                    type="button"
                    onClick={() => {
                      edits.reset();
                      setConfirmReset(false);
                    }}
                    className="rounded-full bg-[var(--d-bad)] px-3.5 py-1.5 font-semibold text-white"
                  >
                    Khôi phục
                  </button>
                  <button type="button" onClick={() => setConfirmReset(false)} className="rounded-full px-3 py-1.5 text-[var(--d-ink-sub)] hover:text-[var(--d-ink-fg)]">
                    Hủy
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  disabled={!edits.changes}
                  onClick={() => setConfirmReset(true)}
                  className="rounded-full px-3.5 py-1.5 text-[var(--d-ink-sub)] transition-colors enabled:hover:text-[var(--d-ink-fg)] disabled:opacity-40"
                >
                  Khôi phục bản gốc
                </button>
              )}
              <button type="button" onClick={() => edits.setEditing(false)} className="rounded-full bg-[var(--d-fill)] px-4 py-1.5 font-semibold text-white">
                Xong
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </EditProvider>
  );
}

/** Section — Hero (2011:28797). */
function Hero({ article, fnLabel }: { article: Article; fnLabel: string }) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2.5 rounded-full bg-[var(--w-card)] py-[7px] pr-3.5 pl-3">
          <Icon name="flask" size={18} className="text-[var(--d-accent)]" />
          <span className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)]">UX GLOSSARY</span>
        </span>
        <span className="rounded-full bg-[var(--w-card)] py-[7px] pr-3.5 pl-3 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)] uppercase">
          {fnLabel}
        </span>
        <span className="rounded-full bg-[var(--w-card)] py-[7px] pr-3.5 pl-3 font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)] uppercase">
          <T>{article.kind}</T>
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <T as="h1" className="font-display text-[136px] leading-[136px] tracking-[-5px]">
          {article.term}
        </T>
        <T as="p" className="text-[32px] leading-[42px] tracking-[-0.8px] text-[var(--w-secondary)]">
          {article.vi}
        </T>
      </div>
      <div className="flex overflow-hidden rounded-[28px] bg-[var(--w-card)]">
        <div className="flex min-w-0 flex-1 flex-col gap-6 px-14 py-12">
          <T as="p" className="text-[30px] leading-[42px] font-semibold tracking-[-0.8px]">
            {article.definition}
          </T>
          <T as="p" className="text-[20px] leading-8 tracking-[-0.3px] text-[var(--w-secondary)]">
            {article.definitionMore}
          </T>
        </div>
        {/* At a glance */}
        <div className="flex w-[440px] shrink-0 flex-col gap-5 rounded-[28px] bg-[var(--d-fill)] p-12 text-white">
          <T as="p" className="text-[24px] leading-[34px] font-semibold tracking-[-0.5px]">
            {article.oneLine}
          </T>
          <div className="mt-auto flex gap-3">
            {article.glance.map(([k, v], i) => (
              <div key={i} className="flex flex-1 flex-col gap-1 rounded-2xl bg-white/12 px-5 py-4">
                <span className="text-[40px] leading-[44px] font-bold tracking-[-1.5px]">{k}</span>
                <T className="text-[16px] leading-6 tracking-[-0.2px]">{v}</T>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Term facts */}
      <div className="flex overflow-hidden rounded-[28px] bg-[var(--w-card)]">
        {article.facts.map((f, i) => (
          <Blk key={f.label} label="mục" className={`flex flex-1 flex-col gap-4 px-9 pt-8 pb-9 ${i ? "border-l border-[var(--d-line)]" : ""}`}>
            <T className="font-mono text-[18px] leading-[26px] tracking-[0.4px] text-[var(--w-secondary)] uppercase">{f.label}</T>
            <div className="flex flex-col gap-1.5">
              {f.items.map((it) => (
                <T key={it} as="p" className="text-[20px] leading-[30px] tracking-[-0.5px]">
                  {it}
                </T>
              ))}
            </div>
          </Blk>
        ))}
      </div>
    </section>
  );
}
