/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FBF7F2', 2: '#F5EEE6' },
        blush: { DEFAULT: '#EED9D2', light: '#F6E9E4', deep: '#E2C2B8' },
        rose: { DEFAULT: '#B9786E', dark: '#9C5F56' },
        gold: { DEFAULT: '#B8956A', light: '#D9C3A0' },
        cocoa: { DEFAULT: '#2E211D', soft: '#5E4C46', mute: '#8C7A73' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1280px' },
      borderRadius: { arch: '999px 999px 24px 24px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: { marquee: 'marquee 40s linear infinite', 'spin-slow': 'spin 22s linear infinite' },
    },
  },
  plugins: [],
}
