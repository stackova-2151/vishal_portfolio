"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/92 backdrop-blur-md border-b border-border-color shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
          className="flex items-center gap-2.5"
          aria-label="Vishal More — Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center text-white font-bold text-sm shrink-0">
            VM
          </div>
          <span className="font-semibold text-text-primary text-sm hidden sm:block">
            Vishal More
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Resume CTA */}
        <div className="hidden md:flex">
          <a
            href="https://drive.google.com/file/d/124Q4cPHh9El3ZL_gDNMoxNmIigX22LR7/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent hover:bg-blue-500 text-white rounded-lg transition-colors duration-200"
          >
            <FileText size={13} />
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden bg-bg-secondary border-b border-border-color overflow-hidden"
          >
            <div className="px-5 py-3 flex flex-col gap-0.5">
              {navLinks.map(({ label, href }) => {
                const id = href.replace("#", "");
                return (
                  <button
                    key={href}
                    onClick={() => handleNav(href)}
                    className={`text-left px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      active === id
                        ? "text-accent bg-accent/8"
                        : "text-text-secondary hover:text-text-primary hover:bg-card"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <a
                href="https://drive.google.com/file/d/124Q4cPHh9El3ZL_gDNMoxNmIigX22LR7/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-accent text-white rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                <FileText size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
