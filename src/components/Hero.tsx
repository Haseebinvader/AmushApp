"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { company } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { ArrowDown, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  useRevealOnScroll();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToNext = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      id="home"
    >
      {/* Video Background */}
      <div className="absolute inset-0 -z-20">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `scale(${1 + scrollProgress * 0.1})`,
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>

        {/* Fallback image while video loads */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
               style={{ backgroundImage: "url('/hero-poster.jpg')" }} />
        )}
      </div>

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 -z-10">
        {/* Main overlay - darker on left for text, lighter on right for image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        {/* Bottom fade for scroll indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Top subtle gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[var(--brand-500)] opacity-20 blur-[100px] animate-float-slow"
          style={{
            transform: `translate(${scrollProgress * 50}px, ${scrollProgress * 30}px)`,
          }}
        />
        <div 
          className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-[var(--brand-300)] opacity-15 blur-[100px] animate-float-slow animation-delay-2000"
          style={{
            transform: `translate(${-scrollProgress * 40}px, ${-scrollProgress * 20}px)`,
          }}
        />
        <div 
          className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-[var(--brand-700)] opacity-10 blur-[120px] animate-float-slow animation-delay-4000"
          style={{
            transform: `translateY(${-scrollProgress * 60}px)`,
          }}
        />
      </div>

      {/* Video controls */}
      <div className="absolute bottom-24 right-6 md:right-8 z-10 flex gap-2">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:scale-110 text-white"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:scale-110 text-white"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Badge */}
            <div 
              className="reveal mb-6"
              style={{ opacity: 1 - scrollProgress * 2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for new projects
              </span>
            </div>

            {/* Main heading */}
            <h1 
              className="reveal text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6 tracking-tight"
              style={{
                opacity: 1 - scrollProgress * 1.5,
                transform: `translateY(${scrollProgress * 50}px)`,
              }}
            >
              {company.tagline}
            </h1>

            {/* Description */}
            <p 
              className="reveal text-lg md:text-xl text-white/80 max-w-xl mb-8 leading-relaxed"
              style={{
                opacity: 1 - scrollProgress * 2,
                transform: `translateY(${scrollProgress * 30}px)`,
              }}
            >
              {company.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div 
              className="reveal flex flex-wrap gap-4"
              style={{
                opacity: 1 - scrollProgress * 2,
                transform: `translateY(${scrollProgress * 20}px)`,
              }}
            >
              <a
                href="#services"
                className="group relative inline-flex items-center gap-2 rounded-xl  px-6 py-3.5 text-sm font-semibold text-white hover:bg-[var(--brand-500)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--brand-600)]/25 hover:-translate-y-0.5"
              >
                Explore Services
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get in Touch
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div 
              className="reveal mt-8 flex items-center gap-6 text-white/60 text-sm"
              style={{ opacity: 1 - scrollProgress * 2 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Trusted by 200+ clients
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5-star rated
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div 
            className="relative reveal hidden lg:block"
            style={{
              opacity: 1 - scrollProgress * 1.5,
              transform: `translateX(${-scrollProgress * 30}px)`,
            }}
          >
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image
                src="/herohero.png"
                alt="Aumsh Ventures team at work"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-xs text-gray-600">Projects Delivered</p>
                </div>
              </div>
            </div>

            {/* Floating review card */}
            <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-700">5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to explore"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-colors relative">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded-full animate-scroll-bounce" />
          </div>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}