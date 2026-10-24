"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  children: React.ReactNode;
  /** Delay before shutter starts opening (ms). Default 350. */
  delay?: number;
};

export default function ShutterHero({ children, delay = 350 }: Props) {
  const reduceMotion = useReducedMotion();
  const [showShutter, setShowShutter] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Dev escape hatch: ?noShutter=1 skips the animation entirely
    const params = new URLSearchParams(window.location.search);
    if (params.get("noShutter") === "1") {
      setReady(true);
      return;
    }

    // Only play once per browser session
    const played = sessionStorage.getItem("weblytic-shutter-played");
    if (played === "1") {
      setReady(true);
      return;
    }

    // Skip entirely for reduced-motion users
    if (reduceMotion) {
      setReady(true);
      return;
    }

    // Gate to desktop only (>= 768px)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) {
      setReady(true);
      return;
    }

    setShowShutter(true);
  }, [reduceMotion]);

  // If we're not showing the shutter, render children immediately
  if (!showShutter) {
    return <>{children}</>;
  }

  return (
    <>
      {/* The actual hero content — always mounted, revealed underneath */}
      <div
        aria-hidden={!ready}
        className={ready ? "" : "pointer-events-none"}
      >
        {children}
      </div>

      {/* The shutter overlay */}
      <AnimatePresence>
        <motion.div
          key="shutter"
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Left panel */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-[#05060A]"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.5, ease: EASE, delay: delay / 1000 }}
            onAnimationComplete={() => {
              setReady(true);
              sessionStorage.setItem("weblytic-shutter-played", "1");
              setShowShutter(false);
            }}
          >
            {/* Thin seam on the inner edge */}
            <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
          </motion.div>

          {/* Right panel */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#05060A]"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: EASE, delay: delay / 1000 }}
          >
            <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
          </motion.div>

          {/* Centered brand mark — sits above both panels, fades as they split */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: delay / 1000 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-3xl tracking-tight text-white">
                Weblytic
              </span>
              <span className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,#6366F1,#8B5CF6)] animate-heartbeat" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
