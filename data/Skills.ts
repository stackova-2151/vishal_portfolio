export interface TechItem {
  name: string;
  /** path inside /public, e.g. "/Technologies/next-js.png" — or empty string to use SVG fallback */
  icon: string;
  /** brand color used for the hover glow/border */
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: string; // key into catIconMap in Skills.tsx
  description: string;
  skills: TechItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & Web",
    icon: "Monitor",
    description: "Modern web technologies",
    skills: [
      { name: "Next.js",       icon: "/Technologies/next-js.png",       color: "#ffffff" },
      { name: "React.js",      icon: "/Technologies/React_js.webp",     color: "#61DAFB" },
      { name: "JavaScript",    icon: "/Technologies/javascript.webp",   color: "#F7DF1E" },
      { name: "Tailwind CSS",  icon: "/Technologies/tailwind-css.png",  color: "#38BDF8" },
      { name: "HTML5",         icon: "/Technologies/html5.webp",        color: "#E34F26" },
    ],
  },
  {
    title: "Mobile Development",
    icon: "Smartphone",
    description: "Cross-platform mobile apps",
    skills: [
      { name: "Flutter", icon: "/Technologies/flutter.png",  color: "#02569B" },
      { name: "Dart",    icon: "/Technologies/Dart.png",     color: "#0175C2" },
      { name: "Android", icon: "/Technologies/android.png",  color: "#3DDC84" },
      { name: "iOS",     icon: "/Technologies/iosapp.png",      color: "#000000" },
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    description: "Robust & scalable APIs",
    skills: [
      { name: "Java",    icon: "/Technologies/java.png",    color: "#F89820" },
      { name: "Node.js", icon: "/Technologies/Node.webp",    color: "#3C873A" },
      { name: "PHP",     icon: "/Technologies/PHP.webp",     color: "#777BB4" },
      { name: "Spring Boot", icon: "/Technologies/spring-boot.webp",  color: "#ffffff" },
    ],
  },
  {
    title: "Database",
    icon: "Database",
    description: "Data storage & management",
    skills: [
      { name: "Firebase",    icon: "/Technologies/Firebase.png",     color: "#FFCA28" },
      { name: "Firestore",   icon: "/Technologies/firestore.png",    color: "#FFA000" },
      { name: "MySQL",       icon: "/Technologies/mysql.png",        color: "#4479A1" },
      { name: "SQLite",      icon: "/Technologies/SQLite.png",      color: "#003B57" },
      { name: "PostgreSQL",  icon: "/Technologies/postgresql.png",  color: "#336791" },
    ],
  },
  {
    title: "Integrations",
    icon: "Plug",
    description: "Third-party services & APIs",
    skills: [
      { name: "Google Maps", icon: "/Technologies/google map.webp", color: "#4285F4" },
      { name: "WhatsApp",    icon: "/Technologies/whatsapp.webp",   color: "#25D366" },
      { name: "Razorpay",    icon: "/Technologies/razor_pay.png",    color: "#0A2540" },
      { name: "FCM",         icon: "/Technologies/FCM.png",         color: "#FFA000" },
      { name: "Email",       icon: "/Technologies/Email.jpg",       color: "#EA4335" },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "Wrench",
    description: "Development & productivity",
    skills: [
      { name: "Git",     icon: "/Technologies/Git.png",     color: "#F05032" },
      { name: "GitHub",  icon: "/Technologies/github.jpg",   color: "#ffffff" },
      { name: "VS Code", icon: "/Technologies/VS_Code.png",  color: "#007ACC" },
      { name: "Postman", icon: "/Technologies/postma.webp",  color: "#FF6C37" },
      { name: "Docker",  icon: "/Technologies/docker.svg",   color: "#2496ED" },
    ],
  },
];
