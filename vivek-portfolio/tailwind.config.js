/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f3ff',
          purple: '#bc13fe'
        },
        dark: {
          bg: '#0a0a0a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
