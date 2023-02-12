/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ibm-light": "IBM Plex Sans Light",
        "ibm-semi": "IBM Plex Sans Semi",
        goth: "League Gothic",
      },
    },
    colors: {
      "gray-200": "#8F8F8F",
      "gray-500": "#AEAEAE",
      "gray-800": "#191919",
      yellow: "#FFE600",
      brick: "#B93333",
      "brick-300": "#612323",
      black: "#000",
      white: "#FFF",
    },
  },
  plugins: [],
};
