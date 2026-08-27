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

  const tideRaw = rangeProgress(progress, 0.2, 0.8);
  // Fade in on first half, fade out on second half
  const tideOpacity = tideRaw < 0.5
    ? easeOut(tideRaw * 2)
    : easeOut((1 - tideRaw) * 2);
  const tideY = lerp(20, 0, easeOut(Math.min(tideRaw * 2, 1)));

  // All final elements (Logo, Info, CTA) appear at the very end (98% - 100%)
  const finalRaw = rangeProgress(progress, 0.98, 1.0);
  const finalOpacity = easeOut(finalRaw);
  const finalY = lerp(30, 0, easeOut(finalRaw));

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 px-6 pointer-events-none">

      {/* "A MARÉ ESTÁ MUDANDO" — appears early/mid video */}
      <div
        className="absolute"
        style={{
          top: "45%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: tideOpacity,
          transform: `translateY(${tideY}px)`,
        }}
        aria-hidden={tideOpacity < 0.05}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(0.6rem, 2vw, 0.875rem)",
            fontWeight: 600,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
          }}
        >
          A MARÉ ESTÁ MUDANDO
        </p>
      </div>

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
          src="/images/tidal-logo.svg"
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "14px 36px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "white",
            background: "linear-gradient(135deg, #063E52 0%, #4A2B29 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
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
