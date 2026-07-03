import HeroSection from "@/components/sections/hero";
import FeaturedProducts from "@/components/sections/featured-products";
import AboutPreview from "@/components/sections/about-preview";
import Newsletter from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <AboutPreview />
      <Newsletter />
    </>
  );
}
