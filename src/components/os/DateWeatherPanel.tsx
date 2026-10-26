"use client";

import { useState } from "react";
import { useLang, useT } from "@/lib/i18n";
import { DESIGN_TIME, longDate, periodLabel, useNow, zonedParts } from "@/lib/use-now";
import { GlassEdge, Icon } from "./primitives";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const WEEKDAYS_VI = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const forecast = [
  { day: "Tomorrow", temp: "27°", condition: "Partly Cloudy", icon: "/figma/partly-cloudy.svg" },
  { day: "Saturday", temp: "25°", condition: "Light Rain", icon: "/figma/cloud-rain.svg" },
];

const extendedForecast = [
  { day: "Sunday", temp: "28°", condition: "Partly Cloudy", icon: "/figma/partly-cloudy.svg" },
  { day: "Monday", temp: "24°", condition: "Light Rain", icon: "/figma/cloud-rain.svg" },
];

type Cell = { day: number; muted: boolean; today: boolean };

function buildMonth(year: number, month: number, today: { y: number; m: number; d: number }): Cell[] {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const daysInPrev = new Date(Date.UTC(year, month - 1, 0)).getUTCDate();
  const cells: Cell[] = [];
  for (let i = lead; i > 0; i--) cells.push({ day: daysInPrev - i + 1, muted: true, today: false });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false, today: today.y === year && today.m === month && today.d === d });
  }
  let next = 1;
  while (cells.length % 7 !== 0) cells.push({ day: next++, muted: true, today: false });
  return cells;
}

function CalendarDay({ cell }: { cell: Cell }) {
  return (
    <span
      className={`flex h-7 w-9 items-center justify-center overflow-clip rounded-xl text-sm leading-5 ${
        cell.today
          ? "font-semibold text-white"
          : cell.muted
            ? "text-fg-disabled"
            : "text-fg-secondary"
      }`}
      style={
        cell.today
          ? { backgroundImage: "linear-gradient(149.66deg, var(--azure-300) 0%, var(--azure-600) 71.43%)" }
          : undefined
      }
      aria-current={cell.today ? "date" : undefined}
    >
      {cell.day}
    </span>
  );
}

function ForecastRow({ row }: { row: (typeof forecast)[number] }) {
  const t = useT();
  return (
    <div className="flex w-full items-center gap-2 text-sm leading-5">
      <span className="text-fg-tertiary w-[70px]">{t(row.day)}</span>
      <span className="text-fg w-[30px] font-semibold">{row.temp}</span>
      <span className="text-fg-secondary min-w-px flex-1">{t(row.condition)}</span>
      <Icon src={row.icon} size={20} />
    </div>
  );
}

export function DateWeatherPanel({ className = "" }: { className?: string }) {
  const now = useNow();
  const t = now ? zonedParts(now) : DESIGN_TIME;
  const [offset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const lang = useLang();
  const tr = useT();

  const monthIndex = t.month - 1 + offset;
  const viewYear = t.year + Math.floor(monthIndex / 12);
  const viewMonth = ((monthIndex % 12) + 12) % 12 + 1;
  const cells = buildMonth(viewYear, viewMonth, { y: t.year, m: t.month, d: t.day });
  const rows = expanded ? [...forecast, ...extendedForecast] : forecast;

  return (
    <section
      aria-label={tr("Date and weather")}
      className={`shadow-panel relative flex w-[577px] flex-col items-start gap-3.5 overflow-clip rounded-[22px] px-[22px] pt-[18px] pb-3.5 ${className}`}
    >
      <div
        aria-hidden
        className="glass glass-flyout pointer-events-none absolute inset-0 rounded-[22px]"
      />

      <div className="relative flex flex-col items-start whitespace-nowrap">
        <div className="flex items-baseline gap-2">
          <p className="text-fg text-[56px] leading-[64px] font-bold tracking-[-1px] tabular-nums">
            {t.hour12}:{t.minute}
          </p>
          <p className="text-fg-secondary text-[17px] leading-6 font-semibold">{periodLabel(t, lang)}</p>
        </div>
        <p className="text-fg-tertiary text-base leading-6">
          {longDate(t, lang)}
        </p>
      </div>

      <div className="bg-divider relative h-px w-full shrink-0" />

      <div className="relative flex items-start gap-6">
        <div className="flex flex-col items-start gap-2">
          <div className="flex w-[252px] items-center justify-between">
            <button
              type="button"
              aria-label={tr("Previous month")}
              onClick={() => setOffset((o) => o - 1)}
              className="rounded-md transition-colors hover:bg-overlay-strong"
            >
              <Icon src="/figma/chevron-left.svg" size={16} />
            </button>
            <p className="text-fg text-base leading-6 font-semibold whitespace-nowrap">
              {lang === "vi" ? `Tháng ${viewMonth}, ${viewYear}` : `${MONTHS[viewMonth - 1]} ${viewYear}`}
            </p>
            <button
              type="button"
              aria-label={tr("Next month")}
              onClick={() => setOffset((o) => o + 1)}
              className="rounded-md transition-colors hover:bg-overlay-strong"
            >
              <Icon src="/figma/chevron-right-sm.svg" size={16} />
            </button>
          </div>
          <div className="grid w-[252px] grid-cols-7 gap-y-0.5">
            {(lang === "vi" ? WEEKDAYS_VI : WEEKDAYS).map((d) => (
              <span
                key={d}
                className="text-fg-tertiary flex h-7 w-9 items-center justify-center text-sm leading-5 font-semibold"
              >
                {d}
              </span>
            ))}
            {cells.map((cell, i) => (
              <CalendarDay key={i} cell={cell} />
            ))}
          </div>
        </div>

        <div className="bg-divider w-px self-stretch" />

        <div className="flex w-[232px] flex-col items-center gap-2.5">
          <p className="text-fg-secondary text-base leading-6 font-semibold">{tr("Today")}</p>
          <div className="flex items-center gap-3.5">
            <Icon src="/figma/weather-sun-lg.svg" size={40} />
            <p className="text-fg text-[56px] leading-[64px] font-bold tracking-[-1px]">26°</p>
          </div>
          <div className="flex w-full items-center justify-between text-sm leading-5">
            <span className="text-fg-tertiary">{tr("Feels like 28°")}</span>
            <span className="text-fg-tertiary flex items-center gap-1">
              <Icon src="/figma/map-pin.svg" size={12} />
              Hà Nội, VN
            </span>
          </div>
          <div className="bg-divider h-px w-full" />
          {rows.map((row) => (
            <ForecastRow key={row.day} row={row} />
          ))}
          <button
            type="button"
            aria-label={tr(expanded ? "Show less forecast" : "Show more forecast")}
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
            className="rounded-md transition-[transform,background-color] hover:bg-overlay-strong"
            style={{ transform: expanded ? "rotate(180deg)" : undefined }}
          >
            <Icon src="/figma/chevron-down.svg" size={16} />
          </button>
        </div>
      </div>

      <GlassEdge />
    </section>
  );
}
