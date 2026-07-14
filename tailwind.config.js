/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2c2c2c',
        },
        gold: {
          50: '#fbf7ee',
          100: '#f5ecd6',
          200: '#ecd9a8',
          300: '#e0c07a',
          400: '#d4a94e',
          500: '#c19a3a',
          600: '#a87d2c',
          700: '#8a6420',
          800: '#6b4d18',
          900: '#4d3812',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f8f3e9',
          200: '#efe6d3',
          300: '#e3d6b8',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
