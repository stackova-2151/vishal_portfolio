"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Layers, Smartphone, Globe, Code2 } from "lucide-react";

const highlights = [
  { icon: Layers,     value: 5,  suffix: "+", label: "Domains",  sub: "Mobile, Web, Business, ERP, E-commerce" },
  { icon: Smartphone, value: 12, suffix: "+", label: "Projects", sub: "Production deployed applications" },
  { icon: Globe,      value: null, suffix: "", label: "Mobile + Web", sub: "Flutter & Next.js development" },
  { icon: Code2,      value: null, suffix: "", label: "End-to-End",   sub: "Frontend, backend, APIs & integrations" },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.52, delay, ease },
});

function CountUp({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(motionVal, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, value, motionVal]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* faint ambient glow, anchored behind the stat cards */}
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Text ── */}
          <div className="relative lg:pl-6">
            {/* decorative vertical accent bar anchoring the text block */}
            <span
              className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-accent/60 via-accent/15 to-transparent"
              aria-hidden="true"
            />

            <motion.p
              {...fadeUp(0.05)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              className="text-accent text-xs font-semibold uppercase tracking-widest mb-3"
            >
              About Me
            </motion.p>

            <motion.h2
              {...fadeUp(0.12)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary leading-tight tracking-tight mb-5"
            >
              Building Reliable<br />Digital Products
            </motion.h2>

            <div className="space-y-4 text-text-secondary text-[15px] leading-[1.75]">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.52, delay: 0.2, ease }}
                className="text-text-primary text-base leading-relaxed"
              >
                I&apos;m a Software &amp; Flutter Developer focused on building reliable, scalable and user friendly digital products.
              </motion.p>
              {[
                "My experience spans mobile applications, web platforms, admin dashboards and custom business management software. I work across frontend, backend, databases, APIs and third party integrations to deliver complete end to end solutions.",
                "Based in Pune, Maharashtra, I partner with clients and businesses to turn ideas into production ready applications whether it's a mobile app, a web platform, or a complex business management system.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.52, delay: 0.28 + i * 0.08, ease }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.52, delay: 0.5, ease }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(59,130,246,0.32)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={() => scrollTo("#contact")}
                className="px-5 py-2.5 bg-accent hover:bg-blue-500 text-white text-sm font-semibold rounded-lg
                           shadow-[0_4px_16px_rgba(59,130,246,0.18)] transition-colors duration-200"
              >
                Get in Touch
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={() => scrollTo("#projects")}
                className="px-5 py-2.5 bg-card border border-border-color hover:border-accent/40 hover:bg-card-elevated
                           text-text-primary text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                View Projects
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right: Highlight cards ── */}
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {highlights.map(({ icon: Icon, value, suffix, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.48, delay: 0.18 + i * 0.08, ease }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  boxShadow: "0 0 0 1px rgba(59,130,246,0.28), 0 12px 30px rgba(59,130,246,0.1)",
                }}
                className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-card to-card/70
                           border border-white/[0.07] hover:border-accent/30 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.4)]
                           transition-colors duration-250 group cursor-default"
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/10
                             flex items-center justify-center mb-3 transition-colors duration-250"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <Icon size={18} className="text-accent" />
                </motion.div>
                <div>
                  <div className="font-bold text-text-primary text-lg leading-tight mb-1">
                    {value !== null ? <CountUp value={value} suffix={suffix} start={inView} /> : label}
                  </div>
                  {value !== null && (
                    <div className="text-text-primary/80 text-xs font-medium mb-1">{label}</div>
                  )}
                  <div className="text-text-muted text-xs leading-relaxed">{sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}