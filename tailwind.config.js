/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "50": "#F7F8FA",
          "100": "#E6E8EB",
          "200": "#AFB2B1",
          "500": "#808080",
          "800": "#494D4B"
        },
        green: "#04D361",
        purple: {
          "300": "#9F75FF",
          "400": "#9164FA",
          "500": "#8257E5",
          "800": "#6F48C9"
        }
      }
    },
  },
  plugins: [],
}