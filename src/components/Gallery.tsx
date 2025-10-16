"use client";
import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Gallery() {
  useRevealOnScroll();
  const imgs = ["/gallery/one.svg", "/gallery/two.svg", "/gallery/three.svg", "/gallery/four.svg", "/gallery/five.svg"];
  return (
    <section id="gallery" className="py-20 md:py-28 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Gallery</h2>
            <p className="mt-3 text-[var(--muted-700)]">A glimpse of our recent work.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {imgs.map((src, i) => (
            <div key={src} className={`relative aspect-[4/3] overflow-hidden rounded-xl reveal ${i === 0 ? "col-span-2" : ""}`}>
              <Image src={src} alt="Gallery image" fill className="object-cover scale-[1.02] transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
