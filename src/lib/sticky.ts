import { useEffect, type RefObject } from "react";

/**
 * Sticky story rows (AI Workflow "StickyStory", reused by the bave Wireframing section).
 *
 * Inside `root`, every `[data-story]` row holds a `[data-copy]` text column next to a
 * taller visual. While the row scrolls past, the copy is shifted down with a transform
 * so it stays `offset` px under the scroller's top edge, until its bottom meets the
 * row's bottom (the visual's end); then it scrolls away with the row and the next row
 * takes over. `position: sticky` is not used: it is unreliable inside the zoomed column.
 *
 * One pass per frame: every row is read first, then written, so scrolling never forces layout.
 */
export function useStickyCopy(root: RefObject<HTMLElement | null>, scrollerSelector: string, offset = 16, deps: unknown[] = []) {
  useEffect(() => {
    const rootEl = root.current;
    const scroller = rootEl?.closest(scrollerSelector) as HTMLElement | null;
    if (!rootEl || !scroller) return;

    let raf = 0;
    const rows = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-story]")).map((row) => ({
      row,
      copy: row.querySelector<HTMLElement>("[data-copy]"),
      last: -1,
    }));
    const update = () => {
      raf = 0;
      const stick = scroller.getBoundingClientRect().top + offset;
      const zoom = rootEl.offsetHeight > 0 ? rootEl.getBoundingClientRect().height / rootEl.offsetHeight : 1;
      const shifts = rows.map(({ row, copy }) => {
        if (!copy) return 0;
        const travel = Math.max(0, row.offsetHeight - copy.offsetHeight);
        const local = (stick - row.getBoundingClientRect().top) / (zoom || 1);
        return Math.round(Math.min(travel, Math.max(0, local)));
      });
      rows.forEach((item, i) => {
        if (!item.copy || item.last === shifts[i]) return;
        item.last = shifts[i];
        item.copy.style.transform = `translate3d(0, ${shifts[i]}px, 0)`;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers pass what changes the row set
  }, [root, scrollerSelector, offset, ...deps]);
}
