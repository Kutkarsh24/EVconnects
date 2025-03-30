/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        dark: {
          primary: '#1a1a1a',
          secondary: '#282828',
          accent: '#3a3a3a',
          text: '#e0e0e0',
          'text-muted': '#a0a0a0',
        },
        light: {
          primary: '#ffffff',
          secondary: '#f5f5f5',
          accent: '#e0e0e0',
          text: '#333333',
          'text-muted': '#666666',
        },
      },
      backgroundColor: {
        dark: '#121212',
        'dark-card': '#1e1e1e',
        'dark-nav': '#0f0f0f',
      },
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'dark-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}