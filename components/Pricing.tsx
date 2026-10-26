"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Check, Sparkles, Flame, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { packagesData } from "@/lib/pricingData";

const plans = Object.values(packagesData);

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 relative z-10 bg-elevated/20 border-y border-white/5">
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
              key={plan.slug || i}
              variants={fadeUp}
              className={`relative glass-card p-5 lg:p-6 rounded-2xl h-full flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary/60 shadow-[0_0_30px_rgba(139,92,246,0.22)] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent"
                  : "border-white/10"
              }`}
            >
              {/* a) Badge pill */}
              <div className="h-6 mb-3 flex items-center">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-normal ${
                    plan.popular
                      ? "bg-primary-gradient text-white shadow-sm"
                      : "bg-white/10 text-white/90 border border-white/10"
                  }`}
                >
                  {plan.popular && <Flame className="w-3 h-3" />}
                  {plan.badge}
                </span>
              </div>

              {/* b) Name */}
              <h3 className="text-lg lg:text-xl font-display font-bold text-white mb-1 min-h-[3.5rem] flex items-start line-clamp-2">
                {plan.name}
              </h3>

              {/* c) Tagline */}
              <p className="text-xs text-text-muted mb-4 min-h-[2.5rem] line-clamp-2 leading-relaxed">
                {plan.tagline}
              </p>

              {/* d) Price block */}
              <div className="pb-4 mb-4 border-b border-white/10 flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl font-display font-bold text-white tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs text-text-muted">{plan.suffix}</span>
              </div>

              {/* e) Feature list */}
              <ul className="space-y-2 text-left mb-4">
                {plan.cardHighlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-primary/90">
                    <Check className="w-4 h-4 text-primary/80 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* f) Free banner & CTA button */}
              <div className="pt-3 border-t border-white/10 mt-auto">
                <div className="mb-3.5 flex items-center gap-2 px-2.5 py-2 rounded-xl text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                  <Flame className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="line-clamp-2">{plan.freeHighlightShort}</span>
                </div>

                <Link
                  href={`/pricing/${plan.slug}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md group ${
                    plan.popular
                      ? "bg-primary-gradient text-white shadow-primary/30 hover:shadow-primary/50 hover:brightness-110"
                      : "bg-white/10 text-white hover:bg-primary hover:text-white border border-white/15 hover:border-primary/50 shadow-black/40"
                  }`}
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-white" />
                </Link>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Custom Quote Footer */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-sm text-text-muted mb-3">Need something that doesn&apos;t fit a package?</p>
          <Link
            href="/custom-quote"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/40 transition-all"
          >
            <span>Build a Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
