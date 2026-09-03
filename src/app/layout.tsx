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
  title: `${event.name} — ${event.date} | ${event.city}`,
  description: event.description,
  metadataBase: new URL(event.siteUrl),
  openGraph: {
    title: `${event.name} — ${event.date} | ${event.city}`,
    description: event.description,
    url: event.siteUrl,
    siteName: event.name,
    images: [
      {
        url: event.ogImage,
        width: 1200,
        height: 630,
        alt: `${event.name} — ${event.date} na ${event.venue}, ${event.city}`,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${event.name} — ${event.date} | ${event.city}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ALTERE AQUI: Mude para 'false' quando quiser exibir o site normalmente.
  const MAINTENANCE_MODE = true;

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
      </head>
      <body className="antialiased bg-deep-bg text-chrome-silver overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
