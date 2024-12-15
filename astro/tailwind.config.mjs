/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
    // define typography tokens and then use tokens via global.css
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#121923',    // Dark text color
        secondary: '#FFFFFF',  // White text color
        tertiary: '#3B82F6',  // Blue accent color
      },
    },
  },
  plugins: [],
};