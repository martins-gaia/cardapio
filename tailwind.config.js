/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "Home": "url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

