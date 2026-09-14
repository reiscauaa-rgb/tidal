import Image from "next/image";

export default function LineupSection() {
  return (
    <section
      id="lineup"
      className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 flex justify-center items-center overflow-hidden"
      style={{ background: "#F4E8D1", zIndex: 10 }}
      aria-label="Line-up Oficial Tidal Fest"
    >
      <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl flex justify-center items-center">
        <Image
          src="/images/lineup-poster.jpg"
          alt="Line-up Oficial Tidal Fest — Gütz, Kawave, DAC, Dantas, Aryus"
          width={818}
          height={1024}
          quality={85}
          loading="lazy"
          className="w-full h-auto object-contain rounded-2xl shadow-[0_15px_45px_rgba(6,62,82,0.18)]"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 680px"
        />
      </div>
    </section>
  );
}
