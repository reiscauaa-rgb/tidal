"use client";

import { ShieldCheck, Ticket, Wine } from "lucide-react";

const SYMPLA_URL = "https://www.sympla.com.br/evento/tidal-fest/3526727";

export default function TicketsSection() {
  return (
    <section
      id="ingressos"
      className="relative pb-16 md:pb-24 pt-8"
      style={{ background: "#F4E8D1" }}
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

        {/* Card de ingressos */}
        <div
          className="w-full max-w-lg flex flex-col gap-6 p-6 sm:p-8 md:p-10 border border-ocean-dark/10 shadow-xl rounded-md"
          style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(20px)" }}
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
              <Wine size={20} className="text-turquoise shrink-0 mt-0.5" />
              <div>
                <p className="text-ocean-dark font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                  Open Gin em todos os ingressos
                </p>
                <p className="text-ocean-dark/60 text-xs mt-1 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  Sem custo adicional — já incluso na entrada
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-ocean-dark/10 rounded-sm">
              <Ticket size={20} className="text-turquoise shrink-0 mt-0.5" />
              <div>
                <p className="text-ocean-dark font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                  Ingressos por lote
                </p>
                <p className="text-ocean-dark/60 text-xs mt-1 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  Quanto antes você garantir, menor o preço. Não perca a virada!
                </p>
              </div>
            </div>
          </div>

          {/* Botão Sympla */}
          <a
            href={SYMPLA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase font-bold text-white transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded-md shadow-lg hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #717f46 0%, #30371c 100%)",
              fontFamily: "Inter, sans-serif",
              minHeight: "56px",
            }}
          >
            GARANTIR MEU INGRESSO
          </a>

          <p className="text-center text-[10px] text-ocean-dark/40 -mt-2 tracking-wider uppercase font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
            Você será redirecionado para o Sympla
          </p>
        </div>

      </div>
    </section>
  );
}

