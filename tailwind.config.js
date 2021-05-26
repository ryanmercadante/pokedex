module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        'screen/1.5': 'calc(100vh / 1.5)',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      }),
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      translate: ['hover', 'focus'],
    },
  },
  plugins: [],
}
