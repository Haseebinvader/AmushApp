import Link from "next/link";

export default function HomeCta() {
  return (
    <section className="bg-[var(--plum)] px-5 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="font-serif italic text-[22px] text-white/70">Ready when you are</p>
        <h2 className="mt-4 font-serif text-[44px] leading-[1] tracking-[-0.03em] md:text-[68px]">
          Let us build the visibility
          <br />
          your brand deserves.
        </h2>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center rounded-full bg-[var(--ink)] px-8 py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--inverse)] transition-opacity hover:opacity-80"
        >
          Stay in Touch
        </Link>
      </div>
    </section>
  );
}
