import { Metadata } from "next";
import FAQClient from "./FAQClient";
import { allFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs)",
  description: "Clear answers on offline-first desktop tools, WhatsApp AI assistants, managed hosting infrastructure, and high-velocity Next.js web engineering.",
  keywords: [
    "offline POS software Pakistan",
    "retail POS software one-time fee",
    "offline pharmacy POS software",
    "WhatsApp AI chatbot Pakistan",
    "WhatsApp business bot setup",
    "local cPanel server setup",
    "on-premise server Pakistan",
    "Next.js vs WordPress Pakistan",
    "Weblytic FAQ",
    "website cost Pakistan 2026",
    "domain email migration zero downtime",
    "Khairpur Sukkur software house"
  ],
  alternates: {
    canonical: "https://weblytic.cc/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQs) — Weblytic",
    description: "Clear answers regarding offline-first desktop software, WhatsApp AI assistants, managed hosting, and Next.js web engineering.",
    url: "https://weblytic.cc/faq",
    siteName: "Weblytic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Weblytic FAQs Knowledge Base",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions (FAQs) — Weblytic",
    description: "Clear answers on offline POS software, WhatsApp AI bots, local cPanel servers, and web design.",
    images: ["/og-image.jpg"],
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

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
