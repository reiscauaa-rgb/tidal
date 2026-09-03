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

export const lineup: Artist[] = [
  {
    id: "gutz",
    slot: "DJ 01",
    name: "GUTZ",
    startTime: "22:20",
    endTime: "00:00",
  },
  {
    id: "kawave",
    slot: "DJ 02",
    name: "KAWAVE",
    startTime: "00:00",
    endTime: "01:45",
  },
  {
    id: "dad",
    slot: "DJ 03",
    name: "DAD",
    startTime: "01:45",
    endTime: "03:30",
  },
  {
    id: "dantas",
    slot: "DJ 04",
    name: "DANTAS",
    startTime: "03:30",
    endTime: "05:15",
  },
  {
    id: "aryus",
    slot: "DJ 05",
    name: "ARYUS",
    startTime: "05:15",
    endTime: "07:00",
  },
];
