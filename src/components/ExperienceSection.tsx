"use client";

import { useEffect, useRef } from "react";
import { Waves, Disc3, Sunrise } from "lucide-react";

const pillars = [
  {
    icon: Disc3,
    title: "MÚSICA",
    desc: "Line-up focado na verdadeira cultura eletrônica. Sem concessões comerciais. Apenas a batida perfeita ecoando na areia.",
    color: "#13BBC4" // turquoise
  },
  {
    icon: Waves,
    title: "OCEANO",
    desc: "A brisa, o sal e o som das ondas. O palco principal integrado perfeitamente ao cenário natural e surreal da praia.",
    color: "#063E52" // ocean-dark
  },
  {
    icon: Sunrise,
    title: "ENERGIA",
    desc: "O momento ápice do festival: todos unidos recebendo a luz do amanhecer que reflete na água e no metal cromado.",
    color: "#FFB36B" // sunrise-gold
  }
];

export default function ExperienceSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
            }, index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experiencia"
      className="relative section-padding overflow-hidden"
      style={{ background: "#F4E8D1" }} // sand-light
      aria-labelledby="experiencia-title"
    >
      <div className="relative max-w-6xl mx-auto z-10">
        <h2
          id="experiencia-title"
          className="text-center mb-16 md:mb-24"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            letterSpacing: "0.03em",
            color: "#063E52", // ocean-dark
            lineHeight: 0.95,
          }}
        >
          OS PILARES DA <br />
          <span style={{ color: "#4A2B29" }}>NOSSA EXPERIÊNCIA</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative group p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(6, 62, 82, 0.1)",
                  opacity: 0,
                  transform: "translateY(40px)",
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${pillar.color}15, transparent 70%)`
                  }}
                  aria-hidden="true"
                />

                <Icon 
                  size={40} 
                  strokeWidth={1.5} 
                  className="mb-8 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: pillar.color }}
                  aria-hidden="true"
                />
                
                <h3
                  className="text-2xl mb-4 font-display"
                  style={{ color: "#063E52" }}
                >
                  {pillar.title}
                </h3>
                
                <p
                  className="text-ocean-dark/70 text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {pillar.desc}
                </p>

                {/* Decorative corner accent */}
                <div 
                  className="absolute bottom-0 right-0 w-8 h-8 opacity-30 pointer-events-none"
                  style={{ 
                    borderBottom: `2px solid ${pillar.color}`,
                    borderRight: `2px solid ${pillar.color}`,
                    borderBottomRightRadius: "4px"
                  }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
