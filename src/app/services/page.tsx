import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { company, process, services } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import HomeCta from "@/components/home/HomeCta";

export const metadata: Metadata = {
  title: "Services",
  description: company.shortDescription,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five practices."
        italic="One production."
        description="Exhibition, live event, eSports, technology, and aerial work — designed and delivered as a single experience."
      />

      <section className="px-5 pb-8 md:px-10">
        <div className="mx-auto max-w-[1440px] space-y-20 md:space-y-28">
          {services.map((service, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12"
              >
                <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <div className="group relative aspect-[16/10] overflow-hidden bg-[var(--cream-deep)]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="img-zoom object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")} · {service.eyebrow}
                  </p>
                  <h2 className="mt-4 font-serif text-[48px] leading-none tracking-[-0.03em] text-[var(--ink)]">
                    {service.title}
                  </h2>
                  <p className="mt-6 text-[17px] leading-8 text-[var(--ink-soft)]">
                    {service.longDescription}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex text-[11px] tracking-[0.18em] uppercase text-[var(--ink)] underline underline-offset-8"
                  >
                    Discuss this service
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-20 border-t border-[var(--line)] bg-[var(--paper)] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading accent="the" title="process" />
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="border-t border-[var(--line)] pt-6">
                <p className="font-serif italic text-[22px] text-[var(--muted)]">{item.step}</p>
                <h3 className="mt-3 font-serif text-[28px] leading-none text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
