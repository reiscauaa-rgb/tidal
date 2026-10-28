import Image from "next/image";
import { Snowflake, Package, Zap, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Package,
    title: "Traga seu cooler",
    text: "Leve suas próprias bebidas no seu cooler.",
  },
  {
    icon: Snowflake,
    title: "Bar de reposição",
    text: "Gelo e outras opções para repor o seu cooler.",
  },
  {
    icon: Zap,
    title: "Energético",
    text: "Energéticos e bebidas disponíveis no bar.",
  },
  {
    icon: ShieldCheck,
    title: "18+",
    text: "Evento exclusivo para maiores de 18 anos.",
  },
];

export default function OpenCoolerSection() {
  return (
    <section
      id="open-cooler"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6"
      style={{ background: "#F4E8D1", zIndex: 10 }}
      aria-labelledby="open-cooler-title"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="flex justify-center">
          <Image
            src="/images/after-open-cooler.jpg"
            alt="Sobre o Open Cooler — personagem cromado com cooler de bebidas na praia"
            width={896}
            height={1200}
            quality={80}
            loading="lazy"
            className="w-full max-w-md h-auto rounded-2xl shadow-[0_15px_45px_rgba(6,62,82,0.18)]"
            sizes="(max-width: 768px) 92vw, 480px"
          />
        </div>

        <div className="flex flex-col gap-6">
          <p
            className="text-[#13BBC4] font-bold tracking-[0.3em] uppercase text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Sobre o Open
          </p>
          <h2
            id="open-cooler-title"
            className="text-[#063E52] uppercase leading-none"
            style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
          >
            Open Cooler
          </h2>
          <p
            className="text-[#063E52]/80 text-base md:text-lg font-medium leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Dessa vez não tem open gin. Cada pessoa leva o seu cooler com as suas bebidas, e a gente
            cuida da reposição: gelo, energético e outras opções no bar.
          </p>

          <ul className="grid sm:grid-cols-2 gap-4">
            {items.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex items-start gap-3 p-4 rounded-md border border-[#063E52]/10"
                style={{ background: "rgba(255,255,255,0.65)" }}
              >
                <Icon size={20} className="text-[#13BBC4] shrink-0 mt-0.5" />
                <div>
                  <p
                    className="text-[#063E52] font-bold text-sm uppercase tracking-widest"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {title}
                  </p>
                  <p className="text-[#063E52]/70 text-xs mt-1 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
