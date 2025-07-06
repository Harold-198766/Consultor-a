const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./*.html', './scripts/**/*.js', './admin/**/*.html'],
      safelist: ['active', 'open', /^btn-/, /^nav-/]
    }),
  ],
};
