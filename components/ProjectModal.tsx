"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ExternalLink, ShoppingBag, Github, CheckCircle2, Code2,
  User, Tag, Briefcase, ChevronLeft, ChevronRight, ZoomIn,
  Smartphone, Monitor,
} from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import type { Project, ProjectImages, GalleryImageType } from "../lib/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  "Mobile Apps": "text-blue-400",
  "Web Applications": "text-cyan-400",
  "Business Software": "text-purple-400",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Flatten ProjectImages into an ordered list with type metadata */
interface GalleryItem {
  src: string;
  type: GalleryImageType;
  /** 1-based index within its type group */
  typeIndex: number;
}

function buildGalleryItems(images: ProjectImages, category: string): GalleryItem[] {
  const isMobileApp = category === "Mobile Apps";
  const primaryType: GalleryImageType = isMobileApp ? "mobile" : "web";
  const items: GalleryItem[] = images.mobile.map((src, i) => ({
    src,
    type: primaryType,
    typeIndex: i + 1,
  }));
  if (images.admin) {
    const adminSrcs = Array.isArray(images.admin) ? images.admin : [images.admin];
    adminSrcs.forEach((src, i) => {
      items.push({ src, type: "admin", typeIndex: i + 1 });
    });
  }
  return items;
}

// ── Image Gallery ─────────────────────────────────────────────────────────────

