import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { event } from "@/data/event";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Tidal Fest",
  description: event.description,
  metadataBase: new URL(event.siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-icon.png?v=2",
  },
  openGraph: {
    title: "Tidal Fest",
    description: event.description,
    url: event.siteUrl,
    siteName: "Tidal Fest",
    images: [
      {
        url: event.ogImage,
        width: 1200,
        height: 630,
        alt: "Tidal Fest",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tidal Fest",
    description: event.description,
    images: [event.ogImage],
  },
  other: {
    // Schema.org Event structured data
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.name,
      startDate: "2025-10-10T22:30:00-03:00", // PLACEHOLDER — update with actual year
      location: {
        "@type": "Place",
        name: event.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Peruíbe",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      description: event.description,
      organizer: {
        "@type": "Organization",
        name: event.organizer,
      },
    }),
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ALTERE AQUI: Mude para 'false' quando quiser exibir o site normalmente.
  const MAINTENANCE_MODE = false;

  if (MAINTENANCE_MODE) {
    return (
      <html lang="pt-BR" className={`${bebasNeue.variable} ${inter.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </head>
        <body className="bg-black text-white h-screen w-screen overflow-hidden flex items-center justify-center antialiased">
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-center px-4">
            Site em desenvolvimento
          </h1>
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
      </head>
      <body className="antialiased bg-deep-bg text-chrome-silver overflow-x-hidden">
        {/* GA4 */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-L6YXDCRXX5" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L6YXDCRXX5');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1094473593536775');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1094473593536775&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
