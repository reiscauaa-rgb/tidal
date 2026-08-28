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
      style={{ 
        backgroundImage: "url('/images/manifest-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#EAD8C0",
        zIndex: 10
      }}
      aria-labelledby="manifesto-title"
    >
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <h2 id="manifesto-title" className="sr-only">
          Manifesto: A Maré Virou
        </h2>
        
        {/* Animated Headline */}
        <div 
          className="text-center mb-12 md:mb-20 flex flex-col items-center"
          style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(5rem, 16vw, 10rem)", lineHeight: 1.1 }}
          aria-hidden="true"
        >
          <span
            ref={(el) => { wordsRef.current[0] = el; }}
            className="block pb-2"
            style={{ 
              background: "linear-gradient(to bottom right, #F4E8D1 0%, #13BBC4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
              opacity: 0, 
              transform: "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" 
            }}
          >
            A MARÉ
          </span>
          <span
            ref={(el) => { wordsRef.current[1] = el; }}
            className="block text-transparent -mt-6 md:-mt-12"
            style={{ 
              WebkitTextStroke: "2px #ffffff",
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
            <path d="M0 12C10.6667 4 21.3333 20 32 12C42.6667 4 53.3333 20 64 12" stroke="#13BBC4" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Editorial Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-4 md:px-0">
          <p 
            className="text-white text-xl md:text-2xl leading-relaxed font-medium"
            style={{ fontFamily: "Inter, sans-serif", textShadow: "0px 4px 12px rgba(0,0,0,0.8), 0px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Esqueça tudo que você sabe sobre festivais comuns. TIDAL FEST é uma imersão sensorial completa onde a energia do oceano dita o ritmo.
          </p>
          <div className="flex flex-col gap-6">
            <p 
              className="text-white/95 text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", textShadow: "0px 4px 12px rgba(0,0,0,0.8), 0px 2px 4px rgba(0,0,0,0.8)" }}
            >
              Uma experiência que une cenografia imponente, sonoridade impecável e a atmosfera indescritível de estar na beira da praia ao amanhecer.
            </p>
            <div className="flex flex-wrap gap-3">
              {['MÚSICA ELETRÔNICA', 'ARTE', 'NATUREZA'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-1.5 text-sm tracking-widest text-white border border-white/40 rounded-full font-bold backdrop-blur-sm"
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
