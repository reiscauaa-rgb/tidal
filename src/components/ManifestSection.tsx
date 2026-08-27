"use client";

import { useEffect, useRef } from "react";

export default function ManifestSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wordsRef.current.forEach((word, i) => {
              if (word) {
                setTimeout(() => {
                  word.style.opacity = "1";
                  word.style.transform = "translateY(0)";
                }, i * 150);
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      className="relative section-padding overflow-hidden"
      style={{ background: "#EAD8C0" }}
      aria-labelledby="manifesto-title"
    >
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <h2 id="manifesto-title" className="sr-only">
          Manifesto: A Maré Virou
        </h2>
        
        {/* Animated Headline */}
        <div 
          className="text-center mb-12 md:mb-20"
          style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(4rem, 15vw, 9rem)", lineHeight: 0.85 }}
          aria-hidden="true"
        >
          <span
            ref={(el) => { wordsRef.current[0] = el; }}
            className="block text-transparent"
            style={{ 
              WebkitTextStroke: "2px #063E52", 
              opacity: 0, 
              transform: "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" 
            }}
          >
            A MARÉ
          </span>
          <span
            ref={(el) => { wordsRef.current[1] = el; }}
            className="block"
            style={{ 
              color: "#4A2B29",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" 
            }}
          >
            VIROU.
          </span>
        </div>

        {/* Decorative Wave */}
        <div className="flex justify-center mb-12 md:mb-16">
          <svg width="64" height="24" viewBox="0 0 64 24" fill="none" aria-hidden="true">
            <path d="M0 12C10.6667 4 21.3333 20 32 12C42.6667 4 53.3333 20 64 12" stroke="#063E52" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Editorial Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-4 md:px-0">
          <p 
            className="text-ocean-dark/80 text-lg leading-relaxed font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Esqueça tudo que você sabe sobre festivais comuns. TIDAL FEST é uma imersão sensorial completa onde a energia do oceano dita o ritmo.
          </p>
          <div className="flex flex-col gap-6">
            <p 
              className="text-ocean-dark/70 text-base leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Uma experiência que une cenografia imponente, sonoridade impecável e a atmosfera indescritível de estar na beira da praia ao amanhecer.
            </p>
            <div className="flex flex-wrap gap-3">
              {['MÚSICA ELETRÔNICA', 'ARTE', 'NATUREZA'].map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-xs tracking-widest text-ocean-dark border border-ocean-dark/20 rounded-full font-bold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
