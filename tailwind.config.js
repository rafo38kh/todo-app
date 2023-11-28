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
        cityPattern: "url(/images/bg-10.png)",
      },
      // colors: {
      //   "color-1": "#ebeaea",
      // "color-2": "#aababc",
      //   "color-3": "#e9aca6",
      //   "color-4": "#d95d52",
      //   "color-5": "#161d43",
      //   "color-6": "#907d87",
      //   "color-7": "#a7631b",
      //   "color-8": "#4a494f",
      // },

      colors: {
        moonstone: "#00A8B8",
        DarkSlateGray: "#16272C",
        slateGray: "#335C67",
        lightCyan: "#DDF9FF",
        color_2: "#aababc",
        tangerine: "#E29578",
      },
    },
  },
  plugins: [],
};
