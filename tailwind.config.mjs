/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md}"],
  theme: {
    // shadcn/ui-style container used by the pricing section
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Reference brand colour
        "custom-beige": "#F8F6D0",
        // shadcn/ui semantic tokens (fixed light-theme values — no CSS vars,
        // so the palette is easy to read and tweak here in one place)
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#0F172A",
        background: "#FFFFFF",
        foreground: "#020817",
        primary: { DEFAULT: "#0F172A", foreground: "#F8FAFC" },
        secondary: { DEFAULT: "#F1F5F9", foreground: "#0F172A" },
        muted: { DEFAULT: "#F1F5F9", foreground: "#64748B" },
        accent: { DEFAULT: "#F1F5F9", foreground: "#0F172A" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 150s linear infinite",
      },
    },
  },
  plugins: [],
};
