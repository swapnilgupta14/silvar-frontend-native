/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        bright: ["BrightDemo", "sans-serif"],
        redrose: ["RedRose-Regular"],
      },
      colors: {
        background: "#222831",
        "secondary-bg": "#31363F",
        "charcoal-black": "#131010",
        accent: "#76ABAE",
        "off-white": "#EEEEEE",
        "light-orange": "#F0BB78",
        "nice-brown": "#543A14",
      },
    },
  },
  plugins: [],
};
