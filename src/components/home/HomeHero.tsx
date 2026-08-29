"use client";

import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function HomeHero() {
  useRevealOnScroll();

  return (
    <section className="relative overflow-hidden px-5 pt-40 pb-16 md:px-10 md:pt-48 md:pb-24">
      <div className="mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="reveal text-[11px] tracking-[0.28em] uppercase text-[var(--accent)]">
            Dubai · Exhibitions & Events
          </p>
          <h1 className="reveal mt-6 font-serif text-[56px] leading-[0.92] tracking-[-0.035em] text-[var(--ink)] md:text-[84px] lg:text-[96px]">
            {company.welcome}
          </h1>
          <p className="reveal mt-4 font-serif italic text-[28px] leading-none text-[var(--accent)] md:text-[36px]">
            {company.tagline}
          </p>
          <p className="reveal mt-8 max-w-lg text-[17px] leading-8 text-[var(--muted)]">
            {company.story}
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-[var(--ink)] px-7 py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--inverse)] transition-colors hover:bg-[var(--plum)] hover:text-[var(--ink)]"
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-2 py-3.5 text-[11px] tracking-[0.18em] uppercase text-[var(--ink)]"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="reveal lg:col-span-6">
          <div className="group relative aspect-[4/5] overflow-hidden bg-[var(--cream-deep)] md:aspect-[5/4]">
            <Image
              src="/herohero.png"
              alt="Aumsh Ventures production"
              fill
              priority
              className="img-zoom object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
