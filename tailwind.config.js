/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: '#8c7327'
      },
      boxShadow: {
        'gold-lg': '0 4px 24px 0 #8c732770',
        'gold-xl': '0 6px 30px 0 #e7c776a0'
      }
    }
  },
  plugins: []
}
