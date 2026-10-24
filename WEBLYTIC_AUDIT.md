# Weblytic (weblytic.cc) — Full Frontend Architecture & Conversion Audit

> **Source:** Extracted directly from live GitHub repository `https://github.com/Imranalit/weblytic.git` (branch `origin/main`)  
> **Repository Commit Reference:**  
> `Commit SHA: e9f8bf37337f219cb7d40e48f568c3246a0c342d
Author: Imran Ali <imranalit.freelance@gmail.com>
Date: Sun Oct 25 03:00:38 2026 +0500
Message: feat: universal global USD pricing, lifetime free Netlify hosting on static sites, primary email hello@weblytic.cc, and updated chatbot knowledge`  
> **Audit Role:** Staff Frontend Architect  
> **Scope:** Full, un-truncated UI/UX architecture, conversion engineering, state management, and asset pipeline.

---

## 1. Tech Stack & Routing Structure

### 1.1 Dependencies (`origin/main:package.json`)
```json
{
  "name": "weblytic",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.8",
    "gsap": "^3.15.0",
    "lucide-react": "^0.358.0",
    "motion": "^14.3.0",
    "next": "14.2.15",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.51.1",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.15",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

### 1.2 Directory Tree of `app/` and `components/` (Git Tree `origin/main`)
```
app/
  app/about/AboutClient.tsx
  app/about/page.tsx
  app/careers/CareersClient.tsx
  app/careers/page.tsx
  app/faq/FAQClient.tsx
  app/faq/page.tsx
  app/globals.css
  app/icon.png
  app/layout.tsx
  app/page.tsx
  app/privacy/page.tsx
  app/refund-policy/page.tsx
  app/terms/page.tsx

components/
  components/Chatbot.tsx
  components/Contact.tsx
  components/Cursor.tsx
  components/FAQ.tsx
  components/Footer.tsx
  components/Hero.tsx
  components/HeroAnimation.tsx
  components/Navbar.tsx
  components/Pricing.tsx
  components/Process.tsx
  components/Services.tsx
  components/ShutterHero.tsx
  components/Testimonials.tsx
  components/TrustedBy.tsx
  components/WhyUs.tsx
  components/ui/Button.tsx
```

### 1.3 Page Rendering & Deployment Configuration
- **Rendering Model:** All 11 application routes (`/`, `/_not-found`, `/about`, `/careers`, `/faq`, `/privacy`, `/refund-policy`, `/terms`, etc.) are pre-rendered at build time as pure static pages (`○ (Static)` in Next.js build output).
- **Client Hydration Strategy:** The top-level pages and interactive sections mount `"use client"` where necessary for motion/animations (Framer Motion `m.div` with `LazyMotion` domAnimation features, and GSAP ScrollTrigger timeline pins).
- **Deployment & Edge Pipeline:** Deployed via Netlify on Node 20 runtime. Image optimization is set to `unoptimized: true` to prevent external cloud image optimizer latency and use pre-compressed WebP retina assets.

#### Build & Server Configuration (`origin/main:next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

#### Hosting Configuration (`origin/main:netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

---

## 2. SEO, Metadata & Global Layout

### 2.1 Complete Root Layout & Metadata (`origin/main:app/layout.tsx`)
Contains the complete canonical URL definitions, OpenGraph cards (1200x630 retina), Twitter large summary cards, Googlebot indexing directives, and dual Schema.org JSON-LD scripts (`WebSite` and `ProfessionalService`).

```tsx
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
```

---

## 3. Hero & Trust Bar (Exact Code + Copy)

### 3.1 Hero Section (`origin/main:components/Hero.tsx`)
```tsx
"use client";

import { m } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const headlineWords = "Build. Host. Scale. — All in One Place.".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Aurora / Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen"
        />
        <m.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <m.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="inline-flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 text-5xl md:text-7xl font-display font-bold mb-6"
            >
              {headlineWords.map((word, i) => (
                <m.span
                  key={i}
                  variants={fadeUp}
                  className={i < 3 ? "text-gradient" : "text-white"}
                >
                  {word}
                </m.span>
              ))}
            </m.h1>

            <m.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              End-to-end digital solutions for modern businesses. We engineer custom offline POS software, design high-speed Next.js websites, configure local cPanel servers, and deploy AI chatbots across Pakistan.
            </m.p>

            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto gap-2 group">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink href="#services" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Services
              </ButtonLink>
            </m.div>
          </div>

          {/* Floating UI Animation Mockup (Responsive for Mobile & Desktop) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none perspective-1000 block mt-8 lg:mt-0">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: -3, rotateX: 3, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
              className="relative w-full"
            >
              <HeroAnimation />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 3.2 "Technologies We Build With" Marquee (`origin/main:components/TrustedBy.tsx`)
```tsx
"use client";

