"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "./ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

const plans = [
  {
    name: "Starter",
    description: "Perfect for single websites or small internal tools.",
    monthlyPrice: 99,
    oneTimePrice: 1999,
    features: [
      "Custom 5-page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Standard support",
      "Shared hosting included"
    ],
  },
  {
    name: "Growth",
    popular: true,
    description: "Ideal for growing businesses needing web apps & solid hosting.",
    monthlyPrice: 299,
    oneTimePrice: 4999,
    features: [
      "Full web application (SaaS/Dashboard)",
      "Database architecture",
      "API integration",
      "Priority 24/7 support",
      "VPS hosting included"
    ],
  },
  {
    name: "Enterprise",
    description: "Complete digital transformation with on-premise solutions.",
    monthlyPrice: 899,
    oneTimePrice: 14999,
    features: [
      "Complex custom software (ERP/POS)",
      "Local cPanel/WHM setup",
      "Dedicated account manager",
      "Advanced security & backups",
      "Custom SLA & infrastructure"
    ],
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

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
          
          <m.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-text-muted'}`}>One-time Build</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-white/10 p-1 relative transition-colors focus:outline-none"
            >
              <m.div 
                className="w-6 h-6 rounded-full bg-primary"
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-text-muted'}`}>Monthly Retainer</span>
          </m.div>
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-text-muted mb-6 min-h-[40px]">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-display font-bold text-white">
                  ${isAnnual ? plan.monthlyPrice : plan.oneTimePrice}
                </span>
                <span className="text-text-muted">
                  {isAnnual ? "/mo" : " one-time"}
                </span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
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
