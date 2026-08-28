import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ManifestSection from "@/components/ManifestSection";
import ExperienceSection from "@/components/ExperienceSection";
import CharacterSection from "@/components/CharacterSection";
import LineupSection from "@/components/LineupSection";
import EventInfoSection from "@/components/EventInfoSection";
import TicketsSection from "@/components/TicketsSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileTicketFAB from "@/components/MobileTicketFAB";

export default function Home() {
  return (
    <main>
      {/* Fixed navigation header */}
      <Header />

      {/* 1. Hero — scroll-controlled video (450vh) */}
      <HeroSection />

      {/* 2. Manifesto */}
      <ManifestSection />

      {/* 3. Line-up */}
      <LineupSection />

      {/* 4. Personagem Tidal */}
      <CharacterSection />

      {/* 6. Informações do Evento */}
      <EventInfoSection />

      {/* 7. Ingressos */}
      <TicketsSection />

      {/* A Experiência — three pillars */}
      <ExperienceSection />

      {/* 8. Galeria */}
      <GallerySection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. CTA Final */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

      {/* Mobile sticky CTA (visible after hero) */}
      <MobileTicketFAB />
    </main>
  );
}
