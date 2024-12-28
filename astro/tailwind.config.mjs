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
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'color-tertiary': 'var(--color-tertiary)',
        
        
      }
    },
  },
  plugins: [],
};