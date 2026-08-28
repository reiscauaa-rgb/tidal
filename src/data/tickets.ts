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
    description: "Acesso geral + Open Gin incluso",
    price: 6000, 
    fee: 0,    // Sem taxa de serviço
    available: true,
    quantity: 50,
    badge: "Lote Atual",
  },
  {
    id: "lote-2",
    name: "2º Lote",
    description: "Acesso geral + Open Gin incluso",
    price: 8000, 
    fee: 0,
    available: false,
    quantity: 0,
  },
  {
    id: "lote-3",
    name: "3º Lote",
    description: "Acesso geral + Open Gin incluso",
    price: 10000, 
    fee: 0,
    available: false,
    quantity: 0,
  },
];

export const scarcityMessages = [
  "Lote sujeito a alteração sem aviso prévio",
  "Ingressos limitados",
  "Garanta sua entrada antes da próxima virada de lote",
];
