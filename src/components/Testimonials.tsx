"use client";

import { useState, useEffect, useCallback } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Building2, Briefcase } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Testimonials() {
  useRevealOnScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      id: 1,
      content: `Aumsh Ventures has been our preferred vendor, consistently delivering top-quality stands with exceptional professionalism and timeliness. Their dedicated team ensures every project is executed flawlessly, making them a trusted partner for anyone seeking reliable, high-quality service.`,
      author: "Mr. Firas Soweid",
      title: "Managing Director",
      company: "Talent Flow DMCC",
      rating: 5,
      highlight: "Preferred Vendor",
    },
    {
      id: 2,
      content: `Aumsh Ventures has been an exceptional partner since 2015. Their professionalism, creativity, and innovative approach consistently deliver remarkable results. Their work on the Levi's Pavilion at Sole DXB truly stood out — perfectly capturing the brand's essence and creating an unforgettable experience.`,
      author: "Akshaya Singh Chauhan",
      title: "Director",
      company: "Cranberry",
      rating: 5,
      highlight: "Partner Since 2015",
    },
    {
      id: 3,
      content: `Aumsh Ventures has consistently exceeded our expectations through their professionalism, dedication, and attention to detail. From the Expo 2020 pavilions to the EWC World Cup in Riyadh, their flawless execution and commitment to excellence make them a trusted partner we highly recommend.`,
      author: "Petr Krejci",
      title: "CEO",
      company: "Exponex s.r.o.",
      rating: 5,
      highlight: "Expo 2020 Partner",
    },
  ];

  const nextTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevTestimonial();
      if (e.key === "ArrowRight") nextTestimonial();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevTestimonial, nextTestimonial]);

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-32 bg-black text-white dark:bg-[var(--background)] transition-colors duration-300 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-500)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--brand-300)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-[var(--brand-100)] text-white/80 dark:text-[var(--brand-700)] text-sm font-medium mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-[var(--brand-900)]">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-gray-400 dark:text-[var(--muted-700)] max-w-xl mx-auto">
            Genuine words from our long-term partners and clients.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out
                  ${index === activeIndex 
                    ? 'opacity-100 translate-x-0 scale-100 z-10' 
                    : 'opacity-0 translate-x-8 scale-95 z-0 pointer-events-none'
                  }`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="h-full rounded-3xl border border-gray-800 dark:border-[var(--border-muted)] bg-gray-800 dark:from-[var(--brand-50)] dark:to-white p-8 md:p-10 shadow-2xl">
                  {/* Quote icon and highlight badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <Quote className="w-12 h-12 text-[var(--brand-500)] opacity-40" />
                      <Quote className="w-12 h-12 text-[var(--brand-500)] opacity-20 absolute top-1 left-1" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-500)]/20 text-[var(--brand-400)] text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      {testimonial.highlight}
                    </span>
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg md:text-xl text-black dark:text-white leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {testimonial.author.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white dark:text-[var(--brand-900)]">
                        {testimonial.author}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-[var(--muted-600)]">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{testimonial.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-[var(--muted-600)]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{testimonial.company}</span>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-[var(--brand-100)] dark:hover:bg-[var(--brand-200)] backdrop-blur-sm transition-all hover:scale-110 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white dark:text-[var(--brand-700)]" />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }}
                  className={`transition-all duration-300 rounded-full
                    ${index === activeIndex 
                      ? 'w-8 h-2 bg-[var(--brand-500)]' 
                      : 'w-2 h-2 bg-gray-600 dark:bg-gray-400 hover:bg-gray-500'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-[var(--brand-100)] dark:hover:bg-[var(--brand-200)] backdrop-blur-sm transition-all hover:scale-110 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white dark:text-[var(--brand-700)]" />
            </button>
          </div>

          {/* Auto-play toggle */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-500 transition-colors"
            >
              {isAutoPlaying ? 'Pause' : 'Play'} auto-rotate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}