import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
        dark: {
          DEFAULT: '#000000',
          'soft': '#111111',
          'lighter': '#222222'
        },
        light: {
          DEFAULT: '#FFFFFF',
          'soft': '#F5F5F5',
          'darker': '#EEEEEE'
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'bounce-slow': 'bounce 3s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
};

export default config; 