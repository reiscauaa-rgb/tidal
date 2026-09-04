"use client";

import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";

export default function MobileTicketFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isTicketsVisible = false;
    let isPastHero = false;

    const updateVisibility = () => {
      setVisible(isPastHero && !isTicketsVisible);
    };

    const onScroll = () => {
      // Oculta completamente na Hero. Só mostra quando o usuário descer 120% da tela inicial.
      isPastHero = window.scrollY > window.innerHeight * 1.2;
      updateVisibility();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Chama no início para garantir o estado inicial
    onScroll();

    // Observa a seção de ingressos para esconder o botão flutuante quando ela aparecer
    const ticketsSection = document.getElementById("ingressos");
    let observer: IntersectionObserver | null = null;
    
    if (ticketsSection) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isTicketsVisible = entry.isIntersecting;
          updateVisibility();
        },
        { rootMargin: "0px 0px -50px 0px" } // Esconde um pouquinho antes de tocar o fundo
      );
      observer.observe(ticketsSection);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden transition-[opacity,transform] duration-400 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="#ingressos"
        className="flex items-center gap-2.5 px-6 py-4 text-xs tracking-[0.2em] uppercase text-white font-bold shadow-lg active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded-md"
        style={{
          background: "linear-gradient(135deg, #717f46 0%, #30371c 100%)",
          minHeight: "48px",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 4px 20px rgba(48, 55, 28, 0.4)",
        }}
        aria-label="Comprar ingresso para o TIDAL FEST"
      >
        <Ticket size={16} aria-hidden="true" />
        INGRESSOS
      </a>
    </div>
  );
}
