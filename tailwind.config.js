// tailwind.config.js

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        26: "26px",
      },
      margin: {
        30: "30px",
      },
      lineHeight: {
        44: "44px",
      },
    },
  },
  plugins: [],
};
