import HomeHero from "@/components/home/HomeHero";
import HomeCapabilities from "@/components/home/HomeCapabilities";
import HomeStory from "@/components/home/HomeStory";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeCta from "@/components/home/HomeCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Home",
  absoluteTitle: "Aumsh Ventures — Exhibition & Event Production in Dubai",
  description:
    "Aumsh Ventures designs and builds exhibitions, live events, eSports arenas, interactive technology, and drone shows from Dubai.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeCapabilities />
      <HomeStory />
      <HomeTestimonials />
      <HomeCta />
    </>
  );
}
