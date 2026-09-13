import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Saurabh-2151" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/saurabh-ganjale-5b5b76257/" },
  { icon: Mail, label: "Email", href: "mailto:saurabhganjaleflutter@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center text-white font-bold text-sm shrink-0">
                SG
              </div>
              <span className="font-semibold text-text-primary text-sm">Vishal More</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-[220px]">
              Full-Stack &amp; Flutter Developer building modern digital solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-text-primary font-semibold text-xs uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-text-muted text-sm hover:text-text-primary transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-text-primary font-semibold text-xs uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-2.5 rounded-lg border border-border-color hover:border-accent/40 text-text-secondary hover:text-text-primary transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4 leading-relaxed">
              saurabhganjaleflutter@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            © 2026 Vishal More. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
