/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: "#063B4F",
        lagoon: "#00B8C8",
        reef: "#FF6B35",
        sand: "#F5C76B",
        foam: "#F7FFF7",
        kelp: "#2C9C72",
        ink: "#052E3A",
      },
      fontFamily: {
        display: ["Baloo 2", "Nunito", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        game: "0 24px 80px rgba(0, 35, 53, 0.35)",
        glow: "0 0 0 4px rgba(0, 184, 200, 0.18), 0 0 44px rgba(255, 199, 107, 0.35)",
      },
      backgroundImage: {
        "sand-noise":
          "radial-gradient(circle at 18% 20%, rgba(245, 199, 107, .22) 0 2px, transparent 2px), radial-gradient(circle at 82% 60%, rgba(255, 255, 255, .14) 0 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
