"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Smartphone, Globe, LayoutDashboard, Plug,
  Layers, Rocket, Code2, Monitor, Users,
} from "lucide-react";
import { services, processSteps, whyWorkWithMe } from "../data/services";

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Globe, LayoutDashboard, Plug,
  Layers, Rocket, Code2, Monitor, Users,
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─────────────────────────────────────────────
// Development Process sub-component
// ─────────────────────────────────────────────
function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef,  { once: true, margin: "-60px" });
  const stepsInView  = useInView(sectionRef, { once: true, margin: "-80px" });

  // Scroll-driven progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.3"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Active-step tracking via IntersectionObserver
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-accent text-xs font-semibold uppercase tracking-[0.18em] mb-3"
          >
            How I Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, delay: 0.08, ease }}
            className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary tracking-tight"
          >
            Development Process
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Base line */}
          <div
            aria-hidden="true"
            className="absolute left-[18px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-border-color/60"
          />

          {/* Scroll-driven accent progress line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[18px] sm:left-1/2 sm:-translate-x-px top-0 w-px origin-top"
            style={{
              height: lineHeight,
              background: "rgba(59,130,246,0.65)",
              boxShadow: "0 0 6px rgba(59,130,246,0.35)",
            }}
          />

          <div className="space-y-0">
            {processSteps.map((step, i) => {
              const isEven  = i % 2 === 0;
              const isActive = activeStep === i;

              return (
                <motion.div
                  key={step.step}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.48, delay: 0.15 + i * 0.1, ease }}
                  className={`relative flex items-start pb-8 last:pb-0 sm:pb-10 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Mobile dot */}
                  <div className="sm:hidden flex flex-col items-center shrink-0 mr-5">
                    <motion.div
                      animate={
                        isActive
                          ? { scale: 1.08, boxShadow: "0 0 0 3px rgba(59,130,246,0.18), 0 0 14px rgba(59,130,246,0.22)" }
                          : { scale: 1,    boxShadow: "none" }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center z-10 relative transition-colors duration-250 ${
                        isActive
                          ? "bg-accent/15 border-2 border-accent/70"
                          : "bg-card border-2 border-accent/35"
                      }`}
                    >
                      <span className={`text-xs font-bold transition-colors duration-250 ${
                        isActive ? "text-accent" : "text-accent/60"
                      }`}>{step.step}</span>
                    </motion.div>
                  </div>

                  {/* Desktop dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-1 z-10">
                    <motion.div
                      animate={
                        isActive
                          ? { scale: 1.08, boxShadow: "0 0 0 4px rgba(59,130,246,0.14), 0 0 16px rgba(59,130,246,0.26)" }
                          : { scale: 1,    boxShadow: "none" }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-250 ${
                        isActive
                          ? "bg-accent/15 border-2 border-accent/70"
                          : "bg-bg border-2 border-accent/35"
                      }`}
                    >
                      <span className={`text-xs font-bold transition-colors duration-250 ${
                        isActive ? "text-accent" : "text-accent/60"
                      }`}>{step.step}</span>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 min-w-0 sm:w-[calc(50%-2.75rem)] ${
                    isEven ? "sm:pr-14" : "sm:pl-14 sm:ml-auto"
                  }`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      animate={
                        isActive
                          ? { boxShadow: "0 0 0 1px rgba(59,130,246,0.22), 0 8px 24px rgba(59,130,246,0.07)" }
                          : { boxShadow: "none" }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`relative overflow-hidden p-4 rounded-xl border transition-colors duration-250 ${
                        isActive
                          ? "bg-card border-accent/30"
                          : "bg-card border-border-color hover:border-accent/25"
                      }`}
                    >
                      {/* Top accent line — visible when active */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 top-0 h-px transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.55), transparent)",
                        }}
                      />
                      <h3 className={`font-bold text-sm mb-1 transition-colors duration-250 ${
                        isActive ? "text-text-primary" : "text-text-primary/80"
                      }`}>{step.title}</h3>
                      <p className="text-text-secondary text-xs leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Desktop spacer */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main Services export
// ─────────────────────────────────────────────
export default function Services() {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-60px" });

  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Services ── */}
      <section id="services" className="section-padding relative bg-bg-secondary overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            color: "var(--accent)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
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
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary mb-3 tracking-tight">
              What I Can Build
            </h2>
            <p className="text-text-secondary text-[15px] max-w-lg mx-auto leading-relaxed">
              End-to-end development services for businesses and individuals.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col p-6 rounded-2xl border border-white/[0.07]
                             bg-gradient-to-b from-card to-card/70
                             transition-[border-color,box-shadow] duration-300
                             hover:border-accent/30 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.25)]"
                >
                  <span
                    className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <motion.div
                    whileHover={{ rotate: 4, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-11 h-11 rounded-xl mb-4 shrink-0 flex items-center justify-center
                               bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/10"
                  >
                    <Icon size={20} className="text-accent" />
                  </motion.div>
                  <h3 className="font-bold text-text-primary text-base mb-2">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.highlights.map((h, hi) => (
                      <span
                        key={h}
                        className={
                          hi === 0
                            ? "px-2.5 py-1 text-xs font-medium rounded-md border border-accent/25 bg-accent/10 text-accent"
                            : "px-2.5 py-1 text-xs rounded-md border border-border-color bg-card-elevated text-text-muted"
                        }
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
      <ProcessTimeline />

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
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary tracking-tight">
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
                  whileHover={{ y: -3 }}
                  className="flex gap-4 p-5 rounded-xl border border-white/[0.07] bg-gradient-to-b from-card to-card/70
                             hover:border-accent/25 hover:shadow-[0_16px_40px_-18px_rgba(59,130,246,0.22)] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
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