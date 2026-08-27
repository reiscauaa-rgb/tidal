// Ticket configuration — edit prices, names, and quantities here
export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number; // in BRL cents (e.g. 8000 = R$80,00)
  fee: number; // service fee in BRL cents
  available: boolean;
  quantity: number; // remaining tickets
  badge?: string;
}

export const tickets: TicketTier[] = [
  {
    id: "lote-1",
    name: "1º Lote",
    description: "Acesso geral à festa",
    price: 8000, // R$ 80,00 — PLACEHOLDER, atualize antes do lançamento
    fee: 600,    // R$ 6,00 de taxa
    available: true,
    quantity: 50,
    badge: "Últimas unidades",
  },
  {
    id: "lote-2",
    name: "2º Lote",
    description: "Acesso geral à festa",
    price: 10000, // R$ 100,00 — PLACEHOLDER
    fee: 800,
    available: false,
    quantity: 0,
  },
  {
    id: "open-gin",
    name: "Open Gin",
    description: "Acesso + Open Gin durante o evento",
    price: 14000, // R$ 140,00 — PLACEHOLDER
    fee: 1000,
    available: true,
    quantity: 30,
    badge: "Inclui consumação",
  },
];

export const scarcityMessages = [
  "Lote sujeito a alteração sem aviso prévio",
  "Ingressos limitados",
  "Garanta sua entrada antes da próxima virada de lote",
];
