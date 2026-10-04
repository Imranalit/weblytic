"use client";

import { useState } from "react";
import { m, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Pricing", href: "/#pricing" },
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
                className="text-text-muted hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a href="/#contact">
              <Button size="sm" className="gap-2 group">
                Get a Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
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
                  className="text-4xl font-display font-bold text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8">
                <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full">
                    Get a Quote
                  </Button>
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
