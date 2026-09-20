"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Monitor, Smartphone, Server, Database, Plug, Wrench, ImageOff } from "lucide-react";
import { skillCategories, type SkillCategory, type TechItem } from "../data/Skills";

const catIconMap: Record<string, React.ElementType> = {
  Monitor, Smartphone, Server, Database, Plug, Wrench,
};

function TechIcon({ tech }: { tech: TechItem }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.08 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative w-14 h-14 rounded-xl flex items-center justify-center cursor-default shrink-0"
      style={{
        background: "var(--bg-primary)",
        border: `1px solid ${hovered ? tech.color : "var(--border-color)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${tech.color}33, 0 8px 20px -6px ${tech.color}70`
          : "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {!imgError && tech.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tech.icon}
          alt={tech.name}
          width={30}
          height={30}
          className="object-contain w-[30px] h-[30px]"
          onError={() => setImgError(true)}
        />
      ) : (
        <ImageOff size={18} style={{ color: tech.color }} aria-hidden="true" />
      )}

      <motion.span
        initial={false}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.15 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium px-2 py-1 rounded-md bg-card border border-border-color text-text-primary pointer-events-none shadow-sm z-10"
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
}

/* ── Category card: lift + border glow + cursor-following spotlight ── */
function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const CatIcon = catIconMap[cat.icon] || Monitor;
  const [cardHovered, setCardHovered] = useState(false);

  // track cursor position within the card for the spotlight glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--spot-x", `${x}px`);
    e.currentTarget.style.setProperty("--spot-y", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      className="relative rounded-2xl p-5"
      style={{
        background: "#131C2C",
        border: `1px solid ${cardHovered ? "rgba(59,130,246,0.55)" : "#243247"}`,
        boxShadow: cardHovered
          ? "0 0 0 1px rgba(59,130,246,0.12), 0 8px 32px -8px rgba(59,130,246,0.22)"
          : "none",
        transition: "border-color 0.28s ease, box-shadow 0.28s ease",
      }}
    >
      {/* spotlight layer — clipped separately so tooltips above icons never get cut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-300"
        style={{ opacity: cardHovered ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(59,130,246,0.14), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={cardHovered ? { scale: 1.06, rotate: 3 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: cardHovered ? "rgba(59,130,246,0.18)" : "rgba(59,130,246,0.12)",
              border: `1px solid ${cardHovered ? "rgba(59,130,246,0.40)" : "rgba(59,130,246,0.25)"}`,
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            <CatIcon size={17} className="text-accent" aria-hidden="true" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-text-primary text-[15px] leading-tight">
              {cat.title}
            </h3>
            {cat.description && (
              <p className="text-text-muted text-xs mt-0.5">{cat.description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {cat.skills.map((tech) => (
            <TechIcon key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary mb-3 leading-tight">
            Skills &amp; <span className="text-accent">Technologies</span>
          </h2>
          <p className="text-text-secondary text-[15px] max-w-lg mx-auto leading-relaxed">
            Technologies I use to build production ready applications across mobile, web and backend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}