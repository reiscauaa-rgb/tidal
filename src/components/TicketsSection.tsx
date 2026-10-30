"use client";

import Image from "next/image";
import { Package, ShieldCheck, Ticket } from "lucide-react";

const SYMPLA_URL = "https://www.sympla.com.br/evento/tidal-after-party/3627093";

export default function TicketsSection() {
  const handleBuyClick = () => {
    if (typeof window !== "undefined") {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void };
      if (typeof w.fbq === "function") {
        w.fbq("track", "AddToCart", {
          content_name: "Ingresso After Tidal",
          content_category: "Ingressos",
          currency: "BRL",
        });
      }
      if (typeof w.gtag === "function") {
        w.gtag("event", "add_to_cart", {
          items: [{ item_name: "Ingresso After Tidal" }],
        });
      }
    }
    window.open(SYMPLA_URL, "_blank");
  };

  return (
    <>
      <section
        id="ingressos"
        className="relative pb-16 md:pb-24"
        style={{ background: "#F4E8D1" }}
        aria-labelledby="tickets-title"
      >
        {/* Título em HTML (texto removido da imagem para ter mais qualidade) */}
        <div className="w-full text-center px-4 pt-12 md:pt-16">
          <h2
            id="tickets-title"
            className="uppercase leading-[0.9]"
            style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(5rem, 20vw, 16rem)" }}
          >
            <span className="block text-[#063E52]">Aí, vai</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(to bottom, #FFB347 0%, #FF7A1A 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              do quê?
            </span>
          </h2>
        </div>

        {/* Personagem + pulseiras (PNG sem fundo e sem texto) em largura total */}
        <div className="relative w-full mb-10 md:mb-14 -mt-4 md:-mt-10">
          <Image
            src="/images/ticket-character-notext.png"
            alt="Personagem cromado apontando para as pulseiras Comum e VIP do After Tidal"
            width={819}
            height={689}
            quality={85}
            loading="lazy"
            className="w-full h-auto block"
            sizes="100vw"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">

          {/* Card de ingressos */}
          <div
            className="w-full max-w-lg flex flex-col gap-6 p-6 sm:p-8 md:p-10 border border-ocean-dark/10 shadow-xl rounded-md"
            style={{ background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            {/* Infos */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 border border-ocean-dark/10 rounded-sm">
                <ShieldCheck size={20} className="text-turquoise shrink-0 mt-0.5" />
                <div>
                  <p className="text-ocean-dark font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                    Compra segura pelo Sympla
                  </p>
                  <p className="text-ocean-dark/60 text-xs mt-1 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    Seus dados protegidos com criptografia 256-bit
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-ocean-dark/10 rounded-sm">
                <Package size={20} className="text-turquoise shrink-0 mt-0.5" />
                <div>
                  <p className="text-ocean-dark font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                    Open Cooler
                  </p>
                  <p className="text-ocean-dark/70 text-xs mt-1 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                    Traga seu cooler. Bar de reposição com gelo, energético e outras opções
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-ocean-dark/10 rounded-sm">
                <Ticket size={20} className="text-turquoise shrink-0 mt-0.5" />
                <div>
                  <p className="text-ocean-dark font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                    Comum ou VIP
                  </p>
                  <p className="text-ocean-dark/60 text-xs mt-1 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    Pulseira preta (Comum) ou branca (VIP). Ingressos limitados, sem virada de lote.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão que abre o popup */}
            <button
              onClick={handleBuyClick}
              className="w-full py-4 flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase font-bold text-white transition-[transform,box-shadow] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded-md shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #717f46 0%, #30371c 100%)",
                fontFamily: "Inter, sans-serif",
                minHeight: "56px",
              }}
            >
              GARANTIR MEU INGRESSO
            </button>

            <p className="text-center text-[10px] text-ocean-dark/40 -mt-2 tracking-wider uppercase font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              Você será redirecionado para o Sympla
            </p>
          </div>

        </div>
      </section>
    </>
  );
}


