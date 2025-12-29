/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        mystic: {
          950: '#020617', 900: '#0f172a', 800: '#1e1b4b', 700: '#312e81',
          600: '#4338ca', 500: '#6366f1', 400: '#818cf8', 300: '#a5b4fc', 
          200: '#c7d2fe', 100: '#e0e7ff', 50:  '#eef2ff',
          accent: '#d946ef', gold: '#fbbf24'
        },
        dream: {
          50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
          accent: '#a855f7', pink: '#fce7f3', text: '#4c1d95' 
        }
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}