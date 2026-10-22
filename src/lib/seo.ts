import type { Metadata } from "next";
import { company, contact, services } from "@/content/site";

export const siteUrl = "https://aumsh.com";

export const ogImage = {
  url: "/herohero.png",
  width: 1200,
  height: 630,
  alt: "Aumsh Ventures exhibition and event production",
};

type PageSeo = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
};

export function pageMetadata({ title, description, path, absoluteTitle }: PageSeo): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ?? `${title} — ${company.name}`,
      description,
      url,
      siteName: company.name,
      type: "website",
      locale: "en_AE",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ?? `${title} — ${company.name}`,
      description,
      images: [ogImage.url],
    },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba",
  addressLocality: "Dubai",
  addressCountry: "AE",
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: company.name,
        url: siteUrl,
        logo: `${siteUrl}/amushlogos.png`,
        image: `${siteUrl}${ogImage.url}`,
        description: company.shortDescription,
        email: contact.email,
        telephone: "+971559448903",
        address: postalAddress,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: company.name,
        url: siteUrl,
        image: `${siteUrl}${ogImage.url}`,
        telephone: "+971559448903",
        email: contact.email,
        description: company.story,
        address: postalAddress,
        areaServed: "Worldwide",
        parentOrganization: { "@id": `${siteUrl}/#organization` },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Production services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `${siteUrl}/services#${service.id}`,
            },
          })),
        },
      },
    ],
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: `${service.title} by ${company.name}`,
      serviceType: service.title,
      description: service.longDescription,
      url: `${siteUrl}/services#${service.id}`,
      image: `${siteUrl}${service.image}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  };
}
