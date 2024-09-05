/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: "#FFDD33",
          gray: "#98A2B3"
        },
        secondar:{
          yellow: "#FFDD44",
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
