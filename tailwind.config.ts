import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          neon: '#F59E0B',
          mid:  '#D97706',
          dim:  'rgba(245,158,11,0.10)',
        },
        brand: {
          bg:        '#0a0a0a',
          secondary: '#111111',
          card:      '#1a1a1a',
          border:    'rgba(255,255,255,0.08)',
          gray:      '#888888',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)',         'sans-serif'],
      },
      animation: {
        float:   'float 4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config


