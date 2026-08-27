"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { company, contact, nav, social } from "@/content/site";
import BrandMark from "../ui/BrandMark";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="bg-[var(--surface-dark)] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <BrandMark size="footer" />
          <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/60">
            {company.story}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/40">Navigate</p>
          <div className="mt-5 flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] text-white/75 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/40">
            Join our newsletter
          </p>
          <form onSubmit={onSubmit} className="mt-5">
            <div className="flex items-end border-b border-white/35 pb-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                className="shrink-0 text-[11px] tracking-[0.18em] uppercase text-white"
              >
                Send
              </button>
            </div>
            {sent && <p className="mt-3 text-sm text-white/70">Thank you. You are on the list.</p>}
          </form>

          <div className="mt-10 space-y-2 text-[15px] leading-7 text-white/70">
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/40">Contact us</p>
            <p>{contact.address}</p>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="block hover:text-white">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="block hover:text-white">
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5 text-[12px] tracking-[0.08em] text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase tracking-[0.16em] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
