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
      colors: {
        'light-bg': '#fff',
        'light-text': '#000',
        'light-border': '#ccc',
        'dark-bg': '#515d6a',
        'mid-dark-bg': '#434d57',
        'dark-text': '#fff',
        'dark-border': '#555',
      },
    },
  },
  plugins: [],
}

