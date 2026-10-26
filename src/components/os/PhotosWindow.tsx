/* eslint-disable @next/next/no-img-element -- project covers are fixed Figma exports. */
"use client";

import { useState } from "react";
import { AppWindow } from "./AppWindow";
import { tabletGeometry, useWindow } from "./window-manager";
import { currentLayout } from "@/lib/layout-mode";
import { useT } from "@/lib/i18n";
import { PHOTOS, type Photo } from "@/lib/photos";

type Album = "Library" | "Favorites" | "Recents" | "UI/UX projects" | "Brand identity";

const GRID_GEOMETRY = { x: 460, y: 170, w: 1000, h: 660 };
const PREVIEW_GEOMETRY = { x: 320, y: 118, w: 1280, h: 780 };

export function PhotosWindow() {
  const { state, setGeometry } = useWindow();
  const [album, setAlbum] = useState<Album>("Library");
  const t = useT();
  const [open, setPhoto] = useState<Photo | null>(null);

  const setOpen = (photo: Photo | null) => {
    setPhoto(photo);
    if (state.maximized) return;
    // Tablet frames 359:94095 (grid) and 359:94531 (preview) have their own place and zoom.
    const tablet = currentLayout() === "tablet" ? tabletGeometry(photo ? "photos-preview" : "photos") : null;
    if (tablet) {
      setGeometry(tablet);
      return;
    }
    const target = photo ? PREVIEW_GEOMETRY : GRID_GEOMETRY;
    const from = photo ? GRID_GEOMETRY : PREVIEW_GEOMETRY;
    setGeometry({
      ...target,
      x: Math.max(24, state.geo.x - (target.w - from.w) / 2),
      y: Math.max(66, state.geo.y - (target.h - from.h) / 2),
    });
  };
  const items =
    album === "Library" || album === "Recents"
      ? PHOTOS
      : album === "Favorites"
        ? PHOTOS.filter((photo) => photo.favorite)
        : PHOTOS.filter((photo) => photo.album === album);

  if (open) {
    return (
      <AppWindow title="My Photos">
        <div className="flex h-full">
          <div className="flex min-w-0 flex-1 items-center justify-center bg-black/20 p-6">
            <img src={open.src} alt="" className="max-h-full max-w-full object-contain" />
          </div>
          <aside className="os-scroll w-[300px] shrink-0 overflow-y-auto border-l border-divider px-5 py-4">
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="text-accent mb-3 rounded-lg bg-overlay px-3 py-1 text-[13px] font-semibold hover:bg-overlay-strong"
            >
              ‹ {t("Library")}
            </button>
            <p className="text-fg-tertiary text-[12px]">{t(open.album)} · {t("{i} of {n}", { i: PHOTOS.findIndex((p) => p.id === open.id) + 1, n: PHOTOS.length })}</p>
            <h3 className="mt-2 text-[22px] leading-7 font-bold">{open.title}</h3>
            <p className="text-fg-secondary mt-2 text-[14px] leading-6">{t(open.blurb)}</p>
            <dl className="mt-4 flex flex-col gap-2 text-[13px]">
              <Row k={t("Project")} v={open.project} />
              <Row k={t("Album")} v={t(open.album)} />
              <Row k={t("Year")} v={open.year} />
              <Row k={t("Role")} v={t(open.role)} />
            </dl>
            <div className="mt-4 flex gap-2">
              {open.album === "Brand identity" ? (
                <span className="rounded-full bg-overlay px-3 py-1 text-[12px]">{t("Brand identity")}</span>
              ) : (
                <>
                  <span className="rounded-full bg-overlay px-3 py-1 text-[12px]">{t("Website redesign")}</span>
                  <span className="rounded-full bg-overlay px-3 py-1 text-[12px]">{t("Product design")}</span>
                </>
              )}
            </div>
          </aside>
        </div>
      </AppWindow>
    );
  }

  return (
    <AppWindow title="My Photos">
      <div className="flex h-full">
        <aside className="w-[200px] shrink-0 border-r border-divider px-3 py-3">
          <p className="text-fg-tertiary px-2 text-[11px] tracking-[0.14em]">{t("PHOTOS")}</p>
          {(["Library", "Favorites", "Recents"] as const).map((name) => (
            <AlbumButton key={name} name={t(name)} count={name === "Favorites" ? PHOTOS.filter((p) => p.favorite).length : PHOTOS.length} on={album === name} onClick={() => setAlbum(name)} />
          ))}
          <p className="text-fg-tertiary mt-4 px-2 text-[11px] tracking-[0.14em]">{t("ALBUMS")}</p>
          <AlbumButton name={t("UI/UX projects")} count={PHOTOS.filter((p) => p.album === "UI/UX projects").length} on={album === "UI/UX projects"} onClick={() => setAlbum("UI/UX projects")} />
          <AlbumButton name={t("Brand identity")} count={PHOTOS.filter((p) => p.album === "Brand identity").length} on={album === "Brand identity"} onClick={() => setAlbum("Brand identity")} />
        </aside>
        <div className="os-scroll min-w-0 flex-1 overflow-y-auto px-5 py-4">
          <h3 className="text-[22px] font-bold">{t(album)}</h3>
          <p className="text-fg-secondary text-[13px]">{t("{n} mockups · {m} projects", { n: items.length, m: new Set(items.map((p) => p.project)).size })}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {items.map((photo) => (
              <button key={photo.id} type="button" onClick={() => setOpen(photo)} className="hover-lift overflow-hidden rounded-2xl bg-overlay text-left hover:bg-overlay-strong">
                <span className="flex h-[120px] items-center justify-center bg-black/15">
                  <img src={photo.src} alt="" className="max-h-full max-w-full object-contain" />
                </span>
                <span className="block px-3 py-2">
                  <span className="block text-[14px] font-semibold">{photo.title}</span>
                  <span className="text-fg-tertiary text-[12px]">{photo.year}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

function AlbumButton({ name, count, on, onClick }: { name: string; count: number; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-1 flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left text-[14px] ${on ? "bg-overlay-strong" : "hover:bg-overlay"}`}
    >
      <span>{name}</span>
      <span className="text-fg-tertiary font-mono text-[12px]">{count}</span>
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-fg-tertiary">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
