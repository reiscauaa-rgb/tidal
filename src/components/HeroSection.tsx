"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import HeroScrollVideo, { type HeroVideoHandle } from "./HeroScrollVideo";
import ScrollOverlayContent from "./ScrollOverlayContent";

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
export default function HeroSection() {
  const videoRef = useRef<HeroVideoHandle>(null);
  const [progress, setProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const lastTouchY = useRef<number | null>(null);

  // Tune: how many seconds of video per pixel of scroll delta
  // Smaller = slower video advance per scroll tick (feels more cinematic)
  const SECONDS_PER_DELTA_PX = 0.008;
  const SECONDS_PER_TOUCH_PX = 0.012;

  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
  }, []);

  const handleProgressChange = useCallback((p: number) => {
    setProgress(p);
  }, []);

  // ── Lock / unlock body scroll ────────────────────────────────────
  useEffect(() => {
    // We no longer blindly lock the body scroll. 
    // We only lock it if the video is NOT ended, OR if we are scrolling back up into it.
    if (!videoEnded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [videoEnded]);

  // ── Wheel interception ───────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (videoEnded) {
        // If we are at the top of the window and scrolling UP, we want to re-lock and rewind
        if (window.scrollY <= 0 && e.deltaY < 0) {
          e.preventDefault();
          setVideoEnded(false);
          videoRef.current?.advance(e.deltaY * SECONDS_PER_DELTA_PX);
        }
        // Otherwise, let normal scrolling happen
        return;
      }

      e.preventDefault();
      videoRef.current?.advance(e.deltaY * SECONDS_PER_DELTA_PX);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [videoEnded]);

  // ── Touch interception ───────────────────────────────────────────
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY.current === null) return;
      const delta = lastTouchY.current - e.touches[0].clientY; // positive = swipe up = forward
      
      if (videoEnded) {
        // If at top of page and swiping down (delta < 0), re-engage video
        if (window.scrollY <= 0 && delta < 0) {
           e.preventDefault();
           setVideoEnded(false);
           videoRef.current?.advance(delta * SECONDS_PER_TOUCH_PX);
        }
        lastTouchY.current = e.touches[0].clientY;
        return;
      }

      e.preventDefault();
      lastTouchY.current = e.touches[0].clientY;
      videoRef.current?.advance(delta * SECONDS_PER_TOUCH_PX);
    };

    const onTouchEnd = () => {
      lastTouchY.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [videoEnded]);

  // ── Keyboard interception ────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      
      if (videoEnded) {
        if (window.scrollY <= 0 && ["ArrowUp", "PageUp"].includes(e.key)) {
          e.preventDefault();
          setVideoEnded(false);
          videoRef.current?.advance(-0.5);
        }
        return;
      }

      if (["ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        videoRef.current?.advance(0.5);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        videoRef.current?.advance(-0.5);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [videoEnded]);

  return (
    <section
      className="relative w-full"
      style={{ height: "100vh" }}
      aria-label="Abertura TIDAL FEST — role para assistir"
    >
      {/* Video layer — absolute fills 100vh */}
      <HeroScrollVideo
        ref={videoRef}
        onVideoEnd={handleVideoEnd}
        onProgressChange={handleProgressChange}
      />

      {/* Text overlays — appear as video progresses */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <ScrollOverlayContent progress={progress} />
      </div>

      {/* Scroll hint — only at the very start */}
      <div
        className={`absolute bottom-10 left-0 right-0 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700 ${
          progress < 0.04 ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
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
