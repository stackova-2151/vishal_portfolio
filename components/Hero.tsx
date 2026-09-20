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
      className="relative min-h-screen flex items-start pt-14 overflow-hidden"
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(59,130,246,0.08) 0%, transparent 100%), radial-gradient(ellipse 40% 40% at 90% 15%, rgba(6,182,212,0.06) 0%, transparent 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-2 pb-2">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Left: Content ── */}
          <div className="order-1 flex flex-col gap-4">

            {/* Heading */}
            <motion.div {...fadeUp(0.14)} className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-text-primary leading-tight tracking-tight">
                Hi, I&apos;m Vishal More
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-semibold text-text-secondary">
                Software &amp;{" "}
                <span className="gradient-text">Flutter</span> Developer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp(0.22)}
              className="text-text-secondary text-sm leading-relaxed max-w-sm"
            >
              Building production ready mobile apps, modern web platforms, and
              custom business solutions with a focus on clean design, reliable
              performance, and real world business needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-200 text-xs"
              >
                View My Work
                <ArrowRight size={13} />
              </button>
              <a
                href="https://drive.google.com/file/d/124Q4cPHh9El3ZL_gDNMoxNmIigX22LR7/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-color hover:border-accent/50 hover:bg-card text-text-primary font-semibold rounded-lg transition-colors duration-200 text-xs"
              >
                <Download size={13} />
                Resume
              </a>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent-cyan/25 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 text-accent-cyan font-semibold rounded-lg transition-colors duration-200 text-xs"
              >
                Let&apos;s Work Together
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col gap-2 pt-1"
            >
              <span className="text-text-muted text-xs font-medium uppercase tracking-wider">
                Find me on
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  { href: "https://wa.me/919767847605", label: "WhatsApp", color: "#25D366", shadow: "0 0 10px rgba(37,211,102,0.7)", isWA: true },
                  { href: "https://github.com/VishalMore77", label: "GitHub", color: "#e6edf3", shadow: "0 0 10px rgba(230,237,243,0.5)", isWA: false },
                  { href: "https://www.linkedin.com/in/vishal-more-57200b244/", label: "LinkedIn", color: "#0A66C2", shadow: "0 0 10px rgba(10,102,194,0.7)", isWA: false },
                  { href: "mailto:vishalmore7760@gmail.com", label: "Email", color: "#EA4335", shadow: "0 0 10px rgba(234,67,53,0.7)", isWA: false },
                  { href: "tel:+919767847605", label: "Call", color: "#06B6D4", shadow: "0 0 10px rgba(6,182,212,0.7)", isWA: false },
                ].map(({ href, label, color, shadow, isWA }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="p-2 rounded-xl transition-all duration-300"
                    style={{ color, border: `1px solid ${color}`, boxShadow: shadow, background: `${color}15` }}
                  >
                    {isWA ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    ) : label === "GitHub" ? (
                      <Github size={16} />
                    ) : label === "LinkedIn" ? (
                      <Linkedin size={16} />
                    ) : label === "Email" ? (
                      <Mail size={16} />
                    ) : (
                      <Phone size={16} />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Right: Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 relative flex flex-col justify-center items-center gap-5"
          >
            {/* Neon glow backdrop */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 420 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[60,120,180,240,300,360].map((x) => (
                <line key={`vl-${x}`} x1={x} y1="0" x2={x} y2="480" stroke="rgba(6,182,212,0.10)" strokeWidth="1" />
              ))}
              {[60,120,180,240,300,360,420].map((y) => (
                <line key={`hl-${y}`} x1="0" y1={y} x2="420" y2={y} stroke="rgba(6,182,212,0.10)" strokeWidth="1" />
              ))}
              {[
                [60,60,180,120],[60,60,120,180],[180,120,300,60],[180,120,360,180],
                [120,180,240,240],[240,240,360,180],[240,240,180,360],[360,180,300,300],
                [300,300,180,360],[300,300,420,360],[60,300,180,360],[60,300,120,420],
                [300,60,420,120],[420,120,360,180],[180,360,300,420],[60,420,180,360],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={`conn-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(6,182,212,0.18)" strokeWidth="1" />
              ))}
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
              {[[180,120],[240,240],[300,300]].map(([cx,cy], i) => (
                <g key={`bright-${i}`}>
                  <circle cx={cx} cy={cy} r="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="3" fill="#06B6D4" />
                </g>
              ))}
            </svg>

            {/* Image with fade mask */}
            <div
              className="relative z-10 w-80 sm:w-96 lg:w-[30rem] group"
              style={{
                maskImage: "radial-gradient(ellipse 75% 80% at 50% 45%, black 40%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 50% 45%, black 40%, transparent 75%)",
                filter: "drop-shadow(0 0 40px rgba(6,182,212,0.45))",
              }}
            >
              <img
                src="/assets/png/portfolio.png"
                alt="Vishal More"
                className="w-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:opacity-0 absolute inset-0"
              />
              <img
                src="/assets/png/portfolio_coloured.png"
                alt="Vishal More"
                className="w-full object-contain transition-all duration-500 scale-95 opacity-0 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>

          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="hidden lg:flex flex-col items-center gap-1 mt-2 text-text-muted"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
