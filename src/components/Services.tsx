"use client";
import Image from "next/image";
import { services } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Services() {
  useRevealOnScroll();
  return (
    <section id="services" className="py-20 md:py-28 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Services</h2>
        <p className="mt-3 text-[var(--muted-700)]">Five core capabilities tailored to your goals.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {services.map((svc) => (
            <div key={svc.id} className="group rounded-2xl border border-[var(--border-muted)] bg-[#111111] p-6 transition-all duration-300 ease-out shadow-sm hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1 reveal">
              <div className="flex items-center gap-3">
                <Image src={svc.icon} alt="" width={40} height={40} />
                <h3 className="text-xl font-semibold text-white">{svc.title}</h3>
              </div>
              <p className="mt-3 text-[var(--muted-700)] leading-7">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
