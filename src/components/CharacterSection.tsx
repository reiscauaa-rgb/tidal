"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CharacterSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [imgError, setImgError] = useState(false);

  // SVG wave paths
  const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
  const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

  useGSAP(() => {
    if (!pathRef.current || !containerRef.current) return;

    // The wave rises up from the bottom as you scroll down the section
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // starts animating when the top of the section enters the bottom of the viewport
        end: "center center", // finishes when the section is centered
        scrub: 1,
      }
    });

    tl.to(pathRef.current, { attr: { d: start }, ease: "power2.in" })
      .to(pathRef.current, { attr: { d: end }, ease: "power2.out" });
  }, { scope: containerRef });

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
      ref={containerRef}
      id="personagem"
      className="relative section-padding overflow-hidden"
      style={{ background: "#F4E8D1" }} // Matches previous section (Lineup) so the wave comes over it
      aria-label="Identidade visual Tidal"
    >
      {/* Absolute SVG Wave Background */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="blue-wave-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
             <stop offset="0%" stopColor="#13BBC4" /> {/* Turquoise */}
             <stop offset="100%" stopColor="#063E52" /> {/* Ocean Dark */}
          </linearGradient>
        </defs>
        <path 
          ref={pathRef}
          fill="url(#blue-wave-grad)" 
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z" 
        />
      </svg>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* Imagem do personagem cromado */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          {/* Ambient glow around character */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />
          
          {!imgError ? (
            <img
              src="/images/tidal-character-new-2.jpg"
              alt="Personagem cromado refletindo a luz do sol e o oceano"
              className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700 rounded-xl mix-blend-luminosity opacity-90"
              onError={() => setImgError(true)}
            />
          ) : (
            <div 
              className="relative z-10 w-full max-w-md aspect-[3/4] flex flex-col items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl"
              aria-label="Imagem do personagem não disponível no momento"
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <path d="M60 10 L110 35 L110 85 L60 110 L10 85 L10 35 Z" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="60" cy="45" r="15" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" fill="none" />
                <path d="M35 100 C35 75 85 75 85 100" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" fill="none" />
              </svg>
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
            className="text-white/80 text-xs tracking-[0.4em] uppercase mb-4 font-bold"
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
              color: "#ffffff",
              lineHeight: 0.9,
            }}
          >
            NÓS REFLETIMOS A <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>ENERGIA DO AGORA.</span>
          </h2>

          <p
            className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Nossa identidade cromada não é por acaso. Ela absorve as cores do pôr do sol, reflete a imensidão do oceano e pulsa no ritmo das batidas que nos movem.
          </p>

          <blockquote
            className="pl-6 border-l-2 border-turquoise text-white italic font-light text-xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            "Onde a tecnologia fluida encontra a força bruta da natureza."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
