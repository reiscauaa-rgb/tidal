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
  playForward: () => void;
  playBackward: () => void;
}

interface HeroScrollVideoProps {
  onVideoEnd: () => void;
  onVideoRewound: () => void;
  onProgressChange: (progress: number) => void;
}

const HeroScrollVideo = forwardRef<HeroVideoHandle, HeroScrollVideoProps>(
  function HeroScrollVideo({ onVideoEnd, onVideoRewound, onProgressChange }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const directionRef = useRef<1 | -1 | 0>(0);
    const lastTimeRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const isReadyRef = useRef(false);
    const endFiredRef = useRef(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Expose play controls to parent
    useImperativeHandle(
      ref,
      () => ({
        playForward() {
          if (directionRef.current !== 1) {
             directionRef.current = 1;
             lastTimeRef.current = performance.now();
          }
        },
        playBackward() {
          if (directionRef.current !== -1) {
             directionRef.current = -1;
             lastTimeRef.current = performance.now();
          }
        }
      }),
      []
    );

    useEffect(() => {
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }, []);

    // RAF auto-play interpolation loop
    useEffect(() => {
      if (reducedMotion) return;

      const video = videoRef.current;
      if (!video) return;

      video.preload = "auto";

      const onMeta = () => {
        isReadyRef.current = true;
        if (video && video.currentTime === 0) {
          video.currentTime = 0.001; // Force render first frame
        }
      };
      const onCanPlay = () => setIsLoaded(true);

      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("canplay", onCanPlay);
      if (video.readyState >= 1) onMeta();
      if (video.readyState >= 3) setIsLoaded(true);

      // --- Auto Unlock attempt ---
      // Try playing the video immediately to force it to show the first frame
      if (video && video.paused) {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            video.pause();
            isReadyRef.current = true;
            setIsLoaded(true);
          }).catch(() => {
            // If autoplay fails, we still rely on interaction unlock
          });
        }
      }

      // --- iOS Safari Unlock ---
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
      const PLAYBACK_SPEED = 1.5;

      const tick = (now: number) => {
        const v = videoRef.current;
        if (v && isReadyRef.current && v.duration > 0) {
          
          // --- BUGFIX: Se o navegador tentar tocar o vídeo sozinho (rogue playback), nós forçamos o pause
          if (directionRef.current === 0 && !v.paused) {
            v.pause();
          }

          if (lastTimeRef.current === 0) lastTimeRef.current = now;
          const dt = (now - lastTimeRef.current) / 1000;
          lastTimeRef.current = now;

          if (directionRef.current !== 0) {
            const newTime = v.currentTime + (directionRef.current * dt * PLAYBACK_SPEED);
            const clamped = Math.max(0, Math.min(newTime, v.duration - 0.01));
            v.currentTime = clamped;

            const progress = clamped / v.duration;
            onProgressChange(progress);

            // Forward end logic
            if (directionRef.current === 1 && progress >= 0.98) {
               if (!endFiredRef.current) {
                 endFiredRef.current = true;
                 directionRef.current = 0; // stop playing
                 onVideoEnd();
               }
            } else if (progress < 0.95) {
               endFiredRef.current = false;
            }

            // Backward end logic (fully rewound)
            if (directionRef.current === -1 && progress <= 0) {
               directionRef.current = 0; // stop playing
               onVideoRewound();
            }
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
    }, [reducedMotion, onProgressChange, onVideoEnd, onVideoRewound]);

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
