/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "modal-background": "var(--modal-background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        "button-bg": "var(--button-bg)",
        "super-green": {
          DEFAULT: "#04D98B",
          bg: "#04d98b37"
        },
        "super-blue": {
          DEFAULT: "#0396A6",
          bg: "#0396a637"
        },
        "super-yellow": {
          DEFAULT: "#F2BD1D",
          bg: "#f2bd1d37"
        },
        "super-red": {
          DEFAULT: "#D92B04",
          bg: "#d92b0437"
        }
      }
    }
  },
  plugins: []
};
