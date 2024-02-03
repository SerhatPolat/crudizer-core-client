/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1350px",
    },
    extend: {
      colors: {
        primary: "#3a199e",
        secondary: "#90d431",
      },
      boxShadow: {
        neumorphism: "20px 20px 50px #bfbfbf, -20px -20px 50px #ffffff",
      },
    },
  },
  plugins: [],
};
