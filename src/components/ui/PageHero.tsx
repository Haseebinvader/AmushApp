type PageHeroProps = {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
};

export default function PageHero({ eyebrow, title, italic, description }: PageHeroProps) {
  return (
    <section className="px-5 pt-40 pb-16 md:px-10 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-[1440px]">
        {eyebrow && (
          <p className="mb-5 text-[11px] tracking-[0.24em] uppercase text-[var(--accent)]">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-serif text-[52px] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] md:text-[80px]">
          {title}
          {italic && (
            <>
              <br />
              <em className="italic font-normal text-[var(--accent)]">{italic}</em>
            </>
          )}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-[17px] leading-8 text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
