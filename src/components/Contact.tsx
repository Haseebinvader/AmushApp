"use client";
import { contact } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Contact() {
  useRevealOnScroll();
  return (
    <section id="contact" className="py-20 md:py-28 bg-[var(--section-alt)]">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h2>
          <p className="mt-3 text-[var(--muted-700)]">We’d love to learn about your next project.</p>
          <div className="mt-6 space-y-3 text-[var(--muted-700)]">
            <p><span className="font-medium text-white">Email:</span> {contact.email}</p>
            <p><span className="font-medium text-white">Phone:</span> {contact.phone}</p>
            <p><span className="font-medium text-white">Address:</span> {contact.address}</p>
          </div>
        </div>
        <form className="reveal rounded-2xl border border-[var(--border-muted)] bg-[#0d0d0d]/80 backdrop-blur-sm p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">First name</label>
              <input type="text" placeholder="John" className="mt-1 w-full rounded-md border border-[var(--border-muted)] bg-[#111111] text-white placeholder:text-[var(--muted-700)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Last name</label>
              <input type="text" placeholder="Doe" className="mt-1 w-full rounded-md border border-[var(--border-muted)] bg-[#111111] text-white placeholder:text-[var(--muted-700)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-white">Email</label>
            <input type="email" placeholder="you@company.com" className="mt-1 w-full rounded-md border border-[var(--border-muted)] bg-[#111111] text-white placeholder:text-[var(--muted-700)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-white">Message</label>
            <textarea rows={5} placeholder="Tell us about your event" className="mt-1 w-full rounded-md border border-[var(--border-muted)] bg-[#111111] text-white placeholder:text-[var(--muted-700)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40"></textarea>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs text-[var(--muted-700)]">We’ll never share your information.</p>
            <button type="button" onClick={() => alert("Coming soon")} className="cursor-pointer inline-flex justify-center items-center rounded-md bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}


