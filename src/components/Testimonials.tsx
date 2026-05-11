"use client";

import { Quote, Star } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Testimonials() {
  useRevealOnScroll();

  const testimonials = [
    {
      id: 1,
      content: `Aumsh Ventures has been our preferred vendor, consistently delivering top-quality stands with exceptional professionalism and timeliness. Their dedicated team ensures every project is executed flawlessly, making them a trusted partner for anyone seeking reliable, high-quality service.`,
      author: "Mr. Firas Soweid",
      title: "Managing Director",
      company: "Talent Flow DMCC",
    },
    {
      id: 2,
      content: `Aumsh Ventures has been an exceptional partner since 2015. Their professionalism, creativity, and innovative approach consistently deliver remarkable results. Their work on the Levi’s Pavilion at Sole DXB truly stood out — perfectly capturing the brand’s essence and creating an unforgettable experience.`,
      author: "Akshaya Singh Chauhan",
      title: "Director",
      company: "Cranberry",
    },
    {
      id: 3,
      content: `Aumsh Ventures has consistently exceeded our expectations through their professionalism, dedication, and attention to detail. From the Expo 2020 pavilions to the EWC World Cup in Riyadh, their flawless execution and commitment to excellence make them a trusted partner we highly recommend.`,
      author: "Petr Krejci",
      title: "CEO",
      company: "Exponex s.r.o.",
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
                <p className="text-sm text-gray-400 dark:text-[var(--brand-700)]">
                  {t.company}
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
