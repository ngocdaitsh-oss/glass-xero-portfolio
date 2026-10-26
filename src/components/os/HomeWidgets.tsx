"use client";

import { DateWeatherPanel } from "./DateWeatherPanel";

/** Tablet home screen: the Date & Weather card only; playback stays in Control Center. */
export function HomeWidgets() {
  return (
    <div
      className="tablet-home tablet-widgets boot-item absolute top-[max(86px,calc(50%-331px))] right-12 z-[11] hidden flex-col tablet:flex"
      style={{ ["--bi" as string]: 3 }}
    >
      <div className="w-[473.14px]">
        <DateWeatherPanel className="[zoom:0.82]" />
      </div>
    </div>
  );
}
