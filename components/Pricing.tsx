"use client";

import { m } from "framer-motion";
import { Check, Info } from "lucide-react";
import { Button } from "./ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

const plans = [
  {
    name: "Offline Software",
    description: "Desktop tools requiring no server-base.",
    price: "5k - 7k",
    suffix: "PKR",
    features: [
      "Custom offline desktop applications",
      "Perfect for POS or local inventory",
      "No recurring server or hosting costs",
      "One-time setup fee",
    ],
    note: "Maintenance & changes incur additional charges after deployment."
  },
  {
    name: "Static Websites",
    popular: true,
    description: "Fast, responsive sites with free hosting.",
    price: "10k - 12k",
    suffix: "PKR",
    features: [
      "Custom static web pages",
      "Mobile responsive & SEO optimized",
      "Free hosting via Netlify or subdomains",
      "Blazing fast performance",
    ],
    note: "Maintenance & changes incur additional charges after deployment."
  },
  {
    name: "Domains & Hosting",
    description: "Complete local hosting & domain setup.",
    price: "8k - 10k",
    suffix: "PKR / yr",
    features: [
      "Average local hosting package",
      "Free domain registration included",
      "Business email setup",
      "Handled setup & configuration",
    ],
    note: "Prices subject to external providers (Hostinger, Namecheap, GoDaddy)."
  }
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
            Clear, upfront costs tailored for the Pakistani market.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
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
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-text-muted mb-6 min-h-[40px]">{plan.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-sm font-bold opacity-60">Rs</span>
                  <span className="text-4xl font-display font-bold">{plan.price}</span>
                </div>
                <span className="text-text-muted text-sm">
                  {plan.suffix} (Starting from)
                </span>
              </div>
              
              <ul className="space-y-4 mb-6 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="bg-background/50 border border-white/5 rounded-lg p-3 mb-8 flex gap-2 items-start">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted leading-relaxed">
                  {plan.note}
                </p>
              </div>
              
              <a href="#contact" className="w-full mt-auto">
                <Button 
                  variant={plan.popular ? "primary" : "secondary"} 
                  className="w-full"
                >
                  Get Started
                </Button>
              </a>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
