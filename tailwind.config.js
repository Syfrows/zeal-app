/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#0a2540",
          50: "#eef4f8",
          100: "#d7e5ee",
          200: "#aec9dd",
          300: "#7fa8c6",
          400: "#4c7fa3",
          500: "#2c5c80",
          600: "#1a3f60",
          700: "#132f48",
          800: "#0a2540",
          900: "#061a2c",
        },
        accent: {
          DEFAULT: "#ea580c",
          light: "#fb923c",
          dark: "#c2410c",
        },
        surface: "#f7f8fa",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(10, 37, 64, 0.06)",
        "card-hover": "0 12px 28px rgba(10, 37, 64, 0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
