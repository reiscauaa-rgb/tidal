"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Ticket, Wine, X } from "lucide-react";

const SYMPLA_URL = "https://www.sympla.com.br/evento/tidal-fest/3526727";

export default function TicketsSection() {
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyClick = () => setShowPopup(true);

  const handleConfirm = () => {
    setShowPopup(false);
    window.open(SYMPLA_URL, "_blank");
  };

  return (
    <>
      <section
        id="ingressos"
        className="relative pb-16 md:pb-24 pt-8"
        style={{ background: "#F4E8D1" }}
        aria-labelledby="tickets-title"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">

          {/* Personagem com o ingresso */}
          <div className="w-full flex justify-center">
            <Image
              src="/images/ticket-character.png"
              alt="Personagem Tidal segurando ingresso"
              width={400}
              height={420}
              quality={75}
              loading="lazy"
              className="w-auto h-[240px] sm:h-[320px] md:h-[420px] object-contain object-bottom"
              style={{ display: "block" }}
            />
          </div>

          {/* Card de ingressos */}
          <div
            className="w-full max-w-lg flex flex-col gap-6 p-6 sm:p-8 md:p-10 border border-ocean-dark/10 shadow-xl rounded-md"
            style={{ background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(8px)" }}
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

      {/* Popup Comunicado */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Comunicado importante antes de comprar"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4">
            {/* Botão fechar */}
            <button
              onClick={() => setShowPopup(false)}
              className="self-end text-white/70 hover:text-white transition-colors p-1"
              aria-label="Fechar"
            >
              <X size={28} />
            </button>

            {/* Imagem do comunicado */}
            <Image
              src="/images/comunicado.jpg"
              alt="Comunicado importante — Regras do Open"
              width={600}
              height={800}
              quality={80}
              loading="lazy"
              className="w-full rounded-xl shadow-2xl"
              style={{ maxHeight: "75vh", objectFit: "contain" }}
            />

            {/* Botão confirmar */}
            <button
              onClick={handleConfirm}
              className="w-full py-4 flex items-center justify-center text-sm tracking-[0.2em] uppercase font-bold text-white transition-[transform,box-shadow] active:scale-95 rounded-md shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #717f46 0%, #30371c 100%)",
                fontFamily: "Inter, sans-serif",
                minHeight: "52px",
              }}
            >
              Entendi — GARANTIR INGRESSO
            </button>
          </div>
        </div>
      )}
    </>
  );
}


