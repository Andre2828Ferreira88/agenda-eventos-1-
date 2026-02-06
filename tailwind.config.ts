import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: { boxShadow: { soft: "0 8px 24px rgba(17, 24, 39, 0.08)" } } },
  plugins: []
} satisfies Config;