const brands = [
  "Next.js",
  "React",
  "Netlify",
  "Stripe",
  "WhatsApp API",
  "Meta",
  "Vercel",
  "Shopify",
];

export default function TrustedBy() {
  const looped = [...brands, ...brands];

  return (
    <section className="py-16 relative z-10 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-10">
        <p className="text-center text-sm font-mono text-text-muted tracking-[0.2em] uppercase">
          Technologies we build with
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex animate-marquee gap-16 w-max items-center">
          {looped.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 text-2xl md:text-3xl font-display font-bold text-white/40 hover:text-white/80 transition-colors whitespace-nowrap select-none tracking-tight"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 4. Services & Value Proposition

### 4.1 Core Services Component (`origin/main:components/Services.tsx`)
```tsx
"use client";

import { m } from "framer-motion";
import { Code2, Globe, Server, HardDrive, ArrowRight, Bot } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Custom Software",
    description: "Tailor-made offline and online applications to streamline your business operations.",
    features: ["Offline POS & ERP tools", "SaaS platforms & portals", "Internal automation systems"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Web Development",
    description: "High-performance, SEO-optimized websites designed to convert visitors into customers.",
    features: ["Corporate websites", "E-commerce platforms", "Landing pages & brand sites"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Domains & Hosting",
    description: "Secure, reliable hosting solutions and domain management for your digital assets.",
    features: ["Cloud & VPS hosting", "SSL & business email", "Migration & DNS management"],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "Local cPanel Solutions",
    description: "On-premise hosting setups for maximum control and data privacy.",
    features: ["On-premise cPanel/WHM", "Automated backups", "Intranet & private cloud"],
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI Bot Deployment",
    description: "Intelligent, conversational AI assistants trained on your specific business data.",
    features: ["WhatsApp business bots", "Website AI chatbots", "Custom data training"],
    color: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Core <span className="text-gradient">Services</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            We provide everything you need to build, host, and scale your digital presence from the ground up.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
        >
          {services.map((service, index) => (
            <m.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 relative group overflow-hidden flex flex-col"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl bg-elevated border border-white/10 flex items-center justify-center mb-6 ${service.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium group/link mt-auto">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
```

---

## 5. Portfolio / Case Studies ("Recent Work")

### 5.1 Case Studies Component (`git:components/Portfolio.tsx`)
The portfolio section was previously mounted as Section 5 on the homepage and represents the canonical case study data for Weblytic clients:

```tsx
"use client";

import { m } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const projects = [
  {
    title: "Pdfnestor.com",
    category: "SaaS Platform • Ongoing",
    tags: ["Next.js", "PDF Engine", "Cloud Processing", "In Development"],
    color: "from-blue-600/40 to-cyan-600/40",
    link: "https://pdfnestor.com"
  },
  {
    title: "IET Sukkur IBA University Khairpur Campus",
    category: "Institutional ERP • Ongoing",
    tags: ["Library Software", "Sukkur IBA University", "Database Management", "Active Deployment"],
    color: "from-purple-600/40 to-indigo-600/40",
    link: "#contact"
  },
  {
    title: "Retail POS & Inventory System",
    category: "Custom Offline Software",
    tags: ["Desktop POS", "Local Database", "Zero Monthly Fee", "Deployed"],
    color: "from-emerald-600/40 to-teal-600/40",
    link: "#contact"
  },
  {
    title: "WhatsApp & Website AI Chatbots",
    category: "AI Conversational Systems",
    tags: ["WhatsApp Business API", "Groq AI", "Customer Support", "Deployed"],
    color: "from-orange-600/40 to-pink-600/40",
    link: "#contact"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Recent <span className="text-gradient">Work</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Explore a selection of our latest projects across custom software, web development, and hosting setups.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <a 
                href={project.link} 
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card overflow-hidden relative aspect-video flex flex-col justify-end p-8 block"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.link.startsWith("http") ? "Visit Live Site →" : "View Case Study →"}
                  </span>
                </div>
                
                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="text-primary font-medium text-sm mb-2">{project.category}</div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
```

---

## 6. Pricing Architecture & Currency Logic

### 6.1 Complete Pricing Component (`origin/main:components/Pricing.tsx`)
Universal global USD pricing with hardcoded pricing tiers, guarantee badges, and launch offers:

```tsx
"use client";

import { m } from "framer-motion";
import { Check, Info, ShieldCheck } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

const plans = [
  {
    name: "Custom Desktop Tool",
    description: "Lightweight offline software for inventory or local data management.",
    price: "$150+",
    suffix: "USD",
    features: [
      "Single-user desktop application",
      "Local database storage (SQLite / JSON)",
      "One-time build — no recurring server fees",
      "Includes basic UI and export to CSV",
    ],
    note: "Complex multi-user ERP features require custom scope.",
    guarantee: "30-Day Bug-Free Guarantee",
    offer: "Includes 1 hour of free post-launch support",
  },
  {
    name: "Starter Landing Page",
    popular: true,
    description: "High-speed, single-page Next.js site with lifetime free Netlify hosting.",
    price: "$100+",
    suffix: "USD",
    features: [
      "1-page Next.js / React application",
      "Lifetime free Netlify cloud hosting",
      "Mobile-responsive & deployed on Netlify",
      "Basic on-page SEO and OpenGraph tags",
      "1 round of design revisions",
    ],
    note: "Multi-page sites and CMS integrations start at $400.",
    guarantee: "100% Money-Back Guarantee",
    offer: "Launch Offer: Free Domain (1 Yr) & Lifetime Free Netlify Hosting",
  },
  {
    name: "Managed Infrastructure",
    description: "Domain, hosting, and professional email setup.",
    price: "$50",
    suffix: "USD / yr",
    features: [
      "Custom domain registration",
      "Shared cPanel hosting (1GB storage)",
      "Business email setup (@yourdomain.com)",
      "Free SSL certificate",
    ],
    note: "Premium VPS or Vercel Pro hosting billed separately.",
    guarantee: "99.9% Uptime Guarantee",
    offer: "Free migration from your current host",
  },
  {
    name: "Basic AI Assistant",
    description: "A simple chatbot trained on your FAQs to handle basic inquiries.",
    price: "$150+",
    suffix: "USD",
    features: [
      "Web or WhatsApp integration",
      "Trained on up to 10 pages of your text data",
      "Basic handoff to human support",
      "Setup fee included",
    ],
    note: "Custom API integrations and advanced automations start at $600.",
    guarantee: "14-Day Performance Guarantee",
    offer: "Limited: 2 setup slots left this month",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10 bg-elevated/30 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Transparent <span className="text-gradient">Pricing</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Predictable, upfront investment with zero recurring surprises.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {plans.map((plan, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className={`relative glass-card p-8 flex flex-col ${
                plan.popular ? "border-primary/50 shadow-2xl shadow-primary/20 md:-translate-y-4" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-gradient text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-text-muted mb-6 min-h-[40px]">
                {plan.description}
              </p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-4xl font-display font-bold">
                    {plan.price}
                  </span>
                </div>
                <span className="text-text-muted text-sm">
                  {plan.suffix} (Starting from)
                </span>
              </div>
              
              <ul className="space-y-4 mb-6 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-background/50 border border-white/5 rounded-lg p-3 mb-4 flex gap-2 items-start">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted leading-relaxed">
                  {plan.note}
                </p>
              </div>

              {/* Visual Guarantee & Offer Badges */}
              <div className="mt-6 mb-6 space-y-2 border-t border-white/10 pt-4 text-left">
                <p className="text-sm font-semibold text-[#10B981] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{plan.guarantee}</span>
                </p>
                <p className="text-xs text-amber-400 font-medium">
                  <span>{plan.offer}</span>
                </p>
              </div>
              
              <ButtonLink 
                href="#contact"
                variant={plan.popular ? "primary" : "secondary"} 
                className="w-full mt-auto"
              >
                Get Started
              </ButtonLink>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
```

---

## 7. Testimonials, Contact Funnel & Footer

### 7.1 Testimonials Carousel (`origin/main:components/Testimonials.tsx`)
```tsx
"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote: "Building Pdfnestor.com required intense document-processing speed and modern web architecture. Weblytic delivered a snappy, intuitive SaaS application that handles high-volume document workflows effortlessly.",
    name: "Bilal Ahmed Khan",
    role: "Product Co-Founder, Pdfnestor",
    initials: "BK"
  },
  {
    quote: "Their offline POS software completely modernized our retail operations across Sindh and Punjab. Zero monthly server fees, instant billing, and bulletproof offline reliability. Best software house in the region.",
    name: "Muhammad Usman Sheikh",
    role: "CEO, Al-Madina Wholesale & Retail",
    initials: "MU"
  },
  {
    quote: "The custom WhatsApp AI chatbot deployed by Weblytic has revolutionized our customer support. It handles product inquiries and customer quotes 24/7 without delays. Response times dropped to seconds!",
    name: "Zainab Fatima",
    role: "Managing Director, Noor Tech & Apparel",
    initials: "ZF"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="sr-only">Client Testimonials & Reviews</h2>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass-card p-8 md:p-16 relative overflow-hidden"
        >
          <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-12" />
          
          <div className="relative min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonials[currentIndex].initials}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-text-muted">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
            <button onClick={prev} aria-label="Previous testimonial" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-6 bg-primary" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next testimonial" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
```

### 7.2 Contact Form & Dual Submission Funnel (`origin/main:components/Contact.tsx`)
```tsx
"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";
import { fadeUp, slideInRight } from "@/lib/motion";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [teamSize, setTeamSize] = useState("1-10");
  const [packageNeeded, setPackageNeeded] = useState("Offline Software");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { fullName?: string; email?: string; message?: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message.trim()) newErrors.message = "Project details/message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToNetlify = () => {
    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "quote");
      formData.append("fullName", fullName);
      formData.append("email", email);
      if (organization) formData.append("organization", organization);
      formData.append("teamSize", teamSize);
      formData.append("packageNeeded", packageNeeded);
      formData.append("message", message);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }).catch(() => {});
    } catch {
      // Ignore background submission failures
    }
  };

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    submitToNetlify();

    const subject = `New Project Inquiry: ${packageNeeded} - ${fullName}`;
    const body = `Name: ${fullName}
Email: ${email}
Organization: ${organization || "N/A"}
Team Size: ${teamSize}
Package: ${packageNeeded}

Project Details:
${message}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:hello@weblytic.cc?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    submitToNetlify();

    const whatsAppText = `*New Project Inquiry!*\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Organization:* ${organization || "N/A"}\n*Team Size:* ${teamSize}\n*Package:* ${packageNeeded}\n\n*Project Details:*\n${message}`;

    const encodedMessage = encodeURIComponent(whatsAppText);
    window.open(`https://wa.me/923131398796?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let's build something <span className="text-gradient">amazing</span>
            </h2>
            <p className="text-lg text-text-muted mb-12 max-w-md">
              Ready to scale your business? Fill out the details below to send us your project brief via email or chat with our team directly on WhatsApp.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white mb-0.5">Email Us</div>
                  <div className="flex flex-col gap-0.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-text-muted text-xs mr-1.5">Primary:</span>
                      <a href="mailto:hello@weblytic.cc" className="hover:text-primary transition-colors text-white/90">
                        hello@weblytic.cc
                      </a>
                    </div>
                    <div>
                      <span className="text-text-muted text-xs mr-1.5">Careers:</span>
                      <a href="mailto:careers@weblytic.cc" className="hover:text-primary transition-colors text-white/90">
                        careers@weblytic.cc
                      </a>
                    </div>
                    <div>
                      <span className="text-text-muted text-xs mr-1.5">Admin:</span>
                      <a href="mailto:admin@weblytic.cc" className="hover:text-primary transition-colors text-white/90">
                        admin@weblytic.cc
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Call / WhatsApp</div>
                  <a href="https://wa.me/923131398796" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                    +92 313 1398796
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-success">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Headquarters</div>
                  <div>Khairpur Mirs', Sindh, Pakistan</div>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="flex-1"
          >
            <div className="glass-card p-8 md:p-10 relative">
              <form
                name="quote"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="quote" />
                <p className="hidden">
                  <label htmlFor="quote-bot-field">Don’t fill this out if you're human:</label>
                  <input id="quote-bot-field" name="bot-field" />
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-name" className="text-sm font-medium text-white">Full Name</label>
                    <input
                      id="quote-name"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      className={`w-full bg-background border ${errors.fullName ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <span className="text-xs text-red-400">{errors.fullName}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="quote-email" className="text-sm font-medium text-white">Email Address</label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full bg-background border ${errors.email ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-organization" className="text-sm font-medium text-white">Organization Name</label>
                    <input
                      id="quote-organization"
                      name="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your Company LLC"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="quote-teamSize" className="text-sm font-medium text-white">Working Team Size</label>
                    <select
                      id="quote-teamSize"
                      name="teamSize"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option value="1-10">1 - 10</option>
                      <option value="10-20">10 - 20</option>
                      <option value="20-50">20 - 50</option>
                      <option value="50-100">50 - 100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quote-package" className="text-sm font-medium text-white">Package Needed</label>
                  <select
                    id="quote-package"
                    name="packageNeeded"
                    value={packageNeeded}
                    onChange={(e) => setPackageNeeded(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Offline Software">Offline Software</option>
                    <option value="Server-Based Software">Server-Based Software</option>
                    <option value="Website with Free Hosting">Website with Free Hosting</option>
                    <option value="Website with Hosting & Domain">Website with Hosting & Domain</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quote-message" className="text-sm font-medium text-white">Project Details / Message</label>
                  <textarea
                    id="quote-message"
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    rows={4}
                    className={`w-full bg-background border ${errors.message ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                    placeholder="Tell us about your goals, specific requirements, and any questions..."
                  />
                  {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-primary-gradient hover:opacity-95 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send via Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-success hover:bg-success/90 shadow-lg shadow-success/20 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
```

### 7.3 Global Footer (`origin/main:components/Footer.tsx`)
```tsx
"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData();
    formData.append("form-name", "newsletter");
    formData.append("email", email);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-20 pb-10 z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2 group">
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Weblytic
              </span>
              <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1 animate-heartbeat" />
            </a>
            <p className="text-text-muted text-sm leading-relaxed">
              End-to-end digital solutions for modern businesses. We build, host, and scale your digital infrastructure from Khairpur Mirs', Sindh to the world.
            </p>
            <div className="text-xs text-text-muted space-y-1">
              <p>📍 Khairpur Mirs', Sindh, Pakistan</p>
              <p>✉️ Contact: <a href="mailto:hello@weblytic.cc" className="hover:text-primary transition-colors text-white/90">hello@weblytic.cc</a></p>
              <p>✉️ Careers: <a href="mailto:careers@weblytic.cc" className="hover:text-primary transition-colors text-white/90">careers@weblytic.cc</a></p>
              <p>✉️ Admin: <a href="mailto:admin@weblytic.cc" className="hover:text-primary transition-colors text-white/90">admin@weblytic.cc</a></p>
              <p>📱 <a href="https://wa.me/923131398796" className="hover:text-primary transition-colors">+92 313 1398796</a></p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Weblytic on Twitter"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Weblytic on LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/weblytic.cc" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Weblytic on Facebook"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/weblytic.cc" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Weblytic on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Custom Software</a></li>
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Domains & Hosting</a></li>
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Local cPanel Setup</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="/about" className="text-sm text-text-muted hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-sm text-text-muted hover:text-white transition-colors">Careers <span className="ml-1 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">We're Hiring</span></a></li>
                            <li><a href="/#pricing" className="text-sm text-text-muted hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/faq" className="text-sm text-text-muted hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/#contact" className="text-sm text-text-muted hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-text-muted mb-4">
              Subscribe to our newsletter for the latest tech news and agency updates.
            </p>
            <form 
              name="newsletter"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubscribe} 
              className="relative"
            >
              {/* Hidden inputs for Netlify */}
              <input type="hidden" name="form-name" value="newsletter" />
              <div className="hidden">
                <label htmlFor="bot-field">Don’t fill this out:</label>
                <input id="bot-field" name="bot-field" />
              </div>

              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === "success" ? "Thanks for subscribing!" : "Enter your email"}
                required
                disabled={status === "loading" || status === "success"}
                className={`w-full bg-white/5 border rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${
                  status === "error" ? "border-red-500/50" : "border-white/10"
                }`}
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                aria-label="Submit newsletter subscription"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary-end transition-colors disabled:opacity-50 disabled:hover:bg-primary"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-400 text-xs mt-2 absolute">Oops! Something went wrong. Try again.</p>
            )}
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-muted">
            © {new Date().getFullYear()} Weblytic. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="/privacy" className="text-sm text-text-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-text-muted hover:text-white transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="text-sm text-text-muted hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 8. Styling, Animations & Floating Widgets

