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
        midnight: {
          DEFAULT: "var(--color-midnight)",
          light:   "var(--color-midnight-light)",
          card:    "var(--color-midnight-card)",
        },
        amber: {
          DEFAULT: "var(--color-amber)",
          hover:   "var(--color-amber-hover)",
          muted:   "var(--color-amber-muted)",
        },
        cream: {
          DEFAULT: "var(--color-cream)",
          muted:   "var(--color-cream-muted)",
          subtle:  "var(--color-cream-subtle)",
        },
        success: "var(--color-success)",
        error:   "var(--color-error)",
        border:  "var(--color-border)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        card:  "var(--shadow-card)",
        glow:  "var(--shadow-glow)",
        hover: "var(--shadow-hover)",
      },
      animation: {
        "fade-rise":  "fadeRise 0.7s cubic-bezier(0.4, 0, 0.2, 1) both",
        "float":      "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};

export default config;