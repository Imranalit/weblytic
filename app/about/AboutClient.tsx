"use client";

import { m } from "framer-motion";
import { Users, Target, Shield, Zap, Code2, Server, Globe2 } from "lucide-react";

export default function AboutClient() {
  const whyChooseUs = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Client-Centric Approach",
      description: "We don't just write code; we solve business problems. Your goals dictate our strategy, ensuring maximum ROI."
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Precision & Performance",
      description: "Built with modern frameworks like Next.js and Tailwind, our solutions are lightning-fast and highly scalable."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Security First",
      description: "From on-premise deployments to cloud infrastructure, we prioritize your data security and privacy."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Rapid Delivery",
      description: "We utilize streamlined agile processes to deliver high-quality digital products on time, every time."
    }
  ];

  const ourExpertise = [
    {
      icon: <Globe2 className="w-5 h-5 text-primary" />,
      title: "Web Development",
      description: "Performant, SEO-optimized websites built to scale."
    },
    {
      icon: <Code2 className="w-5 h-5 text-primary" />,
      title: "Custom Software",
      description: "Tailored applications, POS systems, and offline solutions."
    },
    {
      icon: <Server className="w-5 h-5 text-primary" />,
      title: "Infrastructure",
      description: "Local cPanel, VPS hosting, and server management."
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-primary-gradient">Weblytic</span>
          </h1>
          <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            We are a digital agency based in Khairpur Mirs', Sindh, dedicated to providing 
            cutting-edge web development, custom software, and infrastructure solutions.
          </p>
        </m.div>

        {/* Our Story */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-2xl font-display font-bold text-white mb-6">Our Mission</h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              At Weblytic, we bridge the gap between traditional businesses and modern digital infrastructure. 
              Whether you are looking for an ultra-fast Next.js website, a reliable on-premise POS system, 
              or a sophisticated AI chatbot for WhatsApp, our goal is to empower your business with tools that just work.
            </p>
            <p>
              We believe that enterprise-grade technology shouldn't be restricted to massive corporations. 
              By leveraging the latest in open-source and modern web architectures, we deliver scalable, 
              secure, and highly performant solutions to businesses of all sizes across Pakistan and beyond.
            </p>
          </div>
        </m.div>

        {/* What We Do (Expertise) */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ourExpertise.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </m.div>

        {/* Why Choose Us */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-colors group">
                <div className="flex-shrink-0 mt-1 transform group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </m.div>

      </div>
    </div>
  );
}
