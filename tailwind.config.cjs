/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        paper: '#FEF9F9',
        primary: '#244391',
        secondary: '#0F2866',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        actionCall: ['Montserrat', 'sans-serif'],
      },
    },
  },

  plugins: [],
};

module.exports = config;
