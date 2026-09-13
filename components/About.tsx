"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Smartphone, Globe, Code2 } from "lucide-react";

const highlights = [
  {
    icon: Layers,
    label: "5+ Domains",
    sub: "Mobile, Web, Business, ERP, E-commerce",
  },
  {
    icon: Smartphone,
    label: "12+ Projects",
    sub: "Production-deployed applications",
  },
  {
    icon: Globe,
    label: "Mobile + Web",
    sub: "Flutter & Next.js development",
  },
  {
    icon: Code2,
    label: "End-to-End",
    sub: "Frontend, backend, APIs & integrations",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary leading-tight mb-5">
              Building Reliable<br />Digital Products
            </h2>
            <div className="space-y-4 text-text-secondary text-[15px] leading-relaxed">
              <p>
                I&apos;m a Full-Stack &amp; Flutter Developer focused on building reliable,
                scalable and user-friendly digital products.
              </p>
              <p>
                My experience spans mobile applications, web platforms, admin dashboards
                and custom business management software. I work across frontend, backend,
                databases, APIs and third-party integrations to deliver complete
                end-to-end solutions.
              </p>
              <p>
                Based in Pune, Maharashtra, I partner with clients and businesses to turn
                ideas into production-ready applications — whether it&apos;s a mobile app,
                a web platform, or a complex business management system.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("#contact")}
                className="px-5 py-2.5 bg-accent hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Get in Touch
              </button>
              <button
                onClick={() => scrollTo("#projects")}
                className="px-5 py-2.5 border border-border-color hover:border-accent/40 hover:bg-card text-text-primary text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                View Projects
              </button>
            </div>
          </motion.div>

          {/* Right: Highlight cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3"
          >
            {highlights.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.18 + i * 0.08 }}
                className="p-5 rounded-xl bg-card border border-border-color hover:border-accent/30 transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/18 transition-colors">
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="font-semibold text-text-primary text-sm leading-tight mb-1">
                  {label}
                </div>
                <div className="text-text-muted text-xs leading-relaxed">{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
