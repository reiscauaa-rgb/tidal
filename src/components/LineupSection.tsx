export default function LineupSection() {
  return (
    <section
      id="lineup"
      className="relative w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 flex justify-center items-center overflow-hidden"
      style={{ background: "#F4E8D1", zIndex: 10 }}
      aria-label="Line-up After Tidal"
    >
      <div className="text-center flex flex-col items-center gap-4">
        <p
          className="text-[#13BBC4] font-bold tracking-[0.3em] uppercase text-xs"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Música eletrônica
        </p>
        <h2
          className="text-[#063E52] uppercase leading-none"
          style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(3rem, 9vw, 6rem)" }}
        >
          Line-up em breve
        </h2>
        <p className="text-[#063E52]/70 font-medium max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
          Estamos fechando os DJs do After Tidal. Fique de olho no nosso Instagram.
        </p>
      </div>
    </section>
  );
}