function ImageGallery({
  images,
  projectName,
  category,
}: {
  images: ProjectImages;
  projectName: string;
  category: string;
}) {
  const items = buildGalleryItems(images, category);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Keep a ref to the latest index so the interval closure never goes stale
  const indexRef = useRef(index);
  indexRef.current = index;

  // Reset index when project changes
  useEffect(() => { setIndex(0); setDirection(0); }, [images]);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const prev = useCallback(
    () => go((index - 1 + items.length) % items.length),
    [go, index, items.length]
  );
  const next = useCallback(
    () => go((index + 1) % items.length),
    [go, index, items.length]
  );

  // ── Auto-slideshow ──────────────────────────────────────────────────────────
  const startSlideshow = useCallback(() => {
    if (items.length <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const nextIdx = (indexRef.current + 1) % items.length;
      setDirection(1);
      setIndex(nextIdx);
    }, 2000);
  }, [items.length]);

  // Start on mount / project change; stop when lightbox opens
  useEffect(() => {
    if (lightbox) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    startSlideshow();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images, lightbox, startSlideshow]);

  // Wrap manual navigation so each interaction resets the timer
  const goManual = useCallback(
    (next: number) => {
      go(next);
      startSlideshow();
    },
    [go, startSlideshow]
  );
  const prevManual = useCallback(
    () => goManual((index - 1 + items.length) % items.length),
    [goManual, index, items.length]
  );
  const nextManual = useCallback(
    () => goManual((index + 1) % items.length),
    [goManual, index, items.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // No images at all — placeholder
  if (items.length === 0) {
    return (
      <div className="relative h-48 sm:h-56 bg-card-elevated overflow-hidden flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
            <Code2 size={22} className={categoryColors[category] ?? "text-accent"} />
          </div>
          <span className="text-text-muted text-xs font-medium tracking-wide uppercase">
            {category}
          </span>
        </div>
      </div>
    );
  }

  const current = items[index];
  const isAdmin = current.type === "admin";
  const isWeb = current.type === "web";
  const isMobile = current.type === "mobile";

  // Slide direction for non-phone elements (label, admin image)
  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 20 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d * -20 }),
  };

  // Phone entrance — vertical fade-in, no horizontal slide (avoids clipping)
  const phoneVariants = {
    enter: { opacity: 0, y: 10, scale: 0.96 },
    center: { opacity: 1, y: 0,  scale: 1    },
    exit:  { opacity: 0, y: -6, scale: 0.97  },
  };

  return (
    <>
      {/* ── Main gallery area ── */}
      <div
        className="relative h-[17rem] sm:h-[19rem] overflow-hidden group/gallery flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 65% 75% at 50% 55%, rgba(59,130,246,0.09) 0%, transparent 68%), linear-gradient(170deg, #0d1117 0%, #080d18 100%)",
        }}
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* ── MOBILE: phone frame ── */}
        {isMobile && (
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              variants={phoneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10"
              style={{ width: 140, height: 272 }}
            >
              {/* Ambient glow behind phone */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                  boxShadow: "0 0 40px 8px rgba(59,130,246,0.13)",
                  filter: "blur(2px)",
                }}
              />

              {/* Outer device shell */}
              <div
                className="absolute inset-0 rounded-[26px] border border-white/10"
                style={{
                  background: "linear-gradient(160deg, #1c2333 0%, #0f1623 100%)",
                  boxShadow:
                    "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              />

              {/* Side buttons */}
              <div aria-hidden="true" className="absolute -left-[3px] top-16 w-[3px] h-6 rounded-l-sm" style={{ background: "#1a2235" }} />
              <div aria-hidden="true" className="absolute -left-[3px] top-[100px] w-[3px] h-6 rounded-l-sm" style={{ background: "#1a2235" }} />
              <div aria-hidden="true" className="absolute -right-[3px] top-20 w-[3px] h-9 rounded-r-sm" style={{ background: "#1a2235" }} />

              {/* Screen bezel */}
              <div className="absolute inset-[5px] rounded-[22px] overflow-hidden bg-black">
                {/* Dynamic island */}
                <div
                  aria-hidden="true"
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-16 h-[13px] rounded-full"
                  style={{ background: "#050a10" }}
                />

                {/* Screenshot — object-contain, never cropped */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={`${projectName} – Mobile screenshot ${current.typeIndex}`}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />

                {/* Screen glare */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-[22px]"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 45%)" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── WEB: landscape screenshot ── */}
        {isWeb && (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-4 sm:inset-6 z-10 flex items-center justify-center"
            >
              <div
                className="relative w-full h-full rounded-xl overflow-hidden border border-white/10"
                style={{
                  background: "#0d1117",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-5 z-10 flex items-center px-2.5 gap-1.5"
                  style={{ background: "rgba(15,20,30,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={`${projectName} – Web screenshot ${current.typeIndex}`}
                  className="absolute inset-0 w-full h-full object-contain pt-5"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── ADMIN: landscape screenshot ── */}
        {isAdmin && (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-4 sm:inset-6 z-10 flex items-center justify-center"
            >
              {/* Monitor-style outer frame */}
              <div
                className="relative w-full h-full rounded-xl overflow-hidden border border-white/10"
                style={{
                  background: "#0d1117",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {/* Top bar — browser/OS chrome hint */}
                <div
                  className="absolute top-0 left-0 right-0 h-5 z-10 flex items-center px-2.5 gap-1.5"
                  style={{ background: "rgba(15,20,30,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
                </div>

                {/* Screenshot */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={`${projectName} – Admin Dashboard`}
                  className="absolute inset-0 w-full h-full object-contain pt-5"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Overlays (same for both types) ── */}

        {/* Type label — bottom-left */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.type}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg/80 backdrop-blur-sm border border-border-color"
          >
            {isAdmin || isWeb ? (
              <Monitor size={11} className={isAdmin ? "text-accent" : "text-cyan-400"} />
            ) : (
              <Smartphone size={11} className="text-blue-400" />
            )}
            <span className={`text-[11px] font-medium ${isAdmin ? "text-accent" : isWeb ? "text-cyan-400" : "text-blue-400"}`}>
              {isAdmin ? "Admin Dashboard" : isWeb ? "Web Application" : "Mobile Application"}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Counter — bottom-right */}
        <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-md bg-bg/70 backdrop-blur-sm border border-border-color text-text-muted text-[11px]">
          {index + 1} / {items.length}
        </div>

        {/* Zoom */}
        <button
          onClick={() => setLightbox(true)}
          aria-label="View full size"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-bg/70 backdrop-blur-sm border border-border-color text-text-muted hover:text-text-primary opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-200"
        >
          <ZoomIn size={13} />
        </button>

        {/* Prev / Next */}
        {items.length > 1 && (
          <>
            <motion.button
              onClick={prevManual}
              aria-label="Previous screenshot"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-lg bg-bg/70 backdrop-blur-sm border border-border-color text-text-secondary hover:text-text-primary opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={nextManual}
              aria-label="Next screenshot"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-lg bg-bg/70 backdrop-blur-sm border border-border-color text-text-secondary hover:text-text-primary opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight size={16} />
            </motion.button>
          </>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {items.length > 1 && (
        <div className="flex gap-1.5 px-4 py-2.5 bg-card-elevated border-b border-border-color overflow-x-auto scrollbar-none">
          {items.map((item, i) => {
            const isSelected = i === index;
            const isAdminThumb = item.type === "admin";
            const isWebThumb = item.type === "web";
            const isLandscape = isAdminThumb || isWebThumb;
            return (
              <motion.button
                key={i}
                onClick={() => goManual(i)}
                aria-label={isAdminThumb ? "Admin Dashboard screenshot" : isWebThumb ? `Web screenshot ${item.typeIndex}` : `Mobile screenshot ${item.typeIndex}`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`relative shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  isLandscape ? "w-16 h-9" : "w-10 h-[4.5rem]"
                } ${
                  isSelected
                    ? "border-accent shadow-[0_0_8px_rgba(59,130,246,0.45)]"
                    : "border-border-color opacity-55 hover:opacity-85"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={isAdminThumb ? "Admin" : isWebThumb ? `Web ${item.typeIndex}` : `Mobile ${item.typeIndex}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {isAdminThumb && (
                  <div className="absolute inset-0 flex items-end justify-center pb-0.5 bg-gradient-to-t from-black/50 to-transparent">
                    <span className="text-[9px] font-semibold text-white leading-none">Admin</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/92 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center w-full max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Web: large landscape frame */}
              {isWeb && (
                <div className="relative w-full max-h-[80vh] rounded-xl overflow-hidden border border-white/10"
                  style={{ background: "#0d1117", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
                >
                  <div
                    className="flex items-center px-3 gap-1.5 h-6"
                    style={{ background: "rgba(15,20,30,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  </div>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={index}
                      src={current.src}
                      alt={`${projectName} – Web screenshot ${current.typeIndex}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full object-contain max-h-[75vh]"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile: large phone frame */}
              {isMobile && (
                <div className="relative" style={{ width: 220, height: 440 }}>
                  {/* Glow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[36px] pointer-events-none"
                    style={{ boxShadow: "0 0 60px 12px rgba(59,130,246,0.18)", filter: "blur(4px)" }}
                  />
                  {/* Shell */}
                  <div
                    className="absolute inset-0 rounded-[34px] border border-white/10"
                    style={{
                      background: "linear-gradient(160deg, #1c2333 0%, #0f1623 100%)",
                      boxShadow: "0 16px 56px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                  />
                  {/* Side buttons */}
                  <div aria-hidden="true" className="absolute -left-[3px] top-20 w-[3px] h-8 rounded-l-sm" style={{ background: "#1a2235" }} />
                  <div aria-hidden="true" className="absolute -left-[3px] top-[120px] w-[3px] h-8 rounded-l-sm" style={{ background: "#1a2235" }} />
                  <div aria-hidden="true" className="absolute -right-[3px] top-24 w-[3px] h-12 rounded-r-sm" style={{ background: "#1a2235" }} />
                  {/* Screen */}
                  <div className="absolute inset-[6px] rounded-[29px] overflow-hidden bg-black">
                    <div
                      aria-hidden="true"
                      className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 w-20 h-[14px] rounded-full"
                      style={{ background: "#050a10" }}
                    />
                    <AnimatePresence initial={false} mode="wait">
                      <motion.img
                        key={index}
                        src={current.src}
                        alt={`${projectName} – Mobile screenshot ${current.typeIndex}`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </AnimatePresence>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 45%)" }}
                    />
                  </div>
                </div>
              )}

              {/* Admin: landscape screenshot */}
              {isAdmin && (
                <div className="relative w-full max-h-[80vh] rounded-xl overflow-hidden border border-white/10"
                  style={{ background: "#0d1117", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
                >
                  <div
                    className="flex items-center px-3 gap-1.5 h-6"
                    style={{ background: "rgba(15,20,30,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  </div>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={index}
                      src={current.src}
                      alt={`${projectName} – Admin Dashboard`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full object-contain max-h-[75vh]"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </AnimatePresence>
                </div>
              )}

              {/* Type label + counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 border border-white/10">
                {isAdmin || isWeb ? (
                  <Monitor size={11} className={isAdmin ? "text-accent" : "text-cyan-400"} />
                ) : (
                  <Smartphone size={11} className="text-blue-400" />
                )}
                <span className={`text-xs font-medium ${isAdmin ? "text-accent" : isWeb ? "text-cyan-400" : "text-blue-400"}`}>
                  {isAdmin ? "Admin Dashboard" : isWeb ? "Web Application" : "Mobile Application"}
                </span>
                <span className="text-white/40 text-xs ml-1">{index + 1} / {items.length}</span>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightbox(false)}
                aria-label="Close lightbox"
                className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Prev / Next */}
              {items.length > 1 && (
                <>
                  <motion.button
                    onClick={prevManual}
                    aria-label="Previous"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </motion.button>
                  <motion.button
                    onClick={nextManual}
                    aria-label="Next"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
          <div className="absolute inset-0 bg-bg/85 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-card border border-border-color rounded-t-2xl sm:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
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

            {/* Gallery */}
            <ImageGallery
              images={project.images}
              projectName={project.name}
              category={project.category}
            />

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Meta */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { icon: User,      label: "Role",   value: project.role },
                  { icon: Tag,       label: "Status", value: project.status },
                  { icon: Briefcase, label: "Type",   value: project.clientProject ? "Client Project" : "Personal" },
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

              {/* About */}
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

              {/* Links */}
              {(project.liveUrl || project.playStoreUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-border-color">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <ExternalLink size={13} /> Live Website
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border-color hover:border-accent/40 text-text-primary text-sm font-medium rounded-lg transition-colors"
                    >
                      <ShoppingBag size={13} /> Play Store
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border-color hover:border-accent/40 text-text-primary text-sm font-medium rounded-lg transition-colors"
                    >
                      <Github size={13} /> GitHub
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
