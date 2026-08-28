# Animação da Hero Section (GSAP Pin + Framer Motion 3D Scroll)

Para aplicar essa mesma animação no seu outro site, você precisa de duas partes principais:
1. O efeito de fixar (pin) a Hero usando **GSAP ScrollTrigger**, fazendo com que a próxima seção role *por cima* dela.
2. O componente de rolagem 3D (`ContainerScroll`) que usa **Framer Motion** para o efeito do cartão inclinando e crescendo conforme o usuário desce.

Siga os passos abaixo e copie os códigos para o seu projeto.

## 1. Efeito GSAP (Fixar a Hero)

No componente da sua seção principal (Hero), adicione a lógica do GSAP ScrollTrigger. O segredo está no `pinSpacing: false`, que permite que a próxima seção sobreponha a atual.

```tsx
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Se for Next.js / SSR, registre os plugins apenas no lado do cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'bottom bottom', // Quando o fundo da hero tocar o fundo da tela
      pin: true,              // Fixa a seção na tela
      pinSpacing: false,      // NÃO cria espaço extra. A próxima seção vai rolar por cima!
      markers: false,
    });
  }, { scope: heroRef });

  return (
    // Certifique-se de que a section não tem z-index maior que a próxima seção
    <section ref={heroRef} style={{ position: 'relative', zIndex: 0 }}>
      {/* O componente de 3D Scroll vai aqui dentro */}
      <ContainerScroll titleComponent={<h1>Meu Título</h1>}>
        <img src="/sua-imagem.jpg" alt="Imagem" />
      </ContainerScroll>
    </section>
  );
}
```

> **Aviso de CSS:** Certifique-se de que a **próxima seção** (a que vai rolar por cima da Hero) tenha um `background-color` sólido (não transparente) e um `z-index` maior que a Hero (ex: `z-index: 10; position: relative;`). Sem isso, as seções vão se misturar visualmente na tela.

---

## 2. Componente `ContainerScroll` (Framer Motion)

Esse componente cria o efeito da imagem do centro inclinando em 3D conforme o usuário rola a página para baixo.

Instale o Framer Motion se ainda não tiver: `npm i motion` ou `npm i framer-motion`.

Crie um arquivo chamado **`ContainerScroll.tsx`** e cole o seguinte código:

```tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'motion/react'; // ou 'framer-motion'
import './ContainerScroll.css'; // Importe o CSS abaixo

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  // Transições mapeadas pelo progresso do Scroll (0 a 1)
  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="containerScroll"
      ref={containerRef}
      style={{
        height: 'clamp(55rem, 80vw, 80rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1rem'
      }}
    >
      <div style={{ width: '100%', position: 'relative', perspective: '1000px' }}>
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
};

export const ScrollHeader = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div
    style={{ translateY: translate }}
    className="scrollHeader"
  >
    {titleComponent}
  </motion.div>
);

export const ScrollCard = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
    }}
    className="scrollCard"
  >
    <div className="scrollCardInner">
      {children}
    </div>
  </motion.div>
);
```

### CSS do ContainerScroll (`ContainerScroll.css`)
Crie o arquivo CSS para dar a estrutura base do componente:

```css
.containerScroll {
  position: relative;
  z-index: 1;
}

.scrollHeader {
  max-width: 64rem;
  margin: 0 auto;
  text-align: center;
}

.scrollCard {
  max-width: 64rem;
  margin: -3rem auto 0;
  height: clamp(22rem, 35vw, 40rem);
  width: 100%;
  border: 4px solid #4a4a4a; /* Borda externa se desejar estilo mockup */
  padding: 8px;
  background: #222;
  border-radius: 30px;
}

.scrollCardInner {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 18px;
  background: #111;
  position: relative;
}

@media (max-width: 768px) {
  .scrollCard {
    height: clamp(18rem, 60vw, 26rem);
    border-radius: 20px;
  }
}
```

## Como funciona?
1. O **GSAP ScrollTrigger** fixa o container pai (`HeroSection`) usando `pinSpacing: false`. 
2. Como a seção pai está fixa, o usuário continua rolando a página, e o evento de scroll é capturado pelo **Framer Motion** dentro do `ContainerScroll`.
3. Conforme a próxima seção começa a subir e sobrepor a Hero, o Framer Motion mapeia esse progresso, inclinando o `rotateX` do card de `20deg` para `0deg` e diminuindo o zoom de volta para o normal.
