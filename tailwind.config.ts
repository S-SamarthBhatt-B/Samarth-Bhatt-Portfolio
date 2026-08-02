import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        os: {
          bg: '#0A0E0C',        // near-black terminal background
          panel: '#0F1512',     // slightly lifted glass panel base
          border: '#1E2A24',
          text: '#D4F5E3',      // soft green-white body text
          muted: '#6B8577',
          accent: '#00FF88',    // signature terminal green
          accentDim: '#00B865',
          accentSoft: 'rgba(0, 255, 136, 0.12)',
          warn: '#FFB020',
          error: '#FF5555',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 255, 136, 0.25)',
        glowSm: '0 0 10px rgba(0, 255, 136, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        scanline: 'scanline 6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
