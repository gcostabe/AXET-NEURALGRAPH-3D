/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ntt: {
          DEFAULT: "#0072BC",
          blue: "#0072BC",
          dark: "#005A96",
          light: "#008CE5",
          accent: "#00A3FF",
          glow: "rgba(0, 114, 188, 0.25)",
          subtle: "rgba(0, 114, 188, 0.12)",
        },
      },
      boxShadow: {
        'ntt-glow': '0 0 25px -5px rgba(0, 114, 188, 0.3)',
        'ntt-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
