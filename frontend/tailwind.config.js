/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00f2ff", // Neon Blue
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#10b981", // Cricket Green
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#334155",
          foreground: "#f8fafc",
        },
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.8)", // Glass effect base
          foreground: "#f8fafc",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sports-grid': 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 242, 255, 0.3), 0 0 20px rgba(0, 242, 255, 0.1)',
        'neon-green': '0 0 10px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
