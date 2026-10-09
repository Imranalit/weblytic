"use client";

import { m } from "framer-motion";
import { Zap, DollarSign, Shield } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Lightning Fast Delivery",
    description: "Ship in days, not months. Our optimized workflows ensure rapid deployment without compromising on quality.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    title: "Transparent Pricing",
    description: "No hidden fees, ever. You know exactly what you're paying for with our clear, upfront pricing models.",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Dedicated Support",
    description: "Real humans, real answers. We're here to ensure your infrastructure runs smoothly 24/7.",
  }
];

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(value);

  useEffect(() => {
    let start = 0;
    const end = parseInt(String(value).substring(0, 3));
    if (start === end) return;
    
    setCount(start);
    let totalMilSecDur = 2000;
    let incrementTime = (totalMilSecDur / end) * 2;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
};

export default function WhyUs() {
  return (
    <section className="py-24 bg-elevated/30 relative z-10 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
        >
          {features.map((feature, i) => (
            <m.div key={i} variants={fadeUp} className="text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-text-muted">{feature.description}</p>
            </m.div>
          ))}
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Projects Delivered", value: 50, suffix: "+" },
            { label: "Uptime SLA", value: 99, suffix: ".9%" },
            { label: "Support Response", value: 24, suffix: "h" },
            { label: "Client Satisfaction", value: 100, suffix: "%" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 glass-card">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-text-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
