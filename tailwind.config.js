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
    require('tailwind-scrollbar'),
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
      });
    }
  ],
}