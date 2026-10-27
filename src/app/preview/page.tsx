import PageHero from "@/components/ui/PageHero";
import PreviewStudio from "@/components/preview/PreviewStudio";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "3D Booth & Stage Preview",
  description:
    "Explore a basic exhibition stand, meeting pavilion, island build, event stage, or eSports arena in 3D, then request a custom concept from Aumsh Ventures.",
  path: "/preview",
});

export default function PreviewPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "3D Preview", path: "/preview" },
        ])}
      />
      <PageHero
        eyebrow="Preview"
        title="Walk the"
        italic="room first."
        description="Start with a basic stand — flooring, back wall, reception, meeting tables, header logos, graphics, and one TV — then open the pavilion, island, stage, and arena layouts drawn from the studio’s work."
      />
      <PreviewStudio />
    </>
  );
}
