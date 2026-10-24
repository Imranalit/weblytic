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
    default: "Weblytic — Custom Software, Next.js Web Dev & AI Automation",
    template: "%s | Weblytic",
  },
  description: "Weblytic engineers high-performance custom software, fast Next.js websites, managed cloud infrastructure, and intelligent AI chatbots for modern businesses worldwide.",
  keywords: [
    "custom software development",
    "offline desktop tools",
    "retail inventory POS software",
    "Next.js web development",
    "high speed web agency",
    "WhatsApp AI chatbot",
    "business AI automation",
    "managed cloud hosting",
    "cPanel domain setup",
    "Weblytic digital agency"
  ],
  alternates: {
    canonical: "https://weblytic.cc",
  },
  openGraph: {
    title: "Weblytic — Custom Software, Next.js Web Dev & AI Automation",
    description: "Weblytic engineers high-performance custom software, fast Next.js websites, managed cloud infrastructure, and intelligent AI chatbots for modern businesses worldwide.",
    url: "https://weblytic.cc",
    siteName: "Weblytic",
    images: [
      {
        url: "https://weblytic.cc/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Weblytic — Custom Software, Next.js Web Dev & AI Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weblytic — Custom Software, Next.js Web Dev & AI Automation",
    description: "Weblytic engineers high-performance custom software, fast Next.js websites, managed cloud infrastructure, and intelligent AI chatbots for modern businesses worldwide.",
    images: ["https://weblytic.cc/og-image.jpg"],
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
  "url": "https://weblytic.cc",
  "description": "High-performance custom software, Next.js web development, managed cloud infrastructure, and AI chatbot automation worldwide.",
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://weblytic.cc/faq?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Weblytic",
  "logo": "https://weblytic.cc/og-image.png",
  "image": "https://weblytic.cc/og-image.jpg",
  "url": "https://weblytic.cc",
  "telephone": "+923131398796",
  "email": "hello@weblytic.cc",
  "priceRange": "$50 - $1000+",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Credit Card, Stripe, Bank Transfer, Online Payment",
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
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Weblytic Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Desktop Software & Tools",
          "description": "Lightweight offline tools for inventory and data management with zero recurring server fees."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Next.js Web Development",
          "description": "High-performance, mobile-first websites optimized for conversion and 100/100 PageSpeed SEO."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Managed Infrastructure & Hosting",
          "description": "Domain registration, professional email setup, SSL certificates, and managed cPanel hosting."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WhatsApp & Website AI Chatbots",
          "description": "Conversational AI assistants fine-tuned on company business documentation for 24/7 lead automation."
        }
      }
    ]
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
  "description": "Weblytic engineers high-performance custom software, fast Next.js websites, managed cloud infrastructure, and intelligent AI chatbots for modern businesses worldwide."
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
