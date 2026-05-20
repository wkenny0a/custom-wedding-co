/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B89A52',
          light: '#D4B96A',
          pale: '#EFE3C2',
        },
        cream: {
          DEFAULT: '#F7EFE3',
          dark: '#EDE5D5',
        },
        blush: {
          DEFAULT: '#F2D9D9',
          dark: '#E8C4C4',
        },
        espresso: {
          DEFAULT: '#4A2C2A',
          light: '#6B3F3C',
        },
        orange: '#D4700A',
        gray: {
          100: '#F5F5F0',
          200: '#E8E6E0',
          400: '#9E9890',
          600: '#6B6560',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      }
    },
  },
  plugins: [],
}
