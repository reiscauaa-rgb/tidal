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
  isPlaying: () => boolean;
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
    const isLoadedRef = useRef(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Helper — keeps state and ref in sync so closures always read the latest value
    const markLoaded = useCallback(() => {
      isLoadedRef.current = true;
      setIsLoaded(true);
    }, []);

    // Expose play controls to parent
    useImperativeHandle(
      ref,
      () => ({
        playForward() {
          if (directionRef.current !== 1) {
             directionRef.current = 1;
             lastTimeRef.current = performance.now();
             markLoaded();
          }
        },
        playBackward() {
          if (directionRef.current !== -1) {
             directionRef.current = -1;
             lastTimeRef.current = performance.now();
             markLoaded();
          }
        },
        isPlaying() {
          // Only report "playing" when the video is actually ready to advance frames.
          // Prevents touch/wheel events from being consumed on devices where the
          // video fails to load (older iOS, slow connections, blocked autoplay).
          return directionRef.current !== 0 && isReadyRef.current;
        }
      }),
      [markLoaded]
    );

    useEffect(() => {
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }, []);

    useEffect(() => {
      if (reducedMotion) return;

      const video = videoRef.current;
      if (!video) return;

      // Assign src dynamically — <source media=""> is only supported in Chromium 120+.
      // On older Android browsers and Chromium < 120, it's ignored and the first <source>
      // wins regardless of viewport size. JS-based selection is universally compatible.
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const targetSrc = isDesktop
        ? "/videos/tidal-hero-desktop.mp4"
        : "/videos/tidal-hero-mobile.mp4";

      // Only reassign if different (prevents redundant network requests)
      if (!video.src || !video.src.endsWith(targetSrc)) {
        video.src = targetSrc;
      }

      // Required for iOS autoplay: set defaultMuted on the element so WebKit
      // recognises the muted attribute during initial load (not just after hydration)
      video.defaultMuted = true;

      video.preload = "auto";

      // Centralised helper — marks the video element as ready for programmatic seeking
      const markVideoReady = () => {
        if (!isReadyRef.current) {
          isReadyRef.current = true;
          if (video && video.currentTime === 0) {
            video.currentTime = 0.001; // Force render first frame
          }
        }
      };

      const onMeta = () => markVideoReady();
      const onCanPlay = () => markVideoReady();

      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("canplay", onCanPlay);
      if (video.readyState >= 1) markVideoReady();

      // --- Auto Unlock attempt ---
      // Try playing the video immediately to force it to show the first frame
      if (video && video.paused) {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            video.pause();
            markVideoReady();
            markLoaded();
          }).catch(() => {
            // Autoplay blocked — rely on user-interaction unlock below
          });
        }
      }

      // --- iOS Safari Unlock ---
      // On iOS, the browser requires a user-gesture before video.play() succeeds.
      // We keep retrying on every interaction until the play/pause cycle works.
      // BUGFIX: Previously, removeEventListener was called *outside* .then(),
      // so if play() was rejected the listeners were removed and never retried.
      const unlockVideo = () => {
        // Already unlocked — just clean up
        if (isLoadedRef.current && isReadyRef.current) {
          window.removeEventListener("touchstart", unlockVideo);
          window.removeEventListener("wheel", unlockVideo);
          window.removeEventListener("click", unlockVideo);
          return;
        }

        if (video && video.paused) {
          const p = video.play();
          if (p !== undefined) {
            p.then(() => {
              video.pause();
              markVideoReady();
              markLoaded();
              // Remove listeners only AFTER success — keeps retrying on failure
              window.removeEventListener("touchstart", unlockVideo);
              window.removeEventListener("wheel", unlockVideo);
              window.removeEventListener("click", unlockVideo);
            }).catch(() => {
              // play() failed — keep listeners so the next interaction retries
            });
          }
        }
      };

      window.addEventListener("touchstart", unlockVideo, { passive: true });
      window.addEventListener("wheel", unlockVideo, { passive: true });
      window.addEventListener("click", unlockVideo, { passive: true });

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

            // Only seek if the decoder is ready — assigning currentTime while
            // video.seeking === true enqueues decode operations that cause
            // stutter and freeze on hardware decoders (iOS Safari, Android).
            if (!v.seeking) {
              v.currentTime = clamped;
            }

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
        window.removeEventListener("touchstart", unlockVideo);
        window.removeEventListener("wheel", unlockVideo);
        window.removeEventListener("click", unlockVideo);
      };
    }, [reducedMotion, onProgressChange, onVideoEnd, onVideoRewound, markLoaded]);

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

        {/* Full-screen video — src is assigned dynamically in useEffect */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          poster="/images/tidal-hero-poster-mobile.webp"
        />
      </>
    );
  }
);

export default HeroScrollVideo;
