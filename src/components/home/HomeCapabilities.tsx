"use client";

import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function HomeCapabilities() {
  useRevealOnScroll();

  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            accent="Our"
            title="Capabilities"
            description="Where movement of people, brands, and ideas come together."
          />
          <Link
            href="/services"
            className="text-[11px] tracking-[0.18em] uppercase text-[var(--ink)] underline underline-offset-8 decoration-[var(--line-strong)] hover:decoration-[var(--ink)]"
          >
            View all services
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group reveal block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--cream-deep)]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="img-zoom object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-white/70">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-[32px] leading-none text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-6 text-[var(--muted)]">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
