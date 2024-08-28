import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        tokyo: {
          dark: "#16161e",
          lighter: "#1a1b26",
          green: "#9ece6a",
          turquoise: "#7dcfff",
          font: "#a8b1d6",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
