/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        dark: '#0A0A0A'
      },
      keyframes: {
        'ping-once': {
          '75%, 100%': {
            transform: 'scale(1.2)',
            opacity: 0
          }
        }
      },
      animation: {
        'ping-once': 'ping-once 0.7s cubic-bezier(0, 0, 0.2, 1)'
      }
    },
  },
  plugins: [],
}
