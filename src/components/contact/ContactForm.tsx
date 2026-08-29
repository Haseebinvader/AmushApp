"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const companyName = String(data.get("company") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${companyName}\n${email}`
    );
    window.location.href = `mailto:Info@aumsh.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Company" name="company" />
      <Field label="Message" name="message" textarea required />
      <div className="flex items-center gap-6">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-[var(--ink)] px-8 py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--inverse)] transition-opacity hover:opacity-80"
        >
          Send message
        </button>
        {sent && (
          <p className="text-sm text-[var(--ink-soft)]">Opening your email client…</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared =
    "w-full bg-transparent pt-2 pb-3 text-[16px] text-[var(--ink)] outline-none placeholder:text-transparent";

  return (
    <label className="block border-b border-[var(--line)] focus-within:border-[var(--ink)]">
      <span className="text-[11px] tracking-[0.18em] uppercase text-[var(--muted)]">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={`${shared} resize-none`} />
      ) : (
        <input name={name} type={type} required={required} className={shared} />
      )}
    </label>
  );
}
