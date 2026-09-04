"use client";

import { useEffect, useRef } from "react";
import { MapPin, Calendar, Navigation } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { event } from "@/data/event";

gsap.registerPlugin(ScrollTrigger);

export default function EventInfoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select all elements we want to animate
    const elements = containerRef.current.querySelectorAll(".info-anim");
    
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="local"
      className="relative w-full bg-[#E8D4BB] flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="info-title"
    >
      <h2 id="info-title" className="sr-only">Data e Local</h2>

      {/* Gradient Transition from previous section (#EAD8C0) */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#EAD8C0] to-transparent z-10 pointer-events-none" />

      {/* ─── MOBILE VERSION (< md): Mantém o flyer vertical original ─── */}
      <div
        ref={containerRef}
        className="block md:hidden relative w-full mx-auto"
        style={{
          maxWidth: "500px",
          aspectRatio: "576 / 1024",
          backgroundImage: "url('/images/event-info-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          containerType: "inline-size",
        }}
      >
        {/* Header (Title Only) */}
        <div className="absolute top-[4%] left-0 w-full flex flex-col items-center info-anim z-30">
          <p
            className="text-[#063E52] font-bold tracking-[0.25em] uppercase"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "3.5cqi" }}
          >
            Informações do evento
          </p>
        </div>

        {/* Light Card Content */}
        <div
          className="absolute flex flex-col justify-between"
          style={{
            top: "33%",
            left: "12%",
            width: "76%",
            height: "27.5%",
            padding: "3cqi",
          }}
        >
          {/* Top: QUANDO */}
          <div className="flex items-center gap-[1.5cqi] info-anim">
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[2.8cqi] text-[#13BBC4]"
            >
              <path
                d="M1 4C2.5 4 2.5 1 4 1C5.5 1 5.5 4 7 4C8.5 4 8.5 1 10 1C11.5 1 11.5 4 13 4C14.5 4 14.5 1 16 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 7C2.5 7 2.5 4 4 4C5.5 4 5.5 7 7 7C8.5 7 8.5 4 10 4C11.5 4 11.5 7 13 7C14.5 7 14.5 4 16 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-[#13BBC4] font-bold tracking-[0.2em]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "2cqi" }}
            >
              QUANDO
            </span>
          </div>

          {/* Date row */}
          <div className="flex items-center gap-[2cqi] mt-[0.5cqi] info-anim">
            <span
              className="text-[#063E52] leading-none"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "18.5cqi" }}
            >
              10
            </span>
            <div className="flex flex-col justify-center pb-[0.5cqi]">
              <span
                className="text-[#063E52] font-black leading-none"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "8.5cqi" }}
              >
                OUTUBRO
              </span>
              <span
                className="text-[#13BBC4] font-bold tracking-widest leading-none mt-[0.8cqi]"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "2.2cqi" }}
              >
                SÁBADO • 2026
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#063E52]/20 my-[1cqi] info-anim" />

          {/* Time row */}
          <div className="flex justify-between items-center info-anim">
            <div className="flex flex-col border-r border-[#063E52]/20 pr-[2.5cqi]">
              <span
                className="text-[#063E52]/80 font-medium leading-none mb-[0.5cqi]"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "2cqi" }}
              >
                Início a partir das
              </span>
              <span
                className="text-[#063E52] font-bold leading-none mt-[0.5cqi]"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "7.5cqi" }}
              >
                22:30
              </span>
            </div>
            <div className="flex flex-col pl-[2cqi]">
              <svg
                width="16"
                height="4"
                viewBox="0 0 16 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[2.2cqi] text-[#13BBC4] mb-[0.5cqi]"
              >
                <path
                  d="M1 2C2.5 2 2.5 0 4 0C5.5 0 5.5 2 7 2C8.5 2 8.5 0 10 0C11.5 0 11.5 2 13 2C14.5 2 14.5 0 16 0"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className="text-[#063E52]/90 font-medium leading-tight"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.9cqi" }}
              >
                Festa até o<br />amanhecer do dia 11.
              </span>
            </div>
          </div>

          {/* Add to calendar button */}
          <a
            href={event.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-[1cqi] flex items-center justify-center gap-[1.5cqi] border border-[#13BBC4] rounded-md text-[#13BBC4] hover:bg-[#13BBC4]/10 transition-colors active:scale-95 info-anim"
            style={{ height: "6cqi" }}
          >
            <Calendar style={{ width: "2.5cqi", height: "2.5cqi" }} />
            <span
              className="font-bold tracking-widest uppercase"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.9cqi" }}
            >
              Adicionar ao calendário
            </span>
          </a>
        </div>

        {/* Dark Card Content */}
        <div
          className="absolute flex flex-col justify-between"
          style={{
            top: "62%",
            left: "12%",
            width: "76%",
            height: "21%",
            padding: "3cqi",
          }}
        >
          <div className="flex items-center gap-[1cqi] info-anim">
            <MapPin style={{ width: "2.8cqi", height: "2.8cqi" }} className="text-[#13BBC4]" />
            <span
              className="text-[#13BBC4] font-bold tracking-[0.2em]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "2cqi" }}
            >
              ONDE
            </span>
          </div>

          <div className="flex flex-col info-anim">
            <h3
              className="text-white leading-tight font-bold drop-shadow-sm mt-[0.5cqi]"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "7.2cqi" }}
            >
              PRAIA DO
              <br />
              PARQUE TURÍSTICO
            </h3>
            <p
              className="text-[#13BBC4] font-semibold mt-[0.5cqi]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "2.4cqi" }}
            >
              {event.city}
            </p>
          </div>

          <div className="w-full flex gap-[2cqi] mt-[1cqi] info-anim">
            <a
              href={event.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-[1.5cqi] border border-[#13BBC4] rounded-md text-white hover:bg-white/10 transition-colors active:scale-95"
              style={{ height: "6cqi" }}
            >
              <MapPin style={{ width: "2.2cqi", height: "2.2cqi" }} />
              <span
                className="font-bold tracking-widest uppercase"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.8cqi" }}
              >
                Google Maps
              </span>
            </a>
            <a
              href={event.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-[1.5cqi] border border-[#13BBC4] rounded-md text-white hover:bg-white/10 transition-colors active:scale-95"
              style={{ height: "6cqi" }}
            >
              <Navigation style={{ width: "2.2cqi", height: "2.2cqi" }} />
              <span
                className="font-bold tracking-widest uppercase"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.8cqi" }}
              >
                Waze
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP VERSION (md+): Fundo normal limpo e layout 2 colunas espaçoso ─── */}
      <div className="hidden md:flex flex-col items-center w-full max-w-6xl mx-auto px-6 py-20 z-20">
        <p
          className="text-[#063E52] font-bold tracking-[0.3em] uppercase text-sm mb-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Informações do evento
        </p>
        <h2
          className="text-[#063E52] text-5xl lg:text-6xl mb-12 uppercase tracking-wide text-center"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          QUANDO & ONDE
        </h2>

        <div className="grid grid-cols-2 gap-8 w-full">
          {/* Card QUANDO */}
          <div
            className="p-8 lg:p-10 rounded-2xl border border-ocean-dark/10 shadow-xl flex flex-col justify-between backdrop-blur-md"
            style={{ background: "rgba(255, 255, 255, 0.7)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-[#13BBC4]" size={20} />
                <span className="text-[#13BBC4] font-bold tracking-[0.2em] text-xs uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  QUANDO
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[#063E52] font-display text-8xl leading-none">
                  10
                </span>
                <div className="flex flex-col">
                  <span className="text-[#063E52] font-display text-4xl leading-none">
                    OUTUBRO
                  </span>
                  <span className="text-[#13BBC4] font-bold tracking-widest text-xs uppercase mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    SÁBADO • 2026
                  </span>
                </div>
              </div>

              <div className="border-t border-[#063E52]/15 pt-6 flex justify-between items-center mb-8">
                <div>
                  <span className="text-[#063E52]/70 text-xs font-semibold uppercase tracking-wider block mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    Início a partir das
                  </span>
                  <span className="text-[#063E52] font-display text-4xl">
                    22:30
                  </span>
                </div>
                <p className="text-[#063E52]/80 text-sm font-medium text-right max-w-[180px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Festa até o amanhecer do dia 11.
                </p>
              </div>
            </div>

            <a
              href={event.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 flex items-center justify-center gap-2 border-2 border-[#13BBC4] rounded-lg text-[#063E52] font-bold text-xs uppercase tracking-widest hover:bg-[#13BBC4]/10 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Calendar size={16} className="text-[#13BBC4]" />
              Adicionar ao calendário
            </a>
          </div>

          {/* Card ONDE */}
          <div
            className="p-8 lg:p-10 rounded-2xl border border-ocean-dark/10 shadow-xl flex flex-col justify-between backdrop-blur-md"
            style={{ background: "rgba(6, 62, 82, 0.95)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="text-[#13BBC4]" size={20} />
                <span className="text-[#13BBC4] font-bold tracking-[0.2em] text-xs uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  ONDE
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-display text-5xl lg:text-6xl leading-tight mb-2">
                  PRAIA DO<br />PARQUE TURÍSTICO
                </h3>
                <p className="text-[#13BBC4] font-bold text-sm tracking-wider uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  {event.city}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href={event.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 flex items-center justify-center gap-2 border border-white/30 rounded-lg text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MapPin size={16} className="text-[#13BBC4]" />
                Google Maps
              </a>
              <a
                href={event.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 flex items-center justify-center gap-2 border border-white/30 rounded-lg text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Navigation size={16} className="text-[#13BBC4]" />
                Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
