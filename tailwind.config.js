/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      base: "1.6rem",
    },
    extend: {
      keyframes: {
        rotateColor: {
          from: { filter: "hue-rotate(0deg)" },
          to: { filter: "hue-rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
