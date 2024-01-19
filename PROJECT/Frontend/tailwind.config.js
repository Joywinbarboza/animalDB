/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "navbar-brown":"#362A06",
        "navbar-orange":"#EE812C",
        "navbar-blue":"#135C91",
        "navbar-green":"#477B7A"
      },
    },
  },
  plugins: [],
}

