"use client";

import { m } from "framer-motion";
import { Button, ButtonLink } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const headlineWords = "Build. Host. Scale. — All in One Place.".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Aurora / Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen"
        />
        <m.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <m.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="inline-flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 text-5xl md:text-7xl font-display font-bold mb-6"
            >
              {headlineWords.map((word, i) => (
                <m.span
                  key={i}
                  variants={fadeUp}
                  className={i < 3 ? "text-gradient" : "text-white"}
                >
                  {word}
                </m.span>
              ))}
            </m.h1>

            <m.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              End-to-end digital solutions for modern businesses. We engineer custom offline POS software, design high-speed Next.js websites, configure local cPanel servers, and deploy AI chatbots across Pakistan.
            </m.p>

            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto gap-2 group">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink href="#services" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Services
              </ButtonLink>
            </m.div>

            {/* Trust Bar */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-16 pt-8 border-t border-white/5"
            >
              <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-6">
                Trusted by innovative businesses & institutions
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                <div className="font-display font-bold text-xl">Pdfnestor</div>
                <div className="font-display font-bold text-xl">Sukkur IBA University</div>
                <div className="font-display font-bold text-xl">Retail POS Clients</div>
              </div>
            </m.div>
          </div>

          {/* Floating UI Animation Mockup (Responsive for Mobile & Desktop) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none perspective-1000 block mt-8 lg:mt-0">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: -3, rotateX: 3, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
              className="relative w-full"
            >
              <HeroAnimation />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
