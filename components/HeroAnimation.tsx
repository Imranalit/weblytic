"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, CheckCircle2, Globe, ShieldCheck, Zap, Bot, Database } from "lucide-react";

export default function HeroAnimation() {
  // Stages:
  // 0: "typing" (0ms - 2400ms)
  // 1: "ready" (publish button pops in and triggers click) (2400ms - 3500ms)
  // 2: "boom" (shockwave & particle burst) (3500ms - 4000ms)
  // 3: "website" (live website showcase) (4000ms - 6400ms)
  // 4: "reset" (transition back to start) (6400ms - 6800ms)
  const [stage, setStage] = useState<"typing" | "ready" | "boom" | "website">("typing");
  const [typedLines, setTypedLines] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const runLoop = () => {
      if (!isMounted) return;
      
      // Step 1: Start typing
      setStage("typing");
      setTypedLines(0);

      const lineInterval = setInterval(() => {
        setTypedLines((prev) => {
          if (prev < 6) return prev + 1;
          clearInterval(lineInterval);
          return prev;
        });
      }, 350);

      // Step 2: Show Publish button at 2.3s
      const readyTimer = setTimeout(() => {
        if (!isMounted) return;
        setStage("ready");
      }, 2300);

      // Step 3: Trigger BOOM at 3.4s
      const boomTimer = setTimeout(() => {
        if (!isMounted) return;
        setStage("boom");
      }, 3400);

      // Step 4: Reveal live website at 3.9s
      const websiteTimer = setTimeout(() => {
        if (!isMounted) return;
        setStage("website");
      }, 3900);

      // Step 5: Loop back at 6.8s
      const resetTimer = setTimeout(() => {
        if (!isMounted) return;
        runLoop();
      }, 6800);

      return () => {
        clearInterval(lineInterval);
        clearTimeout(readyTimer);
        clearTimeout(boomTimer);
        clearTimeout(websiteTimer);
        clearTimeout(resetTimer);
      };
    };

    const cleanup = runLoop();
    return () => {
      isMounted = false;
      if (cleanup) cleanup();
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
    <div className="relative w-full h-[410px] rounded-2xl bg-[#0B0F19]/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col font-mono">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
          <span className="text-[11px] text-text-muted font-sans ml-2 tracking-wide font-medium">
            {stage === "website" ? "preview.weblytic.cc (Live)" : "weblytic-app.tsx"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-emerald-400/90 font-sans tracking-wide">
            {stage === "website" ? "LIVE ENGINE" : "COMPILER ACTIVE"}
          </span>
        </div>
      </div>

      {/* Main Content Stage Area */}
      <div className="relative flex-1 p-6 flex flex-col justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STAGE 1 & 2: CODE EDITOR & PUBLISH BUTTON */}
          {(stage === "typing" || stage === "ready" || stage === "boom") && (
            <m.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex flex-col justify-between"
            >
              {/* Code lines */}
              <div className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed select-none">
                {codeSnippets.map((snippet, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: idx <= typedLines ? 1 : 0,
                      x: idx <= typedLines ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-white/20 select-none text-[11px] w-4 text-right">
                      {idx + 1}
                    </span>
                    <span className={snippet.color}>{snippet.text}</span>
                    {idx === typedLines && stage === "typing" && (
                      <m.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-primary align-middle"
                      />
                    )}
                  </m.div>
                ))}
              </div>

              {/* Publish Button Pops In */}
              <AnimatePresence>
                {(stage === "ready" || stage === "boom") && (
                  <m.div
                    initial={{ scale: 0.7, opacity: 0, y: 15 }}
                    animate={{
                      scale: stage === "boom" ? [1, 0.92, 1.1] : 1,
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="self-center mt-4 relative z-20"
                  >
                    <div className="relative group">
                      {/* Button glowing aura */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-success rounded-xl blur-md opacity-80 animate-pulse" />
                      
                      <button
                        type="button"
                        className={`relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans font-semibold text-sm shadow-xl transition-all ${
                          stage === "boom" ? "brightness-125 ring-4 ring-white" : ""
                        }`}
                      >
                        <Rocket className="w-4 h-4 animate-bounce" />
                        <span>Publish to Weblytic</span>
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Shockwave / BOOM particle burst */}
              {stage === "boom" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-30">
                  {/* Flash */}
                  <m.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.9, 0], scale: [0.5, 2.5] }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-primary/80 via-white to-secondary/80 blur-xl"
                  />
                  {/* Expanding Shockwave Ring */}
                  <m.div
                    initial={{ scale: 0.2, opacity: 1, borderWidth: "8px" }}
                    animate={{ scale: 3, opacity: 0, borderWidth: "1px" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute w-48 h-48 rounded-full border-cyan-400"
                  />
                </div>
              )}
            </m.div>
          )}

          {/* STAGE 3: LIVE WEBSITE APPEARS (THE "BOOM" REVEAL) */}
          {stage === "website" && (
            <m.div
              key="website"
              initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full flex flex-col justify-between font-sans select-none"
            >
              {/* Mini Browser Bar */}
              <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span className="text-white font-medium text-[11px]">https://weblytic.cc</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Deployed in 0.4s</span>
                </div>
              </div>

              {/* Website Mockup Body */}
              <div className="space-y-3">
                {/* Hero Banner in Mini Web */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-primary/20 via-purple-500/10 to-transparent border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Weblytic Live Preview</span>
                    <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> 100% Performance
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                    Next.js Sites, POS Systems & AI Chatbots
                  </h4>
                  <p className="text-[11px] text-text-muted mt-1 line-clamp-1">
                    Zero monthly software fees, high-speed cPanel servers & tailor-made digital tools.
                  </p>
                </div>

                {/* 3 Interactive Feature Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center text-primary mb-1">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">Ultra Fast</span>
                    <span className="text-[9px] text-text-muted">High SEO</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-7 h-7 rounded-md bg-secondary/20 flex items-center justify-center text-secondary mb-1">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">Offline POS</span>
                    <span className="text-[9px] text-text-muted">Zero Cloud Fees</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center text-center">
                    <div className="w-7 h-7 rounded-md bg-success/20 flex items-center justify-center text-success mb-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">AI Trained</span>
                    <span className="text-[9px] text-text-muted">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Bottom Operational Status Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-text-muted">
                <span className="flex items-center gap-1.5 text-white/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" /> Production Ready
                </span>
                <span className="font-mono text-cyan-300">Khairpur Mirs' • Pakistan</span>
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
