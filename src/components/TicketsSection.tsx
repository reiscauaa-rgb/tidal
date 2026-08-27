"use client";

import { useState } from "react";
import { Plus, Minus, AlertCircle, CheckCircle2 } from "lucide-react";
import { tickets } from "@/data/tickets";

const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
};

export default function TicketsSection() {
  const [selectedTierId, setSelectedTierId] = useState(tickets[0].id);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedTier = tickets.find((t) => t.id === selectedTierId) || tickets[0];
  const subtotal = selectedTier.price * quantity;
  const total = subtotal + selectedTier.fee * quantity;

  const handleIncrement = () => {
    if (quantity < 4) setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section
        id="ingressos"
        className="relative section-padding"
        style={{ background: "#F4E8D1" }} // sand-light
        aria-labelledby="tickets-title"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p
              className="text-turquoise text-xs tracking-[0.4em] uppercase mb-4 font-bold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ACESSO
            </p>
            <h2
              id="tickets-title"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                letterSpacing: "0.02em",
                color: "#063E52",
                lineHeight: 0.9,
              }}
            >
              GARANTA SEU <br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px #4A2B29" }}>
                LUGAR.
              </span>
            </h2>
          </div>

          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 md:p-10 border border-ocean-dark/10 shadow-xl"
            style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(20px)" }}
          >
            {/* Lotes (Tiers) */}
            <div className="flex-1 flex flex-col gap-4" role="radiogroup" aria-label="Lotes de ingressos">
              {tickets.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                const isSoldOut = !tier.available;

                return (
                  <button
                    key={tier.id}
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isSoldOut}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`relative w-full flex items-center justify-between p-5 md:p-6 transition-all duration-300 border text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm ${
                      isSoldOut
                        ? "opacity-50 cursor-not-allowed border-ocean-dark/5 bg-ocean-dark/5"
                        : isSelected
                        ? "border-ocean-dark bg-ocean-dark/5 shadow-inner"
                        : "border-ocean-dark/10 hover:border-ocean-dark/30 hover:bg-white/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`font-display text-2xl tracking-wide ${
                            isSoldOut ? "text-ocean-dark/60" : "text-ocean-dark"
                          }`}
                        >
                          {tier.name}
                        </span>
                        {isSelected && (
                          <span
                            className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-bold text-sand-light"
                            style={{ background: "#063E52", fontFamily: "Inter, sans-serif" }}
                          >
                            Selecionado
                          </span>
                        )}
                        {isSoldOut && (
                          <span
                            className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-bold text-deep-brown border border-deep-brown/30"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Esgotado
                          </span>
                        )}
                        {!isSoldOut && tier.badge && !isSelected && (
                          <span
                            className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-bold text-ocean-dark border border-ocean-dark/20"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      {tier.description && (
                        <p className="text-ocean-dark/60 text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                          {tier.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {isSoldOut ? (
                        <span className="text-ocean-dark/40 font-display text-2xl">-</span>
                      ) : (
                        <span className="text-ocean-dark font-display text-3xl">
                          {formatCurrency(tier.price)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Resumo e Quantidade */}
            <div className="flex-1 lg:max-w-xs flex flex-col justify-between">
              <div>
                <h3 className="text-ocean-dark font-display text-2xl mb-6 tracking-wide">
                  Resumo do Pedido
                </h3>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-ocean-dark/80 text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                    Quantidade
                  </span>
                  <div className="flex items-center border border-ocean-dark/20 rounded-sm">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="p-2 text-ocean-dark/70 hover:text-ocean-dark disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span
                      className="w-8 text-center text-ocean-dark font-semibold text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= 4}
                      className="p-2 text-ocean-dark/70 hover:text-ocean-dark disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-8 border-t border-ocean-dark/10 pt-6">
                  <div className="flex justify-between text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="text-ocean-dark/70 font-medium">{quantity}x {selectedTier.name}</span>
                    <span className="text-ocean-dark font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="text-ocean-dark/70 font-medium flex items-center gap-1">
                      Taxa de serviço
                      <AlertCircle size={12} className="text-ocean-dark/40" aria-hidden="true" />
                    </span>
                    <span className="text-ocean-dark font-semibold">{formatCurrency(selectedTier.fee * quantity)}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-6">
                  <span className="text-ocean-dark/70 text-sm uppercase tracking-widest font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                    Total
                  </span>
                  <span className="text-ocean-dark font-display text-5xl leading-none">
                    {formatCurrency(total)}
                  </span>
                </div>

                <button
                  onClick={handleOpenModal}
                  className="w-full py-4 flex items-center justify-center text-sm tracking-[0.2em] uppercase font-bold text-sand-light transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm shadow-lg hover:shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #063E52 0%, #4A2B29 100%)",
                    fontFamily: "Inter, sans-serif",
                    minHeight: "56px",
                  }}
                  aria-haspopup="dialog"
                >
                  PROSSEGUIR
                </button>
                
                <p className="text-center text-[10px] text-ocean-dark/50 mt-4 tracking-wider uppercase font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Ambiente seguro · Criptografia 256-bit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ocean-dark/40 backdrop-blur-sm"
            onClick={handleCloseModal}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-md bg-sand-light shadow-2xl overflow-hidden flex flex-col rounded-sm border border-ocean-dark/10"
            style={{ maxHeight: "calc(100vh - 2rem)" }}
          >
            {/* Header */}
            <div className="p-6 border-b border-ocean-dark/10 flex justify-between items-center bg-white/50">
              <h2 id="modal-title" className="font-display text-3xl text-ocean-dark tracking-wide">
                Finalizar Compra
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-ocean-dark/50 hover:text-ocean-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
                aria-label="Fechar janela"
              >
                <Plus size={24} className="rotate-45" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <div className="mb-6 p-4 border border-ocean-dark/20 bg-ocean-dark/5 flex items-start gap-3 rounded-sm">
                <AlertCircle className="text-ocean-dark shrink-0 mt-0.5" size={18} aria-hidden="true" />
                <p className="text-ocean-dark text-sm leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  <strong>Aviso:</strong> Este é um projeto demonstrativo. 
                  Nenhum pagamento real será processado.
                </p>
              </div>

              <div className="mb-8">
                <p className="text-ocean-dark/70 text-xs tracking-widest uppercase mb-2 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Resumo
                </p>
                <div className="flex justify-between items-center pb-2 border-b border-ocean-dark/10">
                  <span className="text-ocean-dark font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    {quantity}x {selectedTier.name}
                  </span>
                  <span className="font-display text-2xl text-ocean-dark">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Checkout simulado concluído!"); handleCloseModal(); }}>
                <div>
                  <label htmlFor="demo-name" className="block text-ocean-dark/80 text-xs font-bold uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    Nome Completo
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full bg-white border border-ocean-dark/20 text-ocean-dark px-4 py-3 focus:outline-none focus:border-ocean-dark focus:ring-1 focus:ring-ocean-dark rounded-sm placeholder:text-ocean-dark/30 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <div>
                  <label htmlFor="demo-email" className="block text-ocean-dark/80 text-xs font-bold uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    E-mail
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full bg-white border border-ocean-dark/20 text-ocean-dark px-4 py-3 focus:outline-none focus:border-ocean-dark focus:ring-1 focus:ring-ocean-dark rounded-sm placeholder:text-ocean-dark/30 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase font-bold text-sand-light shadow-md hover:shadow-lg transition-all active:scale-95 rounded-sm"
                  style={{
                    background: "#063E52",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Simular Pagamento
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
