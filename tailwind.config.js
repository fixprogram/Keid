/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        addBtn: "0px 8px 12px rgba(0, 0, 0, 0.25)",
        button: "0px 8px 16px rgba(0, 0, 0, 0.5)",
        switch: "0px 4px 4px rgba(0, 0, 0, 0.25",
      },
      dropShadow: {
        popup: "0px 8px 12px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
      },
      fontSize: {
        xxxl: ["40px", "48px"],
        xxl: ["36px", "40px"],
        xl: ["18px", "24px"],
        lg: ["16px", "24px"],
        base: ["14px", "24px"],
        sm: ["13px", "24px"],
        smm: ["12px", "16px"],
        xs: ["11px", "16px"],
        xxs: ["10px", "16px"],
      },
      gridTemplateColumns: {
        item: "40px 1fr auto",
        task: "1fr auto",
      },
      letterSpacing: {
        wide: "0.03125em",
      },
    },
    colors: {
      primary: "#246BFD",
      secondary: "#C25FFF",
      background1: "#181A20",
      background2: "#262A34",
      white: "#ffffff",
      deactive: "#5E6272",
      darkDeactive: "#3A3D46",
      active: "#200745",
      deactiveCheck: "#4D5362",
      border: "#494C54",
      red: "#FF968E",
      green: "#A5F59C",
    },
  },
  plugins: [],
};
