"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/VishalMore77", color: "#e6edf3", hoverShadow: "rgba(230,237,243,0.22)" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vishal-more-57200b244/", color: "#0A66C2", hoverShadow: "rgba(10,102,194,0.32)" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/919767847605", color: "#25D366", hoverShadow: "rgba(37,211,102,0.28)" },
  { icon: Mail, label: "Email", href: "mailto:vishalmore7760@gmail.com", color: "#EA4335", hoverShadow: "rgba(234,67,53,0.28)" },
  { icon: Phone, label: "Phone", href: "tel:+919767847605", color: "#06B6D4", hoverShadow: "rgba(6,182,212,0.28)" },
];

const fadeFrom = (x = 0, y = 0) => ({
  hidden: { opacity: 0, x, y },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
});

const iconVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, delay, ease: "easeOut" } },
});

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer ref={ref} className="relative border-t border-border-color overflow-hidden" style={{ background: "color-mix(in srgb, var(--color-bg-secondary, #0d1117) 100%, #000 20%)" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(59,130,246,0.055) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-3 gap-10 lg:gap-14 mb-10">

          <motion.div variants={fadeFrom(-20, 0)} initial="hidden" animate={inView ? "show" : "hidden"}>
            <motion.div className="flex items-center gap-2.5 mb-4 w-fit" whileHover={{ scale: 1.04 }} transition={{ duration: 0.22, ease: "easeOut" }} style={{ cursor: "default" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)", boxShadow: "0 0 14px rgba(59,130,246,0.30)" }}>
                VM
              </div>
              <span className="font-semibold text-text-primary text-sm tracking-tight">Vishal More</span>
            </motion.div>
            <p className="text-text-muted text-sm leading-relaxed max-w-[210px]">Full-Stack &amp; Flutter Developer building modern digital solutions.</p>
          </motion.div>

          <motion.div variants={fadeFrom(0, 15)} initial="hidden" animate={inView ? "show" : "hidden"} transition={{ delay: 0.08 } as never}>
            <h3 className="text-text-primary font-semibold text-xs uppercase tracking-widest mb-4">Navigation</h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {navLinks.map(({ label, href }) => (
                <motion.button key={href} onClick={() => scrollTo(href)} whileHover={{ x: 2 }} transition={{ duration: 0.18, ease: "easeOut" }} className="text-left text-text-muted text-sm hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:text-accent">
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeFrom(20, 0)} initial="hidden" animate={inView ? "show" : "hidden"} transition={{ delay: 0.16 } as never}>
            <h3 className="text-text-primary font-semibold text-xs uppercase tracking-widest mb-4">Connect</h3>
            <div className="flex gap-2 flex-wrap">
              {socials.map(({ icon: Icon, label, href, color, hoverShadow }, i) => (
                <motion.a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} variants={iconVariant(i * 0.06)} initial="hidden" animate={inView ? "show" : "hidden"} whileHover={{ scale: 1.08, y: -2, boxShadow: `0 0 12px ${hoverShadow}` }} whileTap={{ scale: 0.93 }} transition={{ duration: 0.22, ease: "easeOut" }} className="p-2 rounded-lg border border-border-color bg-card/60 hover:border-white/15 transition-colors duration-200" style={{ color }}>
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4 leading-relaxed break-all">vishalmore7760@gmail.com</p>
          </motion.div>
        </div>

        <div className="pt-6 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">© 2025 Vishal More. All rights reserved.</p>
          <p className="text-text-muted text-xs">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
