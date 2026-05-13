"use client";
import { contact } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  Building2
} from "lucide-react";

export default function Contact() {
  useRevealOnScroll();

  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600",
    },
    {
      icon: MapPin,
      label: "Address",
      value: contact.address,
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-600",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-[var(--section-alt)] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--brand-100)] rounded-full opacity-20 blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--brand-200)] rounded-full opacity-20 blur-3xl translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-100)] text-[var(--brand-700)] text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--brand-900)]">
            Contact Us
          </h2>
          <p className="mt-3 text-lg text-[var(--muted-600)] max-w-xl mx-auto">
            We would love to learn about your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="reveal">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className={`group relative p-5 rounded-xl border border-[var(--border-muted)]  dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:border-[var(--brand-300)] hover:-translate-y-1`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-[var(--brand-100)] dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    
                    <h3 className="text-sm font-medium text-[var(--muted-600)] mb-1">
                      {item.label}
                    </h3>
                    
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[var(--brand-900)] dark:text-white font-semibold hover:text-[var(--brand-600)] transition-colors inline-flex items-center gap-1 group/link"
                      >
                        {item.value}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className="text-[var(--brand-900)] dark:text-white font-semibold">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Company Info */}
            <div className="p-6 rounded-2xl dark:bg-gray-800 border border-[var(--border-muted)] shadow-sm reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-600)] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--brand-900)]">Office Location</h3>
                  <p className="text-sm text-[var(--muted-600)]">Visit us at our headquarters</p>
                </div>
              </div>
              <p className="text-[var(--muted-700)] leading-relaxed ml-[52px]">
                {contact.address}
              </p>
            </div>

            {/* Quick Response Promise */}
            <div className="mt-6 p-4 rounded-xl bg-[var(--brand-50)] dark:bg-gray-800/50 border border-[var(--brand-200)] dark:border-gray-700 reveal">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm text-[var(--brand-700)] dark:text-gray-300">
                  We typically respond within 2-4 hours during business days
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="reveal">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-muted)] shadow-lg">
              {/* Map */}
              <div className="relative w-full" style={{ minHeight: '610px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.3333497060835!2d55.29928282543423!3d25.158219677736056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c36f082541%3A0x16f65b407bb87f9!2sMeydan%20Grandstand!5e0!3m2!1sen!2s!4v1778526556190!5m2!1sen!2s"
                  width="100%"
                  height="500"
                  style={{ border: 0, minHeight: '610px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  className="w-full"
                />
              </div>

              {/* Map overlay with CTA */}
              <div className="absolute bottom-4 left-4 right-4">
                <a
                  href="https://maps.google.com/?q=Meydan+Grandstand+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl dark:bg-gray-800/95 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--brand-900)]">
                      Get Directions
                    </p>
                    <p className="text-xs text-[var(--muted-600)]">
                      Open in Google Maps
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[var(--brand-600)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}