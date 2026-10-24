"use client";

import { useState } from "react";
import Image from "next/image";
import { m, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "./ui/Button";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  return (
    <>
      <m.header
        className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className={`transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between ${
              isScrolled
                ? "glass-panel-glow border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                : "bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            }`}
          >
            {/* Logo & Brand with Original Heartbeat Dot */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  src="/weblytic-logo.webp"
                  alt="Weblytic Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Weblytic
              </span>
              <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1 animate-heartbeat" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all relative py-1 ${
                    link.name === "Careers"
                      ? "text-primary hover:text-primary-end font-bold animate-pulse"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.name === "Careers" && (
                    <span className="absolute -top-1.5 -right-2.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <ButtonLink href="/#contact" size="sm" className="gap-2 group shadow-md">
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </m.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-slate-900/95 backdrop-blur-2xl p-6 rounded-2xl border border-white/15 shadow-2xl flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-white/90 hover:text-primary py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-text-muted" />
              </a>
            ))}
            <ButtonLink
              href="/#contact"
              size="md"
              className="w-full mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </ButtonLink>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
