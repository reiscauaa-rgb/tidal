// FAQ data — update answers with official content before launch
export interface FAQItem {
  id: string;
  question: string;
  answer: string; // marked as placeholder
}

export const faq: FAQItem[] = [
  {
    id: "age",
    question: "Qual é a classificação etária?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — A classificação etária oficial será divulgada em breve. Acompanhe nossas redes sociais para mais informações.",
  },
  {
    id: "rain",
    question: "O evento acontece em caso de chuva?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — Nossa política em caso de chuva será comunicada nos canais oficiais próximo ao evento. Recomendamos acompanhar as atualizações.",
  },
  {
    id: "reentry",
    question: "Posso sair e entrar novamente?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — A política de reentrada será definida e divulgada antes do evento.",
  },
  {
    id: "items",
    question: "O que posso levar?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — A lista de itens permitidos e proibidos será publicada em breve nos nossos canais oficiais.",
  },
  {
    id: "parking",
    question: "Haverá estacionamento?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — Informações sobre estacionamento e transporte serão divulgadas em breve.",
  },
  {
    id: "accessibility",
    question: "O local possui acessibilidade?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — Informações completas sobre acessibilidade serão disponibilizadas antes do evento.",
  },
  {
    id: "ticket",
    question: "Como apresento meu ingresso?",
    answer:
      "⚠️ CONTEÚDO PROVISÓRIO — As instruções para apresentação do ingresso serão enviadas por e-mail após a compra.",
  },
];
