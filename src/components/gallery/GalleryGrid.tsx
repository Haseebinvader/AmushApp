"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type LightboxState = {
  categoryId: string;
  index: number;
};

function tileSpan(index: number) {
  if (index === 0) return "md:col-span-2 md:row-span-2";
  if (index % 7 === 3) return "md:col-span-2";
  if (index % 8 === 5) return "md:row-span-2";
  return "";
}

export default function GalleryGrid() {
  const [activeId, setActiveId] = useState("all");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const visibleCategories = useMemo(
    () =>
      activeId === "all"
        ? galleryCategories
        : galleryCategories.filter((category) => category.id === activeId),
    [activeId]
  );

  useRevealOnScroll([activeId]);

  const activeLightboxCategory = lightbox
    ? galleryCategories.find((category) => category.id === lightbox.categoryId)
    : undefined;
  const activeItem = activeLightboxCategory?.items[lightbox?.index ?? -1];

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => {
    setLightbox((current) => {
      if (!current) return current;
      const category = galleryCategories.find((item) => item.id === current.categoryId);
      if (!category) return current;
      return { ...current, index: (current.index + 1) % category.items.length };
    });
  }, []);
  const prev = useCallback(() => {
    setLightbox((current) => {
      if (!current) return current;
      const category = galleryCategories.find((item) => item.id === current.categoryId);
      if (!category) return current;
      return {
        ...current,
        index: (current.index - 1 + category.items.length) % category.items.length,
      };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, next, prev]);

  return (
    <>
      <div className="sticky top-[88px] z-40 -mx-5 mb-12 border-y border-[var(--line)] bg-[var(--sage)]/92 backdrop-blur-md md:top-[96px] md:-mx-10">
        <div className="flex gap-2 overflow-x-auto px-5 py-4 md:px-10">
          <CategoryChip
            label="All work"
            count={galleryCategories.reduce((sum, category) => sum + category.items.length, 0)}
            active={activeId === "all"}
            onClick={() => setActiveId("all")}
          />
          {galleryCategories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.title}
              count={category.items.length}
              active={activeId === category.id}
              onClick={() => setActiveId(category.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-20 md:space-y-28">
        {visibleCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            index={galleryCategories.findIndex((item) => item.id === category.id)}
            solo={activeId !== "all"}
            featured
            onOpen={(index) => setLightbox({ categoryId: category.id, index })}
          />
        ))}
      </div>

      {lightbox && activeLightboxCategory && activeItem && (
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
          <div className="absolute top-6 left-6">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
              {activeLightboxCategory.title}
            </p>
            <p className="mt-2 text-[12px] tracking-[0.16em] text-[var(--ink)]/70">
              {String(lightbox.index + 1).padStart(2, "0")} /{" "}
              {String(activeLightboxCategory.items.length).padStart(2, "0")}
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className="absolute left-4 text-[var(--ink)] md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div
            className="relative mx-12 h-[78vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
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

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--plum)] text-white"
          : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
      }`}
    >
      {label}
      <span className={`ml-2 ${active ? "text-white/70" : "text-[var(--muted)]"}`}>
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}

function CategorySection({
  category,
  index,
  solo,
  featured,
  onOpen,
}: {
  category: GalleryCategory;
  index: number;
  solo: boolean;
  featured: boolean;
  onOpen: (index: number) => void;
}) {
  const [hero, ...rest] = category.items;

  return (
    <section id={category.id} className="scroll-mt-44">
      <div className="mb-8 flex flex-col gap-6 border-t border-[var(--line)] pt-8 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.24em] uppercase text-[var(--accent)]">
            {String(index + 1).padStart(2, "0")} · {category.title}
          </p>
          <h2 className="mt-3 font-serif text-[42px] leading-none tracking-[-0.03em] text-[var(--ink)] md:text-[56px]">
            <em className="italic font-normal text-[var(--accent)]">{category.accent}</em>{" "}
            {category.title}
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-[var(--muted)]">
            {category.description}
          </p>
        </div>
        <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--muted)]">
          {String(category.items.length).padStart(2, "0")} works
        </p>
      </div>

      {featured && hero && (
        <button
          type="button"
          onClick={() => onOpen(0)}
          className="group reveal relative mb-3 aspect-[16/9] w-full overflow-hidden bg-[var(--cream-deep)] md:mb-4 md:aspect-[21/9]"
          aria-label={`Open ${hero.alt}`}
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            className="img-zoom object-cover"
            sizes="100vw"
            priority={solo || index === 0}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-8">
            <p className="font-serif text-[22px] text-white md:text-[28px]">{hero.alt}</p>
            <p className="hidden text-[11px] tracking-[0.18em] uppercase text-white/70 md:block">
              View series
            </p>
          </div>
        </button>
      )}

      <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
        {(featured ? rest : category.items).map((item, itemIndex) => {
          const galleryIndex = featured ? itemIndex + 1 : itemIndex;
          return (
            <GalleryTile
              key={item.src}
              item={item}
              span={tileSpan(galleryIndex)}
              onOpen={() => onOpen(galleryIndex)}
            />
          );
        })}
      </div>
    </section>
  );
}

function GalleryTile({
  item,
  span,
  onOpen,
}: {
  item: GalleryItem;
  span: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group reveal relative overflow-hidden bg-[var(--cream-deep)] ${span}`}
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
  );
}
