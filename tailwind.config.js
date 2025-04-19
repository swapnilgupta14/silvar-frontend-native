/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'bright': ['BrightDemo', 'sans-serif'],
      },
      colors: {
        'silver-mist': '#C0C0C0',
        'charcoal-black': '#121212',
        'soft-slate-gray': '#1F1F1F',
        'deep-maroon': '#7D2E4D',
        'white-smoke': '#F5F5F5',
        'background': "#000000",
        'accent': "#1F1F1F",
      },
    },
  },
  plugins: [],
}