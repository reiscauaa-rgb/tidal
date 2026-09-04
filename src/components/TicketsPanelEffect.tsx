"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventInfoSection from "./EventInfoSection";

gsap.registerPlugin(ScrollTrigger);

export default function TicketsPanelEffect() {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    const panelHeight  = inner.offsetHeight;
    const windowHeight = window.innerHeight;
    const difference   = panelHeight - windowHeight;

    const fakeScrollRatio =
      difference > 0 ? difference / (difference + windowHeight) : 0;

    if (fakeScrollRatio) {
      panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "bottom bottom",
        end: () =>
          fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top",
        pinSpacing: false,
        pin: true,
        scrub: true,
      },
    });

    if (fakeScrollRatio) {
      tl.to(inner, {
        yPercent: -100,
        y: window.innerHeight,
        duration: 1 / (1 - fakeScrollRatio) - 1,
        ease: "none",
      });
    }

    tl.fromTo(
      panel,
      { scale: 1, opacity: 1 },
      { scale: 0.7, opacity: 0.5, duration: 0.9 }
    ).to(panel, { opacity: 0, duration: 0.1 });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative overflow-hidden rounded-2xl"
      style={{ transformOrigin: "center top" }}
    >
      <div ref={innerRef}>
        <EventInfoSection />
      </div>
    </div>
  );
}
