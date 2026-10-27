/* eslint-disable @next/next/no-img-element -- Figma exports keep their own size. */
"use client";

import { useRef, type ReactNode } from "react";
import { formatSize, SEND_NOTE, TOPICS, useCompose } from "@/lib/compose";
import { useT } from "@/lib/i18n";
import { Card, Chip, Divider, Glyph, Label, M, NavBar, Page, Toolbar } from "./parts";

/** Mobile — Mail (Compose) (369:21758): the desktop compose logic (useCompose) in the iOS layout. */
export function MailPage({ onHome }: { onHome: () => void }) {
  const t = useT();
  const { status, send, from, setFrom, subject, setSubject, topic, setTopic, message, setMessage, files, addFiles, removeFile, reset } = useCompose();
  const fileInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  return (
    <Page
      onHome={onHome}
      nav={
        <NavBar
          variant="inline"
          title={t("New Message")}
          back={{ label: t("Cancel"), onClick: onHome }}
          actions={[
            { icon: `${M}/attach-20.svg`, label: t("Attach a file"), onClick: () => fileInput.current?.click() },
            { icon: `${M}/image-20.svg`, label: t("Attach an image"), onClick: () => imageInput.current?.click() },
          ]}
        />
      }
      toolbar={
        <Toolbar
          primary={{ icon: `${M}/send-18.svg`, label: t("Send message"), type: "submit", form: "m-compose" }}
          buttons={[
            { icon: `${M}/trash-24.svg`, label: t("Discard"), onClick: reset },
          ]}
        />
      }
    >
      <form
        id="m-compose"
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (await send()) setTimeout(onHome, 1400);
        }}
      >
        <input ref={fileInput} type="file" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        <input ref={imageInput} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        <Card className="flex flex-col px-4 py-1">
          <Field label={t("To")}>
            <span className="bg-overlay text-fg flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-[15px] leading-[normal] font-semibold whitespace-nowrap">
              <img src={`${M}/avatar-26-2026.png`} alt="" width={26} height={26} className="size-[26px] rounded-[40px]" />
              Tuan Ngoc
            </span>
          </Field>
          <Divider />
          <Field label={t("From")}>
            <input
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="your.email@company.com"
              className="text-fg placeholder:text-fg-tertiary min-w-0 flex-1 bg-transparent text-base leading-[normal] outline-none"
            />
          </Field>
          <Divider />
          <Field label={t("Subject")}>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-fg min-w-0 flex-1 bg-transparent text-base leading-[normal] font-semibold outline-none"
            />
          </Field>
        </Card>
        <Label>{t("TOPIC")}</Label>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <Chip key={item} label={t(item)} selected={topic === item} onClick={() => setTopic(item)} />
          ))}
        </div>
        <Card sheen className="flex flex-col gap-3.5 p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label={t("Message")}
            className="text-fg min-h-[216px] w-full resize-none bg-transparent text-base leading-[1.5] outline-none [field-sizing:content]"
          />
          {files.length ? (
            <ul className="flex flex-col items-start gap-2">
              {files.map((file) => (
                <li key={file.id} className="bg-overlay flex max-w-full items-center gap-2.5 rounded-xl py-2.5 pr-3.5 pl-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-[7px] bg-[var(--m-accent)] text-white">
                    <Glyph src={`${M}/file-text.svg`} size={16} />
                  </span>
                  <span className="text-fg truncate text-sm leading-[normal] font-semibold">{file.name}</span>
                  <span className="text-fg-tertiary shrink-0 text-sm leading-[normal]">{formatSize(file.size)}</span>
                  <button
                    type="button"
                    aria-label={t("Remove {name}", { name: file.name })}
                    onClick={() => removeFile(file.id)}
                    className="text-fg-tertiary -my-2.5 -mr-3.5 flex size-11 shrink-0 items-center justify-center text-lg leading-none"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
        {status !== "idle" ? (
          <p role="status" className="text-fg-secondary text-sm leading-[1.5]">
            {t(SEND_NOTE[status])}
          </p>
        ) : null}
      </form>
    </Page>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-h-12 items-center gap-3 py-[13px]">
      <span className="text-fg-tertiary w-[66px] shrink-0 text-base leading-[normal]">{label}</span>
      {children}
    </label>
  );
}
