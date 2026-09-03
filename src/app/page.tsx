import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ManifestSection from "@/components/ManifestSection";
import CharacterSection from "@/components/CharacterSection";
import LineupSection from "@/components/LineupSection";
import TicketsPanelEffect from "@/components/TicketsPanelEffect";
import TicketsHeaderSection from "@/components/TicketsHeaderSection";
import TicketsSection from "@/components/TicketsSection";
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

      {/* 2. Manifesto — Maré Virou */}
      <ManifestSection />

      {/* 3. Line-up */}
      <LineupSection />

      {/* 4. Personagem Tidal */}
      <CharacterSection />

      {/* 5. Quando e Onde — pina e escala para revelar Ingressos */}
      <TicketsPanelEffect />

      {/* 6. Cabeçalho Ingressos (Vídeo) */}
      <TicketsHeaderSection />

      {/* 7. Ingressos */}
      <TicketsSection />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. CTA Final */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

      {/* Mobile sticky CTA (visible after hero) */}
      <MobileTicketFAB />
    </main>
  );
}
