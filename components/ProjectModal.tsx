"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShoppingBag, Github, CheckCircle2, Code2, User, Tag, Briefcase } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "../lib/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  "Mobile Apps": "text-blue-400",
  "Web Applications": "text-cyan-400",
  "Business Software": "text-purple-400",
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg/85 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-card border border-border-color rounded-t-2xl sm:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Sticky header ── */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-border-color bg-card">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Briefcase size={15} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-text-primary text-sm leading-tight truncate">
                    {project.name}
                  </h2>
                  <span className="text-text-muted text-xs">{project.category}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-lg hover:bg-card-elevated text-text-muted hover:text-text-primary transition-colors shrink-0 ml-3"
              >
                <X size={17} />
              </button>
            </div>

            {/* ── Image / Placeholder ── */}
            <div className="relative h-48 sm:h-56 bg-card-elevated overflow-hidden">
              {project.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.images[0]}
                  alt={`${project.name} screenshot`}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : null}
              {/* Placeholder behind image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <Code2 size={22} className={categoryColors[project.category] ?? "text-accent"} />
                  </div>
                  <span className="text-text-muted text-xs font-medium tracking-wide uppercase">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="p-5 space-y-5">
              {/* Meta row */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { icon: User, label: "Role", value: project.role },
                  { icon: Tag, label: "Status", value: project.status },
                  { icon: Briefcase, label: "Type", value: project.clientProject ? "Client Project" : "Personal" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-card-elevated border border-border-color">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon size={11} className="text-text-muted" />
                      <span className="text-text-muted text-[11px]">{label}</span>
                    </div>
                    <div className="text-text-primary text-xs font-semibold leading-snug">{value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-text-primary font-semibold text-xs uppercase tracking-wider mb-2">
                  About
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-text-primary font-semibold text-xs uppercase tracking-wider mb-2.5">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium bg-accent/8 border border-accent/18 text-accent rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-text-primary font-semibold text-xs uppercase tracking-wider mb-2.5">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-text-secondary text-sm">
                      <CheckCircle2 size={13} className="text-success shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* External links */}
              {(project.liveUrl || project.playStoreUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-border-color">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <ExternalLink size={13} />
                      Live Website
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border-color hover:border-accent/40 text-text-primary text-sm font-medium rounded-lg transition-colors"
                    >
                      <ShoppingBag size={13} />
                      Play Store
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border-color hover:border-accent/40 text-text-primary text-sm font-medium rounded-lg transition-colors"
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
