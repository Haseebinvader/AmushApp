"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-[var(--color-foreground)] bg-[var(--color-background)]">
      <Header />
      <main id="home" className="scroll-smooth">
        <Hero />
        <About />
        <Services />
        {/* <Clients /> */}
        <Gallery />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
