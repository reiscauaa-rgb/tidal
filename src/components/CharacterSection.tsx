"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const images = [
  { src: "/images/tidal-insp-1.jpg", alt: "Sunset Vibes" },
  { src: "/images/tidal-insp-2.jpg", alt: "Red Room" },
  { src: "/images/tidal-insp-3.jpg", alt: "Tidal Fest" },
];

const marqueeImages = [...images, ...images, ...images];
const SPEED = 48;

export default function CharacterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const lastTsRef = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const isVisibleRef = useRef(false);

  const waveStart = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
  const waveEnd = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

  useGSAP(() => {
    if (!sectionRef.current || !pathRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 1,
      },
    })
      .to(pathRef.current, { attr: { d: waveStart }, ease: "power2.in" })
      .to(pathRef.current, { attr: { d: waveEnd }, ease: "power2.out" });

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: sectionRef });

  useEffect(() => {
    const strip = stripRef.current;
    const section = sectionRef.current;
    if (!strip || !section) return;

    const loopWidth = strip.scrollWidth / 3;
    offsetRef.current = -loopWidth;
    lastTsRef.current = performance.now();

    // Pause RAF when section is not visible
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafRef.current) {
          lastTsRef.current = performance.now();
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(section);

    const tick = (ts: number) => {
      if (!isVisibleRef.current) {
        rafRef.current = null;
        return; // Stop the loop when not visible
      }

      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (!isDragging.current) {
        offsetRef.current += SPEED * (dt / 1000);
        if (offsetRef.current >= 0) offsetRef.current -= loopWidth;
      }

      strip.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointerX.current = e.clientX;
      strip.setPointerCapture(e.pointerId);
      strip.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - lastPointerX.current;
      lastPointerX.current = e.clientX;
      offsetRef.current += delta;
      if (offsetRef.current >= 0) offsetRef.current -= loopWidth;
      if (offsetRef.current < -loopWidth * 2) offsetRef.current += loopWidth;
    };

    const onPointerUp = () => {
      isDragging.current = false;
      strip.style.cursor = "grab";
    };

    strip.addEventListener("pointerdown", onPointerDown);
    strip.addEventListener("pointermove", onPointerMove);
    strip.addEventListener("pointerup", onPointerUp);
    strip.addEventListener("pointercancel", onPointerUp);
    strip.style.cursor = "grab";
    strip.style.userSelect = "none";

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      visibilityObserver.disconnect();
      strip.removeEventListener("pointerdown", onPointerDown);
      strip.removeEventListener("pointermove", onPointerMove);
      strip.removeEventListener("pointerup", onPointerUp);
      strip.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inspiracoes"
      className="relative section-padding overflow-hidden"
      style={{ background: "#F4E8D1" }}
      aria-label="Nossas Inspiracoes"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="blue-wave-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#13BBC4" />
            <stop offset="100%" stopColor="#063E52" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="url(#blue-wave-grad)"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>

      <div ref={contentRef} className="relative z-10 text-center mb-60 md:mb-64 opacity-0 px-4">
        <p
          className="text-white/70 text-xs tracking-[0.45em] uppercase mb-5 font-bold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          NOSSAS INSPIRAÇÕES
        </p>
        <h2
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            letterSpacing: "0.02em",
            color: "#ffffff",
            lineHeight: 0.9,
            marginBottom: "1.5rem",
          }}
        >
          {"A ENERGIA "}
          <span style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}>
            DO AGORA.
          </span>
        </h2>
        <p
          className="text-white/80 text-base leading-relaxed max-w-lg mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          A Tidal Fest nasceu da vontade de unir a imensidão da natureza com a energia
          indomável da música eletrônica. Do palco às luzes neon, cada detalhe reflete
          o pôr do sol e as marés.
        </p>
      </div>

      <div className="relative z-10">
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none overflow-hidden"
          style={{ bottom: "100%", marginBottom: "1px" }}
        >
          <Image
            src="/images/tidal-character-pointing.png"
            alt="Personagem cromado apontando para o carrosel"
            width={800}
            height={1000}
            quality={75}
            loading="lazy"
            style={{
              width: "clamp(433px, 75vw, 800px)",
              height: "auto",
              maxWidth: "none",
              objectFit: "contain",
              objectPosition: "bottom",
              display: "block",
              marginBottom: "-25%",
            }}
          />
        </div>

        <div className="relative overflow-hidden">

          <div
            ref={stripRef}
            className="flex gap-[2px] will-change-transform"
            style={{ width: "max-content" }}
          >
            {marqueeImages.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 overflow-hidden"
                style={{
                  width: "clamp(260px, 72vw, 320px)",
                  height: "clamp(340px, 94vw, 420px)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={320}
                  height={420}
                  quality={75}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
