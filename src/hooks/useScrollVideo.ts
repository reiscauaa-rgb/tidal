"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseScrollVideoOptions {
  totalScrollHeight?: number; // vh units for the sticky section
  smoothing?: number; // interpolation factor 0-1 (lower = smoother)
}

interface UseScrollVideoReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: React.RefObject<number>;
}

export function useScrollVideo({
  totalScrollHeight = 450,
  smoothing = 0.08,
}: UseScrollVideoOptions = {}): UseScrollVideoReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progress = useRef(0);
  const targetTime = useRef(0);
  const currentTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const isReady = useRef(false);

  const animate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isReady.current) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth interpolation toward target
    const diff = targetTime.current - currentTime.current;
    if (Math.abs(diff) > 0.001) {
      currentTime.current += diff * smoothing;
      const duration = video.duration || 1;
      video.currentTime = Math.max(
        0,
        Math.min(currentTime.current, duration - 0.01)
      );
    }

    rafId.current = requestAnimationFrame(animate);
  }, [smoothing]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Preload for scrubbing
    video.preload = "auto";

    const onMetadata = () => {
      isReady.current = true;
    };

    video.addEventListener("loadedmetadata", onMetadata);
    if (video.readyState >= 1) onMetadata();

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // How far we've scrolled into the sticky section
      const scrolled = -rect.top;
      const maxScroll = containerHeight - windowHeight;

      const p = Math.max(0, Math.min(1, scrolled / maxScroll));
      progress.current = p;

      const duration = video.duration || 1;
      targetTime.current = p * duration;
    };

    // Start RAF loop
    rafId.current = requestAnimationFrame(animate);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      video.removeEventListener("loadedmetadata", onMetadata);
      isReady.current = false;
    };
  }, [animate]);

  return { videoRef, containerRef, progress };
}
