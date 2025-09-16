// Old (will break):
// const tailwindcss = require('tailwindcss');

// New (as of Tailwind v4+):
const tailwindcss = require('@tailwindcss/postcss');
module.exports = {
  plugins: [
    tailwindcss,
    require('autoprefixer'),
  ],
};
