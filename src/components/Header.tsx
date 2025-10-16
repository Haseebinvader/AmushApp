"use client";
import { useState } from "react";
import { nav, company } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
// Using a plain img for the small logo to avoid any loader issues

export default function Header() {
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-[var(--border-muted)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 font-semibold text-[var(--brand-900)]">
          <span className="relative inline-block h-12 md:h-14 w-12 md:w-14 overflow-visible">
            <img src="/amushlogo1.png" alt="Amush Ventures" className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] scale-[1.6] origin-left" />
          </span>
          <span>{company.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${active === item.href ? "text-white" : "text-[var(--muted-700)] hover:text-white"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button aria-label="Toggle menu" className="md:hidden inline-flex items-center justify-center rounded-md border border-[var(--border-muted)] px-3 py-2 text-white" onClick={() => setMobileOpen((v) => !v)}>
          <span className="block w-5 h-[2px] bg-white" />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-muted)] bg-[var(--section-alt)]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`py-2 ${active === item.href ? "text-white" : "text-[var(--muted-700)] hover:text-white"}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
