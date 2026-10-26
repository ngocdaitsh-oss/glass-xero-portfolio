/* eslint-disable @next/next/no-img-element -- small chrome icons keep their exported size. */
"use client";

import { useRef, type ReactNode } from "react";
import { AppWindow, MaskIcon } from "./AppWindow";
import { useWindow } from "./window-manager";
import { useT } from "@/lib/i18n";
import { formatSize, SEND_NOTE, TOPICS, useCompose } from "@/lib/compose";

const GRADIENT = "linear-gradient(166deg, var(--azure-300) 0%, var(--azure-600) 71.43%)";

/** Figma "Compose Window" (89:3609): header, To/From/Subject rows, topic chips, editor, Send. */
export function MailWindow() {
  const { close: onClose } = useWindow();
  const t = useT();
  const { status, send, from, setFrom, subject, setSubject, topic, setTopic, message, setMessage, files, addFiles, removeFile } = useCompose();
  const fileInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  return (
    <AppWindow title="Leave me a message" referenceDark>
      <form
        className="flex h-full flex-col px-7 pt-[22px] pb-5"
        onSubmit={async (e) => {
          e.preventDefault();
          if (await send()) setTimeout(onClose, 1400);
        }}
      >
        <div className="flex items-start gap-3 pb-[18px]">
          <MaskIcon src="/figma/logo.svg" size={48} className="text-fg" />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
            <h3 className="text-[17px] leading-6 font-semibold">{t("Send a message to me")}</h3>
            <p className="text-fg-tertiary text-sm leading-5">UI/UX &amp; Product Designer · ngocdaitsh@gmail.com</p>
          </span>
        </div>

        <span className="bg-divider h-px w-full shrink-0" />
        <Field label={t("To")}>
          <p className="bg-overlay-strong inline-flex items-center gap-2 rounded-[20px] py-1 pr-3 pl-1 text-base leading-6 font-semibold whitespace-nowrap">
            <img src="/figma/about/avatar-2026.png" alt="" width={24} height={24} className="size-6 rounded-full" />
            Tuan Ngoc <span className="text-fg-tertiary font-normal">ngocdaitsh@gmail.com</span>
          </p>
        </Field>
        <span className="bg-divider h-px w-full shrink-0" />
        <Field label={t("From")}>
          <input
            required
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="your.email@company.com"
            className="placeholder:text-fg-disabled w-full bg-transparent text-base leading-6 outline-none"
          />
        </Field>
        <span className="bg-divider h-px w-full shrink-0" />
        <Field label={t("Subject")}>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-transparent text-base leading-6 outline-none"
          />
        </Field>
        <span className="bg-divider h-px w-full shrink-0" />
        <div className="flex items-center gap-2 pt-3.5 pb-1.5">
          <span className="text-fg-tertiary shrink-0 text-base leading-6">{t("Topic:")}</span>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((item) => {
              const on = topic === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTopic(item)}
                  className={`rounded-[20px] px-3 py-[5px] text-sm leading-[22px] font-semibold whitespace-nowrap transition-[background-color,color,transform] duration-200 active:scale-95 ${
                    on ? "text-white" : "bg-overlay-subtle text-fg-secondary hover:bg-overlay-strong hover:text-fg"
                  }`}
                  style={on ? { backgroundImage: GRADIENT } : undefined}
                >
                  {t(item)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-overlay-subtle mt-3 flex min-h-0 flex-1 flex-col gap-2.5 rounded-2xl px-[18px] py-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="os-scroll caret-icon-accent min-h-0 flex-1 resize-none bg-transparent text-base leading-[22px] outline-none"
          />
          {files.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {files.map((file) => (
                <li key={file.id} className="bg-overlay flex w-fit items-center gap-2.5 rounded-xl py-1.5 pr-3 pl-2">
                  <span className="flex size-7 items-center justify-center rounded-lg text-white" style={{ backgroundImage: GRADIENT }}>
                    <MaskIcon src="/figma/mail/file.svg" size={14} />
                  </span>
                  <span className="text-xs leading-[18px] font-semibold">{file.name}</span>
                  <span className="text-fg-tertiary text-sm leading-5">{formatSize(file.size)}</span>
                  <button
                    type="button"
                    aria-label={t("Remove {name}", { name: file.name })}
                    onClick={() => removeFile(file.id)}
                    className="text-icon-secondary hover:text-fg hover:bg-overlay-strong flex size-5 items-center justify-center rounded-full text-sm transition-colors"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center">
            <input ref={fileInput} type="file" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            <input ref={imageInput} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            <ToolButton label={t("Attach a file")} icon="/figma/mail/paperclip.svg" onClick={() => fileInput.current?.click()} />
            <ToolButton label={t("Attach an image")} icon="/figma/mail/image.svg" onClick={() => imageInput.current?.click()} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5">
          {status !== "idle" ? (
            <p role="status" className={`mr-auto text-sm leading-5 ${status === "error" || status === "too-large" ? "text-fg" : "text-fg-secondary"}`}>
              {t(SEND_NOTE[status])}
            </p>
          ) : null}
          <button
            type="button"
            aria-label={t("Discard")}
            onClick={onClose}
            className="bg-overlay text-icon-secondary hover:bg-overlay-strong hover:text-fg flex items-center justify-center rounded-[10px] p-2 transition-[background-color,color,transform] duration-200 active:scale-95"
          >
            <MaskIcon src="/figma/mail/trash.svg" size={24} />
          </button>
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="hover-lift flex disabled:opacity-60 items-center gap-1.5 rounded-xl py-[9px] pr-3.5 pl-4 text-base leading-6 font-semibold text-white shadow-[0_6px_16px_0_rgba(33,115,214,0.5)] hover:shadow-[0_10px_22px_0_rgba(33,115,214,0.55)]"
            style={{ backgroundImage: GRADIENT }}
          >
            {t("Send message")}
            <img src="/figma/term/send.svg" alt="" width={24} height={24} className="size-6" />
          </button>
        </div>
      </form>
    </AppWindow>
  );
}

function ToolButton({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="text-icon-secondary hover:bg-overlay-strong hover:text-fg flex items-center justify-center rounded-[10px] p-2 transition-colors duration-200"
    >
      <MaskIcon src={icon} size={24} />
    </button>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex items-center gap-3.5 py-3">
      <span className="text-fg-tertiary w-16 shrink-0 text-base leading-6">{label}</span>
      {children}
    </label>
  );
}
