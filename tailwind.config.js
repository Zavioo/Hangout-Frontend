/** @type {import('tailwindcss').Config} */

export default {
  prefix: 'tw-', // Add a custom prefix for all Tailwind utility classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#29617d', // Custom primary color
        color2: '#90afbe', // Custom secondary color
      },
    },
  },
  plugins: [],
}
