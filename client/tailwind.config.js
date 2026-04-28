/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        accent: "#f97316",
        ink: "#0f172a",
      },
      boxShadow: {
        soft: "0 18px 45px -22px rgba(15, 23, 42, 0.28)",
      },
    },
  },
  plugins: [],
};
