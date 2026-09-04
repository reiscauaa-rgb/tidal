"use client";

import { useEffect, useRef } from "react";

export default function FinalCTA() {
  const animRefs = useRef<HTMLElement[]>([]);

  const addRef = (el: HTMLElement | null, idx: number) => {
    if (el) animRefs.current[idx] = el;
  };

  useEffect(() => {
    const elements = animRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
            }, Math.max(0, idx) * 150);
          }
        });
      },
      { threshold: 0.3 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden"
      style={{ minHeight: "80vh" }}
      aria-labelledby="finalcta-title"
    >
      {/* Light Sunset ocean background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #F4E8D1 0%, #FFB36B 60%, #FF8066 100%)",
        }}
        aria-hidden="true"
      />

      {/* Wave shapes leading into footer */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: "120px" }}
          aria-hidden="true"
        >
          <path
            d="M0,100 C240,40 480,160 720,100 C960,40 1200,160 1440,100 L1440,200 L0,200 Z"
            fill="#EAD8C0" /* matches footer sand-bg */
            opacity="0.9"
          />
          <path
            d="M0,130 C360,70 720,170 1080,120 C1260,95 1380,150 1440,130 L1440,200 L0,200 Z"
            fill="#EAD8C0"
          />
        </svg>
      </div>

      {/* Horizontal wave lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 pointer-events-none"
          aria-hidden="true"
          style={{
            top: `${20 + i * 15}%`,
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.2 + i * 0.1}), transparent)`,
            transform: `scaleX(${0.6 + i * 0.1})`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 section-padding">
        {/* Label */}
        <p
          className="text-deep-brown/80 text-xs tracking-[0.4em] uppercase mb-8 font-bold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          10 OUT · PERUÍBE-SP · 22:30H
        </p>

        <h2
          id="finalcta-title"
          ref={(el) => addRef(el, 0)}
          className="mb-6 drop-shadow-md"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(2.8rem, 11vw, 7rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.92,
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ color: "#FDF6E9" }}>O AMANHECER</span>
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "2px #4A2B29",
            }}
          >
            VAI ENCONTRAR
          </span>
          <br />
          <span style={{ color: "#4A2B29" }}>VOCÊ AQUI.</span>
        </h2>

        <p
          ref={(el) => addRef(el, 1)}
          className="text-deep-brown text-base md:text-lg mb-10 md:mb-14 max-w-sm font-semibold"
          style={{
            fontFamily: "Inter, sans-serif",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          A maré já começou a subir.
        </p>

        <a
          ref={(el) => addRef(el, 2)}
          href="#ingressos"
          className="inline-flex items-center px-10 py-5 text-sm tracking-[0.3em] uppercase text-sand-light font-bold active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm shadow-xl"
          style={{
            background: "linear-gradient(135deg, #063E52 0%, #4A2B29 100%)",
            minHeight: "56px",
            fontFamily: "Inter, sans-serif",
            opacity: 0,
            transform: "translateY(20px)",
            transition:
              "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label="Garantir ingresso para o TIDAL FEST"
        >
          GARANTIR MEU INGRESSO
        </a>
      </div>
    </section>
  );
}
