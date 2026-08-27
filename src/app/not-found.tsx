import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-serif italic text-[22px] text-[var(--muted)]">404</p>
      <h1 className="mt-4 font-serif text-[52px] leading-none tracking-[-0.03em] text-[var(--ink)] md:text-[72px]">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-[16px] leading-7 text-[var(--muted)]">
        The page you requested does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-full bg-[var(--ink)] px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase text-[var(--cream)]"
      >
        Return home
      </Link>
    </section>
  );
}
