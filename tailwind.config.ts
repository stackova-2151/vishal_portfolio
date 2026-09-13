import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1120",
        "bg-secondary": "#111827",
        card: "#151E2E",
        "card-elevated": "#1B2638",
        "border-color": "#243247",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
        accent: "#3B82F6",
        "accent-cyan": "#06B6D4",
        success: "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundOpacity: {
        8: "0.08",
        18: "0.18",
      },
    },
  },
  plugins: [],
};

export default config;
