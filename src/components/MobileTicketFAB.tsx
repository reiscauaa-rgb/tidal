"use client";

import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";

export default function MobileTicketFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Agora o hero tem 600vh, vamos mostrar o FAB quando passar dele
    const heroHeight = window.innerHeight * 6;

    const onScroll = () => {
      setVisible(window.scrollY > heroHeight * 0.9);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden transition-all duration-400 ${
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
