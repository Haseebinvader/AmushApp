"use client";

import { useEffect, useState } from "react";
import { company } from "@/content/site";
import BrandMark from "@/components/ui/BrandMark";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--surface-dark)]">
      <BrandMark size="splash" />
      <p className="mt-7 font-serif italic text-[20px] text-white/70">{company.tagline}</p>
    </div>
  );
}
