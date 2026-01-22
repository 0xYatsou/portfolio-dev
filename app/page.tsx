import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import TechStack from "@/components/TechStack";
import CVSection from "@/components/CVSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen animated-gradient">
      <Navbar />
      <Hero />
      <BentoGrid />
      <TechStack />
      <CVSection />
      <Footer />
    </main>
  );
}
