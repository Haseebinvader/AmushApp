import type { Metadata } from "next";
import { contact } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import HangingContactCard from "@/components/contact/HangingContactCard";
// import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Stay in Touch",
  description: "Start a project with Aumsh Ventures in Dubai.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in Touch"
        title="Tell us about"
        italic="the next room."
        description="We would love to learn about your exhibition, event, or activation."
      />

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <HangingContactCard />
          </div>
          {/* <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div> */}
          <div className="relative min-h-[480px] overflow-hidden bg-[var(--cream-deep)] lg:col-span-7 lg:min-h-[740px]">
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
              className="absolute bottom-5 left-5 z-10 inline-flex bg-[var(--paper)] px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase text-[var(--ink)] transition-opacity hover:opacity-70"
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
