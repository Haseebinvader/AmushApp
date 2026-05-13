"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { company } from "@/content/site";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import {
  Users,
  Award,
  Globe,
  Zap,
  ArrowRight,
  Play,
  Pause,
  Monitor,
  Gamepad2,
  Calendar,
  Cpu,
  Camera,
  Store
} from "lucide-react";

const stats = [
  { value: "500+", label: "Projects Delivered", icon: Zap },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "10+", label: "Countries Served", icon: Globe },
  { value: "200+", label: "Happy Clients", icon: Users },
];

const services = [
  {
    title: "Exhibition Design",
    description: "From creative concept to final build, delivering immersive spaces that inspire audiences.",
    icon: Monitor,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600",
  },
  {
    title: "eSports Staging",
    description: "Complete tournament setups with staging, seating, lighting, and live broadcast integration.",
    icon: Gamepad2,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600",
  },
  {
    title: "Event Production",
    description: "Comprehensive event planning and execution with technical precision and seamless delivery.",
    icon: Calendar,
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-600",
  },
  {
    title: "Interactive Tech",
    description: "Innovative AR, VR, and LED experiences designed to engage, entertain, and captivate visitors.",
    icon: Cpu,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600",
  },
  {
    title: "Aerial Media",
    description: "Dynamic drone shows and cinematic aerial footage that enhance your storytelling and visuals.",
    icon: Camera,
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-600",
  },
  {
    title: "Fit-out and Kiosks",
    description: "Tailored booths, kiosks, and pavilions crafted to elevate brand presence at any exhibition.",
    icon: Store,
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-600",
  },
];

export default function About() {
  useRevealOnScroll();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const intervals = stats.map((stat, index) => {
            const target = parseInt(stat.value);
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            return setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(intervals[index]);
              }
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });

          return () => intervals.forEach(clearInterval);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section id="about" className="relative py-2 md:py-32 bg-[var(--section-alt)] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--brand-900) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-100)] text-[var(--brand-700)] text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-600)]" />
            About {company.name}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--brand-900)] mb-4">
            Crafting Experiences That{" "}
            <span className="relative">
              Inspire
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 25 20, 50 10 T 100 10" stroke="var(--brand-500)" strokeWidth="3" fill="none" opacity="0.5" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-[var(--muted-600)] max-w-2xl mx-auto">
            {company.shortDescription} We combine creativity with technology to craft seamless experiences
            for brands across exhibitions, live events, and digital activations.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 reveal"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative p-6 rounded-2xl dark:bg-gray-800 border border-[var(--border-muted)] hover:border-[var(--brand-300)] transition-all duration-300 hover:shadow-lg"
            >
              <stat.icon className="w-8 h-8 text-[var(--brand-500)] mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-bold text-[var(--brand-900)] mb-1">
                {counters[index]}+
              </div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - YouTube Video */}
          <div className="reveal">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ minHeight: '535px' }}>
              <iframe
                src="https://www.youtube.com/embed/WMbx6fz2VVk"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ minHeight: '535px' }}
              />
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer reveal dark:bg-gray-800
                  `}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Gradient background on hover - only shows when active */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} transition-opacity duration-300
                  ${activeService === index ? 'opacity-100' : 'opacity-0'}
                `} />

                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors 
                    ${activeService === index ? 'bg-white/80 dark:bg-gray-700/80' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                  </div>

                  <h3 className="font-semibold text-[var(--brand-900)] mb-1.5 group-hover:text-[var(--brand-700)] transition-colors">
                    {service.title}
                  </h3>

                  <p className={`text-sm text-[var(--muted-600)] leading-relaxed transition-all duration-300
                    ${activeService === index ? 'line-clamp-none' : 'line-clamp-2'}
                  `}>
                    {service.description}
                  </p>

               
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal">
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-1 rounded-xl text-white font-medium hover:bg-[var(--brand-500)] transition-all hover:shadow-lg hover:shadow-[var(--brand-600)]/25 hover:-translate-y-0.5"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}