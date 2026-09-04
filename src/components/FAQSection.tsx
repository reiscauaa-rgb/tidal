"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/data/faq";

function FAQItem({ item, index }: { item: (typeof faq)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${item.id}`;

  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(6,62,82,0.15)" }}
    >
      <button
        id={`faq-btn-${item.id}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
        style={{ minHeight: "64px" }}
      >
        <span
          className="text-ocean-dark text-sm md:text-base font-semibold leading-snug pr-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-ocean-dark/60 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className="overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out"
        style={{
          maxHeight: open ? "400px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pb-5 md:pb-6">
          <p
            className="text-sm leading-relaxed text-ocean-dark/80 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative section-padding"
      style={{
        background: "linear-gradient(180deg, #EAD8C0 0%, #F4E8D1 100%)", // sand-bg to sand-light
      }}
      aria-labelledby="faq-title"
    >
      <div className="relative max-w-3xl mx-auto">
        <p
          className="text-turquoise text-xs tracking-[0.4em] uppercase mb-4 font-bold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          DÚVIDAS
        </p>

        <h2
          id="faq-title"
          className="mb-10 md:mb-14"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            letterSpacing: "0.03em",
            color: "#063E52",
            lineHeight: 0.95,
          }}
        >
          PERGUNTAS
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px #4A2B29" }}>FREQUENTES.</span>
        </h2>

        {/* Accordion */}
        <div role="list" aria-label="Perguntas frequentes">
          {faq.map((item, i) => (
            <div key={item.id} role="listitem">
              <FAQItem item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Contact prompt */}
        <div className="mt-10 md:mt-14 text-center">
          <p
            className="text-ocean-dark/60 text-sm mb-3 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Não encontrou sua resposta?
          </p>
          <a
            href="mailto:contato@tidalfest.com.br"
            className="text-ocean-dark font-bold text-sm hover:text-turquoise transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            contato@tidalfest.com.br
          </a>
        </div>
      </div>
    </section>
  );
}
