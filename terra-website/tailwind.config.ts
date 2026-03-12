import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#cc3333",
          light: "#e2b14f",
        },
        surface: {
          DEFAULT: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
        },
        ink: {
          DEFAULT: "#1a1a1a",
          light: "#4a4a4a",
          lighter: "#757575",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
        alpina: ["var(--font-cormorant)", "serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #cc3333 0%, #e2b14f 100%)",
        "gradient-subtle": "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;