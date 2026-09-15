"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download, ChevronDown, Phone } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start pt-16 overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-2 lg:py-4">
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

          </div>

          {/* ── Right: Profile Image with Neural Network BG ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 relative flex flex-col justify-center items-center gap-6"
          >
            {/* Neon glow backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(6,182,212,0.22) 0%, rgba(59,130,246,0.14) 40%, transparent 75%)",
                filter: "blur(18px)",
              }}
            />

            {/* Neural network SVG canvas */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 420 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid lines */}
              {[60,120,180,240,300,360].map((x) => (
                <line key={`vl-${x}`} x1={x} y1="0" x2={x} y2="480" stroke="rgba(6,182,212,0.10)" strokeWidth="1" />
              ))}
              {[60,120,180,240,300,360,420].map((y) => (
                <line key={`hl-${y}`} x1="0" y1={y} x2="420" y2={y} stroke="rgba(6,182,212,0.10)" strokeWidth="1" />
              ))}
              {/* Neural connections */}
              {[
                [60,60,180,120],[60,60,120,180],[180,120,300,60],[180,120,360,180],
                [120,180,240,240],[240,240,360,180],[240,240,180,360],[360,180,300,300],
                [300,300,180,360],[300,300,420,360],[60,300,180,360],[60,300,120,420],
                [300,60,420,120],[420,120,360,180],[180,360,300,420],[60,420,180,360],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={`conn-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(6,182,212,0.18)" strokeWidth="1" />
              ))}
              {/* Nodes */}
              {[
                [60,60],[180,120],[300,60],[420,120],
                [120,180],[360,180],[60,300],[240,240],
                [420,360],[300,300],[180,360],[60,420],
                [300,420],[420,240],[120,420],
              ].map(([cx,cy], i) => (
                <g key={`node-${i}`}>
                  <circle cx={cx} cy={cy} r="5" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.55)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r="2" fill="rgba(6,182,212,0.9)" />
                </g>
              ))}
              {/* Accent bright nodes */}
              {[[180,120],[240,240],[300,300]].map(([cx,cy], i) => (
                <g key={`bright-${i}`}>
                  <circle cx={cx} cy={cy} r="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="3" fill="#06B6D4" />
                </g>
              ))}
            </svg>

            {/* Image with circular fade mask */}
            <div
              className="relative z-10 w-80 sm:w-96 lg:w-[28rem]"
              style={{
                maskImage: "radial-gradient(ellipse 75% 80% at 50% 45%, black 40%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 50% 45%, black 40%, transparent 75%)",
                filter: "drop-shadow(0 0 40px rgba(6,182,212,0.45))",
              }}
            >
              <img
                src="/assets/png/portfolio.png"
                alt="Vishal More"
                className="w-full object-contain"
              />
            </div>

            {/* Social links below image */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <span className="text-text-muted text-xs font-medium uppercase tracking-wider">
                Find me on
              </span>
              <div className="flex items-center gap-3">
                {[
                  { href: "https://github.com/VishalMore77", label: "GitHub", icon: Github, color: "#06B6D4", shadow: "0 0 12px rgba(6,182,212,0.8), 0 0 24px rgba(6,182,212,0.4)" },
                  { href: "https://www.linkedin.com/in/vishal-more-57200b244/", label: "LinkedIn", icon: Linkedin, color: "#3B82F6", shadow: "0 0 12px rgba(59,130,246,0.8), 0 0 24px rgba(59,130,246,0.4)" },
                  { href: "mailto:vishalmore7760@gmail.com", label: "Email", icon: Mail, color: "#3B82F6", shadow: "0 0 12px rgba(59,130,246,0.8), 0 0 24px rgba(59,130,246,0.4)" },
                  { href: "tel:+919767847605", label: "Call", icon: Phone, color: "#22C55E", shadow: "0 0 12px rgba(34,197,94,0.8), 0 0 24px rgba(34,197,94,0.4)" },
                ].map(({ href, label, icon: Icon, color, shadow }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="p-2.5 rounded-xl transition-all duration-300"
                    style={{ color, border: `1px solid ${color}`, boxShadow: shadow, background: `${color}15` }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
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
