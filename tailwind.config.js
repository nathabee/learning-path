// tailwind.config.js
module.exports = {
  content: ["./docs/**/*.html"], // Adjust the path to your HTML files
  theme: {
    extend: {
      colors: {
        'primary-color-light': 'var(--primary-color-light)',
        'primary-color': 'var(--primary-color)',
        'secondary-color-light': 'var(--secondary-color-light)',
        'secondary-color': 'var(--secondary-color)',
        'tertiary-color-light': 'var(--tertiary-color-light)',
        'tertiary-color': 'var(--tertiary-color)',
        'highlight-color': 'var(--highlight-color)',
        'black': 'var(--black)',
        'white': 'var(--white)',
      },
    },
  },
  plugins: [],
};
