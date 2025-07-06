const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./src/**/*.html', './admin/**/*.html', './src/**/*.js'],
      safelist: ['active', 'open', /^btn-/, /^nav-/], // Ajusta según tus clases dinámicas
    }),
  ],
};