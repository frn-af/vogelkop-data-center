import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AreasShowcase } from "@/components/sections/areas-showcase";
import { LatestNews } from "@/components/sections/latest-news";
import { BiodiversitySpotlight } from "@/components/sections/biodiversity-spotlight";
import { StatisticsCounter } from "@/components/sections/statistics-counter";
import { CTABanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <AreasShowcase />
      <LatestNews />
      <BiodiversitySpotlight />
      <StatisticsCounter />
      <CTABanner />
    </>
  );
}
