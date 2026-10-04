import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { allFaqs } from "@/components/FAQ";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://weblytic.cc"),
  title: "Weblytic — Custom Software, Offline POS, Websites, Hosting & AI Bots",
  description: "Weblytic delivers custom offline POS software (no monthly fee), high-performance Next.js websites, local cPanel servers, and official WhatsApp AI chatbots across Pakistan.",
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
    title: "Weblytic — Custom Software, Offline POS, Websites, Hosting & AI Bots",
    description: "Weblytic delivers custom offline POS software (no monthly fee), high-performance Next.js websites, local cPanel servers, and official WhatsApp AI chatbots across Pakistan.",
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
    title: "Weblytic — Custom Software, Offline POS, Websites, Hosting & AI Bots",
    description: "Weblytic delivers custom offline POS software (no monthly fee), high-performance Next.js websites, local cPanel servers, and official WhatsApp AI chatbots across Pakistan.",
    images: ["/og-image.jpg"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Weblytic",
  "image": "https://weblytic.cc/og-image.jpg",
  "url": "https://weblytic.cc",
  "telephone": "+923000219721",
  "email": "imranalit.freelance@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Khairpur Mirs'",
    "addressRegion": "Sindh",
    "addressCountry": "PK"
  },
  "priceRange": "PKR 5000 - PKR 80000",
  "description": "Custom offline software, high-performance Next.js websites, domains, hosting, local cPanel servers, and WhatsApp AI bot deployments."
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
