"use client";

import { event } from "@/data/event";

interface ScrollOverlayContentProps {
  progress: number; // 0 to 1 — driven directly by video currentTime / duration
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
}

function rangeProgress(p: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (p - start) / (end - start)));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ScrollOverlayContent({ progress }: ScrollOverlayContentProps) {
  /**
   * Video progress phases:
   *  0–20%  : nothing (just video)
   *  20–80% : "A MARÉ ESTÁ MUDANDO" slowly fades in and out
   *  98–100%: Logo, Event info, CTA button appear at the very end
   */

  // All final elements (Logo, Info, CTA) appear at the very end (90% - 98%)
  // They will hit 100% opacity exactly when the video pauses at 98%
  const finalRaw = rangeProgress(progress, 0.90, 0.98);
  const finalOpacity = easeOut(finalRaw);
  const finalY = lerp(30, 0, easeOut(finalRaw));

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 px-6 pointer-events-none">

      {/* TIDAL FEST logo — emerges at the very end */}
      <div
        className="absolute"
        style={{
          top: "45%",
          transform: `translate(-50%, calc(-50% + ${finalY}px))`,
          left: "50%",
          opacity: finalOpacity,
          width: "min(360px, 75vw)",
          textAlign: "center",
        }}
        aria-hidden={finalOpacity < 0.05}
      >
        <img
          src="/images/logo.svg"
          alt="TIDAL FEST"
          style={{
            width: "100%",
            filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.6)) brightness(10)",
            // brightness(10) makes the SVG appear white — works as a light overlay on dark video
          }}
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const next = img.nextElementSibling as HTMLElement;
            if (next) next.style.display = "block";
          }}
        />
        {/* Text fallback */}
        <div style={{ display: "none" }}>
          <span
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(4rem, 18vw, 9rem)",
              lineHeight: 1,
              color: "white",
              textShadow: "0 4px 24px rgba(0,0,0,0.8)",
              letterSpacing: "0.03em",
              display: "block",
            }}
          >
            TIDAL
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(1rem, 4vw, 2rem)",
              letterSpacing: "0.5em",
              color: "white",
              fontWeight: 700,
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            FEST.
          </span>
        </div>
      </div>

      {/* Event info — date & venue */}
      <div
        style={{
          position: "absolute",
          bottom: "160px",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: finalOpacity,
          transform: `translateY(${finalY}px)`,
        }}
        aria-hidden={finalOpacity < 0.05}
      >
        <p
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
            letterSpacing: "0.06em",
            color: "white",
            textShadow: "0 2px 16px rgba(0,0,0,0.8)",
          }}
        >
          {event.date} · {event.time}
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(0.6rem, 1.8vw, 0.8rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {event.venue} — {event.city}
        </p>
      </div>

      {/* CTA button — bottom of video */}
      <div
        className="pointer-events-auto"
        style={{
          opacity: finalOpacity,
          transform: `translateY(${finalY}px)`,
        }}
        aria-hidden={finalOpacity < 0.05}
      >
        <a
          href="#ingressos"
          className="animate-pulse-wave"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "16px 40px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 800,
            color: "white",
            background: "linear-gradient(135deg, #717f46 0%, #30371c 100%)",
            borderRadius: "6px",
            minHeight: "52px",
            textDecoration: "none",
          }}
          aria-label="Garantir meu ingresso para o TIDAL FEST"
        >
          GARANTIR MEU INGRESSO
        </a>
      </div>
    </div>
  );
}
