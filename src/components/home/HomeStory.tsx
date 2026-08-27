"use client";

import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function HomeStory() {
  useRevealOnScroll();

  return (
    <section className="border-y border-[var(--line)] bg-white px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden bg-[var(--cream-deep)]">
            <Image
              src="/gallery/gal8.jpeg"
              alt="Aumsh studio and production"
              fill
              className="img-zoom object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </div>
        <div className="reveal lg:col-span-6 lg:col-start-7">
          <SectionHeading accent="Our" title="Story" />
          <p className="mt-8 text-[17px] leading-8 text-[var(--ink-soft)]">
            {company.storyLong}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex text-[11px] tracking-[0.18em] uppercase text-[var(--ink)] underline underline-offset-8 decoration-[var(--line-strong)] hover:decoration-[var(--ink)]"
          >
            Read the story
          </Link>
        </div>
      </div>
    </section>
  );
}
