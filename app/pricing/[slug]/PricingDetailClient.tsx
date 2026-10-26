"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Flame,
  Layers,
  Cpu,
  ChevronDown,
  ArrowRight,
  Gift,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { PackageDetail } from "@/lib/pricingData";

export default function PricingDetailClient({ pkg }: { pkg: PackageDetail }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-1 pt-28 pb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            {/* Top Navigation / Breadcrumb */}
            <div className="mb-8">
              <a
                href="/#pricing"
                className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO ALL PRICING PLANS</span>
              </a>
            </div>

            {/* Hero Header Card */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`p-6 sm:p-10 rounded-3xl glass-card border relative overflow-hidden mb-12 ${
                pkg.popular
                  ? "border-primary/60 shadow-[0_0_40px_rgba(139,92,246,0.18)]"
                  : "border-white/10"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                      {pkg.badge}
                    </span>
                    {pkg.popular && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-gradient text-white shadow-sm">
                        ★ MOST POPULAR
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                    {pkg.name}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-muted font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Delivery: <strong className="text-white font-sans">{pkg.turnaround}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-sans font-medium">{pkg.guarantee.split(":")[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Block & Primary CTA */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-start lg:items-end justify-center min-w-[240px]">
                  <span className="text-xs uppercase font-mono tracking-wider text-text-muted mb-1">
                    Investment
                  </span>
                  <div className="flex items-baseline gap-1 text-white mb-1">
                    <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
                      {pkg.price}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted font-medium mb-5">
                    {pkg.suffix} • Transparent Scope
                  </span>

                  <ButtonLink
                    href={`/#contact?package=${encodeURIComponent(pkg.name)}`}
                    variant={pkg.popular ? "primary" : "secondary"}
                    size="lg"
                    className="w-full text-sm font-bold shadow-md gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </ButtonLink>
                </div>
              </div>
            </m.div>

            {/* Standout FREE Perks (High Attraction Section) */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-display font-bold text-white">
                  Included Free Perks &amp; Value Guarantees
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {pkg.freeHighlights.map((perk, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 flex items-center gap-3 text-sm font-semibold text-emerald-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Deliverables in 3 Categories */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold text-white">
                  Full Scope &amp; Deliverables
                </h2>
              </div>

              <div className="space-y-6">
                {pkg.deliverables.map((cat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4"
                  >
                    <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>{cat.category}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cat.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Architecture */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold text-white">
                  Technology Stack &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pkg.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                  >
                    <div className="text-sm font-display font-bold text-white mb-1">
                      {tech.name}
                    </div>
                    <div className="text-xs text-text-muted leading-relaxed">
                      {tech.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Delivery Process */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold text-white">
                  Step-by-Step Delivery Process
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pkg.process.map((step, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/5 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl font-mono font-black text-primary/40 mb-2">
                        {step.step}
                      </div>
                      <h3 className="text-sm font-display font-bold text-white mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Specific FAQs */}
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display font-bold text-white">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {pkg.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-white hover:text-primary transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-text-muted transition-transform duration-300 ${
                          openFaq === i ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-white/5 pt-3"
                        >
                          {faq.a}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Final CTA Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-primary/20 via-primary-end/20 to-transparent border border-primary/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Ready to launch your {pkg.name}?
                </h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  Transparent upfront investment with our verified guarantees. Get started in minutes.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <ButtonLink
                  href={`/#contact?package=${encodeURIComponent(pkg.name)}`}
                  variant="primary"
                  size="lg"
                  className="gap-2 font-bold shadow-lg"
                >
                  <span>Order Package</span>
                  <ArrowRight className="w-4 h-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
