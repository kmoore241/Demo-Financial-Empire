/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./client/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        empire: {
          emerald: { 50:"hsl(var(--empire-emerald-50))",100:"hsl(var(--empire-emerald-100))",200:"hsl(var(--empire-emerald-200))",300:"hsl(var(--empire-emerald-300))",400:"hsl(var(--empire-emerald-400))",500:"hsl(var(--empire-emerald-500))",600:"hsl(var(--empire-emerald-600))",700:"hsl(var(--empire-emerald-700))",800:"hsl(var(--empire-emerald-800))",900:"hsl(var(--empire-emerald-900))",950:"hsl(var(--empire-emerald-950))" },
          navy:    { 50:"hsl(var(--empire-navy-50))",   100:"hsl(var(--empire-navy-100))",   200:"hsl(var(--empire-navy-200))",   300:"hsl(var(--empire-navy-300))",   400:"hsl(var(--empire-navy-400))",   500:"hsl(var(--empire-navy-500))",   600:"hsl(var(--empire-navy-600))",   700:"hsl(var(--empire-navy-700))",   800:"hsl(var(--empire-navy-800))",   900:"hsl(var(--empire-navy-900))",   950:"hsl(var(--empire-navy-950))" },
          gold:    { 50:"hsl(var(--empire-gold-50))",   100:"hsl(var(--empire-gold-100))",   200:"hsl(var(--empire-gold-200))",   300:"hsl(var(--empire-gold-300))",   400:"hsl(var(--empire-gold-400))",   500:"hsl(var(--empire-gold-500))",   600:"hsl(var(--empire-gold-600))",   700:"hsl(var(--empire-gold-700))",   800:"hsl(var(--empire-gold-800))",   900:"hsl(var(--empire-gold-900))",   950:"hsl(var(--empire-gold-950))" }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
