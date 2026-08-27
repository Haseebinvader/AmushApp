"use client";

import { testimonials } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function HomeTestimonials() {
  useRevealOnScroll();

  return (
    <section className="bg-[var(--surface-dark)] px-5 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal mb-14">
          <SectionHeading
            tone="dark"
            accent="Our"
            title="Clients"
            description="Words from partners who have built rooms with us."
          />
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="reveal border-t border-white/15 pt-8">
              <p className="font-serif text-[22px] leading-8 text-white">
                “{item.content}”
              </p>
              <footer className="mt-8">
                <cite className="not-italic text-[14px] text-white">{item.author}</cite>
                <p className="mt-1 text-[13px] text-white/50">
                  {item.title}, {item.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
