"use client";
import { useState } from "react";
import Image from "next/image";
import { services } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function Services() {
  useRevealOnScroll();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-20 md:py-32 bg-[var(--background)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-100)] rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--brand-200)] rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-100)] text-[var(--brand-700)] text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-600)]" />
              What We Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--brand-900)]">
              Our Services
            </h2>
            <p className="mt-3 text-lg text-[var(--muted-600)] max-w-xl">
              Five core capabilities tailored to your goals.
            </p>
          </div>

          {/* View all link */}
          <a
            href="#contact"
            className="reveal group hidden md:inline-flex items-center gap-2 text-[var(--brand-600)] hover:text-[var(--brand-700)] font-medium transition-colors"
          >
            Discuss your project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((svc, index) => (
            <div
              key={svc.id}
              className="group relative reveal cursor-pointer"
              onMouseEnter={() => setHoveredId(svc.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl border border-[var(--border-muted)] bg-black dark:bg-[#111] p-6 md:p-8 transition-all duration-500 ease-out
                hover:border-[var(--brand-300)] hover:shadow-2xl hover:shadow-[var(--brand-100)] dark:hover:shadow-[var(--brand-900)]/20
                hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--brand-50)] to-transparent opacity-0 transition-opacity duration-500 
                  ${hoveredId === svc.id ? 'opacity-100' : ''}`}
                />

                <div className="relative z-10">
                  {/* Icon with animated background */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-[var(--brand-100)] flex items-center justify-center transition-all duration-500
                      group-hover:bg-[var(--brand-200)] group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <div className="relative w-8 h-8 transition-transform duration-500 group-hover:scale-110">
                        <Image
                          src={svc.icon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {/* Decorative dot pattern */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-400)] absolute top-0 left-0" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-400)] absolute top-0 right-0" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-400)] absolute bottom-0 left-0" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-400)] absolute bottom-0 right-0" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[var(--brand-900)] mb-3 group-hover:text-[var(--brand-700)] transition-colors">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--muted-600)] leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--brand-400)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-600)] text-white font-medium hover:bg-[var(--brand-500)] transition-all hover:shadow-lg hover:shadow-[var(--brand-600)]/25 hover:-translate-y-0.5"
          >
            Discuss your project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Trust indicator */}
        <div className="mt-12 text-center reveal">
          <p className="text-sm text-[var(--muted-500)]">
            Trusted by leading brands worldwide • 500+ projects delivered • 98% client satisfaction
          </p>
        </div>
      </div>
    </section>
  );
}