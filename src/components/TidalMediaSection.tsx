"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { droneVideos, eventVideos, mediaIntro, type VideoItem } from "@/data/media";

function VideoCard({ item, wide = false }: { item: VideoItem; wide?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const vertical = !wide && item.orientation !== "horizontal";

  const start = () => {
    setPlaying(true);
    // controls só aparecem após o primeiro clique
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl bg-black shadow-[0_15px_45px_rgba(6,62,82,0.25)] ${
        wide ? "w-full aspect-video" : vertical ? "aspect-[9/16] w-[70vw] sm:w-[280px] shrink-0 snap-center" : "aspect-video w-[85vw] sm:w-[480px] shrink-0 snap-center"
      }`}
    >
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        preload={item.poster ? "none" : "metadata"}
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={item.title}
      />
      {!playing && (
        <button
          onClick={start}
          className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent text-white"
          aria-label={`Assistir: ${item.title}`}
        >
          <span className="text-sm font-bold uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
            {item.title}
          </span>
          <span className="w-12 h-12 rounded-full bg-white/90 text-[#063E52] flex items-center justify-center">
            <Play size={20} fill="currentColor" />
          </span>
        </button>
      )}
    </figure>
  );
}

export default function TidalMediaSection() {
  const empty = !droneVideos.length && !eventVideos.length;
  if (empty && process.env.NODE_ENV === "production") return null;

  return (
    <section
      id="videos"
      className="relative w-full py-16 md:py-24"
      style={{ background: "#F4E8D1", zIndex: 10 }}
      aria-labelledby="videos-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-14">
        <header className="text-center flex flex-col items-center gap-3">
          <p className="text-[#13BBC4] font-bold tracking-[0.3em] uppercase text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {mediaIntro.eyebrow}
          </p>
          <h2
            id="videos-title"
            className="text-[#063E52] uppercase leading-none"
            style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(3rem, 9vw, 6rem)" }}
          >
            {mediaIntro.title}
          </h2>
          <p className="text-[#063E52]/75 font-medium max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
            {mediaIntro.text}
          </p>
        </header>

        {empty && (
          <div
            className="border-2 border-dashed border-[#063E52]/30 rounded-2xl p-8 text-center text-[#063E52]/70 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            (Visível só em desenvolvimento) Adicione vídeos e drone em <code>src/data/media.ts</code> e coloque os
            arquivos em <code>public/media/</code>.
          </div>
        )}

        {droneVideos[0] && <VideoCard item={droneVideos[0]} wide />}

        {eventVideos.length > 0 && (
          <div className="-mx-4 sm:mx-0">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-0 pb-4 no-scrollbar sm:justify-center">
              {eventVideos.map((v) => (
                <VideoCard key={v.src} item={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
