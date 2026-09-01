"use client";

import { useRef } from "react";
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
      {/* Background Image */}
      <img 
        src="/images/manifest-board.png" 
        alt="Personagem na praia segurando um quadro branco"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
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
          className="block text-transparent -mt-4 md:-mt-8"
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
    </section>
  );
}
