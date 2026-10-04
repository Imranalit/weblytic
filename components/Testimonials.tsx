"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    quote: "Weblytic delivered our custom POS system weeks ahead of schedule. The offline capability means we never stop taking orders, even when the internet drops.",
    name: "Sarah Jenkins",
    role: "Founder, Urban Roast",
    initials: "SJ"
  },
  {
    quote: "Switching to their local cPanel setup gave us complete control over our data. The performance difference is night and day, and their support is unmatched.",
    name: "Michael Chen",
    role: "CTO, DataSecure Inc.",
    initials: "MC"
  },
  {
    quote: "They didn't just build a website; they built a conversion engine. Our sales increased by 140% within the first month of launching the new site.",
    name: "Elena Rodriguez",
    role: "Marketing Director, Bloom",
    initials: "ER"
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