### 8.1 Tailwind Theme Tokens (`origin/main:tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05060A",
        elevated: "#0B0F19",
        primary: "#6366F1",
        "primary-end": "#8B5CF6",
        secondary: "#22D3EE",
        success: "#10B981",
        text: {
          primary: "#F8FAFC",
          muted: "#94A3B8",
        },
        border: "rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "primary-gradient": "linear-gradient(to right, #6366F1, #8B5CF6)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-space-grotesk)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
```

### 8.2 Global CSS & Animations (`origin/main:app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #05060A;
    --foreground: #F8FAFC;
  }
  
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    overflow-x: hidden;
  }
  
  ::selection {
    background: #6366F1;
    color: white;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-elevated/40 backdrop-blur-xl border border-white/5 rounded-2xl;
  }
  
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-end;
  }

  .glass-panel-glow {
    position: relative;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(8, 12, 22, 0.9) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.25);
    box-shadow: 0 10px 40px -10px rgba(99, 102, 241, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15);
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  14% {
    transform: scale(1.4);
    box-shadow: 0 0 8px 3px rgba(99, 102, 241, 0.8), 0 0 16px 5px rgba(139, 92, 246, 0.5);
  }
  28% {
    transform: scale(1.05);
    box-shadow: 0 0 3px 1px rgba(99, 102, 241, 0.4);
  }
  42% {
    transform: scale(1.55);
    box-shadow: 0 0 12px 4px rgba(99, 102, 241, 0.9), 0 0 22px 7px rgba(139, 92, 246, 0.6);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

.animate-heartbeat {
  animation: heartbeat 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  display: inline-block;
  transform-origin: center;
}


@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

### 8.3 Floating AI Assistant Widget ("Chat with Konain") (`origin/main:components/Chatbot.tsx`)
```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const KonainAvatar = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <div 
    className={`relative rounded-full overflow-hidden shrink-0 border border-primary/30 shadow-md ${className}`}
    style={{ width: size, height: size }}
  >
    <Image 
      src="/konain-avatar.webp" 
      alt="Konain - Weblytic AI" 
      fill 
      className="object-cover" 
      sizes={`${size}px`}
      priority
    />
  </div>
);

const FormattedMessage = ({ content }: { content: string }) => {
  const sanitized = content.replace(/<br\s*\/?>/gi, "\n");
  const lines = sanitized.split("\n");

  return (
    <div className="space-y-1.5 whitespace-pre-wrap break-words">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={lIdx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pIdx} className="font-semibold text-white">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Konain, your Weblytic AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smart auto-scroll:
  // When Konain sends a new reply, scroll so the TOP (head) of her reply
  // appears at the top of the chat area, so users don't have to scroll up to find the start!
  useEffect(() => {
    if (!isOpen) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "assistant" && messages.length > 1) {
      const timer = setTimeout(() => {
        if (latestMessageRef.current) {
          latestMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status} Error`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Sorry, I ran into an issue: ${error.message}. Please reach out to our team on WhatsApp at +923131398796!` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button with Hijabi Avatar (Visible when closed) */}
      <AnimatePresence>
        {!isOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 sm:right-6 md:right-8 z-50 flex items-center"
          >
            {/* Calling-out speech bubble (prompts visitor to chat) */}
            <m.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2.5 bg-elevated/95 backdrop-blur-xl border border-primary/30 py-2 px-3.5 rounded-2xl shadow-xl shadow-primary/10 cursor-pointer whitespace-nowrap hover:scale-105 transition-all duration-200 group mr-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
              </span>
              <span className="text-xs font-medium text-white/90 group-hover:text-white flex items-center gap-1.5">
                👋 Have questions? <strong className="text-primary font-semibold">Chat with Konain</strong>
              </span>
            </m.div>

            {/* Floating Avatar Button */}
            <m.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open chat with Konain"
              className="relative w-14 h-14 rounded-full shadow-xl shadow-primary/30 focus:outline-none flex items-center justify-center transition-all p-0.5 bg-gradient-to-tr from-primary via-violet-500 to-cyan-400 animate-[pulse_3s_ease-in-out_infinite]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-background">
                <Image 
                  src="/konain-avatar.webp" 
                  alt="Konain Avatar" 
                  fill 
                  className="object-cover" 
                  sizes="56px"
                  priority
                />
              </div>
              {/* Online Green Indicator Dot */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-background ring-2 ring-success/30" />
              
              {/* Floating Mini Sparkle Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white shadow-md">
                <Sparkles size={11} />
              </span>
            </m.button>
          </m.div>
        )}
      </AnimatePresence>

      {/* Chat Window: Anchored between navbar and bottom taskbar */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 sm:top-24 right-3 sm:right-6 md:right-8 bottom-4 sm:bottom-6 w-[calc(100vw-1.5rem)] sm:w-[450px] md:w-[470px] max-h-[calc(100dvh-6.5rem)] bg-elevated/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header with Konain Avatar & Single Clean Close Button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <KonainAvatar size={36} className="ring-2 ring-primary/40" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-elevated" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Konain <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">AI Assistant</span>
                  </h3>
                  <p className="text-[11px] text-text-muted">Weblytic Support • Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area with Auto-Scroll & Head Alignment */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scroll-smooth min-h-0"
            >
              {messages.map((msg, idx) => {
                const isLatest = idx === messages.length - 1;
                return (
                  <div 
                    key={idx} 
                    ref={isLatest ? latestMessageRef : null}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2.5 scroll-mt-3`}
                  >
                    {msg.role === "assistant" && (
                      <KonainAvatar size={28} className="mt-0.5" />
                    )}
                    
                    <div 
                      className={`px-4 py-2.5 rounded-2xl max-w-[88%] text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-tr-sm shadow-sm" 
                          : "bg-white/10 text-white/95 rounded-tl-sm border border-white/5"
                      }`}
                    >
                      <FormattedMessage content={msg.content} />
                    </div>
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex justify-start gap-2.5">
                  <KonainAvatar size={28} className="mt-0.5" />
                  <div className="px-4 py-3 rounded-2xl bg-white/10 text-white rounded-tl-sm border border-white/5 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area: Guaranteed visible, never hidden behind taskbar! */}
            <div className="p-3 border-t border-white/10 bg-white/5 shrink-0">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Konain about software, pricing, web..."
                  className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/60"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90 shadow-md shadow-primary/25 shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 8.4 Framer Motion Variants (`origin/main:lib/motion.ts`)
