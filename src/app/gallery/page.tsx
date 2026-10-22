import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Exhibition & Event Work",
  description:
    "Selected exhibition pavilions, brand kiosks, live events, drone shows, and eSports arenas produced by Aumsh Ventures.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/gallery" },
        ])}
      />
      <PageHero
        eyebrow="Work"
        title="Selected"
        italic="rooms & moments."
        description="Work arranged by practice — exhibitions, kiosks, live events, and eSports arenas."
      />
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
