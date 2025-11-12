/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      // 🌟 ADD THIS: Apply the keyframes as an animation
      animation: {
        'bounce-slow': 'bounce-slow 1.5s infinite',
      },
      colors: {
        'whatsapp-green': '#25D366',
        'whatsapp-dark': '#128C7E',
      },
    },
  },
  plugins: [],
};