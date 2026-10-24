"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeUp } from "@/lib/motion";
import { Search, PenTool, Terminal, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "1. Discover",
    description:
      "We analyze your requirements, target audience, and business goals to map out the perfect solution.",
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "2. Design",
    description:
      "Creating wireframes and high-fidelity mockups focusing on user experience and conversion.",
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "3. Develop",
    description:
      "Writing clean, scalable code using modern frameworks to bring the designs to life with top-tier performance.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "4. Deploy",
    description:
      "Setting up hosting, domains, and deploying your project to production with zero downtime.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap ?? gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      ctx = gsap.context(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const counter = counterRef.current;
        if (!section || !track || !counter) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length !== steps.length || circles.length !== steps.length) return;

        const totalSteps = steps.length;
        // Distance one card travels per step = 100vw (each card is full viewport width)
        const stepWidth = window.innerWidth;

        // Initial state: card 0 active, others dimmed. Track at 0.
        gsap.set(track, { x: 0 });
        cards.forEach((card, i) => {
          gsap.set(card, {
            opacity: i === 0 ? 1 : 0.35,
            scale: i === 0 ? 1 : 0.92,
            filter: i === 0 ? "blur(0px)" : "blur(3px)",
          });
        });
        circles.forEach((circle, i) => {
          gsap.set(circle, {
            backgroundColor: i === 0 ? "#6366F1" : "rgb(5,6,10)",
            color: i === 0 ? "#FFFFFF" : "#6366F1",
            scale: i === 0 ? 1.1 : 1,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // 1 step of scroll per card + 1 viewport pause before releasing the pin
            end: `+=${totalSteps * 100 + 100}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate track horizontally across all steps
        tl.to(
          track,
          {
            x: -(totalSteps - 1) * stepWidth,
            ease: "none",
            duration: totalSteps,
          },
          0
        );

        // Per step: fade current in, fade previous out
        steps.forEach((_, i) => {
          if (i === 0) return;

          const prevCard = cards[i - 1];
          const currCard = cards[i];
          const prevCircle = circles[i - 1];
          const currCircle = circles[i];

          tl.to(
            prevCard,
            {
              opacity: 0.35,
              scale: 0.92,
              filter: "blur(3px)",
              ease: "power2.out",
              duration: 0.4,
            },
            i - 0.15
          );
          tl.to(
            prevCircle,
            {
              backgroundColor: "rgb(5,6,10)",
              color: "#6366F1",
              scale: 1,
              ease: "power2.out",
              duration: 0.4,
            },
            i - 0.15
          );

          tl.to(
            currCard,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 0.4,
            },
            i
          );
          tl.to(
            currCircle,
            {
              backgroundColor: "#6366F1",
              color: "#FFFFFF",
              scale: 1.1,
              ease: "power2.out",
              duration: 0.4,
            },
            i
          );

          tl.call(
            () => {
              counter.textContent = `0${i + 1} / 0${totalSteps}`;
            },
            undefined,
            i
          );
        });

        // Hold the last card on screen for ~25% of the pinned scroll
        // before releasing the pin. Consumes timeline duration without visual change.
        tl.to({}, { duration: 1 }, totalSteps);

        counter.textContent = `01 / 0${totalSteps}`;

        // Recompute stepWidth on resize
        ScrollTrigger.addEventListener("refreshInit", () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const st = (tl.scrollTrigger as any);
          if (!st) return;
          st.vars.end = `+=${totalSteps * 100 + 100}%`;
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen overflow-hidden"
    >
      <div className="h-full flex flex-col justify-center">
        <div className="text-center mb-12 shrink-0">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            How We <span className="text-gradient">Work</span>
          </m.h2>
          <div className="mt-4 text-sm font-mono text-text-muted tracking-widest">
            <span ref={counterRef} className="hidden lg:inline">
              01 / 04
            </span>
            <span className="lg:hidden">01 / 04</span>
          </div>
        </div>

        {/* Horizontal track — width = totalSteps * 100vw, translated by GSAP */}
        <div className="relative h-[60vh] flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
            style={{ width: `${steps.length * 100}vw` }}
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="w-screen flex items-center justify-center px-2 shrink-0"
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el as HTMLDivElement | null;
                  }}
                  className="w-full max-w-lg"
                >
                  <div
                    ref={(el) => {
                      circleRefs.current[i] = el as HTMLDivElement | null;
                    }}
                    className="mx-auto mb-6 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary"
                    style={{ willChange: "transform, background-color, color" }}
                  >
                    {step.icon}
                  </div>
                  <div className="glass-card p-8 text-center">
                    <h3 className="text-2xl font-display font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-muted">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion fallback: original vertical timeline */}
      <div className="lg:hidden absolute inset-0 bg-background overflow-y-auto py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-6">
              How We <span className="text-gradient">Work</span>
            </h2>
          </div>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div className="glass-card p-6 w-full text-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
