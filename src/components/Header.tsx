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

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 300);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-sand-light/80 backdrop-blur-md border-b border-ocean-dark/10 shadow-sm"
            : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="#"
              className="flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
              aria-label="TIDAL FEST — início"
            >
              <img
                src="/images/tidal-logo.svg"
                alt="TIDAL FEST"
                className="h-9 md:h-11 w-auto drop-shadow-sm"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const next = img.nextElementSibling as HTMLElement;
                  if (next) next.style.display = "flex";
                }}
              />
              <span
                style={{ display: "none", fontFamily: "Bebas Neue, sans-serif" }}
                className="text-2xl text-ocean-dark items-center drop-shadow-sm"
              >
                TIDAL<span className="text-turquoise ml-1">FEST</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Navegação principal"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-200 text-sm tracking-wider uppercase font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded ${
                    scrolled ? "text-ocean-dark hover:text-turquoise" : "text-white hover:text-sand-light drop-shadow-md"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href="#ingressos"
              className="hidden lg:inline-flex items-center px-6 py-2.5 text-xs tracking-[0.25em] uppercase text-sand-light font-bold transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
              style={{
                background: "linear-gradient(135deg, #063E52, #4A2B29)",
                minHeight: "44px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Comprar Ingresso
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px] bg-ocean-dark" : scrolled ? "bg-ocean-dark" : "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  menuOpen ? "opacity-0 bg-ocean-dark" : scrolled ? "bg-ocean-dark" : "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px] bg-ocean-dark" : scrolled ? "bg-ocean-dark" : "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}
              />
            </button>
          </div>
        </div>
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
