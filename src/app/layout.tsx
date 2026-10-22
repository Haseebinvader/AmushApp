import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { company } from "@/content/site";
import Preloader from "@/components/Preloader";
import SiteShell from "@/components/layout/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { ogImage, organizationJsonLd, siteUrl } from "@/lib/seo";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Exhibition & Event Production in Dubai`,
    template: `%s — ${company.name}`,
  },
  description: company.shortDescription,
  applicationName: company.name,
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  category: "Event production",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: company.name,
    title: `${company.name} — Exhibition & Event Production in Dubai`,
    description: company.shortDescription,
    url: siteUrl,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Exhibition & Event Production in Dubai`,
    description: company.shortDescription,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd()} />
        <Preloader />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
