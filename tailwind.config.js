/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-dmSans)',
      },
      colors: {
        red: '#E5172F',
        redBorder: "#E77A87",
        grayBack: "rgb(240, 240, 240)",
        grayBorder: "#D9D9D9",
        black: "#141417"
      },
    },
  },
  plugins: [],
}
