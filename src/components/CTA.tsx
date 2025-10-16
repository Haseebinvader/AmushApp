"use client";

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28 bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to create something unforgettable?</h2>
        <p className="mt-3 text-[var(--muted-700)] max-w-2xl mx-auto">From concept to showtime, our team delivers end-to-end production with precision and style.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#contact" className="inline-flex items-center rounded-md bg-white text-black px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">Start a Project</a>
          <a href="#services" className="inline-flex items-center rounded-md border border-[var(--border-muted)] text-white px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors">See Services</a>
        </div>
      </div>
    </section>
  );
}
