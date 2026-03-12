import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { SocialFeatures } from "../components/SocialFeatures";
import { DeveloperSection } from "../components/DeveloperSection";
import { Footer } from "../components/Footer";
import TerraShowcase from "../components/TerraShowcase";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DeveloperSection />
        <SocialFeatures />
        <TerraShowcase />
      </main>
      <Footer />
    </>
  );
}
