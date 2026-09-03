"use client";

import { useEffect, useRef } from "react";

export default function TicketsSection() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetContainerRef.current) return;

    // Limpa o container para evitar duplicação no Strict Mode do React
    widgetContainerRef.current.innerHTML = "";

    // Cria a div que o Sympla exige
    const symplaDiv = document.createElement("div");
    symplaDiv.id = "sympla-widget-3526727";
    symplaDiv.setAttribute("height", "auto");
    widgetContainerRef.current.appendChild(symplaDiv);

    // Adiciona o script oficial do Sympla logo em seguida
    const script = document.createElement("script");
    script.src = "https://www.sympla.com.br/api/v1/event-widget/html-loader.js";
    script.async = true;
    widgetContainerRef.current.appendChild(script);
  }, []);

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
          className="w-full p-2 sm:p-6 md:p-10 border border-ocean-dark/10 shadow-xl rounded-md flex justify-center overflow-hidden"
          style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(20px)", minHeight: "500px" }}
        >
          {/* Sympla Widget Container */}
          <div 
            ref={widgetContainerRef} 
            className="w-full h-auto overflow-hidden"
          >
            {/* Injetado via React useEffect */}
          </div>
        </div>
      </div>
    </section>
  );
}
