"use client";

import { useState } from "react";
import { m, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button, ButtonLink } from "./ui/Button";

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
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <m.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              Weblytic
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1 animate-heartbeat" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  link.name === "Careers" 
                    ? "text-primary hover:text-primary-end animate-pulse font-bold" 
                    : "text-text-muted hover:text-white"
                }`}
              >
                {link.name}
                {link.name === "Careers" && (
                  <span className="absolute -top-1.5 -right-3 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
              </a>
            ))}
            <ButtonLink href="/#contact" size="sm" className="gap-2 group">
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ButtonLink>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </m.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background p-6 flex flex-col"
          >
            <div className="flex justify-end">
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-4xl font-display font-bold transition-colors relative inline-block w-fit ${
                    link.name === "Careers"
                      ? "text-primary animate-pulse"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {link.name}
                  {link.name === "Careers" && (
                    <span className="absolute top-0 -right-6 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </a>
              ))}
              <div className="mt-8">
                <ButtonLink href="/#contact" size="lg" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Get a Quote
                </ButtonLink>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
