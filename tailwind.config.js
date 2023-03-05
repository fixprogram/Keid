/** @type {import('tailwindcss').Config} */

// const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["var(--font-inter)", ...fontFamily.sans],
      // },
    },
    colors: {
      gray: "#808080",
      lightGray: "#EDEDED",
    },
  },
  plugins: [],
};
