"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone, Globe, LayoutDashboard, Plug,
  Layers, Rocket, Code2, Monitor, Users,
} from "lucide-react";
import { services, processSteps, whyWorkWithMe } from "../data/services";

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Globe, LayoutDashboard, Plug,
  Layers, Rocket, Code2, Monitor, Users,
};

export default function Services() {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });

  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });

  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Services ── */}
      <section id="services" className="section-padding bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={servicesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              Services
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary mb-3">
              What I Can Build
            </h2>
            <p className="text-text-secondary text-[15px] max-w-lg mx-auto">
              End-to-end development services for businesses and individuals.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                  className="p-6 rounded-xl bg-card border border-border-color hover:border-accent/30 transition-colors duration-200 group flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/18 transition-colors shrink-0">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-bold text-text-primary text-base mb-2">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 text-xs bg-card-elevated border border-border-color text-text-muted rounded-md"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Development Process ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={processRef}
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              How I Work
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary">
              Development Process
            </h2>
          </motion.div>

          {/* Vertical timeline — works on all screen sizes */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-border-color" aria-hidden="true" />

            <div className="space-y-0">
              {processSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 16 }}
                    animate={processInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className={`relative flex items-start gap-6 pb-8 last:pb-0 sm:pb-10 ${
                      isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Mobile: left-aligned dot */}
                    <div className="sm:hidden flex flex-col items-center shrink-0">
                      <div className="w-9 h-9 rounded-full bg-card border-2 border-accent/40 flex items-center justify-center z-10 relative">
                        <span className="text-accent text-xs font-bold">{step.step}</span>
                      </div>
                    </div>

                    {/* Desktop: centered dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-0 z-10">
                      <div className="w-10 h-10 rounded-full bg-bg border-2 border-accent/40 flex items-center justify-center">
                        <span className="text-accent text-xs font-bold">{step.step}</span>
                      </div>
                    </div>

                    {/* Content — mobile always right of dot, desktop alternates */}
                    <div className={`flex-1 sm:w-[calc(50%-2.5rem)] ${isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:ml-auto"}`}>
                      <div className="p-4 rounded-xl bg-card border border-border-color">
                        <h3 className="font-semibold text-text-primary text-sm mb-1">{step.title}</h3>
                        <p className="text-text-muted text-xs leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden sm:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Work With Me ── */}
      <section className="section-padding bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={whyRef}
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              Why Choose Me
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary">
              Why Work With Me
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyWorkWithMe.map((item, i) => {
              const Icon = iconMap[item.icon] || Layers;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex gap-4 p-5 rounded-xl bg-card border border-border-color hover:border-accent/30 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm mb-1">{item.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
