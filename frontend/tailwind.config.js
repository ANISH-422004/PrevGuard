/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1A102B',
          secondary: '#221736',
          primaryText: '#E3DFFD',
          secondaryText: '#A08DCC',
          accent: '#874CCC',
          action: '#A66CFF',
          hover: '#603F8B',
        },
        light: {
          background: '#F2F0FC',
          secondary: '#DCD6F7',
          primaryText: '#241847',
          secondaryText: '#5A4B8A',
          accent: '#874CCC',
          action: '#A66CFF',
          hover: '#C8B6E2',
        },
      },
    },
  },
  plugins: [],
}