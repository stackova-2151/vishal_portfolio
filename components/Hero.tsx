"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download, ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const codeLines = [
  { key: "name", value: '"Vishal More"', color: "text-amber-300" },
  { key: "mobile", value: '"Flutter"', color: "text-green-400" },
  { key: "web", value: '"Next.js"', color: "text-blue-400" },
  { key: "backend", value: '"Spring Boot"', color: "text-orange-400" },
  { key: "database", value: '"Firebase / MySQL"', color: "text-cyan-400" },
  { key: "location", value: '"Pune, India"', color: "text-purple-400" },
];

const techBadges = [
  { label: "Flutter", color: "text-blue-400" },
  { label: "Next.js", color: "text-text-secondary" },
  { label: "React", color: "text-cyan-400" },
  { label: "Spring Boot", color: "text-green-400" },
  { label: "Firebase", color: "text-amber-400" },
  { label: "Tailwind", color: "text-text-secondary" },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Subtle background glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(59,130,246,0.08) 0%, transparent 100%), radial-gradient(ellipse 40% 40% at 90% 15%, rgba(6,182,212,0.06) 0%, transparent 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="order-1">
            {/* Availability badge */}
            <motion.div {...fadeUp(0.05)} className="inline-flex mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-success/25 bg-success/8 text-success text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shrink-0" />
                Open to Work &amp; Freelance Projects
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              {...fadeUp(0.12)}
              className="font-extrabold text-text-primary leading-[1.1] tracking-tight mb-5"
            >
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                Full-Stack &amp;{" "}
                <span className="gradient-text">Flutter</span>
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                Developer
              </span>
              <span className="block mt-3 text-xl sm:text-2xl lg:text-2xl font-semibold text-text-secondary leading-snug">
                Turning Ideas into Production-Ready Applications
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.22)}
              className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              I&apos;m Vishal More, based in Pune, Maharashtra. I specialize in
              building production-ready mobile apps, modern web platforms, admin
              dashboards and custom business management solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
              >
                View My Work
                <ArrowRight size={15} />
              </button>
              <a
                href="https://drive.google.com/file/d/15t7kU0yGAm9coBJa46BUsBwJLycejckZ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-color hover:border-accent/50 hover:bg-card text-text-primary font-semibold rounded-lg transition-colors duration-200 text-sm"
              >
                <Download size={15} />
                Resume
              </a>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-accent-cyan/25 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 text-accent-cyan font-semibold rounded-lg transition-colors duration-200 text-sm"
              >
                Let&apos;s Work Together
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.38)} className="flex items-center gap-3">
              <span className="text-text-muted text-xs font-medium uppercase tracking-wider">
                Find me on
              </span>
              <div className="flex items-center gap-2">
                {[
                  { href: "https://github.com/Saurabh-2151", label: "GitHub", icon: Github },
                  { href: "https://www.linkedin.com/in/saurabh-ganjale-5b5b76257/", label: "LinkedIn", icon: Linkedin },
                  { href: "mailto:saurabhganjaleflutter@gmail.com", label: "Email", icon: Mail },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="p-2 rounded-lg border border-border-color hover:border-accent/40 hover:bg-card text-text-secondary hover:text-text-primary transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Code Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 relative"
          >
            {/* Editor window */}
            <div className="rounded-xl border border-border-color bg-card shadow-2xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-color bg-card-elevated">
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-text-muted text-xs font-mono ml-2 select-none">
                  developer.ts
                </span>
              </div>

              {/* Code body */}
              <div className="p-5 font-mono text-sm leading-7 overflow-x-auto">
                <div className="text-text-muted text-xs">{"// About the developer"}</div>
                <div className="mt-1">
                  <span className="text-blue-400">const </span>
                  <span className="text-text-primary">developer </span>
                  <span className="text-text-secondary">= {"{"}</span>
                </div>
                {codeLines.map((line, i) => (
                  <motion.div
                    key={line.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.09, duration: 0.35 }}
                    className="ml-5"
                  >
                    <span className="text-text-secondary">{line.key}</span>
                    <span className="text-text-muted">: </span>
                    <span className={line.color}>{line.value}</span>
                    <span className="text-text-muted">,</span>
                  </motion.div>
                ))}
                <div className="text-text-secondary">{"}"}</div>
                <div className="mt-2 text-text-muted text-xs">{"// Status"}</div>
                <div>
                  <span className="text-blue-400">const </span>
                  <span className="text-text-primary">status </span>
                  <span className="text-text-secondary">= </span>
                  <span className="text-green-400">&quot;open_to_work&quot;</span>
                  <span className="text-text-muted">;</span>
                </div>
              </div>
            </div>

            {/* Tech badges — positioned safely inside the column */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
              {techBadges.map((badge, i) => (
                <motion.span
                  key={badge.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.07 }}
                  className={`px-3 py-1 text-xs font-medium bg-card-elevated border border-border-color rounded-md ${badge.color}`}
                >
                  {badge.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="hidden lg:flex flex-col items-center gap-1 mt-16 text-text-muted"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
