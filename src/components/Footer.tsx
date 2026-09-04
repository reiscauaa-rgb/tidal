import { social } from "@/data/social";
import { event } from "@/data/event";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.25 8.25 0 0 0 4.82 1.55V6.79a4.85 4.85 0 0 1-1.05-.1z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{ background: "#EAD8C0", borderTop: "1px solid rgba(6,62,82,0.1)" }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand column */}
          <div>
            <img
              src="/images/logo.svg"
              alt="TIDAL FEST"
              className="h-10 md:h-12 w-auto opacity-90"
              loading="lazy"
            />

            <p
              className="text-ocean-dark/70 text-sm leading-relaxed mt-4 max-w-xs font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Uma experiência de festival na beira-mar. {event.date} · {event.venue} · {event.city}.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-ocean-dark/60 hover:text-turquoise border border-ocean-dark/10 hover:border-turquoise transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
                aria-label="TIDAL FEST no Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-ocean-dark/60 hover:text-turquoise border border-ocean-dark/10 hover:border-turquoise transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded"
                aria-label="TIDAL FEST no TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Links column */}
          <div>
            <h3
              className="text-ocean-dark/60 text-xs tracking-[0.3em] uppercase mb-5 font-bold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              NAVEGAÇÃO
            </h3>
            <nav aria-label="Links do rodapé" className="flex flex-col gap-3">
              {[
                { label: "A Experiência", href: "#experiencia" },
                { label: "Line-up", href: "#lineup" },
                { label: "Local", href: "#local" },
                { label: "Ingressos", href: "#ingressos" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-ocean-dark/70 hover:text-turquoise font-medium text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded w-fit"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal column */}
          <div>
            <h3
              className="text-ocean-dark/60 text-xs tracking-[0.3em] uppercase mb-5 font-bold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              INFORMAÇÕES
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={social.contact}
                className="text-ocean-dark/70 hover:text-turquoise font-medium text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded w-fit"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Contato
              </a>
              <a
                href={social.privacyPolicy}
                className="text-ocean-dark/70 hover:text-turquoise font-medium text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded w-fit"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Política de Privacidade
              </a>
              <a
                href={social.termsOfUse}
                className="text-ocean-dark/70 hover:text-turquoise font-medium text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-dark rounded w-fit"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Termos de Uso
              </a>
            </div>

            <div
              className="mt-8 flex items-start gap-2 p-4 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(6,62,82,0.1)",
              }}
              role="note"
              aria-label="Aviso de compra segura"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-turquoise mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <p
                className="text-ocean-dark/60 text-xs leading-relaxed font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Compra 100% segura. Seus dados são protegidos com criptografia.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t"
          style={{ borderColor: "rgba(6,62,82,0.1)" }}
        >
          <p
            className="text-ocean-dark/50 text-xs text-center font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © {year} {event.name}. Realização: {event.organizer}.
          </p>

          <p
            className="text-ocean-dark/40 text-xs text-center font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Produção e organização:{" "}
            <span className="text-ocean-dark/70">{event.organizer}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
