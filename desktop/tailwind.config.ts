import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ax: {
          base: '#FAF7F2',
          elevated: '#FFFFFF',
          sunken: '#F3EDE5',
          sidebar: '#2C2420',
          brand: { DEFAULT: '#C8956C', hover: '#B5845E', active: '#A27350', subtle: '#F0E4D8' },
          accent: { DEFAULT: '#7B9E7B', hover: '#6B8E6B', subtle: '#E8F0E8' },
          success: { DEFAULT: '#5A8A5A', subtle: '#E4EFE4' },
          warning: { DEFAULT: '#C4933B', subtle: '#F8F0E0' },
          error: { DEFAULT: '#B85450', subtle: '#F8EAEA' },
          info: { DEFAULT: '#6B8FAD', subtle: '#E8EFF5' },
          border: { DEFAULT: '#E5DDD3', subtle: '#EDE7DF', strong: '#C4B8AD' },
          text: { primary: '#1A1614', secondary: '#5C524A', tertiary: '#9B8E83', ghost: '#C4B8AD' },
          energy: { low: '#9B8E83', medium: '#C8956C', high: '#B85450' },
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['36px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h2': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['22px', { lineHeight: '1.3' }],
        'h4': ['18px', { lineHeight: '1.35' }],
        'body': ['15px', { lineHeight: '1.6' }],
        'small': ['13px', { lineHeight: '1.5' }],
        'micro': ['11px', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
} satisfies Config
