/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0908",
          900: "#0f0e0c",
          800: "#161412",
          700: "#211d1a",
          600: "#332c27",
        },
        parchment: {
          100: "#f4ede1",
          200: "#e9dfcd",
          300: "#d8c9ab",
        },
        claret: {
          400: "#8a2f35",
          500: "#701f26",
          600: "#5c161c",
          700: "#3f0f13",
        },
        brass: {
          300: "#d8b877",
          400: "#c6a05c",
          500: "#a9813f",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        case: ["'Cinzel'", "serif"],
        body: ["'Manrope'", "sans-serif"],
        type: ["'Courier Prime'", "monospace"],
      },
      letterSpacing: {
        wide2: "0.18em",
        wide3: "0.32em",
      },
      boxShadow: {
        card: "0 20px 60px -20px rgba(0,0,0,0.65)",
        lift: "0 30px 80px -25px rgba(112,31,38,0.35)",
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
      animation: {
        drift: "drift 40s linear infinite",
        flicker: "flicker 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-200px,-120px,0)" },
        },
        flicker: {
          "0%, 100%": { opacity: 0.55 },
          "45%": { opacity: 0.85 },
          "50%": { opacity: 0.4 },
          "55%": { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};
