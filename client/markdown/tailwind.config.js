/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        lexend:["Lexend", "sans-serif"],
        souseSans:["Source Sans 3", "sans-serif"]
      },
    },
  },
  plugins: [],
}

