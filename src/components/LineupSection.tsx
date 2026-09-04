"use client";

import { useEffect, useRef } from "react";
import { lineup } from "@/data/lineup";
import { social } from "@/data/social";

export default function LineupSection() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = Array.from(listRef.current?.children || []);
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateX(0)";
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="lineup"
      className="relative section-padding overflow-hidden"
      style={{ background: "#F4E8D1", zIndex: 10 }} // sand-light
      aria-labelledby="lineup-title"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-turquoise text-xs tracking-[0.4em] uppercase font-bold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                AS ATRAÇÕES
              </span>
              <span className="text-ocean-dark/30">•</span>
              <span
                className="text-ocean-dark/60 text-xs tracking-wider uppercase font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                10 OUT • 22:20 ÀS 07:00
              </span>
            </div>
            <h2
              id="lineup-title"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
                letterSpacing: "0.02em",
                color: "#063E52",
                lineHeight: 0.9,
              }}
            >
              LINE-UP<br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px #4A2B29" }}>
                OFICIAL.
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex flex-wrap gap-2 mb-1">
              {["TECHNO", "TECHNOFUNK", "HOUSE"].map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-[10px] tracking-widest uppercase font-bold text-ocean-dark/70 border border-ocean-dark/15 rounded-full bg-white/40"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {genre}
                </span>
              ))}
            </div>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-ocean-dark font-bold hover:text-turquoise transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded w-fit"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Acompanhe os anúncios
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform transition-transform group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <ul
          ref={listRef}
          className="flex flex-col border-t border-ocean-dark/10"
          aria-label="Lista de artistas"
        >
          {lineup.map((artist, i) => (
            <li
              key={artist.id}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-8 md:py-10 border-b border-ocean-dark/10 transition-[background-color] duration-300 hover:bg-white/40 px-4 -mx-4 rounded-sm"
              style={{ opacity: 0, transform: "translateX(-30px)" }}
            >
              {/* Animated hover background */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 bg-turquoise opacity-0 group-hover:opacity-100 transition-opacity" 
                aria-hidden="true" 
              />
              
              <div className="flex items-center gap-6 md:gap-12">
                <span 
                  className="text-ocean-dark/20 text-3xl md:text-5xl font-display pointer-events-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                <div>
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-3xl md:text-5xl transition-colors duration-300 group-hover:text-ocean-dark"
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        letterSpacing: "0.03em",
                        color: artist.name === "Em breve" ? "rgba(6, 62, 82, 0.4)" : "#063E52"
                      }}
                    >
                      {artist.name}
                    </h3>
                    
                    {artist.slot && (
                      <span 
                        className={`px-2 py-0.5 text-[9px] tracking-widest uppercase font-bold rounded ${
                          artist.slot.includes("SUNRISE")
                            ? "bg-sunrise-gold text-ocean-dark shadow-sm"
                            : "bg-ocean-dark/10 text-ocean-dark/70"
                        }`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {artist.slot}
                      </span>
                    )}
                  </div>
                  
                  {artist.isHeadliner && (
                    <span 
                      className="inline-block mt-1 px-2 py-0.5 bg-ocean-dark text-sand-light text-[10px] tracking-widest uppercase font-bold"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Headliner
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 sm:text-right pl-14 sm:pl-0 flex flex-col sm:items-end justify-center">
                {artist.startTime && artist.endTime && (
                  <div className="flex flex-col gap-1 sm:items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-ocean-dark/40 text-[10px] tracking-widest uppercase font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                        Início
                      </span>
                      <span className="text-ocean-dark font-display text-xl sm:text-2xl tracking-wide min-w-[60px] text-left">
                        {artist.startTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ocean-dark/40 text-[10px] tracking-widest uppercase font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                        Até
                      </span>
                      <span className="text-ocean-dark/70 font-display text-lg sm:text-xl tracking-wide min-w-[60px] text-left">
                        {artist.endTime}
                      </span>
                    </div>
                  </div>
                )}
                
                {artist.genre && (
                  <p 
                    className="text-deep-brown/60 text-xs mt-3 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {artist.genre}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
