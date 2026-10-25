"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  children: React.ReactNode;
  /** Delay before shutter starts opening (ms). Default 350. */
  delay?: number;
};

export default function ShutterHero({ children, delay = 350 }: Props) {
  const reduceMotion = useReducedMotion();
  const [showShutter, setShowShutter] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dev escape hatch
    const params = new URLSearchParams(window.location.search);
    if (
      params.get("noShutter") === "1" ||
      sessionStorage.getItem("weblytic-shutter-played") === "1" ||
      reduceMotion
    ) {
      setShowShutter(false);
      setReady(true);
      return;
    }

    // Wait for the panels to slide (0.9s) + fade out delay (0.3s) + buffer
    const timer = setTimeout(() => {
      setReady(true); // Fade in the hero
      setShowShutter(false); // Trigger AnimatePresence exit
      try {
        sessionStorage.setItem("weblytic-shutter-played", "1");
      } catch {}
    }, 1200); // 900ms slide + 300ms buffer

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <>
      {/* Hero Content - fades in once panels are open */}
      <div
        className={`transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>

      {/* Shutter Overlay */}
      <AnimatePresence>
        {showShutter && (
          <m.div
            key="shutter"
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
            // This exit animation waits 0.9s (the slide duration) before fading out
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.9 } }}
          >
            {/* Left panel */}
            <m.div
              className="absolute inset-y-0 left-0 w-1/2 bg-[#05060A]"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.9, ease: EASE, delay: delay / 1000 }}
            >
              <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
            </m.div>

            {/* Right panel */}
            <m.div
              className="absolute inset-y-0 right-0 w-1/2 bg-[#05060A]"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, ease: EASE, delay: delay / 1000 }}
            >
              <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
            </m.div>

            {/* Centered brand mark */}
            <m.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: delay / 1000 }}
            >
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-3xl tracking-tight text-white">
                  Weblytic
                </span>
                <span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,#6366F1,#8B5CF6)] animate-heartbeat" />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
