"use client";

export default function Clients() {
  const brands = ["AURORA", "SPECTRA", "NOVA", "LYRA", "ORION"];
  return (
    <section id="clients" className="py-16 md:py-24 bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Trusted by leading brands</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 opacity-80 ">
          {brands.map((brand) => (
            <div key={brand} className="h-16 rounded-lg border border-[var(--border-muted)] bg-[#111111] flex items-center justify-center text-[var(--muted-700)] tracking-widest">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
