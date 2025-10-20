"use client";
import { company } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function About() {
  useRevealOnScroll();
  return (
    <section id="about" className="py-20 md:py-28 bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Us</h2>
          <p className="mt-4 text-[var(--muted-700)] text-lg leading-8">
            {company.shortDescription} We combine creativity with technology to craft seamless experiences for brands across exhibitions, live events, and digital activations.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { t: "Exhibition Design", d: "From creative concept to final build, delivering immersive spaces that inspire audiences." },
            { t: "eSports Staging", d: "Complete tournament setups with staging, seating, lighting, and live broadcast integration." },
            { t: "Event Production", d: "Comprehensive event planning and execution with technical precision and seamless delivery." },
            { t: "Interactive Tech", d: "Innovative AR, VR, and LED experiences designed to engage, entertain, and captivate visitors." },
            { t: "Aerial Media", d: "Dynamic drone shows and cinematic aerial footage that enhance your storytelling and visuals." },
            { t: "Fit-out and Kiosks", d: "Tailored booths, kiosks, and pavilions crafted to elevate brand presence at any exhibition." }
          ]
            .map((item) => (
              <div key={item.t} className="cursor-pointer rounded-xl bg-[#111111] border border-[var(--border-muted)] p-6 reveal transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <p className="font-semibold text-white">{item.t}</p>
                <p className="text-sm text-[var(--muted-700)] mt-2">{item.d}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
