"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projects, projectCategories } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "../lib/types";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary mb-3">
            Projects
          </h2>
          <p className="text-text-secondary text-[14px] max-w-lg mx-auto">
            Selected applications and business solutions I&apos;ve designed and developed.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-accent border-accent text-white"
                  : "border-border-color text-text-secondary hover:border-accent/35 hover:text-text-primary bg-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayed.map((project) => (
              <ProjectCard
                key={project.id}
                project={project as Project}
                onView={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
        {filtered.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-border-color hover:border-accent/40 hover:bg-card text-text-primary text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              {showAll ? (
                <> Show Less <ChevronUp size={15} /> </>
              ) : (
                <> View All Projects ({filtered.length}) <ChevronDown size={15} /> </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
