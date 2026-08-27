"use client";

import { MapPin, Navigation, Calendar } from "lucide-react";
import { event } from "@/data/event";

export default function EventInfoSection() {
  return (
    <section
      id="local"
      className="relative section-padding"
      style={{ background: "#EAD8C0" }} // sand-bg
      aria-labelledby="info-title"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Date & Time Block */}
        <div
          className="flex-1 p-8 md:p-12 border border-ocean-dark/10 relative overflow-hidden"
          style={{ background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(12px)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean-dark to-turquoise" aria-hidden="true" />
          
          <h2 id="info-title" className="sr-only">Data e Horário</h2>
          
          <p className="text-turquoise text-xs tracking-[0.3em] uppercase mb-8 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
            QUANDO
          </p>
          
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-ocean-dark/60 text-sm mb-1 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>DATA</p>
              <p className="text-4xl md:text-5xl text-ocean-dark" style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "0.02em" }}>
                {event.date}
              </p>
            </div>
            
            <div className="w-12 h-px bg-ocean-dark/10" aria-hidden="true" />
            
            <div>
              <p className="text-ocean-dark/60 text-sm mb-1 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>HORÁRIO</p>
              <p className="text-4xl md:text-5xl text-ocean-dark" style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "0.02em" }}>
                {event.time}
              </p>
            </div>
          </div>

          <a
            href={event.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-5 py-3 text-xs tracking-widest uppercase font-bold text-ocean-dark border border-ocean-dark/20 hover:bg-ocean-dark/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Calendar size={16} aria-hidden="true" />
            Adicionar ao Calendário
          </a>
        </div>

        {/* Location Block */}
        <div
          className="flex-[1.5] p-8 md:p-12 border border-ocean-dark/10 relative overflow-hidden flex flex-col justify-between"
          style={{ background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(12px)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-turquoise to-sunrise-gold" aria-hidden="true" />
          
          <div>
            <p className="text-turquoise text-xs tracking-[0.3em] uppercase mb-8 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
              ONDE
            </p>
            
            <h3 className="text-4xl md:text-5xl text-ocean-dark mb-4" style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "0.02em" }}>
              {event.venue}
            </h3>
            
            <p className="text-ocean-dark/70 text-base max-w-md leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
              {event.city}
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={event.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-4 text-xs tracking-widest uppercase font-bold text-sand-light transition-colors hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm"
              style={{ fontFamily: "Inter, sans-serif", background: "#063E52" }}
            >
              <MapPin size={16} aria-hidden="true" />
              Google Maps
            </a>
            
            <a
              href={event.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-4 text-xs tracking-widest uppercase font-bold text-ocean-dark border border-ocean-dark/20 hover:bg-ocean-dark/5 transition-colors active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Navigation size={16} aria-hidden="true" />
              Navegar de Waze
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
