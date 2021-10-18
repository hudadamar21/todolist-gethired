module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '3rem',
        lg: '6rem',
        xl: '9rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16ABF8',
          white: '#F4F4F4',
          red: '#ED4C5C'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
