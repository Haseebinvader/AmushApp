"use client";
import { company } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Image from "next/image";

export default function Hero() {
  useRevealOnScroll();
  return (
    <section className="relative min-h-[100vh] flex items-center" id="home">
      {/* <video
        src="/herobgvideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center blur-xs md:blur-sm"
      /> */}

      {/* Contrast overlay above video */}
      <div aria-hidden className="absolute inset-0 bg-black/40 dark:bg-black/40 light:bg-white/20 -z-10" />
      {/* <Image src="/herobg.jpg" alt="Hero background" fill className="absolute inset-0 w-full h-full object-cover object-center blur-xs md:blur-sm" /> */}

      {/* Floating gradient circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[var(--brand-600)] opacity-20 blur-3xl float-slow"></div>
        <div className="absolute top-24 right-10 w-72 h-72 rounded-full bg-[var(--brand-300)] opacity-20 blur-3xl float-slow float-delay-1"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-[var(--brand-900)] opacity-10 blur-3xl float-slow float-delay-2"></div>
      </div>

      {/* Hero content */}
      <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl reveal">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[var(--brand-900)] drop-shadow-sm">
            {company.tagline}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[var(--muted-700)]">
            {company.shortDescription}
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="#services"
              className="inline-flex items-center rounded-md bg-[var(--brand-700)] text-white dark:text-[var(--background)] px-5 py-3 text-sm font-medium hover:bg-[var(--brand-600)] transition-colors"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-white/40 text-white px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
