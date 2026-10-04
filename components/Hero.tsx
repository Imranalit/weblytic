"use client";

import { m } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Code, Layout, Server, HardDrive } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

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
              <a href="#contact">
                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </a>
            </m.div>

            {/* Trust Bar */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-16 pt-8 border-t border-white/5"
            >
              <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-6">
                Trusted by 50+ innovative businesses
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale">
                <div className="font-display font-bold text-xl">Acme Corp</div>
                <div className="font-display font-bold text-xl">Nexus</div>
                <div className="font-display font-bold text-xl">Vertex</div>
                <div className="font-display font-bold text-xl">Quantum</div>
              </div>
            </m.div>
          </div>

          {/* Floating UI Mockup */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none perspective-1000 hidden md:block">
            <m.div
              initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: -5, rotateX: 5, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
              className="glass-card p-4 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              <div className="bg-background/80 rounded-lg p-6 border border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-32 h-6 bg-white/10 rounded animate-pulse" />
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <Code className="text-primary w-6 h-6 mb-2" />
                    <div className="w-20 h-4 bg-white/10 rounded mb-2" />
                    <div className="w-12 h-6 bg-white/20 rounded" />
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <Layout className="text-secondary w-6 h-6 mb-2" />
                    <div className="w-24 h-4 bg-white/10 rounded mb-2" />
                    <div className="w-16 h-6 bg-white/20 rounded" />
                  </div>
                  <div className="bg-success/10 rounded-xl p-4 border border-success/20">
                    <Server className="text-success w-6 h-6 mb-2" />
                    <div className="w-16 h-4 bg-white/10 rounded mb-2" />
                    <div className="w-12 h-6 bg-white/20 rounded" />
                  </div>
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                    <HardDrive className="text-purple-400 w-6 h-6 mb-2" />
                    <div className="w-20 h-4 bg-white/10 rounded mb-2" />
                    <div className="w-14 h-6 bg-white/20 rounded" />
                  </div>
                </div>
                
                <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
