"use client";

import Script from "next/script";

export default function TicketsSection() {
  return (
    <section
      id="ingressos"
      className="relative pb-16 md:pb-24 pt-8"
      style={{ background: "#F4E8D1" }} // sand-light
      aria-labelledby="tickets-title"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Personagem com o ingresso */}
        <div className="w-full flex justify-center">
          <img 
            src="/images/ticket-character.png" 
            alt="Personagem Tidal segurando ingresso" 
            className="w-auto h-[240px] sm:h-[320px] md:h-[420px] object-contain object-bottom"
            style={{ display: "block" }}
          />
        </div>

        <div
          className="w-full p-2 sm:p-6 md:p-10 border border-ocean-dark/10 shadow-xl rounded-md flex justify-center overflow-hidden relative"
          style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(20px)", minHeight: "500px" }}
        >
          {/* Container exigido pelo Sympla */}
          <div 
            id="sympla-widget-3526727" 
            className="w-full h-auto overflow-hidden min-h-[400px]"
          ></div>
          
          {/* Carregamento oficial do script via Next.js */}
          <Script 
            src="https://www.sympla.com.br/api/v1/event-widget/html-loader.js" 
            strategy="lazyOnload"
          />
        </div>
      </div>
    </section>
  );
}
