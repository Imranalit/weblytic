"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  Mail, 
  Server, 
  Monitor, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Footer from "@/components/Footer";
import { allFaqs, FAQItem } from "@/lib/faqs";

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "pos", label: "Offline POS & Software", icon: Monitor },
  { id: "whatsapp", label: "WhatsApp AI Bots", icon: MessageSquare },
  { id: "cpanel", label: "Local cPanel & Servers", icon: Server },
  { id: "web", label: "Web Development", icon: Globe },
  { id: "hosting", label: "Hosting & Emails", icon: ShieldCheck },
];

const categoryLabels: Record<string, string> = {
  pos: "Offline POS & Software",
  whatsapp: "WhatsApp AI Bots",
  cpanel: "Local cPanel & Servers",
  web: "Web Development",
  hosting: "Hosting & Emails",
};

export default function FAQClient() {
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

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return allFaqs.length;
    return allFaqs.filter((f) => f.category === catId).length;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              Weblytic
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1 animate-heartbeat" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-text-muted">
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-text-muted mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Frequently Asked Questions</span>
          </div>

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Knowledge & Help Center</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>

            <p className="text-text-muted text-base md:text-lg leading-relaxed">
              Transparent, upfront answers to common questions about offline POS desktop software, 
              official WhatsApp AI chatbots, on-premise cPanel intranet servers, and custom web development.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(0);
              }}
              placeholder="Search across all questions (e.g. POS price, WhatsApp bot, cPanel, email)..."
              className="w-full bg-elevated/80 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-sm md:text-base text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/60 shadow-lg shadow-black/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-white bg-white/10 rounded-full px-2 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = getCategoryCount(cat.id);
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(0);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border border-primary/50"
                      : "bg-elevated/60 text-text-muted hover:text-white hover:bg-elevated border border-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-white/5 text-text-muted"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Questions Result Count */}
          <div className="flex items-center justify-between text-xs text-text-muted mb-6 px-2">
            <span>
              Showing <strong className="text-white">{filteredFaqs.length}</strong> of {allFaqs.length} questions
              {activeCategory !== "all" && ` in ${categoryLabels[activeCategory]}`}
            </span>
            {searchQuery && (
              <span>
                Search results for <span className="text-primary italic">"{searchQuery}"</span>
              </span>
            )}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 mb-16">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-elevated/40 rounded-2xl border border-white/5">
                <HelpCircle className="w-12 h-12 text-text-muted/40 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">No matching questions found</h3>
                <p className="text-text-muted text-sm max-w-md mx-auto mb-6">
                  We could not find any FAQ matching "{searchQuery}". You can speak with our founder directly on WhatsApp right now.
                </p>
                <a
                  href="https://wa.me/923131398796?text=Hello%20Weblytic,%20I%20have%20a%20question%20regarding%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-900/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Us on WhatsApp
                </a>
              </div>
            ) : (
              filteredFaqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl transition-all duration-200 border ${
                      isOpen
                        ? "bg-elevated/90 border-primary/40 shadow-xl shadow-primary/5"
                        : "bg-elevated/40 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full px-6 py-5 flex items-start justify-between text-left focus:outline-none gap-4"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1.5">
                        <span className="inline-block text-[11px] font-semibold text-primary uppercase tracking-wider">
                          {categoryLabels[faq.category]}
                        </span>
                        <h3 className="font-display font-semibold text-base md:text-lg text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 transition-transform duration-300 ${
                          isOpen ? "bg-primary text-white rotate-180" : "bg-white/5 text-text-muted hover:text-white"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm md:text-base text-text-muted leading-relaxed border-t border-white/5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-slate-300">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Still Have Questions CTA */}
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-elevated to-background border border-primary/20 p-8 md:p-10 text-center relative overflow-hidden mb-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                Have a specific question not listed here?
              </h2>
              <p className="text-text-muted text-sm md:text-base">
                Whether you need a custom quote, technical consultation on your POS hardware, or want to test an AI chatbot demo, we are here to assist.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/923131398796?text=Hi%20Weblytic,%20I%20have%20a%20project%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-900/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp (+92 313 1398796)
                </a>
                <a
                  href="mailto:weblytic.cc@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/10 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Email Founder
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
