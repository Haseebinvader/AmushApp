import type { Metadata } from "next";
import { contact } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
// import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Stay in Touch",
  description: "Start a project with Aumsh Ventures in Dubai.",
};

export default function ContactPage() {
  const details = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: "Studio", value: contact.address },
    { label: "Hours", value: contact.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Stay in Touch"
        title="Tell us about"
        italic="the next room."
        description="We would love to learn about your exhibition, event, or activation."
      />

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {details.map((item) => (
                <div key={item.label} className="border-t border-[var(--line)] pt-5">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 block text-[17px] leading-7 text-[var(--ink)] hover:opacity-70"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-[17px] leading-7 text-[var(--ink)]">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div> */}
          <div className="relative overflow-hidden bg-[var(--cream-deep)] lg:col-span-6 lg:col-start-7" style={{ minHeight: 480 }}>
            <iframe
              src={contact.mapEmbed}
              title="Aumsh Ventures studio location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            <a
              href={contact.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-[11px] tracking-[0.18em] uppercase text-[var(--ink)] underline underline-offset-8"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden bg-[var(--cream-deep)]" style={{ minHeight: 480 }}>
            <iframe
              src={contact.mapEmbed}
              title="Aumsh Ventures studio location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <a
            href={contact.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex text-[11px] tracking-[0.18em] uppercase text-[var(--ink)] underline underline-offset-8"
          >
            Open in Google Maps
          </a>
        </div>
      </section> */}
    </>
  );
}
