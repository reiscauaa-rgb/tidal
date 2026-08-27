"use client";

import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

export interface HeroVideoHandle {
  advance: (seconds: number) => void;
}

interface HeroScrollVideoProps {
  onVideoEnd: () => void;
  onProgressChange: (progress: number) => void;
}

const HeroScrollVideo = forwardRef<HeroVideoHandle, HeroScrollVideoProps>(
  function HeroScrollVideo({ onVideoEnd, onProgressChange }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const targetTimeRef = useRef(0);
    const currentTimeRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const isReadyRef = useRef(false);
    const endFiredRef = useRef(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Expose advance() to parent
    useImperativeHandle(
      ref,
      () => ({
        advance(seconds: number) {
          const video = videoRef.current;
          if (!video || !isReadyRef.current || video.duration <= 0) return;
          targetTimeRef.current = Math.max(
            0,
            Math.min(targetTimeRef.current + seconds, video.duration)
          );
        },
      }),
      []
    );

    useEffect(() => {
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }, []);

    // RAF smooth interpolation loop
    useEffect(() => {
      if (reducedMotion) return;

      const video = videoRef.current;
      if (!video) return;

      video.preload = "auto";

      const onMeta = () => {
        isReadyRef.current = true;
      };
      const onCanPlay = () => setIsLoaded(true);

      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("canplay", onCanPlay);
      if (video.readyState >= 1) onMeta();
      if (video.readyState >= 3) setIsLoaded(true);

      // --- iOS Safari Unlock ---
      // iOS delays loading video metadata/frames until a play() is called.
      // We attach a one-time listener to the first touch or scroll to trigger play() then pause().
      const unlockVideo = () => {
        if (video && video.paused && !isLoaded) {
          const p = video.play();
          if (p !== undefined) {
            p.then(() => {
              video.pause();
              isReadyRef.current = true;
              setIsLoaded(true);
            }).catch(() => {});
          }
        }
        window.removeEventListener("touchstart", unlockVideo);
        window.removeEventListener("wheel", unlockVideo);
        window.removeEventListener("click", unlockVideo);
      };

      window.addEventListener("touchstart", unlockVideo, { passive: true });
      window.addEventListener("wheel", unlockVideo, { passive: true });
      window.addEventListener("click", unlockVideo, { passive: true });

      const SMOOTHING = 0.1;

      const tick = () => {
        const v = videoRef.current;
        if (v && isReadyRef.current && v.duration > 0) {
          const diff = targetTimeRef.current - currentTimeRef.current;

          if (Math.abs(diff) > 0.001) {
            currentTimeRef.current += diff * SMOOTHING;
          } else {
            currentTimeRef.current = targetTimeRef.current;
          }

          const clamped = Math.max(
            0,
            Math.min(currentTimeRef.current, v.duration - 0.01)
          );
          v.currentTime = clamped;

          const progress = clamped / v.duration;
          onProgressChange(progress);

          // Fire end event once when scrubbed to >= 98%
          if (progress >= 0.98 && !endFiredRef.current) {
            endFiredRef.current = true;
            onVideoEnd();
          }
          // Reset so user can rewind and trigger end again if needed
          if (progress < 0.95) {
            endFiredRef.current = false;
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("canplay", onCanPlay);
      };
    }, [reducedMotion, onProgressChange, onVideoEnd]);

    if (reducedMotion) {
      return (
        <div
          className="absolute inset-0"
          style={{ background: "#EAD8C0" }}
          role="img"
          aria-label="TIDAL FEST"
        />
      );
    }

    return (
      <>
        {/* Poster while loading */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            background: "#EAD8C0",
            backgroundImage: "url('/images/tidal-hero-poster-mobile.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        {/* Full-screen video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          poster="/images/tidal-hero-poster-mobile.webp"
        >
          <source
            src="/videos/tidal-hero-mobile.mp4"
            type="video/mp4"
            media="(max-width: 1023px)"
          />
          <source src="/videos/tidal-hero-desktop.mp4" type="video/mp4" />
          {/* Fallback: serve mobile for desktop if desktop version missing */}
          <source src="/videos/tidal-hero-mobile.mp4" type="video/mp4" />
        </video>
      </>
    );
  }
);

export default HeroScrollVideo;
