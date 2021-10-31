const production = !process.env.ROLLUP_WATCH;
module.exports = {
  purge: {
    content: [
      "./src/**/*.svelte",
      "./public/index.html",
    ],
    enabled: production // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled', 'focus', 'active'],
      opacity: ['disabled'],
      textColor: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
