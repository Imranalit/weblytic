"use client";

import { useEffect, useState } from "react";
import { m, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
      window.addEventListener("mousemove", moveCursor);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      document.body.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <m.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full bg-primary/30 mix-blend-screen blur-[2px]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
