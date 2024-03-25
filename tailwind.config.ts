import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ['10px', '12px'],
      },
      width:{
        '88':'22rem',
        '30':'7.5rem'
      },
      height:{
        '88':'22rem',
        '30':'7.5rem'
      },
      maxHeight:{
        '90%Screen': '90vh',
        '85%Screen': '85vh'
      }
    },
  },
  plugins: [],
} satisfies Config

