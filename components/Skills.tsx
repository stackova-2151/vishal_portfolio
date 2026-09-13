"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Server, Database, Plug, Wrench } from "lucide-react";
import { skillCategories } from "../data/skills";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Smartphone,
  Server,
  Database,
  Plug,
  Wrench,
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary mb-3">
            Skills &amp; Technologies
          </h2>
          <p className="text-text-secondary text-[15px] max-w-lg mx-auto">
            Technologies I use to build production-ready applications across mobile, web and backend.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Monitor;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="p-5 rounded-xl bg-card border border-border-color hover:border-accent/30 transition-colors duration-200 group"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/18 transition-colors">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm">{cat.title}</h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium bg-card-elevated border border-border-color text-text-secondary rounded-md hover:border-accent/25 hover:text-text-primary transition-colors duration-150"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
