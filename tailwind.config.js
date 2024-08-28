/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      opacity: {
        '30': '0.3',
        '40': '0.4',
      },
    },
  },
  plugins: [],
}

