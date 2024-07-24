/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      "cupcake",
      "corporate",
      "light",
      {
        mytheme: {
          primary: "#dcb86c",

          secondary: "#00aaff",

          accent: "#00aeff",

          neutral: "#0b041b",

          "base-100": "#f5fdff",

          info: "#6ae1ff",

          success: "#00ffaf",

          warning: "#ffad00",

          error: "#ff6e77",
        },
      },
    ],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
