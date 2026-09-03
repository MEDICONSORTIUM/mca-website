import HeroSection from "@/components/home/HeroSection";
import MetricCounter from "@/components/home/MetricCounter";
import AboutSnippet from "@/components/home/AboutSnippet";
import PartnersStrip from "@/components/home/PartnersStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetricCounter />
      <AboutSnippet />
      <PartnersStrip />
    </>
  );
}
