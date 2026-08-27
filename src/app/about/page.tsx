import type { Metadata } from "next";
import Image from "next/image";
import { company, stats, values } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import HomeCta from "@/components/home/HomeCta";

export const metadata: Metadata = {
  title: "Our Story",
  description: company.storyLong,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A studio built"
        italic="for presence."
        description={company.storyLong}
      />

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--cream-deep)]">
            <Image
              src="/gallery/exhibition2.webp"
              alt="Aumsh exhibition environment"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper)] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-[var(--line)] pt-6">
              <p className="font-serif text-[56px] leading-none tracking-[-0.04em] text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="mt-3 text-[13px] tracking-[0.16em] uppercase text-[var(--muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading accent="how" title="we work" />
            <p className="mt-8 max-w-md text-[17px] leading-8 text-[var(--muted)]">
              {company.shortDescription} We combine spatial design with live production so the
              experience feels inevitable from first sketch to last cue.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            {values.map((value) => (
              <div key={value.title} className="border-t border-[var(--line)] pt-6">
                <h3 className="font-serif text-[28px] leading-none text-[var(--ink)]">
                  {value.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden bg-[var(--cream-deep)]" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/WMbx6fz2VVk"
              title="Aumsh Ventures showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
