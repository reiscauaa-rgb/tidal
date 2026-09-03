"use client";

export default function TicketsHeaderSection() {
  return (
    <section className="relative w-full aspect-video flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video (Ping-Pong pre-rendered) */}
      <video
        src="/videos/tickets-header-loop.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      
      {/* Text Content - Sem filtros/sombras, apenas o texto limpo centralizado */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <p 
          className="text-[#13BBC4] font-bold tracking-[0.4em] uppercase mb-2 md:mb-3"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(0.65rem, 1.5vw, 1rem)" }}
        >
          Acesso
        </p>
        <h2
          className="text-white uppercase leading-none"
          style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          GARANTA SEU LUGAR.
        </h2>
      </div>

      {/* Gradient transition to the next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F4E8D1)" }}
      />
    </section>
  );
}
