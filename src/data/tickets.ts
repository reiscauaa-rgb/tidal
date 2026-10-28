// Ticket configuration — edit prices, names, and quantities here
export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number | null; // in BRL cents (e.g. 8000 = R$80,00). null = a definir
  fee: number; // service fee in BRL cents
  available: boolean;
  quantity: number; // remaining tickets
  badge?: string;
}

// After Tidal: apenas 2 tipos de ingresso, sem virada de lote.
export const tickets: TicketTier[] = [
  {
    id: "comum",
    name: "Comum",
    description: "Acesso ao After Tidal + Open Cooler (traga seu cooler)",
    price: null, // TODO: definir valor
    fee: 0,
    available: true,
    quantity: 0,
    badge: "Pulseira preta",
  },
  {
    id: "vip",
    name: "VIP",
    description: "Acesso ao After Tidal + Open Cooler + benefícios VIP (a definir)",
    price: null, // TODO: definir valor e benefícios
    fee: 0,
    available: true,
    quantity: 0,
    badge: "Pulseira branca",
  },
];

export const scarcityMessages = [
  "Ingressos limitados",
  "Sem virada de lote",
  "Evento exclusivo para maiores de 18 anos",
];
