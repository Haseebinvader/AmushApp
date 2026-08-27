import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of exhibitions, events, and activations by Aumsh Ventures.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Selected"
        italic="rooms & moments."
        description="A glimpse of recent exhibitions, live productions, and brand environments."
      />
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
