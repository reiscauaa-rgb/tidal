# TIDAL FEST — Site Oficial

Site imersivo e cinematográfico para a TIDAL FEST. Desenvolvido com Next.js 15, TypeScript, Tailwind CSS e animações controladas por scroll.

## 🚀 Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Como substituir os arquivos de mídia

### Vídeos

| Arquivo | Localização | Especificação |
|---------|------------|---------------|
| Hero Mobile | `/public/videos/tidal-hero-mobile.mp4` | 1080×1920, 9:16, H.264 faststart |
| Hero Desktop | `/public/videos/tidal-hero-desktop.mp4` | 1920×1080, 16:9, H.264 faststart |

> **Dica de performance:** Codifique os vídeos com `ffmpeg -i input.mp4 -vcodec libx264 -movflags +faststart -keyint_min 30 -g 30 output.mp4` para scrub suave pelo scroll.

### Imagens

| Arquivo | Localização | Uso |
|---------|------------|-----|
| Logo oficial | `/public/images/tidal-logo.svg` | Cabeçalho e rodapé |
| Personagem | `/public/images/tidal-character.webp` | Seção do personagem |
| Poster mobile | `/public/images/tidal-hero-poster-mobile.webp` | Fallback do vídeo mobile |
| Poster desktop | `/public/images/tidal-hero-poster-desktop.webp` | Fallback do vídeo desktop |
| Arte 01 | `/public/images/tidal-art-01.webp` | Galeria |
| Arte 02 | `/public/images/tidal-art-02.webp` | Galeria |
| Arte 03 | `/public/images/tidal-art-03.webp` | Galeria |

## ✏️ Como editar textos e dados

### Informações do evento
Edite `/src/data/event.ts` para atualizar data, local, descrição e links.

### Ingressos e preços
Edite `/src/data/tickets.ts` para configurar lotes, preços e taxas.
> Os preços estão em **centavos** (ex: `8000` = R$ 80,00).

### Line-up
Edite `/src/data/lineup.ts` para adicionar nomes de artistas quando confirmados.

### FAQ
Edite `/src/data/faq.ts` para adicionar as respostas oficiais.

### Links sociais e legais
Edite `/src/data/social.ts` para atualizar Instagram, TikTok, política de privacidade etc.

## 🎨 Paleta de cores

| Nome | Hex | Uso |
|------|-----|-----|
| Deep BG | `#03090D` | Fundo profundo |
| Ocean Blue | `#063E52` | Azul oceano |
| Turquoise | `#13BBC4` | Destaques primários |
| Bright Blue | `#2DD4E0` | CTAs e acentos |
| Coral | `#FF8066` | Alertas e energia |
| Sunrise Gold | `#FFB36B` | Dourado do amanhecer |
| Sand | `#F1DFC2` | Areia clara |
| Chrome Silver | `#DCE8ED` | Texto principal |

## 🏗️ Estrutura dos componentes

```
src/
├── app/
│   ├── layout.tsx       # Metadata, SEO, fontes
│   ├── page.tsx         # Composição de todas as seções
│   └── globals.css      # Variáveis CSS, utilitários globais
├── components/
│   ├── Header.tsx           # Navegação fixa
│   ├── MobileMenu.tsx       # Menu fullscreen mobile
│   ├── HeroSection.tsx      # Orquestrador da hero
│   ├── HeroScrollVideo.tsx  # Vídeo controlado pelo scroll
│   ├── ScrollOverlayContent.tsx # Textos animados sobre o vídeo
│   ├── ManifestSection.tsx  # "A Maré Virou"
│   ├── ExperienceSection.tsx # Três pilares
│   ├── CharacterSection.tsx  # Personagem cromado
│   ├── LineupSection.tsx     # Line-up
│   ├── EventInfoSection.tsx  # Data e local
│   ├── TicketsSection.tsx    # Ingressos + checkout modal
│   ├── GallerySection.tsx    # Galeria de artes
│   ├── FAQSection.tsx        # FAQ accordion
│   ├── FinalCTA.tsx          # CTA final
│   ├── Footer.tsx            # Rodapé
│   └── MobileTicketFAB.tsx   # Botão flutuante mobile
├── data/
│   ├── event.ts      # ← Edite aqui para dados do evento
│   ├── tickets.ts    # ← Edite aqui para preços e lotes
│   ├── lineup.ts     # ← Edite aqui para artistas
│   ├── faq.ts        # ← Edite aqui para respostas do FAQ
│   └── social.ts     # ← Edite aqui para links sociais
└── hooks/
    └── useScrollVideo.ts # Hook reutilizável (disponível para expansão)
```

## 🔧 Build para produção

```bash
npm run build
npm run start
```

## ♿ Acessibilidade

- Navegação por teclado em todos os elementos interativos
- `prefers-reduced-motion` respeita usuários com sensibilidade a movimento
- Accordion do FAQ com aria-expanded e role corretos
- Alt texts em todas as imagens
- Contraste adequado nos textos principais

## 📱 Breakpoints testados

- 360px, 375px, 390px, 430px (smartphones)
- 768px (tablet)
- 1024px, 1440px (desktop)

---

**Produção e organização:** Caiçara Eventos  
**Desenvolvimento:** Plataforma de eventos personalizados
