import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { company } from "@/content/site";
import Preloader from "@/components/Preloader";
import SiteShell from "@/components/layout/SiteShell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} — Exhibitions & Events`,
    template: `%s — ${company.name}`,
  },
  description: company.shortDescription,
  openGraph: {
    title: `${company.name} — Exhibitions & Events`,
    description: company.shortDescription,
    images: [{ url: "/herohero.png", width: 1200, height: 630, alt: company.name }],
  },
  metadataBase: new URL("https://aumsh.com"),
};

export const viewport: Viewport = {
  themeColor: "#451424",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <Preloader />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
