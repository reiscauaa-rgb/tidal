"use client";

import { MapPin, Navigation, Calendar } from "lucide-react";
import { event } from "@/data/event";

export default function EventInfoSection() {
  return (
    <section
      id="local"
      className="relative section-padding overflow-hidden"
      style={{ background: "#EAD8C0" }} // sand-bg
      aria-labelledby="info-title"
    >
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12 md:mt-0">
        {/* Date & Time Block */}
        <div
          className="flex-1 p-8 md:p-12 border border-ocean-dark/10 relative overflow-hidden group"
          style={{ background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(12px)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean-dark to-turquoise" aria-hidden="true" />
          
          <h2 id="info-title" className="sr-only">Data e Horário</h2>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-turquoise text-xs tracking-[0.3em] uppercase mb-8 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                QUANDO
              </p>
              
              {/* Custom Date UI */}
              <div className="bg-white/60 backdrop-blur-md rounded-xl p-5 md:p-8 border border-ocean-dark/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                <div className="absolute left-0 top-0 w-1.5 h-full bg-turquoise" />
                
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="flex flex-col items-center justify-center border-r border-ocean-dark/10 pr-6 md:pr-8">
                    <span className="text-sm font-bold text-ocean-dark tracking-widest uppercase mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Outubro</span>
                    <span className="text-7xl md:text-8xl text-ocean-dark leading-none drop-shadow-sm" style={{ fontFamily: "Bebas Neue, sans-serif" }}>10</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-ocean-dark text-white text-[10px] md:text-xs font-bold rounded uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                        Sábado
                      </span>
                      <span className="text-ocean-dark/70 text-sm font-bold tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>2026</span>
                    </div>
                    <p className="text-ocean-dark font-medium md:text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                      Início a partir das <strong className="font-black text-xl">{event.time}</strong>
                    </p>
                    <p className="text-sm md:text-base text-ocean-dark/70 flex items-center gap-2 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-sunrise-gold animate-pulse" />
                      Festa até o amanhecer do dia 11.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={event.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 px-5 py-3 text-xs tracking-widest uppercase font-bold text-ocean-dark border border-ocean-dark/20 hover:bg-ocean-dark/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded bg-white/30 backdrop-blur-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Calendar size={16} aria-hidden="true" />
              Adicionar ao Calendário
            </a>
          </div>
        </div>

        {/* Location Block */}
        <div
          className="flex-[1.5] p-8 md:p-12 border border-ocean-dark/10 relative overflow-hidden flex flex-col justify-between group"
          style={{ background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(12px)" }}
        >
          {/* Dynamic Google Maps Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-700 group-hover:opacity-60" aria-hidden="true">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14589.646549491147!2d-46.9983!3d-24.3200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d1ab1229a43a01%3A0x8990d575796dfa42!2sPeru%C3%ADbe%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1714578129845!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(100%) blur(3px) opacity(0.8) sepia(20%) hue-rotate(170deg)" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
            />
            {/* Gradient Overlay to blend it nicely */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#EAD8C0]/80 via-white/40 to-white/60 mix-blend-overlay" />
          </div>

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-turquoise to-sunrise-gold" aria-hidden="true" />
          
          <div className="relative z-10">
            <p className="text-turquoise text-xs tracking-[0.3em] uppercase mb-8 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
              ONDE
            </p>
            
            <h3 className="text-4xl md:text-5xl text-ocean-dark mb-4 drop-shadow-sm" style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "0.02em" }}>
              {event.venue}
            </h3>
            
            <p className="text-ocean-dark/80 text-base max-w-md leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
              {event.city}
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10">
            <a
              href={event.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-4 text-xs tracking-widest uppercase font-bold text-sand-light transition-all hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm shadow-lg hover:shadow-xl"
              style={{ fontFamily: "Inter, sans-serif", background: "#063E52" }}
            >
              <MapPin size={16} aria-hidden="true" />
              Google Maps
            </a>
            
            <a
              href={event.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-4 text-xs tracking-widest uppercase font-bold text-ocean-dark border border-ocean-dark/20 hover:bg-white/50 transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm bg-white/30 backdrop-blur-sm"
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
