"use client";

import { useEffect, useRef, useState } from "react";

const artworks = [
  {
    id: "art-01",
    src: "/images/tidal-art-01.webp",
    alt: "Arte TIDAL FEST — personagem cromado com logotipo",
  },
  {
    id: "art-02",
    src: "/images/tidal-art-02.webp",
    alt: "Arte TIDAL FEST — personagem cromado ao pôr do sol tropical",
  },
  {
    id: "art-03",
    src: "/images/tidal-art-03.webp",
    alt: "Arte TIDAL FEST — beach party com personagem cromado",
  },
];

function ArtCard({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.style.opacity = "1";
              cardRef.current.style.transform = "translateY(0)";
            }
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden group cursor-default shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm"
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        border: "1px solid rgba(6,62,82,0.1)",
        aspectRatio: "3/4",
      }}
      role="img"
      aria-label={alt}
    >
      {/* Loading shimmer */}
      {!loaded && !errored && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: "linear-gradient(135deg, rgba(234,216,192,0.5) 0%, rgba(244,232,209,0.8) 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Placeholder if image not available */}
      {errored && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/40"
          aria-label={`Arte ${index + 1} — imagem não disponível`}
        >
          {/* Decorative polygon placeholder */}
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" aria-hidden="true">
            <polygon
              points="30,5 55,25 50,55 30,75 10,55 5,25"
              stroke="rgba(6,62,82,0.2)"
              strokeWidth="2"
              fill="rgba(19,187,196,0.05)"
              strokeDasharray="4 4"
            />
            <circle cx="22" cy="28" r="3" fill="rgba(6,62,82,0.2)" />
            <circle cx="38" cy="28" r="3" fill="rgba(6,62,82,0.2)" />
          </svg>
          <p
            className="text-ocean-dark/40 text-xs tracking-wider text-center px-4 font-bold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            [tidal-art-0{index + 1}.webp]
          </p>
        </div>
      )}

      {/* Actual image */}
      {!errored && (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      )}

      {/* Overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(74,43,41,0.4) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function GallerySection() {
  return (
    <section
      id="galeria"
      className="relative section-padding"
      style={{ background: "#EAD8C0" }} // sand-bg
      aria-labelledby="gallery-title"
    >
      <div className="relative max-w-6xl mx-auto">
        <p
          className="text-turquoise text-xs tracking-[0.4em] uppercase mb-4 font-bold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          GALERIA
        </p>

        <h2
          id="gallery-title"
          className="mb-10 md:mb-14"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            letterSpacing: "0.03em",
            color: "#063E52",
            lineHeight: 0.95,
          }}
        >
          ISSO É<br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px #4A2B29" }}>TIDAL.</span>
        </h2>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          role="list"
          aria-label="Galeria de artes do TIDAL FEST"
        >
          {artworks.map((art, i) => (
            <div key={art.id} role="listitem">
              <ArtCard src={art.src} alt={art.alt} index={i} />
            </div>
          ))}
        </div>

        {/* Social prompt */}
        <div className="mt-10 md:mt-14 text-center">
          <p
            className="text-ocean-dark/60 text-sm mb-4 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Acompanhe a experiência nas redes sociais
          </p>
          <a
            href="https://instagram.com/tidalfest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.3em] uppercase font-bold text-ocean-dark border border-ocean-dark/20 hover:bg-ocean-dark/5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
            style={{ fontFamily: "Inter, sans-serif", minHeight: "44px" }}
          >
            @TIDALFEST
          </a>
        </div>
      </div>
    </section>
  );
}
