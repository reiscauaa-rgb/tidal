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
      style={{ background: "#F4E8D1" }} // sand-light
      aria-labelledby="lineup-title"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p
              className="text-turquoise text-xs tracking-[0.4em] uppercase mb-4 font-bold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              AS ATRAÇÕES
            </p>
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

        <ul
          ref={listRef}
          className="flex flex-col border-t border-ocean-dark/10"
          aria-label="Lista de artistas"
        >
          {lineup.map((artist, i) => (
            <li
              key={artist.id}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-8 md:py-10 border-b border-ocean-dark/10 transition-all duration-300 hover:bg-white/40 px-4 -mx-4 rounded-sm"
              style={{ opacity: 0, transform: "translateX(-30px)" }}
            >
              {/* Animated hover background */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 bg-turquoise opacity-0 group-hover:opacity-100 transition-opacity" 
                aria-hidden="true" 
              />
              
              <div className="flex items-baseline gap-6 md:gap-12">
                <span 
                  className="text-ocean-dark/20 text-3xl md:text-5xl font-display pointer-events-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                <div>
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
                  
                  {artist.isHeadliner && (
                    <span 
                      className="inline-block mt-2 px-2 py-0.5 bg-ocean-dark text-sand-light text-[10px] tracking-widest uppercase font-bold"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Headliner
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 sm:text-right pl-14 sm:pl-0">
                <p 
                  className="text-ocean-dark/50 text-sm tracking-widest uppercase font-semibold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {artist.time}
                </p>
                <p 
                  className="text-deep-brown/60 text-xs mt-1 font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {artist.genre}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
