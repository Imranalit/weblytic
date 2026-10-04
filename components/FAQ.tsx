"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { allFaqs } from "@/lib/faqs";

const categories = [
  { id: "all", label: "All Questions" },
  { id: "pos", label: "Offline POS & Software" },
  { id: "whatsapp", label: "WhatsApp AI Bots" },
  { id: "cpanel", label: "Local cPanel & Servers" },
  { id: "web", label: "Web Development" },
  { id: "hosting", label: "Hosting & Emails" },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 relative z-10 bg-elevated/30 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4"
          >
            <HelpCircle size={14} />
            <span>Search & Support Center</span>
          </m.div>

          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-text-muted text-base max-w-xl mx-auto"
          >
            Get clear, upfront answers regarding pricing, offline software, WhatsApp AI bots, hosting, and migrations.
          </m.p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., POS pricing, WhatsApp bot, cPanel)..."
            className="w-full bg-background/80 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/60"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white/5 text-text-muted hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3.5"
        >
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-text-muted text-sm">
              No questions found matching "{searchQuery}". Ask Konain in the chat!
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <m.div 
                  key={i} 
                  variants={fadeUp} 
                  className={`glass-card overflow-hidden transition-colors border ${
                    isOpen ? "border-primary/40 bg-elevated/60" : "border-white/5"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none gap-4"
                  >
                    <span className="font-medium text-base text-white leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-primary text-white rotate-180" : "bg-white/5 text-text-muted"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-text-muted leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })
          )}
        </m.div>

        <div className="mt-10 text-center">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all group hover:border-primary/40 shadow-lg shadow-black/20"
          >
            <span>Browse Full Dedicated FAQ Hub & Search</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}
