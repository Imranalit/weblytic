"use client";

import { m } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const projects = [
  {
    title: "Retail POS System",
    category: "Offline Software",
    tags: ["Electron", "React", "Local DB"],
    color: "from-blue-600/40 to-cyan-600/40"
  },
  {
    title: "Inventory Dashboard",
    category: "SaaS Web App",
    tags: ["Next.js", "Supabase", "Tailwind"],
    color: "from-purple-600/40 to-pink-600/40"
  },
  {
    title: "Corporate Website",
    category: "Web Development",
    tags: ["Astro", "Framer Motion", "CMS"],
    color: "from-emerald-600/40 to-teal-600/40"
  },
  {
    title: "Local cPanel Setup",
    category: "Infrastructure",
    tags: ["CentOS", "WHM", "On-Premise"],
    color: "from-orange-600/40 to-red-600/40"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Recent <span className="text-gradient">Work</span>
          </m.h2>
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Explore a selection of our latest projects across custom software, web development, and hosting setups.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="glass-card overflow-hidden relative aspect-video flex flex-col justify-end p-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Case Study
                  </span>
                </div>
                
                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="text-primary font-medium text-sm mb-2">{project.category}</div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
