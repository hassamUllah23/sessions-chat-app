/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "media", // or 'media' or 'class'
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary))",
        background: "rgba(var(--color-background))",
        card: "rgba(var(--color-card))",
        text: "rgba(var(--color-text))",
        error: "rgba(var(--color-error))",
        success: "rgba(var(--color-success))",
        border: "rgba(var(--color-border))",
        link: "rgba(var(--color-link))",
        modal: "rgba(var(--color-modal-background))",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("preline/plugin")],
};
