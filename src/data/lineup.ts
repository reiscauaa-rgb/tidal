// Line-up configuration — centralize artist names here
export interface Artist {
  id: string;
  slot: string;
  name: string; // "Em breve" until confirmed
  genre?: string;
  time?: string;
  isHeadliner?: boolean;
}

export const lineup: Artist[] = [
  {
    id: "headliner",
    slot: "HEADLINER",
    name: "Em breve",
    isHeadliner: true,
  },
  {
    id: "dj-02",
    slot: "DJ 02",
    name: "Em breve",
    genre: "Techno / House",
  },
  {
    id: "dj-03",
    slot: "DJ 03",
    name: "Em breve",
    genre: "Technofunk",
  },
  {
    id: "sunrise",
    slot: "SPECIAL SUNRISE SET",
    name: "Em breve",
    genre: "Sunrise Session",
  },
];
