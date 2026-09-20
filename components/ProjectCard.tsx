"use client";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag, Eye, Code2 } from "lucide-react";
import type { Project } from "../lib/types";

interface ProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
}

const categoryColors: Record<string, string> = {
  "Mobile Apps": "text-blue-400",
  "Web Applications": "text-cyan-400",
  "Business Software": "text-purple-400",
};

// ── Mobile App image area — "Spotlight stage" ─────────────────────────────────

function MobileImageArea({ project }: { project: Project }) {
  const src = project.images.mobile[0];
  return (
    <div
      className="relative h-56 shrink-0 overflow-hidden flex items-center justify-center"
      style={{
        // Light beam falling from the top edge onto a dark base
        background:
          "radial-gradient(ellipse 65% 75% at 50% 0%, rgba(147,197,253,0.4) 0%, transparent 72%), #0a0f1e",
      }}
    >
      {/* Floor glow under the phone — reacts when the card is hovered */}
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[130px] h-[18px] rounded-full pointer-events-none transition-all duration-300 group-hover:w-[100px] group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(ellipse, rgba(96,165,250,0.7) 0%, transparent 70%)",
        }}
      />

      {/* Phone frame — lifts on hover */}
      <motion.div
        className="relative z-10 mb-2"
        style={{ width: 100, height: 196 }}
        whileHover={{ y: -5, scale: 1.04 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Outer device shell */}
        <div
          className="absolute inset-0 rounded-[22px] border border-white/15"
          style={{
            background: "linear-gradient(160deg, #1c2333 0%, #111827 100%)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        />

        {/* Side buttons — left */}
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-12 w-[3px] h-5 rounded-l-sm"
          style={{ background: "#1e2a3a" }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-[78px] w-[3px] h-5 rounded-l-sm"
          style={{ background: "#1e2a3a" }}
        />
        {/* Side button — right (power) */}
        <div
          aria-hidden="true"
          className="absolute -right-[3px] top-14 w-[3px] h-7 rounded-r-sm"
          style={{ background: "#1e2a3a" }}
        />

        {/* Screen bezel */}
        <div className="absolute inset-[5px] rounded-[18px] overflow-hidden bg-black">
          {/* Notch / dynamic island */}
          <div
            aria-hidden="true"
            className="absolute top-1.5 left-1/2 -translate-x-1/2 z-10 w-12 h-3 rounded-full"
            style={{ background: "#0d1117" }}
          />

          {/* Screenshot */}
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`${project.name} mobile application screenshot`}
              loading="lazy"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            // Fallback inside screen
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-card-elevated">
              <Code2 size={16} className="text-blue-400 opacity-60" />
              <span className="text-text-muted text-[9px] uppercase tracking-wider">Mobile App</span>
            </div>
          )}
        </div>

        {/* Screen glare */}
        <div
          aria-hidden="true"
          className="absolute inset-[5px] rounded-[18px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-20">
        <span className="px-2 py-1 text-[11px] font-medium bg-bg/75 backdrop-blur-sm border border-border-color text-text-secondary rounded-md leading-none">
          {project.category}
        </span>
      </div>
      {project.clientProject && (
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-1 text-[11px] font-medium bg-accent/15 border border-accent/25 text-accent rounded-md leading-none">
            Client
          </span>
        </div>
      )}
    </div>
  );
}

// ── Web / Business image area ─────────────────────────────────────────────────

function WebImageArea({ project }: { project: Project }) {
  const src = project.images.mobile[0];
  const accentColor = categoryColors[project.category] ?? "text-accent";
  return (
    <div className="relative h-44 bg-card-elevated overflow-hidden shrink-0">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04] z-10"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      {/* Placeholder behind image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
            <Code2 size={18} className={accentColor} />
          </div>
          <span className="text-text-muted text-[11px] font-medium tracking-wide uppercase">
            {project.category}
          </span>
        </div>
      </div>

      {/* Subtle bottom gradient so badges stay readable */}
      {src && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
      )}

      {/* Badges */}
      <div className="absolute top-3 left-3 z-20">
        <span className="px-2 py-1 text-[11px] font-medium bg-bg/75 backdrop-blur-sm border border-border-color text-text-secondary rounded-md leading-none">
          {project.category}
        </span>
      </div>
      {project.clientProject && (
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-1 text-[11px] font-medium bg-accent/15 border border-accent/25 text-accent rounded-md leading-none">
            Client
          </span>
        </div>
      )}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

export default function ProjectCard({ project, onView }: ProjectCardProps) {
  const isMobile = project.category === "Mobile Apps";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-xl bg-card border border-border-color hover:border-accent/35 transition-colors duration-200 overflow-hidden cursor-pointer"
      onClick={() => onView(project)}
    >
      {isMobile ? (
        <MobileImageArea project={project} />
      ) : (
        <WebImageArea project={project} />
      )}

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-text-primary text-sm leading-snug line-clamp-2 flex-1">
            {project.name}
          </h3>
          <span className="shrink-0 px-2 py-0.5 text-[11px] bg-success/8 border border-success/20 text-success rounded-full leading-5">
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.shortDescription}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] bg-card-elevated border border-border-color text-text-muted rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[11px] bg-card-elevated border border-border-color text-text-muted rounded">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-border-color">
          <button
            onClick={() => onView(project)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-accent/10 hover:bg-accent/18 text-accent border border-accent/20 rounded-lg transition-colors duration-150"
          >
            <Eye size={12} />
            Details
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border-color hover:border-accent/30 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-150"
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {project.playStoreUrl && (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border-color hover:border-accent/30 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-150"
            >
              <ShoppingBag size={12} />
              Play Store
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}