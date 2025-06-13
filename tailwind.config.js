/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
        navy: "#1a2238",
        gray: "#F5F5F5"
      },
      fontFamily: {
        serif: ["DM Serif Display", "serif"],
        sans: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}
