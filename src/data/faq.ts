// FAQ data — official answers
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    id: "age",
    question: "Qual é a classificação etária?",
    answer:
      "O Tidal Fest é um evento com formato Open Gin. Por isso, a classificação etária é estritamente para maiores de 18 anos. É obrigatória a apresentação de documento de identidade original com foto na entrada.",
  },
  {
    id: "rain",
    question: "O evento acontece em caso de chuva?",
    answer:
      "Sim! O festival acontecerá independentemente das condições climáticas. Nossa estrutura é pensada para garantir o conforto de todos, faça chuva ou faça sol.",
  },
  {
    id: "reentry",
    question: "Posso sair e entrar novamente?",
    answer:
      "Não. Por questões de segurança, após a validação do seu ingresso e saída do local do evento, não será permitido retornar. A reentrada exigirá a compra de um novo ingresso (sujeito à disponibilidade).",
  },
  {
    id: "items",
    question: "O que posso levar?",
    answer:
      "É permitido: documentos, celular, carregador portátil, óculos de sol, protetor solar e capa de chuva. É estritamente proibido: garrafas, bebidas, alimentos, objetos cortantes ou pontiagudos, guarda-chuvas, drogas ilícitas e itens que representem risco à segurança.",
  },
  {
    id: "parking",
    question: "Haverá estacionamento?",
    answer:
      "Não. O evento não possui estacionamento. Recomendamos fortemente o uso de aplicativos de transporte para que você possa curtir o evento (e o nosso Open Gin) com total tranquilidade e responsabilidade.",
  },
  {
    id: "accessibility",
    question: "O local possui acessibilidade?",
    answer:
      "Sim, nossa estrutura é preparada para receber Pessoas com Deficiência (PcD). Contamos com banheiros adaptados, acessos e uma equipe treinada para auxiliar no que for necessário.",
  },
  {
    id: "ticket",
    question: "Como apresento meu ingresso?",
    answer:
      "Basta apresentar o QR Code do seu ingresso diretamente na tela do seu celular através do aplicativo ou site do Sympla. Não esqueça de levar também seu documento oficial com foto.",
  },
];
