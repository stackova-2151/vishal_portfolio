"use client";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag, Eye, Code2 } from "lucide-react";
import type { Project } from "../lib/types";

interface ProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
}

// Category → accent color mapping for placeholder
const categoryColors: Record<string, string> = {
  "Mobile Apps": "text-blue-400",
  "Web Applications": "text-cyan-400",
  "Business Software": "text-purple-400",
};

export default function ProjectCard({ project, onView }: ProjectCardProps) {
  const accentColor = categoryColors[project.category] ?? "text-accent";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-xl bg-card border border-border-color hover:border-accent/35 transition-colors duration-200 overflow-hidden"
    >
      {/* ── Image / Placeholder ── */}
      <div className="relative h-44 bg-card-elevated overflow-hidden shrink-0">
        {project.images[0] ? (
          // Real image — rendered on top
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04] z-10"
            onError={(e) => {
              // Hide broken image, let placeholder show
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}

        {/* Placeholder — always rendered behind real image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none">
          {/* Subtle pattern */}
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

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2 py-1 text-[11px] font-medium bg-bg/75 backdrop-blur-sm border border-border-color text-text-secondary rounded-md leading-none">
            {project.category}
          </span>
        </div>

        {/* Client badge */}
        {project.clientProject && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-1 text-[11px] font-medium bg-accent/15 border border-accent/25 text-accent rounded-md leading-none">
              Client
            </span>
          </div>
        )}
      </div>

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
