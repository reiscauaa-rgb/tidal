"use client";

import { useEffect, useRef, useState } from "react";

export default function CharacterSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="personagem"
      className="relative section-padding overflow-hidden"
      style={{ background: "#EAD8C0" }} // sand-bg
      aria-label="Identidade visual Tidal"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        {/* Imagem do personagem cromado */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          {/* Ambient glow around character */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,179,107,0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />
          
          {!imgError ? (
            <img
              src="/images/tidal-character-new-2.jpg"
              alt="Personagem cromado refletindo a luz do sol e o oceano"
              className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700 rounded-xl"
              onError={() => setImgError(true)}
            />
          ) : (
            <div 
              className="relative z-10 w-full max-w-md aspect-[3/4] flex flex-col items-center justify-center border border-ocean-dark/20 bg-white/20 backdrop-blur-sm"
              aria-label="Imagem do personagem não disponível no momento"
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <path d="M60 10 L110 35 L110 85 L60 110 L10 85 L10 35 Z" stroke="#063E52" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="60" cy="45" r="15" stroke="#063E52" strokeOpacity="0.3" strokeWidth="2" fill="none" />
                <path d="M35 100 C35 75 85 75 85 100" stroke="#063E52" strokeOpacity="0.3" strokeWidth="2" fill="none" />
              </svg>
              <p className="mt-4 text-ocean-dark/40 text-sm tracking-widest font-body">
                [tidal-character-new.jpg]
              </p>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div 
          ref={contentRef}
          className="w-full md:w-1/2 flex flex-col items-start"
          style={{ opacity: 0, transform: "translateY(30px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <p
            className="text-turquoise text-xs tracking-[0.4em] uppercase mb-4 font-bold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A ESSÊNCIA CROMADA
          </p>

          <h2
            className="mb-8"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(3rem, 7vw, 5rem)",
              letterSpacing: "0.02em",
              color: "#063E52",
              lineHeight: 0.9,
            }}
          >
            NÓS REFLETIMOS A <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px #4A2B29" }}>ENERGIA DO AGORA.</span>
          </h2>

          <p
            className="text-ocean-dark/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Nossa identidade cromada não é por acaso. Ela absorve as cores do pôr do sol, reflete a imensidão do oceano e pulsa no ritmo das batidas que nos movem.
          </p>

          <blockquote
            className="pl-6 border-l-2 border-sunrise-gold text-ocean-dark italic font-light text-xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            "Onde a tecnologia fluida encontra a força bruta da natureza."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
