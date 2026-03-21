/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F3EE", // Off-white
        primary: "#E8E4DD",    // Paper
        accent: "#E63B2E",     // Signal Red
        dark: "#111111",       // Black
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
