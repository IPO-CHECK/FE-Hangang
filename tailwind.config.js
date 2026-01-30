/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: '#3182F6',
          blueLight: '#E8F3FF',
          gray: '#F2F4F6',
          grayText: '#6B7684',
          black: '#191F28',
        },
      },
      borderRadius: {
        'toss': '16px',
        'toss-lg': '24px',
      },
      boxShadow: {
        'toss': '0 2px 8px rgba(0,0,0,0.04)',
        'toss-hover': '0 4px 16px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
