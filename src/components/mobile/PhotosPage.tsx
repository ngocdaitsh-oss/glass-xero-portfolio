/* eslint-disable @next/next/no-img-element -- mockups are fixed Figma exports. */
"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { MOBILE_PHOTOS, PHOTOS, type MobilePhoto } from "@/lib/photos";
import { HomeIndicator, ListCard, ListRow, M, NavBar, Segmented, StatusBar, Toolbar } from "./parts";

type View = "years" | "albums" | "all";

const workOf = (photo: MobilePhoto) => PHOTOS.find((item) => item.id === photo.work)!;

/** Mobile — My Photos (369:22050) and Photo Preview (369:22130). */
export function PhotosPage({
  onHome,
  onSearch,
  onMore,
  onOpenWork,
}: {
  onHome: () => void;
  onSearch: (el: HTMLElement) => void;
  onMore: (el: HTMLElement) => void;
  onOpenWork: (id: string) => void;
}) {
  const t = useT();
  const [view, setView] = useState<View>("years");
  const [favorites, setFavorites] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const show = (index: number | null) => {
    setOpen(index);
    window.scrollTo({ top: 0 });
  };

  if (open !== null) {
    return <Preview index={open} onIndex={setOpen} onBack={() => show(null)} onHome={onHome} onMore={onMore} onOpenWork={onOpenWork} />;
  }

  const visible = favorites ? MOBILE_PHOTOS.filter((photo) => workOf(photo).favorite) : MOBILE_PHOTOS;
  const groups: { title: string; meta: string; photos: MobilePhoto[] }[] =
    view === "all"
      ? [{ title: t("All Photos"), meta: t("{n} mockups", { n: visible.length }), photos: visible }]
      : view === "albums"
        ? (["UI/UX projects", "Brand identity"] as const).map((album) => {
            const photos = visible.filter((photo) => workOf(photo).album === album);
            return { title: t(album), meta: t("{n} mockups", { n: photos.length }), photos };
          })
        : (["2024", "2022 – 2023"] as const).map((group) => {
            // Years (Figma): 2024 shows SAPP LMS ×2 and bave; 2022 – 2023 shows two each of BSC, Thực Vị Thiên and 98rum.
            const photos = visible.filter((photo) => photo.group === group && photo.id !== "bave-2");
            const names = [...new Set(photos.map((photo) => workOf(photo).title.split(" — ")[0]))];
            return { title: group, meta: names.join(" · "), photos };
          });

  return (
    <>
      <div className="m-page-body relative">
        <StatusBar />
        <div className="m-col">
          <NavBar
            variant="large"
            title={t("Library")}
            back={{ label: t("Home"), onClick: onHome }}
            actions={[
              { icon: `${M}/search-20.svg`, label: t("Search"), onClick: onSearch },
              { icon: `${M}/more-20.svg`, label: t("More"), onClick: onMore },
            ]}
          />
          <div className="flex flex-col gap-4 px-4 pt-3" style={{ paddingBottom: "calc(88px + env(safe-area-inset-bottom) / var(--m-zoom, 1))" }}>
            <Segmented
              items={[
                { id: "years", label: t("Years") },
                { id: "albums", label: t("Albums") },
                { id: "all", label: t("All Photos") },
              ]}
              value={view}
              onChange={setView}
            />
            <div key={view + favorites} className="about-pane flex flex-col gap-4">
              {groups.map((group) =>
                group.photos.length ? (
                  <section key={group.title} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 leading-[normal] whitespace-nowrap">
                      <h2 className="text-fg text-xl font-semibold leading-[normal]">{group.title}</h2>
                      <p className="text-fg-secondary truncate text-sm leading-[normal]">{group.meta}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-[3px]">
                      {group.photos.map((photo) => (
                        <button
                          key={photo.id}
                          type="button"
                          aria-label={workOf(photo).title}
                          onClick={() => show(MOBILE_PHOTOS.indexOf(photo))}
                          className="m-press relative block aspect-square overflow-hidden rounded-md"
                        >
                          <img src={photo.src} alt="" loading="lazy" className="absolute inset-0 size-full rounded-md object-cover" />
                        </button>
                      ))}
                    </div>
                  </section>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </div>
      <Toolbar
        center
        buttons={[
          { icon: `${M}/grid-24.svg`, label: t("All Photos"), onClick: () => setView("all") },
          { icon: `${M}/camera-24.svg`, label: t("Years"), onClick: () => setView("years") },
          { icon: `${M}/star-24.svg`, label: t("Favorites"), onClick: () => setFavorites((v) => !v), pressed: favorites },
        ]}
      />
      <HomeIndicator onHome={onHome} />
    </>
  );
}

function Preview({
  index,
  onIndex,
  onBack,
  onHome,
  onMore,
  onOpenWork,
}: {
  index: number;
  onIndex: (index: number) => void;
  onBack: () => void;
  onHome: () => void;
  onMore: (el: HTMLElement) => void;
  onOpenWork: (id: string) => void;
}) {
  const t = useT();
  const photo = MOBILE_PHOTOS[index];
  const work = workOf(photo);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [info, setInfo] = useState(true);
  const [starred, setStarred] = useState<Set<string>>(() => new Set());
  const strip = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const go = (next: number) => onIndex((next + MOBILE_PHOTOS.length) % MOBILE_PHOTOS.length);

  // Keep the current thumb in the middle of the filmstrip.
  useEffect(() => {
    const root = strip.current;
    const el = root?.querySelector<HTMLElement>(`[data-thumb="${photo.id}"]`);
    if (!root || !el) return;
    // Only scroll when the current thumb is out of view (the strip starts at the first photo, as in Figma).
    const inView = el.offsetLeft >= root.scrollLeft && el.offsetLeft + el.offsetWidth <= root.scrollLeft + root.clientWidth;
    if (!inView) root.scrollTo({ left: el.offsetLeft - (root.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [photo.id]);

  return (
    <>
      <div aria-hidden className="m-window pointer-events-none fixed inset-0 z-0" />
      <div className="m-page-body relative">
        <StatusBar />
        <div className="m-col">
          <NavBar
            variant="inline"
            title={t("{i} of {n}", { i: index + 1, n: MOBILE_PHOTOS.length })}
            back={{ label: t("Library"), onClick: onBack }}
            actions={[
              { icon: `${M}/info-20.svg`, label: t("Info"), onClick: () => setInfo((v) => !v) },
              { icon: `${M}/more-20.svg`, label: t("More"), onClick: onMore },
            ]}
          />
          <div key={photo.id} className="about-pane flex flex-col gap-4 px-4 pt-5" style={{ paddingBottom: "calc(88px + env(safe-area-inset-bottom) / var(--m-zoom, 1))" }}>
            <div
              className="relative h-[272px] w-full touch-pan-y overflow-hidden rounded-[14px]"
              onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
              onPointerUp={(e) => {
                const s = swipe.current;
                swipe.current = null;
                if (!s) return;
                const dx = e.clientX - s.x;
                if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(index + (dx < 0 ? 1 : -1));
              }}
            >
              <img
                src={photo.src}
                alt={work.title}
                onLoad={(e) => setSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
                className="absolute inset-0 size-full rounded-[14px] object-cover"
              />
            </div>
            <div ref={strip} className="m-hscroll -mx-4 px-4">
              <div className="flex w-max items-start gap-1">
                {MOBILE_PHOTOS.map((item, i) => {
                  const on = i === index;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-thumb={item.id}
                      aria-label={t("{i} of {n}", { i: i + 1, n: MOBILE_PHOTOS.length })}
                      aria-current={on || undefined}
                      onClick={() => onIndex(i)}
                      className={`relative h-[52px] shrink-0 overflow-hidden rounded-md transition-[opacity] duration-200 ${on ? "w-[52px]" : "w-10 opacity-50"}`}
                    >
                      <img src={item.src} alt="" loading="lazy" className="absolute inset-0 size-full rounded-md object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
            {info ? (
              <ListCard>
                {[
                  <ListRow key="title" title={t(work.title.split(" — ").pop() ?? work.title)} subtitle={work.project} />,
                  <ListRow key="year" title={t("Year")} value={work.year} />,
                  <ListRow key="role" title={t("Role")} value={t(work.role)} />,
                  <ListRow key="size" title={t("Size")} value={size ? `${size.w} × ${size.h} · PNG` : "PNG"} />,
                ]}
              </ListCard>
            ) : null}
          </div>
        </div>
      </div>
      <Toolbar
        primary={{ icon: `${M}/external-18.svg`, label: t("Open case study"), onClick: () => onOpenWork(work.id) }}
        buttons={[
          {
            icon: `${M}/star-24.svg`,
            label: t("Favorite"),
            pressed: starred.has(photo.id),
            onClick: () =>
              setStarred((current) => {
                const next = new Set(current);
                if (!next.delete(photo.id)) next.add(photo.id);
                return next;
              }),
          },
          { icon: `${M}/download-24.svg`, label: t("Download"), href: photo.src },
          { icon: `${M}/more-24.svg`, label: t("More"), onClick: onMore },
        ]}
      />
      <HomeIndicator onHome={onHome} />
    </>
  );
}
