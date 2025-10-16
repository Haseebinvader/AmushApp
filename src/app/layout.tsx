import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { company } from "@/content/site";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${company.name} — Exhibitions & Events`,
  description: company.shortDescription,
  openGraph: {
    title: `${company.name} — Exhibitions & Events`,
    description: company.shortDescription,
    images: [
      { url: "/hero-bg.svg", width: 1200, height: 630, alt: `${company.name} hero` },
    ],
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
