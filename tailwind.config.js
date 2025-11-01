/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slow-move': 'move 20s linear infinite',
      },
      keyframes: {
        move: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
        },
      },
    },
  },
  plugins: [],
};