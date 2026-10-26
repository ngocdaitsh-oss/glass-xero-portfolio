"use client";

import { useEffect, useState } from "react";

export const TIME_ZONE = "Asia/Ho_Chi_Minh";

/** Ticks every 15s. Returns null until mounted so SSR and client markup match. */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  weekday: string;
  weekdayShort: string;
  monthName: string;
  monthShort: string;
  hour12: string;
  minute: string;
  period: "AM" | "PM";
};

export function zonedParts(date: Date): ZonedParts {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const hour24 = Number(parts.hour) % 24;
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...opts }).format(date);

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: fmt({ weekday: "long" }),
    weekdayShort: fmt({ weekday: "short" }),
    monthName: fmt({ month: "long" }),
    monthShort: fmt({ month: "short" }),
    hour12: String(hour24 % 12 === 0 ? 12 : hour24 % 12),
    minute: parts.minute,
    period: hour24 >= 12 ? "PM" : "AM",
  };
}

/** Values shown in the Figma frame, used before the real clock mounts. */
export const DESIGN_TIME: ZonedParts = {
  year: 2026,
  month: 10,
  day: 15,
  weekday: "Thursday",
  weekdayShort: "Thu",
  monthName: "October",
  monthShort: "Oct",
  hour12: "10",
  minute: "32",
  period: "PM",
};

const VI_WEEKDAY = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const VI_WEEKDAY_SHORT = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];

/** Top bar date: "Thu 15 Oct" / "Th 5, 15 thg 10". */
export function shortDate(p: ZonedParts, lang: "en" | "vi") {
  if (lang === "en") return `${p.weekdayShort} ${p.day} ${p.monthShort}`;
  const wd = new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay();
  return `${VI_WEEKDAY_SHORT[wd]}, ${p.day} thg ${p.month}`;
}

/** Flyout date: "Thursday, 15 October 2026" / "Thứ Năm, 15 tháng 10, 2026". */
export function longDate(p: ZonedParts, lang: "en" | "vi") {
  if (lang === "en") return `${p.weekday}, ${p.day} ${p.monthName} ${p.year}`;
  const wd = new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay();
  return `${VI_WEEKDAY[wd]}, ${p.day} tháng ${p.month}, ${p.year}`;
}

/** Clock period: AM/PM → SA/CH in Vietnamese. */
export function periodLabel(p: ZonedParts, lang: "en" | "vi") {
  return lang === "vi" ? (p.period === "AM" ? "SA" : "CH") : p.period;
}
