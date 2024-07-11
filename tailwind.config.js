// tailwind.config.js
module.exports = {
  content: ["./docs/**/*.html"], // Adjust the path to your HTML files
  theme: {
    extend: {
      colors: {
        'primary-color-light': '#6CB2B8',
        'primary-color': '#2C7A7B',
        'primary-color-translucent': 'rgba(44, 122, 123, 0.8)', // Light yellow with 80% opacity
        'secondary-color-light': '#F2CC8F',
        'secondary-color': '#B48E65',
        'secondary-color-light-translucent': 'rgba(242, 204, 143, 0.8)', // Light yellow with 80% opacity
        'tertiary-color-light': '#EAA9A9',
        'tertiary-color': '#8F3E3E',
        'highlight-color': '#FFD700',
        'black': '#333333',
        'white': '#FFFFFF',
      },
    },
  },
  variants: {},
  plugins: [],
};
