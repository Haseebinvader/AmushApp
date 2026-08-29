"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function GalleryGrid() {
  useRevealOnScroll();
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => {
    setSelected((i) => (i === null ? i : (i + 1) % gallery.length));
  }, []);
  const prev = useCallback(() => {
    setSelected((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close, next, prev]);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-4 md:gap-4">
        {gallery.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setSelected(index)}
            className={`group reveal relative overflow-hidden bg-[var(--cream-deep)] ${item.span ?? ""}`}
            aria-label={`Open ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="img-zoom object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--surface-dark)]/94"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 text-[var(--ink)]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <p className="absolute top-6 left-6 text-[12px] tracking-[0.16em] text-[var(--ink)]/70">
            {String(selected + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 text-[var(--ink)] md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div
            className="relative mx-12 h-[78vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[selected].src}
              alt={gallery[selected].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 text-[var(--ink)] md:right-8"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}
