import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ManifestSection from "@/components/ManifestSection";
import CharacterSection from "@/components/CharacterSection";
import OpenCoolerSection from "@/components/OpenCoolerSection";
import TidalMediaSection from "@/components/TidalMediaSection";
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

      {/* 2. Manifesto — A Maré Não Parou */}
      <ManifestSection />

      {/* 2.1 Open Cooler */}
      <OpenCoolerSection />

      {/* 2.2 Line-up */}
      <LineupSection />

      {/* 2.3 Como é a Tidal — personagem + carrossel com fotos reais (src/data/media.ts) */}
      <CharacterSection />

      {/* 2.4 Vídeos de drone e do evento (src/data/media.ts) */}
      <TidalMediaSection />

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
