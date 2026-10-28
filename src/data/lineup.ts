// Line-up configuration — centralize artist names here
export interface Artist {
  id: string;
  slot: string;
  name: string; // "Em breve" until confirmed
  genre?: string;
  startTime?: string;
  endTime?: string;
  isHeadliner?: boolean;
}

// After Tidal: DJs ainda não definidos.
export const lineup: Artist[] = [];
