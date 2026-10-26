"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, CheckCircle2, Globe, ShieldCheck, Zap, Bot, Database } from "lucide-react";

export default function HeroAnimation() {
  const [stage, setStage] = useState<"typing" | "ready" | "boom" | "website">("typing");
  const [typedLines, setTypedLines] = useState<number>(0);

  useEffect(() => {
    let active = true;
    let timeoutId: any = null;
    let intervalId: any = null;

    const runSequence = () => {
      if (!active) return;
      
      // Phase 1: Typing
      setStage("typing");
      setTypedLines(0);

      let line = 0;
      intervalId = setInterval(() => {
        if (!active) return;
        line += 1;
        setTypedLines(line);
        if (line >= 6) {
          clearInterval(intervalId);
        }
      }, 300);

      // Phase 2: Ready / Publish button
      timeoutId = setTimeout(() => {
        if (!active) return;
        setStage("ready");

        // Phase 3: Boom trigger
        timeoutId = setTimeout(() => {
          if (!active) return;
          setStage("boom");

          // Phase 4: Website reveal
          timeoutId = setTimeout(() => {
            if (!active) return;
            setStage("website");

            // Phase 5: Loop restart
            timeoutId = setTimeout(() => {
              if (!active) return;
              runSequence();
            }, 2600);
          }, 450);
        }, 1100);
      }, 2000);
    };

    runSequence();

    return () => {
      active = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const codeSnippets = [
    { text: 'import { HighPerformance } from "@weblytic";', color: "text-purple-400" },
    { text: 'const system = createWeblyticApp({', color: "text-blue-400" },
    { text: '  speed: "ultra-fast", // Next.js + cPanel', color: "text-cyan-300" },
    { text: '  tools: ["Offline POS", "Smart ERP"],', color: "text-emerald-400" },
    { text: '  aiBot: { status: "ready", model: "24/7" },', color: "text-amber-300" },
    { text: '  scale: "unlimited"', color: "text-pink-400" },
    { text: '}); await system.publish();', color: "text-white" },
  ];

  return (
    <div className="relative w-full h-[380px] sm:h-[410px] rounded-2xl bg-[#0B0F19]/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col font-mono will-change-transform">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 shadow-sm" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 shadow-sm" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 shadow-sm" />
          <span className="text-[10px] sm:text-[11px] text-text-muted font-sans ml-1 sm:ml-2 tracking-wide font-medium truncate max-w-[140px] sm:max-w-none">
            {stage === "website" ? "preview.weblytic.cc (Live)" : "weblytic-app.tsx"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] text-emerald-400/90 font-sans tracking-wide">
            {stage === "website" ? "LIVE ENGINE" : "ACTIVE"}
          </span>
        </div>
      </div>

      {/* Main Content Stage Area */}
      <div className="relative flex-1 p-4 sm:p-6 flex flex-col justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STAGE 1 & 2: CODE EDITOR & PUBLISH BUTTON */}
          {(stage === "typing" || stage === "ready" || stage === "boom") && (
            <m.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex flex-col justify-between"
            >
              {/* Code lines */}
              <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm font-mono leading-relaxed select-none overflow-hidden">
                {codeSnippets.map((snippet, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 sm:gap-3 transition-opacity duration-200 ${
                      idx <= typedLines ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-white/20 select-none text-[10px] sm:text-[11px] w-3.5 sm:w-4 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className={`${snippet.color} truncate`}>{snippet.text}</span>
                    {idx === typedLines && stage === "typing" && (
                      <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-primary animate-pulse align-middle shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Publish Button Pops In */}
              <AnimatePresence>
                {(stage === "ready" || stage === "boom") && (
                  <m.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: stage === "boom" ? 0.94 : 1,
                      opacity: 1,
                    }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="self-center mt-3 sm:mt-4 relative z-20"
                  >
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-success rounded-xl blur-md opacity-80" />
                      
                      <button
                        type="button"
                        className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans font-semibold text-xs sm:text-sm shadow-xl transition-all ${
                          stage === "boom" ? "brightness-125 ring-4 ring-white" : ""
                        }`}
                      >
                        <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Publish to Weblytic</span>
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
                      </button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Shockwave / BOOM particle burst */}
              {stage === "boom" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-30">
                  <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-primary/80 via-white to-secondary/80 blur-xl animate-ping" />
                  <div className="absolute w-48 h-48 rounded-full border border-cyan-400 scale-150 opacity-0 transition-all duration-300" />
                </div>
              )}
            </m.div>
          )}

          {/* STAGE 3: LIVE WEBSITE APPEARS */}
          {stage === "website" && (
            <m.div
              key="website"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full h-full flex flex-col justify-between font-sans select-none"
            >
              {/* Mini Browser Bar */}
              <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-lg px-2.5 sm:px-3 py-1.5 mb-2 sm:mb-3">
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-white font-medium text-[10px] sm:text-[11px] truncate">https://weblytic.cc</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-semibold shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Live in 0.4s</span>
                </div>
              </div>

              {/* Website Mockup Body */}
              <div className="space-y-2 sm:space-y-3">
                <div className="p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-r from-primary/20 via-purple-500/10 to-transparent border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">Weblytic Engine</span>
                    <span className="text-[9px] sm:text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 100% Score
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                    Next.js Sites, POS Systems & AI Bots
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-text-muted mt-1 line-clamp-1">
                    Zero monthly software fees, high-speed cPanel servers & tailor-made digital tools.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-primary/20 flex items-center justify-center text-primary mb-1">
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white">Ultra Fast</span>
                    <span className="text-[8px] sm:text-[9px] text-text-muted">High SEO</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-secondary/20 flex items-center justify-center text-secondary mb-1">
                      <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white">Offline POS</span>
                    <span className="text-[8px] sm:text-[9px] text-text-muted">Rs 0 Fees</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-success/20 flex items-center justify-center text-success mb-1">
                      <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white">AI Trained</span>
                    <span className="text-[8px] sm:text-[9px] text-text-muted">24/7 Live</span>
                  </div>
                </div>
              </div>

              {/* Bottom Operational Status Bar */}
              <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/5 text-[9px] sm:text-[10px] text-text-muted">
                <span className="flex items-center gap-1.5 text-white/80">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-success" /> Production Ready
                </span>
                <span className="font-mono text-cyan-300 truncate">Khairpur Mirs&apos; • Pakistan</span>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Background Glow behind the card */}
      <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
    </div>
  );
}