```typescript
import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
```

### 8.5 Shutter Hero Cinematic Split (`origin/main:components/ShutterHero.tsx`)
```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  children: React.ReactNode;
  /** Delay before shutter starts opening (ms). Default 350. */
  delay?: number;
};

export default function ShutterHero({ children, delay = 350 }: Props) {
  const reduceMotion = useReducedMotion();
  const [showShutter, setShowShutter] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Dev escape hatch: ?noShutter=1 skips the animation entirely
    const params = new URLSearchParams(window.location.search);
    if (params.get("noShutter") === "1") {
      setReady(true);
      return;
    }

    // Only play once per browser session
    const played = sessionStorage.getItem("weblytic-shutter-played");
    if (played === "1") {
      setReady(true);
      return;
    }

    // Skip entirely for reduced-motion users
    if (reduceMotion) {
      setReady(true);
      return;
    }

    // Gate to desktop only (>= 768px)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) {
      setReady(true);
      return;
    }

    setShowShutter(true);
  }, [reduceMotion]);

  // If we're not showing the shutter, render children immediately
  if (!showShutter) {
    return <>{children}</>;
  }

  return (
    <>
      {/* The actual hero content — always mounted, revealed underneath */}
      <div
        aria-hidden={!ready}
        className={ready ? "" : "pointer-events-none"}
      >
        {children}
      </div>

      {/* The shutter overlay */}
      <AnimatePresence>
        <motion.div
          key="shutter"
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Left panel */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-[#05060A]"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.5, ease: EASE, delay: delay / 1000 }}
            onAnimationComplete={() => {
              setReady(true);
              sessionStorage.setItem("weblytic-shutter-played", "1");
              setShowShutter(false);
            }}
          >
            {/* Thin seam on the inner edge */}
            <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
          </motion.div>

          {/* Right panel */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#05060A]"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: EASE, delay: delay / 1000 }}
          >
            <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
          </motion.div>

          {/* Centered brand mark — sits above both panels, fades as they split */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: delay / 1000 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-3xl tracking-tight text-white">
                Weblytic
              </span>
              <span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,#6366F1,#8B5CF6)] animate-heartbeat" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
```

