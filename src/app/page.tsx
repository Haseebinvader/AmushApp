import HomeHero from "@/components/home/HomeHero";
import HomeCapabilities from "@/components/home/HomeCapabilities";
import HomeStory from "@/components/home/HomeStory";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeCta from "@/components/home/HomeCta";

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
