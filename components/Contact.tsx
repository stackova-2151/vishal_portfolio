"use client";
import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "saurabhganjaleflutter@gmail.com",
    href: "mailto:saurabhganjaleflutter@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7219185759",
    href: "tel:+917219185759",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/saurabh-ganjale",
    href: "https://www.linkedin.com/in/saurabh-ganjale-5b5b76257/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Saurabh-2151",
    href: "https://github.com/Saurabh-2151",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
  },
];

const projectTypes = [
  "Mobile App (Flutter)",
  "Web Application",
  "Admin Dashboard",
  "Business Software",
  "API Integration",
  "E-commerce",
  "Other",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // TODO: Connect an email service here.
    // EmailJS example:
    //   await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
    // Resend / custom API route example:
    //   await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });

    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const inputBase =
    "w-full px-4 py-3 bg-card-elevated border rounded-lg text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors duration-150";

  const inputClass = (field: string) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-500/50 focus:border-red-500/50"
        : "border-border-color focus:border-accent/50"
    }`;

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-text-primary mb-3">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-text-secondary text-[15px] max-w-lg mx-auto">
            Have a project idea, need a custom application, or looking for a developer?
            Let&apos;s discuss your requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="p-5 rounded-xl bg-card border border-border-color">
              <h3 className="font-semibold text-text-primary text-sm mb-5">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-text-muted text-[11px] mb-0.5 uppercase tracking-wide">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-text-primary text-sm hover:text-accent transition-colors break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-text-primary text-sm">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-4 rounded-xl bg-card border border-border-color">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                <span className="text-success text-sm font-semibold">Available for Projects</span>
              </div>
              <p className="text-text-muted text-xs leading-relaxed">
                Open to freelance projects and full-time opportunities.
                Typical response time: within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-6 rounded-xl bg-card border border-border-color">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <Send size={20} className="text-accent" />
                  </div>
                  <h3 className="font-bold text-text-primary text-base mb-2">
                    Message Received
                  </h3>
                  <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
                    Your message has been noted. I&apos;ll review it and get back to you at{" "}
                    <span className="text-text-primary font-medium">
                      saurabhganjaleflutter@gmail.com
                    </span>{" "}
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", projectType: "", message: "" });
                    }}
                    className="mt-6 px-5 py-2 text-sm font-medium border border-border-color hover:border-accent/40 hover:bg-card-elevated text-text-primary rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-text-secondary text-xs font-medium mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-text-secondary text-xs font-medium mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-text-secondary text-xs font-medium mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className={`${inputClass("projectType")} bg-card-elevated`}
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-text-secondary text-xs font-medium mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
