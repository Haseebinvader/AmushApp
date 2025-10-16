"use client";
import { useEffect } from "react";

export function useRevealOnScroll() {
  useEffect(() => {
    const revealables = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const onReveal = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          obs.unobserve(e.target);
        }
      });
    };
    const io = new IntersectionObserver((entries) => onReveal(entries, io), { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    revealables.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}


