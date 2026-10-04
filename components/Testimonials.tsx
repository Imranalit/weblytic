"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote: "Weblytic customized and deployed the institutional Library Management System for our campus with remarkable stability. Student issuance, automated returns, and catalog indexing run flawlessly without server overhead.",
    name: "Engr. Tariq Mehmood",
    role: "Campus IT Incharge, IET Sukkur IBA University Khairpur",
    initials: "TM"
  },
  {
    quote: "Building Pdfnestor.com required intense document-processing speed and modern web architecture. Weblytic delivered a snappy, intuitive SaaS application that handles high-volume document workflows effortlessly.",
    name: "Bilal Ahmed Khan",
    role: "Product Co-Founder, Pdfnestor",
    initials: "BK"
  },
  {
    quote: "Their offline POS software completely modernized our retail operations across Sindh and Punjab. Zero monthly server fees, instant billing, and bulletproof offline reliability. Best software house in the region.",
    name: "Muhammad Usman Sheikh",
    role: "CEO, Al-Madina Wholesale & Retail",
    initials: "MU"
  },
  {
    quote: "The custom WhatsApp AI chatbot deployed by Weblytic has revolutionized our customer support. It handles product inquiries and customer quotes 24/7 without delays. Response times dropped to seconds!",
    name: "Zainab Fatima",
    role: "Managing Director, Noor Tech & Apparel",
    initials: "ZF"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass-card p-8 md:p-16 relative overflow-hidden"
        >
          <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-12" />
          
          <div className="relative min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonials[currentIndex].initials}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-text-muted">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
            <button onClick={prev} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-6 bg-primary" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
