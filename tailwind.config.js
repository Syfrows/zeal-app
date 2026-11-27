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
          DEFAULT: "#19221a",
          50: "#f1f4ed",
          100: "#e2e9dc",
          200: "#c9d5c2",
          300: "#a3b59a",
          400: "#718a68",
          500: "#526e49",
          600: "#394f32",
          700: "#2c4027",
          800: "#19221a",
          900: "#101810",
        },
        accent: {
          DEFAULT: "#41632c",
          light: "#c5f25a",
          dark: "#304c20",
        },
        surface: "#f5f6f1",
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
