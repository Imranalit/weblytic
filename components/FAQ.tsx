"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const faqs = [
  {
    question: "How long does a website or web app take to build?",
    answer: "A standard corporate website typically takes 2-4 weeks. Complex web applications or custom SaaS platforms can take 6-12 weeks depending on the required features and integrations."
  },
  {
    question: "Do you build offline desktop software?",
    answer: "Yes. We specialize in building robust offline desktop applications, such as POS systems and inventory tools, using technologies like Electron and Tauri."
  },
  {
    question: "Can you migrate my existing hosting?",
    answer: "Absolutely. We offer seamless migration services to move your website, databases, and emails to our high-performance hosting infrastructure with zero downtime."
  },
  {
    question: "What is local cPanel hosting?",
    answer: "Local cPanel hosting involves setting up a fully functional hosting environment on your own on-premise servers. This gives you complete control over your data, enhanced security, and the ability to run an intranet."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, all our growth and enterprise plans come with dedicated support, proactive monitoring, automated backups, and regular security updates."
  },
  {
    question: "What's included in the pricing?",
    answer: "Our pricing is transparent and all-inclusive. Depending on the tier, it covers design, development, initial SEO setup, hosting, and a designated support period. There are no hidden fees."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 bg-elevated/30 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Got <span className="text-gradient">Questions?</span>
          </m.h2>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <m.div key={i} variants={fadeUp} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-display font-bold text-lg text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-text-muted">
                      {faq.answer}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
