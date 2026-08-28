"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Line-up", href: "#lineup" },
  { label: "Local", href: "#local" },
  { label: "Ingressos", href: "#ingressos" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 300);
      lastY.current = y;
      if (y > 0) setHeroRevealed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial check in case we reload halfway down the page
    if (window.scrollY > 0) setHeroRevealed(true);

    const onHeroProgress = (e: CustomEvent) => {
      if (e.detail > 0.90) {
        setHeroRevealed(true);
      } else if (e.detail < 0.85 && window.scrollY <= 0) {
        setHeroRevealed(false);
      }
    };
    window.addEventListener("heroProgress", onHeroProgress as EventListener);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("heroProgress", onHeroProgress as EventListener);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          hidden || !heroRevealed ? "-translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        } ${
          scrolled
            ? "bg-sand-light/90 backdrop-blur-md border border-ocean-dark/10 shadow-lg"
            : "bg-black/20 backdrop-blur-md border border-white/10"
        } rounded-full px-6 md:px-8 py-3 flex items-center gap-4 md:gap-8`}
        role="banner"
      >
        {/* Logo Minimized */}
        <Link
          href="#"
          className="flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-full"
          aria-label="TIDAL FEST — início"
        >
          <img
            src="/images/logo.svg"
            alt="TIDAL FEST"
            className="h-6 md:h-7 w-auto drop-shadow-sm"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const next = img.nextElementSibling as HTMLElement;
              if (next) next.style.display = "flex";
            }}
          />
          <span
            style={{ display: "none", fontFamily: "Bebas Neue, sans-serif" }}
            className={`text-xl items-center drop-shadow-sm ${scrolled ? "text-ocean-dark" : "text-white"}`}
          >
            TIDAL<span className="text-turquoise ml-1">FEST</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 text-xs tracking-wider uppercase font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded-sm ${
                scrolled ? "text-ocean-dark hover:text-turquoise" : "text-white/90 hover:text-white drop-shadow-md"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu de navegação"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-[2px] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px] bg-ocean-dark" : scrolled ? "bg-ocean-dark" : "bg-white"
            }`}
          />
          <span
            className={`block w-5 h-[2px] transition-all duration-300 ${
              menuOpen ? "opacity-0 bg-ocean-dark" : scrolled ? "bg-ocean-dark" : "bg-white"
            }`}
          />
          <span
            className={`block w-5 h-[2px] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px] bg-ocean-dark" : scrolled ? "bg-ocean-dark" : "bg-white"
            }`}
          />
        </button>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
