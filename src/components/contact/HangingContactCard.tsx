import { company, contact } from "@/content/site";

type Detail = {
  label: string;
  lines: string[];
  href?: string;
  external?: boolean;
};

function studioLines(address: string) {
  const parts = address.split(",").map((part) => part.trim());
  if (parts.length < 5) return [address];
  return [parts[0], `${parts[1]}, ${parts[2]}`, `${parts[3]}, ${parts[4]}`];
}

const hourLines = contact.hours.split(",").map((part) => part.trim());

const details: Detail[] = [
  {
    label: "Email",
    lines: [contact.email],
    href: `mailto:${contact.email}`,
  },
  {
    label: "Telephone",
    lines: [contact.phone],
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Studio",
    lines: studioLines(contact.address),
    href: contact.mapLink,
    external: true,
  },
  {
    label: "Hours",
    lines: hourLines,
  },
];

export default function HangingContactCard() {
  return (
    <div className="relative flex h-full min-h-[640px] items-stretch justify-center overflow-hidden bg-[var(--plum)] px-6 md:min-h-[740px]">
      <div className="hang-tag flex w-full max-w-[292px] flex-col items-center md:max-w-[310px]">
        <div className="flex min-h-[72px] w-full flex-1 flex-col items-center" aria-hidden>
          <div className="flex flex-1 items-stretch justify-center gap-[4px]">
            <span className="hang-cord-strand" />
            <span className="hang-cord-strand" />
          </div>
          <div className="relative z-20 -mb-[7px] flex flex-col items-center">
            <div className="flex h-[22px] justify-center gap-[4px]">
              <span className="hang-cord-strand" />
              <span className="hang-cord-strand" />
            </div>
            <span className="hang-knot -mt-[3px]" />
          </div>
        </div>

        <article className="relative z-10 w-full bg-[#f7f5f1] px-8 pb-9 pt-0 shadow-[0_22px_48px_rgba(0,0,0,0.32),0_2px_8px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="hang-hole mx-auto mt-[18px]" aria-hidden />

          <header className="mt-9 text-center">
            <p className="hang-letterpress font-serif text-[44px] leading-none tracking-[-0.045em]">
              {company.shortName}
            </p>
            <p className="mt-2.5 text-[10px] font-medium tracking-[0.46em] uppercase text-[var(--plum)]">
              Ventures
            </p>
            <p className="mt-3 font-serif italic text-[15px] text-[var(--plum)]/65">
              {company.tagline}
            </p>
            <span className="mx-auto mt-6 block h-px w-8 bg-[var(--plum)]/20" />
          </header>

          <dl className="mt-7 space-y-5 text-center">
            {details.map((item) => {
              const body = (
                <span className="block text-[13.5px] leading-[1.55] text-[var(--plum)]">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              );

              return (
                <div key={item.label}>
                  <dt className="text-[10px] font-medium tracking-[0.4em] uppercase text-[var(--plum)]/70">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5">
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="transition-opacity hover:opacity-65"
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <p className="mt-8 text-center text-[9px] tracking-[0.36em] uppercase text-[var(--plum)]/65">
            Dubai
          </p>
        </article>

        <div className="min-h-10 flex-1" aria-hidden />
      </div>
    </div>
  );
}
