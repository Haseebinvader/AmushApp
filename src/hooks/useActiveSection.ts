"use client";
import { useEffect, useState } from "react";

export function useActiveSection(): string {
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = `#${(entry.target as HTMLElement).id}`;
        if (entry.isIntersecting) setActive(id);
      });
    };
    const io = new IntersectionObserver(onIntersect, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return active;
}


