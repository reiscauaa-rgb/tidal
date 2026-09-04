"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ManifestSection() {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  // Function to collect refs for staggering
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useGSAP(() => {
    if (!containerRef.current || elementsRef.current.length === 0) return;

    // Wave animation: staggering upward motion with a smooth elastic/out ease
    gsap.fromTo(
      elementsRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1, 
        y: 0,
        duration: 1.2,
        stagger: 0.15, // Elements appear one after another
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#EAD8C0" }}
      aria-labelledby="manifesto-title"
    >
      {/* ─── MOBILE VERSION (< md): Mantém a foto do celular intacta ─── */}
      <div className="block md:hidden relative w-full min-h-screen">
        {/* Background Image no Celular */}
        <Image 
          src="/images/manifest-board.png" 
          alt="Personagem na praia segurando um quadro branco"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          quality={75}
          loading="lazy"
          className="object-cover object-bottom"
          style={{ zIndex: 0 }}
        />

        {/* Gradient transition to the next section (#F4E8D1) */}
        <div 
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ 
            height: "20vh", 
            zIndex: 5,
            background: "linear-gradient(to bottom, transparent, #F4E8D1)" 
          }}
        />

        {/* Top Text: "A MARÉ VIROU" */}
        <div 
          className="absolute top-[2vh] sm:top-[4vh] left-0 w-full z-10 flex flex-col items-center text-center px-4"
          style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(4.5rem, 14vw, 10rem)", lineHeight: 1.1 }}
        >
          <span
            ref={addToRefs}
            className="block pb-2"
            style={{ 
              background: "linear-gradient(to bottom right, #F4E8D1 0%, #13BBC4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.6))"
            }}
          >
            A MARÉ
          </span>
          <span
            ref={addToRefs}
            className="block text-transparent -mt-4"
            style={{ 
              WebkitTextStroke: "2px #ffffff",
              filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.6))"
            }}
          >
            VIROU.
          </span>
        </div>

        {/* Bottom Text: Inside the whiteboard */}
        <div 
          className="absolute bottom-0 left-0 w-full z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ height: "45vh", paddingBottom: "5vh" }}
        >
          <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
            <h2 
              ref={addToRefs}
              id="manifesto-title" 
              style={{ 
                fontFamily: "Bebas Neue, sans-serif", 
                fontSize: "clamp(2.5rem, 6vw, 4rem)", 
                color: "#063E52", 
                lineHeight: 1 
              }}
            >
              Uma nova experiência <br/> à beira-mar
            </h2>
            
            <p 
              ref={addToRefs}
              style={{ 
                fontFamily: "Inter, sans-serif", 
                color: "#333333", 
                fontSize: "clamp(1rem, 2vw, 1.25rem)" 
              }}
              className="font-medium leading-relaxed max-w-md px-2"
            >
              Música, luzes e energia da praia se encontram em uma noite feita para sentir, dançar e viver até o amanhecer.
            </p>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP VERSION (md+): Fundo normal limpo, sem imagem esticada/cortada ─── */}
      <div className="hidden md:flex relative z-10 flex-col items-center justify-center min-h-screen px-8 py-24 max-w-6xl mx-auto text-center">
        {/* Top Text: "A MARÉ VIROU." */}
        <div 
          className="mb-8 flex flex-col items-center"
          style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(5rem, 10vw, 8.5rem)", lineHeight: 0.95 }}
        >
          <span
            className="block pb-2"
            style={{ 
              background: "linear-gradient(to bottom right, #063E52 0%, #13BBC4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            A MARÉ
          </span>
          <span
            className="block text-transparent -mt-4 lg:-mt-6"
            style={{ 
              WebkitTextStroke: "2px #063E52",
            }}
          >
            VIROU.
          </span>
        </div>

        {/* Decorative Wave */}
        <div className="flex justify-center mb-10">
          <svg width="64" height="24" viewBox="0 0 64 24" fill="none" aria-hidden="true">
            <path d="M0 12C10.6667 4 21.3333 20 32 12C42.6667 4 53.3333 20 64 12" stroke="#13BBC4" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Card elegante com o conteúdo do manifesto */}
        <div 
          className="p-10 lg:p-14 border border-ocean-dark/10 shadow-xl rounded-2xl max-w-3xl mx-auto backdrop-blur-md"
          style={{ background: "rgba(255, 255, 255, 0.65)" }}
        >
          <h2 
            className="text-ocean-dark uppercase mb-6"
            style={{ 
              fontFamily: "Bebas Neue, sans-serif", 
              fontSize: "clamp(2.5rem, 4vw, 3.8rem)", 
              letterSpacing: "0.02em",
              lineHeight: 1.05 
            }}
          >
            Uma nova experiência à beira-mar
          </h2>
          
          <p 
            className="text-ocean-dark/80 text-lg lg:text-xl font-medium leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Música, luzes e energia da praia se encontram em uma noite feita para sentir, dançar e viver até o amanhecer.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['MÚSICA ELETRÔNICA', 'OPEN GIN', 'BEIRA-MAR', 'NATUREZA'].map((tag) => (
              <span 
                key={tag}
                className="px-4 py-1.5 text-xs tracking-widest text-[#063E52] border border-[#063E52]/20 rounded-full font-bold uppercase"
                style={{ fontFamily: "Inter, sans-serif", background: "rgba(6, 62, 82, 0.05)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient transition to next section */}
        <div 
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ 
            height: "15vh", 
            zIndex: 5,
            background: "linear-gradient(to bottom, transparent, #F4E8D1)" 
          }}
        />
      </div>
    </section>
  );
}
