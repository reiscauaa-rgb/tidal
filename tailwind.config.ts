import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sand-bg": "#EAD8C0",
        "sand-light": "#F4E8D1",
        "ocean-dark": "#063E52",
        "deep-brown": "#4A2B29",
        turquoise: "#13BBC4",
        coral: "#FF8066",
        "sunrise-gold": "#FFB36B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "wave-slow": "wave 8s ease-in-out infinite",
        "wave-medium": "wave 5s ease-in-out infinite reverse",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float-up": "floatUp 6s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0) scaleX(1)" },
          "50%": { transform: "translateY(-10px) scaleX(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
