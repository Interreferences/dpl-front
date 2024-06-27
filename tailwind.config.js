/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'fhd': '1920px',
        '2xl': '2530px',  // Для разрешения 2K
        '3xl': '3800px',  // Для разрешения 4K
      },
    },
  },
  plugins: [],
}

