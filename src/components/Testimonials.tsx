"use client";

import { Quote, Star } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Testimonials() {
  useRevealOnScroll();

  const testimonials = [
    {
      id: 1,
      content: `This letter serves as a reference to Aumsh Ventures that they have been our preferred vendor and have delivered utmost professional service and utmost quality stands on time. Some of the references for stands done for us by them are ARAB BANK, PHILIPS, EQUATE, and SLNEE. We recommend this vendor to anyone trying to have a professional relationship with a great service and a dedicated team who delivers quality projects.`,
      author: "Mr. Firas Soweid",
      title: "Managing Director",
    //   company: "Talents Flow DMCC",
    },
    {
      id: 2,
      content: `I am writing to express my sincere appreciation for the exceptional work the team at Aumsh Ventures has provided since our partnership began in 2015. Over the years, its dedication, professionalism, and innovative approach have helped us achieve remarkable results. In particular, I would like to highlight their outstanding contribution during the Levi's Pavilion at Sole DXB 2019-20. Their ability to capture Levi's brand essence while delivering an unforgettable experience truly set the pavilion apart.`,
      author: "Akshaya Singh Chaanano",
      title: "Director – PR",
    //   company: "DLF Shopping Mall",
    },
    {
      id: 3,
      content: `This letter serves as a professional reference for Aumsh Ventures who successfully completed major projects with us, including KMW + NEXTER - IDEX Abu Dhabi, Russian Pavilion - Expo 2020, Gabon Pavilion - Expo 2020, and EWC World Cup Riyadh 2022 & 2024. Their professionalism, dedication, and commitment to high-quality results exceeded expectations. We highly recommend Aumsh Ventures for their exceptional performance, work ethic, and value-added services.`,
      author: "Petr Krejci",
      title: "CEO",
    //   company: "EXPone Exponex s.r.o.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-black text-white dark:bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-[var(--brand-900)]">
          What Our Clients Say
        </h2>
        <p className="mt-3 text-gray-400 dark:text-[var(--muted-700)]">
          Genuine words from our long-term partners and clients.
        </p>

        {/* Testimonials Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group reveal rounded-2xl border border-gray-800 dark:border-[var(--border-muted)] bg-[#111] dark:bg-[var(--brand-50)] p-6 transition-all duration-300 ease-out shadow-md hover:shadow-[0_10px_40px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 text-gray-500 dark:text-[var(--brand-700)] mb-4 opacity-80" />

              <p className="text-gray-300 dark:text-[var(--brand-700)] leading-7 italic">
                “{t.content}”
              </p>

              <div className="mt-6 border-t border-gray-800 dark:border-[var(--border-muted)] pt-4">
                <h4 className="text-lg font-semibold text-white dark:text-[var(--brand-900)]">
                  {t.author}
                </h4>
                <p className="text-sm text-gray-400 dark:text-[var(--brand-700)]">
                  {t.title}
                </p>
              </div>
              <div className="flex justify-left mt-4">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
