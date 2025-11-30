"use client";
import { useState } from "react";
import { nav, company } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Header() {
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();    
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 dark:bg-black/60 light:bg-black/60  border-b border-[var(--border-muted)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 font-semibold text-white">
          <span className="relative inline-block h-12 md:h-14 w-12 md:w-14 overflow-visible">
            <Image src="/aumshlogoapp.png" alt="Aumsh Ventures" className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] scale-[1.6] origin-left" width={50} height={50} />
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
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
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
