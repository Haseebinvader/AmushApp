"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import MenuOverlay from "./MenuOverlay";
import BrandMark from "../ui/BrandMark";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const pinned = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
          pinned
            ? "overflow-hidden bg-[var(--paper)]/95 backdrop-blur-md border-b border-[var(--line)]"
            : "overflow-visible bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-5 md:h-[96px] md:px-10">
          <Link
            href="/"
            className={`relative z-[60] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pinned ? "self-center" : "self-start"
            }`}
            aria-label="Aumsh Ventures home"
          >
            <BrandMark
              size="header"
              compact={pinned}
              className={pinned ? "shadow-none" : "shadow-[0_18px_44px_rgba(0,0,0,0.28)]"}
            />
          </Link>

          <nav className="hidden h-[88px] items-center gap-9 lg:flex md:h-[96px]" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[12px] tracking-[0.22em] uppercase transition-colors ${
                    active
                      ? "text-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[var(--plum)] transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex h-[88px] items-center gap-4 md:h-[96px]">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-full bg-[var(--ink)] px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-white transition-colors hover:bg-[var(--plum)]"
            >
              Start a Project
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-[var(--ink)] transition-all duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-[var(--ink)] transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-[var(--ink)] transition-all duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
