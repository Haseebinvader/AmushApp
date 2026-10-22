import PageHero from "@/components/ui/PageHero";
import PreviewStudio from "@/components/preview/PreviewStudio";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "3D Booth & Stage Preview",
  description:
    "Explore a sample exhibition booth, event stage, or eSports arena in 3D. Rotate the design, switch lighting and screens, and request a custom concept from Aumsh Ventures.",
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
        description="Rotate a sample exhibition booth, event stage, or eSports arena. Change the lighting, the layout, and where the brand and screens sit, then send that concept to the studio."
      />
      <PreviewStudio />
    </>
  );
}
