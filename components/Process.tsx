"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";
import { Search, PenTool, Terminal, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "1. Discover",
    description: "We analyze your requirements, target audience, and business goals to map out the perfect solution."
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "2. Design",
    description: "Creating wireframes and high-fidelity mockups focusing on user experience and conversion."
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "3. Develop",
    description: "Writing clean, scalable code using modern frameworks to bring the designs to life."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "4. Deploy",
    description: "Setting up hosting, domains, and deploying your project to production with zero downtime."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            How We <span className="text-gradient">Work</span>
          </m.h2>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          <m.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary-gradient -translate-x-1/2 origin-top hidden md:block"
            style={{ scaleY }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <m.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 w-full md:text-right">
                  {i % 2 === 0 ? (
                    <div className="glass-card p-6 md:text-left">
                      <h3 className="text-2xl font-display font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-text-muted">{step.description}</p>
                    </div>
                  ) : (
                    <div className="glass-card p-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-text-muted">{step.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary flex-shrink-0 mx-auto md:mx-0">
                  {step.icon}
                </div>
                
                <div className="flex-1 w-full hidden md:block" />
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
