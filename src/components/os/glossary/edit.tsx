"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ClipboardEvent,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/*
 * In-page editing for a glossary article. Every piece of copy is wrapped in <T> and every block that can be
 * removed in <Blk>. Edit mode makes the copy contentEditable; changes are saved per browser (localStorage)
 * as { text: id → html, hidden: [block ids] }, so the source content in code stays untouched and "Khôi phục
 * bản gốc" brings it back.
 *
 * Ids come from useId(), which is stable for a given component tree, so the tree must render the same
 * components in both modes (blocks hide their output, they never unmount themselves). Bump `version` in
 * the article when its structure changes: older saved edits are then ignored instead of landing on the
 * wrong element.
 */

type Saved = { text: Record<string, string>; hidden: string[] };
const EMPTY: Saved = { text: {}, hidden: [] };

type Ctx = {
  editing: boolean;
  text: Record<string, string>;
  hidden: Set<string>;
  epoch: number;
  setText: (id: string, html: string) => void;
  setHidden: (id: string, hide: boolean) => void;
};

const EditCtx = createContext<Ctx>({
  editing: false,
  text: {},
  hidden: new Set(),
  epoch: 0,
  setText: () => {},
  setHidden: () => {},
});

export const useEdit = () => useContext(EditCtx);

function read(key: string): Saved {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return EMPTY;
    const v = JSON.parse(raw) as Partial<Saved>;
    return { text: v.text ?? {}, hidden: v.hidden ?? [] };
  } catch {
    return EMPTY;
  }
}

function write(key: string, v: Saved) {
  try {
    if (!Object.keys(v.text).length && !v.hidden.length) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* private mode or full storage: edits just don't persist */
  }
}

export function useArticleEdits(slug: string, version: number) {
  const key = `glossary-edit:${slug}:v${version}`;
  const [saved, setSaved] = useState<Saved>(EMPTY);
  const [epoch, setEpoch] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Read after mount so the server render and the first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
    setSaved(read(key));
  }, [key]);

  const update = useCallback(
    (fn: (s: Saved) => Saved) =>
      setSaved((s) => {
        const next = fn(s);
        write(key, next);
        return next;
      }),
    [key],
  );

  const setText = useCallback((id: string, html: string) => update((s) => ({ ...s, text: { ...s.text, [id]: html } })), [update]);
  const setHidden = useCallback(
    (id: string, hide: boolean) => update((s) => ({ ...s, hidden: hide ? [...new Set([...s.hidden, id])] : s.hidden.filter((h) => h !== id) })),
    [update],
  );
  const reset = useCallback(() => {
    update(() => EMPTY);
    setEpoch((e) => e + 1); // remount every <T> so React rebuilds the DOM the editor changed
  }, [update]);

  const changes = Object.keys(saved.text).length + saved.hidden.length;
  const ctx = useMemo<Ctx>(
    () => ({ editing, text: saved.text, hidden: new Set(saved.hidden), epoch, setText, setHidden }),
    [editing, saved, epoch, setText, setHidden],
  );
  return { ctx, editing, setEditing, reset, changes, text: saved.text, hidden: ctx.hidden };
}

export function EditProvider({ value, children }: { value: Ctx; children: ReactNode }) {
  return <EditCtx.Provider value={value}>{children}</EditCtx.Provider>;
}

const before = new WeakMap<HTMLElement, string>();

/** Pastes as plain text so copied formatting from elsewhere never leaks into the page. */
function pastePlain(e: ClipboardEvent<HTMLElement>) {
  e.preventDefault();
  const text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
}

/**
 * Editable copy. `k` pins the id (used where something else reads the text back, like the table of
 * contents); otherwise the id is the component's position in the tree.
 */
export function T({
  as = "span",
  k,
  className,
  style,
  children,
}: {
  as?: ElementType;
  k?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const auto = useId();
  const id = k ?? auto;
  const { editing, text, epoch, setText } = useEdit();
  const override = text[id];

  const props = {
    // A new key when the element switches between React children and saved html: React then replaces the
    // element instead of diffing children the editor may already have removed.
    key: `${epoch}-${override === undefined ? "src" : "html"}`,
    className: `${className ?? ""} ${editing ? "g-editable" : ""}`,
    style,
    "data-edit-id": id,
    contentEditable: editing || undefined,
    suppressContentEditableWarning: true,
    spellCheck: editing ? false : undefined,
    // The html at focus time lives on the element itself, so blur can tell whether anything changed.
    onFocus: editing ? (e: { currentTarget: HTMLElement }) => void before.set(e.currentTarget, e.currentTarget.innerHTML) : undefined,
    onBlur: editing
      ? (e: { currentTarget: HTMLElement }) => {
          const el = e.currentTarget;
          if (el.innerHTML !== before.get(el)) setText(id, el.innerHTML);
          before.delete(el);
        }
      : undefined,
    onPaste: editing ? pastePlain : undefined,
    onKeyDown: editing
      ? (e: { key: string; currentTarget: HTMLElement }) => {
          if (e.key === "Escape") e.currentTarget.blur();
        }
      : undefined,
  };
  return override === undefined ? createElement(as, props, children) : createElement(as, { ...props, dangerouslySetInnerHTML: { __html: override } });
}

/**
 * A block the editor can delete. Out of edit mode a deleted block renders nothing; in edit mode it stays as a
 * faint ghost with an "Hoàn tác" button so a delete is never a dead end.
 */
export function Blk({
  as = "div",
  k,
  className,
  style,
  children,
  label = "khối",
}: {
  as?: ElementType;
  k?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  label?: string;
}) {
  const auto = useId();
  const id = k ?? auto;
  const { editing, hidden, setHidden } = useEdit();
  const gone = hidden.has(id);
  if (gone && !editing) return null;
  return createElement(
    as,
    { className: `${className ?? ""} g-blk ${editing ? "is-editing" : ""} ${gone ? "is-gone" : ""}`, style, "data-blk": id },
    children,
    editing ? (
      <button
        key="g-blk-btn"
        type="button"
        contentEditable={false}
        onClick={() => setHidden(id, !gone)}
        className={`g-blk-btn ${gone ? "is-undo" : ""}`}
        aria-label={gone ? `Hoàn tác xóa ${label}` : `Xóa ${label}`}
        title={gone ? "Hoàn tác" : `Xóa ${label}`}
      >
        {gone ? (
          <span className="px-1 text-[13px] leading-5 font-semibold">Hoàn tác</span>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    ) : null,
  );
}

/** Plain text of an edited html string (for the table of contents). */
export const htmlText = (html: string) => html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
