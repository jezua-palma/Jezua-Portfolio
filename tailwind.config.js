/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#030014',
          card: 'rgba(17, 12, 46, 0.15)',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(99, 102, 241, 0.15)',
        },
        neon: {
          cyan: '#00F0FF',
          violet: '#8B5CF6',
          fuchsia: '#D946EF',
          indigo: '#6366F1',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'orbit-1': 'orbit1 20s linear infinite',
        'orbit-2': 'orbit2 25s linear infinite',
        'orbit-3': 'orbit3 30s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        orbit1: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        orbit2: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg) translateX(140px) rotate(360deg)' },
        },
        orbit3: {
          '0%': { transform: 'rotate(0deg) translateX(200px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(200px) rotate(-360deg)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.2), 0 0 15px rgba(99, 102, 241, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.6), 0 0 35px rgba(99, 102, 241, 0.3)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
