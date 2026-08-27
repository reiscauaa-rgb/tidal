import type { Metadata } from "next";
import "./globals.css";
import { event } from "@/data/event";

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
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-deep-bg text-chrome-silver overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
