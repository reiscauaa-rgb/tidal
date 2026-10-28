// FAQ data — official answers
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    id: "opencooler",
    question: "Como funciona o Open Cooler?",
    answer:
      "Cada pessoa pode trazer o seu próprio cooler com as suas bebidas. Dentro do evento teremos um bar de reposição com gelo, energético e outras opções para você repor o seu cooler durante a noite.",
  },
  {
    id: "age",
    question: "Qual é a classificação etária?",
    answer:
      "O After Tidal é exclusivo para maiores de 18 anos. É obrigatória a apresentação de documento de identidade original com foto na entrada.",
  },
  {
    id: "tickets",
    question: "Qual a diferença entre o ingresso Comum e o VIP?",
    answer:
      "Os ingressos são identificados por pulseiras: preta (Comum) e branca (VIP). Os ingressos são limitados e não haverá virada de lote. Os detalhes dos benefícios de cada tipo serão divulgados em breve.",
  },
  {
    id: "rain",
    question: "O evento acontece em caso de chuva?",
    answer:
      "Sim! O evento acontecerá independentemente das condições climáticas.",
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
      "Você pode levar o seu cooler com as suas bebidas, além de documentos, celular, carregador portátil, óculos de sol e protetor solar. As regras detalhadas do cooler (como tamanho e itens permitidos) serão divulgadas em breve. É estritamente proibido: objetos cortantes ou pontiagudos, drogas ilícitas e itens que representem risco à segurança.",
  },
  {
    id: "parking",
    question: "Haverá estacionamento?",
    answer:
      "Informações sobre estacionamento serão divulgadas em breve. Recomendamos fortemente o uso de aplicativos de transporte para que você possa curtir o evento com total tranquilidade e responsabilidade.",
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
