"use client";

import { m } from "framer-motion";
import { Code2, Globe, Server, HardDrive, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Custom Software",
    description: "Tailor-made offline and online applications to streamline your business operations.",
    features: ["Offline POS & ERP tools", "SaaS platforms & portals", "Internal automation systems"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Web Development",
    description: "High-performance, SEO-optimized websites designed to convert visitors into customers.",
    features: ["Corporate websites", "E-commerce platforms", "Landing pages & portfolios"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Domains & Hosting",
    description: "Secure, reliable hosting solutions and domain management for your digital assets.",
    features: ["Cloud & VPS hosting", "SSL & business email", "Migration & DNS management"],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "Local cPanel Solutions",
    description: "On-premise hosting setups for maximum control and data privacy.",
    features: ["On-premise cPanel/WHM", "Automated backups", "Intranet & private cloud"],
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Core <span className="text-gradient">Services</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            We provide everything you need to build, host, and scale your digital presence from the ground up.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <m.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 relative group overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-elevated border border-white/10 flex items-center justify-center mb-6 ${service.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium group/link">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
