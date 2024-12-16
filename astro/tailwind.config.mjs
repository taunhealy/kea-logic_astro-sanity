/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
    // define typography tokens and then use tokens via global.css
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: 'Inria Sans',
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#121923',
        tertiary: '#3B82F6',
      },
    },
  },
  plugins: [],
};