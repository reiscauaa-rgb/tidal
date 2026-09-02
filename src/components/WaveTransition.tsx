"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- faithful port of the original Blake Bowen / GSAP wave ---
const numPoints    = 10;
const numPaths     = 2;
const delayPointsMax = 0.3;
const delayPerPath   = 0.25;
const duration       = 0.9;

export default function WaveTransition() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef  = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg  = svgRef.current;
    if (!wrap || !svg) return;

    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement>(".wave-path")
    );

    // isOpened drives which SVG path formula to use (same as original)
    // false = paths fill from curve TO TOP  (content hidden)
    // true  = paths fill from TOP TO curve  (content revealed once open)
    // For scroll-reveal we hold isOpened=false and animate points 100→0
    let isOpened = false;

    // Per-point random delays (same as original)
    const pointsDelay: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      pointsDelay[i] = Math.random() * delayPointsMax;
    }

    // Point arrays — all start at 100 (fully covering section)
    const allPoints: number[][] = [];
    for (let i = 0; i < numPaths; i++) {
      const pts: number[] = [];
      for (let j = 0; j < numPoints; j++) pts.push(100);
      allPoints.push(pts);
    }

    // EXACT render from original
    function render() {
      for (let i = 0; i < numPaths; i++) {
        const path   = paths[i];
        const points = allPoints[i];
        let d = "";
        d += isOpened
          ? `M 0 0 V ${points[0]} C`
          : `M 0 ${points[0]} C`;

        for (let j = 0; j < numPoints - 1; j++) {
          const p  = ((j + 1) / (numPoints - 1)) * 100;
          const cp = p - (1 / (numPoints - 1) * 100) / 2;
          d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
        }

        d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;
        path.setAttribute("d", d);
      }
    }

    // Draw initial state (covered)
    render();

    // Build timeline: points 100→0, same stagger structure as original toggle()
    // isOpened stays false → paths fill "curve to top" formula throughout
    const tl = gsap.timeline({
      onUpdate: render,
      defaults: { ease: "none", duration },  // ease:none for smooth scrub
      paused: true,
    });

    for (let i = 0; i < numPaths; i++) {
      const points    = allPoints[i];
      // In original: isOpened ? i : (numPaths - i - 1)
      // We are "opening" → use i order (path 0 first, path 1 second)
      const pathDelay = delayPerPath * i;

      for (let j = 0; j < numPoints; j++) {
        tl.to(points, { [j]: 0 }, pointsDelay[j] + pathDelay);
      }
    }

    // Scroll scrub drives the timeline forward (down) and backward (up)
    ScrollTrigger.create({
      trigger : wrap,
      start   : "top bottom",   // start when section top enters viewport bottom
      end     : "top 20%",      // fully revealed when section top is near top
      scrub   : 1.5,            // smooth lag — feels like real water weight
      animation: tl,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <defs>
          {/* gradient2 equivalent — sand/turquoise */}
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#1a8fa0" />
            <stop offset="100%" stopColor="#063E52" />
          </linearGradient>
          {/* gradient1 equivalent — deep ocean */}
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#13BBC4" />
            <stop offset="100%" stopColor="#1a8fa0" />
          </linearGradient>
        </defs>
        {/* path 0 uses gradient2 in original, path 1 uses gradient1 */}
        <path className="wave-path" fill="url(#waveGrad1)" />
        <path className="wave-path" fill="url(#waveGrad2)" />
      </svg>
    </div>
  );
}
