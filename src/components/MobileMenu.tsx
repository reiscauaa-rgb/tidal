"use client";

import { useEffect, useRef } from "react";
import { X, Instagram } from "lucide-react";
import { social } from "@/data/social";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Trap focus could be added here for a11y, but for brevity we rely on standard DOM order
  // and the visibility toggle.

  return (
    <div
      ref={overlayRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className={`fixed inset-0 z-[60] flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: "rgba(234, 216, 192, 0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-ocean-dark hover:text-turquoise transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
        style={{ top: "calc(1.5rem + env(safe-area-inset-top))" }}
        aria-label="Fechar menu"
      >
        <X size={28} aria-hidden="true" />
      </button>

      <nav className="flex flex-col items-center gap-8 px-6" aria-label="Navegação móvel">
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            ref={(el) => {
              linksRef.current[i] = el;
            }}
            onClick={onClose}
            className="text-4xl uppercase text-ocean-dark hover:text-turquoise focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded p-1"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.05em",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05 + 0.1}s`,
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div
        className="absolute bottom-12 left-0 right-0 flex justify-center gap-6"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          opacity: isOpen ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}
      >
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-ocean-dark hover:text-turquoise transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-full border border-ocean-dark/20"
          aria-label="TIDAL FEST no Instagram"
        >
          <Instagram size={24} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
