/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        addBtn: "0px 8px 12px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
      },
      fontSize: {
        xl: ["18px", "24px"],
        lg: ["16px", "24px"],
        base: ["14px", "24px"],
        sm: ["13px", "24px"],
      },
      gridTemplateColumns: {
        item: "40px 1fr auto",
      },
    },
    colors: {
      primary: "#246BFD",
      secondary: "#C25FFF",
      background1: "#181A20",
      background2: "#262A34",
      white: "#ffffff",
      deactive: "#5E6272",
    },
  },
  plugins: [],
};
