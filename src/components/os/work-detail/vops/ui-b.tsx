"use client";
/* eslint-disable @next/next/no-img-element -- Figma exports keep their measured size; phones lazy-load. */

import "./vops-ui-b.css";
import type { CSSProperties, ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { useRevealChildren } from "../../reveal";
import { VopsEyebrow, VopsHeading } from "./parts";

/*
 * vOps · UI design, part B (Figma column 272:14590):
 * From sketch to structure 281:14923 · Discovery 281:15004 · Mini-app catalogue 281:15214 ·
 * Mini-app flows 281:15294 · Chat 281:15494 · Case End 272:15304.
 * Phones are 2x WebP composites of the Figma "iPhone — …" frames (screen + silver bezel).
 */

const A = "/figma/vops/ui-b";
const INK = "#14141a";

/* ---------- shared bits ---------- */

function Lead({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <p className="w-[900px] text-[20px] leading-[30px] text-[var(--cmd-text-primary)]">
      {typeof children === "string" ? t(children) : children}
    </p>
  );
}

/** Eyebrow + H2 (gap 16), then the lead `gap` below. */
function Head({
  eyebrow,
  title,
  lead,
  gap = 24,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  gap?: number;
}) {
  const t = useT();
  return (
    <div data-rv className="flex w-full flex-col items-start" style={{ gap }}>
      <div className="flex flex-col items-start gap-4">
        <VopsEyebrow label={t(eyebrow)} />
        <VopsHeading>{t(title)}</VopsHeading>
      </div>
      <Lead>{lead}</Lead>
    </div>
  );
}

type Shot = { id: string; title: string; sub: string };

/** Figma "Screen — …": phone (260 × 528) + centred caption, gap 14. */
function Phone({
  shot,
  i,
  width = 260,
}: {
  shot: Shot;
  i: number;
  width?: number;
}) {
  const t = useT();
  const h = (width * 528.031) / 260;
  return (
    <div
      data-rv
      className="uib-phone flex shrink-0 flex-col items-center gap-3.5"
      style={{ "--uib-i": i } as CSSProperties}
    >
      <div
        className="uib-phone-device relative shrink-0"
        style={{ width, height: h }}
      >
        <img
          src={`${A}/${shot.id}.webp`}
          alt={`${t(shot.title)} — ${t(shot.sub)}`}
          width={width}
          height={h}
          loading="lazy"
          decoding="async"
          className="block size-full"
        />
      </div>
      <div
        className="flex flex-col items-center gap-0.5 text-center"
        style={{ width }}
      >
        <p
          className="w-full text-base leading-6 font-semibold"
          style={{ color: INK }}
        >
          {t(shot.title)}
        </p>
        <p className="w-full text-[14px] leading-5 text-[var(--cmd-text-primary)]">
          {t(shot.sub)}
        </p>
      </div>
    </div>
  );
}

/** Figma "Stage — …": white 1560 × 852 panel, p 56, gap 36; title block + centred phone row (gap 32). */
function Stage({
  title,
  desc,
  chips,
  shots,
}: {
  title: string;
  desc: string;
  chips: string[];
  shots: Shot[];
}) {
  const t = useT();
  return (
    <div
      data-rv
      className="uib-stage relative flex w-full flex-col items-start gap-9 rounded-[32px] bg-white p-14"
    >
      <div className="flex flex-col items-start gap-2.5">
        <p
          className="text-[32px] leading-10 font-semibold tracking-[-0.64px] whitespace-nowrap"
          style={{ color: INK }}
        >
          {t(title)}
        </p>
        <p className="w-[820px] text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-primary)]">
          {t(desc)}
        </p>
        <div className="flex items-start gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="uib-chip rounded-full bg-white px-3.5 py-1.5 text-[14px] leading-5 font-semibold whitespace-nowrap text-[#b30026]"
            >
              {t(c)}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full items-start justify-center gap-8">
        {shots.map((s, i) => (
          <Phone key={s.id} shot={s} i={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------- From sketch to structure (281:14923) ---------- */

function IterHead({
  chip,
  title,
  shipped = false,
}: {
  chip: string;
  title: string;
  shipped?: boolean;
}) {
  const t = useT();
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`rounded-full px-3.5 py-1.5 text-[14px] leading-5 font-semibold whitespace-nowrap ${shipped ? "bg-[var(--brand-vops)] text-white" : "bg-[#f3f4f6] text-[#4b5563]"}`}
      >
        {t(chip)}
      </span>
      <p
        className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap"
        style={{ color: INK }}
      >
        {t(title)}
      </p>
    </div>
  );
}

function IterNote({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <p className="w-[442px] text-center text-base leading-6 tracking-[-0.2px] text-[var(--cmd-text-primary)]">
      {typeof children === "string" ? t(children) : children}
    </p>
  );
}

/** Figma "wf": 240 × 500 low-fi phone, white r28, soft shadow, p 16/14/14, gap 8. */
function Wireframe({ children }: { children: ReactNode }) {
  return (
    <div className="uib-wf flex h-[500px] w-[240px] shrink-0 flex-col items-start gap-2 overflow-clip rounded-[28px] bg-white px-3.5 pt-4 pb-3.5 shadow-[0_6px_20px_0_rgba(0,0,0,0.08)]">
      <span className="h-3.5 w-full shrink-0 rounded-[4px] bg-[#dcdee0]" />
      {children}
    </div>
  );
}

function SketchToStructure() {
  const t = useT();
  return (
    <section
      id="wd-sketch"
      className="flex w-[1872px] flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow={"IDEATION  ·  03.2"}
        title="From sketch to structure"
        lead="Three rounds for the Discover home, each tested with five or six employees before moving on."
      />
      <div className="flex w-full items-stretch gap-5">
        <div data-rv className="uib-iter flex w-[506px] shrink-0">
          <div className="wd-hover flex w-full flex-col items-center gap-[18px] rounded-[24px] bg-white p-8 shadow-[var(--uib-card-soft)]">
            <IterHead chip="v1" title="Dashboard of app tiles" />
            <Wireframe>
              <div className="flex w-[212px] flex-wrap items-start gap-2.5">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    className="uib-tile size-11 shrink-0 rounded-[12px] bg-[#f3f4f5]"
                    style={{ "--uib-i": i } as CSSProperties}
                  />
                ))}
              </div>
            </Wireframe>
            <IterNote>
              Users still had to know which app to open — a portal, not a
              helper.
            </IterNote>
          </div>
        </div>
        <div data-rv className="uib-iter flex w-[506px] shrink-0">
          <div className="wd-hover flex w-full flex-col items-center gap-[18px] rounded-[24px] bg-white p-8 shadow-[var(--uib-card-soft)]">
            <IterHead chip="v2" title="Notification feed" />
            <Wireframe>
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="uib-row flex w-full items-center gap-2.5"
                  style={{ "--uib-i": i } as CSSProperties}
                >
                  <span className="size-7 shrink-0 rounded-[14px] bg-[#f3f4f5]" />
                  <span className="flex flex-col items-start gap-1">
                    <span className="h-2 w-[140px] rounded-[4px] bg-[#dcdee0]" />
                    <span className="h-1.5 w-[90px] rounded-[3px] bg-[#e8e9ea]" />
                  </span>
                </div>
              ))}
            </Wireframe>
            <IterNote>
              Work came to users, but everything looked equally urgent and
              nothing could be done in place.
            </IterNote>
          </div>
        </div>
        <div data-rv className="uib-iter flex w-[506px] shrink-0">
          <div className="wd-hover flex w-full flex-col items-center gap-[18px] rounded-[24px] bg-[#fff4f6] p-8">
            <IterHead
              chip="v3 · shipped"
              title="Prioritised feed with actions"
              shipped
            />
            <div className="uib-phone-device relative h-[499.598px] w-[246px] shrink-0">
              <img
                src={`${A}/g_home-sm.webp`}
                alt={t("Shipped Discover home: prioritised feed with actions")}
                width={246}
                height={500}
                loading="lazy"
                decoding="async"
                className="block size-full"
              />
            </div>
            <IterNote>
              The feed puts what needs attention first, and every card carries
              its own actions — approve, open, pin.
            </IterNote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Discovery (281:15004) ---------- */

function Discovery() {
  return (
    <section
      id="wd-discovery"
      className="flex w-[1872px] flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow={"FINAL DESIGNS  ·  03.3"}
        title="Discovery"
        lead="A personalised workstream: what needs attention first, today's counts on top, and a feed filtered by HR, Admin and Work where every card can be acted on."
      />
      <Stage
        title="Today, at a glance"
        desc="Greeting and today's counts up front; tabs filter the feed by category."
        chips={["Activity feed", "Today counts", "Category tabs"]}
        shots={[
          {
            id: "g_home",
            title: "Home feed",
            sub: "Counters and category tabs",
          },
          {
            id: "g_notif",
            title: "New notifications",
            sub: "Fresh items surface in place",
          },
        ]}
      />
      <Stage
        title="Act on any card"
        desc="Pin, create a task or hide — without leaving the feed."
        chips={["Menu", "Pin", "Create task"]}
        shots={[
          {
            id: "g_menu",
            title: "Card menu",
            sub: "Forward · Mail · Pin · Task · Remind",
          },
          { id: "g_pinned", title: "Pinned", sub: "Toast confirms the action" },
          {
            id: "g_task",
            title: "Create a task",
            sub: "Assignee and due date pre-filled",
          },
        ]}
      />
    </section>
  );
}

/* ---------- Mini-app catalogue (281:15214) ---------- */

const CATS: { name: string; count: string; apps: string[] }[] = [
  {
    name: "HR",
    count: "12 apps",
    apps: [
      "Personal info",
      "My income",
      "Check-in/out",
      "Time off",
      "Duty roster",
      "Assets",
      "Tax deductions",
      "Social insurance",
      "Health insurance",
      "Resignation",
    ],
  },
  {
    name: "Admin",
    count: "10 apps",
    apps: [
      "Meals",
      "Car booking",
      "Medical",
      "IT support",
      "Vehicle transfer",
      "Inspections",
      "Goods in/out",
    ],
  },
  {
    name: "Utilities",
    count: "5 apps",
    apps: [
      "Mail groups",
      "Conference check-in",
      "Delegation checklist",
      "Travel abroad",
    ],
  },
];

function Catalogue() {
  const t = useT();
  return (
    <section
      id="wd-catalogue"
      className="flex w-[1872px] flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <div data-rv>
        <VopsEyebrow label={t("FINAL DESIGNS  ·  03.4")} />
      </div>
      <div data-rv className="flex flex-col items-start gap-6">
        <VopsHeading>{t("Mini-app catalogue")}</VopsHeading>
        <Lead>
          27+ self-service apps in four categories, owned by different units but
          built from one kit.
        </Lead>
      </div>
      <div
        data-rv
        className="uib-stage relative flex w-full items-center gap-12 rounded-[32px] bg-white p-14"
      >
        <Phone
          shot={{
            id: "m_r0",
            title: "vOps Discovery",
            sub: "Favourites, categories and search",
          }}
          i={0}
          width={300}
        />
        <div className="flex min-w-px flex-1 flex-col items-start gap-4">
          {CATS.map((c) => (
            <div key={c.name} data-rv className="w-full">
              <div className="wd-hover flex w-full flex-col items-start gap-3 rounded-[20px] bg-white p-6 shadow-[var(--uib-card-soft)]">
                <div className="flex items-start gap-2.5">
                  <p
                    className="text-[20px] leading-7 font-semibold tracking-[-0.4px] whitespace-nowrap"
                    style={{ color: INK }}
                  >
                    {t(c.name)}
                  </p>
                  <span className="rounded-full bg-[#ffe8ec] px-3.5 py-1.5 text-[14px] leading-5 font-semibold whitespace-nowrap text-[#b30026]">
                    {t(c.count)}
                  </span>
                </div>
                <div className="flex w-full flex-wrap content-start items-start gap-2">
                  {c.apps.map((a) => (
                    <span
                      key={a}
                      className="uib-app rounded-[10px] bg-[#f7f7f8] px-3 py-[7px] text-[14px] leading-5 whitespace-nowrap text-[var(--cmd-text-primary)]"
                    >
                      {t(a)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mini-app flows (281:15294) ---------- */

function MiniApps() {
  return (
    <section
      id="wd-miniapps"
      className="flex w-[1872px] flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow={"FINAL DESIGNS  ·  03.7"}
        title="Mini-app flows"
        lead="Every mini app follows one skeleton — overview → form → review → status — so learning one means knowing them all."
      />
      <Stage
        title="Time off & check-in"
        desc="Balance before you pick dates, bottom-sheet pickers, and a status you can follow through each approver."
        chips={["Leave", "Bottom sheet", "Status"]}
        shots={[
          { id: "m_l0", title: "Check-in / out", sub: "Monthly overview" },
          {
            id: "m_l1",
            title: "Leave request",
            sub: "Short form, pre-filled defaults",
          },
          { id: "m_l2", title: "Bottom sheet", sub: "VIC picker" },
          { id: "m_l3", title: "Manager approval", sub: "Step 2 of 3" },
          { id: "m_l4", title: "Approved", sub: "Final state" },
        ]}
      />
      <Stage
        title="Personal income tax"
        desc="Register, track approval and see the outcome — the same status language as leave."
        chips={["Tax", "Status"]}
        shots={[
          { id: "m_t1", title: "Tax overview", sub: "Dependants and history" },
          { id: "m_t2", title: "Register", sub: "Guided form" },
          { id: "m_t3", title: "Pending approval", sub: "Clear next step" },
          { id: "m_t4", title: "Approved", sub: "Done state" },
        ]}
      />
      <Stage
        title="Dependants & resignation"
        desc="Long, sensitive processes broken into calm steps with documents in context."
        chips={["Dependants", "Resignation"]}
        shots={[
          { id: "m_d1", title: "Dependants", sub: "List with status" },
          { id: "m_d2", title: "Add a dependant", sub: "Form + documents" },
          {
            id: "m_r1",
            title: "Resignation request",
            sub: "Process explained first",
          },
          { id: "m_r2", title: "Review & sign", sub: "Read before signing" },
        ]}
      />
    </section>
  );
}

/* ---------- Chat (281:15494) ---------- */

function Chat() {
  return (
    <section
      id="wd-chat"
      className="flex w-[1872px] flex-col items-start gap-10 px-[156px] pt-[100px]"
    >
      <Head
        eyebrow={"FINAL DESIGNS  ·  03.6"}
        title="Chat"
        lead="Teams and channels for every unit, with quick photo and video capture for field reports."
        gap={40}
      />
      <Stage
        title="Conversations"
        desc="Filters for All, Unread, Teams and Channels; rich messages and mentions in the room."
        chips={["Chat", "Inbox", "Profile"]}
        shots={[
          {
            id: "c_list",
            title: "Chat list",
            sub: "All · Unread · Teams · Channels",
          },
          { id: "c_room", title: "Chat room", sub: "Mentions and replies" },
          { id: "c_room2", title: "Thread", sub: "Field updates" },
          { id: "c_inbox", title: "Inbox", sub: "Mail in the same app" },
          { id: "c_profile", title: "Profile", sub: "Personal hub" },
        ]}
      />
    </section>
  );
}

/* ---------- Case End (272:15304) ---------- */

function CaseEnd() {
  const t = useT();
  return (
    <section
      id="wd-case-end"
      className="flex w-[1872px] flex-col items-center gap-7 px-[156px] pt-[100px] pb-20"
    >
      <div data-rv className="flex w-full items-center gap-5 overflow-hidden">
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="size-3 shrink-0 rounded-full bg-[var(--brand-vops)]" />
          <p className="font-mono text-[18px] leading-[26px] tracking-[0.4px] whitespace-pre text-[var(--cmd-text-secondary)]">
            {t("END OF CASE STUDY  ·  vOps  ·  2026")}
          </p>
        </div>
        <span className="h-px min-w-px flex-1 bg-[var(--cmd-text-muted)]" />
      </div>
      <p
        data-rv
        className="text-center text-[44px] leading-[56px] tracking-[-1.1px] whitespace-nowrap text-[var(--cmd-text-primary)]"
      >
        {t("Thanks for reading — here is what I built next.")}
      </p>
    </section>
  );
}

export function VopsUiB() {
  // One reveal group for every `data-rv` block in these sections (heads, stages, phones, cards).
  const ref = useRevealChildren<HTMLDivElement>("[data-rv]", 40);
  return (
    <div ref={ref} className="vops-ui-b flex flex-col">
      <SketchToStructure />
      <Discovery />
      <Catalogue />
      <MiniApps />
      <Chat />
      <CaseEnd />
    </div>
  );
}
