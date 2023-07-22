/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bgDDark: "url(/images/bg-desktop-dark.jpg)",
        bgDLight: "url(/images/bg-desktop-light.jpg)",
        bgMDark: "url(/images/bg-mobile-dark.jpg)",
        bgMLight: "url(/images/bg-mobile-light.jpg)",
      },
      colors: {
        // Light Theme
        grCyan: "rgb(87, 221, 255)",
        grPurple: "rgb(192, 88, 243)",
        lightGray: "hsl(0, 0%, 98%)",
        lightGrayishBlue: "hsl(236, 33%, 92%)",
        "bg-LightGrayishBlue": "hsl(233, 11%, 84%)",
        GrayishBlue: "hsl(236, 9%, 61%)",
        lightText: "hsl(235, 19%, 35%)",

        // Dark Theme

        darkBlue: "hsl(235, 21%, 11%)",
        bgBlueDark: "hsl(235, 24%, 19%)",
        "text-darkGrayishBlue": "hsl(234, 39%, 85%)",
        "GrayishBlue-hover": "hsl(236, 33%, 92%)",
        GrayishBlueText: "hsl(234, 11%, 52%)",
        DarkGrayishBlueBorder: "hsl(233, 14%, 35%)",
        DarkGrayishBlue: "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
