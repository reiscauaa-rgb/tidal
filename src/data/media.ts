// Mídia da Tidal Fest (fotos, vídeos e drone) — é só adicionar itens nas listas abaixo.
// Coloque os arquivos em:
//   public/media/photos/   → fotos (.jpg / .webp) — aparecem no carrossel "Como é a Tidal"
//   public/media/videos/   → vídeos do evento (.mp4, vertical 9:16 ou horizontal)
//   public/media/drone/    → vídeo(s) de drone (.mp4)
// Fotos vazias = o carrossel usa as imagens de referência antigas.
// Vídeos e drone vazios = a seção de vídeos fica oculta em produção.

export interface PhotoItem {
  src: string; // ex: "/media/photos/pista-01.jpg"
  alt: string; // descrição curta (acessibilidade/SEO)
}

export interface VideoItem {
  src: string; // ex: "/media/videos/aftermovie.mp4"
  poster?: string; // capa opcional, ex: "/media/videos/aftermovie.jpg"
  title: string;
  orientation?: "vertical" | "horizontal"; // padrão: vertical
}

export const mediaIntro = {
  eyebrow: "Direto da Tidal Fest",
  title: "VEJA COMO FOI",
  text: "Do alto e no meio da pista: a Tidal Fest em movimento.",
};

// Fotos do evento (carrossel "Como é a Tidal"). Ideal: formato retrato (~3:4).
export const photos: PhotoItem[] = [
  { src: "/media/photos/tidal-01.jpg", alt: "Amigas curtindo a noite na Tidal Fest" },
  { src: "/media/photos/tidal-02.jpg", alt: "Público na Tidal Fest" },
  { src: "/media/photos/tidal-03.jpg", alt: "Momentos da Tidal Fest" },
  { src: "/media/photos/tidal-04.jpg", alt: "Galera aproveitando a Tidal Fest" },
  { src: "/media/photos/tidal-05.jpg", alt: "Clima da festa na Tidal Fest" },
  { src: "/media/photos/tidal-06.jpg", alt: "Noite na praia durante a Tidal Fest" },
];

// Vídeo(s) de drone — destaque em tela larga (usa o primeiro da lista)
export const droneVideos: VideoItem[] = [
  // { src: "/media/drone/praia.mp4", poster: "/media/drone/praia.jpg", title: "A Tidal vista de cima", orientation: "horizontal" },
];

// Vídeos do evento (carrossel horizontal)
export const eventVideos: VideoItem[] = [
  { src: "/media/videos/video-01.mp4", poster: "/media/videos/video-01.jpg", title: "A Tidal vista de cima" },
  { src: "/media/videos/video-02.mp4", poster: "/media/videos/video-02.jpg", title: "After Party — 12 DEZ" },
];
