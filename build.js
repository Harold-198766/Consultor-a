require('esbuild').build({
  entryPoints: ['scripts/main.js'],
  bundle: true,
  minify: true,
  treeShaking: true,
  outfile: 'dist/main.min.js',
  target: ['es2020'],
}).catch(() => process.exit(1));

