/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',  // left to right gradient
        'gradient-to-l': 'linear-gradient(to left, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',   // right to left gradient
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('tailwind-scrollbar')
  ],
}