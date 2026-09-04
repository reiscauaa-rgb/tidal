"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import HeroScrollVideo, { type HeroVideoHandle } from "./HeroScrollVideo";
import ScrollOverlayContent from "./ScrollOverlayContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * HeroSection — Scroll-intercept approach
 *
 * ┌─ Page opens ──────────────────────────────────────────────────┐
 * │  body.overflow = "hidden"  → page is locked                   │
 * │  Video fills the entire viewport                              │
 * └───────────────────────────────────────────────────────────────┘
 *           ↓ User scrolls down (wheel / swipe)
 * ┌─ While video is playing ──────────────────────────────────────┐
 * │  wheel / touchmove → preventDefault (no real scroll)          │
 * │  delta → converted to seconds → video scrubs forward          │
 * │  Scroll up → video goes backward                              │
 * └───────────────────────────────────────────────────────────────┘
 *           ↓ Video reaches 98%
 * ┌─ Video ended ─────────────────────────────────────────────────┐
 * │  body.overflow = ""  → normal scrolling restored              │
 * │  User can now scroll to the sections below                    │
 * └───────────────────────────────────────────────────────────────┘
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Only pin when normal scrolling is restored
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      pin: true,
      pinSpacing: false,
      markers: false,
    });
  }, { scope: sectionRef });


  const videoRef = useRef<HeroVideoHandle>(null);
  const [progress, setProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const lastTouchY = useRef<number | null>(null);

  // Força o scroll para o topo sempre que o site é carregado
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  // Keep videoEnded accessible inside event listeners without re-binding them
  const videoEndedRef = useRef(false);

  const handleVideoEnd = useCallback(() => {
    videoEndedRef.current = true;
    setVideoEnded(true);
  }, []);

  const handleVideoRewound = useCallback(() => {
    videoEndedRef.current = false;
    setVideoEnded(false);
  }, []);

  const handleProgressChange = useCallback((p: number) => {
    setProgress(p);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("heroProgress", { detail: p }));
    }
  }, []);

  // ── Lock / unlock body scroll ────────────────────────────────────
  useEffect(() => {
    if (!videoEnded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Ensure scroll position is at 0 when unlocking
      // so user doesn't land halfway down the page
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [videoEnded]);

  // ── Interaction Interception ───────────────────────────────────────────
  // IMPORTANT: Register listeners ONCE only, use videoEndedRef to read current state
  // This prevents the re-registration race condition that causes the scroll freeze.
  useEffect(() => {
    const handleForwardInteraction = () => {
      if (!videoEndedRef.current && !videoRef.current?.isPlaying()) {
        videoRef.current?.playForward();
      }
    };

    const handleBackwardInteraction = () => {
      // Só volta se estiver no topo, o vídeo já tiver acabado e não estiver tocando
      if (videoEndedRef.current && window.scrollY <= 0 && !videoRef.current?.isPlaying()) {
        videoEndedRef.current = false;
        setVideoEnded(false);
        // Garante que a página cole no topo
        window.scrollTo({ top: 0, behavior: "instant" });
        videoRef.current?.playBackward();
      }
    };

    const onWheel = (e: WheelEvent) => {
      // TRAVA ABSOLUTA: Ignora scroll totalmente se o vídeo está em movimento
      if (videoRef.current?.isPlaying()) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (videoEndedRef.current) {
        // Livre para navegar. Só intercepta se tentar rolar para cima no topo exato.
        // THRESHOLD: -20 para evitar disparos acidentais de mouses sensíveis
        if (window.scrollY <= 0 && e.deltaY < -20) {
          if (e.cancelable) e.preventDefault();
          handleBackwardInteraction();
        }
        return;
      }
      
      // Vídeo não acabou, então consome o scroll para dar o gatilho inicial
      if (e.cancelable) e.preventDefault();
      if (e.deltaY > 15) {
        handleForwardInteraction();
      } else if (e.deltaY < -15) {
        videoRef.current?.playBackward();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY.current === null) return;
      const delta = lastTouchY.current - e.touches[0].clientY;

      // TRAVA ABSOLUTA: Ignora dedo totalmente se o vídeo está em movimento
      if (videoRef.current?.isPlaying()) {
        if (e.cancelable) e.preventDefault();
        lastTouchY.current = e.touches[0].clientY;
        return;
      }

      if (videoEndedRef.current) {
        // Delta < 0 = Dedo movendo para baixo = Rolando a página para cima
        // THRESHOLD: -15 para evitar que o tremor inicial do dedo dispare o rewind
        if (window.scrollY <= 0 && delta < -15) {
          if (e.cancelable) e.preventDefault();
          handleBackwardInteraction();
        }
        lastTouchY.current = e.touches[0].clientY;
        return;
      }

      if (e.cancelable) e.preventDefault();
      lastTouchY.current = e.touches[0].clientY;
      if (delta > 15) handleForwardInteraction();
      else if (delta < -15) videoRef.current?.playBackward();
    };

    const onTouchEnd = () => {
      lastTouchY.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      // TRAVA ABSOLUTA no teclado
      if (videoRef.current?.isPlaying()) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)) {
          if (e.cancelable) e.preventDefault();
        }
        return;
      }

      if (videoEndedRef.current) {
        if (window.scrollY <= 0 && ["ArrowUp", "PageUp"].includes(e.key)) {
          if (e.cancelable) e.preventDefault();
          handleBackwardInteraction();
        }
        return;
      }

      if (["ArrowDown", " ", "PageDown"].includes(e.key)) {
        if (e.cancelable) e.preventDefault();
        handleForwardInteraction();
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (e.cancelable) e.preventDefault();
        videoRef.current?.playBackward();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", handleForwardInteraction);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", handleForwardInteraction);
    };
    // Empty deps: register ONCE. State is read via videoEndedRef (ref, not state).
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full cursor-pointer h-screen"
      style={{ height: "100dvh", zIndex: 0 }}
      aria-label="Abertura TIDAL FEST — role ou clique para assistir"
    >
      <HeroScrollVideo
        ref={videoRef}
        onVideoEnd={handleVideoEnd}
        onVideoRewound={handleVideoRewound}
        onProgressChange={handleProgressChange}
      />

      {/* Text overlays — HTML na hero com logo, infos e botão */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <ScrollOverlayContent progress={progress} />
      </div>

      {/* Indicador de rolagem */}
      <div
        className={`absolute left-0 right-0 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700 ${
          progress < 0.04 ? "opacity-100" : "opacity-0"
        }`}
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      >
        <span
          className="animate-pulse"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          Role para mergulhar
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Gradient fade into next section — only after video ends */}
      {videoEnded && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent, #EAD8C0)",
          }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