### 8.6 Pinned Horizontal Step Scrub (`origin/main:components/Process.tsx`)
```tsx
"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeUp } from "@/lib/motion";
import { Search, PenTool, Terminal, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "1. Discover",
    description:
      "We analyze your requirements, target audience, and business goals to map out the perfect solution.",
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "2. Design",
    description:
      "Creating wireframes and high-fidelity mockups focusing on user experience and conversion.",
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "3. Develop",
    description:
      "Writing clean, scalable code using modern frameworks to bring the designs to life with top-tier performance.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "4. Deploy",
    description:
      "Setting up hosting, domains, and deploying your project to production with zero downtime.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap ?? gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      ctx = gsap.context(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const counter = counterRef.current;
        if (!section || !track || !counter) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length !== steps.length || circles.length !== steps.length) return;

        const totalSteps = steps.length;
        // Distance one card travels per step = 100vw (each card is full viewport width)
        const stepWidth = window.innerWidth;

        // Initial state: card 0 active, others dimmed. Track at 0.
        gsap.set(track, { x: 0 });
        cards.forEach((card, i) => {
          gsap.set(card, {
            opacity: i === 0 ? 1 : 0.35,
            scale: i === 0 ? 1 : 0.92,
            filter: i === 0 ? "blur(0px)" : "blur(3px)",
          });
        });
        circles.forEach((circle, i) => {
          gsap.set(circle, {
            backgroundColor: i === 0 ? "#6366F1" : "rgb(5,6,10)",
            color: i === 0 ? "#FFFFFF" : "#6366F1",
            scale: i === 0 ? 1.1 : 1,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // 1 step of scroll per card + 1 viewport pause before releasing the pin
            end: `+=${totalSteps * 100 + 100}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate track horizontally across all steps
        tl.to(
          track,
          {
            x: -(totalSteps - 1) * stepWidth,
            ease: "none",
            duration: totalSteps,
          },
          0
        );

        // Per step: fade current in, fade previous out
        steps.forEach((_, i) => {
          if (i === 0) return;

          const prevCard = cards[i - 1];
          const currCard = cards[i];
          const prevCircle = circles[i - 1];
          const currCircle = circles[i];

          tl.to(
            prevCard,
            {
              opacity: 0.35,
              scale: 0.92,
              filter: "blur(3px)",
              ease: "power2.out",
              duration: 0.4,
            },
            i - 0.15
          );
          tl.to(
            prevCircle,
            {
              backgroundColor: "rgb(5,6,10)",
              color: "#6366F1",
              scale: 1,
              ease: "power2.out",
              duration: 0.4,
            },
            i - 0.15
          );

          tl.to(
            currCard,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 0.4,
            },
            i
          );
          tl.to(
            currCircle,
            {
              backgroundColor: "#6366F1",
              color: "#FFFFFF",
              scale: 1.1,
              ease: "power2.out",
              duration: 0.4,
            },
            i
          );

          tl.call(
            () => {
              counter.textContent = `0${i + 1} / 0${totalSteps}`;
            },
            undefined,
            i
          );
        });

        // Hold the last card on screen for ~25% of the pinned scroll
        // before releasing the pin. Consumes timeline duration without visual change.
        tl.to({}, { duration: 1 }, totalSteps);

        counter.textContent = `01 / 0${totalSteps}`;

        // Recompute stepWidth on resize
        ScrollTrigger.addEventListener("refreshInit", () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const st = (tl.scrollTrigger as any);
          if (!st) return;
          st.vars.end = `+=${totalSteps * 100 + 100}%`;
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen overflow-hidden"
    >
      <div className="h-full flex flex-col justify-center">
        <div className="text-center mb-12 shrink-0">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            How We <span className="text-gradient">Work</span>
          </m.h2>
          <div className="mt-4 text-sm font-mono text-text-muted tracking-widest">
            <span ref={counterRef} className="hidden lg:inline">
              01 / 04
            </span>
            <span className="lg:hidden">01 / 04</span>
          </div>
        </div>

        {/* Horizontal track — width = totalSteps * 100vw, translated by GSAP */}
        <div className="relative h-[60vh] flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
            style={{ width: `${steps.length * 100}vw` }}
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="w-screen flex items-center justify-center px-2 shrink-0"
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el as HTMLDivElement | null;
                  }}
                  className="w-full max-w-lg"
                >
                  <div
                    ref={(el) => {
                      circleRefs.current[i] = el as HTMLDivElement | null;
                    }}
                    className="mx-auto mb-6 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary"
                    style={{ willChange: "transform, background-color, color" }}
                  >
                    {step.icon}
                  </div>
                  <div className="glass-card p-8 text-center">
                    <h3 className="text-2xl font-display font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-muted">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion fallback: original vertical timeline */}
      <div className="lg:hidden absolute inset-0 bg-background overflow-y-auto py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-6">
              How We <span className="text-gradient">Work</span>
            </h2>
          </div>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div className="glass-card p-6 w-full text-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```
