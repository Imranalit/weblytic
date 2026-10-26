"use client";

import { m } from "framer-motion";
import { Check, Sparkles, Flame, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface Feature {
  text: string;
  isFree?: boolean;
  freeTag?: string;
}

interface Plan {
  slug: string;
  badge: string;
  name: string;
  popular?: boolean;
  tagline: string;
  price: string;
  suffix: string;
  features: Feature[];
  freeHighlight: string;
}

const plans: Plan[] = [
  {
    slug: "desktop-software",
    badge: "100% OFFLINE",
    name: "Custom Desktop Software",
    tagline: "Fast offline software with zero monthly fees.",
    price: "$150+",
    suffix: "USD • One-time",
    features: [
      { text: "Native Windows / Mac desktop app" },
      { text: "Local SQLite / JSON secure database" },
      { text: "ZERO recurring cloud fees forever", isFree: true, freeTag: "LIFETIME FREE" },
      { text: "1 Hr post-launch setup & training", isFree: true, freeTag: "FREE BONUS" },
    ],
    freeHighlight: "FREE: Zero Server Costs + 1 Hr Support",
  },
  {
    slug: "starter-landing-page",
    badge: "🔥 BEST VALUE",
    popular: true,
    name: "Starter Landing Page",
    tagline: "High-converting Next.js site hosted for free.",
    price: "$100+",
    suffix: "USD • One-time",
    features: [
      { text: "Custom Next.js & React single-page" },
      { text: "Netlify Cloud Hosting ($0/mo forever)", isFree: true, freeTag: "LIFETIME FREE" },
      { text: "Custom Domain registration (1st Yr)", isFree: true, freeTag: "FREE" },
      { text: "Mobile-first responsive design & SEO" },
    ],
    freeHighlight: "LIFETIME FREE Cloud Hosting Included",
  },
  {
    slug: "managed-infrastructure",
    badge: "CLOUD & HOSTING",
    name: "Managed Infrastructure",
    tagline: "Reliable servers, domain & business email.",
    price: "$50",
    suffix: "USD / year",
    features: [
      { text: "Custom domain registration included" },
      { text: "cPanel, Cloud VPS, Node.js or Static" },
      { text: "Business email (@yourdomain.com)" },
      { text: "SSL certificate & weekly auto-backups", isFree: true, freeTag: "FREE" },
    ],
    freeHighlight: "FREE: SSL + Weekly Auto-Backups",
  },
  {
    slug: "ai-assistant",
    badge: "24/7 AUTOMATION",
    name: "Basic AI Assistant",
    tagline: "Smart chatbot trained on your company data.",
    price: "$150+",
    suffix: "USD • One-time",
    features: [
      { text: "Website or WhatsApp chat widget" },
      { text: "Trained on your business docs & FAQs" },
      { text: "Prompt engineering & model tuning", isFree: true, freeTag: "FREE" },
      { text: "Seamless human support handoff", isFree: true, freeTag: "FREE" },
    ],
    freeHighlight: "FREE: Complete Setup & Widget Integration",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-16 relative z-10 bg-elevated/20 border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Compact, Clean Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <m.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20 mb-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT &amp; PREDICTABLE</span>
          </m.span>
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2"
          >
            Transparent <span className="text-gradient">Pricing</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-sm md:text-base text-text-muted max-w-xl mx-auto"
          >
            Upfront investments with high-value free inclusions. Click any package to view complete specifications.
          </m.p>
        </div>

        {/* 4-Card Ad-Style Grid */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-7xl mx-auto items-stretch"
        >
          {plans.map((plan, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className={`relative glass-card p-5 lg:p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary/60 shadow-[0_0_30px_rgba(139,92,246,0.22)] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent"
                  : "border-white/10"
              }`}
            >
              {/* Card Top / Header */}
              <div>
                {/* Ad Badge Pill */}
                <div className="h-6 mb-3 flex items-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      plan.popular
                        ? "bg-primary-gradient text-white shadow-sm"
                        : "bg-white/10 text-white/90 border border-white/10"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Package Name */}
                <h3 className="text-lg lg:text-xl font-display font-bold text-white mb-1 h-12 flex items-center">
                  {plan.name}
                </h3>

                {/* Short Tagline */}
                <p className="text-xs text-text-muted mb-4 h-8 line-clamp-2 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Big Ad Price Block */}
                <div className="pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-baseline gap-1 text-white">
                    <span className="text-3xl font-display font-bold tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted font-medium">
                    {plan.suffix}
                  </span>
                </div>

                {/* "What's in it" Feature Bullets */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted/70 block mb-2 font-semibold">
                    WHAT&apos;S INCLUDED:
                  </span>
                  <ul className="space-y-2 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            feature.isFree ? "text-emerald-400" : "text-primary/80"
                          }`}
                        />
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {feature.isFree && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold tracking-wider uppercase shrink-0 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {feature.freeTag || "FREE"}
                            </span>
                          )}
                          <span
                            className={
                              feature.isFree
                                ? "text-emerald-300 font-semibold"
                                : "text-text-primary/90"
                            }
                          >
                            {feature.text}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Free Attraction Banner + High-Visibility Explore Button */}
              <div className="pt-3 border-t border-white/10 mt-auto">
                {/* Free Highlight Ad Banner */}
                <div className="mb-3.5 flex items-center gap-2 px-2.5 py-2 rounded-xl text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 shadow-sm">
                  <Flame className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{plan.freeHighlight}</span>
                </div>

                {/* Prominent High-Visibility Explore Button (Replaced Get Started) */}
                <a
                  href={`/pricing/${plan.slug}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md group ${
                    plan.popular
                      ? "bg-primary-gradient text-white shadow-primary/30 hover:shadow-primary/50 hover:brightness-110"
                      : "bg-white/10 text-white hover:bg-primary hover:text-white border border-white/15 hover:border-primary/50 shadow-black/40"
                  }`}
                >
                  <span>Explore Package Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-white" />
                </a>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
