import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const viewport: Viewport = {
  themeColor: "#05060A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://weblytic.cc"),
  title: {
    default: "Weblytic — Custom Software, Offline POS & Web Dev Pakistan",
    template: "%s | Weblytic",
  },
  description: "Weblytic builds custom offline POS software with zero monthly fees, high-speed Next.js websites, local cPanel servers, and WhatsApp AI bots in Pakistan.",
  keywords: [
    "offline POS software Pakistan",
    "retail POS system one time fee",
    "offline pharmacy software",
    "WhatsApp AI chatbot Pakistan",
    "WhatsApp business bot integration",
    "local cPanel server setup",
    "on-premise intranet server",
    "Next.js web development Pakistan",
    "website design Sukkur Khairpur Sindh",
    "cPanel domain hosting Pakistan",
    "Pdfnestor.com",
    "Weblytic software house"
  ],
  alternates: {
    canonical: "https://weblytic.cc",
  },
  openGraph: {
    title: "Weblytic — Custom Software, Offline POS & Web Dev Pakistan",
    description: "Weblytic builds custom offline POS software with zero monthly fees, high-speed Next.js websites, local cPanel servers, and WhatsApp AI bots in Pakistan.",
    url: "https://weblytic.cc",
    siteName: "Weblytic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Weblytic - Digital Solutions Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weblytic — Custom Software, Offline POS & Web Dev Pakistan",
    description: "Weblytic builds custom offline POS software with zero monthly fees, high-speed Next.js websites, local cPanel servers, and WhatsApp AI bots in Pakistan.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Weblytic",
  "alternateName": "Weblytic Pakistan",
  "url": "https://weblytic.cc",
  "description": "Custom offline software, Next.js web development, local cPanel servers, and WhatsApp AI bot deployments in Pakistan.",
  "inLanguage": "en-US",
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Weblytic",
  "image": "https://weblytic.cc/og-image.jpg",
  "url": "https://weblytic.cc",
  "telephone": "+923131398796",
  "email": "imranalit.freelance@gmail.com",
  "priceRange": "PKR 5000 - PKR 80000",
  "currenciesAccepted": "PKR",
  "paymentAccepted": "Cash, Bank Transfer, EasyPaisa, JazzCash",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Khairpur Mirs'",
    "addressLocality": "Khairpur Mirs'",
    "addressRegion": "Sindh",
    "postalCode": "66020",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.5295,
    "longitude": 68.7592
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "21:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/weblytic.cc",
    "https://instagram.com/weblytic.cc",
    "https://wa.me/923131398796"
  ],
  "description": "Weblytic delivers custom offline POS software with zero monthly fees, high-speed Next.js websites, local cPanel servers, and official WhatsApp AI chatbots."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth scroll-pt-24">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-primary/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
