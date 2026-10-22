"use client";

import { FormEvent, useEffect, useState } from "react";
import { contact } from "@/content/site";

const whatsappNumber = contact.phone.replace(/\D/g, "");
const defaultMessage = "Hello Aumsh Ventures, I would like to discuss a project.";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = message.trim() || defaultMessage;
    const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed right-5 bottom-5 z-30 flex flex-col items-end gap-3 md:right-8 md:bottom-8">
      {open && (
        <form
          onSubmit={send}
          className="w-[min(100vw-2.5rem,320px)] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">WhatsApp</p>
              <p className="mt-2 font-serif text-[26px] leading-none text-[var(--ink)]">Message the studio</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] tracking-[0.16em] uppercase text-[var(--muted)] hover:text-[var(--ink)]"
            >
              Close
            </button>
          </div>
          <p className="mt-3 text-[13px] leading-6 text-[var(--muted)]">{contact.phone}</p>
          <label htmlFor="whatsapp-message" className="sr-only">
            Message
          </label>
          <textarea
            id="whatsapp-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            className="mt-4 w-full resize-none border border-[var(--line)] bg-[var(--sage)] px-3 py-3 text-[15px] leading-6 text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--line-strong)]"
          />
          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center bg-[#25D366] px-4 py-3 text-[11px] tracking-[0.18em] uppercase text-[#06210f] transition-opacity hover:opacity-90"
          >
            Send on WhatsApp
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Message Aumsh Ventures on WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-14 w-14">
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="#fff"
        d="M35.2 12.8A14.5 14.5 0 0 0 12.3 32.4L10 38.7l6.5-2.1a14.5 14.5 0 0 0 6.9 1.8h.1c8 0 14.5-6.5 14.5-14.5 0-3.9-1.5-7.5-4.3-10.1zM23.5 35.2h-.1a12 12 0 0 1-6.1-1.7l-.4-.3-3.9 1.3 1.3-3.8-.3-.4a12 12 0 0 1-1.8-6.4c0-6.6 5.4-12 12-12 3.2 0 6.2 1.2 8.5 3.5a11.9 11.9 0 0 1 3.5 8.5c0 6.6-5.4 12-12 12zm6.6-9c-.4-.2-2.1-1-2.4-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.7.1-.4-.2-1.5-.6-2.9-1.8-1.1-.9-1.8-2.1-2-2.5-.2-.4 0-.5.2-.7.2-.2.4-.4.5-.6.2-.2.2-.4.4-.6.1-.2 0-.5 0-.6-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.8 5.2 2.2.9 3 1 4.1.8.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"
      />
    </svg>
  );
}
