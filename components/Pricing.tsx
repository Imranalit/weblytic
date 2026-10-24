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
