"use client";

import React, { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Send,
  MessageSquare,
  Layers,
  Clock,
  DollarSign,
  HelpCircle,
  Briefcase,
  Sliders,
} from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { packagesData } from "@/lib/pricingData";
import {
  primaryIntentOptions,
  addonOptions,
  timelineOptions,
  budgetOptions,
  packageCheckboxSlugs,
} from "@/lib/customQuoteOptions";

export default function CustomQuoteClient() {
  // STATE
  const [intent, setIntent] = useState<string>("");
  const [intentDetail, setIntentDetail] = useState<string>("");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // DERIVED: package list from packagesData (single source of truth)
  const packageChoices = packageCheckboxSlugs
    .map((s) => packagesData[s])
    .filter(Boolean);

  // SOFT ESTIMATE (never shown as a firm price)
  const estimate = useMemo(() => {
    let min = 0;
    let max = 0;
    for (const slug of selectedPackages) {
      const p = packagesData[slug];
      if (!p) continue;
      const num = parseInt(p.price.replace(/[^0-9]/g, ""), 10) || 0;
      min += num;
      max += num;
    }
    for (const key of selectedAddons) {
      const opt = addonOptions.find((a) => a.value === key);
      if (opt) {
        min += opt.band[0];
        max += opt.band[1];
      }
    }
    return { min, max };
  }, [selectedPackages, selectedAddons]);

  // TOGGLES
  function togglePackage(slug: string) {
    if (slug === "none") {
      setSelectedPackages([]);
      return;
    }
    setSelectedPackages((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function toggleAddon(value: string) {
    setSelectedAddons((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  // VALIDATION
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!intent) errs.intent = "Pick a primary intent.";
    if (intent === "mix" && !intentDetail.trim())
      errs.intentDetail = "Specify what you're mixing.";
    if (!timeline) errs.timeline = "Choose a timeline.";
    if (!budget) errs.budget = "Choose a budget range.";
    if (!name.trim()) errs.name = "Your name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email is required.";
    if (!details.trim()) errs.details = "Tell us a bit about the project.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // SUBMIT VIA EMAIL (mailto)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const selectedPkgLabels = selectedPackages
      .map((slug) => packagesData[slug]?.name || slug)
      .join(", ");

    const selectedAddonLabels = selectedAddons
      .map((key) => addonOptions.find((a) => a.value === key)?.label || key)
      .join(", ");

    const intentObj = primaryIntentOptions.find((i) => i.value === intent);
    const intentLabel = intentObj ? intentObj.label : intent;

    const timelineLabel =
      timelineOptions.find((t) => t.value === timeline)?.label || timeline;
    const budgetLabel =
      budgetOptions.find((b) => b.value === budget)?.label || budget;

    const subject = `Custom Quote — ${intentLabel}${
      estimate.max ? ` — est. $${estimate.min}–$${estimate.max}` : ""
    }`;

    const lines = [
      `Primary intent: ${intentLabel}${intent === "mix" ? ` — ${intentDetail}` : ""}`,
      `Packages: ${selectedPackages.length ? selectedPkgLabels : "None (fully custom)"}`,
      `Add-ons: ${selectedAddons.length ? selectedAddonLabels : "None"}`,
      `Timeline: ${timelineLabel}`,
      `Budget: ${budgetLabel}`,
      `Rough estimate (from scope): ${estimate.max ? `$${estimate.min}–$${estimate.max}` : "n/a"}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${org || "-"}`,
      `Team size: ${teamSize || "-"}`,
      "",
      `Details:`,
      details,
    ];

    const body = lines.join("\n");
    window.location.href = `mailto:hello@weblytic.cc?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  // SUBMIT VIA WHATSAPP FALLBACK
  function handleWhatsAppSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validate()) return;

    const selectedPkgLabels = selectedPackages
      .map((slug) => packagesData[slug]?.name || slug)
      .join(", ");

    const selectedAddonLabels = selectedAddons
      .map((key) => addonOptions.find((a) => a.value === key)?.label || key)
      .join(", ");

    const intentObj = primaryIntentOptions.find((i) => i.value === intent);
    const intentLabel = intentObj ? intentObj.label : intent;

    const timelineLabel =
      timelineOptions.find((t) => t.value === timeline)?.label || timeline;
    const budgetLabel =
      budgetOptions.find((b) => b.value === budget)?.label || budget;

    const whatsAppText =
      `*Custom Project Quote Request*\n\n` +
      `*Primary Intent:* ${intentLabel}${intent === "mix" ? ` (${intentDetail})` : ""}\n` +
      `*Base Packages:* ${selectedPackages.length ? selectedPkgLabels : "None (fully custom)"}\n` +
      `*Add-ons:* ${selectedAddons.length ? selectedAddonLabels : "None"}\n` +
      `*Timeline:* ${timelineLabel}\n` +
      `*Budget Range:* ${budgetLabel}\n` +
      `*Rough Scope Est.:* ${estimate.max ? `$${estimate.min}–$${estimate.max}` : "n/a"}\n\n` +
      `*Client Details:*\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Organization:* ${org || "N/A"}\n` +
      `*Team Size:* ${teamSize || "N/A"}\n\n` +
      `*Project Details:*\n${details}`;

    const encodedMessage = encodeURIComponent(whatsAppText);
    window.open(
      `https://wa.me/923131398796?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Top Breadcrumb */}
        <div className="mb-6">
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PACKAGES</span>
          </a>
        </div>

        {/* Section Header */}
        <div className="text-center mb-10">
          <m.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOM PROJECT SCOPING</span>
          </m.span>
          <m.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            Build Your <span className="text-gradient">Custom Quote</span>
          </m.h1>
          <m.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Mix packages, stack add-on capabilities, and share your project
            parameters. We will formulate a tailored architectural scope and response
            within 24 hours.
          </m.p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: PRIMARY INTENT */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold font-mono">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                What are you looking to build?
              </h2>
            </div>
            <p className="text-xs text-text-muted mb-5 ml-8.5">
              Select the primary foundation that best aligns with your objective.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {primaryIntentOptions.map((opt) => {
                const isSelected = intent === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => {
                      setIntent(opt.value);
                      if (errors.intent) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.intent;
                          return next;
                        });
                      }
                    }}
                    className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-[0_0_15px_rgba(99,102,241,0.25)] text-white"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-white/30 bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium leading-snug">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {errors.intent && (
              <p className="text-xs text-red-400 mt-2">{errors.intent}</p>
            )}

            {/* Conditional input when 'mix' is selected */}
            {intent === "mix" && (
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                <label
                  htmlFor="intentDetail"
                  className="text-xs font-medium text-slate-300 block"
                >
                  Please specify what capabilities you are mixing:
                </label>
                <input
                  id="intentDetail"
                  type="text"
                  value={intentDetail}
                  onChange={(e) => {
                    setIntentDetail(e.target.value);
                    if (errors.intentDetail) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.intentDetail;
                        return next;
                      });
                    }
                  }}
                  placeholder="e.g. Next.js SaaS portal with WhatsApp AI assistant and client cPanel backend"
                  className={`w-full bg-background border ${
                    errors.intentDetail ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors`}
                />
                {errors.intentDetail && (
                  <p className="text-xs text-red-400">{errors.intentDetail}</p>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: BASE PACKAGES */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold font-mono">
                  2
                </span>
                <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                  Base Packages <span className="text-xs text-text-muted font-normal">(Optional)</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => togglePackage("none")}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  selectedPackages.length === 0
                    ? "bg-white/10 border-white/20 text-white font-medium"
                    : "border-white/5 text-text-muted hover:text-white"
                }`}
              >
                None — build fully custom
              </button>
            </div>
            <p className="text-xs text-text-muted mb-5 ml-8.5">
              Select any pre-engineered base modules you would like to include in this deployment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {packageChoices.map((pkg) => {
                const isSelected = selectedPackages.includes(pkg.slug);
                return (
                  <button
                    type="button"
                    key={pkg.slug}
                    onClick={() => togglePackage(pkg.slug)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-[0_0_15px_rgba(99,102,241,0.22)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-text-muted border border-white/10">
                          {pkg.badge}
                        </span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-primary bg-primary text-white"
                              : "border-white/30 bg-transparent"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <h3 className="text-sm font-display font-bold text-white mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                        {pkg.tagline}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-baseline gap-1 text-white">
                      <span className="text-sm font-bold font-mono text-primary">
                        {pkg.price}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {pkg.suffix}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: ADD-ON CAPABILITIES */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold font-mono">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                Add-on Capabilities
              </h2>
            </div>
            <p className="text-xs text-text-muted mb-5 ml-8.5">
              Select specific functional integrations or architectural modules needed for your build.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addonOptions.map((addon) => {
                const isSelected = selectedAddons.includes(addon.value);
                return (
                  <button
                    type="button"
                    key={addon.value}
                    onClick={() => toggleAddon(addon.value)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-[0_0_15px_rgba(99,102,241,0.2)] text-white"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">{addon.label}</span>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-white/30 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: TIMELINE */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold font-mono">
                4
              </span>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                Target Timeline
              </h2>
            </div>
            <p className="text-xs text-text-muted mb-5 ml-8.5">
              When would you like this project delivered and launched?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timelineOptions.map((opt) => {
                const isSelected = timeline === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => {
                      setTimeline(opt.value);
                      if (errors.timeline) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.timeline;
                          return next;
                        });
                      }
                    }}
                    className={`p-3.5 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-[0_0_15px_rgba(99,102,241,0.22)] text-white font-semibold"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            {errors.timeline && (
              <p className="text-xs text-red-400 mt-2">{errors.timeline}</p>
            )}
          </div>

          {/* SECTION 5: BUDGET */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold font-mono">
                5
              </span>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                Investment Budget
              </h2>
            </div>
            <p className="text-xs text-text-muted mb-5 ml-8.5">
              Help us understand your anticipated budget range so we can engineer the optimal scope.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {budgetOptions.map((opt) => {
                const isSelected = budget === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => {
                      setBudget(opt.value);
                      if (errors.budget) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.budget;
                          return next;
                        });
                      }
                    }}
                    className={`p-3.5 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-[0_0_15px_rgba(99,102,241,0.22)] text-white font-semibold"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            {errors.budget && (
              <p className="text-xs text-red-400 mt-2">{errors.budget}</p>
            )}
          </div>

          {/* SECTION 6: CONTACT & PROJECT DETAILS */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold font-mono">
                6
              </span>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                Contact &amp; Project Brief
              </h2>
            </div>
            <p className="text-xs text-text-muted mb-6 ml-8.5">
              Where should we send the scoped breakdown and timeline?
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-white">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    placeholder="John Doe"
                    className={`w-full bg-background border ${
                      errors.name ? "border-red-500" : "border-white/10"
                    } rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400">{errors.name}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-white">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }}
                    placeholder="john@example.com"
                    className={`w-full bg-background border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="org" className="text-xs font-medium text-white">
                    Organization / Company
                  </label>
                  <input
                    id="org"
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Acme Corp LLC"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="teamSize" className="text-xs font-medium text-white">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Select team size</option>
                    <option value="1 (Solo Founder)">1 (Solo Founder)</option>
                    <option value="2-10">2 - 10 members</option>
                    <option value="11-50">11 - 50 members</option>
                    <option value="50+">50+ members</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="details" className="text-xs font-medium text-white">
                    Project Details &amp; Objectives <span className="text-red-400">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-text-muted">
                    {details.length} characters
                  </span>
                </div>
                <textarea
                  id="details"
                  rows={4}
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                    if (errors.details) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.details;
                        return next;
                      });
                    }
                  }}
                  placeholder="Outline key workflows, target audience, reference sites or integrations you have in mind..."
                  className={`w-full bg-background border ${
                    errors.details ? "border-red-500" : "border-white/10"
                  } rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                />
                {errors.details && (
                  <span className="text-xs text-red-400">{errors.details}</span>
                )}
              </div>
            </div>
          </div>

          {/* SOFT ESTIMATE & SUBMIT SECTION */}
          <div className="pt-2">
            {estimate.max > 0 && (
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4 flex items-center justify-between">
                <p className="text-xs sm:text-sm text-text-muted">
                  Rough starting point based on your selections:{" "}
                  <strong className="text-white font-mono">
                    ${estimate.min}–${estimate.max}
                  </strong>{" "}
                  <span className="text-text-muted/80">(not a firm quote)</span>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-primary-gradient hover:opacity-95 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer text-sm sm:text-base"
              >
                <Send className="w-5 h-5" />
                <span>Submit Quote Request via Email</span>
              </button>
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-success hover:bg-success/90 shadow-lg shadow-success/20 transition-all duration-200 cursor-pointer text-sm sm:text-base"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Submit via WhatsApp</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </LazyMotion>
  );
}
