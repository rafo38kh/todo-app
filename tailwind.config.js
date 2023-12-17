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

      colors: {
        moonstone: "#00A8B8",
        DarkSlateGray: "#16272C",
        slateGray: "#335C67",
        lightCyan: "#DDF9FF",
        pantone: "#aababc",
        tangerine: "#E29578",
        hoverDark: "#F5D9CF",
        hoverLight: "#2DE1C2",
        TopSettingsBg: "#244149",
      },
    },
  },
  plugins: [],
};
