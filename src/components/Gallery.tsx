"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  useRevealOnScroll();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const imgs = [
    { src: "/gallery/mzLiberec.jpeg", span: "row-span-2 col-span-2" },
    { src: "/gallery/img4.jpeg", span: "" },
    { src: "/gallery/IQAIR.jpeg", span: "col-span-2" },
    { src: "/gallery/img3.jpeg", span: "" },
    { src: "/gallery/gal1.jpeg", span: "row-span-2" },
    { src: "/gallery/gal2.jpeg", span: "col-span-2" },
    { src: "/gallery/gal3.jpeg", span: "" },
    { src: "/gallery/gal4.jpeg", span: "" },
    { src: "/gallery/imagecons.png", span: "" },
    { src: "/gallery/imgcons2.png", span: "" },
    { src: "/gallery/gal8.jpeg", span: "col-span-2" },
    { src: "/gallery/gal9.jpeg", span: "" },
    { src: "/gallery/gal10.jpeg", span: "" },
  ];

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset";
  }, []);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (selectedIndex === null) return;
      const newIndex =
        direction === "prev"
          ? (selectedIndex - 1 + imgs.length) % imgs.length
          : (selectedIndex + 1) % imgs.length;
      setSelectedIndex(newIndex);
    },
    [selectedIndex, imgs.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, navigate]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-900)]">
              Gallery
            </h2>
            <p className="mt-3 text-[var(--muted-700)]">
              A glimpse of our recent work.
            </p>
          </div>
          <p className="text-sm text-[var(--muted-600)] hidden md:block">
            Click to expand
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
          {imgs.map((img, index) => (
            <div
              key={img.src}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl reveal cursor-pointer group ${img.span}`}
              role="button"
              tabIndex={0}
              aria-label={`View gallery image ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              {/* Skeleton loader */}
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-[var(--muted-200)] animate-pulse" />
              )}
              <Image
                src={img.src}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={`object-cover transition-all duration-700 group-hover:scale-105 ${loadedImages.has(index) ? "opacity-100" : "opacity-0"
                  }`}
                onLoad={() => handleImageLoad(index)}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-gray-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
            {selectedIndex + 1} / {imgs.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("prev");
            }}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imgs[selectedIndex].src}
              alt={`Gallery image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
              quality={90}
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("next");
            }}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}