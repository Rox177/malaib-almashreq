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
        navy: {
          50: "#f0f4f9",
          100: "#dce6f0",
          200: "#b5cce0",
          300: "#82a8ca",
          400: "#4d82ae",
          500: "#2a6193",
          600: "#1d4d7a",
          700: "#153b5e",
          800: "#0f2a44",
          900: "#0a1c2e",
          DEFAULT: "#0f2a44",
          light: "#1a3a5c",
          dark: "#0a1a2e",
        },
        sport: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#15803d",
        },
        surface: {
          DEFAULT: "#fafafa",
          card: "#ffffff",
          elevated: "#ffffff",
          muted: "#f4f6f8",
          border: "#e8ecf0",
          divider: "#f0f2f5",
        },
        content: {
          primary: "#0f1923",
          secondary: "#4b5869",
          tertiary: "#8896a5",
          inverse: "#ffffff",
          accent: "#16a34a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 3px rgba(15, 39, 68, 0.06)",
        sm: "0 2px 8px rgba(15, 39, 68, 0.08)",
        md: "0 4px 16px rgba(15, 39, 68, 0.08)",
        lg: "0 8px 28px rgba(15, 39, 68, 0.10)",
        xl: "0 16px 48px rgba(15, 39, 68, 0.12)",
        card: "0 1px 3px rgba(15, 39, 68, 0.06), 0 4px 12px rgba(15, 39, 68, 0.07)",
        "card-hover":
          "0 4px 8px rgba(15, 39, 68, 0.08), 0 12px 32px rgba(15, 39, 68, 0.12)",
        button: "0 2px 8px rgba(22, 163, 74, 0.30)",
        inset: "inset 0 1px 2px rgba(15, 39, 68, 0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out forwards",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "slide-down": "slide-down 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
