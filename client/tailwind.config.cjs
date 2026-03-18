/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          light: "#333333",
        },
        secondary: {
          DEFAULT: "#6b7280",
        },
        background: {
          DEFAULT: "#ffffff",
          alt: "#f9fafb",
        },
        border: "#e5e7eb",
      },
    },
  },
  plugins: [],
};